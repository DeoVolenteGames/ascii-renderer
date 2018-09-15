/*
 * @author zz85 / https://github.com/zz85
 *
 * Ascii generation is based on http://www.nihilogic.dk/labs/jsascii/
 * Maybe more about this later with a blog post at http://lab4games.net/zz85/blog
 *
 * 16 April 2012 - @blurspline
 */

THREE.AsciiEffect = function ( renderer, charSet, options ) {

	// its fun to create one your own!

	charSet = ( charSet === undefined ) ? '0101' : charSet;

	if ( ! options ) options = {};

	// Some ASCII settings

	var bResolution = ! options[ 'resolution' ] ? 0.15 : options[ 'resolution' ]; // Higher for more details
	var iScale = ! options[ 'scale' ] ? 1 : options[ 'scale' ];
	var bColor = ! options[ 'color' ] ? false : options[ 'color' ]; // nice but slows down rendering!
	var bInvert = ! options[ 'invert' ] ? false : options[ 'invert' ]; // black is white, white is black

	var strResolution = 'low';

	var domElement = document.createElement( 'div' );
	domElement.style.cursor = 'default';
	domElement.style.height = '100%';
	domElement.style.width = '100%';

	var oAscii = document.createElement( "table" );
	domElement.appendChild( oAscii );

	var iWidth, iHeight;

	this.setSize = function ( width, height ) {

		iWidth = Math.round( width * fResolution );
		iHeight = Math.round( height * fResolution / 2 );

		oCanvas.width = iWidth;
		oCanvas.height = iHeight;

		renderer.setSize( iWidth, iHeight );

		initAsciiSize();

	};


	this.render = function ( scene, camera ) {

		renderer.render( scene, camera );
		asciifyImage( renderer, oAscii );

	};

	this.domElement = domElement;


	// Throw in ascii library from http://www.nihilogic.dk/labs/jsascii/jsascii.js

	/*
	* jsAscii 0.1
	* Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
	* MIT License [http://www.nihilogic.dk/licenses/mit-license.txt]
	*/

	function initAsciiSize() {
		// oImg = renderer.domElement;

		// if ( oImg.style.backgroundColor ) {
		// 	oAscii.rows[ 0 ].cells[ 0 ].style.backgroundColor = oImg.style.backgroundColor;
		// 	oAscii.rows[ 0 ].cells[ 0 ].style.color = oImg.style.color;
		// }

		oAscii.cellSpacing = 0;
		oAscii.cellPadding = 0;

		var oStyle = oAscii.style;
		oStyle.display = "inline";
		oStyle.width = Math.round( iWidth / fResolution * iScale ) + "px";
		oStyle.height = Math.round( iHeight / fResolution * iScale ) + "px";
		oStyle.whiteSpace = "pre";
		oStyle.margin = "0px";
		oStyle.padding = "0px";
		oStyle.letterSpacing = fLetterSpacing + "px";
		oStyle.fontFamily = strFont;
		oStyle.fontSize = fFontSize + "px";
		oStyle.lineHeight = fLineHeight + "px";
		oStyle.textAlign = "left";
		oStyle.textDecoration = "none";

	}

	var strFont = "courier new, monospace";

	var oCanvas = document.createElement( "canvas" );
	if ( ! oCanvas.getContext ) {

		return;

	}

	// var oCtx = oCanvas.getContext( "2d" );
	// if ( ! oCtx.getImageData ) {
	// 	return;
	// }

	var fResolution = 0.5;

	// switch ( strResolution ) {

	// 	case "low" : 	fResolution = 0.25; break;
	// 	case "medium" : fResolution = 0.5; break;
	// 	case "high" : 	fResolution = 1; break;

	// }

	if ( bResolution ) fResolution = bResolution;

	// Setup dom

	var fFontSize = ( 2 / fResolution ) * iScale;
	var fLineHeight = ( 2 / fResolution ) * iScale;

	// adjust letter-spacing for all combinations of scale and resolution to get it to fit the image width.

	var fLetterSpacing = 0;

	if ( strResolution == "low" ) {

		switch ( iScale ) {
			case 1 : fLetterSpacing = - 1; break;
			case 2 :
			case 3 : fLetterSpacing = - 2.1; break;
			case 4 : fLetterSpacing = - 3.1; break;
			case 5 : fLetterSpacing = - 4.15; break;
		}

	}

	if ( strResolution == "medium" ) {

		switch ( iScale ) {
			case 1 : fLetterSpacing = 0; break;
			case 2 : fLetterSpacing = - 1; break;
			case 3 : fLetterSpacing = - 1.04; break;
			case 4 :
			case 5 : fLetterSpacing = - 2.1; break;
		}

	}

	if ( strResolution == "high" ) {

		switch ( iScale ) {
			case 1 :
			case 2 : fLetterSpacing = 0; break;
			case 3 :
			case 4 :
			case 5 : fLetterSpacing = - 1; break;
		}

	}

	// can't get a span or div to flow like an img element, but a table works?


	// convert img element to ascii

	charArray = "01000110011011110111001000100000010001110110111101100100001000000111001101101111001000000110110001101111011101100110010101100100001000000111010001101000011001010010000001110111011011110111001001101100011001000010000001110100011010000110000101110100001000000110100001100101001000000110011101100001011101100110010100100000011010000110100101110011001000000110111101101110011001010010000001100001011011100110010000100000011011110110111001101100011110010010000001010011011011110110111000101100001000000111010001101000011000010111010000100000011101110110100001101111011001010111011001100101011100100010000001100010011001010110110001101001011001010111011001100101011100110010000001101001011011100010000001101000011010010110110100100000011100110110100001100001011011000110110000100000011011100110111101110100001000000111000001100101011100100110100101110011011010000010000001100010011101010111010000100000011010000110000101110110011001010010000001100101011101000110010101110010011011100110000101101100001000000110110001101001011001100110010100101110"
	var ii = 0;

		var gl = canvasRenderer.context;
		var oImgData = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
		gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, oImgData);

		// Coloring loop starts now

		// console.time('rendering');

		var i = ii;
		ii++;
		ii %= charSet.length;

		for ( var y = iHeight-1; y > 0; y -- ) {

			for ( var x = 0; x < iWidth; x ++ ) {

				var iOffset = ( y * iWidth + x ) * 4;
				var iAlpha = oImgData[ iOffset + 3 ];

				if (iAlpha > 0)
				{
					var iRed = Math.round(oImgData[ iOffset ]).toString(16);
					var iGreen = Math.round(oImgData[ iOffset + 1 ]).toString(16);
					var iBlue = Math.round(oImgData[ iOffset + 2 ]).toString(16);
					var iCharIdx = 0;

					var strThisChar = charSet[i++ % charSet.length]

					if ( strThisChar === undefined  )
					{
						strThisChar = " ";
					}

					strChars.push("<span style='color:#" + iRed + iGreen + iBlue + ";'>" + strThisChar + "</span>");
				}
				else
				{
					strChars.push(" ");
				}

			}
			strChars.push("<br/>");

		}

		oAscii.innerHTML = "<tr><td>" + strChars.join("") + "</td></tr>";

		// console.timeEnd('rendering');

		// return oAscii;
	}
};