var container, stats;

			var camera, controls, scene, renderer;
			var effect;

			var sphere, plane;

			var start = Date.now();

			init();
			animate();

			function init() {
				container = document.createElement( 'div' );
				container.style.height = '100%';
				document.body.appendChild( container );

				var width = container.clientWidth || 2;
				var height = container.clientWidth || 2;

				camera = new THREE.PerspectiveCamera( 25, width / height, 1, 1000 );
				// camera.position.y = 150;
				camera.position.z = 1000;

				// controls = new THREE.TrackballControls( camera );

				scene = new THREE.Scene();
				// scene.background = new THREE.Color( 0xffffff );

				var sunlight = new THREE.DirectionalLight( 0xffffff, 6 );
				sunlight.position.set( 1, 0, 1 );
				scene.add( sunlight );
				// var light = new THREE.AmbientLight( 0x404040 );
				// scene.add( light );

				var material = new THREE.MeshToonMaterial({
					color: 0x444444,
					shininess: 0,
					reflectivity: 0,
				});
				material.map = new THREE.TextureLoader().load('earth.jpg');
				sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( 200, 20, 10 ), material );
				scene.add( sphere );

				renderer = new THREE.WebGLRenderer( { alpha: true } );
				renderer.setSize( width, height );
				// container.appendChild( renderer.domElement );

				var options = {
					resolution: 0.2,
					color: true,
					// block: true
				}

				effect = new THREE.AsciiEffect( renderer, '0', options );
				effect.setSize( width, height );
				container.appendChild( effect.domElement );

				stats = new Stats();
				stats.showPanel( 0 );
        stats.domElement.style.position = 'fixed';
        stats.domElement.style.top = '0';
        container.appendChild( stats.domElement );

				//

				window.addEventListener( 'resize', onWindowResize, false );
				onWindowResize();
			}

			function onWindowResize() {

				camera.aspect = container.clientWidth / container.clientHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( container.clientWidth, container.clientHeight );
				effect.setSize( container.clientWidth, container.clientHeight );

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

				// sphere.position.y = Math.abs( Math.sin( timer * 0.002 ) ) * 150;
				// sphere.rotation.x = timer * 0.0003;
				sphere.rotation.y = timer * 0.0002;

				// controls.update();

				effect.render( scene, camera );

			}