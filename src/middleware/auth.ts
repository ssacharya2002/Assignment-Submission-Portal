import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserInterface } from '../models/User';

interface AuthRequest extends Request {
    user?: UserInterface;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        throw new Error();
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key') as any;
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Please authenticate' });
    }
  };
  