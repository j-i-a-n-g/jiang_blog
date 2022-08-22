# 闭包和递归

### 1.闭包

 闭包（closure）是Javascript语言的一个难点，也是它的特色，很多高级应用都要依靠闭包实现,  闭包简单的理解就是一个作用域中访问另一个作用域中的变量.  一般情况是一种函数嵌套，内置函数访问外部函数的变量。构成闭包

 闭包形成条件 (函数嵌套，内部函数调用外部函数的变量)111111

```javascript
    /*
       闭包的形成条件
       1.函数嵌套
       2.内部函数调用外部函数变量
    */


    function fn(){
        let age  = 18;
        let myName = "鲁班";

         function fun(){
             console.log(age);
             console.log(myName);
         }

         fun();
    }


    fn();


    /*
      闭包就是一个对象  {key:value}
    */



   //将内部函数返回

    function fn(){
       let age = 20;

         return function (){
              
             console.log(age);
         }
    }

  let fn1 = fn();
  
  

  fn1();    //20     闭包的作用：延长变量的作用域链  
```

闭包小案例:

```javascript
  function fn(){
        let count  = 0;

        return function(){
            count++;
            console.log(count);
        }
    }

    let fn1  = fn();
   
     fn1();  //1
     fn1();  //2
     fn1();  //3
     fn1();  //4
     fn1();  //5
     fn1();  //6
     fn1();  //7

    //由于作用域链延长   好处:局部变量 不影响全局但可以实现自增。  
```

**闭包总结：**

闭包的优点：

​    1.隐藏变量，避免全局污染

​    2.可以读取函数内部的变量

 

 闭包的缺点：

​    1.导致变量不会被垃圾回收机制回收，造成内存消耗

​    2.不恰当的使用闭包可能会造成内存泄漏的问题



**防止闭包造成内存泄漏**

```javascript
    window.addEventListener('load',function(){

        let btn  = document.querySelector(".btn");
        
        let value = btn.innerHTML;
        btn.addEventListener('click',function(){
                 
             console.log(value);
  
        })

        btn = null;
    })

//使用完 讲变量设置成null   等待下一次垃圾回收器回收。
```

**闭包的应用**

```javascript
//形成一个沙箱环境。 模块化实现

(function(window){
    
      let name = "ztf";
      let age  = 10;

      function getName(){
          return name;
      };

      function getAge(){
          return age;
      }


      window.Info = {
          getName:getName
      }
    

})(window)
```

面试题1:

```javascript
    function fn(){
         let a = 10;
        return (function(num){
             return num;
        })(a)
        
    }

  let fn1  =  fn();

  console.log(fn1);  ?
```

面试题2：

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function log() {
    console.log(i); // => ?
  }, 1000);
}
```

面试3：

```javascript
function fun(n,o) {
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);//undefined,?,?,?
var b = fun(0).fun(1).fun(2).fun(3);//undefined,?,?,?
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,?,?,?

//答案：
//a: undefined,0,0,0
//b: undefined,0,1,2
//c: undefined,0,1,1

```



### 2.递归

递归就是函数内部调用自身函数（自己调用自己）

```javascript
  //会报错的代码
    function fn(){
        console.log("今天晚上吃啥？");
        fn();
    }

    fn();

 //求累加和
   let sum  = 0;

    for(let i = 0;i<=5;i++){
        
        sum += i;
        console.log(i);
    }

    console.log(sum);
```

案例1：递归实现累加

```javascript
    function sum(x){
        
        if(x == 1){
            return 1;
        }

        return x+sum(x-1);
    }

    let result  = sum(100);

    console.log(result);

  //存在的问题
  
    function sum(x){
        
        if(x == 1){
            return 1;
        }

        return x+sum(x-1);
    }

    let anotherSum  = sum;
      
      sum = null;

  let result =  anotherSum(100);

    console.log(result);


  //解决方案
   function sum(x){
        
        if(x == 1){
            return 1;
        }

        return x+ arguments.callee(x-1);
    }
```

案例2:求一个数字各个位数上的数字的和:  357

```javascript
 //要求：求各个位数上的和(递归实现)   列：357  ----> 3+5+7

    function getSigleTotal(num){

        if(num<10){
            return num;
        }

        return  num%10+ getSigleTotal(parseInt(num/10));
    }


    let result = getSigleTotal(357);

    console.log(result);
```

 案例3：求斐波拉契数列和

```javascript
   function  getfeibo(x){
      
       if(x == 1 || x == 2){
           return 1;
       }

       return getfeibo(x - 1)+getfeibo(x - 2);
    
   }


   console.log(getfeibo(12));
```

### 3.浅拷贝

```javascript
    let obj  = {
        name:'鲁班',
        age:20,
        sex:"男"
    }


    let obj1 = {};

   function copy(a,b){

       for(let key in b){
          a[key] = b[key];
       }
   }

   copy(obj1,obj);

   console.log(obj1);
```

### 4.深拷贝

```javascript
    let obj  = {
        name:'鲁班',
        age:20,
        sex:"男",
        hobby:['打游戏','敲代码','旅行'],
        other:{dream:'travel the world',target:'Love what I love'}
    }

    let obj1  = {};

    function deepCopy(a,b){
        for(let key in a){
            let item = a[key]; 

            if(item instanceof Array){
                 b[key] = [];
                 deepCopy(item,b[key]);
            }else if(item instanceof Object){
                b[key] = {};
                deepCopy(item,b[key]);
            }else{
                b[key] = item;
            }
        }
    }


    deepCopy(obj,obj1);


    console.log(obj1);

```
