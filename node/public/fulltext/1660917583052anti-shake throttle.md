# 防抖节流

### 1.防抖

**在第一次触发事件时，不立即执行函数，而是给出一个期限值比如200ms**，然后：

- 如果在200ms内没有再次触发滚动事件，那么就执行函数
- 如果在200ms内再次触发滚动事件，那么当前的计时取消，重新开始计时

**效果**：如果短时间内大量触发同一事件，只会执行一次函数。

**实现**：既然前面都提到了计时，那实现的关键就在于`setTimeout`这个函数，由于还需要一个变量来保存计时，考虑维护全局纯净，可以借助闭包来实现：

```javascript
   function scrollValue(){

        let scrollTop = document.body.scrollTop ||  document.documentElement.scrollTop;

        console.log("滚动条位置"+scrollTop);
  }


  window.onscroll = throttle(scrollValue,100);



    /*
       防抖

       如果短时间内大量触发同一事件，只会执行一次函数。

       @params fn {Function}  需要减低使用次数的回调函数
       @params deley {number}  延迟时间
    
    */

    function debounce(fn,deley){
         let timer = null;

         return function(){
              
              if(timer){
                  clearTimeout(timer);
              }
            
              timer = setTimeout(fn,deley);
              
         }
    }


    /*
       节流

       如果在限定时间段内，不断触发滚动事件（比如某个用户闲着无聊，按住滚动不断的拖来拖去），只要不停止触发，理论上就永远不会输出当前距离顶部的距离。
       
       @params fn {Function}  
       @params deley {number}  延迟时间
    */

    function throttle(fn,deley){
         let flag = true;

         return function(){

              if(!flag){
                  //暂停执行后面的代码
                  return false;
              }

              flag = false;

              setTimeout(()=>{
                  fn();
                  flag = true;
              },deley)

         }
    }
```

