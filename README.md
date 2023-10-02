# API Risk
Risk the board game, played over http requests.

## Tech Stack
 - Fastify (stateless http server)
 - Mongodb (database and game state)
 - Discord (user authorization, community building)

### Fastify (why I chose it):
I wanted something refreshing to write the backend in. I am bored of expressjs and vercel's serverless functions. It should also be noted that I could write this as a websocket server and that would be better! But I wanted to learn a new http server - and I think building a rest api for interacting with a computer game is kind of interesting. 

### Mongodb (why I chose it):
I chose Mongodb out of familiarity. It's the database I've used the most and since I was already learning fastify and rehashing my basic knowledge of the discord api I didn't want to add learning a new database service and language on top of that.

### Discord (why I chose it):
I chose discord because it's my favorite app for communicating with friends, and I figured a niche game aimed at computer programmers would benefit from having a community aspect built right into it.

## Development Environment
I made one primary adjustment to my set up for this project.

    1. I switched from Ubuntu 20.04 to Windows 10 with WSL2.

Besides that, I'm still using Node because I love programming with npm's package manager and I love writing JSON friendly apps with javascript.