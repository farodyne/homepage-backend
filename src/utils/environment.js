/**
 * Author: Federico Engler
 *
 * The purpose of defining this environment object in this manner, is to keep
 * the logic in my code clean from low-level checks on the process.env object.
 * Also, this provides a subtle mechanism in which to provide reasonable
 * default values where applicable.
 */
export default {
    // Database parameters.
    dbPort: process.env.FARODYNE_DB_PORT,
    dbName: process.env.FARODYNE_DB_NAME,
    dbHost: process.env.FARODYNE_DB_HOST,
    dbUsername: process.env.FARODYNE_DB_USERNAME,
    dbPassword: process.env.FARODYNE_DB_PASSWORD,

    // Loki parameters.
    lokiHost: process.env.FARODYNE_LOKI_HOST || 'http://loki',
    lokiPort: process.env.FARODYNE_LOKI_PORT || '3100',

    // REST API parameters.
    apiUser: process.env.FARODYNE_API_USER,
    apiPassword: process.env.FARODYNE_API_PASSWORD,
    serverPort: process.env.FARODYNE_SERVER_PORT,
    apiRoot: process.env.FARODYNE_API_ROOT || '/rest/v1',
    contentUrl: process.env.FARODYNE_CONTENT_URL || 'https://www.farodyne.com/content'
};
