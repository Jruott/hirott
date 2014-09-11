#js数组合并的两种方法


	 // 第一种  
	 var mergeTo = [4,5,6],mergeFrom = [7,8,9];  

	 mergeTo = mergeTo.concat(mergeFrom);  
	 mergeTo; // is: [4, 5, 6, 7, 8, 9]  
   
	 or  
	 var a = [1,2], b = [3,4], c = a.concat(b);  
	   
	   
	 // 第二种  
	 var mergeTo = [4,5,6],  
	 var mergeFrom = [7,8,9];  
	   
	 Array.prototype.push.apply(mergeTo, mergeFrom); 

