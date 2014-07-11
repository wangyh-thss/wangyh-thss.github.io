void function comment(){
	var commentRequest = new XMLHttpRequest();
	var url;
	var currentPage = 1;
	//初始化评论区
	initComment();
	//本地存储，记录上一次浏览的页数
	if(localStorage['commentPage']){
		sendMessage(localStorage['commentPage']);
	}else{
		sendMessage(1);	
	}
	//向服务器请求数据 参数为页数
	function sendMessage(page){
		var pageNumber = parseInt(page);
		//在第一页和最后一页分别禁用上一页和下一页
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
		//本地储存浏览数据
		localStorage['commentPage'] = page;
		//通信
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
	//向评论区添加所需的容器
	function initComment(){
		var comments = $('#comments');
		comments.append('<div id="commentTitle" style="border-bottom:1px solid #393939;"></div>');
		comments.append('<div id="commentContainer"></div>');
		comments.append('<div id="commentControl" style="margin-right:30px;"></div>');
		setTitle();
		setControl();
	}
	//标题容器
	function setTitle(){
		var titleBar = $('#commentTitle');
		titleBar.append('<p style="font-size:25px; color:#393939; font-family:Microsoft YaHei; margin-bottom:0px;">评论<span style="font-size:15px">（伪）</span></p>')
		titleBar.append('<p id="pageCount"></p>')
	}
	//控件容器
	function setControl(){
		//添加控件：上一页  选择页码  下一页
		var controlBar = $('#commentControl');
		controlBar.append('<a class="btn btn-default next" href="#commentTitle" role="button">下一页</a>');
		var select = $('<select class="short form-control" style="float:right"></select>');
		for(var i = 1; i <= 20; i++){
			select.append('<option value="'+i+'">'+i+'</option>');
		}
		select.wrap('<span></span>')
		controlBar.append(select);
		controlBar.append('<a class="btn btn-default previous" href="#commentTitle" role="button">上一页</a>');
		//绑定控件触发的事件
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
	//载入评论数据
	var list;
	function loadComment(data){
		//移除现有数据
		if(list) list.remove();
		//添加目标数据
		var commentContainer = $('#commentContainer');
		commentContainer.append('<ul id="commentList"></ul>');
		list = $('#commentList');
		//逐条添加评论
		for(var i = 0; data.data.commentid[i]; i++){
			//某一项评论的整体
			var item = $('<li class="commentItem"></li>');
			//用户信息
			var user = $('<div class="userInfo"></div>');
			user.append('<img src="'+data.data.commentid[i].userinfo.head+'" class="userHead" />');
			user.append('<p class="userID">'+data.data.commentid[i].userinfo.nick+'</p>');
			//评论内容
			var content = $('<div style="margin-top:14px;"></div>')
			content.append('<div class="commentContent"><p class="commentText">'+data.data.commentid[i].content+'</p></div>');
			//时间信息和赞
			var info = $('<div class="commentInfo"></div>');
			info.append('<span class="timeInfo">'+data.data.commentid[i].timeDifference+'</span>');
			info.append('<span class="zan">('+data.data.commentid[i].up+')<span>');
			content.append(info);
			//将上述模块添加到列表项中
			item.append(user);
			item.append(content);
			item.append('<div id="clearfix"></div>')
			list.append(item);
		}
		//绑定“赞”的点击事件 仅仅实现了视觉效果，没有与服务器的数据传输
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