const startApolloServer = require('./app');
const log = require('./utils/logger');

const PORT = process.env.PORT || 5000;

if (module === require.main) {
  startApolloServer()
    .then((app) => {
      app.listen(PORT, () => {
          log.info(`🚀 Server running on http://localhost:${PORT}/graphql`);
      });
    }).catch((err) => {
        log.error('Error starting server:', err);
    });
}