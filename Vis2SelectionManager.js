function Vis2SelectionManager() {
	var ReferenceTree = undefined;
	var SelectedNode = undefined;

	var TreesToCompare = new Array();
	var aTreeSelections = new Array();

	/**
	 * Sets the reference tree for the tree comparison
	 *
	 * @param {Vis2Node} rTree
	 */
	this.SetReferenceTree = function(rTree) {
		ReferenceTree = rTree;

		// clear selected node
		this.SetSelectedNode(undefined);

		// update all measures because reference tree has changed
		window.TreeManager.UpdateAllMeasures();

		// update the average measures of the referencetree
		window.TreeManager.UpdateReferenceTreeAverage();

		// trigger view update
		window.ViewManager.UpdateViews();
	};

	/**
	 * Sets the tree to compare with the reference tree
	 *
	 * @param {Vis2Node} rTree
	 */
	this.AddTreeToCompare = function(nTreeIndex, nWindowIndex) {
		TreesToCompare.push([{
			tree : nTreeIndex,
			window : nWindowIndex
		}]);

		// trigger view update
		window.ViewManager.UpdateViews();
	};

	/**
	 * Gets the reference tree, may also be undefined
	 *
	 * @return {Vis2Node} The reference tree
	 */
	this.GetReferenceTree = function() {
		return ReferenceTree;
	};

	this.TreeSelectionAdded = function(_nTreeID) {
		var bFound = false;

		for(var i = 0; i < aTreeSelections.length; i++) {
			if(aTreeSelections[i].nTreeID == _nTreeID) {
				aTreeSelections[i].nSelections++;
				bFound = true;
			}
		}

		if(!bFound)
			aTreeSelections.push({
				nTreeID : _nTreeID,
				nSelections : 1
			});
	}

	this.TreeSelectionRemoved = function(_nTreeID) {
		var bFound = false;

		for(var i = 0; i < aTreeSelections.length; i++) {
			if(aTreeSelections[i].nTreeID == _nTreeID) {
				aTreeSelections[i].nSelections--;
				bFound = true;
			}
		}

		assert(bFound, "TreeSelection should be modified, but data not found!");
	}

	this.IsTreeSelected = function(_nTreeID) {
		var bSelected = false;

		for(var i = 0; i < aTreeSelections.length; i++) {
			if(aTreeSelections[i].nTreeID == _nTreeID && aTreeSelections[i].nSelections > 0) {
				bSelected = true;
			}
		}

		return bSelected;
	}

	this.SetSelectedNode = function(rNode) {
		// clear selection
		window.TreeManager.ClearSelectedNodes();

		// set selected node, if it is not the currently active selected node
		if(rNode != SelectedNode) {
			if(rNode != undefined)
				window.TreeManager.SetSelectedNode(rNode);

			SelectedNode = rNode;
		} else// else, only clear selection
		{
			SelectedNode = undefined;
		}

	}

	this.GetSelectedNode = function() {
		return SelectedNode;
	}
}
