function RightPaneCanvas()
{
	
	
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	
	/*
	 * Functions for public access
	 */
	this.DrawScreen = M_DrawScreen;
	
	var sTestTreeCompact4 = '[1;[2;[3;"A"][4;"B"]][5;"C"]][4;[3;"D"][2;[3;[4;"E"][5;"F"]][6;"G"]]]';
	var sTestTreeCompact5 = '[2;[2;[2;"B"][2;"D"]][2;"C"]][2;[2;"E"][2;[2;[2;"A"][2;"G"]][2;"F"]]]';
	var sTestTreeCompact6 = '[5;[4;[3;"A"][2;"B"]][1;"C"]][2;[3;"D"][4;[5;[4;"E"][3;"F"]][2;"G"]]]';

	var tree1 = ParseString(sTestTreeCompact4);
	var tree2 = ParseString(sTestTreeCompact5);
	var tree3 = ParseString(sTestTreeCompact6);

	tree1.BuildLeafList();
	tree2.BuildLeafList();
	tree3.BuildLeafList();

	tree1.BuildNeededSpace();
	tree2.BuildNeededSpace();
	tree3.BuildNeededSpace();

	M_DrawScreen();

	function M_DrawScreen()
	{
		Debugger.log("Drawing RightPaneCanvas");

		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		
		context.fillStyle = '#aaaaaa';
		context.fillRect(0, 0, canvas.width, canvas.height);

		window.viewManager.DisplayColorMap(context);

		context.fillStyle = '#000000';
		tree1.Draw(context, 200, 10);
		tree2.Draw(context, 400, 10);
		tree3.Draw(context, 600, 10);

		context.textFillColor = "#000000";
		context.font = "24px sans-serif";
		context.fillText(window.viewManager.measure, 400, 300);
	}
}
