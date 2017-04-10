/**
 * A generator for random pokemon.
 */
function PokemonGenerator(repository) {
	// The most up-to-date snapshot tickets.
	var ticketCache = [];

	/**
	 * Draw a winning ticket.
	 */
	this.draw = function () {
		// If the ticket cache is empty then it needs to be populated.
		if (ticketCache.length == 0)
			this.populateTicketCache();
		// Return the winning pokemon.
		return pokemon[ticketCache[Math.floor(Math.random() * ticketCache.length)]-1];
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

			// TODO Check whether this pokemon is an avolution and if so whther there are 3 of the previous.

			// Add the spawn tickets to the draw.
			for (var ticketCount = 0; ticketCount < currentPokemon.spawnTickets; ticketCount++) {
				ticketCache.push(id);
			}
		}
	};
};
