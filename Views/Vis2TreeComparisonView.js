function Vis2TreeComparisonView(divID, nTreeToCompare) {
	/*
	* Private members
	*/

	// canvas associated to this view
	var DivElement = window.document.getElementById(divID);
	var CanvasElement = GetCanvasWithinDiv(divID);

	var m_nTreeToCompare = nTreeToCompare;

	var rTreeVisualizer = undefined;

	var aRenderedNodes = new Array();

	//var m_sMeasureString = 'element';

	CanvasElement.addEventListener('mousedown', OnMouseDown, false);

	function OnMouseDown(event) {

		// get coordinates
		var nX = event.offsetX;
		var nY = event.offsetY;

		for(var i = 0; i < aRenderedNodes.length; i++) {
			var nDiffX = Math.abs(nX - aRenderedNodes[i].x);
			var nDiffY = Math.abs(nY - aRenderedNodes[i].y);

			var fDiff = Math.sqrt(nDiffX * nDiffX + nDiffY * nDiffY);

			var fNodeRadius = aRenderedNodes[i].radius;

			if(fDiff < fNodeRadius) {
				// node selected!

				// set reference node
				aRenderedNodes[i].rNode.bIsCollapsed = !(aRenderedNodes[i].rNode.bIsCollapsed);

				this.Update();
			}
		}
	}

	/*
	 * Functions for public access
	 */

	this.Update = function() {
		// set canvas size to div size
		CanvasElement.width = DivElement.offsetWidth - 28;
		CanvasElement.height = DivElement.offsetHeight - 18;

		// get context
		context = CanvasElement.getContext("2d");

		// get reference tree
		nComparisonTree = m_nTreeToCompare;

		if(nComparisonTree != undefined) {
			// get tree object
			rTree = window.TreeManager.GetTree(nComparisonTree);

			// create visualizer, if undefined or for wrong tree (selected tree may have changed)
			if(rTreeVisualizer == undefined || rTreeVisualizer.GetNode() != rTree) {
				rTreeVisualizer = new Vis2NodeVisualizer(rTree);
			}

			var nSpaceNeeded = (rTreeVisualizer.GetLeftSpaceNeeded() + rTreeVisualizer.GetRightSpaceNeeded()) * 10;
			if(CanvasElement.width < nSpaceNeeded)
				CanvasElement.width = nSpaceNeeded;
			CanvasElement.height = rTreeVisualizer.GetHeightNeeded() + 50;

			// call visualizer
			aRenderedNodes = rTreeVisualizer.Draw(context, window.TreeManager.GetGlobalMeasure(), CanvasElement.width / 2, 20, true);
		}
	};
}
