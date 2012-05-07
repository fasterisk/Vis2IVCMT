function ViewManager()
{
	this.measure = "leafbased";
	this.color1 = "#0000FF";
	this.color2 = "#6666FF";
	this.color3 = "#9999FF";
	this.color4 = "#CCCCFF";
	this.color5 = "#FFFFFF";
	this.color6 = "#FFCCCC";
	this.color7 = "#FF9999";
	this.color8 = "#FF6666";
	this.color9 = "#FF0000";

	/*
	 * Functions for public access
	 */
	this.DisplayColorMap = M_DisplayColorMap;
	this.ChangeMeasure = M_ChangeMeasure;
	this.ChangeColorMap = M_ChangeColorMap;

	/*
	 * Functions
	 */

	function M_DisplayColorMap(context)
	{
		context.fillStyle = this.color1;
		context.fillRect(0, 0, 10, 20);
		context.fillStyle = this.color2;
		context.fillRect(10, 0, 10, 20);
		context.fillStyle = this.color3;
		context.fillRect(20, 0, 10, 20);
		context.fillStyle = this.color4;
		context.fillRect(30, 0, 10, 20);
		context.fillStyle = this.color5;
		context.fillRect(40, 0, 10, 20);
		context.fillStyle = this.color6;
		context.fillRect(50, 0, 10, 20);
		context.fillStyle = this.color7;
		context.fillRect(60, 0, 10, 20);
		context.fillStyle = this.color8;
		context.fillRect(70, 0, 10, 20);
		context.fillStyle = this.color9;
		context.fillRect(80, 0, 10, 20);
	}
	function M_ChangeMeasure(newMeasure)
	{
		switch (newMeasure)
		{
		case "leafbased":// TODO
			this.measure = newMeasure;
			break;
		case "edgebased":// TODO
			this.measure = newMeasure;
			break;
		case "elementbased":// TODO
			this.measure = newMeasure;
			break;
		}
	}

	function M_ChangeColorMap(sColor1, sColor2)
	{
		this.color1 = sColor1;
		this.color2 = InterpolateColor(sColor1, this.color5, 102);
		this.color3 = InterpolateColor(sColor1, this.color5, 154);
		this.color4 = InterpolateColor(sColor1, this.color5, 205);
		this.color6 = InterpolateColor(sColor2, this.color5, 205);
		this.color7 = InterpolateColor(sColor2, this.color5, 154);
		this.color8 = InterpolateColor(sColor2, this.color5, 102);
		this.color9 = sColor2;
		Debugger.log(this.color1);
		Debugger.log(this.color2);
		Debugger.log(this.color3);
		Debugger.log(this.color4);
		Debugger.log(this.color5);
		Debugger.log(this.color6);
		Debugger.log(this.color7);
		Debugger.log(this.color8);
		Debugger.log(this.color9);
	}
}