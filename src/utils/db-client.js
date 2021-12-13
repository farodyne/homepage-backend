/**
 * Author: Federico Engler
 *
 * This class implements an API class that abstracts away the database layer from the
 * rest of the application. Injected as a dependency to the REST API layer, it becomes
 * simple to mock the behaviour in tests.
 */
import { MongoClient } from 'mongodb';
import settings from './settings';

class DbClient {
    /**
     * Constructs an instance of the database client.
     */
    constructor(database) {
        const { dbUsername, dbPassword } = settings;

        try {
            this.client = new MongoClient(`mongodb://${dbUsername}:${dbPassword}@localhost:27017/${database}`);
            this.client.connect();
            console.info('Successfully connected to the database.');
        } catch (error) {
            console.error('Failed to connect to the database:', error);
        }
    }

    /**
     * Method to return the album with the provided identifier.
     * @param {string} id - The album ID.
     * @returns The album object with its images.
     */
    async getAlbum(id) {
        return await this.client.db().collection('albums').findOne({ id });
    }

    /**
     * Method to return a section of miniature album objects.
     * @param {string} type - The type of albums in the section.
     * @returns The section (array) of albums of the specified type.
     */
    async getSection(type) {
        return await this.client.db().collection('albums').find({ type });
    }
}

export default DbClient;
