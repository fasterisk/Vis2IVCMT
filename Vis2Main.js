// this is the main file

function OnWindowLoaded()
{
	// initialize views
	window.ViewManager.InitializeViews();
	
	// update views
	window.ViewManager.UpdateViews();
	
	// prepare main page (setting up splitter, docking, ...)
	PrepareMainPage();
}

function PrepareMainPage()
{
	$("#jqxSplitter2").jqxSplitter({
					theme : 'summer',
					orientation : 'horizontal',
					panels : [{
						size : '300px'
					}, {
						size : '300px'
					}, {
						size : '300px'
					}]
				});
				$("#jqxSplitter").jqxSplitter({
					theme : 'summer',
					panels : [{
						size : '300px'
					}]
				});
				
				$('#jqxSplitter').bind('resize', canvasSizeChanged);
				$('#jqxSplitter2').bind('resize', canvasSizeChanged);

				$("#jqxSplitter").height(900);
				$("#jqxSplitter2").height(900);
				$("#docking").height(900);

				$("#ComparisonOverviewPane").height(300);
				$("#HistogramViewPane").height(300);
				$("#ReferenceTreePane").height(300);  

				ViewModel = function()
				{
                    this.OpenViews = ko.observableArray([{treeID: 1, windowIndex: 1}]);
                    
                    var self = this;
                    var nSections = 0;
                    var nWindows = 0;
                    var nMaxSections = 3;
                    
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
                        var id = 'knockout-window-' + nWindows,
                    	nSection = nWindows % nSections;
                        nWindows += 1;
                        $(el).attr('id', id);
                        
                        // set titlebar caption
                        $(el).children(".titlebar").append("Window " + nWindows);
                        
                        // set id of <div class="content">
                        $(el).children(".content").attr('id', 'knockout-window-content-' + nWindows);
                        
                        // add windowp to dock
                        $('#docking').jqxDocking('addWindow', id, 'docked', nSection, nWindows);
                    }
                    function getDOMElement(args) {
                        for (var i = 0; i < args.length; i += 1) {
                            if (args[i].tagName && args[i].tagName.toUpperCase() === 'DIV') {
                                return args[i];
                            }
                        }
                        return null;
                    }
                    
                    //This method handles adding a new person (when the user click on the Add button)
                    this.addView = function (nTreeToCompare) {
                            this.OpenViews.push({
                                treeID: nTreeToCompare,
                                windowIndex: nWindows
                            });
                            
                            window.ViewManager.AddTreeComparisonView(nWindows, nTreeToCompare);
                    }
                    //This custom render takes care of adding new windows
                    this.buildWindow = function (element) {
                        var el = getDOMElement(element);
                        if (nSections < nMaxSections) {
                            handleSection(el);
                            handleWindow($(el).children('.knockout-window'));
                        } else {
                            handleWindow($(el).children('.knockout-window'));
                            $(el).remove();
                        }
                    }
                    
                    
                };
				
				window.ViewModel = new ViewModel();
					
				ko.applyBindings(window.ViewModel);
				
				$('#docking').jqxDocking({ theme: '', orientation: 'horizontal', /*width: "auto", height: "auto",*/ mode: 'docked' });
	
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
