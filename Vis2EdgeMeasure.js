/**
 * This method returns whether the given array contains the given leaf
 * 
 * @param {Array} rArray The array with the names of the leaves
 * @param {Vis2Node} rLeaf The leaf to be tested
 * @return {bool}  
 */
function ArrayContainsLeaf(rArray, rLeaf)
{
	for (var i=0; i < rArray.length; i++)
		if (rArray[i].name == rLeaf.name)
			return true;
	
	return false;
}

/**
 * This method strips the leaves of a node
 * 
 * @param {Vis2Node} rNode A Node
 * @return {Array} Returns array with the objects of all leaves below the given node
 */
function GetLeafNodes(rNode)
{
	var vLeaves = new Array();

	// return name, if this is a leaf
	if (rNode.children.length == 0)
		vLeaves.push(rNode);
	else
	{
		// collect leaves under child nodes, if this is not a leaf
		for ( var i = 0; i < rNode.GetChildrenCount(); i++)
		{
			var vLeavesOfChildNode = GetLeafNodes(rNode.children[i]);

			for ( var j = 0; j < vLeavesOfChildNode.length; j++)
				vLeaves.push(vLeavesOfChildNode[j]);
		}
	}

	return vLeaves;
}

/**
 * This method calculates the edge length down to the leaf, starting from rNode to rLeaf
 * 
 * @param {Vis2Node} rNode The starting node
 * @param {Vis2Node} rLeaf The target leaf
 * @return {float}
 */
function CalcEdgeLengthDownToLeaf(rNode, rLeaf)
{
	var fLength = 0.0;
			
	if (rNode.name != rLeaf.name)
	{
		var bFound = false;

		
		for (var i = 0; i < rNode.GetChildrenCount(); i++)
		{
			if (ArrayContainsLeaf(GetLeafNodes(rNode.children[i]), rLeaf))
			{
				bFound = true;
				
				fLength = rNode.children[i].edgeweight + CalcEdgeLengthDownToLeaf(rNode.children[i], rLeaf);
				
				break; 
			}
			else if ((rNode.children[i].isleaf==true) && (rNode.children[i].name == rLeaf.name))
			{
				bFound = true;
				
				fLength = rNode.children[i].edgeweight;
				
				break; 
			}			
		}

			
		assert(bFound == true, 'rLeaf not found');
	}
	
	return fLength;
}

/**
 * This method calculates the weighted distance between 2 leaves
 * 
 * @param {Vis2Node} Leaf1 The starting leaf
 * @param {Vis2Node} Leaf2 The target leaf
 * @return Returns the weighted distance
 */
function wd(Leaf1, Leaf2)
{
	// start from leaf1, go up until leaf2 is found in CalcLeafList(), 
	// and then go down until Leaf2 is found
	
	var CurrentNode = Leaf1;
	
	// go up
	while (ArrayContainsLeaf(GetLeafNodes(CurrentNode), Leaf2) == false)
	{
		assert((CurrentNode.parent != undefined), 'Both leaves must be in the same tree - but Leaf2 could not be found in highest node (or .parent is wrong)');
		
		CurrentNode = CurrentNode.parent;	
	}
	
	assert(ArrayContainsLeaf(GetLeafNodes(CurrentNode), Leaf1), 'CurrentNode does not contain Leaf1');
	assert(ArrayContainsLeaf(GetLeafNodes(CurrentNode), Leaf2), 'CurrentNode does not contain Leaf2');
	
	var fLengthTo1 = CalcEdgeLengthDownToLeaf(CurrentNode, Leaf1);
	var fLengthTo2 = CalcEdgeLengthDownToLeaf(CurrentNode, Leaf2);
	
	return fLengthTo1 + fLengthTo2;
}

function wd_max(Node1, Node2)
{
	var vLeavesOfNode1 = GetLeafNodes(Node1);
	var vLeavesOfNode2 = GetLeafNodes(Node2);
	
	assert (vLeavesOfNode1.length == vLeavesOfNode2.length, 'Trees must have the same structure');
	
	var fMax = 0.0;
	
	for (var i=0; i < vLeavesOfNode1.length; i++)
		for (var j=0; j < vLeavesOfNode2.length; j++)
			if (i != j)
			{
				var fWD1 = wd(vLeavesOfNode1[i], vLeavesOfNode1[j]);
				var fWD2 = wd(vLeavesOfNode2[i], vLeavesOfNode2[j]);
				
				if (fWD1 > fMax)
					fMax = fWD1;
				if (fWD2 > fMax)
					fMax = fWD2; 	
			}			

	return fMax;	
}

function ed(Node1, Node2)
{
	var vLeavesOfNode1 = GetLeafNodes(Node1);
	var vLeavesOfNode2 = GetLeafNodes(Node2);
	
	assert (vLeavesOfNode1.length == vLeavesOfNode2.length, 'Trees must have the same structure');
	
	var fSquaredSum = 0.0;
	
	for (var i=0; i < vLeavesOfNode1.length; i++)
		for (var j=0; j < vLeavesOfNode2.length; j++)
			if (j > i)
			{
				var fWD1 = wd(vLeavesOfNode1[i], vLeavesOfNode1[j]);
				var fWD2 = wd(vLeavesOfNode2[i], vLeavesOfNode2[j]);
				
				var fDiff = fWD1 - fWD2;
				
				fSquaredSum += fDiff*fDiff;	
			}			

	
	return Math.sqrt(fSquaredSum);
}

function s(Node1, Node2)
{
	var fMax = wd_max(Node1, Node2);
	var fED = ed(Node1, Node2);
	
	var fMeasure = 1.0 - fED / fMax;
	if(fMeasure < 0)
		fMeasure = 0;
	return fMeasure; 
}

function GetEdgeMeasure(Tree1, Tree2)
{
	return s(Tree1, Tree2);
}
