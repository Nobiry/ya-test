async function WebpIsSupported() {
  if (!self.createImageBitmap) return false;

  const webpData =
    "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=";

  const blob = await fetch(webpData).then((r) => r.blob());

  return createImageBitmap(blob).then(
    () => true,
    () => false
  );
}

(async () => {
  if (await WebpIsSupported()) {
    document.body.classList.add("webp");
  }
})();

// Да можно было чище и класом
function slider({ slider, arrow, loop, nav, slidesToScroll = 1, slideWidth, animation }) {
  //-- Slideshow
  const slideshow = document.querySelector(slider);

  if (slideshow != null) {
    let slides = slideshow.querySelectorAll("[data-slider-slide]"),
      slidesWrap = slideshow.querySelector("[data-slider-wrap]"),
      arrowPrev = slideshow.querySelector(arrow.prev),
      arrowNext = slideshow.querySelector(arrow.next),
      slideCount = slides.length / slidesToScroll,
      currentSlide = 0,
      translateValue = 0,
      isLoop = loop || false,
      scrollWidth = slideWidth * slidesToScroll,
      numNav = slideshow.querySelector(nav.num),
      dotsNav = slideshow.querySelector(nav.dots),
      dotsArr = [];

    slides[0].classList.add("active");

    function moveToSlide(n) {
      if (!isLoop && (n < 0 || n > slideCount - 1)) return;

      slides[currentSlide].classList.remove("active");

      if (dotsNav) {
        dotsArr[currentSlide].classList.remove("active");
      }

      if (isLoop) {
        currentSlide = (n + slideCount) % slideCount;
      } else {
        currentSlide = n;
      }

      if (animation === 'temp') {
        translateValue = scrollWidth * currentSlide;
        slidesWrap.style.transform = "translateX(-" + translateValue + "px)";
      }

      slides[currentSlide].classList.add("active");

      if (dotsNav) {
        dotsArr[currentSlide].classList.add("active");
      }

      if (!isLoop) {
        arrowPrev.disabled = false;
        arrowNext.disabled = false;
        switch (currentSlide) {
          case 0:
            arrowPrev.disabled = true;
            break;
          case slideCount - 1:
            arrowNext.disabled = true;
            break;
        }
      }

      if (numNav) {
        sliderHandlers.numRender(numNav);
      }
    }

    function prevSlide(e) {
      moveToSlide(currentSlide - 1);
      let code = e.keyCode;
      if (code == 37) {
        moveToSlide(currentSlide - 1);
      }
    }
    function nextSlide(e) {
      moveToSlide(currentSlide + 1);
      let code = e.keyCode;
      if (code == 39) {
        moveToSlide(currentSlide + 1);
      }
    }

    const sliderHandlers = {
      prevSlide: function (element) {
        if (!isLoop) {
          arrowPrev.disabled = true;
        }
        element.addEventListener("click", prevSlide);
        document.body.addEventListener("keydown", prevSlide, false);
      },
      nextSlide: function (element) {
        element.addEventListener("click", nextSlide);
        document.body.addEventListener("keydown", nextSlide, false);
      },
      dotsRender: function (element) {
        for (let i = 0; i < slideCount; i++) {
          const dot = document.createElement("span");
          if (i === 0) {
            dot.classList.add("active");
          }
          dot.addEventListener("click", () => {
            moveToSlide(i);
          });
          element.appendChild(dot);
          dotsArr.push(dot);
        }
      },
      numRender: function (element) {
        element.innerHTML = `${(currentSlide + 1) * slidesToScroll} <span>/ ${slides.length}</span>`;
      },
    };

    sliderHandlers.prevSlide(arrowPrev);
    sliderHandlers.nextSlide(arrowNext);
    if (dotsNav) {
      sliderHandlers.dotsRender(dotsNav);
    }
    if (numNav) {
      sliderHandlers.numRender(numNav);
    }

    let initialX = null;
    let initialY = null;

    function startTouch(e) {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    }

    function moveTouch(e) {
      if (initialX === null) {
        return;
      }
      if (initialY === null) {
        return;
      }
      let currentX = e.touches[0].clientX;
      let currentY = e.touches[0].clientY;
      let diffX = initialX - currentX;
      let diffY = initialY - currentY;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          moveToSlide(currentSlide + 1);
        } else {
          moveToSlide(currentSlide + -1);
        }
      }
      initialX = null;
      initialY = null;
      e.preventDefault();
    }

    slideshow.addEventListener("touchstart", startTouch, false);
    slideshow.addEventListener("touchmove", moveTouch, false);
  } //end slideshow
}

if (window.screen.width <= 1365) {
  slider({
    slider: ".imp-steps-slider",
    arrow: {
      prev: "#imp-steps-slider-slide-prev",
      next: "#imp-steps-slider-slide-next",
    },
    loop: false,
    nav: {
      dots: "#imp-steps-slider__controls-dots",
    },
  });
}

if (window.screen.width <= 1365) {
  slider({
    slider: '.participants-slider',
    arrow: {
      prev: '#participants-slider-slide-prev',
      next: '#participants-slider-slide-next',
    },
    loop: true,
    nav: {
      num: '#participants-slider__controls-count',
    },
    slidesToScroll: 1,
    slideWidth: 367,
    animation: 'temp'
  });
}

if (window.screen.width >= 1366) {
  slider({
    slider: '.participants-slider',
    arrow: {
      prev: '#participants-slider-slide-prev',
      next: '#participants-slider-slide-next',
    },
    loop: true,
    nav: {
      num: '#participants-slider__controls-count',
    },
    slidesToScroll: 3,
    slideWidth: 414,
    animation: 'temp'
  });
}

function elPos(el) {
  var rect = el.getBoundingClientRect(),
  scrollTop = document.documentElement.scrollTop;
  return rect.top + scrollTop - window.innerHeight;
}

function startAnim(className) {
  let animEl = document.querySelector(className);
  let scrollPos = document.documentElement.scrollTop;
  let animElPos = elPos(animEl);
  console.log('ok');
  if (scrollPos >= animElPos) {
    animEl.classList.add('anim_fly-in');
    window.removeEventListener('scroll', animFunc);
  }
}

const animFunc = startAnim.bind(null, '.imp-steps__fly');

window.addEventListener('scroll', animFunc);