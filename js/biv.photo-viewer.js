/*
 * © Bugaev Ivan
 * This code is protected by copyright.
*/

var bivPhotoViewerItem = 1; // system value (do not change)
var bivPhotoViewerItemsCount = 0; // system value (do not change)
var bivSliderScrolling = 0; // system value (do not change)

function BivPhotoViewerStart() {
    bivPhotoViewerItemsCount = $('.biv-photo-viewer-item').length;

    $("body").append('<div class="biv-photo-viewer" id="bivPhotoViewer"><span class="biv-photo-viewer-close" onclick="BivPhotoViewerClose();"><i class="fas fa-times"></i></span><span class="biv-photo-viewer-btn-left" onclick="BivPhotoViewerPrev();"><i class="fas fa-chevron-left"></i></span><span class="biv-photo-viewer-btn-right" onclick="BivPhotoViewerNext();"><i class="fas fa-chevron-right"></i></span><div id="bivPhotoViewerImage"></div></div>');

    var n = 1;
    $('.biv-photo-viewer-item').each(function(){
        $(this).attr('id', 'bivPVItem'+n);
        $(this).attr('data-item-id', n);
        imageUrl = $(this).data('src');
        $(this).attr("onclick", "BivPhotoViewer('"+n+"','"+imageUrl+"');");
        n++;
    });
}

BivPhotoViewerStart();

function BivPhotoViewer(imageId,imageUrl) {
    var windowWidthWS = $(window).width();
    var windowHeightWS = $(window).height();

    bivPhotoViewerItem = imageId;
    $('#bivPhotoViewerImage').css({'padding': ''});
    $("#bivPhotoViewerImage").html('<img src="'+imageUrl+'">');

    $('#bivPhotoViewer').show();
    $('#bivPhotoViewerImage').animate({ opacity: '1' }, 500);
    $('#bivPhotoViewer').animate({ opacity: '1' }, 500);

    $('body').css({width: windowWidthWS+'px'});
    $('#header').css({width: windowWidthWS+'px'});
    $('body').addClass('noscroll');
}

function BivPhotoViewerClose() {
    $('#bivPhotoViewer').animate({ opacity: '0' }, 500);
    setTimeout(function(){
        $('#bivPhotoViewer').hide();
        $('body').css({width: ''});
        $('#header').css({width: ''});
        $('body').removeClass('noscroll');
    },500);
}


function BivPhotoViewerPrev() {
    if( bivSliderScrolling == '0' ) {
        bivSliderScrolling = '1';
        if( bivPhotoViewerItem > 1 ) {
            bivPhotoViewerItem = bivPhotoViewerItem*1-1;
        } else {
            bivPhotoViewerItem = bivPhotoViewerItemsCount;
        }
        imageUrl = $('#bivPVItem'+bivPhotoViewerItem).data('src');
        $('#bivPhotoViewerImage').animate({ opacity: '0' }, 0);
        BivPhotoViewer(bivPhotoViewerItem,imageUrl);
        setTimeout(function(){
            bivSliderScrolling = '0';
        },500);
    }
}

function BivPhotoViewerNext() {
    if( bivSliderScrolling == '0' ) {
        bivSliderScrolling = '1';
        if( bivPhotoViewerItem < bivPhotoViewerItemsCount ) {
            bivPhotoViewerItem = bivPhotoViewerItem*1+1;
        } else {
            bivPhotoViewerItem = 1;
        }
        imageUrl = $('#bivPVItem'+bivPhotoViewerItem).data('src');
        $('#bivPhotoViewerImage').animate({ opacity: '0' }, 0);
        BivPhotoViewer(bivPhotoViewerItem,imageUrl);
        setTimeout(function(){
            bivSliderScrolling = '0';
        },500);
    }
}