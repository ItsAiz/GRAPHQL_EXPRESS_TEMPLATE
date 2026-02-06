import { Request } from 'express';
import { readUsers } from '../utils/fileHandler';
import { logger as log } from '../utils/logger';
import { User } from '../types/userType';
import { UserResponse } from '../types/userType';
import { validateToken } from '../utils/session';

const userResolvers = {
  Query: {  
    getUser: async(_: unknown, { id }: { id: string }, { req }: { req: Request })
      : Promise<UserResponse> => {
      if (!validateToken(req)) {
        log.error('[getUser] Unauthorized access to this API');
        return { success: false, message: 'Unauthorized access to this API', data: null };
      }
      const users = readUsers();
      const user = users.find((user: User) => user.id === id);
      if (!user) {
        return { success: false, message: `User with ID ${id} not found`, data: null };
      }
      return { success: true, message: 'User found', data: { user } };
    },

    getUsers: async(_: unknown, __: unknown, { req }: { req: Request }): Promise<UserResponse> => {
      if (!validateToken(req)) {
        log.error('[getUsers] Unauthorized access to this API');
        return { success: false, message: 'Unauthorized access to this API', data: null };
      }
      const users = readUsers();
      return { success: true, data: { users }, message: '' };
    },
  },
};

export default userResolvers;
