$(document).ready(function() {

  $('.product-list-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: $(".slick-next"),
    prevArrow: $(".slick-prev"),
    responsive:[
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

  $('.search-icon').click(function() {
    $('.search-form').toggleClass('active');
  });

  $(document).click(function(event) {
    if (!$(event.target).closest('.search-form').length && !$(event.target).closest('.search-icon').length) {
      $('.search-form').removeClass('active');
    }
  });






  $('#product-gallery').carousel({
    interval: false
  });

  // Обработчик кликов по миниатюрам
  $('.thumbnail').on('click', function() {
    var index = $(this).data('bs-slide-to');
    updateActiveThumbnail(index);
    $('#carouselExample').carousel(index);
  });

  // Обновление активной миниатюры при смене слайда
  $('#product-gallery').on('slid.bs.carousel', function(event) {
    updateActiveThumbnail(event.to);
  });

  function updateActiveThumbnail(index) {
    $('.thumbnail').removeClass('active');
    $('.thumbnail[data-bs-slide-to="' + index + '"]').addClass('active');
  }



  let isShow = false

  $(".show_more_specific_value").click(function(){
    $(".more10").toggleClass("hidden");
    $(this).toggleClass("show");
    isShow = !isShow
    if (isShow) {
      $(this).find('div').text("Меньше характеристик");
    } else {
      $(this).find('div').text("Показати всі характеристики");
    }
  });
});