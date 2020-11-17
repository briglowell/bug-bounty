import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getActiveBug(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId)
      AppState.activeBug = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async createBug(newBug) {
    try {
      await api.post('api/bugs/', newBug)
      this.getBugs()
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editBug(bugId, editedBug) {
    try {
      await api.put('api/bugs/' + bugId, editedBug)
      this.getActiveBug(bugId)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

export const bugsService = new BugsService()
