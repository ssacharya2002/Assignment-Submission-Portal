import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const admin = new User({ name, email, password, role: 'admin' });
    await admin.save();

    const token = jwt.sign(
      { _id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'secret-key'
    );

    res.status(201).json({ admin, token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { _id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'secret-key'
    );

    res.json({ admin, token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};