import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAll(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('creatorId')
    return bugs
  }

  async getBugById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creatorId')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async createBug(newBug) {
    const bug = await dbContext.Bugs.create(newBug)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async edit(id, newBug) {
    const bug = await dbContext.Bugs.findByIdAndUpdate(id, newBug)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }
}

export const bugsService = new BugsService()
