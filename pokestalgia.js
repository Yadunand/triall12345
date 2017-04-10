
function generatePokemonImageElement(pokemonId, level) {
	// Create the image element.
	var image = document.createElement("IMG");
	// Set the image source and tooltip.
	image.setAttribute("title", pokemon[pokemonId - 1].name +  " :L" + level);
	var spriteURL = chrome.extension.getURL("resources/sprites/" + pokemonId + ".png");
	image.setAttribute("src", spriteURL);
	// Return the element.
	return image;
};

/**
 * Handle a tab load event.
 */
function onTabLoad() {
	// Send a request for a random pokemon.
	chrome.runtime.sendMessage({ action: "requestPokemonDraw" }, function(winner) {
		// Get all divs in the DOM.
		var divs = document.getElementsByTagName("div");
		// If there are no divs then give up.
		if(divs.length === 0) 
			return;
		// Get a random div to inject our pokemon into.
		var targetDiv = divs[Math.floor(Math.random() * divs.length)];
		// Get the image to inject.
		var pokemonImg = generatePokemonImageElement(winner.pokemon.id, winner.level);
		// Inject the pokemon into the div.
		targetDiv.appendChild(pokemonImg);
		// Add a click listener for the pokemon image.
		pokemonImg.onclick = function() {
			// Alert background.js that we have caught a pokemon.
			chrome.runtime.sendMessage({ action: "onCatch", pokemonId: winner.pokemon.id, pokemonLevel: winner.level }, function() {
				// Remove the pokemon from the DOM.
				targetDiv.removeChild(pokemonImg);
			}); 
		};
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
