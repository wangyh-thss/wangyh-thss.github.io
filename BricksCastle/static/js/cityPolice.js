(function() {
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
    for(var i = 1; i <= 5; i++){
        $('#num'+i)[0].onmousemove = mouseoverEvent(i);
        //$('#pic'+i)[0].split = splitSlide(i);
        slide[i] = splitSlide(i);
    }
    var timer;
    var selectedIndex;
    var currentNum;
    var currentPicture;
    showPicture(1);
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
            if(nextIndex <= 5)
                showPicture(nextIndex);
            else
                showPicture(1);
        }, 5000);
    }
})();
