function Vis2ComparisonOverview(divID)
{
	/*
	 * Private members
	 */
	
	// canvas associated to this view
	var DivElement = window.document.getElementById(divID);
	var CanvasElement = GetCanvasWithinDiv(divID);
		
	var bDivFilled = false;
	
	/*
	 * code executed while construction 
	 */
	
	
	/*
	 * other internal methods
	 */
	
	// attach event handler
	CanvasElement.addEventListener('click', OnClick, false);
	CanvasElement.addEventListener('dblclick', OnDoubleClick, false);
		
	// event handler
	
	function OnDoubleClick(event)
	{
		assert (bDivFilled, "click event called but div never filled");
		
		var nXinCanvas, nYinCanvas;
		
	  	// assert that properties are available
		assert (event.offsetX || event.offsetX == 0, "offsetX / offsetY not supported by this browser");	
		
		// Get the mouse position relative to the canvas element.		  
	    nXinCanvas = event.offsetX;
	    nYinCanvas = event.offsetY;

		// get number of trees
		nNumTrees = window.TreeManager.GetNumTrees();
		assert (nNumTrees > 0, "no trees loaded");
		
		// get height of each rectangle
		nHeight = CanvasElement.height / nNumTrees;
		
		// get height of each rectangle
		nWidth = CanvasElement.width / nNumTrees;
		
		// get selected tree in x direction
    	nSelectedTreeX = Math.floor(nXinCanvas / nWidth);
    	
    	// get selected tree in y direction
    	nSelectedTreeY = Math.floor(nYinCanvas / nHeight);
    	
    	nSelectedTreeReference = nSelectedTreeX,
    	nSelectedTreeToCompare = nSelectedTreeY;
    			
		// set reference tree
    	window.SelectionManager.SetReferenceTree(nSelectedTreeReference);
    	    	
    	// add new tree comparison window
    	var nWindowIndex = window.ViewManager.AddTreeComparisonWindow(nSelectedTreeToCompare);
    	
    	window.SelectionManager.AddTreeToCompare(nSelectedTreeToCompare, nWindowIndex);
	}	
	
	function OnClick(event) 
	{
		assert (bDivFilled, "click event called but div never filled");
		
		var nXinCanvas, nYinCanvas;
		
	  	// assert that properties are available
		assert (event.offsetX || event.offsetX == 0, "offsetX / offsetY not supported by this browser");	
		
		// Get the mouse position relative to the canvas element.		  
	    nXinCanvas = event.offsetX;
	    nYinCanvas = event.offsetY;

		// get number of trees
		nNumTrees = window.TreeManager.GetNumTrees();
		assert (nNumTrees > 0, "no trees loaded");
		
		// get height of each rectangle
		nHeight = CanvasElement.height / nNumTrees;
		
		// get height of each rectangle
		nWidth = CanvasElement.width / nNumTrees;
		
		// get selected tree in x direction
    	nSelectedTreeReference = Math.floor(nXinCanvas / nWidth);
    	    	
    	// set reference tree
    	window.SelectionManager.SetReferenceTree(nSelectedTreeReference);
	}
	
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
		
		// get number of trees
		nNumTrees = window.TreeManager.GetNumTrees();
		assert (nNumTrees > 0, "no trees loaded");
		
		// get height of each rectangle
		nHeight = CanvasElement.height / nNumTrees;
		
		// get height of each rectangle
		nWidth = CanvasElement.width / nNumTrees;
		
		// get index of reference tree
		nReferenceTree = window.SelectionManager.GetReferenceTree();
		
		// get tree index of selected trees
		nCompareTree = window.SelectionManager.GetTreeToCompare();
		
		for (var nIndexX = 0; nIndexX < nNumTrees; nIndexX++)
			for (var nIndexY = 0; nIndexY < nNumTrees; nIndexY++)
			{
				// get measure value
				fMeasure = window.TreeManager.GetComparisonOverviewMeasure(nIndexX, nIndexY);
				
				if (nIndexX == nReferenceTree)
				{
					if (nIndexY == nCompareTree)
					{
						context.fillStyle = "rgb(0, 0, 0)";
						context.fillRect(nIndexX*nWidth, nIndexY*nHeight, nWidth, nHeight);	
					}
					else
					{
					// draw black border
					context.fillStyle = "rgb(100, 100, 100)";
					context.fillRect(nIndexX*nWidth, nIndexY*nHeight, nWidth, nHeight);						
					}
				}
				 
				
				// set color
				context.fillStyle = window.ColorMap.GetColor(fMeasure);
		
				// draw rectangle
				context.fillRect(nIndexX*nWidth+1, nIndexY*nHeight+1, nWidth - 2, nHeight - 2);
			}
			
		bDivFilled = true;
	}
}
