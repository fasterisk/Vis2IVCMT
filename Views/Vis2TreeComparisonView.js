function Vis2TreeComparisonView(divID)
{
	/*
	 * Private members
	 */
	
	// canvas associated to this view
	var DivElement = window.document.getElementById(divID);
	var CanvasElement = GetCanvasWithinDiv(divID);

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
			rTree = window.TreeManager.GetTree(nComparisonTree);
			
			rTree.Draw(context, CanvasElement.width / 2, 10);
		}
	}
}
