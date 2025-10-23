import { createServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { getEnvVar } from './utils/getEnvVar.js';

const PORT = getEnvVar('PORT') || 3000;

const bootstrap = async () => {
  await initMongoConnection();
  const app = createServer();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

bootstrap();