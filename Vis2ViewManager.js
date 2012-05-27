function Vis2ViewManager()
{
	var ComparisonOverview = undefined;
	var ReferenceTreeView = undefined;
	var TreeComparisonView = undefined;
	
	this.InitializeViews = function()
	{
		ComparisonOverview = new Vis2ComparisonOverview("LeftTopPane");
		ReferenceTreeView = new Vis2ReferenceTreeView("LeftBottomPane");
		TreeComparisonView = new Vis2TreeComparisonView("RightPane");
	}
	
	this.UpdateViews = function () 
	{
		assert (ComparisonOverview != undefined && ReferenceTreeView != undefined && TreeComparisonView != undefined, "Views not initialized yet!");
		
		ComparisonOverview.Update();			
		ReferenceTreeView.Update();
		TreeComparisonView.Update();
	}
	
}
