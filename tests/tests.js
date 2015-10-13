describe('knockout css3 animation', function() {
  var testEl, vm, toggle, testSetup = function(bindings, initValue) {
    if (typeof bindings !== 'string') {
      initValue = bindings
      bindings = 'class: "fade", when: toggle'
    }
    testEl = document.createElement('div')
    testEl.className = 'animation'
    testEl.setAttribute('data-bind', 'animation: {' + bindings + '}')
    document.body.appendChild(testEl)

    toggle = ko.observable(initValue)
    ko.applyBindings(vm || { toggle: toggle }, testEl)
  },
  afterAnimation = function(fn, done) {
    var eventName = 'animationend'
    if (!window.requestAnimationFrame) {
      if (window.webkitRequestAnimationFrame) eventName = 'webkitAnimationEnd'
      if (window.msRequestAnimationFrame) eventName = 'msAnimationEnd'
    }

    testEl.addEventListener(eventName, function(e) {
      try {
        fn(e)
        done()
      } catch(e) {
        done(e)
      }
    })
  }

  afterEach(function() {
    testEl && document.body.removeChild(testEl)
    testEl = null
    vm = null
  })

  it('should add the class if when is true', function() {
    testSetup()
    testEl.should.not.have.class('fade')
    toggle(true)
    testEl.should.have.class('fade')
  })

  it('should remove the class when `when` is false', function() {
    testSetup(true)
    testEl.should.have.class('fade')
    toggle(false)
    testEl.should.not.have.class('fade')
  })

  it('should support observables behind properties', function() {
    vm = {}
    toggle = ko.observable()
    Object.defineProperty(vm, 'toggle', {
      get: toggle,
      set: toggle
    })
    testSetup()

    testEl.should.not.have.class('fade')
    vm.toggle = true
    testEl.should.have.class('fade')
  })

  it('should not add an enter or exit class on first render', function() {
    testSetup()
    testEl.should.not.have.class('fade-exit').and.class('fade-enter')
  })

  it('should remove the entering class after the animation is finished', function(done) {
    testSetup()
    afterAnimation(function() {
      testEl.should.not.have.class('fade-enter')
    }, done)
    toggle(true)
    testEl.should.have.class('fade').and.class('fade-enter')
  })

  it('should add an exiting class when the class is about to be removed, and the main class immediately', function() {
    testSetup(true)
    toggle(false)
    testEl.should.not.have.class('fade')
    testEl.should.have.class('fade-exit')
  })

  it('should remove the exiting class after the animation is finished', function(done) {
    testSetup(true)
    afterAnimation(function() {
      testEl.should.not.have.class('fade-exit').and.class('fade')
    }, done)
    toggle(false)
  })

  it('should allow a custom enter and exit classes', function() {
    testSetup('class: "fade", when: toggle, enter: "shazam", exit: "kapow"')
    toggle(true)
    testEl.should.have.class('shazam')
    toggle(false)
    testEl.should.have.class('kapow')
  })
})