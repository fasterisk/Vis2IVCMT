Debugger.log("Adding Window-Eventlistener");
window.addEventListener('load', eventWindowLoaded, false);
window.viewManager = new ViewManager();

function eventWindowLoaded()
{
	if (!canvasSupport())
	{
		Debugger.log("Canvas is not supported!");
		return;
	}
	window.rightPaneCanvas = new RightPaneCanvas();
	
	var formElement = document.getElementById("measure");
	formElement.addEventListener('change', measureChanged, false);

	formElement = document.getElementById("color1");
	formElement.addEventListener('change', color1Changed, false);

	formElement = document.getElementById("color2");
	formElement.addEventListener('change', color2Changed, false);

	formElement = document.getElementById("MainWindow");
	formElement.addEventListener('mouseup', canvasSizeChanged, false);
}

function measureChanged(e)
{
	Debugger.log("Measure changed.");
	var target = e.target;
	window.viewManager.ChangeMeasure(target.value);
	window.rightPaneCanvas.DrawScreen();
}

function color1Changed(e)
{
	Debugger.log("Color 1 changed.");
	var target = e.target;
	window.viewManager.ChangeColorMap('#' + target.value, window.viewManager.color9);
	window.rightPaneCanvas.DrawScreen();
}
function color2Changed(e)
{
	Debugger.log("Color 2 changed.");
	var target = e.target;
	window.viewManager.ChangeColorMap(window.viewManager.color1, '#' + target.value);
	window.rightPaneCanvas.DrawScreen();
}
function canvasSizeChanged(e)
{
	Debugger.log("Canvas resized");
	window.rightPaneCanvas.DrawScreen();
}
