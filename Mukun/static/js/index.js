/******** FullPage Configure************/

$(document).ready(function() {
    $('#fullpage').fullpage({
        sectionsColor: ['#2C95FF', '#669933', '#FF6A4D', '#FFFFCC', '#666666'],
        anchors: ['1stPage', '2ndPage', '3rdPage', '4thPage', '5thPage'],
        menu: '#menu',
        resize: true,
        showActiveTooltips: false,
        slidesNavigation: true,
        afterLoad: function(anchorLink, index){
            //section 1
            //section 2
            if(index == 2){
                //moving the image
                $('#imgbox1').delay(400).animate({
                    bottom: '12%',
                    opacity: 'show'
                }, 1500, 'easeOutExpo');
                $('#imgbox2').delay(300).animate({
                    bottom: '40%',
                    opacity: 'show'
                }, 1500, 'easeOutExpo');
                $('#imgbox3').delay(300).animate({
                    bottom: '55%',
                    opacity: 'show'
                }, 1500, 'easeOutExpo');
                $('#imgbox4').delay(400).animate({
                    bottom: '30%',
                    opacity: 'show'
                }, 1500, 'easeOutExpo');
                $('#imgbox5').delay(250).animate({
                    bottom: '66%',
                    opacity: 'show'
                }, 1500, 'easeOutExpo');
            }
        }
        //navigation: true,
        //navigationTooltips: ['首页', '庄园美景', '休闲娱乐', '住宿餐饮', '联系我们'],
        //navigationColor: '#fff'
    });
    $('#indexTextContainer').animate({
        opacity: 'toggle'
    }, 1000, 'linear');

    var windowW = $(window).width();
    var windowH = $(window).height();
    $('.imgbox .hoversensor').hover(function() {
        $(this).parent().find('span').fadeIn();
    },function() {
        $(this).parent().find('span').fadeOut();
    });
    $('.fp-prev').css('border-color', 'transparent #cccccc transparent transparent');
    $('.fp-next').css('border-color', 'transparent transparent transparent #cccccc');
    $('#entertainment').css('height', windowH);
    $('.slide .fp-tableCell').css('height', $(window).height());
    $('#fishing').css('left', windowW - 370);
    $('#billiard').css('left', windowW * 3 - 330);
});