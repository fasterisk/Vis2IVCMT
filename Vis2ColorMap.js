function Vis2ColorMap()
{
	var m_sColor1 = '#0000FF';
	var m_sColor2 = '#FF0000';
	
	//var m_nSteps = 10;
	
	function ItlValueToHex(hexvalue)
	{
		var value = parseInt(hexvalue, 10);
		value = Math.max(0, Math.min(value, 255));
		return "0123456789ABCDEF".charAt((value - value % 16) / 16)
				+ "0123456789ABCDEF".charAt(value % 16);
	}
	
	function ItlInterpolateColor(color1, color2, value)
	{
		var r1 = parseInt(color1.substring(1, 3), 16);
		var r2 = parseInt(color2.substring(1, 3), 16);
		var g1 = parseInt(color1.substring(3, 5), 16);
		var g2 = parseInt(color2.substring(3, 5), 16);
		var b1 = parseInt(color1.substring(5, 7), 16);
		var b2 = parseInt(color2.substring(5, 7), 16);
	
		var red = Math.round(r1 + ((r2 - r1) * value));
		var green = Math.round(g1 + ((g2 - g1) * value));
		var blue = Math.round(b1 + ((b2 - b1) * value));
	
		return '#' + ItlValueToHex(red) + ItlValueToHex(green) + ItlValueToHex(blue);
	}

	/*this.SetSteps = function(nSteps)
	{
		m_nSteps = nsteps;
	}*/
	
	this.SetColor1 = function(sColor)
	{
		m_sColor1 = sColor;
	}
	
	this.SetColor2 = function(sColor)
	{
		m_sColor2 = sColor;
	}
	
	this.GetColor = function(fValue)
	{
		assert (fValue >= 0.0 && fValue <= 1.0, "fValue out of bounds");
		
		return ItlInterpolateColor(m_sColor1, m_sColor2, fValue);	
	}
}
