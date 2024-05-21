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

  $('.thumbnail').on('click', function () {
    var index = $(this).data('bs-slide-to');
    updateActiveThumbnail(index);
    $('#carouselExample').carousel(index);
  });

  $('#product-gallery').on('slid.bs.carousel', function (event) {
    updateActiveThumbnail(event.to);
  });

  function updateActiveThumbnail(index) {
    $('.thumbnail').removeClass('active');
    $('.thumbnail[data-bs-slide-to="' + index + '"]').addClass('active');
  }

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


  $('#product-gallery .carousel-item').on('click', function () {
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