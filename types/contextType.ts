import { Request } from 'express';
import { User } from './userType';

export interface GraphQLContext {
    req: Request;
    user?: User | null;
}
