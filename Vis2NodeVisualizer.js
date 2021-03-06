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
	var nHeightNeeded = undefined;

	/* private methods */
	function ItlCalculateNeededSpace() {
		if(Node.isleaf) {
			nLeftSpaceNeeded = 1;
			nRightSpaceNeeded = 1;
			nLeftLineLength = 0;
			nRightLineLength = 0;
			nHeightNeeded = Node.edgeweight * 10;
		} else {
			// children[0] is left child, children[1] is right child
			LeftChildVisualizer = new Vis2NodeVisualizer(Node.children[0]);
			RightChildVisualizer = new Vis2NodeVisualizer(Node.children[1]);

			nLeftSpaceNeeded = LeftChildVisualizer.GetWidth();
			nRightSpaceNeeded = RightChildVisualizer.GetWidth();

			nLeftLineLength = LeftChildVisualizer.GetRightSpaceNeeded();
			nRightLineLength = RightChildVisualizer.GetLeftSpaceNeeded();

			if(Node.parent != undefined)
				nHeightNeeded = Math.max(LeftChildVisualizer.GetHeightNeeded(), RightChildVisualizer.GetHeightNeeded()) + Node.edgeweight * 10;
			else
				nHeightNeeded = Math.max(LeftChildVisualizer.GetHeightNeeded(), RightChildVisualizer.GetHeightNeeded());
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

	this.GetHeightNeeded = function() {
		assert(nHeightNeeded != undefined, "value not initialized");

		return nHeightNeeded;
	};

	this.GetNode = function() {
		return Node;
	};

	this.Draw = function(context, sMeasureString, currX, currY, bInitialDrawCall) {
		var nSizeMultiplier = 9;
		var nLineWidth = 0.4 * nSizeMultiplier;
		var nodeRadius = 0.5 * nSizeMultiplier;
		
		var aRenderedNodes = new Array();

		var sMeasureColor = undefined;

		if(bInitialDrawCall) {
			var fXDiff = this.GetRightSpaceNeeded() - this.GetLeftSpaceNeeded();
			currX -= fXDiff * 5;
		}

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
			context.font = nSizeMultiplier + "px sans-serif";
			context.fillText(Node.name, currX - 0.5 * nSizeMultiplier, currY + 1.5 * nSizeMultiplier);
		}
		else if(Node.bIsCollapsed) {
			// do nothing 
		} else {
			sMeasureColor = window.ColorMap.GetColor(fMeasure);

			assert(LeftChildVisualizer != undefined, "NodeVisualizer not correctly initialized");
			assert(RightChildVisualizer != undefined, "NodeVisualizer not correctly initialized");
			assert(sMeasureColor != undefined, "sMeasureColor not defined");

			
			
			
			context.strokeStyle = sMeasureColor;

			// draw thick lines
			context.lineWidth = nLineWidth;

			context.beginPath();
			context.moveTo(currX, currY);
			context.lineTo(currX - nLeftLineLength * nSizeMultiplier, currY);
			context.lineTo(currX - nLeftLineLength * nSizeMultiplier, currY + LeftChildVisualizer.GetNode().edgeweight * nSizeMultiplier);
			context.stroke();

			context.beginPath();
			context.moveTo(currX, currY);
			context.lineTo(currX + nRightLineLength * nSizeMultiplier, currY);
			context.lineTo(currX + nRightLineLength * nSizeMultiplier, currY + RightChildVisualizer.GetNode().edgeweight * nSizeMultiplier);
			context.stroke();

			// draw thin lines
			context.lineWidth = 1;

			if(Node.bIsSelected) {
				context.strokeStyle = "#F0F";
			} else
				context.strokeStyle = "#000";

			context.beginPath();
			context.moveTo(currX, currY - nLineWidth / 2);
			context.lineTo(currX - nLeftLineLength * nSizeMultiplier - nLineWidth / 2, currY - nLineWidth / 2);
			context.lineTo(currX - nLeftLineLength * nSizeMultiplier - nLineWidth / 2, currY + LeftChildVisualizer.GetNode().edgeweight * nSizeMultiplier);
			context.stroke();

			context.beginPath();
			context.moveTo(currX, currY + nLineWidth / 2);
			context.lineTo(currX - nLeftLineLength * nSizeMultiplier + nLineWidth / 2, currY + nLineWidth / 2);
			context.lineTo(currX - nLeftLineLength * nSizeMultiplier + nLineWidth / 2, currY + LeftChildVisualizer.GetNode().edgeweight * nSizeMultiplier);
			context.stroke();

			context.beginPath();
			context.moveTo(currX, currY - nLineWidth / 2);
			context.lineTo(currX + nRightLineLength * nSizeMultiplier + nLineWidth / 2, currY - nLineWidth / 2);
			context.lineTo(currX + nRightLineLength * nSizeMultiplier + nLineWidth / 2, currY + RightChildVisualizer.GetNode().edgeweight * nSizeMultiplier);
			context.stroke();

			context.beginPath();
			context.moveTo(currX, currY + nLineWidth / 2);
			context.lineTo(currX + nRightLineLength * nSizeMultiplier - nLineWidth / 2, currY + nLineWidth / 2);
			context.lineTo(currX + nRightLineLength * nSizeMultiplier - nLineWidth / 2, currY + RightChildVisualizer.GetNode().edgeweight * nSizeMultiplier);
			context.stroke();

			// render left children and store returned information about rendered nodes
			var aRenderedNodesLeft = LeftChildVisualizer.Draw(context, sMeasureString, currX - nLeftLineLength * nSizeMultiplier, currY + LeftChildVisualizer.GetNode().edgeweight * nSizeMultiplier, false);

			// render right children and store returned information about rendered nodes
			var aRenderedNodesRight = RightChildVisualizer.Draw(context, sMeasureString, currX + nRightLineLength * nSizeMultiplier, currY + RightChildVisualizer.GetNode().edgeweight * nSizeMultiplier, false);

			// concat arrays to get 1 array containing the currently rendered node and all rendered child nodes
			aRenderedNodes = aRenderedNodes.concat(aRenderedNodesLeft, aRenderedNodesRight);
		}

		context.fillStyle = sMeasureColor;

		if(Node.bIsSelected) { {
				context.strokeStyle = "#F0F";
				context.fillStyle = "#F0F";
			}

		} else
			context.strokeStyle = "#000";

		if (Node.bIsCollapsed == false || Node.isleaf)
		{
		// draw arc
		context.beginPath();
		context.arc(currX, currY, nodeRadius, 0, Math.PI * 2, true);
		context.closePath();
		context.fill();
		context.stroke();	
		}
		else
		{
		context.strokeStyle = "#000";
		context.fillStyle = "#0F0";
				
		// draw arc
		context.beginPath();
		context.moveTo(currX - nodeRadius, currY - nodeRadius);
		context.lineTo(currX + nodeRadius, currY - nodeRadius);
		context.lineTo(currX + nodeRadius, currY + nodeRadius);
		context.lineTo(currX - nodeRadius, currY + nodeRadius);
		context.closePath();
		context.fill();
		context.stroke();	
		}
		

		if(fMeasure != undefined) {
			sMeasureColor = window.ColorMap.GetColor(fMeasure);

			context.fillStyle = '#000';
			context.font = nSizeMultiplier + "px sans-serif";
			context.fillText(fMeasure.toPrecision(2), currX + 0.5 * nSizeMultiplier, currY - 0.4 * nSizeMultiplier);
		}

		return aRenderedNodes;
	};
}
