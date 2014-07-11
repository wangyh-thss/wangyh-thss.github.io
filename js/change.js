function changeList(){
	var a = $('#listCourseBox tr');
	for(i = 0; i < a.length; i++){
		$(a[i]).find('.course-num').text(i);
		var link = $(a[i]).find('.newNotice').attr('href');
		$(a[i]).find('.newNotice').text(3);
		var news = $('<div class="news" style="display: none;"><div style="padding: 8px 12px;"><a href="'+link+'">第一条公告</a></div><div style="padding: 8px 12px;"><a href="'+link+'">第二条公告</a></div><div style="padding: 8px 12px;"><a href="'+link+'">第三条公告</a></div></div>');
		$(a[i]).find('.newNotice').parent().after(news);
		$(a[i]).find('.newNotice').click(function(e){
			$(this).parent().parent().children('.news').slideToggle("slow");
			e.preventDefault();
		});
	}
	$('.self').removeClass('active');
	$('.other').addClass('active');
	$('.icon-file-grid-active').attr('class', 'icon-file-grid');
	$('.icon-file-list').attr('class', 'icon-file-list-active');
	$('.gapls').text('软件22  王昳晗  版权所有');
}




//function changeCourseIndex(){
	var redName = $('.hw-list').find('.red');
	var link;
	for(i = 0; redName[i]; i++){
		link = $(redName[i]).attr('href');
		link = link.replace('result', 'detail');
		$(redName[i]).attr('href', link);
		$(redName[i]).attr('target', '_blank');
	}

	var hwlist = $('.hw-list').children();
	for(i = 0; hwlist[i]; i++){
		var button = $('<button type="button" class="btn btn-danger delete">删除</button>');
		$(button).css('float','right');
		$(button).css('margin-top','11px');
		$(button).css('margin-right','10px');
		$(button).click(function(){
			$(this).parent().remove();
		});
		$(hwlist[i]).append(button);
	}

	var num = $('.f36');
	var file = $('.standord-nav').find('a');
	link = $(file[1]).attr('href');
	var add = $('<a href="'+link+'" class="'+$(num).attr('class')+'">'+$(num).text()+'</a>');
	$(add).css('color', '#fff');
	$(add).attr('target', '_blank');
	$(num).replaceWith(add);

	var blockTitle = $('h3');
	$(blockTitle).append('<a class="more" href="" style="padding-right:20px;float:right;">收起<a>')
	$(blockTitle).parent().children('*:not(h3)').wrap('<div class="slide"></div>');
	$('.more:visited').css("color", '#000');
	$('.more').click(function(e){
		if($(this).parent().parent().children('.slide').is(':hidden')){
			$(this).text('收起');
		}
		else{
			$(this).text('展开');
		}
		$(this).parent().parent().children('.slide').slideToggle("slow");
		e.preventDefault();
	})

	$('.mt10').after($('.mb10'));
	$('.mt10').children('.slide').css('display', 'none');
	$('.mt10').find('.more').text('展开');
//}