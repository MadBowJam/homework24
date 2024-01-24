import Carousel from './carousel.js';

class SwipeCarousel extends Carousel {
  constructor(...args) {
    super(...args);
    this.slidesContainer = this.slideItems[0].parentElement;
    this.container.addEventListener('touchstart', (e) => this._swipe(e, 'start'));
    this.slidesContainer.addEventListener('mousedown', (e) => this._swipe(e, 'start'));
    this.container.addEventListener('touchend', (e) => this._swipe(e, 'end'));
    this.slidesContainer.addEventListener('mouseup', (e) => this._swipe(e, 'end'));
  }

  _swipe(e, phase) {
    const posX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;

    if (phase === 'start') {
      this.startPosX = posX;
    } else if (phase === 'end') {
      this.endPosX = posX;
      const diff = this.endPosX - this.startPosX;

      if (Math.abs(diff) > 100) {
        diff > 0 ? this.prev() : this.next();
      }
    }
  }
}

export default SwipeCarousel;