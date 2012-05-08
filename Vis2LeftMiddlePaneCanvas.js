function LeftMiddlePaneCanvas()
{
	canvas = document.getElementById("LeftMiddlePaneCanvas");
	context = canvas.getContext("2d");
	
	leftMiddlePane = document.getElementById("LeftMiddlePane");
	
	/*
	 * Functions for public access
	 */
	this.DrawScreen = M_DrawScreen;
	
	var sTestTreeCompact = '[5;[4;[3;"A"][2;"B"]][1;"C"]][2;[3;"D"][4;[5;[4;"E"][3;"F"]][2;"G"]]]';

	var tree = ParseString(sTestTreeCompact);

	tree.BuildLeafList();
	tree.BuildNeededSpace();

	M_DrawScreen();

	function M_DrawScreen()
	{
		Debugger.log("Drawing RightPaneCanvas");

		canvas = document.getElementById("LeftMiddlePaneCanvas");
		context = canvas.getContext("2d");
		
		canvas.width = leftMiddlePane.offsetWidth;
		canvas.height = leftMiddlePane.offsetHeight;
		
		context.fillStyle = '#aaaaaa';
		context.fillRect(0, 0, canvas.width, canvas.height);

		window.viewManager.DisplayColorMap(context);

		context.fillStyle = '#000000';
		tree.Draw(context, 200, 10);

		context.textFillColor = "#000000";
		context.font = "24px sans-serif";
		context.fillText(window.viewManager.measure, 10, 50);
	}
}
