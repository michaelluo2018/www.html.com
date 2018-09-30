// 网页简繁体转换
// 本js用于客户在网站页面选择繁体中文或简体中文显示，默认是正常显示，即简繁体同时显示
// 在用户第一次访问网页时,会自动检测客户端语言进行操作并提示.此功能可关闭
// 本程序只在UTF8编码下测试过，不保证其他编码有效
// -------------- 以下参数大部分可以更改 --------------------
//s = simplified 简体中文 t = traditional 繁体中文 n = normal 正常显示
var zh_default = 'n'; //默认语言，请不要改变
var zh_choose = 'n'; //当前选择
var zh_expires = 30; //cookie过期天数
var zh_class = 'zh_click'; //链接的class名，id为class + s/t/n 之一
var zh_style_active = 'font-weight:bold;color:#fff;'; //当前选择的链接式样
var zh_style_inactive = 'color:#fff;'; //非当前选择的链接式样
var zh_browserLang = ''; //浏览器语言
var zh_autoLang_t = true; //浏览器语言为繁体时自动进行操作
var zh_autoLang_s = false; //浏览器语言为简体时自动进行操作
var zh_autoLang_alert = true; //自动操作后是否显示提示消息
//自动操作后的提示消息
//var zh_autoLang_msg = '歡迎來到本站,本站爲方便台灣香港的用戶\n1.采用UTF-8國際編碼,用任何語言發帖都不用轉碼.\n2.自動判斷繁體用戶,顯示繁體網頁\n3.在網頁最上方有語言選擇,如果浏覽有問題時可以切換\n4.本消息在cookie有效期內只顯示一次';
var zh_autoLang_checked = 0; //次检测浏览器次数,第一次写cookie为1,提示后为2,今后将不再提示
//判断浏览器语言的正则,ie为小写,ff为大写
var zh_langReg_t = /^zh-tw|tc$/i;
var zh_langReg_s = /^sc$/i;
//简体繁体对照字表,可以自行替换
$(".zh_choose_s").css("display","block");
$(".zh_choose_t").hide();
String.prototype.tran = function() {
	var s1, s2;
	if(zh_choose == 't') {
		s1 = zh_s;
		s2 = zh_t;
	} else if(zh_choose == 's') {
		s1 = zh_t;
		s2 = zh_s;
	} else {
		return this;
	}
	var a = '';
	var l = this.length;
	for(var i = 0; i < this.length; i++) {
		var c = this.charAt(i);
		var p = s1.indexOf(c)
		a += p < 0 ? c : s2.charAt(p);
	}
	return a;
}

function setCookie(name, value) {
	var argv = setCookie.arguments;
	var argc = setCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	if(expires != null) {
		var LargeExpDate = new Date();
		LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
	}
	document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString()));
}

function setCookies(name,value,time)
{ 
	delCookie(name);
    var strsec = getsec(time); 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + strsec*1); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
    //alert(name+"=="+value);
} 
function getsec(str)
{ 
   //alert(str); 
   var str1=str.substring(1,str.length)*1; 
   var str2=str.substring(0,1); 
   if (str2=="s")
   { 
        return str1*1000; 
   }
   else if (str2=="h")
   { 
       return str1*60*60*1000; 
   }
   else if (str2=="d")
   { 
       return str1*24*60*60*1000; 
   } 
} 

function getCookie(Name) {
	var search = Name + "="
	if(document.cookie.length > 0) {
		offset = document.cookie.indexOf(search);
		if(offset != -1) {
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if(end == -1) end = document.cookie.length;
			return unescape(document.cookie.substring(offset, end));
		} else {
			return '';
		}
	}
}
//这是有设定过期时间的使用示例： 
//s20是代表20秒 
//h是指小时，如12小时则是：h12 
//d是天数，30天则：d30 

//setCookies("name","hayden","s20");

//删除cookies 
function delCookie(name) 
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
     
} 

function zh_getLang() {
	if(getCookie('zh_choose')) {
		zh_choose = getCookie('zh_choose');
		return true;
	}
	if(!zh_autoLang_t && !zh_autoLang_s) return false;
	if(getCookie('zh_autoLang_checked')) return false;
	if(navigator.language) {
		zh_browserLang = navigator.language;
	} else if(navigator.browserLanguage) {
		zh_browserLang = navigator.browserLanguage;
	}
	if(zh_autoLang_t && zh_langReg_t.test(zh_browserLang)) {
		zh_choose = 't';
	} else if(zh_autoLang_s && zh_langReg_s.test(zh_browserLang)) {
		zh_choose = 's';
	}
	zh_autoLang_checked = 1;
	setCookie('zh_choose', zh_choose, zh_expires);
	if(zh_choose == zh_default) return false;
	return true;
}

function zh_init() {
	//zh_getLang();
	//alert(getCookie('zh_choose'));
	var i = returnCitySN;
	//document.write('您的IP<u>' + i['cip'] + '</u>归属地为<u>' + i['cname'] + '</u>');
	cname = i['cname'].substring(0,2); //归属地	
	 
	var province = new Array(["北京","天津","上海","重庆","河北","山西","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","海南","四川","贵州","云南","陕西","甘肃","青海","内蒙古","广西","西藏","宁夏","新疆"]);
	
	
	//国内的用户积分奖励详情都去   https://www.yhjr368.net/EmperorTrade/
	if(IsInArray(province,cname)){
		//国内		
		$("#qian-load").attr("href","https://www.yhjr368.net/EmperorTrade/");		
	}
	var cur_url = window.location.pathname;
	
	//北京市，天津市，上海市，重庆市，河北省，山西省，辽宁省，吉林省，黑龙江省，江苏省，浙江省，安徽省，福建省，江西省，山东省，河南省，湖北省，湖南省，广东省，海南省，四川省，贵州省，云南省，陕西省，甘肃省，青海省，台湾省，内蒙古自治区，广西壮族自治区，西藏自治区，宁夏回族自治区，新疆维吾尔自治区，
	zh_choose = getCookie('zh_choose');//当前语言 t是繁体  
	//cname = "aasd";
	//console.log(zh_choose);
	if(zh_choose != 't' && zh_choose != 's'){
		
		var cur_url = window.location.pathname; //获取页面地址  如果 http://www.html.com/html/20180515/zh-hk/index.html#page2  的 /html/20180515/zh-hk/index.html
		var cur_name = window.location.hash;  //获取页面链接#后面的地址  
		
		if(IsInArray(province,cname)){
			//国内		
			setCookie('zh_choose', 's');
			if(cur_url == "/tc/"){
				cur_url_new = "/";
			}else{
				cur_url_new = cur_url.replace(/\/(\w+)\.html/g,"/$1.html");
			}		
			cur_url_new = cur_url.replace(/\/tc\/(\w+)\.html/g,"/$1.html");
			
		}else{
			//国外和香港、台湾
			setCookie('zh_choose', 't');
			if(cur_url == "/"){
				cur_url_new = "/tc/";
			}else{
				cur_url_new = cur_url.replace(/\/(\w+)\.html/g,"/tc/$1.html");
			}	
			
		}
		//console.log(cur_url_new);
		
		if(cur_name != '')	
			location.href=cur_url_new+cur_name;
		else
			location.href=cur_url_new;
		
	}
}

function IsInArray(arr,val){ 
　　var testStr=','+arr.join(",")+","; 
　　return testStr.indexOf(","+val+",")!=-1; 
} 

//简体繁体切换
function zh_tran(go) {	
	var zh_choose_cookie = getCookie('zh_choose');//当前语言 	
	if(go) var zh_choose = go;	
	
	//alert(zh_choose_cookie+"---"+zh_choose);
	setCookies('zh_choose', zh_choose, "d30");
	
	
	//if(zh_choose_cookie != zh_choose){			
		var cur_url = window.location.pathname; //获取页面地址  如果 http://www.html.com/html/20180515/zh-hk/index.html#page2  的 /html/20180515/zh-hk/index.html
		var cur_name = window.location.hash;  //获取页面链接#后面的地址  
		if(go == 't') {//繁体
			//window.location.reload();
			//setCookies('zh_choose', 't',"d30");
			if(cur_url == "/"){
				cur_url_new = "/tc/";
			}else{
				if(cur_url.indexOf("/tc/")!=-1)
					cur_url_new = cur_url;				
				else	
					cur_url_new = cur_url.replace(/\/(\w+)\.html/g,"/tc/$1.html");
			}		
		} else {//简体
			//setCookies('zh_choose', 's',"d30");
			if(cur_url == "/tc/"){
				cur_url_new = "/";
			}else{
				cur_url_new = cur_url.replace(/\/(\w+)\.html/g,"/$1.html");
				cur_url_new = cur_url.replace(/\/tc\/(\w+)\.html/g,"/$1.html");
			}		
			
		}
		
		if(cur_name != '')	
			location.href=cur_url_new+cur_name;
		else
			location.href=cur_url_new;
	//}
}

zh_init();