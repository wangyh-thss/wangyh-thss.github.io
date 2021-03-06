﻿void function picture(){
	var url = '../data/picture.json';
	//与服务器的通信
	var pictureSlide = new XMLHttpRequest();
	pictureSlide.onreadystatechange = handler;
	pictureSlide.open('GET', url);
	pictureSlide.send();

	function handler(){
		if(this.readyState == this.DONE){
			if(this.status == 200){
				try{
					initPlayer(JSON.parse(this.responseText));
				}catch(ex){
					alert(ex.massage);
				}
			}
		}
	}
	//主要功能函数
	function initPlayer(data){
		newsTitleArray = [];
		var container = $('#picplayer');
		var w = container.css('width').split('px')[0];
		var h = eval(w) / 1000 * 550;
		//添加所需容器
		container.css('height', h+'px');
		container.append('<div id="picContent" style="padding:0px 0px; margin:0px 0px; overflow:hidden;"></div>');
		var pic = $('#picContent');
		container.append('<div id="numContainer" style="padding:0px 0px; margin-top:'+(h-40)+'px;height:40px; width:70%; z-index:99; position:absolute;"></div>')
		var num = $('#numContainer');
		num.append('<div id="numList" style="z-index:0; margin:10px 20px; height:20px; float:right;"></div>')	
		num = $('#numList');

		for(var i = 0; data.picture[i]; i++){
			//将图片依次插入，置于不同层，且每张图添加相应的新闻信息
			pic.append('\
				<div id= "pic'+i+'" class="picView" style="width:70%; display: none; z-index:'+i+'; position:absolute; overflow:hidden;">\
					<div class="left" style="position:relative;right:0px;width:50%;overflow:hidden;float:left"><img src="'+data.picture[i].url+'" style="width:200%;"></div>\
					<div class="right" style="position:relative;left:0px;width:50%;overflow:hidden;"><img src="'+data.picture[i].url+'" style="margin-left:-100%;width:200%;"></div>\
					<div class="mask">\
						<h2>'+ data.picture[i].title +'</h2>\
						<p>'+data.picture[i].info+'</p>\
						<a href="'+data.picture[i].link+'" target="_blank">查看详情</a>\
					</div>\
				</div>\
				');
			//插入序号控件
			num.append('<span id="num'+i+'" class="translucent" style="margin:0px 6px; background-color:#393939; color:#e6e6e6; padding: 2px 4px; border:1px solid #e6e6e6;font-size:10px; cursor:pointer;">'+(i+1)+'</span>');
		}
		//绑定鼠标指向序号控件事件（闭包）
		var slide = [];
		function mouseoverEvent(number){
			return function(){
				showPicture(number);
			}
		}
		//图片切换效果
		function splitSlide(number){
			return function(){
				var splitDIV = $('#pic'+ number);
				var width = splitDIV.outerWidth() / 2;
				splitDIV.children('.left').animate({right: width+'px'}, {queue:false, duration:300});
				splitDIV.children('.right').animate({left: width+'px'}, {queue:false, duration:300, callback: initLR()});
				splitDIV.fadeOut('slow');
				function initLR(){
					splitDIV.children('.left').css('right', '0px');
					splitDIV.children('.right').css('left', '0px');
				}
			}
		}
		for(var i = 0; data.picture[i]; i++){
			$('#num'+i)[0].onmousemove = mouseoverEvent(i);
			//$('#pic'+i)[0].split = splitSlide(i);
			slide[i] = splitSlide(i);
		}
		
		//图片轮播的实现
		var timer;
		var selectedIndex;
		var currentNum;
		var currentPicture;
		//HTML5本地存储，若有数据则从上一次查看的图片开始播放
		if(localStorage['pictureNum']){
			showPicture(localStorage['pictureNum']);
		}else{
			showPicture(0);	
		}
		function showPicture(index){
			clearInterval(timer);
			if(eval(selectedIndex) != index){
				if(currentPicture){
					//currentPicture.split();
					slide[eval(selectedIndex)]();
					//currentPicture.hide();
				}
					//currentPicture.fadeOut('slow');
				if(currentNum){
					currentNum.css('background-color', '#393939');
					currentNum.css('color', '#e6e6e6');
				}
				currentNum = $('#num'+index);
				currentNum.css('background-color', '#e2bc33');
				currentNum.css('color', '#393939');
				currentPicture = $('#pic'+index);
				currentPicture.children('.left').css('right', '0px');
				currentPicture.children('.right').css('left', '0px');
				currentPicture.fadeIn('slow');
				selectedIndex = index;
				localStorage['pictureNum']  = selectedIndex;
			}
			//循环播放
			timer = setInterval(function(){
				var nextIndex = eval(selectedIndex)+1;
				if(nextIndex < data.picture.length)
					showPicture(nextIndex);
				else
					showPicture(0);
			}, 5000);
		}
	}
}();