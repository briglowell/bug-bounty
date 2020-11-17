import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:bugId', this.getBugById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:bugId', this.edit)
  }

  async getAll(req, res, next) {
    try {
      res.send(await bugsService.getAll())
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      res.send(await bugsService.getBugById(req.params.bugId))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await bugsService.createBug(req.body))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await bugsService.edit(req.params.bugId, req.body))
    } catch (error) {

    }
  }
}
