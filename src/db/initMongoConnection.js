import mongoose from 'mongoose';

import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = encodeURIComponent(getEnvVar('MONGODB_PASSWORD'));
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    await mongoose.connect(
  `mongodb+srv://${user}:${pwd}@${url}/${db}` +
  `?retryWrites=true&w=majority&authSource=admin&authMechanism=SCRAM-SHA-256`
);
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};