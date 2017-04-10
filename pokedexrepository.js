/**
 * A repository for storing pokedex insformation in browser storage.
 */
function PokedexRepository () {
    // The most up-to-date snapshot of all caught pokemon details. Updated dynamically.
    var cachedCaptureDetails = {};

    /**
     * Populate the capture details cache with the most up-to-date capture info from storage. 
     */
    var populateCaptureDetailsCache = function () {
        chrome.storage.sync.get(null, function (details) {
            var detailsContainer = {};
            // Go over all available ids and add capture details to cache.
            for (var id = 1; id <= 151; id++) {
                // Try to get capture info regarding this pokemon from storage.
                var captureDetails = details[id];
                // Only add capture details to cache if we have any.
                if (captureDetails) {
                    detailsContainer[id] = captureDetails;
                }
            }
            cachedCaptureDetails = detailsContainer;
            // We need to notify listeners that the capture details have changed.
            chrome.runtime.sendMessage({ action: "onCaptureDetailsUpdated", details: cachedCaptureDetails }, function() {}); 
        });
    };

    /**
     * Get capture information from storage for a pokemon.
     * @param id The id of the pokemon.
     */
    this.getCaughtPokemonDetails = function (id) {
        return cachedCaptureDetails[id];
    };

    /**
     * Get capture information information from storage for all pokemon.
     */
    this.getAllCaughtPokemonDetails = function () {
        return cachedCaptureDetails;
    };

    /**
     * Get the number of unique pokemon owned.
     */
    this.getOwnedCount = function () {
        return Object.keys(cachedCaptureDetails).length;
    };

    /**
     * Add a caught pokemon to storage.
     */
    this.addCaughtPokemon = function (id, level) {
        // Try to get capture info regaring this pokemon from storage.
        var captureDetails = this.getCaughtPokemonDetails(id);
        // If we have caught this pokemon before ...
        if (captureDetails) {
            // ... update the details and store them.
            captureDetails.highestlvl = level > captureDetails.highestlvl ? level : captureDetails.highestlvl;
            captureDetails.count      = captureDetails.count + 1;
        } else {
            // ... create new details and store them.
            captureDetails = { highestlvl: level, count: 1 };
        }
        var captureDetailsContainer  = {};
        captureDetailsContainer[id] = captureDetails
        // Commit change/addition to storage.
        chrome.storage.sync.set(captureDetailsContainer, function() { });
        // Update the capture details cache.
        populateCaptureDetailsCache();
    };

    // Set the intial capture details cache.
    populateCaptureDetailsCache();
};
