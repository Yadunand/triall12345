/**
 * A spawned pokemon.
 */
function Spawn(id, level, target) {
    // The pokemon sprite.
    var sprite;
    // The pokemon sprite container.
    var spriteContainer;
    // The pokemon capture bar.
    var captureBar;

    /**
     * Initialise this pokemon spawn.
     */
    var init = function () {
        // Create the pokemon spawn sprite.
        createPokemonSprite();
        // Create a container for the sprite.
        spriteContainer           = document.createElement("DIV");
        spriteContainer.className = "spawn-container";
        // Inject the sprite into the target container.
		spriteContainer.appendChild(sprite);
        // Inject the sprite container into the target div.
		target.appendChild(spriteContainer);
        // Add a click listener for the pokemon image.
		sprite.addEventListener("mousedown", onCaptureAttempt);
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
        // Check the capture pointer is in the sweet spot. If not then drop out and may make pokemon run.
        if (captureBar && captureBar.isInCapturePosition()) {
            // Alert background.js that we have caught a pokemon.
            chrome.runtime.sendMessage({ action: "onCatch", pokemonId: id, pokemonLevel: level }, function() {
                // Remove the pokemon from the DOM.
                target.removeChild(spriteContainer);
                // We no longer need the capture bar.
                hideCaptureBar();
            });
        } else {
            // We missed our shot, will the pokemon run away?
        }
	};

	/**
	 * Show the capture bar.
	 */
	var showCaptureBar = function () {
        // Create the capture bar.
        captureBar = new CaptureBar("easy");
        // Add the capture bar element to the sprite container.
		spriteContainer.appendChild(captureBar.getCaptureBarElement());
        // Start the capture bar pointer tick.
        captureBar.startPointerTick();
	};

    /**
	 * Hide the capture bar.
	 */
	var hideCaptureBar = function () {
        // Check that we have a capture bar, just in case.
        if (captureBar) {
            // Remove the capture bar element from the sprite container.
		    spriteContainer.removeChild(captureBar.getCaptureBarElement());
            // Stop the capture bar pointer tick.
            captureBar.stopPointerTick();
            captureBar = null;
        }
	};

    init();
};
