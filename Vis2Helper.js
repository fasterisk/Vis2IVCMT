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
		throw new AssertException(message);
	}
}