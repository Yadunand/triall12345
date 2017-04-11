/**
 * A generator for random pokemon.
 */
function PokemonGenerator(repository) {
	// The most up-to-date snapshot tickets.
	var ticketCache = [];

	/**
	 * Clamp the input level between 1 and 100.
	 * @param level to clamp.
	 */
	var clampLevel = function (level) {
		if (level < 1) {
			return 1;
		} else if (level > 100) {
			return 100;
		} else {
			return level;
		}
	};

	/**
	 * Draw a winning pokemon and level.
	 */
	this.draw = function () {
		// If the ticket cache is empty then it needs to be populated.
		if (ticketCache.length == 0)
			this.populateTicketCache();
		// Generate a level for the pokemon, can be up to 3 levels higher than trainer level.
		var levels = [0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,3];
		// Return the winning pokemon and it's level.
		return {
			pokemon: pokemon[ticketCache[Math.floor(Math.random() * ticketCache.length)]-1],
			level: clampLevel(repository.getTrainerLevel() + levels[Math.floor(Math.random() * levels.length)])
		}
	};

	/**
	 * Populate the ticket cache.
	 * @param The up-to-date capture details.
	 */
	this.populateTicketCache = function () {
		// Go over every pokemon and add their tickets.
		for (var id = 1; id <= 151; id++) {
			// Get the current pokemon.
			var currentPokemon = pokemon[id - 1];
			// Check whether this pokemon is an evolution ...
			if (currentPokemon.evolvesFrom) {
				var preEvolution = repository.getCaughtPokemonDetails(currentPokemon.evolvesFrom);
				// ... and if so whther there are 3 of the previous evolutions. If not then we cannot consider this pokemon.
				if (!(preEvolution && preEvolution.count >= 3))
					continue;
			}
			// Add the spawn tickets to the draw.
			for (var ticketCount = 0; ticketCount < currentPokemon.spawnTickets; ticketCount++) {
				ticketCache.push(id);
			}
		}
	};
};
