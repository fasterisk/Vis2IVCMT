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
	this.parent = undefined;

	// Weight of the edge between parent and this node
	this.edgeweight;
	
	// Accumulated weight of all edges between root node and this node
	this.accedgeweight = 0;

	// Array of the children
	this.children = new Array();

	// Variables needed for coordinates/drawing
	this.leftSpaceNeeded;
	this.rightSpaceNeeded;
	this.leftLineLength;
	this.rightLineLength;

	// variables for holding measures
	this.leafmeasure;
	this.elementmeasure;
	this.edgemeasure;
	this.averageleafmeasure;
	this.averageelementmeasure;
	this.averageedgemeasure;
	
	this.bIsSelected;

	/*
	 * Functions
	 */

	// Adds a child to this node
	this.AddChild = function (child, weight)
	{
		// Debugger.log("Adding child (" + child.name + ", " + weight + ", "
		// + (child.isleaf ? "isleaf" : "isnode") + ")");
		this.children.push(child);
		child.parent = this;
		child.edgeweight = weight;
		child.accedgeweight = this.accedgeweight + weight;
	};

	// Returns the number of children of this node
	this.GetChildrenCount = function()
	{
		return this.children.length;
	};

	// returns an array list with all nodes under the current node
	this.GetNodeList = function()
	{
		var ReturnList = new Array();

		ReturnList.push(this);

		for ( var i = 0; i < this.children.length; i++)
		{
			var child = this.children[i];

			if (child.GetChildrenCount() != 0)
			{
				ReturnList = ReturnList.concat(child.GetNodeList());
				// ReturnList.push(child);
			}

		}

		return ReturnList;
	};

}