(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['knockout'], factory)
  } else if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory
  } else {
    factory(ko)
  }
})(function(ko) {
  var eventName = 'animationend'
  if (!window.requestAnimationFrame) {
    if (window.webkitRequestAnimationFrame) eventName = 'webkitanimationend'
    if (window.msRequestAnimationFrame) eventName = 'msanimationend'
  }

  ko.bindingHandlers.animation = {
    init: function(element, valueAccessor) {
      var opts = valueAccessor()
          enterClass = opts.enter || opts.class + '-enter',
          exitClass = opts.exit || opts.class + '-exit',
          inital = true

      element.addEventListener(eventName, function() {
        element.classList.remove(enterClass)
        element.classList.remove(exitClass)
      })

      ko.computed(function() {
        var on = !!ko.unwrap(valueAccessor().when)

        if (inital) {
          inital = false
          element.classList.toggle(opts.class, on)
          return
        }

        if (element.classList.contains(opts.class) !== on) {
          element.classList.toggle(opts.class, on)
          if (on) {
            element.classList.add(enterClass)
            element.classList.remove(exitClass)
          } else {
            element.classList.remove(enterClass)
            element.classList.add(exitClass)
          }
        }
        element.classList.toggle(opts.class, on)
      }, null, { disposeWhenNodeIsRemoved: element })
    }
  }
})