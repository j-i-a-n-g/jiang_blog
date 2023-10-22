export const initCanvas = function (buffer) {
  let dom = document.querySelector('canvas')
  let canvas = dom.getContext('2d')
  canvas.lineWidth = 2;

  // let radius = 100;
  let centerX = dom.width / 2;
  let centerY = dom.height / 2
  // // 控制每个点在圆周上的角度增量, 公式 = 圆周长（2 * PI）/ 总点数200
  // let angleIncrement = (2 * Math.PI) / 50
  canvas.clearRect(0, 0, dom.width, dom.height)
  buffer = buffer.reverse()
  for (let i = 0; i < buffer.length; i++) {
    // let angle = i * angleIncrement
    // let x = ricleX + radius * Math.sin(angle)
    // let y = ricleY + radius * Math.cos(angle)
    // canvas.moveTo(x, y);
    // canvas.fillRect(x, y, 2, 10)
    // canvas.rotate(0)
    // canvas.fillStyle = '#fff'
    let x = i * 5;
    canvas.moveTo(x, 0);
    canvas.fillRect(x, dom.height - 20, -3, buffer[i] ? -buffer[i] : 2);
    // canvas.rotate(180)
  }
  // 创建线性渐变对象
  let gradient = canvas.createLinearGradient(0, 0, buffer.length * 5, 0)
  gradient.addColorStop(0, '#fff')
  gradient.addColorStop(0.25, 'red')
  gradient.addColorStop(0.5, 'green')
  gradient.addColorStop(0.75, 'blueviolet')
  gradient.addColorStop(1, 'blue')
  canvas.fillStyle = gradient;
  canvas.fill()
}