import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 1, maxlength: 255 }
}, {
  timestamps: true
});

export default mongoose.model('Category', categorySchema);
