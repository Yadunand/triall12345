
/**
 * Handle a tab load event.
 */
function onTabLoad() {
	// A pokemon should not spawn for every tab load, only 1 in 5.
	if (Math.floor(Math.random() * 5) !== 0)
		return;
	// Send a request for a random pokemon.
	chrome.runtime.sendMessage({ action: "requestPokemonDraw" }, function(winner) {
		// Get all divs in the DOM.
		var divs = document.getElementsByTagName("div");
		// If there are no divs then give up.
		if (divs.length === 0) 
			return;
		// Get a random div to inject our pokemon into.
		var targetDiv = divs[Math.floor(Math.random() * divs.length)];
		// Create our spawned pokemon.
		new Spawn(winner.pokemon.id, winner.level, targetDiv);
	}); 
};

/**
 * Listen for runtime messages.
 */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.action == 'tabLoad') {
	  onTabLoad();
	}
});
