  const { v4: uuidv4 } = require('uuid');
  const bcrypt = require('bcryptjs');
  const { generateToken } = require('../utils/session');
  const { readUsers, writeUsers } = require('../utils/fileHandler');
  const log = require('../utils/logger');

  const authResolvers = {
    Mutation: {
      register: async (_, { name, email, password }) => {
        if (!name || !email || !password) {
          log.error('[register] Missign required fields (name, email, password)')
          throw new Error('Missign required fields (name, email, password)');
        }
        let users = readUsers();
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
          log.error(`[register] User with email ${email} already exists`);
          throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { id: uuidv4(), name, email, password: hashedPassword };
        users.push(user);
        writeUsers(users);
        log.info(`[register] User registered successfully: ${email}`);
        return { token: generateToken(user), user };
      },

      login: async (_, { email, password }) => {
        if (!email || !password) {
          log.error('[login] Missign required fields (email, password)')
          throw new Error('Missign required fields (email, password)');
        }
        const users = readUsers();
        const user = users.find((u) => u.email === email);
        if (!user) {
          log.error(`[login] Login failed: User ${email} not found`);
          throw new Error('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          log.error(`[login] Login failed: Invalid password for ${email}`);
          throw new Error('Invalid email or password');
        }
        log.info(`[login] User logged in successfully: ${email}`);
        return { token: generateToken(user), user };
      },
    },
  };

  module.exports = authResolvers;
