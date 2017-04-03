var pokemon = [
	{id : 1, name: "bulbasaur", spawnTokens:4 }
];

function onTabLoad() {
	document.write('pokemon: ' + pokemon[0].name);
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.action == 'tabLoad') {
	  onTabLoad();
	}
});
