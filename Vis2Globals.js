Debugger.log("Adding Window-Eventlistener");
window.addEventListener('load', eventWindowLoaded, false);
window.addEventListener('resize', canvasSizeChanged, false);
window.viewManager = new ViewManager();
var formElement;


function eventWindowLoaded()
{
	if (!canvasSupport())
	{
		Debugger.log("Canvas is not supported!");
		return;
	}
	
	window.leftTopPaneCanvas = new LeftTopPaneCanvas();
	window.rightPaneCanvas = new RightPaneCanvas();
	window.leftMiddlePaneCanvas = new LeftMiddlePaneCanvas();
	window.leftBottomPaneCanvas = new LeftBottomPaneCanvas();
	
	formElement = document.getElementById("measure");
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
	window.leftTopPaneCanvas.DrawScreen();
	window.leftMiddlePaneCanvas.DrawScreen();
	window.leftBottomPaneCanvas.DrawScreen();
	window.rightPaneCanvas.DrawScreen();
}

function color1Changed(e)
{
	Debugger.log("Color 1 changed.");
	var target = e.target;
	window.viewManager.ChangeColorMap('#' + target.value, window.viewManager.color9);
	window.leftTopPaneCanvas.DrawScreen();
	window.leftMiddlePaneCanvas.DrawScreen();
	window.leftBottomPaneCanvas.DrawScreen();
	window.rightPaneCanvas.DrawScreen();
}
function color2Changed(e)
{
	Debugger.log("Color 2 changed.");
	var target = e.target;
	window.viewManager.ChangeColorMap(window.viewManager.color1, '#' + target.value);
	window.leftTopPaneCanvas.DrawScreen();
	window.leftMiddlePaneCanvas.DrawScreen();
	window.leftBottomPaneCanvas.DrawScreen();
	window.rightPaneCanvas.DrawScreen();
}
function canvasSizeChanged(e)
{
	Debugger.log("Canvas resized");
	window.leftTopPaneCanvas.DrawScreen();
	window.leftMiddlePaneCanvas.DrawScreen();
	window.leftBottomPaneCanvas.DrawScreen();
	window.rightPaneCanvas.DrawScreen();
}
