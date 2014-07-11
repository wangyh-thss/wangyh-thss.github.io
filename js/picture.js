void function picture(){
	var url = 'picture.json';

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

	function initPlayer(data){
		newsTitleArray = [];
		var container = $('#picplayer');
		var w = container.css('width').split('px')[0];
		var h = eval(w) / 1000 * 550;
		container.css('height', h+'px');
		container.append('<div id="picContent" style="padding:0px 0px; margin:0px 0px; overflow:hidden;"></div>');
		//container.append('<div id="titleBackground" class= "translucent" style="width:'+w+'px; height:70px; background-color: #808080; text-align:center; z-index:100; position:absolute;"></div>');
		//container.append('<div id="titleContainer" style="width:'+w+'px; padding-top: 12px; height:70px; text-align:center; z-index:101; position:absolute;"></div>');
		$('#titleContainer').append('<a id="newsTitle" href="#" style="text-decoration:none; font-size:36px; color:#fff; font-family:Microsoft YaHei;" target="_blank"></a>')
		var pic = $('#picContent');

		container.append('<div id="numContainer" style="padding:0px 0px; margin-top:'+(h-40)+'px;height:40px; width:'+w+'px; z-index:99; position:absolute;"></div>')
		var num = $('#numContainer');
		num.append('<div id="numList" style="margin:10px 20px; height:20px; float:right;"></div>')
		num = $('#numList');

		for(var i = 0; data.picture[i]; i++){
			pic.append('\
				<div id= "pic'+i+'" class="picView" style="width:'+w+'px; display: none; z-index:'+i+'; position:absolute;">\
					<img src="'+data.picture[i].url+'" style="width:'+w+'px;">\
					<div class="mask">\
						<h2>'+ data.picture[i].title +'</h2>\
						<p>'+data.picture[i].info+'</p>\
						<a href="'+data.picture[i].link+'" target="_blank">²é¿´ÏêÇé</a>\
					</div>\
				</div>\
				');
			num.append('<span id="num'+i+'" class="translucent" style="margin:0px 6px; background-color:#393939; color:#e6e6e6; padding: 2px 4px; border:1px solid #e6e6e6;font-size:10px; cursor:pointer;">'+(i+1)+'</span>');
			newsTitleArray[i] = data.picture[i].title;
		}

		function mouseoverEvent(number){
			return function(){
				showPicture(number);
			}
		}

		for(var i = 0; data.picture[i]; i++){
			$('#num'+i)[0].onmousemove = mouseoverEvent(i);
			//$('#num'+i)[0].onmouseout = mouseoutEvent(i);
		}

		showPicture(0);

		var timer;
		var selectedIndex;
		var currentNum;
		var currentPicture;
		function showPicture(index){
			clearInterval(timer);
			if(selectedIndex != index){
				selectedIndex = index;
				if(currentPicture)
					currentPicture.fadeOut('slow');
				if(currentNum){
					currentNum.css('background-color', '#393939');
					currentNum.css('color', '#e6e6e6');
				}
				currentNum = $('#num'+index);
				currentNum.css('background-color', '#e2bc33');
				currentNum.css('color', '#393939');
				currentPicture = $('#pic'+index);
				currentPicture.fadeIn('slow');
				$('#newsTitle').text(newsTitleArray[index]);
				$('#newsTitle').attr('href', currentPicture.parent().attr('href'));
			}
			timer = setInterval(function(){
				var nextIndex = selectedIndex+1;
				if(nextIndex < data.picture.length)
					showPicture(nextIndex);
				else
					showPicture(0);
			}, 10000000);
		}
	}
}();