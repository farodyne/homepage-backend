/**
 * Author: Federico Engler
 *
 * This class creates an instance of our REST API with the endpoints the
 * frontend module will use.
 */
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import basicAuth from 'express-basic-auth';
import { Logger, environment } from '../utils';
import { Album, AlbumMiniature, Section } from '../models';

class RespApi {
    /**
     *
     * @param {Object} database - A database client.
     */
    constructor(database) {
        const { apiUser, apiPassword, apiRoot } = environment;

        // Create our Express using basic authentication.
        const api = express();
        api.use(cors());
        api.use(bodyParser.json());
        api.use(basicAuth({ users: { [apiUser]: apiPassword } }));

        // Register the endpoints to local class methods.
        api.get(apiRoot + '/news/:count', this.getNews.bind(this));
        api.get(apiRoot + '/albums/:id', this.getAlbum.bind(this));
        api.get(apiRoot + '/sections/:type', this.getSection.bind(this));

        // Store local object references.
        this.api = api;
        this.database = database;
        this.logger = new Logger();
    }

    /**
     * The reason for separating the starting of the server into a separate method
     * is that it allows us to perform unit tests without using up an actual port.
     */
    start() {
        const { apiRoot, serverPort } = environment;
        this.logger.info(`Backend API root: ${apiRoot}`);
        this.logger.info(`Started REST API on port: ${serverPort}`);
        this.api.listen(serverPort);
    }

    /**
     * Fetches the N newest albums from the database.
     */
    async getNews(req, res) {
        const {
            params: { count }
        } = req;

        const cursor = await this.database.getNews(Number(count || 3));

        if (cursor) {
            const newest = await cursor.toArray();
            res.json(newest.map((newest) => new AlbumMiniature(newest)));
        } else {
            const error = 'Failed to fetch latest album thumbnails.';
            this.logger.error(error);
            res.status(404).send({ error });
        }
    }

    /**
     * Method for retrieving an individual photo album.
     * @param {Object} req - An Express request object.
     * @param {Object} res - An Express return object.
     */
    async getAlbum(req, res) {
        const {
            params: { id }
        } = req;

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        this.logger.info(`Hanling GET request (${ip}) for album: ${id}`);
        const cursor = await this.database.getAlbum(id);

        if (cursor) {
            res.json(new Album(cursor));
        } else {
            const error = `No album with id: ${id}.`;
            this.logger.error(error);
            res.status(404).send({ error });
        }
    }

    /**
     * Method for retrieving all the photo albums in a particular section, in
     * other words, of a specific type.
     * @param {Object} req - An Express request object.
     * @param {Object} res - An Express response object.
     */
    async getSection(req, res) {
        const {
            params: { type }
        } = req;

        const cursor = await this.database.getSection(type);

        if (cursor) {
            res.json(new Section(await cursor.toArray()));
        } else {
            const error = `No section of type: ${type}.`;
            this.logger.error(error);
            res.status(404).send({ error });
        }
    }
}

export default RespApi;
