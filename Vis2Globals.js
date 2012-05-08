Debugger.log("Adding Window-Eventlistener");
window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded()
{
	if (!canvasSupport())
	{
		Debugger.log("Canvas is not supported!");
		return;
	}
	RightPaneCanvas();
}
