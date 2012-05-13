function ComparisonOverview()
{
	/*
	 * Functions for public access
	 */
	this.DrawScreen = M_DrawScreen;
	
	var sTestTreeCompact = '[1;[2;[3;"A"][4;"B"]][5;"C"]][4;[3;"D"][2;[3;[4;"E"][5;"F"]][6;"G"]]]';

	var tree = ParseString(sTestTreeCompact);

	tree.BuildLeafList();

	tree.BuildNeededSpace();

	function M_DrawScreen(paneID)
	{
		Debugger.log("Drawing " + paneID + " Canvas");

		var pane = document.getElementById(paneID);
		canvas = document.getElementById(paneID+"Canvas");
		context = canvas.getContext("2d");

		canvas.width = pane.offsetWidth;
		canvas.height = pane.offsetHeight;
		
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
