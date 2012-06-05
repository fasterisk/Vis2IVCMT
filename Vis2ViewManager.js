function Vis2ViewManager() {
	var ComparisonOverview = undefined;
	var ReferenceTreeView = undefined;
	var ScoreDistributionView = undefined;

	var aCreatedWindows = new Array();

	this.InitializeViews = function() {
		ComparisonOverview = new Vis2ComparisonOverview("ComparisonOverviewPane");
		ReferenceTreeView = new Vis2ReferenceTreeView("ReferenceTreePane");
		ScoreDistributionView = new Vis2ScoreDistributionView("ScoreDistributionPane");
		
		setTimeout("window.ViewManager.ShowHelpWindow()", 100);
	};

	this.UpdateViews = function() {
		assert(ComparisonOverview != undefined && ReferenceTreeView != undefined, "Views not initialized yet!");

		// update comparison overview
		ComparisonOverview.Update();

		// update reference tree view
		ReferenceTreeView.Update();

		// update score distribution view
		ScoreDistributionView.Update();

		// update all tree comparison views
		for(var i = 0; i < aCreatedWindows.length; i++) {
			if(aCreatedWindows[i].rViewObject != undefined) {
				aCreatedWindows[i].rViewObject.Update();
			}
		}
	};

	this.HideHelpWindow = function() {
		$("#help").hide('normal');

		if($("#show_help_link").length == 0)
			$('body').prepend('<a id="show_help_link" href="javascript: window.ViewManager.ShowHelpWindow()">Show Help</a>');
		else
			$("#show_help_link").show('normal');
	}

	this.ShowHelpWindow = function() {	
		$("#help").show('normal');

		$("#help").css("left", $("#docking").offset().left);
		$("#help").css("top", $("#docking").offset().top);
		$("#help").width($("#docking").width());
		$("#help").height($("#docking").height());
		
		$("#show_help_link").hide('normal');

	}

	this.OnCloseWindow = function(sWindowID_HTML) {
		for(var i = 0; i < aCreatedWindows.length; i++) {
			if(aCreatedWindows[i].windowID == sWindowID_HTML) {
				aCreatedWindows[i].open = false;
				aCreatedWindows[i].rViewObject = undefined;
				
				window.SelectionManager.TreeSelectionRemoved(aCreatedWindows[i].nSelectedTree);
				
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
}
