function Vis2ColorMap() {

	var m_sOriginalColorMap_C1 = '#ef3033';
	var m_sOriginalColorMap_C2 = '#f25945';
	var m_sOriginalColorMap_C3 = '#f79854';
	var m_sOriginalColorMap_C4 = '#fcd776';
	var m_sOriginalColorMap_C5 = '#f6f8a9';
	var m_sOriginalColorMap_C6 = '#d2f0f1';
	var m_sOriginalColorMap_C7 = '#8fdae2';
	var m_sOriginalColorMap_C8 = '#5ab3d4';
	var m_sOriginalColorMap_C9 = '#3877c0';

	this.GetColor = function(fValue) {
		assert(fValue >= 0.0 && fValue <= 1.0, "fValue out of bounds");

		if (fValue <= 0.11111)
			return m_sOriginalColorMap_C1;
		else if (fValue <= 0.22222)
			return m_sOriginalColorMap_C2;
		else if (fValue <= 0.33333)
			return m_sOriginalColorMap_C3;
		else if (fValue <= 0.44444)
			return m_sOriginalColorMap_C4;
		else if (fValue <= 0.55555)
			return m_sOriginalColorMap_C5;
		else if (fValue <= 0.66666)
			return m_sOriginalColorMap_C6;
		else if (fValue <= 0.77777)
			return m_sOriginalColorMap_C7;
		else if (fValue <= 0.88888)
			return m_sOriginalColorMap_C8;
		else if (fValue <= 1.0)
			return m_sOriginalColorMap_C9;
		else
			assert (false, "fValue out of bounds");
	};

}
