AsciiRenderer = function(element, texture, options) {

  if ( ! options ) options = {};
  var charSet = !options[ 'charSet' ] ? '01' : options[ 'charSet' ];
  // TODO: Support font sizes other than 12
  var fontSize = !options[ 'fontSize' ] ? 12 : options[ 'fontSize' ];
  var useControls = !options[ 'stats' ] ? false : options[ 'controls' ];
  var useOrthoCam = !options[ 'ortho' ] ? false : options[ 'ortho' ];
  var useStats = !options[ 'stats' ] ? false : options[ 'stats' ];

  var container, stats, canvas;

  var camera, controls, scene, renderer;

  var sphere;

  var start = Date.now();

  init();
  animate();

  function init() {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Inconsolata&text=01');
    document.head.appendChild(link);

    container = document.createElement( 'div' );
    container.style.height = '100%';
    container.style.width = '100%';
    container.style.position = 'relative';
    container.style.fontFamily = '"Inconsolata", monospace';
    element.appendChild( container );

    canvas = document.createElement('canvas');
    canvas.classList += 'ascii-canvas';
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
    container.appendChild( canvas );

    renderer = new THREE.WebGLRenderer( { canvas: canvas, alpha: true } );

    var width = container.clientWidth || 2;
    var height = container.clientWidth || 2;

    if (useOrthoCam) {
      camera = new THREE.OrthographicCamera( width / -2, width / 2, height / 2, height / -2, 1, 1000 );
    }
    else {
      camera = new THREE.PerspectiveCamera( 25, width / height, 1, 1000 );
    }
    camera.position.z = 1000;

    scene = new THREE.Scene();

    var sunlight = new THREE.DirectionalLight( 0xffffff, 1.5 );
    sunlight.position.set( 1, 0, 1 );
    scene.add( sunlight );

    var sphereTex = new THREE.TextureLoader().load(texture);
    sphereTex.magFilter = THREE.NearestFilter;
    sphereTex.minFilter = THREE.NearestFilter;
    var sphereMat = new THREE.MeshToonMaterial({
      map: sphereTex,
      color: 0xffffff,
      shininess: 0,
      reflectivity: 0,
    });

    sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( 200, 20, 10 ), sphereMat );
    scene.add( sphere );

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

    var svg = document.createElementNS ('http://www.w3.org/2000/svg', 'svg');
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.fontSize = fontSize + 'px';
    svg.style.position = 'absolute';
    svg.innerHTML += `
      <defs>
        <mask id="ascii-mask" x="0" y="0" width="100%" height="100%" >
          <rect fill="white" x="0" y="0" width="100%" height="100%"></rect>
          <text text-anchor="middle" x="0%" dy="${-fontSize/12}px">` +
          strArray.join('') +
          `</text>
        </mask>
      </defs>
      <rect style="mask:url(#ascii-mask);fill:var(--ascii-bg-color,#000);opacity:0.7;" x="0" y="0" width="100%" height="100%"/></rect>`;
    container.appendChild(svg);

    // TODO: initialise controls seperately
    if (useControls) {
      controls = new THREE.OrbitControls( camera, svg );
      controls.enablePan = false;
      controls.enableZoom = false;
      // controls.minPolarAngle = Math.PI/2;
      // controls.maxPolarAngle = Math.PI/2;
      controls.update();
    }

    // TODO: initialise controls seperately
    if (useStats) {
      stats = new Stats();
      stats.showPanel( 0 );
      container.appendChild( stats.domElement );
    }

    window.addEventListener( 'resize', onWindowResize, false );
    onWindowResize();
  }

  function onWindowResize() {
    var width = container.clientWidth;
    var height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    var iWidth = Math.round( width / fontSize / 0.5 );
    var iHeight = Math.round( height / fontSize );

    // TODO: calculate remainder of width to resize by
    renderer.setSize( iWidth, iHeight );
    canvas.style.width = width - 1 + 'px';
    canvas.style.height = height + 'px';
    canvas.style.position = 'absolute';
  }

  //

  function animate() {
    requestAnimationFrame( animate );
    if (useStats)
      stats.begin();

    render();

    if (useStats)
      stats.end();
  }

  function render() {
    var timer = Date.now() - start;
    sphere.rotation.y = timer * 0.0002;
    renderer.render( scene, camera );
  }
}