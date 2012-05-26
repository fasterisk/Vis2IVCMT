function Vis2ViewManager2()
{
	this.UpdateViews = function () 
	{
		window.ComparisonOverview = new ComparisonOverview();
		window.ScoreDistributionView = new ScoreDistributionView();
		window.ReferenceTreeView = new ReferenceTreeView();
		window.TreeComparisonView = new TreeComparisonView();
		
		window.ComparisonOverview.DrawScreen("LeftTopPane");
		window.ScoreDistributionView.DrawScreen("LeftMiddlePane");
		window.ReferenceTreeView.DrawScreen("LeftBottomPane");
		window.TreeComparisonView.DrawScreen("RightLeftTopPane");
		window.TreeComparisonView.DrawScreen("RightRightTopPane");
		window.TreeComparisonView.DrawScreen("RightLeftBottomPane");
		window.TreeComparisonView.DrawScreen("RightRightBottomPane");
	}
}
