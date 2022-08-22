# js运行原理

js运行原理为啥要学呢？ 我们通过了解js的运行原理才能帮助我们构建更优美的代码，提高运行效率，帮助我们快速找到代码中的问题所在

#### 1.进程与线程

进程是cpu资源分配的最小单位，进程可以包含多个线程。 浏览器就是多进程的，每打开的一个浏览器窗口就是一个进程。

线程是cpu调度的最小单位，同一进程下的各个线程之间共享程序的内存空间。

可以把进程看做一个仓库，线程是可以运输的货车，每个仓库有属于自己的多辆货车为仓库服务（运货），每个仓库可以同时由多辆车同时拉货，但是每辆车同一时间只能干一件事，就是运输本次的货物。这样就好理解了吧。

浏览器主要包括四个进程:

  1.主进程（Browser进程），浏览器只有一个主进程，负责资源下载，界面展示等主要基础功能

  2.GPU进程，负责3D图示绘制

  3.第三方插件进程，负责第三方插件处理

  4.渲染进程（Renderer进程），负责js执行，页面渲染等功能，也是本章重点内容



####  2.GUI渲染线程

​     1.首先浏览器会解析html代码（实际上html代码本质是字符串）转化为浏览器认识的节点，生成DOM树，也就是DOM Tree  

​      2.然后解析css，生成CSSOM（CSS规则树）

​      3.把DOM Tree 和CSSOM结合，生成Rendering Tree(渲染树)

GUI就是来干这个事情的，如果修改了一些元素的颜色或者背景色，页面就会重绘（Repaint），如果修改元素的尺寸，页面就会回流（Reflow），当页面需要Repaing和Reflow时GUI多会执行，进行页面绘制。

#### 3.JS引擎线程

js引擎线程就是js内核，负责解析与执行js代码，也称为主线程。浏览器同时只能有一个JS引擎线程在运行JS程序，所以js是单线程运行的。

需要注意的是，js引擎线程和GUI渲染线程同时只能有一个工作，js引擎线程会阻塞GUI渲染线程

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./js/demo.js"></script>
</head>
<body>
    <div class="box">
        <div class="inbox">
            <span>今天夜宵吃啥？</span>
        </div>
    </div>
</body>
</html>

```

在浏览器渲染的时候遇到<script>标签，就会停止GUI的渲染，然后js引擎线程开始工作，执行里面的js代码，等js执行完毕，js引擎线程停止工作，GUI继续渲染下面的内容。所以如果js执行时间太长就会造成页面卡顿的情况，这也是后面性能优化的点。

#### 4.事件循环线程

事件循环线程用来管理控制事件循环，并且管理着一个事件队列（task queue），当js执行碰到事件绑定和一些异步操作时，会把对应的事件添加到对应的线程中（比如定时器操作，便把定时器事件添加到定时器线程），等异步事件有了结果，便把他们的回调操作添加到事件队列，等待js引擎线程空闲时来处理。

#### 5.定时器线程

由于js是单线程运行，所以不能抽出时间来计时，只能另开辟一个线程来处理定时器任务，等计时完成，把定时器要执行的操作添加到事件任务队列尾，等待js引擎线程来处理。这个线程就是定时器线程。

#### 6.异步请求线程

当执行到一个http异步请求时，便把异步请求事件添加到异步请求线程，等收到响应（准确来说应该是http状态变化），把回调函数添加到事件队列，等待js引擎线程来执行。

#### 7.Event Loop

上面介绍了渲染进程中的5个主要的线程，可能看完上面对各个线程简单的介绍，还有点不明白他们之间到底怎么协作工作的，下面就从Event Loop的角度来聊一聊他们之间是怎样那么愉快合作的。

已经知道了js是单线程运行的，也知道js中有同步操作和异步操作。同步和异步大家应该很熟了，不多介绍。

同步操作运行在js引擎线程（主线程）上，会形成一个执行栈，而异步操作则在他们对应的异步线程上处理（比如：定时操作在定时器线程上；http请求则在异步请求线程上处理）。

而事件循环线程则监视着这些异步线程们，等异步线程们里面的操作有了结果（比如：定时器计时完成，或者http请求获取到响应），便把他们的毁掉函数添加到事件队列尾部，整个过程中执行栈、事件队列就构成Event Loop。

![](D:\js备课\day31\demo\img\loop.png)

### 8.异步出现的意义

```javascript
 //思考 js为何为何要有异步的概念

  console.log("今天晚上吃啥？");

  
  for(let i = 0;i<600;i++){
      console.log("上个厕所，兄弟，容我想想，等我回来");
    }
 

  

  console.log("今天吃火锅");

  console.log("不行火锅伤身体");


//异步出现了之后
  console.log("今天晚上吃啥？");

 
  
  setTimeout(function(){
    for(let i = 0;i<600;i++){
      console.log("我肚子不舒服，兄弟们！。 你们先讨论，我去清了一下内存");
    }
  },10)

  

  console.log("今天吃火锅");

  console.log("不行火锅伤身体");
```



案例1：

```javascript
  

function fn(){
       let data = {};

       setTimeout(function(){
           data.name = "鲁班";
           data.age  = 10;
           data.eat  = function(){
               console.log("今天夜宵吃啥？");
           }
       },10)

       return data;

    }


   let result = fn();

   console.log(result.name);


//回调函数解决
```

案例2：

```javascript
   let btn = document.querySelector(".btn");

   btn.addEventListener("click",function(){
       console.log("2");
   })

   console.log("1");

   setTimeout(function(){
       console.log("333");
   },0)

   console.log("444");
```

案例3：

```javascript
function fn1 () {
 console.log(' 1')
}
 
function fn2 () {
 setTimeout(() => {
  console.log('2')
 }, 500)
}
 
function fn3 () {
 console.log('3')
}

fn1(); fn2(); fn3();
```

案例4：---->改进案例3 (执行循序是1，2，3)

```javascript
function fn1 () {
 console.log('Function 1')
}
 
function fn2 (callback) {

 setTimeout(() => {
  console.log('Function 2')

  callback();
 }, 500)

}
 
function fn3 () {
 console.log('Function 3')
}

fn1(); fn2(fn3);;
```

### 8.定时器也不一定"准时"(通过同步异步来理解这个概念)

```javascript
let start  = Date.now();

setTimeout(function(){

    console.log("执行时间:"+(Date.now() - start));

},2000);


for(let i = 0;i<10000;i++){
    console.log(i);
}
```

