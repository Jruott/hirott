#IE、IE9、IE8、IE7、IE6的hack

###非条件注释 CSS | hack 法
IEhack



- _：IE6专属hack  


- !importantIE6hack，ps：只有同时存在两个相同属性时IE6才能识别
   
+ *：IE6、7hack  


- \0：IE8+  


- \9\0：IE9+  


- \9：IE6+，可以理解为所有IE  

		.hack{
			width:100px;height:100px;
			background-color:red; 		/*所有浏览器*/
			background-color:black\0;/*IE8+*/
			background-color:blue\9\0;	/IE9+，则楼上的hack则仅针对IE8*/
			*background-color:purple; /*IE7、IE6*/
			_background-color:gray;  /*IE6*/
			/*hack顺序：Firefox、chrome 、其他-> IE9-> IE8-> IE7 -> IE6 */
		}

###区别IE6和其他浏览器的还有一种方法，如下
	.ie-hack{
	    background-color:yellow!important;/*仅仅IE6不识*/
	    background-color:red;
	}
	//其他浏览器都显示黄色，只有ie6显示红色


###条件注释 CSS | hack 法

	<!--[if lte IE 7]>IE版本小于等于7<![endif]-->
	<!--[if lt IE 7]>E版本小于7<![endif]-->
	<!--[if gte IE 7]>IE版本大于等于7<![endif]-->
	<!--[if gt IE 7]>IE版本大于7<![endif]-->
	<!--[if !(IE )]>非IE<![endif]-->
	<!--[if (IE 6)&(IE 7)]>IE6和IE7<![endif]-->
	<!--[if (IE 6)|(IE 7)]>IE6或者IE7<![endif]-->