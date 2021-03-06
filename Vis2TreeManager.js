function Vis2TreeManager(sFilename) {
	// ****** private members ************

	var m_sFilename = sFilename;
	var m_aLoadedTrees = undefined;
	var m_aComparisonOverviewMeasures = undefined;
	var m_aScoreDistribution = undefined;
	var m_aAverageScore = undefined;

	var m_sGlobalMeasure = "leaf";
	var m_fGlobalThreshold = 0.0;

	function LoadTrees() {
		/* this only works, if the website is hosted by a webserver.
		 * if opened through file://C:\Some\Path\IVCMT.html, the XMLHttpRequest
		 * refuse the connection for security reason
		 */

		/*
		 // create http request
		 var HttpRequest = new XMLHttpRequest();

		 // build url
		 var sURL = self.location.pathname + "/" + m_sFilename;

		 // open http request in sync-mode
		 HttpRequest.open("GET", sURL, false);

		 // send request
		 HttpRequest.send(null);

		 // query result
		 assert (HttpRequest.status==200, "Error while executing XMLHttpRequest");
		 var sResult = HttpRequest.responseText;

		 // parse result
		 var Parser = new Vis2ParseFile();

		 m_aLoadedTrees = Parser.CreateMultipleTreesFromString();
		 */

		m_aLoadedTrees = GetSampleTrees();

		UpdateOverviewMeasures();
	}
	
	function ItlAutoCollapseNodes()
	{
		for(var iIndex = 0; iIndex < m_aLoadedTrees.length; iIndex++) {
			ItlAutoCollapseRecursive(m_aLoadedTrees[iIndex]);
		}
	}
	
	function ItlAutoCollapseRecursive(rNode)
	{
		assert(m_sGlobalMeasure == "leaf" || m_sGlobalMeasure == "element" || m_sGlobalMeasure == "edge", "Wrong measure set");
		
		if (m_sGlobalMeasure == "leaf" && rNode.leafmeasure < m_fGlobalThreshold)
			rNode.bIsCollapsed = true;
		else
		if (m_sGlobalMeasure == "element" && rNode.elementmeasure < m_fGlobalThreshold)
			rNode.bIsCollapsed = true;
		else
		if (m_sGlobalMeasure == "edge" && rNode.edgemeasure < m_fGlobalThreshold)
			rNode.bIsCollapsed = true;
		else
			rNode.bIsCollapsed = false;
			
		if(rNode.isleaf == false) {
			for(var i = 0; i < rNode.GetChildrenCount(); i++)
				ItlAutoCollapseRecursive(rNode.children[i]);
		}
	}

	
	function UpdateOverviewMeasures() {
		// calculate comparison measures for each pair of trees
		m_aComparisonOverviewMeasures = new Array();
		m_aScoreDistribution = new Array();
		m_aAverageScore = new Array();

		for(var nReferenceTree = 0; nReferenceTree < m_aLoadedTrees.length; nReferenceTree++) {
			m_aComparisonOverviewMeasures[nReferenceTree] = new Array();
			m_aScoreDistribution[nReferenceTree] = new Array();
			m_aAverageScore[nReferenceTree] = new Array();

			for(var nCompareTree = 0; nCompareTree < m_aLoadedTrees.length; nCompareTree++) {
				m_aScoreDistribution[nReferenceTree][nCompareTree] = new Array();
				m_aAverageScore[nReferenceTree][nCompareTree] = 0;

				for(var i = 0; i < 10; i++)
					m_aScoreDistribution[nReferenceTree][nCompareTree][i] = 0;

				//calculate score distributions
				//get all nodes of the comparing tree
				var aNodeList = m_aLoadedTrees[nCompareTree].GetNodeList();
				//compare all nodes of the comparing tree with the reference tree and store the distributions
				for(var nCompareNode = 0; nCompareNode < aNodeList.length; nCompareNode++) {
					var resultTree = undefined;
					var fMeasure = undefined;

					assert(m_sGlobalMeasure == "leaf" || m_sGlobalMeasure == "element" || m_sGlobalMeasure == "edge", "Wrong measure set");

					if(m_sGlobalMeasure == "leaf") {
						resultTree = Vis2LeafMeasure(m_aLoadedTrees[nReferenceTree], aNodeList[nCompareNode]);
						fMeasure = resultTree.leafmeasure;
					} else if(m_sGlobalMeasure == "element") {
						resultTree = Vis2ElementMeasure(m_aLoadedTrees[nReferenceTree], aNodeList[nCompareNode]);
						fMeasure = resultTree.elementmeasure;
					} else if(m_sGlobalMeasure == "edge") {
						resultTree = Vis2EdgeMeasure(m_aLoadedTrees[nReferenceTree], aNodeList[nCompareNode]);
						fMeasure = resultTree.edgemeasure;
					} else
						assert(false, "no valid measure selected!");

					assert(resultTree != undefined, "resultTree not assigned");

					var value = Math.floor(fMeasure * 10);
					if(value == 10)
						value--;

					m_aScoreDistribution[nReferenceTree][nCompareTree][value] += 1 / aNodeList.length;
					m_aAverageScore[nReferenceTree][nCompareTree] += fMeasure;
				}
				m_aAverageScore[nReferenceTree][nCompareTree] /= aNodeList.length;

				if(nCompareTree != nReferenceTree) {

					//calculate comparison overview measure

					var fMeasure = undefined;

					assert(m_sGlobalMeasure == "leaf" || m_sGlobalMeasure == "element" || m_sGlobalMeasure == "edge", "Wrong measure set");

					if(m_sGlobalMeasure == "leaf") {
						fMeasure = GetLeafMeasureOverview(m_aLoadedTrees[nReferenceTree], m_aLoadedTrees[nCompareTree]);
					} else if(m_sGlobalMeasure == "element") {
						fMeasure = GetElementMeasure(m_aLoadedTrees[nReferenceTree], m_aLoadedTrees[nCompareTree]);
					} else if(m_sGlobalMeasure == "edge") {
						fMeasure = GetEdgeMeasure(m_aLoadedTrees[nReferenceTree], m_aLoadedTrees[nCompareTree]);
					} else
						assert(false, "no valid measure selected!");

					//Debugger.log("CURRENT OVERVIEW MEASURE(" + nCompareTree + "|" + nReferenceTree + "): " + fMeasure);
					m_aComparisonOverviewMeasures[nReferenceTree][nCompareTree] = fMeasure;
				} else {
					m_aComparisonOverviewMeasures[nReferenceTree][nCompareTree] = 1.0;
				}
			}
		}
	}

	// call LoadTrees() on construction time
	LoadTrees();

	// ****** public members ************

	this.GetComparisonOverviewMeasure = function(nReferenceTree, nCompareTree) {
		assert(m_aComparisonOverviewMeasures != undefined, 'Trees not loaded correctly');
		assert(nReferenceTree < m_aComparisonOverviewMeasures.length, "array index out of bounds: m_aComparisonOverviewMeasures.length(" + m_aComparisonOverviewMeasures.length + ") <= nReferenceTree(" + nReferenceTree + ")");
		assert(nCompareTree < m_aComparisonOverviewMeasures[nReferenceTree].length, "array index out of bounds: m_aComparisonOverviewMeasures[nReferenceTree].length(" + m_aComparisonOverviewMeasures[nReferenceTree].length + ") <= nCompareTree(" + nCompareTree + ")");

		return m_aComparisonOverviewMeasures[nReferenceTree][nCompareTree];
	};

	this.GetScoreDistribution = function(nReferenceTree, nCompareTree) {
		assert(m_aScoreDistribution != undefined, "Trees not loaded correctly: m_aScoreDistribution == undefined");
		assert(nReferenceTree < m_aScoreDistribution.length, "array index out of bounds: m_aScoreDistribution.length(" + m_aScoreDistribution.length + ") <= nReferenceTree(" + nReferenceTree + ")");
		assert(nCompareTree < m_aScoreDistribution[nReferenceTree].length, "array index out of bounds: m_aScoreDistribution[nReferenceTree].length(" + m_aScoreDistribution[nReferenceTree].length + ") <= nCompareTree(" + nCompareTree + ")");

		return m_aScoreDistribution[nReferenceTree][nCompareTree];
	};

	this.GetAverageScore = function(nReferenceTree, nCompareTree) {
		assert(m_aAverageScore != undefined, "Trees not loaded correctly: m_aScoreDistribution == undefined");
		assert(nReferenceTree < m_aAverageScore.length, "array index out of bounds: m_aScoreDistribution.length(" + m_aAverageScore.length + ") <= nReferenceTree(" + nReferenceTree + ")");
		assert(nCompareTree < m_aAverageScore[nReferenceTree].length, "array index out of bounds: m_aScoreDistribution[nReferenceTree].length(" + m_aAverageScore[nReferenceTree].length + ") <= nCompareTree(" + nCompareTree + ")");

		return m_aAverageScore[nReferenceTree][nCompareTree];
	};

	this.UpdateAllMeasures = function() {
		Debugger.log("UPDATING ALL MEASURES");

		// update comparison measures, score distribution measures, ...
		UpdateOverviewMeasures();

		var rReferenceTree = window.SelectionManager.GetReferenceTree();

		for(var nCompareTree = 0; nCompareTree < m_aLoadedTrees.length; nCompareTree++) {
			Vis2LeafMeasure(rReferenceTree, m_aLoadedTrees[nCompareTree]);
			Vis2ElementMeasure(rReferenceTree, m_aLoadedTrees[nCompareTree]);
			Vis2EdgeMeasure(rReferenceTree, m_aLoadedTrees[nCompareTree]);
		}
	};

	this.UpdateReferenceTreeAverage = function() {
		var rReferenceTree = window.SelectionManager.GetReferenceTree();
		var nReferenceTree = this.GetIndexOfTree(rReferenceTree);

		var aNodeList = rReferenceTree.GetNodeList();

		for(var i = 0; i < aNodeList.length; i++) {
			aNodeList[i].averageleafmeasure = 0;
			aNodeList[i].averageelementmeasure = 0;
			aNodeList[i].averageedgemeasure = 0;

			for(var j = 0; j < m_aLoadedTrees.length; j++) {
				if(j != nReferenceTree) {
					aNodeList[i].averageleafmeasure += GetBestMatchingLeafMeasure(aNodeList[i], m_aLoadedTrees[j]);
					aNodeList[i].averageelementmeasure += GetBestMatchingElementMeasure(aNodeList[i], m_aLoadedTrees[j]);
					aNodeList[i].averageedgemeasure += GetEdgeMeasure(m_aLoadedTrees[j], aNodeList[i]);
				}
			}
			aNodeList[i].averageleafmeasure /= m_aLoadedTrees.length - 1;
			aNodeList[i].averageelementmeasure /= m_aLoadedTrees.length - 1;
			aNodeList[i].averageedgemeasure /= m_aLoadedTrees.length - 1;
		}
	};

	this.GetNumTrees = function() {
		return m_aLoadedTrees.length;
	};

	this.GetTree = function(iIndex) {
		assert(iIndex < m_aLoadedTrees.length, "iIndex < m_aLoadedTrees.length failed");

		return m_aLoadedTrees[iIndex];
	};

	this.GetIndexOfTree = function(rTree) {
		for(var nCompareTree = 0; nCompareTree < m_aLoadedTrees.length; nCompareTree++) {
			if(m_aLoadedTrees[nCompareTree] == rTree)
				return nCompareTree;
		}

		// if not found, return undefined
		return undefined;
	};

	this.GetTrees = function() {
		return m_aLoadedTrees;
	};
	
	
	this.SetThreshold = function (fThreshold)
	{
		assert (fThreshold >= 0.0 && fThreshold <= 1.0, "fThreshold out of range");
		
		m_fGlobalThreshold = fThreshold;
		
		ItlAutoCollapseNodes();
		
		window.ViewManager.UpdateViews();
	}

	// sets the global measure, must be "leaf", "element" or "edge"
	this.SetGlobalMeasure = function(sMeasure) {
		assert(sMeasure == "leaf" || sMeasure == "element" || sMeasure == "edge", "Wrong measure set");

		m_sGlobalMeasure = sMeasure;


		ItlAutoCollapseNodes();
		
		this.UpdateAllMeasures();
		window.ViewManager.UpdateViews();
	}
	// returns the global measure
	this.GetGlobalMeasure = function() {
		return m_sGlobalMeasure;
	}
	function ClearSelectedNode(rNode) {
		rNode.bIsSelected = false;

		if(rNode.isleaf == false) {
			for(var i = 0; i < rNode.GetChildrenCount(); i++)
				ClearSelectedNode(rNode.children[i]);
		}
	}


	this.ClearSelectedNodes = function() {
		for(var nTree = 0; nTree < m_aLoadedTrees.length; nTree++) {
			ClearSelectedNode(m_aLoadedTrees[nTree]);
		}
	}
	/**
	 * This method strips the leaves of a node as a string, including the structure by using "(" and ")"
	 *
	 * @param {Vis2Node} rNode A Node
	 * @return {string} Returns a (simple) string
	 */
	function GetLeavesAsString(rNode) {
		var sReturn = "";

		// return name, if this is a leaf
		if(rNode.isleaf == true)
			sReturn = "('" + rNode.name + "')";
		else {
			// collect leaves under child nodes, if this is not a leaf
			for(var i = 0; i < rNode.GetChildrenCount(); i++) {
				var sLeavesAsStringFromChildNode = GetLeavesAsString(rNode.children[i]);

				sReturn += "(" + sLeavesAsStringFromChildNode + ")";
			}
		}

		return sReturn;
	}

	function SetRecursiveSelectedNodes(rNode) {
		rNode.bIsSelected = true;

		if(rNode.isleaf == false) {
			for(var i = 0; i < rNode.GetChildrenCount(); i++)
				SetRecursiveSelectedNodes(rNode.children[i]);
		}
	}

	function SearchForSameNodes(rStart, rNode) {
		if(rStart != rNode) {
			var bNodesEqual = true;

			var sNodeList1 = GetLeavesAsString(rStart);
			var sNodeList2 = GetLeavesAsString(rNode);

			bNodesEqual = (sNodeList1 == sNodeList2);

			if(bNodesEqual) {
				rStart.bIsSelected = true;
				SetRecursiveSelectedNodes(rStart);
			} else {
				if(rStart.isleaf == false) {
					for(var i = 0; i < rStart.GetChildrenCount(); i++)
						SearchForSameNodes(rStart.children[i], rNode);
				}
			}
		}

	}


	this.SetSelectedNode = function(rNode) {
		SetRecursiveSelectedNodes(rNode);

		for(var nTree = 0; nTree < m_aLoadedTrees.length; nTree++) {
			SearchForSameNodes(m_aLoadedTrees[nTree], rNode);
		}

		if(rNode.isleaf == false) {
			for(var i = 0; i < rNode.GetChildrenCount(); i++)
				this.SetSelectedNode(rNode.children[i]);
		}
	}
}

