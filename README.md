# API Risk
Risk the board game, played over http requests.

## Tech Stack
 - Fastify (stateless http server)
 - Mongodb (database and game state)
 - JWT (user authorization)

### Fastify (why I chose it):
I wanted something refreshing to write the backend in. I am bored of expressjs and vercel's serverless functions. It should also be noted that I could write this as a websocket server and that would be better! But I wanted to learn a new http server - and I think building a rest api for interacting with a computer game is kind of interesting. 

### Mongodb (why I chose it):
I chose Mongodb out of familiarity. It's the database I've used the most and since I was already learning fastify and rehashing my basic knowledge of the discord api I didn't want to add learning a new database service and language on top of that.

### JWT (why I chose it):
I considered forcing users to login with Discord oauth2, but
then I considered that many users would find that really annoying. So I reconsidered and chose to simply use hashes and JWTs to secure sessions with the game. It makes more sense I think.

## Development Environment
I made one primary adjustment to my set up for this project.

    1. I switched from Ubuntu 20.04 to Windows 10 with WSL2 Ubuntu 22.04.

This mostly had to do with feeling frustrated with Discord not being well supported on linux systems, and wanting my personal life and coding life to sit a little closer together for the near future. It's a hassel to dual boot and it's nice to be able to swtich between a linux based coding environment and my favorite windows apps and games at the drop of a hat.

Besides that one change, I'm still using Node because I love programming with npm's package manager and I love writing JSON friendly apps with javascript.

