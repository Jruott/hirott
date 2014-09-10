#js数据类型判断和数组判断 
这么基础的东西实在不应该再记录了，不过嘛，温故知新~就先从数据类型开始吧
 
js六大数据类型：number、string、object、Boolean、null、undefined  
string： 由单引号或双引号来说明，如"string"  
number：什么整数啊浮点数啊都叫数字，你懂的~  
Boolean: 就是	true和false啦   
undefined：未定义，就是你创建一个变量后却没给它赋值~   
null: 故名思久，null就是没有，什么也不表示   
object: 所有的父类   
 

###数据类型判断之 typeof  
typeof可以解决大部分的数据类型判断，是一个一元运算，放在一个运算值之前，其返回值为一个字符串，该字符串说明运算数的类型，所以判断某个是否为String类型，可以直接 if(typeof(你的值) == "string"){}  

以下是各种数据类型返回结果：  
   
	var a="string"; console.log(typeof a); //string 
	var a=1; console.log(typeof a); //number
	var a=false; console.log(typeof a); //boolean
	var a; console.log(typeof a); //undfined
	var a = null; console.log(typeof a); //object 
	var a = document; console.log(typeof a); //object
	var a = {}; console.log(typeof a); //object
	var a = []; console.log(typeof a); //object
		
	var a = function(){}; console.log(typeof a) //function   
	除了可以判断数据类型还可以判断function类型

这样一来就很明显了，除了前四个类型外，null、对象、数组返回的都是object类型； 
    
对于函数类型返回的则是function，再比如typeof(Date)，typeof(eval)等。    

###null & undefined

	var box=null
	//你还没有来得及创建对象，先声明一个对象的变量放在那边，默认初始化为null。

	alert(undefined == null); 
	//true 他们都是空的，所以相等
	alert(undefined === null) 
	//false 数据类型不相等，第一个是Undefined，返回的值是undefined，第二个是Null，返回的值是object
	也等同于alert(typeof undefined == typeof null) false

	alert(window.aut008); //undefined ： window中没有aut008这个变量
	alert(document.getElementById("tt"));  //null ： 获取页面没有的元素
	alert(document.getElementById("has").value);  //undefined  ： 获取元素中没有的属性（除了input，会弹出""）
	alert(document.getElementById("has").name);	//undefined ： 获取元素中没有的属性（除了input，会弹出""）


	NaN是一种特殊的number，‘not a number’
	var a3 = NaN;
	alert(a3 == a3); //显示"false",NaN与其他数值进行比较的结果总是不相等的，包括它自身在内
	alert(a3 != a3); //显示"true"


---

**然后这里就可以再引申出另一个灰常热门并且解决方法已普遍存在的问题，如何判断数据是个数组类型？**  

###js判断数组类型的方法


**方法一之 instanceof**   

instance，故名思义，实例，例子，所以instanceof 用于判断一个变量是否某个对象的实例，是一个三目运算式---和typeof最实质上的区别   

a instanceof b?alert("true"):alert("false")  //注意b值是你想要判断的那种数据类型，不是一个字符串，比如Array
举个例子:  

	var a=[];
	console.log(a instanceof Array) //返回true 

**方法二之 constructor**

在W3C定义中的定义：constructor 属性返回对创建此对象的数组函数的引用  

就是返回对象相对应的构造函数。从定义上来说跟instanceof不太一致，但效果都是一样的

如: (a instanceof Array)   //a是否Array的实例？true or false
　  (a.constructor == Array)  // a实例所对应的构造函数是否为Array? true or false

举个例子：

	function employee(name,job,born){
	    this.name=name;
	    this.job=job;
	    this.born=born;
	}

	var bill=new employee("Bill Gates","Engineer",1985);
	console.log(bill.constructor);
	 //输出function employee(name, jobtitle, born){this.name = name; this.jobtitle = job; this.born = born;}

那么判断各种类型的方法就是:

	console.log([].constructor == Array);
	console.log({}.constructor == Object);
	console.log("string".constructor == String);
	console.log((123).constructor == Number);
	console.log(true.constructor == Boolean);

较为严谨并且通用的方法：
	function isArray(object){
	    return object && typeof object==='object' &&
	            Array == object.constructor;
	}

！！注意：
使用instaceof和construcor,被判断的array必须是在当前页面声明的！比如，一个页面（父页面）有一个框架，框架中引用了一个页面（子页面），在子页面中声明了一个array，并将其赋值给父页面的一个变量，这时判断该变量，Array == object.constructor;会返回false；
原因：
1、array属于引用型数据，在传递过程中，仅仅是引用地址的传递。    
2、每个页面的Array原生对象所引用的地址是不一样的，在子页面声明的array，所对应的构造函数，是子页面的Array对象；父页面来进行判断，使用的Array并不等于子页面的Array；切记，不然很难跟踪问题！   


**方法三之 特性判断法**  
以上方法均有一定的缺陷，但要相信人民大众的智慧是无所不能及的，我们可根据数组的一些特性来判断其类型 

	function isArray(object){
	    return  object && typeof object==='object' &&    
	            typeof object.length==='number' &&  
	            typeof object.splice==='function' &&    
	             //判断length属性是否是可枚举的 对于数组 将得到false  
	            !(object.propertyIsEnumerable('length'));
	}
有length和splice并不一定是数组，因为可以为对象添加属性，而不能枚举length属性，才是最重要的判断因子。   

ps: 在这里普及下 propertyIsEnumerable 方法：   
object. propertyIsEnumerable(proName)   
判断指定的属性是否可列举
备注：如果 proName 存在于 object 中且可以使用一个 For…In 循环穷举出来，那么 propertyIsEnumerable 属性返回 true。如果 object 不具有所指定的属性或者所指定的属性不是可列举的，那么 propertyIsEnumerable 属性返回 false。  
propertyIsEnumerable 属性不考虑原型链中的对象。  

示例：

	var a = new Array("apple", "banana", "cactus");
	document.write(a.propertyIsEnumerable(1));


**方法四之 最简单的方法**

 对于这种方法，以下有几个链接可供参考解释：
http://blog.csdn.net/zhangw428/article/details/4171630
http://my.oschina.net/sfm/blog/33197
http://openxtiger.iteye.com/blog/1893378

	function isArray(o) {
	    return Object.prototype.toString.call(o) === ‘[object Array]‘;
	}
 
