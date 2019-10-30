$(function () {

    $('.search-open').on('click', function () {
        $(this).closest('.search').addClass('open');
    });

    var topSlider = $('.top-slider-in');
    topSlider.owlCarousel({
        items: 1,
        dots: false,
        nav: true
    }).on('translated.owl.carousel', function () {
        var itemActive = $(this).find('.active').index() + 1;
        topSliderPager.find('b').text(itemActive);
    });
    var itemsLength = topSlider.find('.item').length;
    var topSliderPager = $('<div class="top-slider-pager"><b>1</b><span>' + itemsLength + '</span></div>');
    topSliderPager.insertAfter(topSlider.find('.owl-prev'));

    $('.slider-mid').owlCarousel({
        items: 1,
        dots: false,
        nav: true
    });

    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

    $('.reviews-slider').owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: true,
        margin: 102
    });

    $('.product-slider .item').each(function () {
        var itemIndex = $(this).index();
        $(this).attr('data-id', itemIndex);
    });

    var sliderMain = $('.product-slider-main');
    sliderMain.each(function () {
        $(this).clone().removeClass('product-slider-main').addClass('product-slider-nav').insertAfter($(this));
        $(this).addClass('slider-nav').owlCarousel({
            items: 1,
            dots: true,
            nav: true,
            mouseDrag: false,
            touchDrag: false,
            smartSpeed: 100
        });
        $(this).find('.owl-dot').each(function(){
            $(this).attr('data-id', $(this).index());
        });
    });

    var sliderNav = $('.product-slider-nav');
    sliderNav.owlCarousel({
        items: 4,
        dots: false,
        margin: 8,
        mouseDrag: false,
        touchDrag: false,
        video: true
    });

    $('.product-slider .owl-item').each(function () {
        var itemIndex = $(this).find('.item').attr('data-id');
        $(this).attr('data-id', itemIndex);
    });

    sliderMain.on('translated.owl.carousel', function() {
        var slideActive = $(this).find('.owl-item.active').attr('data-id');
        sliderNav.trigger('to.owl.carousel', [slideActive, 100]);
        sliderNav.find('.owl-item[data-id="' + slideActive +'"]').addClass('current').siblings().removeClass('current');
    });

    sliderNav.each(function () {
        $(this).find('.owl-item:first-child').addClass('current');
        $(this).find('.owl-item').on('click', function () {
            $(this).addClass('current').siblings().removeClass('current');
            var slideActive = $(this).attr('data-id');
            sliderMain.find('.owl-dot[data-id="' + slideActive +'"]').trigger('click');
        })
    });

    $('.tabs-list-item').each(function () {
       $(this).attr('data-id', $(this).index());
    });

    $('.tabs-nav-item').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        var tabId = $(this).index();
        $('.tabs-list-item[data-id=' + tabId +']').addClass('active').siblings().removeClass('active');
    });

    $('.header-toggle button').on('click', function () {
        $('.header').toggleClass('open');
    });

    $(window).on('load resize scroll', function () {
        var windowTop = $(this).scrollTop();
        var headerBottom = $('.header-bottom');
        var headerBottomWrap = $('.header-bottom-wrap');
        var headerBottomHeight = headerBottomWrap.outerHeight();
        headerBottom.css('height', headerBottomHeight);
        var headerOffsetTop = headerBottom.offset().top;
        if(windowTop >= (headerBottomHeight + headerOffsetTop)){
            headerBottomWrap.addClass('fixed');
        }else{
            headerBottomWrap.removeClass('fixed');
        }
    });

});
