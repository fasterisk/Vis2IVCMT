function Views()
{
	this.measure = "leafbased";

	/*
	 * Functions for public access
	 */
	this.ChangeMeasure = M_ChangeMeasure;

	/*
	 * Functions
	 */
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
}