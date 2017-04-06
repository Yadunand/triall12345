// Create a new pokedex repository.
var repository = new PokedexRepository();

/**
 * Listen for tab loaded events.
 */
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    // This tab has loaded, pass message on to content script.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, { action: "tabLoad" }, function(response) {});  
    });
  }
});

/** 
 * Listen for messages from other scripts.
 */
chrome.runtime.onMessage.addListener(
  function(msg, sender, sendResponse) {
    // Listen for messages sent when a pokemon is caught.
    if (msg.action == "onCatch") {
      // Persist this information to storage.
      repository.addCaughtPokemon(msg.pokemonId, msg.pokemonLevel);
      // Send a response.
      sendResponse(repository.getAllCaughtPokemonDetails());
    }
    // Listen for requests from the pokedex popup script for capture data.
    if (msg.action == "pokedexDataRequest") {
      // Send the requested data in the response.
      sendResponse({
        pokemon: pokemon,
        captureInfo: repository.getAllCaughtPokemonDetails(),
        trainerLevel: 1, // TODO Figure a way to calculate this.
        owned: repository.getOwnedCount()
      });
    }
});