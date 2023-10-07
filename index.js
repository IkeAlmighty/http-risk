import Fastify from "fastify";
const fastify = Fastify({
    logger: true
})

const { MongoClient } = require('mongodb');
fastify.register(require('fastify-mongodb'), { url: process.env.MONGO_URI })

import jwt from 'jsonwebtoken';

import territories from "./territories.js";

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

    // connect to mongodb
    const db = fastify.mongo.db;

    // add username to next available game slot
    let openGame = await db.collection("games").findOne({ gameStarted: false, players: { $size: { $lt: 8 } } });

    // OR create new game if there isn't an available slot
    if (!openGame) {
        let newGameDocument = {
            players: [{ username }],
            gameStarted: false,
            territories,
        }

        const id = (await db.collection("games").insertOne(newGameDocument)).insertedId;
        openGame = { ...newGameDocument, id }
    }

    // create jwt 
    const token = jwt.sign({ username, gameId: id }, process.TOKEN_SECRET)

    // respond to client with jwt. 
    res.send(token);
})

fastify.get('refresh', (req, res) => {
    // verify jwt token from client
    // if it is valid, create a new token
    // return new token
})

fastify.get('/attack', (req, res) => {
    // Send an attack from one territory (that the current user owns)
    // to another territory (that the user does not own)
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