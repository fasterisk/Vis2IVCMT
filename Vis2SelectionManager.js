function Vis2SelectionManager()
{
	var ReferenceTree = undefined;
	var ReferenceNode = undefined;
	
	var TreesToCompare = new Array();
	var aTreeSelections = new Array();
	/**
	 * Sets the reference tree for the tree comparison
	 * 
	 * @param {Vis2Node} rTree
	 */
	this.SetReferenceTree = function(rTree)
	{	
		ReferenceTree = rTree;
		
		// also set the reference node, which *MUST* be in the active reference tree (but must not be the root, so SetReferenceNode can be called)	
		ReferenceNode = rTree;
		
		// update all measures because reference tree has changed
		window.TreeManager.UpdateAllMeasures();
		
		// update the average measures of the referencetree
		window.TreeManager.UpdateReferenceTreeAverage();
		
		// trigger view update
		window.ViewManager.UpdateViews();
	};
	
	/**
	 * Sets the reference node for the tree comparison
	 * 
	 * @param {Vis2Node} rNode
	 */
	this.SetReferenceNode = function(rNode)
	{	
		ReferenceNode = rNode;
		
		// update all measures because reference node has changed
		window.TreeManager.UpdateAllMeasures();
		
		// trigger view update
		window.ViewManager.UpdateViews();
	};
	
	/**
	 * Sets the tree to compare with the reference tree
	 * 
	 * @param {Vis2Node} rTree
	 */
	this.AddTreeToCompare = function(nTreeIndex, nWindowIndex)
	{	
		TreesToCompare.push([{tree: nTreeIndex, window: nWindowIndex}]);
		
		// trigger view update
		window.ViewManager.UpdateViews();
	};
	
	/**
	 * Gets the reference tree, may also be undefined
	 * 
	 * @return {Vis2Node} The reference tree 
	 */
	this.GetReferenceTree = function()
	{
		return ReferenceTree;
	};
	
	/**
	 * Gets the reference node, may also be undefined
	 * 
	 * @return {Vis2Node} The reference node 
	 */
	this.GetReferenceNode = function()
	{
		return ReferenceNode;
	};
	
	this.TreeSelectionAdded = function(_nTreeID)
	{
		var bFound = false;
		
		for (var i=0; i < aTreeSelections.length; i++)
		{
			if (aTreeSelections[i].nTreeID == _nTreeID)
				{
					aTreeSelections[i].nSelections ++;
					bFound = true;
				}
		}
		
		if (!bFound)
			aTreeSelections.push({nTreeID: _nTreeID, nSelections: 1});
	}
	
	this.TreeSelectionRemoved = function(_nTreeID)
	{
		var bFound = false;
		
		for (var i=0; i < aTreeSelections.length; i++)
		{
			if (aTreeSelections[i].nTreeID == _nTreeID)
				{
					aTreeSelections[i].nSelections --;
					bFound = true;
				}
		}
		
		assert (bFound, "TreeSelection should be modified, but data not found!");
	}
	
	this.IsTreeSelected = function(_nTreeID)
	{
		var bSelected = false;
				
		for (var i=0; i < aTreeSelections.length; i++)
		{
			if (aTreeSelections[i].nTreeID == _nTreeID && aTreeSelections[i].nSelections > 0)
				{
					bSelected = true;
				}
		}
		
		return bSelected;
	}
}
