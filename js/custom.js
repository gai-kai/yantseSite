(function ($) {
  // menu fixed js code
  $(window).scroll(function () {
/*    if(document.head.scrollTop === 0)
      $('header').css('visibility', 'hidden');*/


    var window_top = $(window).scrollTop() + 1;
    if (window_top > 50) {
      $('.main_menu').addClass('menu_fixed animated fadeInDown');
      $('header').css('visibility', 'visible');
    } else {
      $('.main_menu').removeClass('menu_fixed animated fadeInDown');


    }
  });

  /*if (window.matchMedia("(max-width: 767px)").matches)
  {

    $('.openHoursBIG').css('font-size', 'small');
    $('.openHoursBIG').css('margin-top', '50%');
    $('.checkBox').css('margin-left', '150px');
  } else {

    // The viewport is at least 768 pixels wide

  }*/

  $(window).resize(function (){
    if($(window).width() < 750) {
      if($(window).width() < 500)
      {
    /*    $('.openHoursBIG').css('margin-top', '20%');*/
        $('.checkBox').css('margin-left', '150px');

      }
/*      $('.openHoursBIG').css('font-size', 'small');
      $('.openHoursBIG').css('margin-top', '50%');*/
    }
    else {
/*      $('.openHoursBIG').css('font-size', 'x-large');
      $('.openHoursBIG').css('margin-top', '5%');*/
      $('.checkBox').css('margin-left', '7%');
      $('.checkBox').css('margin-top: 7%');

    }
  });

  "use strict";
  /*$('header').css('visibility', 'hidden');*/
  $('#datepicker').datepicker();

  $('.popup-youtube, .popup-vimeo').magnificPopup({
    // disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  if (document.getElementById('default-select')) {
    $('select').niceSelect();
  }

  var review = $('.client_review_part');
  if (review.length) {
    review.owlCarousel({
      items: 3,
      loop: true,
      dots: true,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 5000,
      nav: false,
      margin: 20,
      center: true,
      responsive:{
        0:{
          items:1,
          dots: false
        },
        600:{
          items:2,
        },
        1000:{
          items:3,
        }
      }
    });
  }











  $('.gallery_img').magnificPopup({
    type: 'image',
    gallery:{
      enabled:true
    }
  });

}(jQuery));