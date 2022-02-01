import {Slider} from "./modules/Slider.js";

window.addEventListener('load', function() {

   const slider = new Slider('.page__slider');
   slider.init();
   slider.autoPlay(2000)

   // Обновление слайдера при ресайзе
   let windowResizeTime = 0;
   window.addEventListener('resize', function () {
      clearInterval(windowResizeTime);
      let newTime = new Date;

      if (newTime - windowResizeTime > 500) {
         slider.init();
         windowResizeTime = new Date;
      }
   })

   
   let x1 = null;
   let y1 = null;

   

   // Добавляем drag&drop на PC
   slider.sliderLine.addEventListener('mousedown', function (e) {
      slider.sliderLine.style.cursor = 'grabbing';
      e.preventDefault();
      x1 = e.clientX;
      y1 = e.clientY;
   })

   slider.sliderLine.addEventListener('mouseup', function (e) {
      slider.sliderLine.style.cursor = 'grab';
      e.preventDefault();
      let x2 = e.clientX;
      let y2 = e.clientY;
      let xDiff = x1 - x2;
      let yDiff = y1 - y2;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
         xDiff > 0 ? slider.onNavClick(slider.showNext) : slider.onNavClick(slider.showPrev);
      } 
   })


   // Добавляем drag&drop на touch-устройства
   slider.sliderLine.addEventListener('touchstart', function (e) {
      x1 = e.touches[0].clientX;
      y1 = e.touches[0].clientY;
   })

   let touchIntreval = 0;
   slider.sliderLine.addEventListener('touchmove', function (e) {

      const getSwipeDir = (e) => {
         let x2 = e.touches[0].clientX;
         let y2 = e.touches[0].clientY;
         let xDiff = x1 - x2;
         let yDiff = y1 - y2;

         if (Math.abs(xDiff) > Math.abs(yDiff)) {
            xDiff > 0 ? slider.onNavClick(slider.showNext) : slider.onNavClick(slider.showPrev);
         }
      }

      let newTime = new Date;

      if (newTime - touchIntreval > 500) {
         getSwipeDir(e);
         touchIntreval = new Date;
      }
   })
})

