
function onTabLoad() {
	var randomPokemon = pokemon[Math.floor(Math.random() * 151)];
	document.write('pokemon: ' + randomPokemon.name + " about: " + randomPokemon.info);
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.action == 'tabLoad') {
	  onTabLoad();
	}
});
