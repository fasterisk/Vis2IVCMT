function ComparisonOverview()
{
	/*
	 * Functions for public access
	 */
	this.DrawScreen = M_DrawScreen;

	var sTestTreeCompact = '[1;[2;[3;"A"][4;"B"]][5;"C"]][4;[3;"D"][2;[3;[4;"E"][5;"F"]][6;"G"]]]';
	
	var sTestTreeReference = 	'[2;[4;"A"][2;"B"]][2;[2;"C"][2;"D"]]';
	var sTestTree2 = 			'[2;[2;[4;"A"][2;"B"]][2;"C"]][4;"D"]';
	
	var sEdgeTestTree1 = 		'[2;[4;"A"][2;"B"]][2;[2;"C"][2;"D"]]';
	var sEdgeTestTree2 = 		'[2;[4;"A"][2;"B"]][2;[1;"C"][2;"D"]]';

	var tree1 = ParseString(sTestTreeReference);
	var tree2 = ParseString(sTestTree2);
	var edgetree1 = ParseString(sEdgeTestTree1);
	var edgetree2 = ParseString(sEdgeTestTree2);
	
	var tree = tree1;

	tree1.BuildLeafList();
	tree2.BuildLeafList();
	edgetree1.BuildLeafList();
	edgetree2.BuildLeafList();

	// var LeafMeasure1 = Vis2LeafMeasures(tree1, tree2.children[0]);
	var LeafMeasureRoot = Vis2LeafMeasures(tree1, tree2);
	var ElementMeasureRoot = Vis2ElementMeasure(tree1, tree2);
	var EdgeMeasureRoot = Vis2EdgeMeasure(edgetree1, edgetree2);

	// window.alert(LeafMeasureRoot);

	tree.BuildLeafList();

	tree.BuildNeededSpace();

	function M_DrawScreen(paneID)
	{
		Debugger.log("Drawing " + paneID + " Canvas");

		var pane = document.getElementById(paneID);
		canvas = document.getElementById(paneID+"Canvas");
		context = canvas.getContext("2d");

		canvas.width = pane.offsetWidth;
		canvas.height = pane.offsetHeight;

		context.fillStyle = '#aaaaaa';
		context.fillRect(0, 0, canvas.width, canvas.height);

		window.viewManager.DisplayColorMap(context);

		context.fillStyle = '#000000';
		tree.Draw(context, 200, 10);

		context.textFillColor = "#000000";
		context.font = "24px sans-serif";
		context.fillText(window.viewManager.measure, 10, 50);
	}
}
