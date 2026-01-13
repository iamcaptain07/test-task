import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true, default: 1 },
  name: { type: String, required: true },
  email: { type: String, required: true },
  favoriteGenres: { type: [String], default: [] },
  updatedAt: { type: String, required: true }
}, {
  timestamps: false,
  toJSON: { 
    virtuals: false, 
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

export default Profile;

