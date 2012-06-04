function TItlRenderedNodeInformation(x, y, fRadius, rNode) {
	this.x = x;
	this.y = y;
	this.radius = fRadius;
	this.rNode = rNode;
}

function Vis2NodeVisualizer(rNode) {
	assert(rNode != undefined, "node not specified!");

	/* private members */
	var Node = rNode;

	var LeftChildVisualizer = undefined;
	var RightChildVisualizer = undefined;

	var nLeftSpaceNeeded = undefined;
	var nRightSpaceNeeded = undefined;
	var nLeftLineLength = undefined;
	var nRightLineLength = undefined;

	/* private methods */
	function ItlCalculateNeededSpace() {
		if(Node.isleaf) {
			nLeftSpaceNeeded = 1;
			nRightSpaceNeeded = 1;
			nLeftLineLength = 0;
			nRightLineLength = 0;
		} else {
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

	this.GetWidth = function() {
		assert(nLeftSpaceNeeded != undefined && nRightSpaceNeeded != undefined, "values not correctly initialized");

		return nLeftSpaceNeeded + nRightSpaceNeeded;
	};

	this.GetLeftSpaceNeeded = function() {
		assert(nLeftSpaceNeeded != undefined, "value not initialized");

		return nLeftSpaceNeeded;
	};

	this.GetRightSpaceNeeded = function() {
		assert(nRightSpaceNeeded != undefined, "value not initialized");

		return nRightSpaceNeeded;
	};

	this.GetNode = function() {
		return Node;
	};

	this.Draw = function(context, sMeasureString, currX, currY, bSelected) {
		var nodeRadius = 5;
		var aRenderedNodes = new Array();

		var sMeasureColor = undefined;

		// Draw node as a circle

		// make sure that either leaf/element/edge is selected as measure, or none (for reference tree)
		assert(sMeasureString == 'leaf' || sMeasureString == 'element' || sMeasureString == 'edge' || sMeasureString == '' || sMeasureString == 'leafaverage' || sMeasureString == 'elementaverage' || sMeasureString == 'edgeaverage', "no valid measure string");

		var fMeasure = undefined;

		if(sMeasureString == 'leaf')
			fMeasure = Node.leafmeasure;
		else if(sMeasureString == 'element')
			fMeasure = Node.elementmeasure;
		else if(sMeasureString == 'edge')
			fMeasure = Node.edgemeasure;
		else if(sMeasureString == 'leafaverage')
			fMeasure = Node.averageleafmeasure;
		else if(sMeasureString == 'edgeaverage')
			fMeasure = Node.averageedgemeasure;
		else if(sMeasureString == 'elementaverage')
			fMeasure = Node.averageelementmeasure;

		// store information about currently rendered node (the arc)
		aRenderedNodes.push(new TItlRenderedNodeInformation(currX, currY, nodeRadius, Node));

		if(Node.isleaf) {
			sMeasureColor = "#000";

			context.fillStyle = sMeasureColor;
			context.font = "10px sans-serif";
			context.fillText(Node.name, currX - 5, currY + 15);
		} else {
			sMeasureColor = window.ColorMap.GetColor(fMeasure);

			assert(LeftChildVisualizer != undefined, "NodeVisualizer not correctly initialized");
			assert(RightChildVisualizer != undefined, "NodeVisualizer not correctly initialized");
			assert(sMeasureColor != undefined, "sMeasureColor not defined");

			var nLineWidth = 4;
			context.strokeStyle = sMeasureColor;

			// draw thick lines
			context.lineWidth = nLineWidth;

			context.beginPath();
			context.moveTo(currX, currY);
			context.lineTo(currX - nLeftLineLength * 10, currY);
			context.lineTo(currX - nLeftLineLength * 10, currY + LeftChildVisualizer.GetNode().edgeweight * 10);
			context.stroke();

			context.beginPath();
			context.moveTo(currX, currY);
			context.lineTo(currX + nRightLineLength * 10, currY);
			context.lineTo(currX + nRightLineLength * 10, currY + RightChildVisualizer.GetNode().edgeweight * 10);
			context.stroke();

			// draw thin lines
			context.lineWidth = 1;

			if(Node.bIsSelected) {
				context.strokeStyle = "#F0F";
				//bSelected = true;
			} else
				context.strokeStyle = "#000";

			context.beginPath();
			context.moveTo(currX, currY - nLineWidth / 2);
			context.lineTo(currX - nLeftLineLength * 10 - nLineWidth / 2, currY - nLineWidth / 2);
			context.lineTo(currX - nLeftLineLength * 10 - nLineWidth / 2, currY + LeftChildVisualizer.GetNode().edgeweight * 10);
			context.stroke();

			context.beginPath();
			context.moveTo(currX, currY + nLineWidth / 2);
			context.lineTo(currX - nLeftLineLength * 10 + nLineWidth / 2, currY + nLineWidth / 2);
			context.lineTo(currX - nLeftLineLength * 10 + nLineWidth / 2, currY + LeftChildVisualizer.GetNode().edgeweight * 10);
			context.stroke();

			context.beginPath();
			context.moveTo(currX, currY - nLineWidth / 2);
			context.lineTo(currX + nRightLineLength * 10 + nLineWidth / 2, currY - nLineWidth / 2);
			context.lineTo(currX + nRightLineLength * 10 + nLineWidth / 2, currY + RightChildVisualizer.GetNode().edgeweight * 10);
			context.stroke();

			context.beginPath();
			context.moveTo(currX, currY + nLineWidth / 2);
			context.lineTo(currX + nRightLineLength * 10 - nLineWidth / 2, currY + nLineWidth / 2);
			context.lineTo(currX + nRightLineLength * 10 - nLineWidth / 2, currY + RightChildVisualizer.GetNode().edgeweight * 10);
			context.stroke();

			// render left children and store returned information about rendered nodes
			var aRenderedNodesLeft = LeftChildVisualizer.Draw(context, sMeasureString, currX - nLeftLineLength * 10, currY + LeftChildVisualizer.GetNode().edgeweight * 10, bSelected);

			// render right children and store returned information abour rendered nodes
			var aRenderedNodesRight = RightChildVisualizer.Draw(context, sMeasureString, currX + nRightLineLength * 10, currY + RightChildVisualizer.GetNode().edgeweight * 10, bSelected);

			// concat arrays to get 1 array containing the currently rendered node and all rendered child nodes
			aRenderedNodes = aRenderedNodes.concat(aRenderedNodesLeft, aRenderedNodesRight);
		}

		context.fillStyle = sMeasureColor;

		if(Node.bIsSelected ) {
			{
			context.strokeStyle = "#F0F";
			context.fillStyle = "#F0F";	
			}
			
		} else
			context.strokeStyle = "#000";

		// draw arc
		context.beginPath();
		context.arc(currX, currY, nodeRadius, 0, Math.PI * 2, true);
		context.closePath();
		context.fill();
		context.stroke();

		if(fMeasure != undefined) {
			sMeasureColor = window.ColorMap.GetColor(fMeasure);

			context.fillStyle = '#000';
			context.font = "10px sans-serif";
			context.fillText(fMeasure.toPrecision(2), currX + 5, currY - 4);
		}

		return aRenderedNodes;
	};
}
