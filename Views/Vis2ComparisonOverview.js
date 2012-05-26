function ComparisonOverview()
{
	/*
	 * Functions for public access
	 */

	this.DrawScreen = function DrawScreen(paneID, rTreeManager)
	{
		var pane = document.getElementById(paneID);
		canvas = document.getElementById(paneID+"Canvas");
		context = canvas.getContext("2d");

		canvas.width = pane.offsetWidth;
		canvas.height = pane.offsetHeight;
		
		context.textFillColor = "#000000";
		context.font = "24px sans-serif";
		context.fillText("ComparisonOverview", 10, 50);
	}
	
	/*
	 * Private members
	 */
}
