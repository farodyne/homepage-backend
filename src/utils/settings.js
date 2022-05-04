/**
 * Author: Federico Engler
 *
 * A common settings object that can be used throught the application. Note
 * that settings values can be read from the environment in a transparent
 * manner in this way.
 */
export default {
    apiRoot: process.env.API_ROOT || '/rest',
    dbPort: process.env.FARODYNE_DB_PORT || 27017,
    dbName: process.env.FARODYNE_DB_NAME || 'farodyne',
    dbHost: process.env.FARODYNE_DB_HOST || 'database',
    dbUsername: process.env.FARODYNE_DB_USERNAME || '',
    dbPassword: process.env.FARODYNE_DB_PASSWORD || '',
    contentUrl: process.env.CONTENT_URL || 'http://www.farodyne.com/content',
    serverPort: process.env.SERVER_PORT || 3100
};
