function Vis2ViewManager()
{
	var ComparisonOverview = undefined;
	var ReferenceTreeView = undefined;
	var TreeComparisonView = undefined;
	var aTreeComparisonViews = new Array();
	
	this.InitializeViews = function()
	{
		ComparisonOverview = new Vis2ComparisonOverview("ComparisonOverviewPane");
		ReferenceTreeView = new Vis2ReferenceTreeView("ReferenceTreePane");
	}
	
	this.AddTreeComparisonView = function (nWindowIndex, nTreeToCompare)
	{	
		// build id of div where we want to add the view
		sDivID = "knockout-window-content-"+nWindowIndex;
		
		// create new view
		rNewView = new Vis2TreeComparisonView(sDivID, nTreeToCompare);
		
		// insert into array of tree comparison views
		aTreeComparisonViews.push(rNewView);
		
		// update views
		this.UpdateViews();
	}
	
	this.UpdateViews = function () 
	{
		assert (ComparisonOverview != undefined && ReferenceTreeView != undefined, "Views not initialized yet!");
		
		// update comparison overview
		ComparisonOverview.Update();
		
		// update reference tree view			
		ReferenceTreeView.Update();
		
		// update all tree comparison views
		for (var i=0; i < aTreeComparisonViews.length; i++)
			aTreeComparisonViews[i].Update();
	}
	
	this.AddTreeComparisonWindow = function(nSelectedTreeToCompare)
	{
		window.ViewModel.addView(nSelectedTreeToCompare);
		
		return window.ViewModel.nWindows;
	}
}
