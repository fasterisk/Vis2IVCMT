var currId = 0;

function ItlParseString(sSubString)
{
	// TODO: handling wrong formated input

	// debug how this method is called
	// Debugger.log("ParseString('" + sSubString + "')");

	// create new node
	var rNewNode = new Vis2Node();
	rNewNode.id = currId;
	currId++;

	// get positions of first bracket or '"'
	var iPosOfFirstBracket = sSubString.indexOf("[");
	var iPosOfFirstHochKomma = sSubString.indexOf('"');

	// determinate if it is maybe a node, or a leaf
	bMaybeNode = (iPosOfFirstBracket != -1);
	bMaybeLeaf = (iPosOfFirstHochKomma != -1);

	if (bMaybeNode == true)
	{
		// Debugger.log("is node");
		rNewNode.isleaf = false;

		var iStartPos = iPosOfFirstBracket;
		var iBrackets = 0;

		// process string. for each [, increment iBrackets, for each ],
		// decrement - if iBrackets==0,
		// a substring containing a child node is found
		for ( var i = iStartPos; i < sSubString.length; i++)
		{
			if (sSubString.charAt(i) == "[")
				iBrackets++;
			if (sSubString.charAt(i) == "]")
				iBrackets--;

			// must not happen
			assert(iBrackets >= 0,
					'Too many closing brackets, wrong input string?');

			if (iBrackets == 0)
			{
				// get pos of semikolon
				var iPosOfSemikolon = sSubString.indexOf(';', iStartPos);

				assert(iPosOfSemikolon != -1,
						'";" expected but not found! Wrong input string?');

				// extract the substring for the child node, without the edge
				// length information
				var sChildSubString = sSubString.substr(iPosOfSemikolon + 1, i
						- iPosOfSemikolon - 1);

				// extract the length information as substring
				var sLengthOfEdgeString = sSubString.substr(iStartPos + 1,
						iPosOfSemikolon - iStartPos - 1);

				// convert substring to integer
				var iLengthOfEdge = parseInt(sLengthOfEdgeString);

				// Debugger.log("iLengthOfEdge = " + iLengthOfEdge);

				// call ParseString recursively for extracted child substring
				var rNewChildNode = ItlParseString(sChildSubString);

				// add child node to current node
				rNewNode.AddChild(rNewChildNode, iLengthOfEdge);

				// set new starting position
				iStartPos = i + 1;
			}
		}
	}
	else if (bMaybeLeaf == true)
	{
		// Debugger.log("is leaf");

		rNewNode.isleaf = true;

		rNewNode.name = sSubString.substr(1, sSubString.length - 2);
	}

	return rNewNode;
}

/**
 * Tests the assertion and prints error message, if assertion failed
 * 
 * @param {string} sString The string to parse
 * @return {Vis2Node} The created and initialized tree
 */
function CreateTreeFromString(sString)
{
	return ItlParseString(sString);	
}

function ParseFile(sFilename)
{
	// TODO: read from file (I think the user must explicit upload the files, to
	// process it in
	// javascript / HTML5. Otherwise, it would be huge security problem.

	// example tree structure 1
	var sTestTreeCompact1 = '[1;[2;[1;"A"][1;"B"]][2;[1;"C"][1;"D"]][2;[1;"E"][1;"F"]]][3;"G"]';
	// var sTestTreeCompact2 =
	// '[5;[5;[5;"A"][5;"B"]][5;"C"]][5;[5;"D"][5;[5;[5;"E"][5;"F"]][5;"G"]]]]';

	var tree = ParseString(sTestTreeCompact1);
	tree.BuildLeafList();

	return tree;
}

function GetSampleTrees()
{
	var sTree1 = '[6;[5;[4;"G"][3;"F"]][2;[6;[2;"A"][3;[4;"B"][5;[4;"C"][3;"D"]]]][2;"E"]]][6;"H"]';
	var sTree2 = '[2;[4;"F"][3;[2;[6;"D"][2;[6;"B"][3;"A"]]][2;"C"]]][6;[2;"G"][3;[4;"E"][2;"H"]]]';
	var sTree3 = '[3;[3;"A"][2;"B"]][2;[3;[6;[4;"C"][6;[6;"D"][4;"E"]]][5;[4;"F"][5;"H"]]][3;"G"]]';
	var sTree4 = '[4;[2;[6;"C"][2;"A"]][3;[4;"B"][5;"G"]]][3;[2;[6;"H"][2;"D"]][3;[4;"E"][4;"F"]]]';
	var sTree5 = '[5;[6;[2;[3;"D"][4;"C"]][5;"B"]][4;"A"]][3;[2;"H"][6;[2;"E"][3;[4;"G"][5;"F"]]]]';
	
	var sTree6 = '[2;[2;"A"][2;"B"]][2;[2;"C"][2;"D"]]';
	var sTree7 = '[2;[2;[2;"A"][2;"B"]][2;"C"]][2;"D"]';
	
	var sTree8 = '[2;"A"][2;"B"]';
	var sTree9 = '[1;"A"][2;"B"]';
	
	var aTrees = new Array();
	
	/*aTrees.push(CreateTreeFromString(sTree1));
	aTrees.push(CreateTreeFromString(sTree2));
	aTrees.push(CreateTreeFromString(sTree3));
	aTrees.push(CreateTreeFromString(sTree4));
	aTrees.push(CreateTreeFromString(sTree5));
	
	aTrees.push(CreateTreeFromString(sTree6));
	aTrees.push(CreateTreeFromString(sTree7));
	*/
	aTrees.push(CreateTreeFromString(sTree8));
	aTrees.push(CreateTreeFromString(sTree9));
	
	//var tree = Vis2EdgeMeasure(aTrees[0], aTrees[0]);
	
	return aTrees;
}
