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


const updateSlideNumber = (currentIndex) => {
  const total = $('#fullScreenCarousel .carousel-item').length;
  $('.custom-slide-number span').text(currentIndex + ' of ' + total);
}

const slidersInit = () => {
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
}

$(document).ready(function () {
  let isShow = false

  slidersInit()

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

  $('#openModalBtn').on('click', function (e) {
    e.preventDefault();
    $('#modalUserCartPopUp').modal('show');
  });
})