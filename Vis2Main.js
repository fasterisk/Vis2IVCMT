// this is the main file

function OnWindowLoaded()
{
	// initialize views
	window.ViewManager.InitializeViews();
	
	// update views
	window.ViewManager.UpdateViews();
	
	//var theme = getTheme();
    $('#RightPane').jqxDocking({ orientation: 'horizontal', width: 680, mode: 'docked' });
	$('#RightPane').jqxDocking('disableWindowResize', 'window1');
    $('#RightPane').jqxDocking('disableWindowResize', 'window2');
    $('#RightPane').jqxDocking('disableWindowResize', 'window3');
    $('#RightPane').jqxDocking('disableWindowResize', 'window4');
}

// attach OnWindowLoadedEvent
window.addEventListener('load', OnWindowLoaded, false);

// create tree manager
window.TreeManager = new Vis2TreeManager("SampleTrees1.txt");
assert (window.TreeManager.GetNumTrees() > 0, "no trees loaded");

// create selection manager
window.SelectionManager = new Vis2SelectionManager();

// create color map
window.ColorMap = new Vis2ColorMap();

// create view manager
window.ViewManager = new Vis2ViewManager();
