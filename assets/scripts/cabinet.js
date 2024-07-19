$(document).ready(function() {

  function setActiveContent() {
    var activeLi = $('.sidebar-list li.active');
    var contentId = '#' + activeLi.attr('id').replace('-li', '-content');
    $('.content-section').hide();
    $(contentId).show();
  }

  $('.sidebar-list li').on('click', function() {
    $('.sidebar-list li').removeClass('active');
    $(this).addClass('active');

    setActiveContent()
  });

  setActiveContent()
})