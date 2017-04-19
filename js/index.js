window.onload = function(){
	//获取input输入框的焦点,改变label的位置
	var input = document.getElementsByTagName("input");
	var label = document.getElementsByTagName("label");
	var error = document.getElementsByClassName("error");
	for(var i=0; i < input.length; i++){
		input[i].addEventListener("focus",function(e){
			var ev = window.event || e;
			var inputObj = ev.srcElement || ev.target;//获得事件源对象
			var inputName = inputObj.name;
			for(var j=0; j < label.length; j++){
				if(inputName == label[j].getAttributeNode("for").value){
					label[j].className += " active";
				}
				//因为for的值和相应input的name对应，所以判断是否相等，
			}
		});
		input[i].addEventListener("blur",function(e){
			var ev = window.event || e;
			var inputObj = ev.srcElement || ev.target;//获得事件源对象
			var inputName = inputObj.name;
			var inputValue = inputObj.value;
			for(var j=0; j < label.length; j++){
				if(inputName == label[j].getAttributeNode("for").value){
					removeClass(label[j], "active");
				}
				//因为for的值和相应input的name对应，所以判断是否相等，
			}
			var errorNode = inputObj.nextElementSibling;//指向前一个同辈元素
			var inputLabel = inputObj.previousElementSibling;//指向后一个同辈元素
			if(inputValue == ""){
				errorNode.style.display = "block";
				inputObj.className += " hasError";
				inputLabel.style.color = "#f95959";
			}else{
				removeClass(inputObj, "hasError");
				inputLabel.style.color = "#bbbbbb";
				errorNode.style.display = "none";
				inputLabel.className += " active";
			}
			
		});
	}
	//注册和登录的相互切换
	var witch = document.getElementsByClassName("switch");
	var formL = document.getElementsByClassName("form-l")[0];
	var formR = document.getElementsByClassName("form-r")[0];
	for(var i=0; i < witch.length; i++){
		witch[i].addEventListener("click",function(){
			var ev = window.event || e;
			var aObj = ev.srcElement || ev.target;//获得事件源对象
			var form = aObj.parentNode.parentNode.parentNode;
			removeClass(formL, "switched-l");
			removeClass(formR, "switched-l");
			removeClass(formL, "switched-r");
			removeClass(formR, "switched-r");
			if(form == formR){
				formR.className += " switched-l";
				formL.className += " switched-r";
			}else{
				formL.className += " switched-l";
				formR.className += " switched-r";
			}
		});
		
	}
	
	function hasClass( elements,cName ){ 
		return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断 
	}; 
	function addClass( elements,cName ){ 
		if( !hasClass( elements,cName ) ){ 
			elements.className += " " + cName; 
		}; 
	}; 
	function removeClass( elements,cName ){ 
		if( hasClass( elements,cName ) ){ 
			elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ),"" ); // replace方法是替换 
		}; 
	};
	//字符长度函数
	function getLength(str){
		//[\x00-\xff]所有单字节字符
		return str.replace(/[^\x00-\xff]/g,"xx").length;
	}
	//相同字符
	function findStr(str, n){
		var tmp = 0;
		for (var i=0; i < str.length; i++) {
			if(str.charAt(i) == n)
				tmp++;
		}
		return tmp;
	}
	//验证用户名是否正确
	//获取输入的字段
	var loginEmail = input[0];
	var loginPassword = input[1];
	var fullName = input[2];
	var email = input[3];
	var phone = input[4];
	var pwd = input[5];
	var conPwd = input[6];
	var valueLength = 0;
	//验证用户名是否正确
	//数字、字母（不分大小写）、汉子、下划线，5-20字符，可以使用中文
	fullName.addEventListener("blur",function(){
		//含有非法字符
		var re = /[^\w\u4e00-\u9fa5]/g; //匹配所有非法字符
		var errorNode = this.nextElementSibling;//指向前一个同辈元素
		valueLength = getLength(this.value);
		if(re.test(this.value)){
			errorNode.innerText = "illegal fullName!"; //提示非法字符
			errorNode.style.display = "block";
		}else if(valueLength < 5 || valueLength > 20){
			errorNode.innerText = "length error!"; //提示非法字符
			errorNode.style.display = "block";
		}else{
			errorNode.innerText = "OK!"; 
			errorNode.style.display = "block";
		}
	});
	//验证邮箱是否合法
	email.addEventListener("blur",function(){
		//含有非法字符
		var re = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/; //匹配所有非法字符
		var errorNode = this.nextElementSibling;//指向前一个同辈元素
		if(re.test(this.value) == false){
			errorNode.innerText = "illegal email!"; //提示非法字符
			errorNode.style.display = "block";
		}else{
			errorNode.innerText = "OK!"; 
			errorNode.style.display = "block";
		}
	});
	//验证电话号码,并以xxx-xxxx-xxxx格式显示
	phone.addEventListener("keyup",function(){
		var phoneNum = this.value;
		if(phoneNum.length == 4){
			phone.value = phoneNum.substring(0, 3) + "-" + phoneNum.substring(3, phoneNum.length);
			return ;
		};
		if (phoneNum.length == 9) {  
            phone.value = phoneNum.substring(0, 8) + "-" + phoneNum.substring(8, phoneNum.length);  
            return ;  
        }  
	});
	phone.addEventListener("blur",function(){
		//含有非法字符
		var re = /\d{3}-\d{4}-\d{4}|\d{4}\{7,8}/; //匹配所有非法字符
		var errorNode = this.nextElementSibling;//指向前一个同辈元素
		if(re.test(this.value) == false){
			errorNode.innerText = "illegal phone!"; //提示非法字符
			errorNode.style.display = "block";
		}else{
			errorNode.innerText = "OK!"; 
			errorNode.style.display = "block";
		}
	}); 
	//验证密码 6-16个字符，组合密码
	pwd.addEventListener("blur", function(){
		//不能用相同字符
		var errorNode = this.nextElementSibling;//指向前一个同辈元素
		var m = findStr(this.value, this.value[0]);
		if(m == this.value.length){
			errorNode.innerText = "same word!"; //提示非法字符
			errorNode.style.display = "block";
		}else if(this.value.length < 6 || this.value.length > 16){
			errorNode.innerText = "length error!"; //提示非法字符
			errorNode.style.display = "block";
		}else {
			errorNode.innerText = "OK!"; 
			errorNode.style.display = "block";
		}
	});
	//确认第二次密码输入与第一次一样
	conPwd.addEventListener("blur", function(){
		var errorNode = this.nextElementSibling;//指向前一个同辈元素
		if(this.value !== pwd.value){
			errorNode.innerText = "not equal password!"; //提示非法字符
			errorNode.style.display = "block";
		}
		else{
			errorNode.innerText = "OK!"; 
			errorNode.style.display = "block";
		}
	})
}
