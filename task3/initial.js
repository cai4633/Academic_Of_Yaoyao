window.onload=function(){
	radioSwitch();
}

// 在校生和非在校生选项卡切换；
function radioSwitch(){
	var radio=document.getElementsByClassName('profession');
	for (var i = 0; i < radio.length; i++) {
		radio[i].onchange=function(){	// 给radio绑定change事件；
			if (this.checked&&this.value=="在校生") {	//判断radio的选择值；
				document.getElementById('students_option').classList.remove("hidden");
				document.getElementById('non-students_option').classList.add("hidden");
				cityToUniversity();
			}
			else{
				document.getElementById('students_option').classList.add("hidden");
				document.getElementById('non-students_option').classList.remove("hidden");
			}
		}
	}
}

// 定义一个函数使点击city显示相应的大学；
function cityToUniversity(){
	var uni=[	"university_beijing",
	"university_wuhan",
	"university_shanghai"	 ];      		//大学id名；
	var select=document.getElementById('city');
	var university=document.getElementsByClassName('university');
	
// 	定义select选择事件；
	select.onchange=function(){
			for (var i = 0; i < university.length; i++) {
				university[i].classList.add("hidden");
			}
			document.getElementById(uni[select.selectedIndex]).classList.remove("hidden");
		};
	
}