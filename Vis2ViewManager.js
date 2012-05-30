function Vis2ViewManager()
{
	var ComparisonOverview = undefined;
	var ReferenceTreeView = undefined;
	var TreeComparisonView = undefined;
	var aTreeComparisonViews = new Array();
	var aAssociatedWindows = new Array();
	
	this.InitializeViews = function()
	{
		ComparisonOverview = new Vis2ComparisonOverview("ComparisonOverviewPane");
		ReferenceTreeView = new Vis2ReferenceTreeView("ReferenceTreePane");
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
		// create new window
		var nWindowIndex = window.DynamicWindowsModel.addWindow(nSelectedTreeToCompare);
		
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
	}
	
	this.GetTreeComparisonViewForWindow = function (nWindowIndex)
	{	
		for (var i=0; i < aAssociatedWindows.length; i++)
		{
			if (aAssociatedWindows[i] == nWindowIndex)
			{
				return aTreeComparisonViews[i];
			}
		}
		
		return undefined;
	}
	
	this.SetMeasureForComparisonView = function(nWindowIndex, sMeasureString)
	{
		//alert(nWindowIndex + ":" + sMeasureString);
		
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
	}
}
