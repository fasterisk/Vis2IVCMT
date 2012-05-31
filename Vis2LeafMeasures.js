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

/**
 * This method calculates the leaf measures for the given test tree,
 * tested against the reference tree
 * 
 * @param {Vis2Node} rReferenceTree The reference tree
 * @param {Vis2Node} rTestTree The test tree, will be modified (leaf measure values will be set)
 * @return {Vis2Node} Returns the rTestTree
 */
function Vis2LeafMeasures(rReferenceTree, rTestTree)
{
	var rNodesQueue = new Array();
	var rNodesTotal = new Array();
	var rNodesTotalReference = rReferenceTree.GetNodeList();

	rNodesQueue.push(rTestTree);

	while (rNodesQueue.length > 0)
	{
		var rCurrentNode = rNodesQueue.shift();

		rNodesTotal.push(rCurrentNode);

		for ( var i = 0; i < rCurrentNode.GetChildrenCount(); i++)
		{
			/** @define {Vis2Node} */
			var child = rCurrentNode.children[i];

			if (child.isleaf == false)
				rNodesQueue.push(child);
		}
	}

	for ( var iNode = 0; iNode < rNodesTotal.length; iNode++)
	{
		var iMaximum = 0;

		for ( var iReferenceNode = 0; iReferenceNode < rNodesTotalReference.length; iReferenceNode++)
		{
			var iMeasure = GetLeafMeasure(rNodesTotalReference[iReferenceNode],
					rNodesTotal[iNode]);
			if (iMeasure > iMaximum)
				iMaximum = iMeasure;

		}

		rNodesTotal[iNode].leafmeasure = iMaximum;
	}

	return rTestTree;

}