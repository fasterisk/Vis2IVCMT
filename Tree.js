function Vis2Node()
{
	this.name;
	this.parent;
	this.children = new Array();
	this.AddChild = PushChild;
	this.numChildren = GetChildrenCount;
	
	function PushChild(child)
	{
		this.children.push(child);
		child.parent = this;
	}
	
	function GetChildrenCount()
	{
		return this.children.length;
	}
}