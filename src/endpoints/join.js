import jwt from 'jsonwebtoken';

export async function GET(req, res) {
    /**
     *  LOGIN FLOW:
     *  1. client sends random username to this route
     *  3. server connects to database and adds username to
     *     next available game waiting for players. If there is no
     *     game waiting, then it creates one. server stores gameid in function scope.
     *  4. server creates SHA256 jwt of { payload: {username, gameid, expiresIn: 24H }, SERVER_SECRET }
     *  5. server sends back jwt for subsequent request authentication
     */

    const { username } = req.query;

    if (!username) {
        res.send({ error: 'invalid request, please choose a username!' })
    }
    try {
        // connect to mongodb
        const db = global.fastify.mongo.db;

        // find the next available open game
        let openGame = await db.collection("games").findOne({ gameStarted: false, players: { $size: { $lt: global.config.MAX_PLAYERS } } });

        // OR create new game if there isn't an available slot
        if (!openGame) {
            let newGameDocument = {
                players: [{ username }],
                gameStarted: false,
                activePlayerName: null,
                territories,
            }

            const _id = await db.collection("games").insertOne(newGameDocument).insertedId;
            openGame = { ...newGameDocument, _id }
        }
        else {
            // if the game is full now, then update the gameStarted field:
            if (openGame.players.length === MAX_PLAYERS - 1) {
                await db.collection("games").updateOne({ _id: openGame._id }, { $set: { gameStarted: true, players: [...openGame.players, { username }] } })
            }
            else {
                // else, just add the player:
                await db.collection("games").updateOne({ _id: openGame._id }, { $set: { players: [...openGame.players, { username }] } })
            }
        }

        // create jwt 
        const token = jwt.sign({ username, gameId: id }, process.TOKEN_SECRET)

        // respond to client with jwt. 
        res.send({ token });
    } catch (err) {
        global.fastify.log.error(err);
        res.send({ error: "server error" })
    }
}