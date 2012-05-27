function Vis2TreeComparisonView(divID)
{
	/*
	 * Private members
	 */
	
	// canvas associated to this view
	var DivElement = window.document.getElementById(divID);
	var CanvasElement = GetCanvasWithinDiv(divID);

	var rTreeVisualizer = undefined;
	
	/*
	 * Private methods
	 * /
	
	/*
	 * Functions for public access
	 */

	this.Update = function ()
	{	
		// set canvas size to div size
		CanvasElement.width = DivElement.offsetWidth;
		CanvasElement.height = DivElement.offsetHeight;
		
		// get context		
		context = CanvasElement.getContext("2d");
		
		// get reference tree		
		nComparisonTree = window.SelectionManager.GetTreeToCompare();
		
		if (nComparisonTree != undefined)
		{
			// get tree object
			rTree = window.TreeManager.GetTree(nComparisonTree);
			
			// create visualizer, if undefined or for wrong tree (selected tree may have changed)
			if (rTreeVisualizer == undefined || rTreeVisualizer.GetNode() != rTree)
			{
				rTreeVisualizer = new Vis2NodeVisualizer(rTree);
			}	
			
			// call visualizer
			rTreeVisualizer.Draw(context, CanvasElement.width/2, 10);
		}
	}
}
