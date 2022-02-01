export class Slider {
   constructor(selector) {
      this.box = document.querySelector(selector);
      this.buttonNext = this.box.querySelector('.slider__arrow--next');
      this.buttonPrev = this.box.querySelector('.slider__arrow--prev');
      this.sliderLine = this.box.querySelector('.slider__line');
      this.sliderItems = this.box.querySelectorAll('.slider__item');
      this.sliderProgressLine = this.box.querySelector('.slider__progress-line');
      this.sliderCount = 0;
      this.slidesToShow = 4;
      this.margin = 42;
      this.time = 0;
      this.interval;
      this.autoPlayTime;

      this.buttonNext.addEventListener('click', () => {
         this.onNavClick(this.showNext);
      })

      this.buttonPrev.addEventListener('click', () => {
         this.onNavClick(this.showPrev);
      })
   }

   onNavClick = (method) => {
      clearInterval(this.interval)
      let newTime = new Date;

      if (newTime - this.time > 500) {
         method();
         this.time = new Date;
      }
      if (this.autoPlayTime) {
         setTimeout(() => this.autoPlay(this.autoPlayTime), 2000)
      }
   }

   showNext = () => {
         this.sliderCount++;
         this.toggleSlide();
   }

   showPrev = () => {
         this.sliderCount--;
         this.toggleSlide();
   }

   toggleSlide() {
      if (this.sliderCount < 0) {
         this.sliderCount = 0;
      } else if (this.sliderCount <= this.sliderItems.length - this.slidesToShow) {
         this.slideMovement();
         this.disableButtons()
      } else if (this.sliderCount > this.sliderItems.length - this.slidesToShow) {
         this.sliderCount = this.sliderItems.length - this.slidesToShow;
         this.slideMovement();
         this.disableButtons()
      }
   }

   slideMovement() {
      this.sliderLine.style.transform = `translateX(-${(this.sliderItems[0].clientWidth + this.margin) * this.sliderCount}px)`;
      this.sliderProgressLine.style.width = `${(100 / (this.sliderItems.length - (this.slidesToShow - 1))) * (this.sliderCount + 1)}%`;
   }

   disableButtons() {
      this.sliderCount === this.sliderItems.length - this.slidesToShow
      ? this.buttonNext.disabled = true
      : this.buttonNext.disabled = false;

      this.sliderCount > 0 ? this.buttonPrev.disabled = false : this.buttonPrev.disabled = true;
   }

   autoPlay = (time) => {
      this.interval = setInterval(this.showNext, time)
      this.autoPlayTime = time;
   }

   setSlidesToShow(num) {
      this.slidesToShow = num;
   }

   calcSlidesToShow() {
      if (window.innerWidth <= 500) {
         this.setSlidesToShow(1)
      } else if (window.innerWidth <= 720) {
         this.setSlidesToShow(2)
      } else if (window.innerWidth <= 1024) {
         this.setSlidesToShow(3)
      } else {
         this.setSlidesToShow(4)
      }
   }

   init() {
      this.calcSlidesToShow();
      this.toggleSlide();
   }
}
