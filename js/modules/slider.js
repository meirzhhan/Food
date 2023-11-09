function slider() {
    // Slider
    const slides = document.querySelectorAll('.offer__slide'), //все слайды
          slider = document.querySelector('.offer__slider'), // слайдер полностью
          prev = document.querySelector('.offer__slider-prev'), //кнопка назад
          next = document.querySelector('.offer__slider-next'), //кнопка вперёд
          total = document.querySelector('#total'), //количество слайдов
          current = document.querySelector('#current'), //какой слайд открыт
          slidesWrapper = document.querySelector('.offer__slider-wrapper'), //контейнер слайдов
          slidesField = document.querySelector('.offer__slider-inner'), //поле слайда
          width = window.getComputedStyle(slidesWrapper).width; //ширина контейнера слайдов
    let slideIndex = 1; // иднекс слайда
    let offset = 0; //отступ 
    
    if (slides.length < 10) { // Если слайдов меньше 10
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%'; 
    slidesField.style.display = 'flex';
    slidesField.style.transititon = '0.5s all';

    slidesWrapper.style.overflow = 'hidden'; //скрыть не нужные слайды

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = []; 

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

    function slidesLengthChecker(length, index) { // Чекает двухзначный слайд или одна цифра
        if (length < 10) {
            current.textContent = `0${index}`;
        } else {
            current.textContent = index;
        }
    }
    function dotsOpacitySetter(index) { 
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[index - 1].style.opacity = 1;
    }
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // например '500px'. D - не цифры удаляет
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

        slidesLengthChecker(slides.length, slideIndex);
        dotsOpacitySetter(slideIndex);
    });
    prev.addEventListener('click', () => {
        if (offset == 0) { // '500px'
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

        slidesLengthChecker(slides.length, slideIndex);
        dotsOpacitySetter(slideIndex);
    });
    
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;
            
            slidesLengthChecker(slides.length, slideIndex);
            dotsOpacitySetter(slideIndex);
        });
    });

}

module.exports = slider;