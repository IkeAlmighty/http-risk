import jwt from 'jsonwebtoken';

export async function GET(req, res) {
    // set the game state to reflect the next player in
    // turn order to be the active player.

    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const db = global.fastify.mongo.db;
        const gamestate = await db.collection('games').findOne({ _id: decoded.gameId });

        // don't allow anybody but the active player to end the turn:
        if (decoded.username !== gamestate.activePlayerName) {
            res.send({ error: `only the currently active player, ${gamestate.activePlayerName}, can end the turn` })
            return;
        }

        // find the index of the active player based on username
        let activePlayerIndex = gamestate.players.reduce((prev, curr, index) => gamestate.activePlayerName === curr.username ? index : null);

        // provided there is an active player, update game state to show the next player
        // in the turn loop to be the activePlayerName:
        if (activePlayerIndex === null) {
            res.send({ error: 'no active player' })
            return;
        }
        else if (activePlayerIndex === gamestate.players.length - 1) activePlayerIndex = 0;
        else activePlayerIndex += 1;

        gamestate.activePlayerName = gamestate.players[activePlayerIndex].username;

        // update the database to reflect active player name:
        const mongoRes = await db.collection('games').updateOne({ _id: decoded.gameId }, { $set: { activePlayerName: gamestate.activePlayerName } })
        if (mongoRes.matchedCount === 0) throw new Error(`unable to find match on gameId ${decoded.gameId}`)
        res.send({ gamestate })
    } catch (err) {
        global.fastify.log.error(err);
    }
}