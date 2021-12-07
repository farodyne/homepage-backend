import { MongoClient } from 'mongodb';

class DbClient {
    constructor() {
        this.client = new MongoClient('mongodb://localhost:27017/farodyne');

        try {
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
}

export default DbClient;
