/*
 * @author DeoVolenteGames | https://github.com/DeoVolenteGames
 *
 * Creates an SVG element as a mask and correctly sizes canvas to render behind it.
 *
 */

AsciiRenderer = function(renderer, options) {

  if ( ! options ) options = {};
  var charSet = !options[ 'charSet' ] ? '01' : options[ 'charSet' ];
  var fontSize = !options[ 'fontSize' ] ? 12 : options[ 'fontSize' ];
  var opacity = !options[ 'opacity' ] ? 1 : options[ 'opacity' ];

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

    var iWidth = Math.round( width / fontSize / 0.5 );
    var iHeight = Math.round( height / fontSize );

    // TODO: calculate remainder of width to resize by
    renderer.setSize( iWidth, iHeight );
    canvas.style.width = width - 1 + 'px';
    canvas.style.height = height + 'px';
    canvas.style.position = 'absolute';

    var i = 0;
    var strArray = [];
    var asciiWidth = Math.floor(width / fontSize * 2);
    var asciiHeight = Math.ceil(height / fontSize);

    strArray.push(`<tspan x="50%" y="${fontSize*0.99}px">`);
    for ( var y = 0; y < asciiHeight; y++ ) {
      for ( var x = 0; x < asciiWidth; x++ ) {
        strArray.push(charSet[i++ % charSet.length]);
      }
      strArray.push(`</tspan><tspan x="50%" dy="${fontSize*0.99}px">`);
    }
    strArray.push('</tspan>');

    svg.innerHTML = `
      <defs>
        <mask id="ascii-mask" x="0" y="0" width="100%" height="100%" >
          <rect fill="white" x="0" y="0" width="100%" height="100%"></rect>
          <text text-anchor="middle" x="0%" dy="${-fontSize/12}px">` +
          strArray.join('') +
          `</text>
        </mask>
      </defs>
      <rect style="mask:url(#ascii-mask);fill:var(--ascii-bg-color,#000);opacity:${opacity};"
            x="0" y="0" width="100%" height="100%"/></rect>`;
  }

  // this.setSize(canvas.width, canvas.height);
}