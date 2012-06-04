function Vis2ScoreDistributionView(divID) {
	/*
	* PRIVATE
	*/

	//canvas associated to this view
	var DivElement = window.document.getElementById(divID);
	var CanvasElement = GetCanvasWithinDiv(divID);

	// flag to mark if anything is drawed into the canvas
	var m_bDivFilled = false;

	var m_aDiagramInfos = new Array();

	// construction code:
	CanvasElement.addEventListener('dblclick', OnDoubleClick, false);

	// event handler
	function OnDoubleClick(event) {
		assert(m_bDivFilled, "click event called but div never filled");

		var nX = event.offsetX;
		var nY = event.offsetY;
		var nTreeIndex = undefined;

		// go through the stored diagram infos, search a diagram where nX and nY lies between x1/x2 and y1/y2
		for(var i = 0; i < m_aDiagramInfos.length; i++) {
			if(nX >= m_aDiagramInfos[i].x1 && nX <= m_aDiagramInfos[i].x2) {
				if(nY >= m_aDiagramInfos[i].y1 && nY <= m_aDiagramInfos[i].y2) {
					// found the diagram which is under the mouse cursor
					// store tree index
					nTreeIndex = m_aDiagramInfos[i].treeIndex;

					// stop loop, we have found what we want
					break;
				}

			}

		}

		// if a treeindex was found, create new comparison window
		if(nTreeIndex != undefined) {
			// add new tree comparison window
			var nWindowIndex = window.ViewManager.AddTreeComparisonWindow(nTreeIndex);

			// add tree to selection manager
			window.SelectionManager.AddTreeToCompare(nTreeIndex, nWindowIndex);
		}
	}

	/*
	 * PUBLIC
	 */

	this.Update = function() {
		// Set canvas width to div width, also do the height
		CanvasElement.width = DivElement.offsetWidth;
		CanvasElement.height = DivElement.offsetHeight - 10;
		
		// Get context
		var context = CanvasElement.getContext("2d");

		// Get number of trees
		var nNumTrees = window.TreeManager.GetNumTrees();
		assert(nNumTrees > 0, "no trees loaded");

		// calculate necessary number of columns/rows
		// lets say, width = 2*height
		
		var nCols = undefined;
		var nRows = undefined;
		var fDiagramWidth = undefined;
		var fDiagramHeight = undefined;
		
		for (var i=0; i < 10; i+=1)
		{
			// TODO: make better algorithm which sets nCols/nRows in a more dynamic way
			
			nCols = i;
			nRows = i*2;
			
			if (nCols * nRows >= nNumTrees)
				break;
		}
		
		var fPadding = 4;
		
		// so we have the number of cols and rows
		fDiagramWidth = CanvasElement.width / nCols - fPadding - 2;
		fDiagramHeight = CanvasElement.height / nRows - fPadding;
		
		
		//Get the reference tree
		var rReferenceTree = window.SelectionManager.GetReferenceTree();
		if(rReferenceTree == undefined)
			return;

		var nReferenceTree = window.TreeManager.GetIndexOfTree(rReferenceTree);

		var nTreeIndex = 0;

		context.strokeStyle = "rgb(0, 0, 0)";
		context.font = "10px sans-serif";

		// clear diagram infos (for selection)
		m_aDiagramInfos = new Array();

		//Draw the histograms
		for(var i = 0; i < nRows; i++) {
			for(var j = 0; j < nCols; j++) {

				var aScoreDistribution = window.TreeManager.GetScoreDistribution(nReferenceTree, nTreeIndex);
				var fAverage = window.TreeManager.GetAverageScore(nReferenceTree, nTreeIndex);

				var fCellWidth = fDiagramWidth;
				var fCellHeight = fDiagramHeight;

				var currX = j * fCellWidth + fPadding * (j+1);
				var currY = i * fCellHeight + fPadding * (i+1);
				
				
				context.fillStyle = window.ColorMap.GetColor(fAverage);

				//if(nTreeIndex == nReferenceTree)
					//context.fillStyle = "rgb(255, 200, 200)";

				context.strokeRect(currX, currY, fCellWidth, fCellHeight);
				context.fillRect(currX, currY, fCellWidth, fCellHeight);

				context.fillStyle = "rgb(0, 0, 0)";
				context.fillText(nTreeIndex+1, currX, currY + 9);

				for(var k = 0; k < 10; k++) {
					var fBarHeight = fCellHeight * aScoreDistribution[k];
					var fBarWidth = fCellWidth / 10;
					
					context.fillStyle = window.ColorMap.GetColor(k / 10 + 0.05);
					context.fillRect(currX + fBarWidth * k, currY + fCellHeight - fBarHeight, fBarWidth, fBarHeight);
					context.strokeRect(currX + fBarWidth * k, currY + fCellHeight - fBarHeight, fBarWidth, fBarHeight);
				}

				m_aDiagramInfos.push({
					x1 : currX,
					y1 : currY,
					x2 : currX + fCellWidth,
					y2 : currY + fCellHeight,
					treeIndex : nTreeIndex
				});

				nTreeIndex++;
				if(nTreeIndex == nNumTrees)
					return;
			}

			m_bDivFilled = true;
		}
	};
}
