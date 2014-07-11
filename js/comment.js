void function comment(){
	var commentRequest = new XMLHttpRequest();
	var url;
	var currentPage = 1;

	initComment();
	sendMessage(1);

	function sendMessage(page){
		var pageNumber = parseInt(page);
		if(pageNumber == 1){
			$('.previous').addClass('disabled');
		}else{
			$('.previous').removeClass('disabled');
		}
		if(pageNumber == 20){
			$('.next').addClass('disabled');
		}else{
			$('.next').removeClass('disabled');
		}
		$('#pageCount').text(pageNumber+' / 20 页')
		url = '../data/comment/'+ pageNumber;
		$('.form-control').val(pageNumber);
		commentRequest.onreadystatechange = handler;
		commentRequest.open('GET', url);
		commentRequest.send();
	}

	function handler(){
		if(this.readyState == this.DONE){
			if(this.status == 200){
				try{
					loadComment(JSON.parse(this.responseText));
				}catch(ex){
					alert(ex.massage);
				}
			}
		}
	}

	function initComment(){
		var comments = $('#comments');
		comments.append('<div id="commentTitle" style="border-bottom:1px solid #393939;"></div>');
		comments.append('<div id="commentContainer"></div>');
		comments.append('<div id="commentControl" style="margin-right:30px;"></div>');
		setTitle();
		setControl();
	}

	function setTitle(){
		var titleBar = $('#commentTitle');
		titleBar.append('<p style="font-size:25px; color:#393939; font-family:Microsoft YaHei; margin-bottom:0px;">评论（伪）</p>')
		titleBar.append('<p id="pageCount"></p>')
	}

	function setControl(){
		var controlBar = $('#commentControl');
		controlBar.append('<a class="btn btn-default next" href="#commentTitle" role="button">下一页</a>');
		
		var select = $('<select class="short form-control" style="float:right"></select>');
		for(var i = 1; i <= 20; i++){
			select.append('<option value="'+i+'">'+i+'</option>');
		}
		select.wrap('<span></span>')
		controlBar.append(select);
		
		controlBar.append('<a class="btn btn-default previous" href="#commentTitle" role="button">上一页</a>');
		$('.previous').click(function(){
			if(currentPage > 1){
				currentPage = currentPage - 1;
			}
			sendMessage(currentPage);
		})
		$('.next').click(function(){
			if(currentPage < 20){
				currentPage = currentPage + 1;
			}
			sendMessage(currentPage);
		})
		$('.form-control').change(function(){
			currentPage = this.value;
			window.location.href = '#commentTitle';
			sendMessage(currentPage);
		})
	}

	var list;
	function loadComment(data){
		if(list)
			list.remove();
		var commentContainer = $('#commentContainer');
		commentContainer.append('<ul id="commentList"></ul>');
		list = $('#commentList');
		for(var i = 0; data.data.commentid[i]; i++){
			var item = $('<li class="commentItem"></li>');
			var user = $('<div class="userInfo"></div>');
			user.append('<img src="'+data.data.commentid[i].userinfo.head+'" class="userHead" />');
			user.append('<p class="userID">'+data.data.commentid[i].userinfo.nick+'</p>');

			var content = $('<div style="margin-top:14px;"></div>')
			content.append('<div class="commentContent"><p class="commentText">'+data.data.commentid[i].content+'</p></div>');
			var info = $('<div class="commentInfo"></div>');
			info.append('<span class="timeInfo">'+data.data.commentid[i].timeDifference+'</span>');
			info.append('<span class="zan">('+data.data.commentid[i].up+')<span>');
			content.append(info);

			item.append(user);
			item.append(content);
			item.append('<div id="clearfix"></div>')
			list.append(item);
		}
		$('.zan').click(function(){
			var string = $(this).text();
			var num = parseInt(string.split('(')[1].split(')')[0]);
			if($(this).attr('visited') == 'true'){
				$(this).css('color', '#969696');
				$(this).attr('visited', 'false');
				num = num - 1;
			}else{
				$(this).css('color', '#0099FF');
				$(this).attr('visited', 'true');
				num = num + 1;
			}
			string = '('+ num +')';
			$(this).text(string);
		})
	}
}()