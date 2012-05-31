/**
 * This method strips the elements of a node and fills rElements and rLeaves
 * 
 * @param {Vis2Node} rNode A Node
 * @param {Array} rElements A array of subarrays with the elements, will be modified in method!
 * @param {Array} rLeaves A array with the name of the leaves, will be modified in method!
 */
function GetElements_Worker(rNode, rElements, rLeaves)
{
	// return name, if this is a leaf
	if (rNode.isleaf == true)
	{
		var bFound = false;
		
		for ( var i = 0; i < rLeaves.length; i++)
		{
			if (rLeaves[i] == rNode.name)
				bFound = true;
		}
		
		if (bFound == false)
			rLeaves.push(rNode.name);	
	}
	else
	{
		// collect leaves under child nodes, if this is not a leaf
		for ( var i = 0; i < rNode.GetChildrenCount(); i++)
		{
			var vLeavesOfChildNode = GetLeaves(rNode.children[i]);
					
			GetElements_Worker(rNode.children[i], rElements, rLeaves);
			
			if (vLeavesOfChildNode.length > 1)
				rElements.push(vLeavesOfChildNode);
		}
	}
}

/**
 * This method strips the elements of a node and returns an array with the leaves and the elements
 * 
 * @param {Vis2Node} rNode A Node
 * @return {Array} The array with the leaves and elements (subarrays)
 */
function GetElements(rNode)
{
	var vElements = new Array();
	var vLeaves = new Array();
	
	// get elements and leaves by (recursive) worker method
	GetElements_Worker(rNode, vElements, vLeaves);
	
	// put them together in 1 array
	for ( var j = 0; j < vElements.length; j++)
				vLeaves.push(vElements[j]);
				
	// return vLeaves, now contains leaves+elements
	return vLeaves;
}

/**
 * This method calculates the element measure for two given nodes
 * 
 * @param {Vis2Node} rNode1 A Node
 * @param {Vis2Node} rNode2 A Node
 * @return {float} Returns a floating value which represents the element measure of the two given nodes
 */
function GetElementMeasure(rNode1, rNode2)
{
	// get elements under node 1
	var vElementsOfNode1 = GetElements(rNode1);

	// get elements under node 2
	var vElementsOfNode2 = GetElements(rNode2);

	var iSameElements = 0;
	var iTotal = vElementsOfNode1.length + vElementsOfNode2.length;

	for ( var i = 0; i < vElementsOfNode1.length; i++)
	{
		var bFound = false;

		for ( var j = 0; j < vElementsOfNode2.length; j++)
		{
			if (typeof(vElementsOfNode2[j]) == 'object' && typeof(vElementsOfNode1[i]) == 'object')
			{
				var vSubArray1 = vElementsOfNode2[j];
				var vSubArray2 = vElementsOfNode1[i];
						
				if (vSubArray1.length == vSubArray2.length)
				{
					var bArraysIdent = true;
					
					for (var k=0; k < vSubArray1.length; k++)
						if (vSubArray1[k] != vSubArray2[k])
							bArraysIdent = false;
							
					if (bArraysIdent)
					{
						bFound = true;
						break;
					}
				}
			}
			else
			if (vElementsOfNode2[j] == vElementsOfNode1[i])
			{
				bFound = true;
				break;
			}
		}

		if (bFound == true)
		{
			iSameElements++;
			iTotal--;
		}
	}

	return (iSameElements / iTotal);
}

/**
 * This method calculates the element measures for the given test tree,
 * tested against the reference tree
 * 
 * @param {Vis2Node} rReferenceTree The reference tree
 * @param {Vis2Node} rTestTree The test tree, will be modified (leaf measure values will be set)
 * @return {Vis2Node} Returns the rTestTree
 */
function Vis2ElementMeasure(rReferenceTree, rTestTree)
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
		var fMaximum = 0;

		for ( var iReferenceNode = 0; iReferenceNode < rNodesTotalReference.length; iReferenceNode++)
		{
			var fMeasure = GetElementMeasure(rNodesTotalReference[iReferenceNode],
					rNodesTotal[iNode]);
			if (fMeasure > fMaximum)
				fMaximum = fMeasure;

		}

		rNodesTotal[iNode].elementmeasure = fMaximum;
	}

	return rTestTree;
	
}