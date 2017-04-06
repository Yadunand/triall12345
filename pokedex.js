
/**
 * Called when the pokedex popup is loaded.
 */
function onPokedexOpen() {
    // When the page is opened we need to send a request for capdute data from our backgrond script.
    chrome.runtime.sendMessage({ action: "pokedexDataRequest" }, function(data) {
        populatePokedex(data);
    }); 
}

/**
 * Populate the pokedex with all of the necessary information.
 */
function populatePokedex(data) {
    // Firstly, populate the pokedex list.
    var pokedexListContainer = document.getElementById("pokedex-list-container");
    for (var id = 1; id <= 151; id++) {
       pokedexListContainer.appendChild(createPokedexListItem(data.pokemon[id-1], data.captureInfo[id]));
    }

    // ...

}

/**
 * Populate the pokedex with all of the necessary information.
 */
function createPokedexListItem(pokemon, captureData) {
    var item                        = document.createElement("DIV");
    var itemIdContainer             = document.createElement("DIV");
    var itemPokeballContainer       = document.createElement("DIV");
    var itemNameContainer           = document.createElement("DIV");
    item.className                  = "pokedex-list-item";
    itemIdContainer.className       = "pokedex-list-item-id-container";
    itemPokeballContainer.className = "pokedex-list-item-pokeball-container";
    itemNameContainer.className     = "pokedex-list-item-name-container";
    item.appendChild(itemIdContainer);
    item.appendChild(itemPokeballContainer);
    item.appendChild(itemNameContainer);
    // Set the padded pokemon id. 
    itemIdContainer.innerHTML = "<p>"+ applyPokemonIdPadding(pokemon.id) +"</p>";
    // If we have capture data add the 'caught' class to the itemPokeballContainer for pokeball background.
    if (captureData)
        itemPokeballContainer.className = itemPokeballContainer.className += " caught";
    // If we have capture data then we have caught this pokemon, otherwise it is an empty slot.
    var pokemonName = captureData ? pokemon.name.toUpperCase() : "-------------";
    itemNameContainer.innerHTML = "<p>"+ pokemonName +"</p>";
    // Add a click listener for the pokemon entry, only if there is one.
    if (captureData) {
        item.onclick = function() { onPokedexEntryClick(pokemon, captureData); };
    }
    // Return our created list item.
    return item;
}

/**
 * Called when a caught pokemon entry is clicked.
 */
function onPokedexEntryClick(pokemon, captureData) {
     alert(pokemon.name);
}

/**
 * Convenience function for padding pokemon ids to three digits.
 */
function applyPokemonIdPadding(id) {
    var rawId = id + "";
    while(rawId.length < 3) {
        rawId = "0"+rawId;
    }
    return rawId;
}

window.onload = function() { onPokedexOpen(); }