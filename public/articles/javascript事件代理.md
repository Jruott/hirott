#javascript事件代理

###为什么要事件代理
事件代理：顾名思义，当你不想或者不能直接操作目标对象时，代理对象来调用目标的方法，从而达到操作目标对象的目的。

为什么要事件代理：   
1.增加交互性，传统事件中，你也许需要对每一个元素添加或者删除事件处理器，操作冗余。   
2.很多的事件处理器可能导致性能降低或者内存泄露，用的越多风险越大。提高了性能，并降低了崩溃的。风险。

###事件代理如何运作的
原理是事件冒泡，当一个元素被触发，如点击了一个div，那么就会逐级向上传播，知道html节点 document节（IE5-6）点或者window，途中只要某个节点绑定有事件，该事件就会触发。这样我们可以在父元素上绑定事件处理器，等到子元素触发了事件冒泡上来，触发父元素的事件处理器，并且可以得知这个事件从哪个元素开始的（target or srcElement是不变的）。

但不是所有的事件都能冒泡的。blur、focus、load和unload不能像其它事件一样冒泡。事实上blur和focus可以用事件捕获而非事件冒泡的方法获得（在IE之外的其它浏览器中）。 

示例：如果有100行的表格，我们想在用户点击某个表格时，知道他的id，我们就没必要遍历每个表格，然后给每个表格添加点击事件，直接在它的父元素上添加点击事件：

	var tableExp = document.getElementsByTagName("table");
	tableExp.onclick = function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.nodeName.toLowerCaer() == "td"){
			alert(target.id);
		}
	}

	
	//此段代码一样的示例，旨在强调arguments，这个js函数开始就具有，火狐中第一个自动为事件参数，后面的都是调用函数时所传的参数，而ie的事件时window自动的，所以arguments里都是调用函数时传的参数。
	var nav = document.getElementById("nav");
	nav.onclick = function () {
		var e = arguments[0] || window.event,
		target = e.srcElement ? e.srcElement : e.target;
		alert(target.innerHTML);
		return false;
	}


	//传统做法
	window.onload = function(){
		var nav = document.getElementById("nav");
		var links = nav.getElementsByTagName("a");
		for (var i=0,l = links.length; i<l; i++) {
			links[i].onclick = function () {
				alert(this.innerHTML);
				return false;
			}
		}
	}

