function Vis2ComparisonOverview(divID) {
	/*
	* Private members
	*/

	// canvas associated to this view
	var DivElement = window.document.getElementById(divID);
	var CanvasElement = GetCanvasWithinDiv(divID);

	var bDivFilled = false;

	var m_nHoveredReferenceTree = undefined;
	
	/*
	* code executed while construction
	*/

	/*
	* other internal methods
	*/

	// attach event handler
	CanvasElement.addEventListener('click', OnClick, false);
	CanvasElement.addEventListener('mousemove', OnMouseOver, false);

	function OnClick(event) {
		assert(bDivFilled, "click event called but div never filled");

		var nXinCanvas, nYinCanvas;

		// assert that properties are available
		assert(event.offsetX || event.offsetX == 0, "offsetX / offsetY not supported by this browser");

		// Get the mouse position relative to the canvas element.
		nXinCanvas = event.offsetX;
		nYinCanvas = event.offsetY;

		// get number of trees
		nNumTrees = window.TreeManager.GetNumTrees();
		assert(nNumTrees > 0, "no trees loaded");

		// get height of each rectangle
		nHeight = CanvasElement.height / (nNumTrees + 1);

		// get width of each rectangle
		nWidth = CanvasElement.width / (nNumTrees + 1);

		// get selected tree in x direction
		nSelectedTreeReference = Math.floor(nXinCanvas / nWidth) - 1;

		// get tree
		rTreeObject = window.TreeManager.GetTree(nSelectedTreeReference);

		// set reference tree
		window.SelectionManager.SetReferenceTree(rTreeObject);
	}
	
	function OnMouseOver(event) {
		window.ViewManager.ComparisonOverview.Update();
		
		assert(bDivFilled, "mouseover-event called but div never filled");
		
		var nXinCanvas, nYinCanvas;

		// assert that properties are available
		assert(event.offsetX || event.offsetX == 0, "offsetX / offsetY not supported by this browser");

		// Get the mouse position relative to the canvas element.
		nXinCanvas = event.offsetX;
		nYinCanvas = event.offsetY;
		
		// get number of trees
		nNumTrees = window.TreeManager.GetNumTrees();
		assert(nNumTrees > 0, "no trees loaded");

		// get height of each rectangle
		nHeight = (CanvasElement.height - 10) / (nNumTrees + 1);

		// get width of each rectangle
		nWidth = (CanvasElement.width - 10) / (nNumTrees + 1);
		
		// get tree in x direction
		nTree1 = Math.floor(nXinCanvas / nWidth) - 1;
		
		// get tree inY direction
		nTree2 = Math.floor(nYinCanvas / nHeight) - 1;
		
		// set hovered reference tree
		m_nHoveredReferenceTree = nTree1+1;
		
		if(nTree1 < 0 || nTree2 < 0 || nTree1 >= nNumTrees || nTree2 >= nNumTrees)
		{	
			m_nHoveredReferenceTree = undefined;
			return;
		}
					
		// get measure value
		fMeasure = window.TreeManager.GetComparisonOverviewMeasure(nTree1, nTree2);
		
		// get context
		context = CanvasElement.getContext("2d");
		
		context.fillStyle = '#ff0';
		context.strokeStyle = '#000';
		context.fillRect(nXinCanvas - 30, nYinCanvas - 15, 30, 20);
		context.strokeRect(nXinCanvas - 30, nYinCanvas - 15, 30, 20);
		context.font = "10px sans-serif";
	    context.fillStyle = '#000';
	    context.fillText(fMeasure.toPrecision(2), nXinCanvas - 25, nYinCanvas - 2, 60);	    
	    
	}

	/*
	 * Functions for public access
	 */

	this.Update = function() {
		// set canvas size to div size
		CanvasElement.width = DivElement.offsetWidth;
		CanvasElement.height = DivElement.offsetHeight - 20;

		// get context
		context = CanvasElement.getContext("2d");

		// get number of trees
		nNumTrees = window.TreeManager.GetNumTrees();
		assert(nNumTrees > 0, "no trees loaded");

		// get height of each rectangle
		nHeight = (CanvasElement.height - 10) / (nNumTrees + 1);

		// get height of each rectangle
		nWidth = (CanvasElement.width - 10) / (nNumTrees + 1);

		// get index of reference tree
		nReferenceTree = window.TreeManager.GetIndexOfTree(window.SelectionManager.GetReferenceTree()) + 1;

		for(var nIndexX = 0; nIndexX <= nNumTrees; nIndexX++)
			for(var nIndexY = 0; nIndexY <= nNumTrees; nIndexY++) {
				if(nIndexX == 0 && nIndexY == 0) {
					// do nothing
				} else if(nIndexY == 0) {
					// write legend
					context.fillStyle = "rgb(0, 0, 0)";
					context.fillText((nIndexX).toString(), nIndexX * nWidth, 10);
				} else if(nIndexX == 0) {
					// write legend
					context.fillStyle = "rgb(0, 0, 0)";
					context.fillText((nIndexY).toString(), 0, nIndexY * nHeight + 10);
				} else {
					// get measure value
					fMeasure = window.TreeManager.GetComparisonOverviewMeasure(nIndexX - 1, nIndexY - 1);

					if (window.SelectionManager.IsTreeSelected(nIndexY-1))
					{
						context.fillStyle = "rgb(255, 0, 0)";
						context.fillRect(nIndexX * nWidth, nIndexY * nHeight, nWidth, nHeight);
					}
					
					if(nIndexX == m_nHoveredReferenceTree) {
							// draw black border
							context.fillStyle = "rgb(100, 100, 100)";
							context.fillRect(nIndexX * nWidth, nIndexY * nHeight, nWidth, nHeight);
					}
					
					if(nIndexX == nReferenceTree) {
							// draw black border
							context.fillStyle = "rgb(0, 0, 0)";
							context.fillRect(nIndexX * nWidth, nIndexY * nHeight, nWidth, nHeight);
					}
					

					

					// set color
					context.fillStyle = window.ColorMap.GetColor(fMeasure);

					// draw rectangle
					context.fillRect(nIndexX * nWidth + 1, nIndexY * nHeight + 1, nWidth - 2, nHeight - 2);
				}
			}

		bDivFilled = true;
	}
}
