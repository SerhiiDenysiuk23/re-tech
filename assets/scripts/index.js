
$(document).ready(function () {
  $('.search-icon').click(function () {
    $('.search-form').toggleClass('active');
  });

  $(document).click(function (event) {
    if (!$(event.target).closest('.search-form').length && !$(event.target).closest('.search-icon').length) {
      $('.search-form').removeClass('active');
    }
  });

  $(".burger-icon").click(function () {
    $(".burger-menu").toggleClass("active");
  });

  $(".burger-menu ul li a").click(function () {
    $(".burger-menu").removeClass("active");
  });



  $('.product-list-slider').each(function(index, element){
    var nextArrow = $(this).siblings('.slick-next');
    var prevArrow = $(this).siblings('.slick-prev');

    $(this).slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: nextArrow,
      prevArrow: prevArrow,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  });








  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $('#scrollUp').fadeIn();
    } else {
      $('#scrollUp').fadeOut();
    }
  });

});