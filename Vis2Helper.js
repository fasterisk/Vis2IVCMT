function canvasSupport()
{
	return Modernizr.canvas;
}

var Debugger = function()
{
};
Debugger.log = function(message)
{
	try
	{
		console.log(message);
	}
	catch (exception)
	{
		return;
	}
};

function AssertException(message)
{
	this.message = message;
}

AssertException.prototype.toString = function()
{
	return 'AssertException: ' + this.message;
};

function assert(exp, message)
{
	if (!exp)
	{
		alert ("Assertion failed: " + message);
		throw new AssertException(message);
	}
}

function InterpolateColor(color1, color2, value)
{
	var r1 = parseInt(color1.substring(1, 3), 16);
	var r2 = parseInt(color2.substring(1, 3), 16);
	var g1 = parseInt(color1.substring(3, 5), 16);
	var g2 = parseInt(color2.substring(3, 5), 16);
	var b1 = parseInt(color1.substring(5, 7), 16);
	var b2 = parseInt(color2.substring(5, 7), 16);

	var red = Math.round(r1 + ((r2 - r1) * value / 256));
	var green = Math.round(g1 + ((g2 - g1) * value / 256));
	var blue = Math.round(b1 + ((b2 - b1) * value / 256));

	return '#' + ValueToHex(red) + ValueToHex(green) + ValueToHex(blue);
}

function ValueToHex(hexvalue)
{
	var value = parseInt(hexvalue, 10);
	value = Math.max(0, Math.min(value, 255));
	return "0123456789ABCDEF".charAt((value - value % 16) / 16)
			+ "0123456789ABCDEF".charAt(value % 16);
}

function GetCanvasWithinDiv(divID)
{
	// get div
	var div = document.getElementById(divID);
	assert (div != undefined, 'no div with id "' + divID + '" could be found within the document');
	
	// get canvas list
	canvasList = div.getElementsByTagName("canvas");
	assert (canvasList.length != 0, 'no <canvas> elements within <div id="' + divID + '"> could be found');
	assert (canvasList.length == 0 || canvasList.length == 1, 'more than 1 <canvas> elements found within <div id="' + divID + '">');
	
	// get canvas
	canvas = canvasList[0];
	assert(canvas != undefined, "canvas is undefined");
		
	return canvas;
}
