Debugger.log("Adding Window-Eventlistener");
window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded()
{
	canvasApp();
}

function canvasApp()
{
	if (!canvasSupport())
	{
		Debugger.log("Canvas is not supported!");
		return;
	}
	else
	{
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
	}

	var tree = ParseFile('test');
	tree.BuildNeededSpace();

	drawScreen();

	function drawScreen()
	{
		Debugger.log("Drawing Canvas");
		context.fillStyle = '#aaaaaa';
		context.fillRect(0, 0, 800, 600);
		context.fillStyle = '#000000';
		tree.Draw(context, 400, 10);
	}
}
