$(function(){
    var wow = new WOW({
        mobile: false,
    });

    wow.init();
    affixscroll();
    footerBtn1();
    // footerBtn();

    $("#btn-modal").click(function (e) {
        e.preventDefault();
        $(".kuang").fadeToggle();
        $(".icon").toggleClass("icon-x")
    });

	// 顶部导航-hove
	// var li = $("nav.navbar .nav > li:not(.btn-li)");
	// li.hover(function(){
	// 	$(this).addClass("actived");
	// },function () {
     //    $(this).removeClass("actived");
    // });

   var atoogle = $(".dropdown");
    $(".dropdown").mouseenter(function() {
        $(this).addClass("actived");
        $(this).find(".dropdown-menu").show();
        return false
    });
    $(".dropdown").mouseleave(function() {
        $(this).removeClass("actived");
        $(this).find(".dropdown-menu").hide();
        return false
    })

    $(".h2").hover(function () {
      var  thi = $(this);
        setTimeout(function(){
            thi.addClass("flipInX animated");
            },500);
    });
    
    $(".modular6 .btn-2").click(function () {
        var email = $(" input[ name='email' ] ").val();
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;  
        if(!reg.test(email)){
            alert("Email is incorrect!");
            $(" input[ name='email' ] ").focus();
        }else{          
            $(this).html("SUCCESS √");
        }      	
    });
    $(".modular6 .btn-2-cn").click(function () {
    	var email = $(" input[ name='email' ] ").val();
    	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;  
    	if(!reg.test(email)){
    		alert("电子邮箱不正确，请重新填写！");
    		$(" input[ name='email' ] ").focus();
    	}else{    		
    		$(this).html("订阅成功 √");
    	}
      	
    });

    // 滑动滚动条
    $(window).scroll(function(){
        //console.log($(window).scrollTop());
        //platforms.html页面
        if($(window).scrollTop() >= 947){
            $(".platforms .scroll .banner").css({"position":"fixed","bottom":"0","z-index":"1"}); 
        } else{
            $(".platforms .scroll .banner").css({"position":""}); 
        }
        if($(window).scrollTop() >= 588){
            $(".mt4 .modular1 .subnav").css({"position":"fixed","top":"82px","z-index":"8"}); 
        }else{
            $(".mt4 .modular1 .subnav").css({"position":""}); 
        }
    });

    
    var b = $("#solutionList li");
    b.mouseover(function() {
        var e = $(this);       
        b.removeClass("active",2000);
        e.addClass("active",2000);

       
    });

});

function affixscroll() {
    if ($("nav").scrollTop() == 0) {
        $(".header-top").removeClass("opct");
    }
    $(window).scroll(function(event) {
        /* Act on the event */
        if ($(this).scrollTop() == 0) {
            $(".header-top").removeClass("opct");
        }
        if ($(this).scrollTop() >= 90) { //0
            $(".header-top").addClass("opct");
        } else {}
    }); //.scroll
}


/*--返回顶部动画--*/
//goTop(500);//500ms内滚回顶部
function goTop(times){
    if (navigator.userAgent.indexOf('Firefox') >= 0){//firefox专用()
        document.documentElement.scrollTop=0;
    }else{$('html,body').animate({scrollTop: 0}, times);}
}

// 底部白条关闭后不再出现
function footerBtn() {
    var key = localStorage.getItem("key");
        if(key){
            $(".bottom-footer").hide();
        }
        $(".footer-btn").click(function (e) {
                e.preventDefault();
                $(this).parents(".bottom-footer").hide();
                localStorage.setItem("key", "1");

        })
}
function footerBtn1() {
    $(".footer-btn").click(function (e) {
        e.preventDefault();
        $(this).parents(".bottom-footer").hide();
    })
}