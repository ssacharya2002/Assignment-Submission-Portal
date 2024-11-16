import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Assignment from '../models/Assignment';
import User from '../models/User';

export const uploadAssignment = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { task, adminId } = req.body;
    const userId = (req as any).user._id;

    const admin = await User.findOne({ _id: adminId, role: 'admin' });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid admin ID' });
    }

    const assignment = new Assignment({
      userId,
      adminId,
      task
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAssignments = async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).user._id;
    const assignments = await Assignment.find({ adminId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const acceptAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = (req as any).user._id;

    const assignment = await Assignment.findOne({ _id: id, adminId });
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    assignment.status = 'accepted';
    await assignment.save();

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const rejectAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = (req as any).user._id;

    const assignment = await Assignment.findOne({ _id: id, adminId });
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    assignment.status = 'rejected';
    await assignment.save();

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};