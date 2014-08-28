/*
插件名称：Jquery自扩展分页器插件
参数：currentPage ：当前页
      totalPage ：总共页数
      pageUl ：外部总ul的id选择器：如-“.page”
creatTime:2014-8-19

*/
$.extend({
    pageShow:function(currentPage,totalPage,pageUl){
    var pagerHtml = ""; 

    if(currentPage > 1){
        pagerHtml +=  "<li class='pager-first'><a title='第一页' href='/?pageno=0'>" + "«" + "</a></li>";
        pagerHtml +=  "<li class='pager-previous'><a title='上一页' href='/?pageno=" + (currentPage-2) + "'>" + "‹" + "</a></li>";
    }

    if(totalPage <= 9){   //当页数不超过9时，不会有省略的页数li，页面上总是以9页为上限的
        for(var i = 1; i <= totalPage; i++){
            if(i == currentPage){
                pagerHtml += "<li class='pager-current'>" + i + "</li>";
            }else{
                pagerHtml += "<li class='pager-item'><a title='第"+ i + "页' href='/?pageno=" + (i-1) + "'>" + i + "</a></li>";
            }
        }
    }else{    //当页数超过9页时，分前半段，和后半段分别判断有无省略页数li，和构造

        //前半段   //当前页的前面有超过4页时，就带有省略的页数
        if(currentPage - 4 > 1){      
            pagerHtml += "<li class='pager-ellipsis'>" + "..." + "</li>";

            //还需判断当前页至最后页的页数，如果少于4页时，前半段页数就不能是4页，因为页面总是以9页呈现的，所以前半段需多加
            if(totalPage - currentPage <=4){   
                //如，当前页是7，最后一页是10时，前半段就需从4页开始构造
                for(var i = (totalPage-currentPage+1); i < currentPage; i++){   
                    pagerHtml += "<li class='pager-item'><a title='第"+ i + "页' href='/?pageno=" + (i-1) + "'>" + i + "</a></li>";
                }
            }else{
                //正常情况下，前半段4页
                for(var i = (currentPage-4); i < currentPage; i++){
                    pagerHtml += "<li class='pager-item'><a title='第"+ i + "页' href='/?pageno=" + (i-1) + "'>" + i + "</a></li>";
                }
            }
            //当前页
            pagerHtml += "<li class='pager-current'>" + i + "</li>";

        }else{   //当前页的前面不超过4页时，就不带有省略的页数
            for(var i = 1; i <= currentPage; i++){
                if(i == currentPage){
                    pagerHtml += "<li class='pager-current'>" + i + "</li>";
                }else{
                    pagerHtml += "<li class='pager-item'><a title='第"+ i + "页' href='/?pageno=" + (i-1) + "'>" + i + "</a></li>";
                }
           }
        }

        //后半段
        if(totalPage - currentPage > 4){   //后半段有省略的页数
            if(currentPage - 4 <= 1){  //还要判断前半段是否没有超过4页，没超过，后半段的就得多构造，以达到9页
                for(var i = (currentPage+1); i <= 9; i++){
                    pagerHtml += "<li class='pager-item'><a title='第"+ i + "页' href='/?pageno=" + (i-1) + "'>" + i + "</a></li>";
                }
            }else{   //正常情况
                for(var i = (currentPage+1); i <= (currentPage+4); i++){
                    pagerHtml += "<li class='pager-item'><a title='第"+ i + "页' href='/?pageno=" + (i-1) + "'>" + i + "</a></li>";
                }
            }
            
            pagerHtml += "<li class='pager-ellipsis'>" + "..." + "</li>";

        }else{
            for(var i = (currentPage+1); i <= totalPage; i++){
                pagerHtml += "<li class='pager-item'><a title='第"+ i + "页' href='/?pageno=" + (i-1) + "'>" + i + "</a></li>";
            }
        }
    }

    if(currentPage < totalPage){ 
        pagerHtml +=  "<li class='pager-next'><a title='下一页' href='/?pageno=" + currentPage + "'>" + "›" + "</a></li>";
        pagerHtml +=  "<li class='pager-last'><a title='最后一页' href='/?pageno=" + (totalPage-1) + "'>" + "»" + "</a></li>";
    }
    $(pageUl).append(pagerHtml);
    }
});

   