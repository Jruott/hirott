#hasLayout
###一.hasLayout是什么   
hasLayout是微软IE7及一下的IE渲染引擎的一个内部组成部分，在ie中，一个元素要么自己对自身的内容的进行计算大小和组织，要么依赖于父元素来计算尺寸和组织内容。为了调节这两个不同的概念，渲染引擎采用了hasLayout的属性，属性值可以为true或false。当一个元素的hasLayout属性值为true时，我们说这个元素有一个布局（layout）。
大多IE下的显示错误，就是源于 haslayout。如果它设置成了true，它就不得不去渲染它自己，因此元素不得不扩展去包含它的流出的内容。例如浮动或者很长很长的没有截断的单词，如果haslayout没有被设置成true，那么元素得依靠某个祖先元素来渲染它。这就是很多的ie bugs诞生的地方。
当我们说一个元素“拥有layout”或“得到layout”，或者说一个元素“has layout” 的时候，我们的意思是指它的微软专有属性 hasLayout 被设为了 true。一个“layout元素”可以是一个默认就拥有 layout 的元素或者是一个通过设置某些 CSS 属性得到 layout的元素。

###二.哪些元素自身默认有一个布局（不完全列表）

* body and html

* table, tr, th, td

* img

* hr

* input, button, file, select, textarea, fieldset

* marquee

* frameset, frame, iframe

* objects, applets, embed   

并不是所有的元素都默认有布局，微软给出的主要原因是“性能和简洁”。当一个元素有一个布局时，它负责对自己和可能的子孙元素进行尺寸计算和定位。简单来说，这意味着这个元素需要花更多的代价来维护自身和里面的内容，而不是依赖于祖先元素来完成这些工作。


###三.大多数IE7 6 5下的bug都是因hasLayout产生的，如何激发hasLayout呢，使之”拥有布局“
display:inline-block;  
zoom:1;  
width: (除了auto)（设置高宽，肯定是可以的，但是不建议使用，这样就不能跟随内部的内容而自适应了）  
height:(除了auto)(单独设置都可以)   
height：1%    
position：absolute (测试了ie5、7都不行)   
float:left/right (测试了ie5、7都不行)  

IE7还有一些额外的属性（不完全列表）   
min-height    
min-width  (单独设置都可以)   
overflow：（除visible外）  
overflow-x：（除visible外）   
overflow-y：（除visible外）   
max-height：（不建议使用，必须还的根据内部内容看）  
max-width：（不建议使用，必须还的根据内部内容看）  
position：fixed（测试了ie7下并不行）  

所以我们一般常用zoom：1，总是可以出发zoom：1，也不影响现有环境下激发hasLayout
注意：这是在ie7及一下的解决方式，现代浏览器有自己的解决办法，这里这是举例hasLayout的，总的清除浮动总解决方案见下篇博文《我们一起清除过的浮动》）

###总结：
设置display：inline-block；zoom：1；height：1%；ie7下都激发hasLayout，所以我们常常用这三个属性，但是解决兼容性，现代浏览器有自己的方式，只需针对IE6-7这样解决，于是我们用hack来表示只在IE7以下声效*display：inline-block；*zoom：1；*height：1%，这样也不影响IE8以上以及其他浏览器的解决方案。

