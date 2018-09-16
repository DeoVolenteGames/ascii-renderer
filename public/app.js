var container, stats;

var camera, controls, scene, renderer;
var effect;
var resolution;

var sphere, plane;

var start = Date.now();

init();
animate();

function init() {
  container = document.createElement( 'div' );
  container.style.height = '100%';
  container.style.width = '100%';
  container.style.position = 'absolute';
  document.body.insertBefore(container, document.body.firstChild);
  // document.body.appendChild( container );

  var width = container.clientWidth || 2;
  var height = container.clientWidth || 2;

  // camera = new THREE.PerspectiveCamera( 25, width / height, 1, 1000 );
  camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
  camera.position.z = 1000;

  scene = new THREE.Scene();

  var sunlight = new THREE.DirectionalLight( 0xffffff, 6 );
  sunlight.position.set( 1, 0, 1 );
  scene.add( sunlight );

  var material = new THREE.MeshToonMaterial({
    color: 0x444444,
    shininess: 0,
    reflectivity: 0,
  });
  material.map = new THREE.TextureLoader().load('earth.jpg');
  material.map.magFilter = THREE.NearestFilter;
  material.map.minFilter = THREE.NearestFilter;
  sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( 200, 20, 10 ), material );
  scene.add( sphere );

  renderer = new THREE.WebGLRenderer( { alpha: true } );

  resolution = 12;

  var str = '01000110011011110111001000100000010001110110111101100100001000000111001101101111001000000110110001101111011101100110010101100100001000000111010001101000011001010010000001110111011011110111001001101100011001000010000001110100011010000110000101110100001000000110100001100101001000000110011101100001011101100110010100100000011010000110100101110011001000000110111101101110011001010010000001100001011011100110010000100000011011110110111001101100011110010010000001010011011011110110111000101100001000000111010001101000011000010111010000100000011101110110100001101111011001010111011001100101011100100010000001100010011001010110110001101001011001010111011001100101011100110010000001101001011011100010000001101000011010010110110100100000011100110110100001100001011011000110110000100000011011100110111101110100001000000111000001100101011100100110100101110011011010000010000001100010011101010111010000100000011010000110000101110110011001010010000001100101011101000110010101110010011011100110000101101100001000000110110001101001011001100110010100100000';

  container.appendChild( renderer.domElement );
  console.log(renderer.domElement);

  stats = new Stats();
  stats.showPanel( 0 );
  stats.domElement.style.position = 'fixed';
  stats.domElement.style.top = '0';
  // container.appendChild( stats.domElement );
  document.body.appendChild( stats.domElement );

  window.addEventListener( 'resize', onWindowResize, false );
  onWindowResize();
}


function onWindowResize() {

  var width = container.clientWidth;
  var height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  var iWidth = Math.round( width / resolution / 0.5 );
  var iHeight = Math.round( height / resolution );

  renderer.setSize( iWidth, iHeight );
  renderer.domElement.style.width = width - resolution / 10 + 'px';
  renderer.domElement.style.height = height + 'px';

}

//

function animate() {
  requestAnimationFrame( animate );

  stats.begin();
  render();
  stats.end();
}

function render() {
  var timer = Date.now() - start;
  sphere.rotation.y = timer * 0.0002;
  renderer.render( scene, camera );
}
