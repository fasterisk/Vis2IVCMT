function Vis2NodeVisualizer(rNode)
{
	assert (rNode != undefined, "node not specified!");
	
	/* private members */
	var Node = rNode;
	
	var LeftChildVisualizer = undefined;
	var RightChildVisualizer = undefined;
	
	var nLeftSpaceNeeded = undefined;
	var nRightSpaceNeeded = undefined;
	var nLeftLineLength = undefined;
	var nRightLineLength = undefined;
	
	/* private methods */
	function ItlCalculateNeededSpace()
	{
		if (Node.isleaf)
		{
			nLeftSpaceNeeded = 1;
			nRightSpaceNeeded = 1;
			nLeftLineLength = 0;
			nRightLineLength = 0;
		}
		else
		{
			// children[0] is left child, children[1] is right child
			LeftChildVisualizer = new Vis2NodeVisualizer(Node.children[0]);
			RightChildVisualizer = new Vis2NodeVisualizer(Node.children[1]);
			
			nLeftSpaceNeeded = LeftChildVisualizer.GetWidth();
			nRightSpaceNeeded = RightChildVisualizer.GetWidth();
			
			nLeftLineLength = LeftChildVisualizer.GetRightSpaceNeeded();
			nRightLineLength = RightChildVisualizer.GetLeftSpaceNeeded();
		}
	}
	
	/* constructor */
	
	ItlCalculateNeededSpace();
	
	/* public methods */
	
	this.GetWidth = function()
	{
		assert(nLeftSpaceNeeded != undefined && nRightSpaceNeeded != undefined, "values not correctly initialized");
		
		return nLeftSpaceNeeded + nRightSpaceNeeded;
	}
	
	this.GetLeftSpaceNeeded = function()
	{
		assert (nLeftSpaceNeeded != undefined, "value not initialized");
		
		return nLeftSpaceNeeded;
	}
	
	this.GetRightSpaceNeeded = function()
	{
		assert (nRightSpaceNeeded != undefined, "value not initialized");
		
		return nRightSpaceNeeded;
	}
	
	this.GetNode = function()
	{
		return Node;
	}
	
	this.Draw = function (context, currX, currY)
	{
		// Debugger.log("drawing node: " + this.id);
		var nodeRadius = 5;

		// Draw node as a circle
		
		if (Node.elementmeasure != undefined)
		{
			context.fillText(Node.elementmeasure.toPrecision(2), currX + 5, currY - 2);			
			context.fillStyle = window.ColorMap.GetColor(Node.elementmeasure);
		}
			
		

		context.beginPath();
		context.arc(currX, currY, nodeRadius, 0, Math.PI * 2, true);
		context.closePath();
		context.fill();
		
		context.fillStyle = '#000';

		if (Node.isleaf)
		{
			context.font = "10px sans-serif";
			context.fillText(Node.name, currX - 5, currY + 15);
		}
		else
		{
			assert (LeftChildVisualizer != undefined, "NodeVisualizer not correctly initialized");
			assert (RightChildVisualizer != undefined, "NodeVisualizer not correctly initialized");
			
			context.beginPath();
			context.moveTo(currX, currY);
			context.lineTo(currX - nLeftLineLength * 10, currY);
			context.lineTo(currX - nLeftLineLength * 10, currY
					+ LeftChildVisualizer.GetNode().edgeweight * 10);
			context.stroke();
			
			LeftChildVisualizer.Draw(context, currX - nLeftLineLength * 10,
					currY + LeftChildVisualizer.GetNode().edgeweight * 10);

			context.beginPath();
			context.moveTo(currX, currY);
			context.lineTo(currX + nRightLineLength * 10, currY);
			context.lineTo(currX + nRightLineLength * 10, currY
					+ RightChildVisualizer.GetNode().edgeweight * 10);
			context.stroke();
			RightChildVisualizer.Draw(context, currX + nRightLineLength * 10,
					currY + RightChildVisualizer.GetNode().edgeweight * 10);
		}
	}
}
