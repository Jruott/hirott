![](/upload/css3.png)


	
	 function supportCss3(style) {  
	     var prefix = ['webkit', 'Moz', 'ms', 'o']; 
	     i,  
	     humpString = [];  
	     htmlStyle = document.documentElement.style; 

	     _toHumb = function (string) {  
		     return string.replace(/-(\w)/g, function ($0, $1) {  
		    	 return $1.toUpperCase();  
		     });  
	     };  
	        
	     for (i in prefix){ 
	   		  humpString.push(_toHumb(prefix[i] + '-' + style));  
	     }  

	     humpString.push(_toHumb(style));  
        
	     for (i in humpString){  
	   	  if (humpString[i] in htmlStyle) return true;  
	     }   
	     return false;  
	 }  


	 alert(supportCss3('animation-play-state'));  

