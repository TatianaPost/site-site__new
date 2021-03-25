/*
 * © Bugaev Ivan
 * This code is protected by copyright.
*/

var bivSliderHeight = 700; // slider height in pixels
if( $(window).width() > 1199 && $(window).height() > bivSliderHeight ) {
    bivSliderHeight = $(window).height()-$('#header .biv-header').height()-60;
}
var bivSliderAutostart = 1; // enable auto start (1/0)
var bivSliderAutostartTime = 8000; // slide change in seconds
var bivSliderTime = 0; // left scroll speed in seconds

var bivSliderPressing = 0; // system value (do not change)
var bivSliderScrolling = 0; // system value (do not change)
var bivSliderItem = 1; // system value (do not change)
var bivSliderItemsCount = 0; // system value (do not change)
var bivSliderItemPrev = 0; // system value (do not change

function BivSliderPrev() {
    if( bivSliderScrolling == '0' ) {
        windowWidth = $(window).width();
        bivSliderScrolling = '1';
        $('#bivSlide'+bivSliderItem).animate({ left: '0px' }, 0);
        $('#bivSlide'+bivSliderItem).animate({ left: windowWidth+'px' }, bivSliderTime);
        bivSliderItemPrev = bivSliderItem;

        itemPrev = bivSliderItem*1-1;
        if( itemPrev > 0 ) {
            bivSliderItem = itemPrev;
        } else {
            bivSliderItem = bivSliderItemsCount;
        }

        $('#bivSlide'+bivSliderItem).animate({ left: '-'+windowWidth+'px' }, 0);
        $('#bivSlide'+bivSliderItem).animate({ opacity: '1' }, 0);
        $('#bivSlide'+bivSliderItem).animate({ left: '0px' }, bivSliderTime);

        setTimeout(function(){
            $('#bivSlide'+bivSliderItemPrev).animate({ opacity: '0' }, 0);
            bivSliderScrolling = '0';
        },bivSliderTime);
    }
}

function BivSliderPrevBtn() {
    bivSliderPressing = '1';
    BivSliderPrev();
}

function BivSliderNext() {
    if( bivSliderScrolling == '0' ) {
        windowWidth = $(window).width();
        bivSliderScrolling = '1';
        $('#bivSlide'+bivSliderItem).animate({ left: '0px' }, 0);
        $('#bivSlide'+bivSliderItem).animate({ left: '-'+windowWidth+'px' }, bivSliderTime);
        bivSliderItemPrev = bivSliderItem;

        itemNext = bivSliderItem*1+1;
        if( bivSliderItem < bivSliderItemsCount ) {
            bivSliderItem = itemNext;
        } else {
            bivSliderItem = '1';
        }

        $('#bivSlide'+bivSliderItem).animate({ left: windowWidth+'px' }, 0);
        $('#bivSlide'+bivSliderItem).animate({ opacity: '1' }, 0);
        $('#bivSlide'+bivSliderItem).animate({ left: '0px' }, bivSliderTime);

        setTimeout(function(){
            $('#bivSlide'+bivSliderItemPrev).animate({ opacity: '0' }, 0);
            bivSliderScrolling = '0';
        },bivSliderTime);
    }
}

function BivSliderNextBtn() {
    bivSliderPressing = '1';
    BivSliderNext();
}

function BivSliderAutostart() {
    setInterval(function(){
        if( bivSliderPressing == '0' ) {
            BivSliderNext();
        }
    },bivSliderAutostartTime)
}

function BivSliderStart() {
    windowWidth = $(window).width();
    bivSliderItemsCount = $('.biv-slide').length;

    var n = 1;
    $('.biv-slide').each(function(){
        $(this).attr('id', 'bivSlide'+n);
        n++;
    });

    $( '#bivSlider' ).append( '<div class="biv-slider-nav-btns"><div class="biv-slider-nav-btns-list"><span class="biv-slider-nav-btns-prev" id="bivSlideBtnPrev" onclick="BivSliderPrevBtn();"><i class="fas fa-angle-left"></i></span><span class="biv-slider-nav-btns-next" id="bivSlideBtnNext" onclick="BivSliderNextBtn();"><i class="fas fa-angle-right"></i></span></div></div>' );

    $('#bivSlider .biv-slider-content').css('height', bivSliderHeight+'px');
    let i = 0;
    while (i < bivSliderItemsCount) {
        i++;
        imgUrl = $('#bivSlide'+i).data('src');
        if( i != '1' ) {
            $('#bivSlide'+i).animate({ opacity: '0' }, 0);
        }
        slideContentHeight = $('#bivSlide'+i).height();
        $('#bivSlide'+i).css({'height': bivSliderHeight+'px','backgroundImage': 'url('+imgUrl+')'});

    }
    slideContentOffset = (bivSliderHeight - $('.biv-slide-static').height())/2;
    $('.biv-slide-static').css('height',bivSliderHeight+'px');
    $('.biv-slide-static .biv-slide-content').css('padding',slideContentOffset+'px 0px 0px 0px');
    if( bivSliderAutostart == '1' ) {
        BivSliderAutostart();
    }
}

function BivSliderLoad(id) {
    if( bivSliderScrolling == '0' ) {
        $('#bivSlide'+bivSliderItem).animate({ opacity: '0' }, 0);
        $('#bivSlide'+id).css('left', '0px');
        $('#bivSlide'+id).animate({ opacity: '1' }, 0);
        bivSliderItem = id;
        bivSliderPressing = '1';
    }
}

BivSliderStart();

function BivSliderRestart() {
    $('.biv-slide-static').css('height','');
    $('.biv-slide-static .biv-slide-content').css('padding', '0px 0px 0px 0px');
    slideContentOffset = (bivSliderHeight - $('.biv-slide-static').height())/2;
    $('.biv-slide-static').css('height',bivSliderHeight+'px');
    $('.biv-slide-static .biv-slide-content').css('padding',slideContentOffset+'px 0px 0px 0px');
}

$(function() {
  $(window).resize(function() {
    BivSliderRestart();
  });
});