import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { logger as log } from './logger';
import { UserBasic } from '../types/userType';

export const generateToken = (user: UserBasic) => {
    log.info('[generateToken]');
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
};

export const extractToken = (req: Request) => {
    if (!req || !req.headers || !req.headers.authorization) {
        log.error('[extractToken] Missing authorization header');
        return '';
    }
    const authHeader = req.headers.authorization;
    if (!authHeader.startsWith('Bearer ')) {
        log.error('[extractToken] Invalid authorization format');
        return '';
    }
    return authHeader.split(' ')[1];
};

export const validateToken = (req: Request) => {
    const token = extractToken(req);
    if (!token) return false;
    return jwt.verify(token, String(process.env.JWT_SECRET)); 
};

