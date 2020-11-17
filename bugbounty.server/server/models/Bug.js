import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema({
  closed: { type: Boolean, required: true, default: false },
  description: { type: String, required: true },
  title: { type: String, required: true },
  closedDate: { type: String, required: true, default: 'current' },
  // reportedBy: String, // The provided name for who reported the bug
  creatorId: { type: String, ref: 'Profile', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Bug.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

export default Bug
