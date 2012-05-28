function Vis2SelectionManager()
{
	var ReferenceTree = undefined;
	var TreeToCompare = undefined;
	
	var TreesToCompare = new Array();
	
	/**
	 * Sets the reference tree for the tree comparison
	 * 
	 * @param {Vis2Node} rTree
	 */
	this.SetReferenceTree = function(rTree)
	{	
		ReferenceTree = rTree;
		
		// update all measures because reference tree has changed
		window.TreeManager.UpdateAllMeasures();
		
		// trigger view update
		window.ViewManager.UpdateViews();
	}
	
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
	}
	
	/**
	 * Gets the reference tree, may also be undefined
	 * 
	 * @return {Vis2Node} The reference tree 
	 */
	this.GetReferenceTree = function()
	{
		return ReferenceTree;
	}
	
	/**
	 * Gets the tree to compare with the reference tree, may also be undefined
	 * 
	 * @return {Vis2Node} The tree 
	 */
	this.GetTreeToCompare = function()
	{
		return 1;
	}
}
