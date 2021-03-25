/*
 * © Bugaev Ivan
 * This code is protected by copyright.
*/

var classBody = 'body';

// Preloader

function BivPreloaderStart() {
    $('#bivPreloader').show();
}

function BivPreloaderStop() {
    setTimeout(function(){
        $('#bivPreloader').fadeOut(300);
    },300);
}

BivPreloaderStart();

$(window).load(function () {
    BivPreloaderStop();
});

// Loading images

function BivBackgroundImage() {
    $('.biv-background').each(function(){
        imgUrl = $(this).data('src');
        $(this).css({'backgroundImage': 'url('+imgUrl+')'});
    });
}

BivBackgroundImage();

// Header

$(function(){
    $block = $('#header');
    $window = $(window);
    $headerHeight = $block.offset().top;
    $window.scroll(function(){
        if ($window.scrollTop() > $headerHeight ) {
            $block.addClass('fixed');
        } else {
            $block.removeClass('fixed');
        }
    });
});

function BivTopContactsBtn() {
    blockId = "#bivTopContacts";
    classname = "active";
    blockIdBtn = "#bivTopContacts .biv-top-contacts-left-nav";
    classnameBtn = "active";
    if (!$(blockId).hasClass(classname)) {
        $(blockId).addClass(classname);
        $(blockIdBtn).addClass(classnameBtn);
    } else {
        $(blockId).removeClass(classname);
        $(blockIdBtn).removeClass(classnameBtn);
    }
}

function BivNavBtn() {
    blockId = "#header";
    classname = "active";
    if (!$(blockId).hasClass(classname)) {
        $(blockId).addClass(classname);
        $('body').addClass('noscroll');
    } else {
        $(blockId).removeClass(classname);
        $('body').removeClass('noscroll');
    }
}

function BivNavBtnSubmenu(id) {
    blockId = "#subMenu"+id;
    classname = "active";
    if (!$(blockId).hasClass(classname)) {
        $(blockId).addClass(classname);
    } else {
        $(blockId).removeClass(classname);
    }
}

// Terms of use

function BivSetCookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure ) {
    var cookie_string = name + "=" + escape ( value );
    if( exp_y )
    {
        var expires = new Date ( exp_y, exp_m, exp_d );
        cookie_string += "; expires=" + expires.toGMTString();
    }
    if( path )
        cookie_string += "; path=" + escape ( path );
    if( domain )
        cookie_string += "; domain=" + escape ( domain );
    if( secure )
        cookie_string += "; secure";
    document.cookie = cookie_string;
}

function BivGetCookie ( cookie_name ) {
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
    if( results )
        return ( unescape ( results[2] ) );
    else
        return null;
}

function BivDeleteCookie( cookie_name ) {
    var cookie_date = new Date ( );
    cookie_date.setTime ( cookie_date.getTime() - 1 );
    document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

function BivAgreementLoad() {
    if( BivGetCookie("bivagree") != '1' ) {
        $('#bivAgreement').removeClass('biv-agreement-hidden');
    }
}

function BivAgreementBtn() {
    BivSetCookie("bivagree", "1");
    $('#bivAgreement').addClass('biv-agreement-hidden');
}

BivAgreementLoad();

// Scroll to block

function BivScrolling(id) {
    blockId = "#header";
    classname = "active";
    if ($(blockId).hasClass(classname)) {
        $(blockId).removeClass(classname);
        $('body').removeClass('noscroll');
    }
    $target = $('#'+id);
    $("html, body").stop().animate({
        'scrollTop': $target.offset().top-$('#header').height()-90
    }, 1000, 'swing', function () {
    });
}