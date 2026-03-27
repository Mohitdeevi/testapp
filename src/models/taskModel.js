import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1, maxlength: 255 },
  description: { type: String, maxlength: 1000 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  dueDate: { type: Date },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' }
}, {
  timestamps: true
});

taskSchema.index({ title: 1, dueDate: 1 });

taskSchema.methods.isOverdue = function() {
  return this.dueDate && this.dueDate < new Date();
};

export default mongoose.model('Task', taskSchema);
