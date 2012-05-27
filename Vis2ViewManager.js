function Vis2ViewManager()
{
	var ComparisonOverview = undefined;
	var ReferenceTreeView = undefined;
	var TreeComparisonView = undefined;
	
	var nNextWindowNumber = 1;
	
	this.InitializeViews = function()
	{
		ComparisonOverview = new Vis2ComparisonOverview("ComparisonOverviewPane");
		ReferenceTreeView = new Vis2ReferenceTreeView("ReferenceTreePane");
		TreeComparisonView = new Vis2TreeComparisonView("RightPane");
	}
	
	this.UpdateViews = function () 
	{
		assert (ComparisonOverview != undefined && ReferenceTreeView != undefined && TreeComparisonView != undefined, "Views not initialized yet!");
		
		ComparisonOverview.Update();			
		ReferenceTreeView.Update();
		TreeComparisonView.Update();
	}
	
	this.CreateNewComparisonView = function()
	{
		var nWindowNumber = nNextWindowNumber;
		
		nNextWindowNumber = nNextWindowNumber + 1;
		
		var sNewWindowName = "window" + nWindowNumber;
		
		var sWindowDivContent = '<div><form>View ' + nWindowNumber + ', select measure:' + 
										'<select id="measure">'+
											'<option value="leafbased">leaf-based</option>'+
											'<option value="elementbased">element-based</option>'+
											'<option value="edgebased">edge-based</option>'+
										'</select>'+
									'</form>'+
								'</div>' +
								'<div id="TestPane"' + nWindowNumber + ' style="width: 100%; height: 100%;">' +
									'<canvas>'+
										'not simply use HTML5 Canvas with this browser'+
									'</canvas>'+
								'</div>';
		
		//$("DockingBox").append('<p> HALLLLLLLLLLLO</p>');
		var items1 = $("#" + sNewWindowName);
		var items2 = $("#DockingBox");
								
		$("#DockingBox").append('<div><div id="' + sNewWindowName + '">' + sWindowDivContent + '</div></div>');
		
		$("#" + sNewWindowName).jqxWindow();
		$("#DockingBox").jqxDocking('addWindow', sNewWindowName, 'docked');
	}
	
}
