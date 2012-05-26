function ScoreDistributionView()
{
	/*
	 * Functions for public access
	 */
	this.DrawScreen = M_DrawScreen;
	
	var sTestTreeCompact = '[5;[4;[3;"A"][2;"B"]][1;"C"]][2;[3;"D"][4;[5;[4;"E"][3;"F"]][2;"G"]]]';

	var tree = CreateTreeFromString(sTestTreeCompact);

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
