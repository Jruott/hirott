#call 和 apply  
###1.call 
XXX.call(objThis,[param1,[param2]])  
objThis:这个对象将替换XXX中的this对象  
param：一个参数列表（多个参数用逗号隔开）  

如：Fun1.call（new Obj（））；  
如下的代码可以清晰的理解call，即更改了对象的内部指针，即改变对象的this指向的内容，**即以另外一个对象替换当前对象** 	 	

    <input type="text" id="myText"   value="input text">
    <script>
		function obj(){
			this.value = "对象！";
		}
		var value = "global 变量";
		
		function Fun1(){
			alert(this.value);
		}

		window.Fun1();  //"global 变量"
		Fun1.call(window);   //"global 变量"
		Fun1.call(document.getElementById('myText'));   //"input text"
		Fun1.call(new Obj());   //"对象！"
	</script>


###2.apply  
apply 和 call两者在作用上是一样的，只是参数上有所不同，call使用的参数列表，而apply用的是数组，还可以用**arguments**来声明，能劫持另外一个对象的方法，继承另外一个对象的属性.  
最大的应用在对象冒充实现构造函数**继承**。  
写法：  
func.call(func1,var1,var2,var3)  
func.apply(func1,[var1,var2,var3])

		/*定义一个人类*/      
		function Person(name,age){          
			this.name=name;         
			this.age=age;      
		}      
		
		/*定义一个学生类*/     
		function Student(name,age,grade){          
			Person.apply(this,arguments);          
			this.grade=grade;      
		}      
		//创建一个学生类       
		var student=new Student("qian",21,"一年级");      
		//测试       
		alert("name:"+student.name+"\n"+"age:"+student.age+"\n"+"grade:"+student.grade);
       //可以看到测试结果name:qian  age:21  grade:一年级     
	   //学生类里面我没有给name和age属性赋值啊,为什么又存在这两个属性的值呢,这个就是apply的神奇之处.
		
**分析**：  
1.Person.apply(this,arguments);
this：在创建对象的时候代表的student   
arguments:是一个数组，也就是[“qian”,”21”,”一年级”];   
也就是说用student去执行Person这个类里面的内容，在Person里面存在有this.name等语句，这样就将属性创建到了student对象里面了。实现了js的继承。

***用call一样的，只需把参数换成列表： Person.call(this,name,age);***


###3.什么情况用call，什么情况用apply
+ apply：传的参数数组，且他们的参数列表是一一对应的，如：person和student的前两个都是name，age，这样可采用apply。
+ call：除了参数列表相同时，也可用call，参数列表不相同时，只能用call，如：Person（age，name）、Student(name,age,grade),只能用Person.call(this,age,name);才能正确实现继承，不然参数和值就会颠倒。


###4.apply的巧用
apply的一个巧妙的用处,可以将一个数组默认的转换为一个参数列表([param1,param2,param3] 转换为 param1,param2,param3

+ 参数传数组时实现Math.max：  

    因为Math.max(param1,param2,param3...)，不支持穿数组，所以我们用：  

		var math = Math.max.apply(null,array)；
		就可以得到数组中最大的一项了。

+ 实现Math.min:          

		var min = Math.min.apply(null,array);    
		就可以得到数组中最小的一项了。 


**这块在调用的时候第一个参数给了一个null,这个是因为没有对象去调用这个方法,我只需要用这个方法帮我运算,得到返回的结果就行,.所以直接传递了一个null过去**

+ Array.prototype.push实现两个数组合并同样push方法没有提供push一个数组，但它提供push（param1,param,…paramN），所以同样用apply来装换数组。   
  
		
		var arr1 = new Array("1","2","3");  
		var arr1 = new Array("4","5","6");    
		Array.prototype.push.apply(arr1,arr2);
   也可以这样理解,arr1调用了push方法,参数是通过apply将数组装换为参数列表的集合



