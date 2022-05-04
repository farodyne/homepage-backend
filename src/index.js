import { RestApi } from './rest';
import { DbClient, settings } from './utils';

const api = new RestApi(new DbClient(settings));
api.start();
