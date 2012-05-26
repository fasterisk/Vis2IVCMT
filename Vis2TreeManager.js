function Vis2TreeManager(sFilename)
{
	// ****** private members ************
	
	var m_sFilename = sFilename;
	var m_aLoadedTrees = new Array();
	
	
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
	}
	
	
	// call LoadTrees() on construction time
	LoadTrees();
	
	// ****** public members ************
	
	this.GetNumTrees = function() {
		return m_aLoadedTrees.length;	
	}
	
	this.GetTree = function (iIndex) {
		assert(iIndex < m_aLoadedTrees.length, "iIndex < m_aLoadedTrees.length failed");
		
		return m_aLoadedTrees[iIndex];
	}
	
	this.GetTrees = function() {
		return m_aLoadedTrees;
	}
}
