/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-09-25 14:44:23
 * @version $Id$
 */

(function(){
	$('.submit1').click(function(){
		var email = $("#email").val();
		if(email == ""){
		    $("#email").css({'background-color':'#f4c2c2'})
		    return false;
		}else if(email != ""){
			var reg =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            isok= reg.test(email );
            if (!isok) {
                // alert("邮箱格式不正确，请重新输入！");
                $('.email_prompt').css({'display':'block'})
                return false;
			}else{
				$('.email_prompt').css({'display':'none'})
				alert('ok')
			}
		}
			
		



	})

	
})();
