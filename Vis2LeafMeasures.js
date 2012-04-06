function GetLeaves(rNode)
{
	var vLeaves = new Array();

	// return name, if this is a leaf
	if (rNode.isleaf == true)
		vLeaves.push(rNode.name);
	else
	{
		// collect leaves under child nodes, if this is not a leaf
		for ( var i = 0; i < rNode.numChildren(); i++)
		{
			var vLeavesOfChildNode = GetLeaves(rNode.children[i]);

			for ( var j = 0; j < vLeavesOfChildNode.length; j++)
				vLeaves.push(vLeavesOfChildNode[j]);
		}
	}

	return vLeaves;
}

function GetLeafMeasure(rNode1, rNode2)
{
	// get leaves under node 1
	vLeavesOfNode1 = GetLeaves(rNode1);

	// get leaves under node 2
	vLeavesOfNode2 = GetLeaves(rNode2);

	var iSameLeaves1To2 = 0;
	var iDifferentLeaves1To2 = 0;
	var iTotalLeaves = 0;

	// count same leaves (for each leave under node1, search the matching under
	// node2)
	// and count different leaves (if a leave under node1 does not have a
	// matching leave under node2)

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
			iSameLeaves1To2++;
		else
			iDifferentLeaves1To2++;
	}

	iTotalLeaves = iSameLeaves1To2 + iDifferentLeaves1To2;

	// now do the same with node2 as reference node and test for matching leaves
	// under node1
	var iSameLeaves2To1 = 0;
	var iDifferentLeaves2To1 = 0;

	for ( var i = 0; i < vLeavesOfNode2.length; i++)
	{
		var bFound = false;

		for ( var j = 0; j < vLeavesOfNode1.length; j++)
		{
			if (vLeavesOfNode1[j] == vLeavesOfNode2[i])
			{
				bFound = true;
				break;
			}
		}

		if (bFound == true)
			iSameLeaves2To1++;
		else
			iDifferentLeaves2To1++;

	}

	// sum up the results

	iTotalLeaves += iSameLeaves2To1 + iDifferentLeaves2To1;

	// return leaf-based measure
	return (iSameLeaves1To2 + iSameLeaves2To1) / iTotalLeaves;
}

// / returns the leaf-based measure from 2 different nodes
function Vis2LeafMeasures(rNode1, rNode2)
{
	return GetLeafMeasure(rNode1, rNode2);
}