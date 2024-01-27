import Carousel from './carousel.js';

class SwipeCarousel extends Carousel {
  constructor(...args) {
    super(...args);
    this.slidesContainer = this.slideItems[0].parentNode;
    this.startPosX = 0;
    this._handleSwipe = this._handleSwipe.bind(this);
  }

  _initListeners() {
    super._initListeners();
    const events = ['touchstart', 'mousedown', 'touchend', 'mouseup'];
    events.forEach(event => this.slidesContainer.addEventListener(event, this._handleSwipe));
  }
  
  _handleSwipe = (e) => {
    const posX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
  
    if (e.type === 'touchstart' || e.type === 'mousedown') {
      this.startPosX = posX;
    } else if (e.type === 'touchend' || e.type === 'mouseup') {
      const distance = posX - this.startPosX;
  
      if (Math.abs(distance) > 100) {
        this[distance > 0 ? 'prev' : 'next']();
      }
    }
  };
}

export default SwipeCarousel;