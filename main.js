(function () {
  const container = document.querySelector('#carousel')
  const slides = Array.from(container.querySelectorAll('.slide'))
  const indicatorsContainer = container.querySelector('#indicators-container')
  const indicatorItems = Array.from(indicatorsContainer.querySelectorAll('.indicator'))
  const pauseBtn = container.querySelector('#pause-btn')
  const prevBtn = container.querySelector('#prev-btn')
  const nextBtn = container.querySelector('#next-btn')

  const SLIDES_COUNT = slides.length
  const CODE_ARROW_LEFT = 'ArrowLeft'
  const CODE_ARROW_RIGHT = 'ArrowRight'
  const CODE_SPACE = 'Space'

  let currentSlide = 0
  let timerId = null
  let isPlaying = true
  let startPosX = null
  let endPosX = null
  const interval = 2000

  const toggleActiveClass = (element, index) => element.classList.toggle('active', index === currentSlide)

  function gotoNth(n) {
    slides.forEach(toggleActiveClass)
    indicatorItems.forEach(toggleActiveClass)
    currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT
    slides.forEach(toggleActiveClass)
    indicatorItems.forEach(toggleActiveClass)
  }

  function gotoPrev() {
    gotoNth(currentSlide - 1)
  }

  function gotoNext() {
    gotoNth(currentSlide + 1)
  }

  function tick() {
    timerId = setInterval(gotoNext, interval)
  }

  function pauseHandler() {
    if (!isPlaying) return
    clearInterval(timerId)
    pauseBtn.innerHTML = 'Play'
    isPlaying = false
  }

  function playHandler() {
    tick()
    pauseBtn.innerHTML = 'Pause'
    isPlaying = true
  }

  const pausePlayHandler = () => (isPlaying ? pauseHandler() : playHandler())

  const prevHandler = () => {
    pauseHandler()
    gotoPrev()
  }

  const nextHandler = () => {
    pauseHandler()
    gotoNext()
  }

  const indicateHandler = (e) => {
    const { target } = e
    if (target && target.classList.contains('indicator')) {
      pauseHandler()
      gotoNth(+target.dataset.slideTo)
    }
  }

  const pressKey = (e) => {
    const { code } = e
    e.preventDefault()
    code === CODE_SPACE ? pausePlayHandler() : (code === CODE_ARROW_LEFT ? prevHandler() : (code === CODE_ARROW_RIGHT ? nextHandler() : null))
  }

  const swipeStart = (e) => {
    startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX
  }

  const swipeEnd = (e) => {
    endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX

    if (endPosX - startPosX > 100) prevHandler()
    if (endPosX - startPosX < -100) nextHandler()
  }

  function initListeners() {
    pauseBtn.addEventListener('click', pausePlayHandler)
    prevBtn.addEventListener('click', prevHandler)
    nextBtn.addEventListener('click', nextHandler)
    indicatorsContainer.addEventListener('click', indicateHandler)
    container.addEventListener('touchstart', swipeStart)
    container.addEventListener('mousedown', swipeStart)
    container.addEventListener('touchend', swipeEnd)
    container.addEventListener('mouseup', swipeEnd)
    document.addEventListener('keydown', pressKey)
  }

  function init() {
    initListeners()
    tick()
  }

  init()
})();