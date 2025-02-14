const authResolvers = require('./auth');
const userResolvers = require('./user');

const resolvers = {
  Query: {
    ...(userResolvers.Query || {}),
  },
  Mutation: {
    ...(authResolvers.Mutation || {}),
  },
};

module.exports = resolvers;
