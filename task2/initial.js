/**
*表单获得焦点时，下方显示表单填写规则
*表单失去焦点时校验表单内容
*校验结果正确时，表单边框显示绿色，并在下方显示验证通过的描述文字
*校验结果错误时，表单边框显示红色，并在下方显示验证错误的描述文字
*点击提交按钮时，对页面中所有输入进行校验，校验结果显示方式同上。若所有表单校验通过，弹窗显示“提交成功”，否则显示“提交失败”
*/

window.onload=function () {
	var inputStyleObj=document.getElementsByClassName('input_style');
	var notationStr=[
			"必填，长度为4-16个字符",
			"密码长度为8-16个字符",
			"再次输入相同的密码",
			"请输入正确的邮箱",
			"请输入正确的手机号"

	 ];//默认提示语


// inputStyleObj获取焦点恢复默认样式；
	for(var i=0; i<inputStyleObj.length;i++){
		inputStyleObj[i].setAttribute("i",i);   //间接给事件函数传参；
		inputStyleObj[i].onfocus=function (){
						this.parentNode.getElementsByTagName('span')[0].classList.remove("hidden","empty","correct"); //显示notation;
						this.parentNode.getElementsByTagName('span')[0].innerHTML=notationStr[this.getAttribute("i")];
						this.classList.remove("empty","correct");
						this.style.borderColor="#2F9AD9";
						}
	}


// 为不同的输入框绑定onblur事件；
	document.getElementById('name').onblur=function(){			//名称输入框;
		return lenVerify("name",4,16,"名称");
	}	

	document.getElementById('password').onblur=function(){			//密码输入框;
	            return lenVerify("password",8,16,"密码可用，");
	}	

	document.getElementById('passwordConfirm').onblur=function(){			//密码确认框;
		return passwordConfirmFun(this);
		
	}
	
	document.getElementById('mail').onblur=function(){				//邮箱检测；
		return mailTest(this);
	}

	document.getElementById('phone').onblur=function(){			//手机号检测；
		return telephoneNumberTest(this);
	}

// 绑定验证和重置按钮点击事件；
	document.getElementById('verify').onclick=function(){
		if (document.getElementById('name').onblur()&&document.getElementById('password').onblur()&&document.getElementById('passwordConfirm').onblur()&&document.getElementById('mail').onblur()&&document.getElementById('phone').onblur()) {
			alert("提交成功！");
		}
		else{
			alert("信息有误，提交失败！")
		}
	}
	
	document.getElementById('reset').onclick=function(){
		var input_style=document.getElementsByClassName('input_style');
		for (var i = 0; i < input_style.length; i++) {
			removeAllStyle.call(null,input_style[i]);		//调用函数的call方法；
		}
	}
// 重新输入密码框的检测函数；
	function passwordConfirmFun(obj){
		var span=document.getElementById("passwordConfirm").parentNode.getElementsByClassName('novation')[0];
		var password=document.getElementById("password");
		if(obj.value===""){
			span.innerHTML="请再次输入你设置的密码";
			span.classList.add("empty");
			document.getElementById('passwordConfirm').classList.add("empty");
			return false;
		}
		else if(obj.value===password.value){
			document.getElementById('passwordConfirm').style.borderColor="#2DE36E";
			span.classList.add("correct");
			span.innerHTML="密码输入一致";
			return true;
		}
		else{
			span.innerHTML="密码输入不一致";
			span.classList.add("empty");
			document.getElementById('passwordConfirm').classList.add("empty");
			return false;
		}
	}


// 邮箱格式检查函数；
	function mailTest(obj){
		var result=obj.value.search(/^.+@.+\.com$/)
		if(result===-1){
			obj.classList.add("empty");
			obj.parentNode.getElementsByClassName('novation')[0].classList.add("empty");
			obj.parentNode.getElementsByClassName('novation')[0].innerHTML="邮箱格式错误";
			return false;
		}
		else{
			obj.style.borderColor="#2DE36E";
			obj.parentNode.getElementsByClassName('novation')[0].classList.add("correct");
			obj.parentNode.getElementsByClassName('novation')[0].innerHTML="邮箱格式正确";
			return true;
		}
	}

// 手机号格式检查；
	function telephoneNumberTest(obj){
		var result=obj.value.search(/^[0-9]{11}$/)
		if(result===-1){
			obj.classList.add("empty");
			obj.parentNode.getElementsByClassName('novation')[0].classList.add("empty");
			obj.parentNode.getElementsByClassName('novation')[0].innerHTML="手机号格式错误";
			return false;
		}
		else{
			obj.style.borderColor="#2DE36E";
			obj.parentNode.getElementsByClassName('novation')[0].classList.add("correct");
			obj.parentNode.getElementsByClassName('novation')[0].innerHTML="手机号格式正确";
			return true;
		}
	}


// 长度检测函数；
           function lenVerify(str,minLen,maxLen,str2) {
		var inputValue=document.getElementById(str).value.trim();
		if (inputValue==="") {
			document.getElementById(str).classList.add("empty");//添加样式；
			document.getElementById(str).parentNode.getElementsByTagName("span")[0].classList.add("empty");
			document.getElementById(str).parentNode.getElementsByTagName("span")[0].innerHTML=str2+"不能为空";
			return false;
		}
		else if(getNameLen(str)>=minLen&&getNameLen(str)<=maxLen){
			document.getElementById(str).style.borderColor="#2DE36E";
			document.getElementById(str).parentNode.getElementsByTagName("span")[0].classList.add("correct");			
			document.getElementById(str).parentNode.getElementsByTagName("span")[0].innerHTML=str2+"格式正确";
			return true;
		}
		else{
			document.getElementById(str).classList.add("empty");
			document.getElementById(str).parentNode.getElementsByTagName("span")[0].classList.add("empty");
			document.getElementById(str).parentNode.getElementsByTagName("span")[0].innerHTML="名称长度有误，请输入长度为"+minLen+"-"+maxLen+"个字符的名称";
			return false;

		}
	}


// 获取输入框字符串长度；
	function getNameLen(str){
		var len=0;
		var inputValue=document.getElementById(str).value.trim();
		len=inputValue.length;
		for(var i=0;i<len;i++){
			if (inputValue.charCodeAt(i)>=0xD800&&inputValue.charCodeAt(i)<=0xDBFF) {
				i++;//当汉字是4字节，即由highSurrogate和lowSurrogate组成的代理
			}
			else if(inputValue.charCodeAt(i)>0xFF){
				len++;
			}
		}
			return len;

	} 
}

// 点击重置按钮清除所有样式；
	function removeAllStyle(obj){
		obj.classList.remove("empty","correct");
		obj.style.borderColor="#D9D2D2";
		obj.parentNode.getElementsByTagName('span')[0].classList.remove("empty","correct");
	}