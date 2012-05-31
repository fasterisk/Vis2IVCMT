function Vis2TreeManager(sFilename)
{
	// ****** private members ************
	
	var m_sFilename = sFilename;
	var m_aLoadedTrees = undefined;
	var m_aComparisonOverviewMeasures = undefined;
	
	
	function LoadTrees()
	{
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
		
		// calculate comparison measures for each pair of trees
		m_aComparisonOverviewMeasures = new Array();
		
		for (var nReferenceTree = 0; nReferenceTree < m_aLoadedTrees.length; nReferenceTree++)
		{
		m_aComparisonOverviewMeasures[nReferenceTree] = new Array();	

			for (var nCompareTree = 0; nCompareTree < m_aLoadedTrees.length; nCompareTree++)
			{
				if (nCompareTree != nReferenceTree)
				{
					resultTree = Vis2ElementMeasure(m_aLoadedTrees[nReferenceTree], m_aLoadedTrees[nCompareTree]);
					
					m_aComparisonOverviewMeasures[nReferenceTree][nCompareTree] = resultTree.elementmeasure;
				}
				else
				{
					m_aComparisonOverviewMeasures[nReferenceTree][nCompareTree] = 1.0;
				}
			}
		}
		
	}
	
	
	// call LoadTrees() on construction time
	LoadTrees();
	
	// ****** public members ************
	
	this.GetComparisonOverviewMeasure = function(nReferenceTree, nCompareTree)
	{
		assert (m_aComparisonOverviewMeasures != undefined, 'Trees not loaded correctly');
		assert (nReferenceTree < m_aComparisonOverviewMeasures.length, "array index out of bounds");
		assert (nCompareTree < m_aComparisonOverviewMeasures[nReferenceTree].length, "array index out of bounds");
		
		return m_aComparisonOverviewMeasures[nReferenceTree][nCompareTree];
	};
	
	this.UpdateAllMeasures = function()
	{
		rReferenceNode = window.SelectionManager.GetReferenceNode();
		
		for (var nCompareTree = 0; nCompareTree < m_aLoadedTrees.length; nCompareTree++)
		{
			Vis2LeafMeasures(rReferenceNode, m_aLoadedTrees[nCompareTree]);
			Vis2ElementMeasure(rReferenceNode, m_aLoadedTrees[nCompareTree]);
		}	
	};
	
	this.GetNumTrees = function() {
		return m_aLoadedTrees.length;	
	};
	
	this.GetTree = function (iIndex) {
		assert(iIndex < m_aLoadedTrees.length, "iIndex < m_aLoadedTrees.length failed");
		
		return m_aLoadedTrees[iIndex];
	};
	
	this.GetIndexOfTree = function (rTree)
	{
		for (var nCompareTree = 0; nCompareTree < m_aLoadedTrees.length; nCompareTree++)
		{
			if (m_aLoadedTrees[nCompareTree] == rTree)
				return nCompareTree;
		}
		
		// if not found, return undefined
		return undefined;
	};
	
	this.GetTrees = function() {
		return m_aLoadedTrees;
	};
}
