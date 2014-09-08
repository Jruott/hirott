#display相关
###一.display有哪些属性
1.在css1规范中，display的值仅包含：block | inline | list-item | none    
2.在css2.1中才添加了inline-block属性，现在display共有的属性如下：
![]()

3.但是尽管添加了一些属性，但是我们调皮的IE低版本仍然不能狠好的支持有些属性，下面是个浏览器支持情况。我们看到display：table等系列的属性，IE6-8不支持，所以能实现水平垂直居中的其中一个解决办法：将外部div设置为display：table，内部设置为display：table-cell，在设置vertical：middle，这个解决办法不能兼容IE6~8哟！
