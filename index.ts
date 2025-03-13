import startApolloServer from './app';
import { logger as log } from './utils/logger';

const PORT: number = Number(process.env.PORT) || 5000;

if (require.main === module) {
  startApolloServer()
    .then((app) => {
      app.listen(PORT, () => {
          log.info(`Server running on http://localhost:${PORT}/graphql`);
      });
    })
    .catch((err) => {
        log.error('Error starting server:', err);
    });
}
