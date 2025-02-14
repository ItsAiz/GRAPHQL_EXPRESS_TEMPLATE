const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/session');
const { readUsers, writeUsers } = require('../utils/fileHandler');
const log = require('../utils/logger');

const authResolvers = {
  Mutation: {
    register: async (_, { name, email, password }) => {
      if (!name || !email || !password) {
        log.error('[register] Missing required fields (name, email, password)');
        return { success: false, message: 'Missing required fields (name, email, password)', data: null };
      }

      let users = readUsers();
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        log.error(`[register] User with email ${email} already exists`);
        return { success: false, message: 'User already exists', data: null };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { id: uuidv4(), name, email, password: hashedPassword };
      users.push(user);
      writeUsers(users);

      log.info(`[register] User registered successfully: ${email}`);
      return {
        success: true,
        message: 'User registered successfully',
        data: { token: generateToken(user), user },
      };
    },

    login: async (_, { email, password }) => {
      if (!email || !password) {
        log.error('[login] Missing required fields (email, password)');
        return { success: false, message: 'Missing required fields (email, password)', data: null };
      }

      const users = readUsers();
      const user = users.find((u) => u.email === email);
      if (!user) {
        log.error(`[login] Login failed: User ${email} not found`);
        return { success: false, message: 'Invalid email or password', data: null };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        log.error(`[login] Login failed: Invalid password for ${email}`);
        return { success: false, message: 'Invalid email or password', data: null };
      }

      log.info(`[login] User logged in successfully: ${email}`);
      return {
        success: true,
        message: 'Login successful',
        data: { token: generateToken(user), user },
      };
    },
  },
};

module.exports = authResolvers;
