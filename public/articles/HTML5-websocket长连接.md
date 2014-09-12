#HTML5-websocket长连接  
轮询是在特定的的时间间隔(time interval)（如每1秒），由浏览器对服务器发出HTTP request，然后由服务器返回最新的数据给客服端的浏览器，它是一个可行的技术，但他不能优化发送的信息，也就是说，他是一个解决方案，但不是最佳的技术方案，他必须由客户端像服务端不断发出请求，然后由服务端返回最新的数据给客户端，然而http request的header是非常长的，里面包含的数据可能是一个很小的值，这样会占用很多带宽。而最比较新的技术去做轮询的效果是Comet-用了ajax，这种技术虽然可以达到全双工通信，但依然需要发出请求，前面做好了ajax+servlet 长轮询的方式进行模拟长连接，但是这样的方式仍然不是真正的长连接。   

伴随着**HTML5**技术的新起，**WebSocket**作为一种浏览器与服务器的核心通信技术，被嵌入到了浏览器的内核中，WebSocket 的出现使得浏览器提供对 Socket 的支持成为可能，实现了浏览器与服务器全双工通信，在websocket api，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者间就可以直接数据互相传送。

**在此websocket协议中，为我们实现即时服务带来了三大好处**：

1. Header：互相沟通的Header是很小的，大概只有2Bytes
2. server push： 服务器可以主动传送数据给客户端
3. 第一次建立连接后，服务器和客户端就建立了通道，以后客户端和服务器端就可以自由的通讯，无需再建立连接

 所以，基于上次的基于ajax的长轮询并不是真正的长连接，最后我换成了websocket长连接，但这种基于HTML5的websocket是不兼容ie10一下浏览器的，网上也有解决办法，可以去看看

	注意：
     1.基于tomcat的websocket，只有Tomcat7及以上才支持。
     2.服务端要实现websocket，就像新建普通servlet 它继承于HttpServlet，websocket要继承于
	WebsocketServlet，所以必须引入tomcat中含有websocket的包，apache-tomcat-7.0.5\lib下面的
	catalina.jar和tomcat-coyote.jar两个jar包，WebSocketServlet.class就在
	apache-tomcat-7.0.55\lib\catalina\org\apache\catalina\websocket路径下，
	如若不引，整个websocket的建立就相当于一开始就没办法进行

好了，下面我们来上真正的代码：

###1.服务器端实现（Tomcat）
WebSocketServlet 的servlet就可以了，与普通的HttpServlet没有太大区别。

	package com.cqut.servlet;
	import java.io.IOException;
	import java.io.PrintWriter;
	import java.nio.ByteBuffer;
	import java.nio.CharBuffer;
	import java.util.ArrayList;
	
	import javax.servlet.ServletException;
	import javax.servlet.annotation.WebServlet;
	import javax.servlet.http.HttpServletRequest;
	
	import net.sf.json.JSONObject;
	
	import org.apache.catalina.websocket.MessageInbound;  
	import org.apache.catalina.websocket.StreamInbound;  
	import org.apache.catalina.websocket.WebSocketServlet;  
	import org.apache.catalina.websocket.WsOutbound;
	
	@SuppressWarnings("deprecation")
	public class webSocketPolling extends WebSocketServlet {

     /**
     * websocket长连接
     */
     private static final long serialVersionUID = -4853540828121130946L;
     //为识别每个客户端，所以需将每个连接的客户单都加入list里面
     private static final ArrayList<MyMessageInbound> connections = new ArrayList<MyMessageInbound>();
     
     @Override
         protected StreamInbound createWebSocketInbound(String str, HttpServletRequest request) {
             return new MyMessageInbound();
         }
          
         //每个客户端连接服务器是都会new一个
         private class MyMessageInbound extends MessageInbound {
              
              //连接，将此客户端加入arrayList
             @Override
             public void onOpen(WsOutbound outbound) {
                 connections.add(this);
             }

             @Override
             public void onClose(int status) {
                  connections.remove(this);
             }
             
             //接收客户端消息后就返回服务端消息，文本信息,这里返回json
             @Override
             public void onTextMessage(CharBuffer buffer) throws IOException {
                 System.out.println("Accept Message : ");
                 String data = "{'control':[{\"status\":\"3\",\"id\":
				\"20140804163920796\"},{\"status\":\"2\",\"id\":\"20140718142425480\"}]}";
                 backmessage(data);
             }

             private void backmessage(String message){
                  //为每个客户端返回消息
                  for(MyMessageInbound connection : connections){
                      CharBuffer mes = CharBuffer.wrap(message);
                      try {
                              connection.getWsOutbound().writeTextMessage(mes);
                         } catch (IOException e) {
                              e.printStackTrace();
                         }
                 }
             }
             
               //二进制信息
               @Override
               protected void onBinaryMessage(ByteBuffer arg0) throws IOException {
                    // TODO Auto-generated method stub
                    
               }
         }
	}




###2.修改web.xml(js所连接的Servlet地址)
	<servlet>
	    <servlet-name >webSocketPolling</ servlet-name>
	    <servlet-class >com.cqut.servlet.webSocketPolling</ servlet-class>
	  </servlet >
	
	<servlet-mapping>
	    <servlet-name >webSocketPolling</ servlet-name>
	    <url-pattern >/webSocketPolling</ url-pattern>
	</servlet-mapping >

###3.客户端是实现（Javascript 原生API）
	$(function (){
      init ();
       //判断是否是ie，因为现在的ie11没有msie，所以判断ie不能用document.all,ie10下的都
		是1，其他浏览器都是0
       if(!!window .ActiveXObject || "ActiveXObject" in window){
             var ie6 = navigator.userAgent .indexOf ("MSIE 6.0")>0 ;
             var ie7 = navigator.userAgent .indexOf ("MSIE 7.0")>0 ;
             var ie8 = navigator.userAgent .indexOf ("MSIE 8.0")>0 ;
             var ie9 = navigator.userAgent .indexOf ("MSIE 9.0")>0 ;
             var ie5 = navigator.userAgent .indexOf ("MSIE 5.0")>0 ;
             //ie9及以下不调用动态显示，不支持websocket
             if(!ie6 + !ie7 + !ie8 + !ie9+ !ie5 == 5){
                  webSocketPolling ();
             }
       }
	});

	function webSocketPolling(){
      ws = new WebSocket("ws://localhost:8080/MsgMiddleware/webSocketPolling");
      ws .onopen = function(){
            ws .send (1);  //send后才是真正握手了，后面进行全双工通信
       }
      ws .onmessage  = function(message){
             var control = eval("(" + message.data + ")"). control;
             if(message.data != '1'){
                   for(var i = 0; i < control .length ; i ++){
                         if(control[i] .status == '0'){ //异常
                              document .getElementById (control[i] .id ).firstChild .firstChild .src = "images/systemManage/exception-adapter.png" ;
                         }else if(control[i] .status == '1'){ //开启
                              document .getElementById (control[i] .id ).firstChild .firstChild .src = "images/systemManage/disabled-adapter.png" ;
                         }else if(control[i] .status == '2'){//关闭
                              document .getElementById (control[i] .id ).firstChild .firstChild .src = "images/systemManage/enabled-adapter.png" ;
                         }else{   //正在工作
                              document .getElementById (control[i] .id ).firstChild .firstChild .src = "images/systemManage/animate.gif" ;
                         }
                   }
                  console .log (message .data );
             }
            
       }
       function closeConnect(){
            ws .close ();
       }
}

