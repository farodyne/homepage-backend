/**
 * Author: Federico Engler
 *
 * The entry point for my simple backend kicks off the REST API by creating an
 * instance of the database client and injecting it to an instance of the API class.
 * This dependency injection makes the code easier to test, but also creates proper
 * layers for separation of concerns.
 */
import { RestApi } from './rest';
import { DbClient, settings } from './utils';

const api = new RestApi(new DbClient(settings));
api.start();
