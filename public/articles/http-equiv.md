#HTML http-equiv属性

http-equiv属性 -- HTTP协议的响应头报文

- 此属性出现在meta标签中
+ 此属性用于代替name，HTTP服务器通过此属性收集HTTP协议的响应头报文
+ 此属性的HTTP协议的响应头报文的值应该使用content属性描述


**meta标签的http-equiv属性语法格式是：**   
<meta http-equiv="参数" content="参数变量值"> ；其中http-equiv属性主要有以下几种参数：

	< meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" /> //使IE总是以最新版本的iE文档模式来渲染，防止ie进入怪异模式

A、Expires（期限）    
说明：可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。   
用法：<meta http-equiv="expires" content="Fri,12 Jan 2001 18:18:18 GMT">    
注意：必须使用GMT的时间格式。   
 
B、Pragma(cache模式）   
说明：禁止浏览器从本地计算机的缓存中访问页面内容。    
用法：<meta http-equiv="Pragma" content="no-cache">   
注意：这样设定，访问者将无法脱机浏览。    
 
C、Refresh（刷新）   
说明：自动刷新并指向新页面。   
用法：<meta http-equiv="Refresh" content="2;URL">；（注意后面的引号，分别在秒数的前面和网址的后面）    
注意：其中的2是指停留2秒钟后自动刷新到URL网址。   

D、Set-Cookie(cookie设定）   
说明：如果网页过期，那么存盘的cookie将被删除。  
用法：<meta http-equiv="Set-Cookie"       content="cookievalue=xxx; expires=Friday,12-Jan-2001 18:18:18 GMT; path=/">   
注意：必须使用GMT的时间格式。

E、Window-target（显示窗口的设定）  
说明：强制页面在当前窗口以独立页面显示。   
用法：<meta http-equiv="Window-target" content="_top">    
注意：用来防止别人在框架里调用自己的页面。  

F、content-Type（显示字符集的设定）    
说明：设定页面使用的字符集。      
用法：<meta http-equiv="content-Type" content="text/html; charset=gb2312"> 

G、content-Language（显示语言的设定）    
用法：<meta http-equiv="Content-Language" content="zh-cn" />  


**功能**

上面我们介绍了meta标签的一些基本组成，接着我们再来一起看看meta标签的常见功能：   
帮助主页被各大搜索引擎登录

meta标签的一个很重要的功能就是设置关键字，来帮助你的主页被各大搜索引擎登录，提高网站的访问量。在这个功能中，最重要的就是对Keywords和description的设置。因为按照搜索引擎的工作原理，搜索引擎首先派出机器人自动检索页面中的keywords和description，并将其加入到自己的数据库，然后再根据关键词的密度将网站排序。

因此，我们必须设置好关键字，来提高页面的搜索点击率。下面我们来举一个例子供大家参考：

<meta name="keywords" content="政治，经济，科技，文化，卫生，情感，心灵，娱乐，生活，社会，企业，交通">

<meta name="description" content="政治，经济，科技，文化，卫生，情感，心灵，娱乐，生活，社会，企业，交通">

设置好这些关键字后，搜索引擎将会自动把这些关键字添加到数据库中，并根据这些关键字的密度来进行合适的排序。 

   
定义页面的使用语言   
这是meta标签最常见的功能，在制作网页时，我们在纯HTML代码下都会看到它，它起的作用是定义你网页的语言，当浏览者访问你的网页时，浏览器会自动识别并设置网页中的语言，如果你网页设置的是GB码，而浏览者没有安装GB码，这时网页只会呈现浏览者所设置的浏览器默认语言。同样的，如果该网页是英语，那么charset=en。

下面就是一个具有代表性的例子：   
<meta http-equiv=″content－Type″ content=″text/html; charset=gb2312″>    
该代码就表示将网页的语言设置成国标码。  
自动刷新并指向新的页面    

如果你想使您的网页在无人控制的情况下，能自动在指定的时间内去访问指定的网页，就可以使用meta标签的自动刷新网页的功能。

下面我们来看一段代码：

〈meta http-equiv=″refresh″ content=″2; URL=
这段代码可以使当前某一个网页在2秒后自动转到页面中去，这就是meta的刷新作用，在content中，2代表设置的时间（单位为秒），而URL就是在指定的时间后自动连接的网页地址。