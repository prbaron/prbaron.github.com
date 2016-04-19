window.addEventListener('load', function () {
  FastClick.attach(document.body);
}, false);

$(document).ready(function () {
  $(window).scroll(function () {
    var $navbar   = $('#navbar');
    var $header   = $('#header');
    var scrollTop = document.body.scrollTop;
    if (scrollTop > $header.outerHeight() - $navbar.outerHeight() - 1) {
      $('#navbar').addClass('navbar-shadow');
    }
    else {
      $('#navbar').removeClass('navbar-shadow');
    }
  });

  $('#hero h2, #hero .row').css('visibility', 'hidden');
  $('#hero h1').addClass('fadeInDown animated')
    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $('#hero h2')
        .css('visibility', 'visible')
        .addClass('fadeInUp animated')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          $('#hero .row').css('visibility', 'visible').addClass('fadeIn animated');
        });
    });
});
