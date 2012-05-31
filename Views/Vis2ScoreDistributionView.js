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
		CanvasElement.width = DivElement.offsetWidth-18;
				
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
		CanvasElement.height = nRows*50 + 4*nRows + 4;
		
		//Get the reference tree
		var rReferenceTree = window.SelectionManager.GetReferenceTree();
		if(rReferenceTree == undefined)
			return;
		
		var nReferenceTree = window.TreeManager.GetIndexOfTree(rReferenceTree);
		
		var nTreeIndex = 0;
		
		context.strokeStyle = "rgb(0, 0, 0)";
		context.font = "10px sans-serif";
		
		//Draw the histograms
		for(var i=0; i < nRows; i++){
			for(var j=0; j < nCols; j++){
				
				var aScoreDistribution = window.TreeManager.GetScoreDistribution(nReferenceTree, nTreeIndex);
				
				var currX = j * 100 + 4 * j + 4;
				var currY = i * 50 + 4 * i + 4;
				
				context.fillStyle = "rgb(255, 255, 255)";
				
				if(nTreeIndex == nReferenceTree)
					context.fillStyle = "rgb(255, 200, 200)";
				
				context.strokeRect(currX, currY, 100, 50);
				context.fillRect(currX, currY, 100, 50);
				
				context.fillStyle = "rgb(0, 0, 0)";
				context.fillText(nTreeIndex, currX, currY + 9);
				
				for(var k = 0; k < 10; k++)
				{
					var nBarheight = Math.round(50*aScoreDistribution[k]);
					
					context.fillStyle = window.ColorMap.GetColor(k/10 + 0.05);
					context.fillRect(currX+10*k, currY + 50 - nBarheight, 10, nBarheight);
				}
				
				nTreeIndex++;
				if(nTreeIndex == nNumTrees)
					return;
			}
		}
	};
}
