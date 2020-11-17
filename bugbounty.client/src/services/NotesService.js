import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getNotes(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.notes = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async createNote(bugId, newNote) {
    try {
      await api.post('api/bugs/' + bugId + '/notes', newNote)
      this.getNotes(bugId)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editNote(bugId, noteId, editedNote) {
    try {
      await api.put('api/bugs/' + bugId + '/notes/' + noteId, editedNote)
      this.getNotes(bugId)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async deleteNote(bugId, noteId) {
    try {
      await api.delete('api/bugs/' + bugId + '/notes/' + noteId)
      this.getNotes(bugId)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

export const notesService = new NotesService()
