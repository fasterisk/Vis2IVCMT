function Vis2Node()
{
	/*
	 * Members
	 */

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

	/*
	 * Function placeholder for public access
	 */

	this.AddChild = PushChild;
	this.AddLeafNodeName = PushLeafNodeName;
	this.numChildren = GetChildrenCount;
	this.BuildLeafList = CalcLeafList;

	/*
	 * Functions
	 */

	// Adds a child to this node
	function PushChild(child, weight)
	{
		Debugger.log("Adding child (" + child.name + ", " + weight + ", "
				+ (child.isleaf ? "isleaf" : "isnode") + ")");
		this.children.push(child);
		child.parent = this;
		child.edgeweight = weight;
	}

	// To be called when adding a leafnode - adds its name to all parents
	function PushLeafNodeName(lnname)
	{
		Debugger.log("Adding leaf name " + lnname + " to parent");
		this.leafnodes.push(lnname);
		if (this.parent != null)
		{
			this.parent.AddLeafNodeName(lnname);
		}
		else
		{
			Debugger.log("parent is null!");
		}
	}

	// Returns the number of children of this node
	function GetChildrenCount()
	{
		return this.children.length;
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