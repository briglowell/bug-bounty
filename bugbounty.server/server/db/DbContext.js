import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import ProfileSchema from '../models/Profile'
import BugSchema from '../models/Bug'
import NoteSchema from '../models/Note'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Profile = mongoose.model('Profile', ProfileSchema);
  Bugs = mongoose.model('Bug', BugSchema);
  Notes = mongoose.model('Note', NoteSchema);
}

export const dbContext = new DbContext()
