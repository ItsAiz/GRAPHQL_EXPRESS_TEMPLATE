import { Request } from 'express';
import { readUsers } from '../utils/fileHandler';
import { logger as log } from '../utils/logger';
import { User } from '../types/userType';
import { validateToken } from '../utils/session';

const userResolvers = {
  Query: {  
    getUser: (_: unknown, { id }: { id: string }, { req }: { req: Request })
      : { success: boolean; message: string; user?: User } => {
      if (!validateToken(req)) {
        log.error('[getUser] Unauthorized access to this API');
        return { success: false, message: 'Unauthorized access to this API' };
      }
      const users = readUsers();
      const user = users.find((user: User) => user.id === id);
      if (!user) {
        return { success: false, message: `User with ID ${id} not found` };
      }
      return { success: true, message: 'User found', user };
    },

    getUsers: (_: unknown, __: unknown, { req }: { req: Request }) => {
      if (!validateToken(req)) {
        log.error('[getUsers] Unauthorized access to this API');
        return { success: false, total: 0 };
      }
      const users = readUsers();
      return { success: true, users };
    },
  },
};

export default userResolvers;
