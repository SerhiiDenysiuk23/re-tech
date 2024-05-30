$(document).ready(function () {
  $(".promo-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    swipe: true,
    interval: 500,
    autoplay: true
  });

  $(".day-product-list-slider").each(function(index, element){
    var nextArrow = $(this).siblings('.slick-next');
    var prevArrow = $(this).siblings('.slick-prev');

    $(this).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: nextArrow,
      prevArrow: prevArrow,
      autoplay: true,
      interval: 500
    });
  });
})