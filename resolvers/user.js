const log = require('../utils/logger');
const { readUsers } = require('../utils/fileHandler');
const { validateToken } = require('../utils/session');

const userResolvers = {
  Query: {
    getUser: (_, { id }, { req }) => {
      if (!validateToken(req)) {
        log.error('[getUser] Unauthorized access to this API');
        throw new Error('Unauthorized access to this API');
      }
      const users = readUsers();
      const user = users.find((user) => user.id === id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    },

    getUsers: (_, __, { req }) => {
      if (!validateToken(req)) {
        log.error('[getUsers] Unauthorized access to this API');
        throw new Error('Unauthorized access to this API');
      }
      return readUsers();
    },
  },
};

module.exports = userResolvers;
