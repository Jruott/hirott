$(function(){

    $(window).scroll(function(){
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
    
        }

        //固定第二个bar 和 锚
        if( $(window ).scrollTop() > 500){
            document.getElementById("stickStick").className = "stickyStickyWrapper-change";
        }else{
            document.getElementById("stickStick").className = "stickyStickyWrapper";
           
        }

        
    });


    $(".shadow").mouseover(function(){
        this.style.background = "#fafafa";
    }).mouseout(function(){
        this.style.background = "#fff";
    });

    //点击改变整体颜色
    $("#change").click(function(){
         $("body").css("background","url(/images/bg_light_linen.png)");
        $("#top-bar").css("background","#6FCFE0");
        $("#describe").css("background","#6FCFE0");
        $("#sticky").css("background","#6FCFE0");
        $("#filcker-image").css("height","76%");
        $("#filcker-image img").attr("src","images/back3.gif");
        $("#contact-box img").attr("src","images/water.gif");
        $(".day").css("color","#E75B63");
        $(".barKind p").css("color","#E75B63");
        $(".entry-title a").css("color","#E75B63");
    });
  

});