import mongoose, { Schema, Document } from 'mongoose';

export interface AssignmentInterface extends Document {
  userId: mongoose.Types.ObjectId;
  adminId: mongoose.Types.ObjectId;
  task: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const assignmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model<AssignmentInterface>('Assignment', assignmentSchema);