class Carousel {
  constructor(p) {
    const settings = {...{containerID: '#carousel', interval: 5000, isPlaying: true, slideID: '.slide'}, ...p};

    this.container = document.querySelector(settings.containerID);
    this.slideItems = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;
  }

  _initProps() {
    this.currentSlide = 0;

    this.SLIDES_COUNT = this.slideItems.length;
    this.CODE_SPACE = 'Space';
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="far fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
  }

  _initControls() {
    let controls = document.createElement('div');
    const PAUSE = `<span id="pause-btn" class="control-pause">
                      <span id="fa-pause-icon">${this.FA_PAUSE}</span>
                      <span id="fa-play-icon">${this.FA_PLAY}</span>
                   </span>`;
    const PREV = `<span id="prev-btn" class="control-prev">${this.FA_PREV}</span>`;
    const NEXT = `<span id="next-btn" class="control-next">${this.FA_NEXT}</span>`;

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;
    this.container.append(controls);
    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.nextBtn = this.container.querySelector('#next-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
    this.pauseIcon = this.container.querySelector('#fa-pause-icon');
    this.playIcon = this.container.querySelector('#fa-play-icon');
    this.isPlaying ? this._pauseVisible() : this._playVisible();
  }

  _initIndicators() {
    let indicators = document.createElement('ol');
    indicators.setAttribute('class', 'indicators');
    for (let i = 0, n = this.SLIDES_COUNT; i < n; i++) {
      let indicator = document.createElement('li');
      indicator.setAttribute('class', i ? 'indicator' : 'indicator active');
      indicator.dataset.slideTo = `${i}`;
      indicators.append(indicator);
    }
    this.container.append(indicators);
    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicatorItems = this.container.querySelectorAll('.indicator');
  }

  _initListeners() {
    document.addEventListener('keydown', this._pressKey.bind(this));
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicateHandler.bind(this));
    this.container.addEventListener('mouseenter', this.pause.bind(this));
    this.container.addEventListener('mouseleave', this.play.bind(this));
  }

  _gotoNth(n) {
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
  }

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  }

  _indicateHandler(e) {
    let target = e.target;

    if (target && target.matches('li.indicator')) {
      this.pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  }

  _pressKey(e) {
    e.preventDefault();
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  _tick() {
    if (!this.isPlaying) return
    if (this.timerID) return
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }

  _pauseVisible(isVisible = true) {
    this.pauseIcon.style.opacity = isVisible ?  1 : 0;
    this.playIcon.style.opacity = isVisible ? 0 : 1;
  }

  _playVisible() {
    this._pauseVisible(false);
  }

  pausePlay() {
    this.isPlaying ? this.pause() : this.play();
  }

  pause() {
    if (!this.isPlaying) return;
    this._playVisible();
    this.isPlaying = false;
    clearInterval(this.timerID);
    this.timerID = null;
  }

play() {
  if (this.isPlaying) return;
  this._pauseVisible();
  this.isPlaying = true;
  this._tick();
}

  next() {
    this.pause();
    this._gotoNext();
  }

  prev() {
    this.pause();
    this._gotoPrev();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick();
  }
}

export default Carousel;