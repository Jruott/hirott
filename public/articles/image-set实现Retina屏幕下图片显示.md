#image-set实现Retina屏幕下图片显示

###前言
image-set对我来说，我也很陌生，于是借助G爸和度娘海量的搜索image-set，才知道Webkit内核"safari6"和“chrome21”支持CSS4的background-image新规范草案image-set。通过Webkit内核的浏览器私有属性“-webkit”，image-set为Web前端人员提供了一种解决高分辨率图像的显示，用来解决苹果公司提出的Retian屏幕显示图片的技术问题。简而言之：这个属性用来支持Web前端人员解决不同分辨率下图片的显示，特别的（Retina屏幕）。

**qq.com就是采用了这种方法**，对Logo图片进行了处理，在普通分辨率下，将调用“qqlogo_1x.png”图片，而在Retina屏幕下（比如iPhone4s,iPhone5，New iPad等IOS设备）下会调用“qqlogo_2x.png”图像，从而避免了Logo在Retina屏幕下显示不清晰的问题。

###HTML 结构
	<div id="test"></div>
 	
###CSS代码
	#test {
	  background-image: url(assets/no-image-set.png); 
	  background-image: -webkit-image-set(url(assets/test.png) 1x,url(assets/test-hires.png) 2x);
	  background-image: -moz-image-set(url(assets/test.png) 1x,url(assets/test-hires.png) 2x);
	  background-image: -o-image-set(url(assets/test.png) 1x,url(assets/test-hires.png) 2x);
	  background-image: -ms-image-set(url(assets/test.png) 1x,url(assets/test-hires.png) 2x);
	  width:200px;
	  height:75px;
	}


类似于不同的文本，图像也会显示成不同的：

1. 不支持image-set：在不支持image-set的浏览器下，他会支持background-image图像，也就是说不支持image-set的浏览器下，他们解析background-image中的背景图像；
2. 支持image-set：如果你的浏览器支持image-sete，而且是普通显屏下，此时浏览器会选择image-set中的@1x背景图像；
3. Retina屏幕下的image-set：如果你的浏览器支持image-set，而且是在Retina屏幕下，此时浏览器会选择image-set中的@2x背景图像。


###为什么要使用image-set而不使用Media Queries?

不像Media Queries，image-set不需要告诉浏览器使用什么图像，而是直接提供了图像让浏览器选择。在未来，我希望有人在使用Retina设备浏览网页，但网速慢时，告诉设备采用低分辨率的图像。甚至会更好，他能根据网速智能的选择需要的图像。

使用“Media Queries”的问题是，在高分辨率显示器下他没有选择的权利。也就是说，浏览器分辨率等于1或2或者其他的时候，浏览器必须加载指定的图像。

image-set的好处是，在支持image-set的浏览器会在高分辨下匹配需要的图像，而没有其他额外的功能。但我相信，为浏览器提供不同的图像选择，这浏览器在不同的分辨下选择正确的图像。
image-set能让各种不同分辨下的图像都显示在CSS中的同一个地方。而使用media queries显示不同图像时，你可能会隔开很多行代码，难于寻找到对应的图像。

image-set真的好强大，很可惜的是，他仅支持background-image属性，而不能使用在“<img>”标签中。前面也说过了，目前image-set只能使用webkit浏览器的私有属性“-webkit”在“Safari6”和“Chrome21”下运行。现在在IOS 6得到支持。不过很遗憾的是，目前别的浏览器还是不支持image-set,现在他仅是CSS4的一个草案，希望将来能写到标准中，造福于苦逼的前端人员。



