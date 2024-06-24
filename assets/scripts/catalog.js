$(document).ready(function() {
  $(".custom-select-wrapper").on("click", ".custom-select", function(e) {
    var $this = $(this);
    $(".custom-select").not($this).removeClass("open").find(".custom-options").hide();
    $this.toggleClass("open").find(".custom-options").toggle();
    e.stopPropagation();
  });

  $(".custom-option").on("click", function(e) {
    var $this = $(this);
    $(".custom-option").removeClass("selected");
    $this.addClass("selected");
    $(".custom-select-trigger").html($this.text());
    $(".custom-select").removeClass("open").find(".custom-options").hide();
    e.stopPropagation();
  });

  $(document).on("click", function() {
    $(".custom-select").removeClass("open");
    $(".custom-options").hide();
  });

  var $slider = $('#range-component');
  var $range = $('#range');
  var $thumbMin = $('#thumbMin');
  var $thumbMax = $('#thumbMax');
  var $minValueLabel = $('#min-value');
  var $maxValueLabel = $('#max-value');

  var min = 0;
  var max = 1000;

  function updateSlider() {
    var sliderWidth = $slider.width();
    $thumbMin.css('left', '0px');
    $thumbMax.css('left', sliderWidth - $thumbMax.width() + 'px');
    $range.css({
      'left': $thumbMin.position().left + 'px',
      'width': $thumbMax.position().left - $thumbMin.position().left + 'px'
    });

    $minValueLabel.text(min);
    $maxValueLabel.text(max);
  }

  function handleMove(event, thumb, isMin) {
    var clientX = event.clientX || event.touches[0].clientX;
    var newLeft = clientX - $slider.offset().left;

    if (isMin) {
      if (newLeft < 0) newLeft = 0;
      var rightEdge = $thumbMax.position().left - $thumbMin.width();
      if (newLeft > rightEdge) newLeft = rightEdge;

      $thumbMin.css('left', newLeft + 'px');
      $range.css({
        'width': $thumbMax.position().left - $thumbMin.position().left + 'px',
        'left': $thumbMin.position().left + 'px'
      });
      $minValueLabel.css('left', $thumbMin.position().left - 10 + 'px').text(Math.round(min + (max - min) * ($thumbMin.position().left / $slider.width())));
    } else {
      newLeft -= $thumbMax.width();
      if (newLeft < $thumbMin.position().left + $thumbMin.width()) newLeft = $thumbMin.position().left + $thumbMin.width();
      var rightEdge = $slider.width() - $thumbMax.width();
      if (newLeft > rightEdge) newLeft = rightEdge;

      $thumbMax.css('left', newLeft + 'px');
      $range.css('width', $thumbMax.position().left - $thumbMin.position().left + 'px');
      $maxValueLabel.css('left', $thumbMax.position().left - 30 + 'px').text(Math.round(min + (max - min) * (($thumbMax.position().left + $thumbMax.width()) / $slider.width())));
    }
  }

  function handleMouseDown(event, thumb, isMin) {
    event.preventDefault();

    var moveHandler = function(event) {
      handleMove(event, thumb, isMin);
    };

    var upHandler = function() {
      $(document).off("mousemove touchmove", moveHandler);
      $(document).off("mouseup touchend", upHandler);
    };

    $(document).on("mousemove touchmove", moveHandler);
    $(document).on("mouseup touchend", upHandler);
  }

  $thumbMin.on("mousedown touchstart", function(event) {
    handleMouseDown(event, $thumbMin, true);
  });

  $thumbMax.on("mousedown touchstart", function(event) {
    handleMouseDown(event, $thumbMax, false);
  });

  $(window).resize(function() {
    updateSlider();
  });

  function onShow() {
    setTimeout(updateSlider, 0);
  }

  updateSlider();

  $("#filter-toggle").on("click", function() {
    $(this).toggleClass("open");
    $(".shop-sidebar").toggleClass("open");
    onShow();
  });



  $(".show_more_filters_value").click(function () {
    const more10 = $(this).siblings('.more10');

    more10.toggleClass("hidden");
    $(this).toggleClass("show");

    const isShow = $(this).data('isShow');
    $(this).data('isShow', !isShow);

    if (!isShow) {
      $(this).find("span").text("Меньше параметрів");
    } else {
      $(this).find("span").text("Всі параметри");
    }
  });
});