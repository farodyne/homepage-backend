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
import { Album } from '../models';

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

    /**
     * Method that registers the API endpoints.
     */
    registerRestApiEndpoints() {
        /**
         * The endpoint that returns a specific album with its images. If the album
         * does not exist, an HTTP error 404 is returned.
         */
        this.api.get(settings.apiRoot + '/albums/:id', async (req, res) => {
            const id = req.params.id;
            const cursor = await this.dbClient.getAlbum(id);

            if (cursor) {
                res.json(new Album(cursor));
            } else {
                res.status(404).send({ error: `No album with id: ${id}.` });
            }
        });
    }
}

export default RespApi;
