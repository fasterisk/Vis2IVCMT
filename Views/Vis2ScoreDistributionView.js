function Vis2ScoreDistributionView(divID)
{
	/*
	 * PRIVATE
	 */
	
	//canvas associated to this view
	var DivElement = window.document.getElementById(divID);
	var CanvasElement = GetCanvasWithinDiv(divID);
	
	var bDivFilled = false;
	
	
	// TODO: 
	// create event handler for double-click (selecting a tree and open a little window)
	
	
	/*
	 * PUBLIC
	 */
	
	this.Update = function() {
		
		// Set canvas width to div width (height is set later)
		// -20 for the scrollbar
		CanvasElement.width = DivElement.offsetWidth-20;
				
		// Get context
		var context = CanvasElement.getContext("2d");
		
		// Get number of trees
		var nNumTrees = window.TreeManager.GetNumTrees();
		assert(nNumTrees > 0, "no trees loaded");
		
		// Get rows & cols
		var nCols = Math.floor(CanvasElement.width / 100);
		var nRows = 0;
		while(nRows*nCols < nNumTrees) {
			nRows++;
		}
		assert(nRows*nCols >= nNumTrees, "Not enough rows and cols for histogram view");
		
		// Set canvas height according to nRows
		CanvasElement.height = nRows*50 + nRows;
		
		//Draw the histograms
		for(var i=0; i < nRows; i++){
			for(var j=0; j < nCols; j++){
				context.fillStyle = "rgb(100, 0, 0)";
				context.fillRect(j * 100 + j, i * 50 + i, 100, 50);
			}
		}
	};
}
