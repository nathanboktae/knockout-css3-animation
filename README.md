## knockout-css3-animation

### A Knockout binding for easily animating elements via CSS3 animations

[![Build Status](https://secure.travis-ci.org/nathanboktae/knockout-css3-animation.png)](http://travis-ci.org/nathanboktae/knockout-css3-animation)

[![SauceLabs Test Status](https://saucelabs.com/browser-matrix/knockout-css3-animation.svg)](https://saucelabs.com/u/knockout-css3-animation)

### Options

- `class`: The class name to toggle on and off. This will be immediately toggled on and off, so you likely will want to have some similar styles between your `exit` class and the main class.
- `when`: Some truthy/falsy condition that determines if the `class` is on or off. Can be an observable or any expression with observables behind it.
- `enter`: (optional) Class to set when entering. Defaults to `${class}-enter`
- `exit`: (optional) Class to set when exiting. Defaults to `${class}-exit`

### Installation

via bower

```
bower install knockout-css3-animation
```

or via npm

```
npm install knockout-css3-animation
```