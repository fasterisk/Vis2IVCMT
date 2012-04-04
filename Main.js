Debugger.log("Adding Window-Eventlistener");
window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded()
{
	canvasApp();
}

			
function canvasApp()
{
	if(!canvasSupport())
	{
		Debugger.log("Canvas is not supported!");
		return;
	}
	else
	{
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
	}

	drawScreen();
				
	function drawScreen()
	{
		Debugger.log("Drawing Canvas");
		context.fillStyle = '#aaaaaa';
		context.fillRect(0, 0, 800, 600);
		context.fillStyle = '#000000';
		context.font = '20px _sans';
		context.textBaseline = 'top';
		context.fillText("Canvas!", 0, 0);
	}
}