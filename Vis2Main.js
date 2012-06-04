// this is the main file

function OnWindowLoaded() {
	// prepare main page (setting up splitter, docking, ...)
	PrepareMainPage();

	// initialize views
	window.ViewManager.InitializeViews();

	// update views
	window.ViewManager.UpdateViews();
}

function PrepareMainPage() {
	$("#jqxSplitter2").jqxSplitter({
		theme : 'summer',
		orientation : 'horizontal',
		panels : [{
			size : '200px'
		}, {
			size : '200px'
		}, {
			size : '500px'
		}]
	});

	$("#jqxSplitter").jqxSplitter({
		theme : 'summer',
		panels : [{
			size : '200px'
		}, {
			size : '800px'
		}]
	});

	$('#jqxSplitter').bind('resize', canvasSizeChanged);
	$('#jqxSplitter2').bind('resize', canvasSizeChanged);


	// this class is a "model" in a ModelView-Pattern, used with knockout.js
	// and stores information about the dynamically created windows
	DynamicWindowsModel = function() {
		this.OpenViews = ko.observableArray([{treeID : 2,	windowIndex : 1}, {treeID : 2,	windowIndex : 2}]);

		var self = this;
		var nSections = 0;
		var nWindows = 0;
		var nMaxSections = 2;

		//This method will handle the new added sections
		function handleSection(el) {
			var id = 'knockout-section-' + nSections;
			nSections += 1;
			el.id = id;
			$(el).appendTo($('#docking'));
			$(el).css('width', '48%');
		}

		//This method will handle the new added windows
		function handleWindow(el) {
			var nNewWindowIndex = nWindows+1;
			var id = 'knockout-window-' + (nNewWindowIndex);		
			var nSection = nWindows % nSections;
			
			nWindows += 1;
			
			$(el).attr('id', id);
			$(el).css('min-height', '300px');

			// get tree index
			var nTreeIndex = self.OpenViews()[nWindows - 1].treeID;
			
			// set titlebar caption
			$(el).children(".titlebar").append("Tree Comparison View (Tree " + (nTreeIndex+1).toString() + ")");

			$(el).children(".titlebar").append('<br><span id="measure-select-' + nNewWindowIndex + '"></span>');

			// set id of <div class="content">
			$(el).children(".content").attr('id', 'knockout-window-content-' + nWindows);

			$(el).bind('closed', function (event) { window.ViewManager.OnCloseWindow(id); } );
			
			$('#docking').jqxDocking('addWindow', id, 'default', nSection, nWindows);
		}

		function getDOMElement(args) {
			for(var i = 0; i < args.length; i += 1) {
				if(args[i].tagName && args[i].tagName.toUpperCase() === 'DIV') {
					return args[i];
				}
			}
			return null;
		}

		//This method handles adding a new person (when the user click on the Add button)
		this.addWindow = function(nTreeToCompare) {			
			this.OpenViews.push({
				treeID : nTreeToCompare,
				windowIndex : nWindows,

			});

			return nWindows;
		}
		//This custom render takes care of adding new windows
		this.buildWindow = function(element) {
			var el = getDOMElement(element);
			if(nSections < nMaxSections) {
				handleSection(el);
				handleWindow($(el).children('.knockout-window'));
			} else {
				handleWindow($(el).children('.knockout-window'));
				$(el).remove();
			}
		}
		
		this.updateMeasure = function (nWindowIndex)
		{
			assert (nWindowIndex > 0, "nWindowIndex should be in range 1..n");
			
			var id = '#knockout-window-' + nWindowIndex;
			
			// remove old line				
			$("#measure-select-" + nWindowIndex).empty();
			
			// *** build new line *****
			
			// get view from view manager
			var rTreeComparisonView = window.ViewManager.GetTreeComparisonViewForWindow(nWindowIndex);
			assert (rTreeComparisonView != undefined, "Associated TreeComparisonView for specific window not found");

			// get used measure
			var sUsedMeasure = rTreeComparisonView.GetMeasureToUse();
			assert(sUsedMeasure != undefined, "undefined measure");

			// build links
			var sLinkLeafMeasure, sLinkElementMeasure, sLinkEdgeMeasure;

			if(sUsedMeasure == 'leaf')
				sLinkLeafMeasure = '<a>leaf-based</a> ';
			else
				sLinkLeafMeasure = '<a href="javascript:window.ViewManager.SetMeasureForComparisonView(' + nWindowIndex + ', \'leaf\')">leaf-based</a> ';

			if(sUsedMeasure == 'element')
				sLinkElementMeasure = '<a>element-based</a> ';
			else
				sLinkElementMeasure = '<a href="javascript:window.ViewManager.SetMeasureForComparisonView(' + nWindowIndex + ', \'element\')">element-based</a> ';

			if(sUsedMeasure == 'edge')
				sLinkEdgeMeasure = '<a>edge-based</a> ';
			else
				sLinkEdgeMeasure = '<a href="javascript:window.ViewManager.SetMeasureForComparisonView(' + nWindowIndex + ', \'edge\')">edge-based</a> ';

			// append new line with links
			$("#measure-select-" + nWindowIndex).append('<span style="font-size: 7pt; font-family: arial;">Select measure: ' + sLinkLeafMeasure + sLinkElementMeasure + sLinkEdgeMeasure + '</span>');
		}
	};

	window.DynamicWindowsModel = new DynamicWindowsModel();

	// activate knockout.js, set Model
	ko.applyBindings(window.DynamicWindowsModel);
	
	$('#docking').jqxDocking({
					theme : '',
					width: '700px',
					panelsRoundedCorners : true
				});
				
	// close the dummy windows, which were added to make the sections working (they must be existing at the docking-construction-time) 		
	$('#docking').jqxDocking('closeWindow', 'knockout-window-1');
	$('#docking').jqxDocking('closeWindow', 'knockout-window-2');
		

}

// attach OnWindowLoadedEvent
window.addEventListener('load', OnWindowLoaded, false);

// create tree manager
window.TreeManager = new Vis2TreeManager("SampleTrees1.txt");
assert(window.TreeManager.GetNumTrees() > 0, "no trees loaded");

// create selection manager
window.SelectionManager = new Vis2SelectionManager();

// create color map
window.ColorMap = new Vis2ColorMap();

// create view manager
window.ViewManager = new Vis2ViewManager();
