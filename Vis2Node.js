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
}