import jwt from 'jsonwebtoken';

export async function GET(req, res) {
    // verify jwt token from client
    const token = req.headers.authorization.split(' ')[1];
    // if it is valid, create a new token
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const newToken = jwt.sign({ username: decoded.username, gameId: decoded.gameId }, process.env.TOKEN_SECRET)

        // send new token
        res.send({ token: newToken })
    } catch (err) {
        global.fastify.log.error(err);
    }
}