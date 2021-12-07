/**
 * Author: Federico Engler
 *
 * This class creates an instance of our REST API with the endpoints thet
 * frontenc module will use.
 */
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { settings } from '../utils';

class RespApi {
    /**
     * Constructs an instance of our REST API.
     */
    constructor(dbClient) {
        const api = express();
        api.use(cors());
        api.use(bodyParser.json());
        this.api = api;
        this.dbClient = dbClient;
        this.registerRestApiEndpoints();
    }

    /**
     * The reason for separating the starting of the server into a separate method is
     * that it allows us to perform unit tests without using up an actual port.
     */
    start() {
        console.info('Started REST API on port:', settings.serverPort);
        this.api.listen(settings.serverPort);
    }

    registerRestApiEndpoints() {
        this.api.get(settings.apiRoot + '/albums/:id', async (req, res) => {
            const id = req.params.id;
            const album = await this.dbClient.getAlbum(id);

            if (album) {
                res.json({ album });
            } else {
                res.status(404).send({ error: `No album with id: ${id}.` });
            }
        });
    }
}

export default RespApi;
