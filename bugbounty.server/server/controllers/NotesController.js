import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/bugs/:bugId/notes')
    this.router
      // .get('', this.getAll)
      .get('', this.getNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:noteId', this.edit)
      .delete('/:noteId', this.delete)
  }

  // async getAll(req, res, next) {
  //   try {
  //     return res.send(['value1', 'value2'])
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getNotesByBugId(req, res, next) {
    try {
      return res.send(await notesService.getNotesByBugId(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      req.body.bug = req.params.bugId
      res.send(await notesService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await notesService.edit(req.params.noteId, req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await notesService.delete(req.params.noteId))
    } catch (error) {
      next(error)
    }
  }
}
