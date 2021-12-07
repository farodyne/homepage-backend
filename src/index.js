import { RestApi } from './rest';
import { DbClient } from './utils';
import { MongoClient } from 'mongodb';

const api = new RestApi(new DbClient());
api.start();
