$().ready(function() {
	
	// First horizontal splitters, nested in the right pane of the vertical splitter.
	$("#LeftPaneSplitter1").splitter({
		splitHorizontal: true,
		outline: true,
		sizeTop: 100, minTop: 50, maxTop: 200,
		accessKey: "V"
	});
	// Second horizontal splitter, nested in bottom pane of first horizontal splitter
	$("#LeftPaneSplitter2").splitter({
		splitHorizontal: true,
		outline: true,
		//sizeBottom: 120, minTop: 50,
		accessKey: "J"
	});
	// Vertical splitter. Set min/max/starting sizes for the left pane.
	$("#MainWindow").splitter({
		splitVertical: true,
		outline: true,
		sizeLeft: true,
		anchorToWindow: true,
		accessKey: "L"
	});

});