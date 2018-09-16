/*
 * @author zz85 / https://github.com/zz85
 *
 * Ascii generation is based on http://www.nihilogic.dk/labs/jsascii/
 * Maybe more about this later with a blog post at http://lab4games.net/zz85/blog
 *
 * 16 April 2012 - @blurspline
 */

THREE.AsciiEffect = function ( renderer, charSet, options ) {

	if ( ! options ) options = {};

	// Some ASCII settings

	var bResolution = ! options[ 'resolution' ] ? 0.15 : options[ 'resolution' ]; // Higher for more details

	this.setSize = function ( width, height ) {

		// var iWidth = Math.round( width / fResolution * 1.829 ); // / 0.55 );
		var iWidth = Math.round( width / fResolution / 0.5 );
		var iHeight = Math.round( height / fResolution );

    renderer.setSize( iWidth, iHeight );
    renderer.domElement.style.width = width - fResolution / 10 + 'px';
    renderer.domElement.style.height = height + 'px';
	};


	this.render = function ( scene, camera ) {

		renderer.render( scene, camera );

	};

	var fResolution = 1;

	if ( bResolution ) fResolution = bResolution;
};