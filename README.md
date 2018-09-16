# ASCII Renderer

Renders a [THREE.js] renderer with a mask on top created from an SVG.

By using an SVG that doesn't update at runtime frame rate is drastically improved over alternative methods such as [the ascii effect example][ascii-effect-eg]. The limitation is that the text or the viewport size can't change often.

Grab `ascii-renderer.js` and set it up according to the example `index.html`.

## TODO: list

1. Toon lighting has issues when viewed from behind. Try a custom lighting model.
1. Fix font size rendering so that any font sizes and canvas size can be used.
1. Add font ratio detection so that any monospace font can be used.
1. Set up [pages](https://pages.github.com/#vanilla-step-1).
1. Add minification.
1. Check out Firefox orbitControls bug.

[three.js]: https://github.com/mrdoob/three.js
[ascii-effect-eg]: https://threejs.org/examples/?q=ascii#canvas_ascii_effect