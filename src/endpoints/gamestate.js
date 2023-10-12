export async function GET(req, res) {
    // connects to database to get game state of the user
    // associated with this request's session.

    /**
     * Game State Model:
     * {
     *      activePlayerName: [string | None]
     *      territories: {... all the territories in the game}
     *      timeSinceLastTurn: [milliseconds]
     *      winnerName: [string | None]
     * }
     */
}