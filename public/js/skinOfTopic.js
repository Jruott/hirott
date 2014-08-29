//cookie切换主题
var skinCookieName = "myskin";  //只是个代名词，全程重要的是传的value，点击要换的按钮时就设置这个value，然后展示皮肤时查到该value，然后把css的后缀换成该value
setSkin();

//展示皮肤时就getCookie
function setSkin(){
    var thisSkin = "black";
    console.log(thisSkin+"***");
    var cookieSkin = getCookie(skinCookieName);

    if(cookieSkin !=""){
        thisSkin = cookieSkin;
    }
    console.log(thisSkin+"***");
    var reg = /\/\w{4,5}\./;
    console.log(skinDefault.href);
    console.log(skinDefault.href.replace(reg,"/" + thisSkin +"."));
    skinDefault.href = skinDefault.href.replace(reg,"/" + thisSkin +".");
}

//点击要变化的按钮，就设置该cookie
function changeCss(value){
    
    if(value != ""){
        var expdate = new Date();
        expdate.setTime(expdate.getTime() + (1000*60*60*24*30));   //将过期时间转换为日期
        SetCookie(skinCookieName,value,expdate);   //设置cookie
        setSkin();  //变换界面
    }
}    

function SetCookie(name,value,expdate){
    //将名字、值、过期时间写进cookie中，escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。
//??????有个问题，document.cookie都等于myskin=blog或者myskin=blue，后面这部分加不上去
    document.cookie=name+ "=" + escape(value)  + ((expdate==null) ? "" : ";expires="+expdate.toGMTString());
}

function getCookie(name){
    var search = name + "=";   //如： myskin=
    var returnvalue = "";
    if(document.cookie.length > 0){
        offset = document.cookie.indexOf(search);   //查找cookie
        if(offset != -1){   //存在
            offset += search.length;
            end = document.cookie.indexOf(";",offset); 
            returnvalue = unescape(document.cookie.substring(offset));   //对刚才编码的字符串解码,document.cookie.substring(offset，end)，因为前面写进cookie是“;”以及后面的过期时间都没写进去，现只有“myskin=blue”
        }
    }
    console.log(returnvalue +"###");
    return returnvalue;
}