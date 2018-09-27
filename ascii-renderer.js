/**
 * Creates an SVG element as a mask and correctly sizes and positions a canvas
 * to render behind it.
 * @author DeoVolenteGames
 * @constructor
 * @param {THREE.WebGLRenderer} renderer Three.js renderer that is already
 * attached to a DOM element.
 * @param {any} options Custom options
 * - charSet - String of characters to cycle through. All white space characters
 *   except for actual spaces are ignored.
 * - color - CSS color, set by default to --ascii-bg-color or black.
 * - fontSize - Font size in pixels (recommend not changing for now).
 * - opacity - Opacity from 0 to 1.
 */
AsciiRenderer = function(renderer, options) {

  if ( ! options ) options = {};
  var charSet = !options[ 'charSet' ] ? '01' : options[ 'charSet' ];
  var color = !options[ 'color' ] ? 'var(--ascii-bg-color,black)' : options[ 'color' ];
  var fontSize = !options[ 'fontSize' ] ? 12 : options[ 'fontSize' ];
  var opacity = !options[ 'opacity' ] ? 1 : options[ 'opacity' ];

  charSet = charSet.replace(/[^\S ]/g, '');

  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Inconsolata&text=01');
  document.head.appendChild(link);

  var style=document.createElement('style');
  style.type='text/css';
  var styleStr = `
  canvas.ascii-canvas {
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
  }`;
  if(style.styleSheet){
      style.styleSheet.cssText=styleStr;
  }else{
      style.appendChild(document.createTextNode(styleStr));
  }
  document.head.appendChild(style);

  var canvas = renderer.domElement;
  canvas.classList += 'ascii-canvas';
  if (canvas.parentNode === null) {
    console.error('THREE.Renderer\'s canvas.parentNode is null. Make to sure' +
                 ' to attach the renderer to a container before initialising' +
                 ' the ascii-renderer.');
    return;
  }

  var svg = document.createElementNS ('http://www.w3.org/2000/svg', 'svg');
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.fontSize = fontSize + 'px';
  svg.style.fontFamily = '"Inconsolata", monospace';
  svg.style.position = 'absolute';
  canvas.parentNode.appendChild(svg);
  this.svg = svg;

  this.setSize = function(width, height) {

    var asciiWidth = Math.floor(width / fontSize * 2);
    var asciiHeight = Math.ceil(height / fontSize);

    // TODO: calculate remainder of width to resize by
    renderer.setSize( asciiWidth, asciiHeight );
    canvas.style.width = asciiWidth * fontSize * 0.5 + 'px';
    canvas.style.height = asciiHeight * fontSize + 'px';

    var i = 0;
    var char;
    var strArray = [];

    strArray.push(`<tspan x="50%" y="${fontSize*0.99}px">`);
    for (var y = 0; y < asciiHeight; y++) {
      for (var x = 0; x < asciiWidth; x++) {
        char = charSet[i++ % charSet.length];
        strArray.push(char !== ' ' ? char : '&nbsp');
      }
      strArray.push(`</tspan><tspan x="50%" dy="${fontSize}px">`);
    }
    strArray.push('</tspan>');

    var id = 'ascii-mask-' + Math.floor(Math.random() * 9999);
    svg.innerHTML = `
      <defs>
        <mask id="${id}" x="0" y="0" width="100%" height="100%" >
          <rect fill="white" x="0" y="0" width="100%" height="100%"></rect>
          <text text-anchor="middle" x="0%" dy="${-fontSize/10}px">` +
          strArray.join('') +
          `</text>
        </mask>
      </defs>
      <rect style="mask:url(#${id});fill:${color};opacity:${opacity};"
            x="0" y="0" width="100%" height="100%"/></rect>`;
  }

  // this.setSize(canvas.width, canvas.height);
}