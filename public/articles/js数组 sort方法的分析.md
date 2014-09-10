#js数组 sort方法的分析

javascript 中 Array.sort()方法是用来对数组项进行排序的 ，默认情况下是进行升序排列，实例代码如下：

    var arrA = [6,2,4,3,5,1];
    arrA.sort();
    document.writeln(arrA);
//结果是：1,2,3,4,5,6 

sort() 方法可以接受一个 方法为参数 ，这个方法有两个参数。分别代表每次排序比较时的两个数组项。sort()排序时每次比较两个数组项都回执行这个参数，并把两个比较的数组项作为参数传递给这个函数。当函数返回值为1的时候就交换两个数组项的顺序，否则就不交换。

实例如下：
 
    var arrA = [6,2,4,3,5,1];
    
	/*
	arrA.sort();
	    document.writeln(arrA);
	    
	*/
	
	    
	function desc(x,y){        
		if (x > y)  
	      return -1;
	        
		if (x <y)          
			return 1;
	 }
	
	    
	function asc(x,y){ 
		if (x > y)         
			return 1;
		if (x <y)          
			return -1;
	}

    arrA.sort(desc);    
	// sort by desc

    document.writeln(arrA);

    arrA.sort(asc);    
	//sort by asc

    document.writeln(arrA);

//输出结果：

6,5,4,3,2,1
 
1,2,3,4,5,6 
另外，可以直接把一个无名函数直接放到sort()方法的调用中。如下的例子是将奇数排在前面，偶数排在后面，例子如下：
 
        var arrA = [6,2,4,3,5,1];
        arrA.sort( function(x, y) {            
			if (x % 2 ==0)  
		            return 11;
			if (x % 2 !=0)        
		             return -1;
		});
		document.writeln(arrA);
		
		//输出：1,5,3,4,6,2 

------


这个方法对数字类别的数字数组排序有效，但是当对字符型的数字数组排序时就失效了

	function strAsc(a,b) {
		return a - b;
	}
	var arr = new Array(6)
	arr[0] = "10"
	arr[1] = "5"
	arr[2] = "40"
	arr[3] = "25"
	arr[4] = "1000"
	arr[5] = "1"
	document.write(arr.sort());//输出结果是1,10,1000,25,40,5
	document.write(arr.sort(strAsc));//输出结果是1,5,10,25,40,1000