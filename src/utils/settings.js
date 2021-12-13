/**
 * Author: Federico Engler
 *
 * A common settings object that can be used throught the application. Note
 * that settings values can be read from the environment in a transparent
 * manner in this way.
 */
export default {
    apiRoot: process.env.API_ROOT || '/rest',
    dbName: process.env.FARODYNE_DB_NAME || 'farodyne',
    dbUsername: process.env.FARODYNE_DB_USER || '',
    dbPassword: process.env.FARODYNE_DB_PASSWORD || '',
    contentUrl: process.env.CONTENT_URL || 'http://www.farodyne.com/content',
    serverPort: process.env.SERVER_PORT || 3100
};
