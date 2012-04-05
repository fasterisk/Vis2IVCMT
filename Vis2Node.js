function Vis2Node()
{
	/*
	 * Members
	 */

	// Name of the node (e.g. "A")
	this.name;

	// True, if this is a leaf
	this.isleaf;

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
		if (child.isleaf == true)
		{
			Debugger
					.log("child is leaf, so it is added to parents leaf node list");
			this.AddLeafNodeName(child.name);

		}
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
}