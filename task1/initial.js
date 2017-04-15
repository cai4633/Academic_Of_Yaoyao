/*
校验规则：
1.字符数为4~16位
2.每个英文字母、数字、英文符号长度为1
3.每个汉字，中文符号长度为2
*/

window.onload=function () {

	document.getElementById('verify').onclick=verify;
	document.getElementById('name').onclick=function(){
			document.getElementById('name').classList.remove("empty","correct");
			document.getElementById('name').style.borderColor="#D9D2D2";
			document.getElementById('notation').classList.remove("empty","correct");
			document.getElementById('notation').innerHTML="必填，长度为4-16个字符";
	};

	function verify() {
		var nameValue=document.getElementById('name').value.trim();
		// document.getElementById('name').value="\uD8A9";
		if (nameValue==="") {
			document.getElementById('name').classList.add("empty");
			document.getElementById('notation').innerHTML="姓名不能为空";
			document.getElementById('notation').classList.add("empty");
		}
		else if(getNameLen()>=4&&getNameLen()<=16){
			document.getElementById('name').style.borderColor="green";
			document.getElementById('notation').innerHTML="名称格式正确";
			document.getElementById('notation').classList.add("correct");			
		}
		else{
			document.getElementById('name').classList.add("empty");
			document.getElementById('notation').innerHTML="名称长度有误，请输入长度为4-16个字符的名称";
			document.getElementById('notation').classList.add("empty");

		}
	}

	function getNameLen(){
		var len=0;
		var nameValue=document.getElementById('name').value.trim();
		len=nameValue.length;
		for(var i=0;i<len;i++){
			if (nameValue.charCodeAt(i)>=0xD800&&nameValue.charCodeAt(i)<=0xDBFF) {
				i++;//当汉字是4字节，即由highSurrogate和lowSurrogate组成的代理
			}
			else if(nameValue.charCodeAt(i)>0xFF){
				len++;
			}
		}
			return len;

	} 
}