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
	
	window.ComparisonOverview = new ComparisonOverview();
	window.ScoreDistributionView = new ScoreDistributionView();
	window.ReferenceTreeView = new ReferenceTreeView();
	window.TreeComparisonView = new TreeComparisonView();
	
	formElement = document.getElementById("measure");
	formElement.addEventListener('change', measureChanged, false);

	formElement = document.getElementById("color1");
	formElement.addEventListener('change', color1Changed, false);

	formElement = document.getElementById("color2");
	formElement.addEventListener('change', color2Changed, false);

	formElement = document.getElementById("MainWindow");
	formElement.addEventListener('mouseup', canvasSizeChanged, false);
	
	window.ComparisonOverview.DrawScreen("LeftTopPane");
	window.ScoreDistributionView.DrawScreen("LeftMiddlePane");
	window.ReferenceTreeView.DrawScreen("LeftBottomPane");
	window.TreeComparisonView.DrawScreen("RightPane");
}

function measureChanged(e)
{
	Debugger.log("Measure changed.");
	var target = e.target;
	window.viewManager.ChangeMeasure(target.value);
	window.ComparisonOverview.DrawScreen("LeftTopPane");
	window.ScoreDistributionView.DrawScreen("LeftMiddlePane");
	window.ReferenceTreeView.DrawScreen("LeftBottomPane");
	window.TreeComparisonView.DrawScreen("RightPane");
}

function color1Changed(e)
{
	Debugger.log("Color 1 changed.");
	var target = e.target;
	window.viewManager.ChangeColorMap('#' + target.value, window.viewManager.color9);
	window.ComparisonOverview.DrawScreen("LeftTopPane");
	window.ScoreDistributionView.DrawScreen("LeftMiddlePane");
	window.ReferenceTreeView.DrawScreen("LeftBottomPane");
	window.TreeComparisonView.DrawScreen("RightPane");
}
function color2Changed(e)
{
	Debugger.log("Color 2 changed.");
	var target = e.target;
	window.viewManager.ChangeColorMap(window.viewManager.color1, '#' + target.value);
	window.ComparisonOverview.DrawScreen("LeftTopPane");
	window.ScoreDistributionView.DrawScreen("LeftMiddlePane");
	window.ReferenceTreeView.DrawScreen("LeftBottomPane");
	window.TreeComparisonView.DrawScreen("RightPane");
}
function canvasSizeChanged(e)
{
	Debugger.log("Canvas resized");
	window.ComparisonOverview.DrawScreen("LeftTopPane");
	window.ScoreDistributionView.DrawScreen("LeftMiddlePane");
	window.ReferenceTreeView.DrawScreen("LeftBottomPane");
	window.TreeComparisonView.DrawScreen("RightPane");
}
