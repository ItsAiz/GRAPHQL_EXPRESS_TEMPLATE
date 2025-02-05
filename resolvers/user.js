const users = [];

const userResolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return users.find((u) => u.id === user.id);
    },

    getUser: (_, { id }) => {
      return users.find((user) => user.id === id);
    },
  },
};

module.exports = userResolvers;
