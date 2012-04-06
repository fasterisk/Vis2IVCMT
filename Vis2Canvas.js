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

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	var views = new Views();

	var formElement = document.getElementById("measure");
	formElement.addEventListener('change', measureChanged, false);

	formElement = document.getElementById("color1");
	formElement.addEventListener('change', color1Changed, false);

	formElement = document.getElementById("color2");
	formElement.addEventListener('change', color2Changed, false);

	var sTestTreeCompact4 = '[1;[2;[3;"A"][4;"B"]][5;"C"]][4;[3;"D"][2;[3;[4;"E"][5;"F"]][6;"G"]]]';
	var sTestTreeCompact5 = '[2;[2;[2;"B"][2;"D"]][2;"C"]][2;[2;"E"][2;[2;[2;"A"][2;"G"]][2;"F"]]]';
	var sTestTreeCompact6 = '[5;[4;[3;"A"][2;"B"]][1;"C"]][2;[3;"D"][4;[5;[4;"E"][3;"F"]][2;"G"]]]';

	var tree1 = ParseString(sTestTreeCompact4);
	var tree2 = ParseString(sTestTreeCompact5);
	var tree3 = ParseString(sTestTreeCompact6);

	tree1.BuildLeafList();
	tree2.BuildLeafList();
	tree3.BuildLeafList();

	tree1.BuildNeededSpace();
	tree2.BuildNeededSpace();
	tree3.BuildNeededSpace();

	drawScreen();

	function drawScreen()
	{
		Debugger.log("Drawing Canvas");

		context.fillStyle = '#aaaaaa';
		context.fillRect(0, 0, 800, 600);

		views.DisplayColorMap(context);

		context.fillStyle = '#000000';
		tree1.Draw(context, 200, 10);
		tree2.Draw(context, 400, 10);
		tree3.Draw(context, 600, 10);

		context.textFillColor = "#000000";
		context.font = "24px sans-serif";
		context.fillText(views.measure, 400, 300);

	}

	function measureChanged(e)
	{
		var target = e.target;
		views.ChangeMeasure(target.value);
		drawScreen();
	}

	function color1Changed(e)
	{
		var target = e.target;
		views.ChangeColorMap('#' + target.value, views.color9);
		drawScreen();
	}
	function color2Changed(e)
	{
		var target = e.target;
		views.ChangeColorMap(views.color1, '#' + target.value);
		drawScreen();
	}
}
