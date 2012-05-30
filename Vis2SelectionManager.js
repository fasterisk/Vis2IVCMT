function Vis2SelectionManager()
{
	var ReferenceTree = undefined;
	var ReferenceNode = undefined;
	
	var TreesToCompare = new Array();
	
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
		
		// trigger view update
		window.ViewManager.UpdateViews();
	}
	
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
	 * Gets the reference node, may also be undefined
	 * 
	 * @return {Vis2Node} The reference node 
	 */
	this.GetReferenceNode = function()
	{
		return ReferenceNode;
	}
}
