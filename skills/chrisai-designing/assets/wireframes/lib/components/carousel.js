(function () {
  function update(carousel, index) {
    var slides = carousel.querySelectorAll('.wf-carousel__slide');
    var track = carousel.querySelector('.wf-carousel__track');
    var dots = carousel.querySelectorAll('.wf-carousel__dot');
    var nextIndex = Math.max(0, Math.min(index, slides.length - 1));
    carousel.dataset.wfCarouselIndex = String(nextIndex);
    if (track) track.style.transform = 'translateX(' + (-100 * nextIndex) + '%)';
    Array.prototype.forEach.call(dots, function (dot, dotIndex) {
      dot.setAttribute('aria-current', String(dotIndex === nextIndex));
    });
  }

  function init(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-wf-carousel]'), function (carousel) {
      if (carousel.dataset.wfCarouselReady) return;
      carousel.dataset.wfCarouselReady = 'true';
      update(carousel, Number(carousel.dataset.wfCarouselIndex || 0));
      carousel.addEventListener('click', function (event) {
        var action = event.target.closest('[data-wf-carousel-action]');
        var dot = event.target.closest('[data-wf-carousel-dot]');
        if (dot) update(carousel, Number(dot.dataset.wfCarouselDot));
        if (!action) return;
        var current = Number(carousel.dataset.wfCarouselIndex || 0);
        update(carousel, action.dataset.wfCarouselAction === 'next' ? current + 1 : current - 1);
      });
    });
  }

  window.WireframeCarousel = { init: init, update: update };
})();
