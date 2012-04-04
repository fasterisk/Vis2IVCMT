function Vis2Node()
{
	//Name of the node (e.g. "A")
	this.name;
	
	//Parent of the node
	this.parent;
	
	//Weight of the edge between parent and this node
	this.edgeweight;
	
	//Array of the children
	this.children = new Array();
	
	//Variable/function to access PushChild function
	this.AddChild = PushChild;
	
	//Variable/function to access GetChildrenCount function
	this.numChildren = GetChildrenCount;
	
	//Adds a child to this node
	function PushChild(child, weight)
	{
		this.children.push(child);
		child.parent = this;
		child.edgeweight = weight;
	}
	
	//Returns the number of children of this node
	function GetChildrenCount()
	{
		return this.children.length;
	}
}