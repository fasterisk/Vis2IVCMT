function Vis2TreeComparisonView(divID, nTreeToCompare) {
	/*
	* Private members
	*/

	// canvas associated to this view
	var DivElement = window.document.getElementById(divID);
	var CanvasElement = GetCanvasWithinDiv(divID);

	var m_nTreeToCompare = nTreeToCompare;

	var rTreeVisualizer = undefined;
	//var m_sMeasureString = 'element';

	/*
	 * Functions for public access
	 */

	this.Update = function() {
		// set canvas size to div size
		CanvasElement.width = DivElement.offsetWidth - 18;
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

			// call visualizer
			rTreeVisualizer.Draw(context, window.TreeManager.GetGlobalMeasure(), CanvasElement.width / 2, 20);
		}
	};
}
