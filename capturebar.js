/**
 * The capture bar of a spawned pokemon.
 */
function CaptureBar(difficulty) {
    // The pointer position, between 1 and 50.
    var pointerPosition = 1;
    // Whether the pointer is actively moving.
    var isPointerActive = true;
    // The capture bar.
    var captureBarElement;

    /**
     * Initialise this pokemon spawn.
     */
    var init = function () {
        // Create the capture bar.
        createCaptureBar();
    };

	/**
	 * Create the capture bar.
	 */
	var createCaptureBar = function () {
        // Create the capture bar element.
        captureBarElement = document.createElement("div");
        // ...
    };

    /**
	 * Update the pointer bar.
	 */
	var tick = function () {
        // If the pointer is not active then do not move it.
        if (!isPointerActive)
            return;
        // Move the pointer position. Never above 50.
        pointerPosition = (pointerPosition == 50) ? 1 : pointerPosition + 1;

        // TODO Move the pointer elements position in the capture bar. 

        // Call tick again in next 50 ms.
        setTimeout(tick, 50);
    };

    /**
	 * Returns whether the pointer is in the capture area or the capture bar.
	 */
	this.isInCapturePosition = function () {
        switch(difficulty) {
            case "easy":
                return pointerPosition >= 35;
            case "medium":
                return pointerPosition >= 40;
            case "hard":
                return pointerPosition >= 45;
            default:
                return false;
        }
	};

    /**
	 * Start the capture bar pointer.
	 */
	this.startPointerTick = function () {
        tick();
	};

	/**
	 * Stop the capture bar pointer.
	 */
	this.stopPointerTick = function () {
        isPointerActive = false;
	};

    init();
};
