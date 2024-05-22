const deliveryContent =  `
                <p>- Готівкою в магазині або кур'єру</p>
                <p>- Онлайн оплата картою на сайті</p>
                <p>- Карткою в магазині</p>
                <p>- Оплата частинам від Mono або Privat</p>
                <p>- Миттєва розстрочка від Mono або Privat</p>
                <p>- USDT</p>
                <p>- На рахунок ФОП по IBAN</p>
`

const paymentContent = `
                <p>- Готівкою в магазині або кур'єру</p>
                <p>- Онлайн оплата картою на сайті</p>
                <p>- Карткою в магазині</p>
                <p>- Оплата частинам від Mono або Privat</p>
                <p>- Миттєва розстрочка від Mono або Privat</p>
                <p>- USDT</p>
                <p>- На рахунок ФОП по IBAN</p>

`

const infoData = [
  {value: "delivery", title: "Інформація про Доставку", content: deliveryContent},
  {value: "pickup", title: "Самовивіз із нашого магазину", content: "за адресою Велика Васильківська 33"},
  {value: "novaPost", title: "Доставка службою \"Нова Пошта\"", content: "у відділення або поштомат"},
  {value: "payment", title: "Інформація про Оплату", content: paymentContent},
  {value: "cash", title: "Оплата", content: "Готівкою в магазині або кур'єру"},
  {value: "card", title: "Оплата", content: "Карткою на сайті або в магазині"},
  {value: "credit", title: "Оплата", content: "Оплата частинам і розстрочка від Mono або Privat"},
]



$(document).ready(function () {

  $('.product-list-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: $(".slick-next"),
    prevArrow: $(".slick-prev"),
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


  const gallerySlider = $('.gallery-slider')
  const thumbnails = $('.thumbnails')
  gallerySlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    swipe: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          swipe: true
        }
      }
    ]
  });
  thumbnails.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    focusOnSelect: false,
    swipe: false
  });


  thumbnails.on('click', '.slick-slide', function(event) {
    var index = $(this).data("slick-index");
    gallerySlider.slick('slickGoTo', index);

    if (index === thumbnails.slick('slickCurrentSlide')) {
      thumbnails.slick('slickPrev');
    }

    if (index === thumbnails.slick('slickCurrentSlide') + thumbnails.slick('getSlick').options.slidesToShow - 1) {
      thumbnails.slick('slickNext');
    }

    thumbnails.find('.slick-slide.slick-current').removeClass('slick-current');

    $(this).addClass('slick-current');
  });



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


  $('#product-gallery').carousel({
    interval: false
  });





  $('#openModalBtn').on('click', function(e) {
    e.preventDefault(); // Предотвращаем переход по ссылке
    $('#modalUserCartPopUp').modal('show'); // Показываем модальное окно
  });

  let isShow = false

  $(".show_more_specific_value").click(function () {
    $(".more10").toggleClass("hidden");
    $(this).toggleClass("show");
    isShow = !isShow
    if (isShow) {
      $(this).find('div').text("Меньше характеристик");
    } else {
      $(this).find('div').text("Показати всі характеристики");
    }
  });


  $('.gallery-slider__item').on('click', function () {
    const index = $(this).index();
    $('#fullScreenCarousel').carousel(index);
    $('#fullScreenModal').modal('show');
    updateSlideNumber(index + 1);
  });

  $('#fullScreenCarousel').on('slid.bs.carousel', function () {
    const currentIndex = $('#fullScreenCarousel .carousel-item.active').index() + 1;
    updateSlideNumber(currentIndex);
  });

  function updateSlideNumber(currentIndex) {
    const total = $('#fullScreenCarousel .carousel-item').length;
    $('.custom-slide-number span').text(currentIndex + ' of ' + total);
  }


  const infoModal = $('#infoModal');
  infoModal.on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);
    const recipient = button.data('bs-whatever');

    const modalTitle = infoModal.find('.modal-title');
    const modalBodyInput = infoModal.find('.modal-body');

    const data = infoData.find(item => item.value === recipient)
    modalTitle.text(data.title);
    modalBodyInput.html(data.content);
  });


  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $('#scrollUp').fadeIn();
    } else {
      $('#scrollUp').fadeOut();
    }
  });

});