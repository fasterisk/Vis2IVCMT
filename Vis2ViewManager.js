function Vis2ViewManager()
{
	var ComparisonOverview = undefined;
	var ReferenceTreeView = undefined;
	var ScoreDistributionView = undefined;
	var aTreeComparisonViews = new Array();
	var aAssociatedWindows = new Array();
	
	this.InitializeViews = function()
	{
		ComparisonOverview = new Vis2ComparisonOverview("ComparisonOverviewPane");
		ReferenceTreeView = new Vis2ReferenceTreeView("ReferenceTreePane");
		ScoreDistributionView = new Vis2ScoreDistributionView("ScoreDistributionPane");
	};
		
	this.UpdateViews = function () 
	{
		assert (ComparisonOverview != undefined && ReferenceTreeView != undefined, "Views not initialized yet!");
		
		// update comparison overview
		ComparisonOverview.Update();
		
		// update reference tree view			
		ReferenceTreeView.Update();
		
		// update score distribution view
		ScoreDistributionView.Update();
		
		// update all tree comparison views
		for (var i=0; i < aTreeComparisonViews.length; i++)
			aTreeComparisonViews[i].Update();
	};
	
	this.HideHelpWindow = function ()
	{
		$("#help").hide('normal');
		
		if ($("#show_help_link").length == 0)
			$('body').prepend('<a id="show_help_link" href="javascript: window.ViewManager.ShowHelpWindow()">Show Help</a>');
		else
			$("#show_help_link").show('normal');	
	}
	
	this.ShowHelpWindow = function ()
	{
		$("#help").show('normal');
		$("#show_help_link").hide('normal');
	}
	
	this.AddTreeComparisonWindow = function(nSelectedTreeToCompare)
	{
		// hide help window, if showed
		this.HideHelpWindow();
		
		// create new window
		var nWindowIndex = window.DynamicWindowsModel.addWindow(nSelectedTreeToCompare);
		
		assert (nWindowIndex > 0, "nWindowIndex should be in range 1..n");
		
		// build id of div where we want to add the view
		sDivID = "knockout-window-content-"+nWindowIndex;
		
		// create new view
		rNewView = new Vis2TreeComparisonView(sDivID, nSelectedTreeToCompare);
			
		// insert into array of tree comparison views
		aTreeComparisonViews.push(rNewView);
		
		// store window index
		aAssociatedWindows.push(nWindowIndex);
		
		// update measure-line
		window.DynamicWindowsModel.updateMeasure(nWindowIndex);
		
		// update views
		this.UpdateViews();
		
		// return window index
		return nWindowIndex;
	};
	
	this.GetTreeComparisonViewForWindow = function (nWindowIndex)
	{	
		assert (nWindowIndex > 0, "nWindowIndex should be in range 1..n");
		
		for (var i=0; i < aAssociatedWindows.length; i++)
		{
			if (aAssociatedWindows[i] == nWindowIndex)
			{
				return aTreeComparisonViews[i];
			}
		}
		
		return undefined;
	};
	
	this.SetMeasureForComparisonView = function(nWindowIndex, sMeasureString)
	{
		assert (nWindowIndex > 0, "nWindowIndex should be in range 1..n");
		
		for (var i=0; i < aAssociatedWindows.length; i++)
		{
			if (aAssociatedWindows[i] == nWindowIndex)
			{
				aTreeComparisonViews[i].SetMeasureToUse(sMeasureString);
				
				aTreeComparisonViews[i].Update();
				
				// also update window in html page
				window.DynamicWindowsModel.updateMeasure(nWindowIndex);
				break;
			}
		}	
	};
}
