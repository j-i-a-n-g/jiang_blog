<template>
  <div class="canvas" ref="picture" v-if="isShow">
    <canvas
      class="canvas_content"
      v-for="(cvs, idx) in canvasNum"
      :key="idx"
    ></canvas>
  </div>
</template>

<script>
import GIF from "@/components/GIFjs/dist/gif";
import { getGifWorker } from "./gif.worker";
import html2canvas from "html2canvas";
import Whammy from "./whammy";
// HELPER FUNCTIONS
function lerp(a, b, t) {
  return Math.abs(b - a) > 0.1 ? a + t * (b - a) : b;
}
// 绽放的烟花
class Shard {
  constructor(x, y, hue, color, getTarget) {
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.lightness = 50;
    // 每一粒花火的半径（粗细）
    this.size = 8 + Math.random() * 10;
    const angle = Math.random() * 2 * Math.PI;
    // 喷砂速度
    const blastSpeed = 1 + Math.random() * 6;
    this.xSpeed = Math.cos(angle) * blastSpeed;
    this.ySpeed = Math.sin(angle) * blastSpeed;
    this.target = getTarget();
    this.ttl = 100;
    this.timer = 0;
    this.color = color;
  }
  draw(cvs, isColorful) {
    //cvs5
    if (isColorful) {
      // HSL色彩的表述方式是：H(hue)色相，S(saturation)饱和度，以及L(lightness)亮度
      cvs.fillStyle = `hsl(${this.hue}, 100%, ${this.lightness}%)`;
    } else {
      cvs.fillStyle = this.color;
    }

    // 起始一条路径，或重置当前路径。
    cvs.beginPath();
    /**
     * arc() 创建弧/曲线（用于创建圆形或部分圆）
     * x，y圆心的坐标
     * r圆半径
     * sAngle：起始角
     * eAngle：结束角
     * counterclockwise：可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
     */
    cvs.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    // 创建从当前点回到起始点的路径。
    cvs.closePath();
    // 填充当前绘图（路径
    cvs.fill();
  }
  update(cvs, shards, fidelity) {
    //c5
    // 还有需要填充的文字像素
    if (this.target) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;
      // Math.sqrt 一个非负实数的平方根运算函数
      const dist = Math.sqrt(dx * dx + dy * dy);
      const a = Math.atan2(dy, dx);
      const tx = Math.cos(a) * 5;
      const ty = Math.sin(a) * 5;
      this.size = lerp(this.size, 1.5, 0.05);

      if (dist < 5) {
        this.lightness = lerp(this.lightness, 100, 0.01);
        this.xSpeed = this.ySpeed = 0;
        this.x = lerp(this.x, this.target.x + fidelity / 2, 0.05);
        this.y = lerp(this.y, this.target.y + fidelity / 2, 0.05);
        this.timer += 1;
      } else if (dist < 10) {
        this.lightness = lerp(this.lightness, 100, 0.01);
        this.xSpeed = lerp(this.xSpeed, tx, 0.1);
        this.ySpeed = lerp(this.ySpeed, ty, 0.1);
        this.timer += 1;
      } else {
        this.xSpeed = lerp(this.xSpeed, tx, 0.02);
        this.ySpeed = lerp(this.ySpeed, ty, 0.02);
      }
    } else {
      // 文字像素已经填充完
      this.ySpeed += 0.05;
      this.size = lerp(this.size, 1, 0.05);

      if (this.y > cvs.height) {
        shards.forEach((shard, idx) => {
          if (shard === this) {
            shards.splice(idx, 1);
          }
        });
      }
    }
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
  }
}
// 未绽放的烟花
class Rocket {
  constructor(cvsDocu) {
    // c5
    const quarterW = cvsDocu.width / 4;
    this.x = quarterW + Math.random() * (cvsDocu.width - quarterW);
    this.y = cvsDocu.height - 15;
    this.angle = (Math.random() * Math.PI) / 4 - Math.PI / 6;
    this.blastSpeed = 7 + Math.random() * 7;
    this.shardCount = 15 + Math.floor(Math.random() * 15);
    this.xSpeed = Math.sin(this.angle) * this.blastSpeed;
    this.ySpeed = -Math.cos(this.angle) * this.blastSpeed;
    this.hue = Math.floor(Math.random() * 360);
    this.trail = [];
    this.color = "";
  }
  draw(cvs, isColorful, fireColorArr) {
    this.blastSpeed = 6 + Math.random() * 7;
    //cvs5
    // restore()和save()只作用于绘制状态
    cvs.save();
    // 烟花的起点坐标
    cvs.translate(this.x, this.y);
    // rotate 旋转当前的绘图
    cvs.rotate(Math.atan2(this.ySpeed, this.xSpeed) + Math.PI / 2);
    // fillStyle 设置或返回用于填充绘画的颜色、渐变或模式。
    if (isColorful) {
      cvs.fillStyle = `hsl(${this.hue}, 100%, 50%)`; // 色相 饱和度 亮度
    } else {
      let index = Math.floor(Math.random() * fireColorArr.length);
      cvs.fillStyle = fireColorArr[index];
      this.color = fireColorArr[index];
    }
    // fillRect 绘制"被填充"的矩形。这里填充的就是烟花飞上来动态的那个“烟火”
    cvs.fillRect(0, 0, 5, 15);
    cvs.restore();
  }
  // 让未绽放的烟花动起来的方法
  update() {
    // let multiple = Math.random() * 2
    // if (multiple <= 1) {
    //   multiple = 1
    // } else if (multiple > 1 && multiple < 1.5) {
    //   multiple = 1.5
    // } else {
    //   multiple = 2
    // }
    // 每个未绽放的烟花的x和y坐标变化
    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;
    this.ySpeed += 0.1;
  }

  // 烟花绽放
  explode(shards, getTarget) {
    for (let i = 0; i < 70; i++) {
      shards.push(new Shard(this.x, this.y, this.hue, this.color, getTarget));
    }
  }
}
export default {
  props: {
    // canvas数量
    canvasNum: {
      type: Number,
      default: 5,
    },
    BgImg: {},
    fontSetting: {
      type: Object,
      default: () => {
        return {};
      },
    },
    fireFlowerData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      shard: {},
      rocket: {},
      // 收集canvas元素
      cvsDocus: [],
      // 收集实例化的canvas
      cvss: [],
      // 装载实例化的rocket数组
      rockets: [],
      shards: [],
      // 装载要渲染的文字
      textTargetsO: [],
      textTargetsT: [],
      fidelity: 3,
      counter: 0,
      // 文字大小
      textWidth: 9999,
      textWidth2: 9999,
      isShow: true,
      fontStyle: {},
      fireFlower: {},
      exportTimer: null, // 定时器
      gifCom: null,
      outsideCanvas: null,
      mediaRecorder: null, // 存放录制视频的对象
      canvasWidth: null,
      canvasHeight: null,
    };
  },
  created() {
    this.shard = {};
    this.rocket = {};
    this.cvsDocus = [];
    this.cvss = [];
    this.rockets = [];
    this.shards = [];
    this.textTargetsO = [];
    this.textTargetsT = [];
    this.fidelity = 3;
    this.counter = 0;
    this.textWidth = 9999;
    this.textWidth2 = 9999;
    this.fontStyle = {};
    this.fireFlower = {};
    this.exportTimer = null; // 定时器
    this.gifCom = null;
    this.outsideCanvas = null;
    this.mediaRecorder = null; // 存放录制视频的对象
  },
  mounted() {
    // console.log(GIF);
    let cavasDom = document.querySelector(".canvas");
    this.canvasWidth = cavasDom.offsetWidth;
    this.canvasHeight = cavasDom.offsetHeight;
    this.$nextTick(() => {
      this.initCVS();
      this.loop();
    });
  },
  methods: {
    // 初始化
    initCVS() {
      // 获取所有canvas元素
      const [c1, c2, c3, c4, c5] = document.querySelectorAll(".canvas_content");
      this.cvsDocus = [c1, c2, c3, c4, c5];
      // 分别给每个canvas提供绘画方法和属性
      // getContext() 方法可返回一个对象，该对象提供了用于在画布上绘图的方法和属性。
      const [ctx1, ctx2, ctx3, ctx4, ctx5] = this.cvsDocus.map((c) =>
        c.getContext("2d")
      );
      let box = document.getElementsByClassName("canvas-box");
      this.cvss = [ctx1, ctx2, ctx3, ctx4, ctx5];
      this.cvsDocus[2].width = this.cvsDocus[3].width = box[0].offsetWidth;
      this.cvsDocus[2].height = this.cvsDocus[3].height = box[0].offsetHeight;
      this.cvsDocus[4].width = this.cvsDocus[3].width = box[0].offsetWidth;
      this.cvsDocus[4].height = this.cvsDocus[3].height = box[0].offsetHeight;
      const bgImage = new Image();
      bgImage.src = this.BgImg;
      bgImage.onload = function () {
        const canvasWidth = c5.width;
        const canvasHeight = c5.height;
        const imgWidth = bgImage.width;
        const imgHeight = bgImage.height;
        const scaleX = canvasWidth / imgWidth;
        const scaleY = canvasHeight / imgHeight;
        console.log(
          imgWidth * scaleX,
          imgHeight * scaleY,
          0,
          0,
          canvasWidth,
          canvasHeight
        );
        ctx5.drawImage(bgImage, 0, 0, canvasWidth, canvasHeight); // 在 (0,0) 位置绘制背景图
      };
      // 根据屏幕宽度调整大小
      this.resize();
    },
    resize() {
      // 屏幕宽度小于99999999，fontSetting.textFontSize开始自减，调整字体大小，适应屏幕宽度
      while (this.textWidth > window.innerWidth) {
        this.$emit("reduceFontSize");
        // 在画布上写一段900粗细 fontSetting.textFontSize像素的文本，使用的字体是 "Arial"
        this.cvss[0].font = `900 ${this.fontSetting.textFontSize}px '宋体'`;
        // measureText 返回包含指定文本宽度的对象。
        this.textWidth = this.cvss[0].measureText(
          this.fontSetting.textArr[0]
        ).width;
      }
      while (this.textWidth2 > window.innerWidth) {
        this.cvss[1].font = `900 ${this.fontSetting.textFontSize}px '宋体'`;
        this.textWidth2 = this.cvss[1].measureText(
          this.fontSetting.textArr[1]
        ).width;
      }
      let maxWidth =
        this.textWidth > this.textWidth2 ? this.textWidth : this.textWidth2;
      this.cvsDocus[0].width = maxWidth;
      this.cvsDocus[1].width = maxWidth;
      this.cvsDocus[0].height = this.fontSetting.textFontSize * 3;
      this.cvsDocus[1].height = this.fontSetting.textFontSize * 3;

      this.cvss[0].font = `${this.fontSetting.textWeight} ${this.fontSetting.textFontSize}px 'UnifrakturCook-Bold'`;
      this.cvss[1].font = `${this.fontSetting.textWeight} ${this.fontSetting.textFontSize}px 'UnifrakturCook-Bold'`;
      this.cvsDocus[0].textAlign = "right";
      this.cvsDocus[1].textAlign = "right";
      // this.cvsDocus[0].textBaseline = "middle";
      // this.cvsDocus[1].textBaseline = "middle";
      this.cvss[0].translate(0, 200);
      // this.cvss[1].translate(0, -50)
      if (this.fontSetting.StrokeOrFill2 == "fill") {
        // fillStyle 设置或返回用于填充绘画的颜色、渐变或模式。
        // this.cvss[0].fillStyle = "red";
        this.cvss[0].fillText(
          this.fontSetting.textArr[0],
          0,
          this.fontSetting.textFontSize
        ); // hello
      } else {
        // this.cvss[0].strokeStyle = "red";
        this.cvss[0].strokeText(
          this.fontSetting.textArr[0],
          0,
          this.fontSetting.textFontSize
        );
      }
      if (this.fontSetting.StrokeOrFill1 == "fill") {
        // this.cvss[1].fillStyle = "red";
        this.cvss[1].fillText(
          this.fontSetting.textArr[1],
          0,
          this.fontSetting.textFontSize
        );
      } else {
        // this.cvss[1].strokeStyle = "red";
        this.cvss[1].strokeText(
          this.fontSetting.textArr[1],
          0,
          this.fontSetting.textFontSize
        );
      }
      this.getPosition();
    },
    // 给文字像素定位，并且填充
    getPosition() {
      /**
       * getImageData 返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据。
       * x，y：开始复制的左上角位置的 x ，y坐标（以像素计）。
       * width，height：复制矩形区域的宽高
       */
      const imgData = this.cvss[0].getImageData(
        0,
        0,
        this.cvsDocus[0].width,
        this.cvsDocus[0].height
      );
      const imgData2 = this.cvss[1].getImageData(
        0,
        0,
        this.cvsDocus[1].width,
        this.cvsDocus[1].height
      );
      for (let i = 0, max = imgData.data.length; i < max; i += 4) {
        const alpha = imgData.data[i + 3];
        const x = Math.floor(i / 4) % imgData.width;
        const y = Math.floor(i / 4 / imgData.width);

        if (alpha && x % this.fidelity === 0 && y % this.fidelity === 0) {
          this.textTargetsO.push({ x, y: y - 150 }); // hello
        }
      }
      for (let i = 0, max = imgData2.data.length; i < max; i += 4) {
        const alpha = imgData2.data[i + 3];
        const x = Math.floor(i / 4) % imgData2.width;
        const y = Math.floor(i / 4 / imgData2.width);
        if (alpha && x % this.fidelity === 0 && y % this.fidelity === 0) {
          this.textTargetsT.push({ x, y: y - 150 }); // Canvas
        }
      }
      if (this.fontSetting.isLinearColor) {
        var gradient = this.cvss[4].createLinearGradient(200, 0, 800, 0);
        //从0到整个区域的一半由黄渐变到蓝
        //从中间到最后由蓝渐变到红
        for (let i = 0; i < this.fontSetting.linearColorArr.length; i++) {
          gradient.addColorStop(
            i / (this.fontSetting.linearColorArr.length - 1) + "",
            this.fontSetting.linearColorArr[i]
          );
        }
        this.cvss[4].fillStyle = gradient;
      } else {
        // 设置或返回用于填充绘画的颜色、渐变或模式。
        this.cvss[3].fillStyle = "#FFF";
        // 设置或返回用于填充绘画的颜色、渐变或模式。
        this.cvss[4].fillStyle = this.fontSetting.textColor;
      }
      if (this.fontSetting.showShadow) {
        // 设置或返回用于阴影的颜色
        this.cvss[3].shadowColor = this.fontSetting.shadowColor1;
        // 设置或返回用于阴影的模糊级别
        this.cvss[3].shadowBlur = this.fontSetting.shadowBlur1;
        // 设置或返回用于阴影的颜色
        this.cvss[4].shadowColor = this.fontSetting.shadowColor2;
        // 设置或返回用于阴影的模糊级别
        this.cvss[4].shadowBlur = this.fontSetting.shadowBlur2;
      }
    },
    // ANIMATION LOOP
    loop() {
      this.cvss[2].fillStyle = "rgba(0, 0, 0, .1)";
      // fillRect 绘制"被填充"的矩形。
      this.cvss[2].fillRect(
        0,
        0,
        this.cvsDocus[2].width,
        this.cvsDocus[2].height
      );
      this.cvss[2].fillRect(
        0,
        0,
        this.cvsDocus[4].width,
        this.cvsDocus[4].height
      );
      this.counter += 1;

      // 产生烟花
      if (this.counter % 15 === 0) {
        this.rockets.push(new Rocket(this.cvsDocus[2]));
      }
      this.rockets.forEach((r, i) => {
        r.draw(
          this.cvss[2],
          this.fireFlowerData.isColorful,
          this.fireFlowerData.fireColorArr
        );
        r.update();
        if (r.ySpeed > 0) {
          // 烟花绽放的方法
          r.explode(this.shards, this.getTarget);
          this.rockets.splice(i, 1);
        }
      });
      this.shards.forEach((s, i) => {
        s.draw(this.cvss[2], this.fireFlowerData.isColorful);
        s.update(this.cvsDocus[2], this.shards, this.fidelity);
        if (s.timer >= s.ttl || s.lightness >= 99) {
          this.cvss[3].fillRect(
            s.target.x,
            s.target.y,
            this.fidelity + 1,
            this.fidelity + 1
          );
          this.cvss[4].fillRect(
            s.target.x,
            s.target.y,
            this.fidelity + 1,
            this.fidelity + 1
          );
          this.shards.splice(i, 1);
        }
      });
      // requestAnimationFrame 浏览器提供的js全局方法,
      // 优化并行的动画动作, 代替定时器作用
      requestAnimationFrame(this.loop);
    },

    // 获取需要填充文字像素的坐标
    getTarget() {
      // jiang
      if (this.textTargetsT.length > 0) {
        const idx = Math.floor(Math.random() * this.textTargetsT.length);
        let { x, y } = this.textTargetsT[idx];
        this.textTargetsT.splice(idx, 1);

        x += this.cvsDocus[4].width / 2 - this.textWidth2 / 2;
        y += this.cvsDocus[4].height / 2 - this.fontSetting.textFontSize / 2;

        return { x, y: y - this.fontSetting.offsetTop1 };
      }
      if (this.textTargetsO.length > 0) {
        const idx = Math.floor(Math.random() * this.textTargetsO.length);
        let { x, y } = this.textTargetsO[idx];
        this.textTargetsO.splice(idx, 1);

        x += this.cvsDocus[2].width / 2 - this.textWidth / 2;
        y += this.cvsDocus[2].height / 2 - this.fontSetting.textFontSize / 2;
        return { x, y: y - this.fontSetting.offsetTop2 };
      }
    },
    resetCanvas() {
      this.cvss.forEach((item, index) => {
        item.clearRect(
          0,
          0,
          this.cvsDocus[index].width,
          this.cvsDocus[index].height
        );
        item.restore();
      });
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
        this.$nextTick(() => {
          this.shard = {};
          this.rocket = {};
          this.cvsDocus = [];
          this.cvss = [];
          this.rockets = [];
          this.shards = [];
          this.textTargetsO = [];
          this.textTargetsT = [];
          this.fidelity = 3;
          this.counter = 0;
          this.textWidth = 9999;
          this.textWidth2 = 9999;
          this.initCVS();
          this.loop();
        });
      });
    },
    // testHtml5Canvas() {
    //   html2canvas(this.$refs.picture, {useCORS: true}).then((canvas) => {
    //       // document.body.appendChild(canvas); // 自动在下方显示绘制的canvas图片
    //       const link = canvas.toDataURL("image/jpg");
    //       this.exportPicture(link, "文件名");
    //   })
    // },
    // 导出图片
    exportPicture(link, name = "未命名文件") {
      const file = document.createElement("a");
      file.style.display = "none";
      file.href = link;
      file.download = decodeURI(name);
      document.body.appendChild(file);
      file.click();
      document.body.removeChild(file);
    },
    startRecordGif() {
      html2canvas(this.$refs.picture, { useCORS: true }).then((canvas) => {
        this.$message.success("开始录制gif");
        document.body.appendChild(canvas); // 自动在下方显示绘制的canvas图片
        this.outsideCanvas = canvas;
        this.initGIF(canvas, this.$refs.picture);
        // const link = canvas.toDataURL("image/jpg");
        // this.exportPicture(link, "文件名");
      });
    },
    initGIF(canvas, html) {
      this.gifCom = new GIF({
        workers: 2,
        quality: 1,
        workerScript: getGifWorker(),
        debug: true,
        framerate: 30,
      });
      const ctx = canvas.getContext("2d");

      // 设定时间间隔
      const delay = 30;
      // 设置时间函数
      this.exportTimer = setInterval(() => {
        // 画布的宽高与视频宽高保持一致，延迟取上面定义的延迟时间
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        canvas.delay = delay;
        // canvas.getContext('2d').drawImage(this.$refs.picture, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.cvsDocus[0], 0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.cvsDocus[1], 0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.cvsDocus[2], 0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.cvsDocus[3], 0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.cvsDocus[4], 0, 0, canvas.width, canvas.height);
        // 将当前画面帧追加到 gif中
        const imgImage = new Image();
        imgImage.src = canvas.toDataURL("image/jpg");

        imgImage.onload = (e) => {
          // 绘制底色
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // 绘制当前帧
          ctx.drawImage(imgImage, 0, 0, canvas.width, canvas.height);

          // 当前帧追加到gif中
          this.gifCom.addFrame(canvas, { copy: true, delay: canvas.delay });
        };
        // 调用 requestAnimationFrame() 函数渲染下一帧
        // requestAnimationFrame(renderFrame);
        // 使用 Whammy.js 将 Canvas 帧转换为 WebM 视频帧
        // const videoFrames = [];
        // const whammy = new Whammy.Video(15);
        // whammy.add(ctx);
        // let output = whammy.compile(false, function(output1){
        //   var url = webkitURL.createObjectURL(output);
        //   // console.log("url:"+url);
        //   return url;
        //   // document.getElementById('download').style.display = '';
        //   // document.getElementById('download').href = url;
        // });
        // console.log(output)
        // const mediaChunks = [];
        // const mediaRecorder = new MediaRecorder(output, { mimeType: 'video/webm' });
        // mediaRecorder.ondataavailable = function (event) {
        //   if (event.data.size > 0) {
        //     mediaChunks.push(event.data);
        //   }
        // };
        // mediaRecorder.onstop = function () {
        //   const blob = new Blob(mediaChunks, { type: 'video/mp4' });
        //   const url = URL.createObjectURL(blob);
        //   const link = document.createElement('a');
        //   link.href = url;
        //   link.download = 'animation.mp4';
        //   link.click();
        // };
        // setTimeout(function () {
        //   mediaRecorder.stop();
        // }, 5000); // 捕获 5 秒钟的视频
      }, delay);
    },
    recordMedia() {
      html2canvas(this.$refs.picture, { useCORS: true }).then((canvas) => {
        this.exportTimer = setInterval(() => {
          this.outsideCanvas = canvas;
          const ctx = canvas.getContext("2d");
          canvas.width = this.canvasWidth;
          canvas.height = this.canvasHeight;
          ctx.drawImage(this.cvsDocus[0], 0, 0, canvas.width, canvas.height);
          ctx.drawImage(this.cvsDocus[1], 0, 0, canvas.width, canvas.height);
          ctx.drawImage(this.cvsDocus[2], 0, 0, canvas.width, canvas.height);
          ctx.drawImage(this.cvsDocus[3], 0, 0, canvas.width, canvas.height);
          ctx.drawImage(this.cvsDocus[4], 0, 0, canvas.width, canvas.height);
        }, 0);
        var stream = canvas.captureStream(120);
        console.log(stream);
        this.mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=vp9",
        });
        console.log("开始录制");
        let data = [];
        this.mediaRecorder.ondataavailable = (event) => {
          console.log(event.data);
          // if (event.data && event.data.size) {
          data.push(event.data);
          // }
        };
        this.mediaRecorder.onerror = (err) => {
          console.log(err);
        };
        this.mediaRecorder.onstop = () => {
          //结束录制时下载视频
          const url = URL.createObjectURL(
            new Blob(data, { type: "video/webm" })
          );
          var element = document.createElement("a");
          element.setAttribute("href", url);
          element.setAttribute("download", "");
          element.style.display = "none";
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        };
        //录制开始
        this.mediaRecorder.start();
        this.$message.success("开始录制");
      });
    },
    stopRecordMedia() {
      this.mediaRecorder.stop();
      this.$message.success("结束录制，视频生成中，请稍后...");
      console.log("结束录制");
    },
    stopRecordGif() {
      clearInterval(this.exportTimer);
      this.$message.success("gif生成中，时间可能较久，请稍后...");
      this.gifCom.render();
      // 监听渲染完成，返回 blob 文件流
      this.gifCom.on("finished", function (blob) {
        const url = URL.createObjectURL(blob);
        console.log(url, "渲染完成");
        const aLink = document.createElement("a");
        aLink.setAttribute("download", "img");
        aLink.setAttribute("href", url);
        aLink.click();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: black;
}
canvas {
  position: absolute;
}
</style>