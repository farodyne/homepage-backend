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
import { settings } from '../utils';
import { Album, AlbumMiniature, Section } from '../models';

class RespApi {
    /**
     * Constructs an instance of our REST API.
     */
    constructor(database) {
        const api = express();
        api.use(cors());
        api.use(bodyParser.json());
        api.use(basicAuth({ users: { [settings.apiUser]: settings.apiPassword } }));
        this.api = api;
        this.database = database;

        // Register the endpoints to local class methods.
        this.api.get(settings.apiRoot + '/news/:count', this.getNews.bind(this));
        this.api.get(settings.apiRoot + '/albums/:id', this.getAlbum.bind(this));
        this.api.get(settings.apiRoot + '/sections/:type', this.getSection.bind(this));
    }

    /**
     * The reason for separating the starting of the server into a separate method is
     * that it allows us to perform unit tests without using up an actual port.
     */
    start() {
        console.info('Backend API root:', settings.apiRoot);
        console.info('Started REST API on port:', settings.serverPort);
        this.api.listen(settings.serverPort);
    }

    /**
     * Fetches the three newest albums from the database.
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
            // TODO: Use proper Error class!
            res.status(404).send({ error: `Failed to get the newest albums.` });
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

        console.info(`Hanling GET request (${ip}) for album: ${id}`);
        const cursor = await this.database.getAlbum(id);

        if (cursor) {
            res.json(new Album(cursor));
        } else {
            res.status(404).send({ error: `No album with id: ${id}.` });
        }
    }

    /**
     * Method for retrieving all the photo albums in a particular section, in
     * other words, of a specific type.
     * @param {Object} req - An Express request object.
     * @param {*} res - An Express response object.
     */
    async getSection(req, res) {
        const {
            params: { type }
        } = req;

        const cursor = await this.database.getSection(type);

        if (cursor) {
            res.json(new Section(await cursor.toArray()));
        } else {
            res.status(404).send({ error: `No section of type: ${type}.` });
        }
    }
}

export default RespApi;
