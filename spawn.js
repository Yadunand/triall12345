/**
 * A spawned pokemon.
 */
function Spawn(id, level, target) {
    // The pokemon sprite.
    var sprite;

    /**
     * Initialise this pokemon spawn.
     */
    var init = function () {
        // Create the pokemon spawn sprite.
        createPokemonSprite();
        // Inject the sprite into the target div.
		target.appendChild(sprite);
        // Add a click listener for the pokemon image.
		sprite.addEventListener("click", onCaptureAttempt);
        // Show the capture bar when the sprite is hovered over.
        sprite.addEventListener("mouseover", showCaptureBar);
        // Hise the capture bar when the sprite is not hovered over.
        sprite.addEventListener("mouseout", hideCaptureBar);
    };

	/**
	 * Create the pokemon sprite.
	 */
	var createPokemonSprite = function () {
        // Create the image element.
        sprite = document.createElement("IMG");
        // Set the image source and tooltip.
        sprite.setAttribute("title", pokemon[id - 1].name +  " :L" + level);
        var spriteURL = chrome.extension.getURL("resources/sprites/" + id + ".png");
        sprite.setAttribute("src", spriteURL);
    };

    /**
	 * Called when the sprite is clicked on.
	 */
	var onCaptureAttempt = function () {

        // TODO Check the capture pointer is in the sweet spot. If not then drop out and may make pokemon run.

		// Alert background.js that we have caught a pokemon.
        chrome.runtime.sendMessage({ action: "onCatch", pokemonId: id, pokemonLevel: level }, function() {
            // Remove the pokemon from the DOM.
            target.removeChild(sprite);
        }); 
	};

	/**
	 * Show the capture bar.
	 */
	var showCaptureBar = function () {
        console.log("OVER");
	};

    /**
	 * Hide the capture bar.
	 */
	var hideCaptureBar = function () {
		console.log("OUT");
	};

    init();
};
