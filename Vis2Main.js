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
		this.OpenViews = ko.observableArray();

		var self = this;
		var nSections = 0;
		var nWindows = 0;
		var nMaxSections = 2;

		var m_bDockingInitialized = false;

		//This method will handle the new added sections
		function handleSection(el) {
			var id = 'knockout-section-' + nSections;
			nSections += 1;
			el.id = id;
			$(el).appendTo($('#docking'));
			$(el).css('width', '47%');
		}

		//This method will handle the new added windows
		function handleWindow(el) {
			var id = 'knockout-window-' + nWindows, nSection = nWindows % nSections;
			nWindows += 1;
			$(el).attr('id', id);

			// get tree index
			nTreeIndex = self.OpenViews()[nWindows-1].treeID;
			
			// set titlebar caption
			$(el).children(".titlebar").append("Tree Comparison View (Tree " + nTreeIndex.toString() + ")");
			
			sLinkLeafMeasure = '<a href="javascript:window.ViewManager.SetMeasureForComparisonView(' + nWindows + ', \'leaf\')">leaf-based</a> ';
			sLinkElementMeasure = '<a href="javascript:window.ViewManager.SetMeasureForComparisonView(' + nWindows + ', \'element\')">element-based</a> ';
			sLinkEdgeMeasure = '<a href="javascript:window.ViewManager.SetMeasureForComparisonView(' + nWindows + ', \'edge\')">edge-based</a> ';
			
			$(el).children(".titlebar").append('<br><span style="font-size: 7pt; font-family: arial;">Select measure: ' + sLinkLeafMeasure + sLinkElementMeasure + sLinkEdgeMeasure + '</span>');
			
			// set id of <div class="content">
			$(el).children(".content").attr('id', 'knockout-window-content-' + nWindows);

			if(m_bDockingInitialized == true) {
				// add windowp to dock
				$('#docking').jqxDocking('addWindow', id, 'default', nSection, nWindows);
			} else {
				// initialize docking
				$('#docking').jqxDocking({
					theme : '',
					width: 400,
					panelsRoundedCorners : true
				});

				m_bDockingInitialized = true;
			}

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
				windowIndex : nWindows
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
	};

	window.DynamicWindowsModel = new DynamicWindowsModel();

	// activate knockout.js, set Model
	ko.applyBindings(window.DynamicWindowsModel);

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
