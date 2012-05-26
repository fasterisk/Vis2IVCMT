function ReferenceTreeView()
{
	/*
	 * Functions for public access
	 */
	this.DrawScreen = M_DrawScreen;
	
	var sTestTreeCompact = '[1;[2;[1;"A"][1;"B"]][2;[1;"C"][1;"D"]][2;[1;"E"][1;"F"]]][3;"G"]';

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
