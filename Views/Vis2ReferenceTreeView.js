function Vis2ReferenceTreeView(divID) {
	/*
	* Private members
	*/

	// canvas associated to this view
	var DivElement = window.document.getElementById(divID);
	var CanvasElement = GetCanvasWithinDiv(divID);

	// coordinates of the selection rectangle
	var nSelectionRectangle_X1 = undefined;
	var nSelectionRectangle_X2 = undefined;
	var nSelectionRectangle_Y1 = undefined;
	var nSelectionRectangle_Y2 = undefined;

	var rTreeVisualizer = undefined;

	function ItlUpdate() {
		// set canvas size to div size
		CanvasElement.width = DivElement.offsetWidth;
		CanvasElement.height = DivElement.offsetHeight;

		// get context
		context = CanvasElement.getContext("2d");

		// get reference tree id
		nReferenceTree = window.SelectionManager.GetReferenceTree();

		if(nReferenceTree != undefined) {
			// print legend (tree index)
			context.font = "16px sans-serif";
			context.fillText("Tree " + nReferenceTree.toString(), 0, 25);

			// get tree object
			rTree = window.TreeManager.GetTree(nReferenceTree);

			// create visualizer, if undefined or for wrong tree (selected tree may have changed)
			if(rTreeVisualizer == undefined || rTreeVisualizer.GetNode() != rTree) {
				rTreeVisualizer = new Vis2NodeVisualizer(rTree);
			}

			// call visualizer
			rTreeVisualizer.Draw(context, '', CanvasElement.width / 2, 10);
		}

		if(nSelectionRectangle_X1 != undefined) {
			context.strokeStyle = "rgb(100, 100, 0)";
			context.strokeRect(nSelectionRectangle_X1, nSelectionRectangle_Y1, nSelectionRectangle_X2 - nSelectionRectangle_X1, nSelectionRectangle_Y2 - nSelectionRectangle_Y1);
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
	function OnMouseDown(event) {
		// set starting coordinates
		nSelectionRectangle_X1 = event.offsetX;
		nSelectionRectangle_Y1 = event.offsetY;

		ItlUpdate();
	}

	function OnMouseMove(event) {
		if(nSelectionRectangle_X1 != undefined) {
			// update ending coordinates
			nSelectionRectangle_X2 = event.offsetX;
			nSelectionRectangle_Y2 = event.offsetY;

			ItlUpdate();
		}
	}

	function OnMouseUp(event) {
		// clear coordinates
		nSelectionRectangle_X1 = undefined;
		nSelectionRectangle_X2 = undefined;
		nSelectionRectangle_Y1 = undefined;
		nSelectionRectangle_Y2 = undefined;

		ItlUpdate();
	}

	/*
	 * Functions for public access
	 */

	this.Update = ItlUpdate;
}
