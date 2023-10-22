import { initCanvas } from "./canvas";

let analyser = null
let buffer = null
let isInit = false

export default function () {
  let audio = document.querySelector("audio")
  function playCanvas() {
    if (isInit) {
      return
    }
    let audioContext = new AudioContext()
    // 创建音频分析器节点
    analyser = audioContext.createAnalyser()
    analyser.fftSize = 512;
    // Uint8Array保证数据每一项取值范围在0-255
    // analyser.frequencyBinCount 刚好是analyser.fftSize一半
    buffer = new Uint8Array(analyser.frequencyBinCount)

    // 创建音频来源
    let source = audioContext.createMediaElementSource(audio)
    // 来源节点连接音频节点
    source.connect(analyser)
    // 音频节点连接输出上下文的目标，就是播放器
    analyser.connect(audioContext.destination)
    isInit = true
    update()
  }
  if (!audio.paused) {
    playCanvas()
  }
  audio.onplay = playCanvas()
}

function update() {
  requestAnimationFrame(update)
  if (!isInit) {
    return
  }
  // 以调用该函数的时间点为准
  // 取一小段时间的数据分析，分析结果保存到数组
  // 频域数据
  analyser.getByteFrequencyData(buffer)
  let offset = Math.floor((buffer.length * 2) / 3)
  // let num = Math.floor(offset / 2)
  let datas = new Array(offset)
  for (let i = 0; i < offset; i++) {
    datas[i] = buffer[i] / 2
  }
  initCanvas(datas, offset)
}