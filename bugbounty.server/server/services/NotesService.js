import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  // async getAll(query = {}) {
  //   const notes = await dbContext.Notes.find(query).populate('creatorId').populate('bug')
  //   return notes
  // }

  async getNotesByBugId(id) {
    const note = await dbContext.Notes.find({ bug: id }).populate('creatorId').populate('bug')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(newNote) {
    const note = await dbContext.Notes.create(newNote)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async edit(id, newNote) {
    const note = await dbContext.Notes.findByIdAndUpdate(id, newNote)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async delete(id) {
    const note = await dbContext.Notes.findByIdAndDelete(id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }
}

export const notesService = new NotesService()
