import { RestApi } from './rest';
import { DbClient } from './utils';

const api = new RestApi(new DbClient());
api.start();
