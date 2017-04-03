
function generatePokemonImageElement(pokemonId, level) {
	// Create the image element.
	var image = document.createElement("IMG");
	// Set the image source and tooltip.
	image.setAttribute("title", pokemon[pokemonId - 1].name +  " :L" + level);
	var spriteURL = chrome.extension.getURL("sprites/" + pokemonId + ".png");
	image.setAttribute("src", spriteURL);
	// Add a click listener for the pokemon image.
	image.onclick = function() { onPokemonClick(pokemonId) };
	// Return the element.
	return image;
};

function onPokemonClick(pokemonId) {
	alert("clicked!");
};

function onTabLoad() {
	// Get the id of a random pokemon.
	var randomPokemon = pokemon[Math.floor(Math.random() * 151)];
	// Get all divs in the DOM.
	var divs = document.getElementsByTagName("div");
	// If there are no divs then give up.
	if(divs.length === 0) 
		return;
	// Get a random div and inject our pokemon into it.
	divs[Math.floor(Math.random() * divs.length)].appendChild(generatePokemonImageElement(randomPokemon.id, 1));
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.action == 'tabLoad') {
	  onTabLoad();
	}
});
