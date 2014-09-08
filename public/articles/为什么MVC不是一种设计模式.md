#为什么MVC不是一种设计模式

###MVC起源  
1979年，Trygve Reenskaug 这位牛人在Smalltalk-80系统上首次提出了MVC的概念，最初的时候叫做Model-View-Controller-Editor。
Trygve Reenskaug最初提出MVC的目的**是为了把数据（Model）和视图（View）分离开来，然后用控制器（Controller）作胶水来粘合M和V之间的关系**。  
很显然，这样做的目的是为了实现注意点分离这样一个更高层次的设计理念，也就是让专业的对象做专业的事情，View就只负责视图相关的东西，Model就只负责描述数据模型，Controller负责总控，各自协作


###最古典的MVC实现
原始的MVC模式显然不是如今所理解的那种样子。

在Smalltalk-80上的那个古典实现上，View和Controller都是要监听Model的，也就是说，只要数据发生变化，视图和控制器都会收到通知的！

也就是这个样子的：
![]()  
C和M，V和M之间都是通过Observer pattern （观察者模式）来实现的。

###为什么GOF的23种设计模式里面没有MVC？
对于这个问题，直接引用@白汀UX 的译文如下：

	GoF (Gang of Four，四人组， 《Design Patterns: Elements of Reusable Object-Oriented Software》/《设计模式》
	一书的作者：Erich Gamma、Richard Helm、Ralph Johnson、John Vlissides)并没有把MVC提及为一种设计模式，而是把它当
	做“一组用于构建用户界面的类集合”。在他们看来，它其实是其它三个经典的设计模式的演变：观察者模式(Observer)(Pub/Sub), 
	策略模式(Strategy)和组合模式(Composite)。根据MVC在框架中的实现不同可能还会用到工厂模式(Factory)和装饰器(Decorator)模式。
	
	正如我们所讨论的，models表示应用的数据，而views处理屏幕上展现给用户的内容。为此，MVC在核心通讯上基于推送/订阅模型(惊讶的是 
	在很多关于MVC的文章中并没有提及到)。当一个model变化时它对应用其它模块发出更新通知(“publishes”)，订阅者 (subscriber)——
	通常是一个Controller，然后更新对应的view。观察者——这种自然的观察关系促进了多个view关联到同一个 model。
	
	对于感兴趣的开发人员想更多的了解解耦性的MVC(根据不同的实现)，这种模式的目标之一就是在一个主题和它的观察者之间建立一对多的关系。
	当这个 主题改变的时候，它的观察者也会得到更新。Views和controllers的关系稍微有点不同。Controllers帮助views对不同用户的输 
	入做不同的响应，是一个非常好的策略模式列子。
**因为它实际上是三种模式的合体:观察者模式(Observer)(Pub/Sub), 策略模式(Strategy)和组合模式(Composite).**


###结语
当初提出MVC，是为了实现关注点分离这样一种设计理念，MVC只是实现这一理念的一种方式而已。因此，不必拘泥于一定要抽象出Model/View/Controller这样的类结构。
