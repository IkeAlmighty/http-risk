import 'dotenv/config';

import Fastify from "fastify";
global.fastify = Fastify({
    logger: true
})

import fastifyMongoDb from '@fastify/mongodb';
global.fastify.register(fastifyMongoDb, { url: process.env.MONGO_URI, forceClose: true })

import territories from "./territories.js";

global.config = {};
global.config.MAX_PLAYERS = 8;
global.config.TERRITORIES = territories;

import fs from 'fs';
import path from 'path';

// Recursive function to traverse directories and files
function traverseDirectory(currentDir, onFileFound) {
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
        const filePath = path.join(currentDir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // If it's a directory, recursively traverse it
            traverseDirectory(filePath, onFileFound);
        } else {
            // If it's a file, perform the desired function
            onFileFound(filePath);
        }
    }
}

// use traverseDirectory to create a file based routing system:
traverseDirectory('./src/endpoints', (filePath) => {
    let endpoint = filePath.substr(13).split('.')[0];

    // if this is an index file, then adjust the endpoint to reflect:
    let endpointImportPath = `./endpoints${endpoint}.js`;
    if (endpoint.substr(endpoint.length - 6) === '/index') {
        endpoint = `${endpoint.substring(0, endpoint.length - 6)}`;
        if (endpoint === '') endpoint = '/';
    }

    const route = async (f, options) => {
        const { POST, GET, DEL, PUT, PATCH } = await import(endpointImportPath);

        // for each user defined http method, add the endpoint (with and without / on the end):
        if (GET && endpoint.slice(-1) !== '/') f.get(`${endpoint}/`, GET);
        if (GET) f.get(endpoint, GET);

        if (POST && endpoint.slice(-1) !== '/') f.post(`${endpoint}/`, POST);
        if (POST) f.post(endpoint, POST);

        if (DEL && endpoint.slice(-1) !== '/') f.delete(`${endpoint}/`, DEL);
        if (DEL) f.delete(endpoint, DEL);

        if (PUT && endpoint.slice(-1) !== '/') f.put(`${endpoint}/`, PUT);
        if (PUT) f.put(endpoint, PUT);

        if (PATCH && endpoint.slice(-1) !== '/') f.patch(`${endpoint}/`, PATCH);
        if (PATCH) f.patch(endpoint, PATCH);
    }

    global.fastify.register(route);
})


global.fastify.listen({ port: process.env.PORT }, (err, address) => {
    if (err) {
        global.fastify.log.error(err);
        process.exit(1)
    }

    console.log(`server listening on port ${process.env.PORT}`)
})