/**
 * This method strips the leaves of a node
 * 
 * @param {Vis2Node} rNode A Node
 * @return {Array} Returns array with the name of all leaves below the given node
 */
function GetLeaves(rNode)
{
	var vLeaves = new Array();

	// return name, if this is a leaf
	if (rNode.isleaf == true)
		vLeaves.push(rNode.name);
	else
	{
		// collect leaves under child nodes, if this is not a leaf
		for ( var i = 0; i < rNode.GetChildrenCount(); i++)
		{
			var vLeavesOfChildNode = GetLeaves(rNode.children[i]);

			for ( var j = 0; j < vLeavesOfChildNode.length; j++)
				vLeaves.push(vLeavesOfChildNode[j]);
		}
	}

	return vLeaves;
}

/**
 * This method calculates the leaf measure for two given nodes
 * 
 * @param {Vis2Node} rNode1 A Node
 * @param {Vis2Node} rNode2 A Node
 * @return {float} Returns a floating value which represents the leaf measure of the two given nodes
 */
function GetLeafMeasure(rNode1, rNode2)
{
	// get leaves under node 1
	vLeavesOfNode1 = GetLeaves(rNode1);

	// get leaves under node 2
	vLeavesOfNode2 = GetLeaves(rNode2);

	var iSameLeaves = 0;
	var iTotal = vLeavesOfNode1.length + vLeavesOfNode2.length;

	for ( var i = 0; i < vLeavesOfNode1.length; i++)
	{
		var bFound = false;

		for ( var j = 0; j < vLeavesOfNode2.length; j++)
		{
			if (vLeavesOfNode2[j] == vLeavesOfNode1[i])
			{
				bFound = true;
				break;
			}
		}

		if (bFound == true)
		{
			iSameLeaves++;
			iTotal--;
		}
	}

	return (iSameLeaves / iTotal);
}

function GetBestMatchingLeafMeasure(rReferenceNode, rTestTree)
{
	var aTestTreeNodes = rTestTree.GetNodeList();
	var fMaximum = 0;
	
	for(var i = 0; i < aTestTreeNodes.length; i++)
	{
		var fMeasure = GetLeafMeasure(rReferenceNode, aTestTreeNodes[i]);
		if(fMeasure > fMaximum)
			fMaximum = fMeasure;
	}
	
	return fMaximum;
}

/**
 * This method calculates the leaf measures for the given test tree,
 * tested against the reference tree
 * 
 * @param {Vis2Node} rReferenceTree The reference tree
 * @param {Vis2Node} rTestTree The test tree, will be modified (leaf measure values will be set)
 * @return {Vis2Node} Returns the rTestTree
 */
function Vis2LeafMeasure(rReferenceTree, rTestTree)
{
	var rNodesTestTree = rTestTree.GetNodeList();
	var rNodesReferenceTree = rReferenceTree.GetNodeList();

	for ( var iNode = 0; iNode < rNodesTestTree.length; iNode++)
	{
		var iMaximum = 0;

		for ( var iReferenceNode = 0; iReferenceNode < rNodesReferenceTree.length; iReferenceNode++)
		{
			var iMeasure = GetLeafMeasure(rNodesReferenceTree[iReferenceNode],	rNodesTestTree[iNode]);
			if (iMeasure > iMaximum)
				iMaximum = iMeasure;

		}

		rNodesTestTree[iNode].leafmeasure = iMaximum;
	}

	return rTestTree;

}

function GetLeafMeasureOverview(rReferenceTree, rTestTree)
{
	var aReferenceTreeNodes = rReferenceTree.GetNodeList();
	var aTestTreeNodes = rTestTree.GetNodeList();
	
	var fAverage = 0;
	
	for(var i = 0; i < aTestTreeNodes.length; i++)
	{
		var iMaximum = 0;
		for(var j = 0; j < aReferenceTreeNodes.length; j++)
		{
			var iMeasure = GetLeafMeasure(aTestTreeNodes[i], aReferenceTreeNodes[j]);
			if(iMeasure > iMaximum)
				iMaximum = iMeasure;
		}
		fAverage += iMaximum;
	}
	
	fAverage /= aTestTreeNodes.length;
	
	return fAverage;
}