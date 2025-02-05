const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const users = [];

const authResolvers = {
  Mutation: {
    register: async (_, { name, email, password }) => {
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { id: users.length + 1, name, email, password: hashedPassword };
      users.push(user);

      const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = users.find((u) => u.email === email);
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
      return { token, user };
    },
  },
};

module.exports = authResolvers;
