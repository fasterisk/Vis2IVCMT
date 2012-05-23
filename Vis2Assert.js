/**
 * Tests the assertion and prints error message, if assertion failed
 * 
 * @param {bool} bAssertion The assertion
 * @param {string} sMessage The error message
 */
function assert(bAssertion, sMessage)
{
	var sFullMessage = 'Assertion failed: ' + sMessage;
	 
	if (bAssertion == false)
	{
		window.alert(sFullMessage);
		throw new Error('This is not an error. This is just to abort javascript');
	}
}
