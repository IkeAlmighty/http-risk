import Fastify from "fastify";
const fastify = Fastify({
    logger: true
})

const { MongoClient } = require('mongodb');
fastify.register(require('fastify-mongodb'), { url: process.env.MONGO_URI })

import jwt from 'jsonwebtoken';

import territories from "./territories.js";
const MAX_PLAYERS = 8;

fastify.get('/', (req, res) => {
    res.send({ message: 'hello!' })
})

fastify.get('/join', async (req, res) => {
    /**
     *  LOGIN FLOW:
     *  1. client posts random username to this route
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
        const db = fastify.mongo.db;

        // find the next available open game
        let openGame = await db.collection("games").findOne({ gameStarted: false, players: { $size: { $lt: MAX_PLAYERS } } });

        // OR create new game if there isn't an available slot
        if (!openGame) {
            let newGameDocument = {
                players: [{ username }],
                gameStarted: false,
                activePlayer: null,
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
        fastify.log.error(err);
        res.send({ error: "server error" })
    }
})

fastify.get('refresh', (req, res) => {
    // verify jwt token from client
    const token = req.headers.authorization.split(' ')[1];
    // if it is valid, create a new token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) fastify.log.error(err);
        const newToken = jwt.sign({ username: decoded.username, gameId: decoded.gameId }, process.env.TOKEN_SECRET)

        // send new token
        res.send({ token: newToken })
    })
})

fastify.get('/attack', (req, res) => {
    // Send an attack from one territory (that the current user owns)
    // to another territory (that the user does not own)

    // if the request did not come from an active player, 
    // then return an error

    // retrieve documents for both territories.
    // 
})

fastify.get('/endturn', (req, res) => {
    // set the game state to reflect the next player in
    // turn order to be the active player.
})

fastify.post('/reinforce', (req, res) => {
    // place troops in the specified territories, 
    // provided that they are owned by the session's user.
})

fastify.post('/fortify', (req, res) => {
    // move troops from one territory to another territory,
    // provided that they are connected by territories
    // owned by the session's user.
})

fastify.get('/gamestate', (req, res) => {
    // connects to database to get game state of the user
    // associated with this request's session.

    /**
     * Game State Model:
     * {
     *      activePlayer: [playerId | None]
     *      territories: {... all the territories in the game}
     *      timeSinceLastTurn: [milliseconds]
     *      winner: [playerId | None]
     * }
     */
})

fastify.listen({ port: process.env.PORT }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    }

    console.log(`server listening on port ${process.env.PORT}`)
})