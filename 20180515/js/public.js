function wwHF(){
    var getWindow = $(window).width()
      
     if(getWindow>980){
        $(window).scroll(function () { //pc端
            var menu_top = $('.navbar').height(); 
            if ($(window).scrollTop() >= menu_top) { 
                $('.navbar').addClass('padding-hear') 
            } 
            else { 
            $('.navbar').removeClass('padding-hear') 
            } 
        });

     }else if(getWindow<980){ // 手机端
    }
 }


//执行函数
 $(function(){
   
    $(".navbar-nav").on("click","li",function(){
        $(this).not(".xs-none").addClass("active").siblings().removeClass("active");
    })

    // 在线图标在了全屏滚动页面right为0;
     $("#dowebok").siblings(".onLine").css("right","0");


    // nav点击按钮打开侧边栏
    $(".btnan").click(function(){
        // $("body").toggleClass("on-side");
        $(".side").toggleClass("on");
    })
    $(".side .close-side").click(function(){
        // $("body").toggleClass("on-side");
        $(".side").toggleClass("on");
    })
    wwHF();
  
   
})
$(window).resize(function(){
    wwHF();
 });