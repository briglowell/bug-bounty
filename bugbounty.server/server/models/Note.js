import mongoose from 'mongoose'
const Schema = mongoose.Schema
// const ObjectId = mongoose.Types.ObjectId

const Note = new Schema({
  content: { type: String, required: true },
  bug: { type: String, ref: 'Bug', required: true },
  // reportedBy: String // The provided name for who made the note
  creatorId: { type: String, ref: 'Profile', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

Note.virtual('creator', {
  localField: 'bug',
  ref: 'Bug',
  foreignField: '_id',
  justOne: true
})

export default Note
