function Vis2ReferenceTreeView(divID)
{
	/*
	 * Private members
	 */

	// canvas associated to this view
	var DivElement = window.document.getElementById(divID);
	var CanvasElement = GetCanvasWithinDiv(divID);

	var rTreeVisualizer = undefined;

	var aRenderedNodes = new Array();

	function ItlUpdate()
	{
		// set canvas size to div size
		CanvasElement.width = DivElement.offsetWidth;
		CanvasElement.height = DivElement.offsetHeight - 30;

		// get context
		context = CanvasElement.getContext("2d");

		// get reference tree
		ReferenceTree = window.SelectionManager.GetReferenceTree();

		if (ReferenceTree != undefined)
		{
			// create visualizer, if undefined or for wrong tree (selected tree
			// may have changed)
			if (rTreeVisualizer == undefined
					|| rTreeVisualizer.GetNode() != ReferenceTree)
			{
				rTreeVisualizer = new Vis2NodeVisualizer(ReferenceTree);
			}

			CanvasElement.height = rTreeVisualizer.GetHeightNeeded() + 20;

			// call visualizer
			aRenderedNodes = rTreeVisualizer.Draw(context, window.TreeManager
					.GetGlobalMeasure()
					+ 'average', CanvasElement.width / 2, 20, true);

			Debugger.log("rendered " + aRenderedNodes.length + " nodes");
		}

	}

	/*
	 * code executed while construction
	 */

	// attach event handler
	CanvasElement.addEventListener('mousedown', OnMouseDown, false);
	CanvasElement.addEventListener('mousemove', OnMouseMove, false);
	CanvasElement.addEventListener('mouseup', OnMouseUp, false);

	// event handler
	function OnMouseDown(event)
	{

		// get coordinates
		var nX = event.offsetX;
		var nY = event.offsetY;

		for ( var i = 0; i < aRenderedNodes.length; i++)
		{
			var nDiffX = Math.abs(nX - aRenderedNodes[i].x);
			var nDiffY = Math.abs(nY - aRenderedNodes[i].y);

			var fDiff = Math.sqrt(nDiffX * nDiffX + nDiffY * nDiffY);

			var fNodeRadius = aRenderedNodes[i].radius;

			if (fDiff < fNodeRadius)
			{
				// node selected!

				// set reference node
				window.SelectionManager
						.SetSelectedNode(aRenderedNodes[i].rNode);
			}
		}
	}

	function OnMouseMove(event)
	{
		// do nothing
	}

	function OnMouseUp(event)
	{
		// do nothing
	}

	/*
	 * Functions for public access
	 */

	this.Update = ItlUpdate;
}
