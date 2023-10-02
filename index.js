import Fastify from "fastify";
const fastify = Fastify({
    logger: true
})

import territories from "./territories.js";

fastify.get('/', (req, res) => {
    res.send({ message: 'hello!' })
})

fastify.post('/login', (req, res) => {
    // TODO: start login flow
})

fastify.get('/attack', (req, res) => {
    // Send an attack from one territory (that the current user owns)
    // to another territory (that the user does not own)
})

fastify.get('/endturn', (req, res) => { })
fastify.post('/reinforce', (req, res) => { })
fastify.post('/fortify', (req, res) => { })
fastify.get('/gamestate', (req, res) => { })

fastify.listen({ port: process.env.PORT }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    }

    console.log(`server listening on port ${process.env.PORT}`)
})