function Vis2ViewManager() {
	this.ComparisonOverview = undefined;
	this.ReferenceTreeView = undefined;
	this.ScoreDistributionView = undefined;

	var aCreatedWindows = new Array();

	this.InitializeViews = function() {
		this.ComparisonOverview = new Vis2ComparisonOverview("ComparisonOverviewPane");
		this.ReferenceTreeView = new Vis2ReferenceTreeView("ReferenceTreePane");
		this.ScoreDistributionView = new Vis2ScoreDistributionView("ScoreDistributionPane");
		
		setTimeout("window.ViewManager.ShowHelpWindow()", 100);
	};

	this.UpdateViews = function() {
		assert(this.ComparisonOverview != undefined && this.ReferenceTreeView != undefined, "Views not initialized yet!");

		// update comparison overview
		this.ComparisonOverview.Update();

		// update reference tree view
		this.ReferenceTreeView.Update();

		// update score distribution view
		this.ScoreDistributionView.Update();

		// update all tree comparison views
		for(var i = 0; i < aCreatedWindows.length; i++) {
			if(aCreatedWindows[i].rViewObject != undefined) {
				aCreatedWindows[i].rViewObject.Update();
			}
		}
	};

	this.HideHelpWindow = function() {
		$("#help").hide('normal');

		//$("#show_help_link").show('normal');
	}

	this.ShowHelpWindow = function() {	
		$("#help").show('normal');

		$("#help").css("left", $("#docking").offset().left);
		$("#help").css("top", $("#docking").offset().top);
		$("#help").width($("#docking").width());
		$("#help").height($("#docking").height());
		
		//$("#show_help_link").hide('normal');

	}

	this.OnCloseWindow = function(sWindowID_HTML) {
		for(var i = 0; i < aCreatedWindows.length; i++) {
			if(aCreatedWindows[i].windowID == sWindowID_HTML) {			
				window.SelectionManager.TreeSelectionRemoved(aCreatedWindows[i].nSelectedTree);
				
				aCreatedWindows[i].open = false;
				aCreatedWindows[i].rViewObject = undefined;
				aCreatedWindows[i].windowID = undefined;
				aCreatedWindows[i].nSelectedTree = undefined;
				
				window.ViewManager.UpdateViews();
			}
		}
	}
	
	this.AddTreeComparisonWindow = function(nSelectedTreeToCompare) {
		// hide help window, if showed
		this.HideHelpWindow();

		// create new window
		var nWindowIndex = window.DynamicWindowsModel.addWindow(nSelectedTreeToCompare);

		assert(nWindowIndex > 0, "nWindowIndex should be in range 1..n");

		// build id of div where we want to add the view
		sDivID = "knockout-window-content-" + nWindowIndex;

		// create new view
		rNewView = new Vis2TreeComparisonView(sDivID, nSelectedTreeToCompare);

		// insert into array of tree comparison views
		aCreatedWindows.push({
			windowIndex : nWindowIndex,
			windowID : "knockout-window-" + nWindowIndex,
			nSelectedTree : nSelectedTreeToCompare,
			rViewObject : rNewView,
			open : true
		});

		window.SelectionManager.TreeSelectionAdded(nSelectedTreeToCompare);

		// update views
		this.UpdateViews();

		// return window index
		return nWindowIndex;
	};

	this.GetTreeComparisonViewForWindow = function(nWindowIndex) {
		assert(nWindowIndex > 0, "nWindowIndex should be in range 1..n");

		for(var i = 0; i < aCreatedWindows.length; i++) {
			if(aCreatedWindows[i].windowIndex == nWindowIndex) {
				assert(aCreatedWindows[i].rViewObject != undefined, "view object doesn't exist anymore, window closed?");

				return aCreatedWindows[i].rViewObject;
			}
		}

		return undefined;
	};
	
	this.GetFirstWindowIDForTree = function(nTree)
	{
		for(var i = 0; i < aCreatedWindows.length; i++) {
			if(aCreatedWindows[i].nSelectedTree == nTree) {
				assert(aCreatedWindows[i].rViewObject != undefined, "view object doesn't exist anymore, window closed?");

				return aCreatedWindows[i].windowID;
			}
		}

		return undefined;		
	}
}
