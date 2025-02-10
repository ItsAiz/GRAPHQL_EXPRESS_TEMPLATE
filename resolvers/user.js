const { readUsers } = require("../utils/fileHandler");

const userResolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      
      const users = readUsers();
      return users.find((u) => u.id === user.id);
    },

    getUser: (_, { id }) => {
      const users = readUsers();
      return users.find((user) => user.id === id) || null;
    },
  },
};

module.exports = userResolvers;
