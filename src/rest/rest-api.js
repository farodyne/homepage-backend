/**
 * Author: Federico Engler
 *
 * This class creates an instance of our REST API server without explicitely registering
 * the endpoints here. This allows for a much more modular code design where separate
 * endpoint classes can register their methods in a more encapsulated manner.
 */
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { settings } from '../utils';

class RespApi {
    /**
     * Constructs an instance of our REST API.
     */
    constructor() {
        const api = express();
        api.use(cors());
        api.use(bodyParser.json());
        this.api = api;
    }

    /**
     * The reason for separating the starting of the server into a separate method is
     * that it allows us to perform unit tests without using up an actual port.
     */
    start() {
        console.info('Started REST API on port:', settings.serverPort);
        this.api.listen(settings.serverPort);
    }
}

export default RespApi;
