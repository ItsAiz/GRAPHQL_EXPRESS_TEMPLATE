const log = require('../utils/logger');
const { readUsers } = require('../utils/fileHandler');
const { validateToken } = require('../utils/session');

const userResolvers = {
  Query: {
    getUser: (_, { id }, { req }) => {
      if (!validateToken(req)) {
        log.error('[getUser] Unauthorized access to this API');
        return { success: false, message: 'Unauthorized access to this API' };
      }
      const users = readUsers();
      const user = users.find((user) => user.id === id);
      if (!user) {
        return { success: false, message: `User with ID ${id} not found` };
      }
      return { success: true, message: 'User found', user };
    },

    getUsers: (_, __, { req }) => {
      if (!validateToken(req)) {
        log.error('[getUsers] Unauthorized access to this API');
        return { success: false, total: 0 };
      }
      const users = readUsers();
      return { success: true, users };
    },
  },
};


module.exports = userResolvers;
