#IE与FireFox在javascript中兼容性问题(经典)
1. window.event

	* IE：有window.event对象
	* FF：没有window.event对象。可以通过给函数的参数传递event对象。如onmousemove=doMouseMove(event)

2. 鼠标当前坐标

	* IE：event.x和event.y。

	* FF：event.pageX和event.pageY。
	* 通用：两者都有event.clientX和event.clientY属性。

3. 鼠标当前坐标(加上滚动条滚过的距离)

* IE：event.offsetX和event.offsetY。
* FF：event.layerX和event.layerY。
* 通用：event.clientY+document.documentElement.scrollTop（加垂直滚动条）。
* 通用：event.clientX+document.documentElement.scrollLeft（加水平滚动条）。
* 例：



		<div id="xys" style="width:500px;height:500px;border:1px solid" onmousemove="xyzb(event);">
		function xyzb(xy){
			xl=xy.clientX+document.documentElement.scrollLeft;
			yr=xy.clientY+document.documentElement.scrollTop;
			document.getElementById("xys").innerHTML=xl+","+yr;
		}


		
4. 标签的x和y的坐标位置：style.posLeft 和 style.posTop

	* IE：有。
	* FF：没有。
	* 通用：object.offsetLeft 和 object.offsetTop。

5. 窗体的高度和宽度

	* IE：document.body.offsetWidth和document.body.offsetHeight。注意：此时页面一定要有body标签签。
	* FF：window.innerWidth和window.innerHegiht，以及document.documentElement.clientWidth和document.documentElement.clientHeight。
	* 通用：window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth

6. 添加事件

	* IE：element.attachEvent("onclick", func);。
	* FF：element.addEventListener("click", func, true)。 (DOM2级)
	* 通 用：element.onclick=func（DOM0级）。虽然都可以使用onclick事件，但是onclick和上面两种方法的效果是不一样的，onclick 只有执行一个过程，而attachEvent和addEventListener执行的是一个过程列表，也就是多个过程。例如： element.attachEvent("onclick", func1);element.attachEvent("onclick", func2)这样func1和func2都会被执行。

7. 标签的自定义属性

	* IE：如果给标签div1定义了一个属性value，可以div1.value和div1["value"]取得该值。
	* FF：不能用div1.value和div1["value"]取。
	* 通用：div1.getAttribute("value")。

8. 父节点、子节点和删除节点

	* IE：parentElement、parement.children，element.romoveNode(true)。
	* FF：parentNode、parentNode.childNodes，node.parentNode.removeChild(node)。

9. 画图

	* IE：VML。
	* FF：SVG。

10. CSS：透明

	* IE：filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=60)。filter:alpha(opacity=10)
	* FF：opacity:0.6。

11. CSS：圆角

	* IE：不支持圆角。
	* FF： -moz-border-radius:4px，或者-moz-border-radius-topleft:4px;-moz-border- radius-topright:4px;-moz-border-radius-bottomleft:4px;-moz-border-radius- bottomright:4px;。

12. CSS：双线凹凸边框

	* IE：border:2px outset;。
	* FF： -moz-border-top-colors: #d4d0c8 white;-moz-border-left-colors: #d4d0c8 white;-moz-border-right-colors:#404040 #808080;-moz-border-bottom-colors:#404040 #808080;。


