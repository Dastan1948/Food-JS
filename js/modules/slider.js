function slider({container, slide, nextArraow, prevArrow, totalCount, currentCounter, wrapper, field}) {
  // Slider

  // Моя версия слайдера

  // const slider = document.querySelectorAll('.offer__slide');
  // const prevSlide = document.querySelector('.offer__slider-prev');
  // const nextSlide = document.querySelector('.offer__slider-next');
  // const sliderNum = document.querySelector('#current');
  // const totalNum = document.querySelector('#total');
  // let score = 0;

  // Start
  // function showSlide(i = 0) {
  //   slider.forEach(item => {
  //     item.classList.add('hide');
  //   });

  //   slider[i].classList.remove('hide');

  //   sliderNum.textContent = score + 1;

  //   if(Number(sliderNum.textContent) < 10) {
  //     sliderNum.textContent = `0${score + 1}`;
  //   } else {
  //     sliderNum.textContent = score + 1;
  //   }
  // }

  // showSlide();

  // nextSlide.addEventListener('click', () => {
  //   if(score < 3) {
  //     score++;
  //     console.log(score);
  //     showSlide(score);
  //   } else {
  //     score = 0;
  //     showSlide(score)
  //   }
  // });

  // prevSlide.addEventListener('click', () => {
  //   if(score > 0) {
  //     score--;
  //     console.log(score);
  //     showSlide(score);
  //   } else {
  //     score = 3;
  //     showSlide(score)
  //   }
  // })
  // End

  const slides = document.querySelectorAll(slide);
  const slider = document.querySelector(container);
  const prev = document.querySelector(prevArrow);
  const next = document.querySelector(nextArraow);
  const total = document.querySelector(totalCount);
  const current = document.querySelector(currentCounter);
  const slidesWrapper = document.querySelector(wrapper);
  const slidesField = document.querySelector(field);
  const width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol');
  const dots = [];

  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function slideDot() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = '.5'));
    dots[slideIndex - 1].style.opacity = 1;
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    slideDot();
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    slideDot();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      slideDot();
    });
  });
}

export default slider;
