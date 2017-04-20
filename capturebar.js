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
    // The capture bar pointer.
    var captureBarPointerElement;
    // The capture bar pointer movement unit.
    var pointerMovementUnit;

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
        captureBarElement           = document.createElement("div");
        captureBarElement.className = "capture-bar-container";
        // Create the capture bar pointer element.
        captureBarPointerElement           = document.createElement("img");
        captureBarPointerElement.className = "capture-bar-pointer";
	    captureBarPointerElement.setAttribute("src", chrome.extension.getURL("resources/capture_bar_pointer.png"));
        captureBarElement.appendChild(captureBarPointerElement);
    };

    /**
	 * Update the pointer bar.
	 */
	var tick = function () {
        // If the pointer is not active then do not move it.
        if (!isPointerActive)
            return;
        // Set the pointer movement unit if it hasn't been.
        if (!pointerMovementUnit)
            pointerMovementUnit = (captureBarElement.getBoundingClientRect().width - captureBarPointerElement.getBoundingClientRect().width) / 50;
        // Move the pointer position. Never above 50.
        pointerPosition = (pointerPosition == 50) ? 1 : pointerPosition + 1;
        // Move the pointer elements position in the capture bar. 
        captureBarPointerElement.setAttribute("style", "left:" + pointerPosition * pointerMovementUnit + "px;");
        // Call tick again in next 10 ms.
        setTimeout(tick, 10);
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

    /**
	 * Get the capture bar element.
	 */
	this.getCaptureBarElement = function () {
        return captureBarElement;
	};

    init();
};
