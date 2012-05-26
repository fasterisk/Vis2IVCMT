function Vis2ReferenceTreeView(divID)
{
	/*
	 * Private members
	 */
	
	// canvas associated to this view
	var DivElement = window.document.getElementById(divID);
	var CanvasElement = GetCanvasWithinDiv(divID);

	/*
	 * code executed while construction 
	 */
	
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
		nReferenceTree = window.SelectionManager.GetReferenceTree();
		
		if (nReferenceTree != undefined)
		{
			rTree = window.TreeManager.GetTree(nReferenceTree);
			
			rTree.Draw(context, CanvasElement.width / 2, 10);
		}
	}
}
