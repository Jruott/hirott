#a：hover相关
###a:hover img 

假设一个需求：对一个图像链接加边框，并添加鼠标划过边框变色的效果。
之前我的实现都是将a标签block，然后设置相应状态的高宽和border，我也刨别人代码看过，多数都是这样实现的。试想一下如果使用精准的选择器能否控制图片的边框来达到我们要的效果了？如果能实现，那么我们的a标签就不需要设置额外的样式了。

　　首先做了个测试，具体代码如下：

		a img{
			padding:1px;
		}
		a.user img{
			border:3px solid #efefef;
		}
		a.user:hover img{border:3px solid #999;}

		<body>
			<a class="user" href="#">
				<img src="test.jpg"/>
			</a>
		</body>


很幸运，上面的代码在FF下已经达到了我们的功能需求，但不要高兴太早，在IE6下当鼠标划过时，图像的边框并没有按照我们想的变色。

原因就是因为 IE对hover这个伪类的不支持。在google上找了下发现了一个很容易的hack方法，并由此可轻易扩充到更多样的需求，例如在下面这个测试中我额外给img链接增添了一个tip。


　　代码的具体实现可查看源代码，下面只是重点指出hack的方法：

	a.user img{
		border:3px solid #efefef;
	}
	a.user:hover{zoom:1;}
	a.user:hover img{border:3px solid #999;}


如果我把上面的zoom:1;换成了border:none，你可能就不是这么容易发现这句hack了，你会认为这是一个多余的CSS定义，而恰恰相反，只要我们增加这么一句定义，而里面的属性只要跟下面一句定义不相同即可实现IE6下的兼容，是不是很简单。
　　
这样写下来代码也简洁多了，更重要的是边框的样式可以根据图的大小自适应了。

---

###2. 非a标签的hover的使用
一般来说hover这个css伪类对于除a标签外的标签是不起作用的（ff浏览器下可以起作用，ie6下不可以），这么好的一个伪类真浪费了！！然而市级上有办法实现非a标签的hover功能的，如下写：

	a:hover img{
	    border:1px solid #000 /*可以理解为鼠标在其上的a里面的img标签*/ 
	}

3.鼠标上移，改变颜色

	* a标签和css控制  

             <style type="text/css">
               a:hover{
                    color:red;
                    text-underline:none;
               }
             </style>
             <a>删除</a>

	* div标签 和 jquery方法/css控制

               <script type="text/javascript" >
                    $("#delete").hover(
                           function(){
                                注意这里先删除之前的颜色样式才行                                      
                           document.getElementByid("delete").removeClassName();                   
                           
                              $(this).attr('color','red');
                            },function(){
                                 $(this).attr('color','blue');
                            }
                    );
              </script>
               <div id="delete" style="cursor:pointer" onclick="XXX();">删除                                                                  
               </div>
