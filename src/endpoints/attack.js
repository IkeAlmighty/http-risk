import jwt from 'jsonwebtoken';

export async function GET(req, res) {
    // Send an attack from one territory (that the current user owns)
    // to another territory (that the user does not own)

    const { attacking, defending } = req.query;
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        const db = global.fastify.mongo.db;
        const gamestate = await db.collection('games').findOne({ _id: decoded.gameId });

        // if the request did not come from an active player, 
        // then return an error:
        if (gamestate.activePlayerName !== decoded.username) {
            res.send({ error: `${decoded.username} is not the active player.` })
        }

        // retrieve documents for both territories.
        const attackingTerritory = gamestate.territories.find(t => t.name === attacking);
        const defendingTerritory = gamestate.territories.find(t => t.name === defending);

        // determine dice number for attacker
        let attackDiceCount = undefined;
        if (attackingTerritory.unitCount < 2) {
            // return error because not enough unitCount to attack
            res.send({ error: `${attackingTerritory.name} does not have enough unitCount to attack (at least 2 is required).` })
        }
        else if (attackingTerritory.unitCount < 4) attackDiceCount = 2;
        else attackDiceCount = 3;

        // determine dice number for defender
        let defenceDiceCount = undefined;

        if (defendingTerritory.unitCount > 2) defenceDiceCount = 2;
        else defenceDiceCount = defendingTerritory.unitCount;

        // roll for defender and attacker
        function roll6Sider() {
            return Math.floor((Math.random() * 6) + 1);
        }

        const defenceRolls = new Array(defenceDiceCount).map(v => roll6Sider()).sort((a, b) => a - b)
        const attackRolls = new Array(attackDiceCount).map(v => roll6Sider()).sort((a, b) => a - b)

        // update the territories in the game document
        const defenderLosses = [defenceRolls.pop() || 0 < attackRolls.pop(), defenceRolls.pop() || 0 < attackRolls.pop() || 0]

        for (loss in defenderLosses) {
            if (loss) defendingTerritory.unitCount -= 1;
            else attackingTerritory.unitCount -= 1;
        }

        gamestate.territories[defendingTerritory.name] = defendingTerritory;
        gamestate.territories[attackingTerritory.name] = attackingTerritory;

        // db operation for updating:
        const mongoRes = await db.collection('games').updateOne({ _id: decoded.gameId }, { $set: { territories: gamestate.territories } })
        if (mongoRes.matchedCount !== 1) throw new Error(`game of id ${gamestate.gameId} does not exist.`)

        // return the new, updated gamestate:
        res.send({ gamestate })

    } catch (err) {
        global.fastify.log.error(err);
    }
}