$(function(){

    /*$(window).scroll(function(){
        if($(window ).scrollTop()  > $(window).height()){
           $("#mao").show();
           $("#mao").click(function(){
            //  这样会一下子就上去了，没有缓慢的过程，所以用jquery的动画
            // if(document.body.scrollTop){
             //     document.body.scrollTop = 0;
            //  }else{
             //     document.documentElement.scrollTop = 0;
            //  }
            //$('body,html').animate({scrollTop:0},600);
            document.documentElement.scrollTop = 0;
          });
        }else{
           $("#mao").hide();
          // return false;
    
        }*/

        window.onscroll = function(){
           var topScroll = document.documentElement.scrollTop || document.body.scrollTop;
           var browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
           var mao = document.getElementById("mao");
           console.log(browserHeight)
           if(topScroll > 600){
              mao.style.display = "block";
              mao.onclick = function(){
                $('body,html').animate({scrollTop:0},600);
              }
           }else{
              mao.style.display = "none";
           }
        }
        
        //固定第二个bar
        if( $(window ).scrollTop() > 500){
            document.getElementById("stickStick").className = "stickyStickyWrapper-change";
        }else{
            document.getElementById("stickStick").className = "stickyStickyWrapper";
           
        }

        $(".shadow").mouseover(function(){
            this.style.background = "#fafafa";
        }).mouseout(function(){
            this.style.background = "#fff";
        });

    

});