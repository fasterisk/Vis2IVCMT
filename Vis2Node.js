/**
* Create a new instance of Vis2Node.
*
* @classDescription This class creates a new Vis2Node.
* @return {Vis2Node}   Returns a new Node.
* @type {Object}
* @constructor  
*/
function Vis2Node()
{
	/*
	 * Members
	 */

	// ID
	this.id;

	// Name of the node (e.g. "A")
	this.name;

	// Parent of the node
	this.parent;

	// Weight of the edge between parent and this node
	this.edgeweight;

	// Array of the children
	this.children = new Array();

	// Array that contains all names of leafnodes further down this node
	this.leafnodes = new Array();

	this.isleaf;

	// Variables needed for coordinates/drawing
	this.leftSpaceNeeded;
	this.rightSpaceNeeded;
	this.leftLineLength;
	this.rightLineLength;

	// variables for holding measures
	this.leafmeasure;
	this.elementmeasure;
	this.edgemeasure;

	/*
	 * Function placeholder for public access
	 */

	this.AddChild = PushChild;
	this.AddLeafNodeName = PushLeafNodeName;
	this.GetNodeList = GetNodeList;
	this.numChildren = GetChildrenCount;
	this.BuildLeafList = CalcLeafList;
	this.BuildNeededSpace = CalcNeededSpace;
	this.Draw = DrawTree;

	/*
	 * Functions
	 */

	// Adds a child to this node
	function PushChild(child, weight)
	{
		// Debugger.log("Adding child (" + child.name + ", " + weight + ", "
		// + (child.isleaf ? "isleaf" : "isnode") + ")");
		this.children.push(child);
		child.parent = this;
		child.edgeweight = weight;
	}

	// To be called when adding a leafnode - adds its name to all parents
	function PushLeafNodeName(lnname)
	{
		// Debugger.log("Adding leaf name " + lnname + " to parent");
		this.leafnodes.push(lnname);
		if (this.parent != null)
		{
			this.parent.AddLeafNodeName(lnname);
		}
		else
		{
			// Debugger.log("parent is null!");
		}
	}

	// Returns the number of children of this node
	function GetChildrenCount()
	{
		return this.children.length;
	}

	// returns an array list with all nodes under the current node
	function GetNodeList()
	{
		var ReturnList = new Array();

		ReturnList.push(this);

		for ( var i = 0; i < this.children.length; i++)
		{
			var child = this.children[i];

			if (child.numChildren() != 0)
			{
				ReturnList = ReturnList.concat(child.GetNodeList());
				// ReturnList.push(child);
			}

		}

		return ReturnList;
	}

	// Builds leaflists for all nodes (only call this starting from a root)
	function CalcLeafList()
	{
		for ( var i = 0; i < this.children.length; i++)
		{
			var child = this.children[i];
			if (child.numChildren() == 0)
			{
				child.parent.AddLeafNodeName(child.name);
			}
			else
			{
				child.BuildLeafList();
			}
		}
	}

	// Calculates the space needed to draw the tree
	function CalcNeededSpace()
	{
		if (this.isleaf)
		{
			this.leftSpaceNeeded = 1;
			this.rightSpaceNeeded = 1;
			this.leftLineLength = 0;
			this.rightLineLength = 0;
		}
		else
		{
			// children[0] is left child, children[1] is right child
			this.children[0].BuildNeededSpace();
			this.children[1].BuildNeededSpace();
			this.leftSpaceNeeded = this.children[0].leftSpaceNeeded
					+ this.children[0].rightSpaceNeeded;
			this.rightSpaceNeeded = this.children[1].leftSpaceNeeded
					+ this.children[1].rightSpaceNeeded;
			this.leftLineLength = this.children[0].rightSpaceNeeded;
			this.rightLineLength = this.children[1].leftSpaceNeeded;
		}
		// Debugger.log("NodeID: " + this.id
		// + " needs following spaces(LSN, RSN, LLL, RLL): ("
		// + this.leftSpaceNeeded + ", " + this.rightSpaceNeeded + ", "
		// + this.leftLineLength + ", " + this.rightLineLength + ")");
	}

	function DrawTree(context, currX, currY)
	{
		// Debugger.log("drawing node: " + this.id);
		var nodeRadius = 5;

		// Draw node as a circle
		context.beginPath();
		context.arc(currX, currY, nodeRadius, 0, Math.PI * 2, true);
		context.closePath();
		context.fill();

		if (this.isleaf)
		{
			context.font = "10px sans-serif";
			context.fillText(this.name, currX - 5, currY + 15);
		}
		else
		{
			context.beginPath();
			context.moveTo(currX, currY);
			context.lineTo(currX - this.leftLineLength * 10, currY);
			context.lineTo(currX - this.leftLineLength * 10, currY
					+ this.children[0].edgeweight * 10);
			context.stroke();
			this.children[0].Draw(context, currX - this.leftLineLength * 10,
					currY + this.children[0].edgeweight * 10);

			context.beginPath();
			context.moveTo(currX, currY);
			context.lineTo(currX + this.rightLineLength * 10, currY);
			context.lineTo(currX + this.rightLineLength * 10, currY
					+ this.children[1].edgeweight * 10);
			context.stroke();
			this.children[1].Draw(context, currX + this.rightLineLength * 10,
					currY + this.children[1].edgeweight * 10);
		}
	}
}