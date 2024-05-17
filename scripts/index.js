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
      }
    ]
  });



  $('.thumbnail').on('click', function() {
    let index = $(this).data('bs-slide-to');
    updateActiveThumbnail(index);
    $('#carouselExample').carousel(index);
  });

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