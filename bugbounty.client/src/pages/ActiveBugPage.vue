<template>
  <div class="active-bug-page container-fluid">
    <div class="row justify-content-center mt-2">
      <div class="col text-center">
      </div>
    </div>
    <br>
    <div class="row justify-content-center">
      <div class="col-10 border shadow-lg mb-3" v-if="activeBug.creatorId">
        <div v-if="activeBug.closed">
          <h2>{{ activeBug.title }}</h2>
          <p class="text-danger">
            Status: Closed
          </p>
        </div>
        <div v-else>
          <h2>{{ activeBug.title }}</h2>
          <p class="text-success">
            Satus: Active
          </p>
        </div>
        <h6>
          Reported by: {{ activeBug.creatorId.name }}
        </h6>
        <p>{{ activeBug.description }}</p>
        <div v-if="activeBug.creatorId.email === profile.email">
          <div class="d-flex" v-if="activeBug.closed == false">
            <button type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-info m-3">
              edit
            </button>
            <button class="btn btn-danger m-3" @click="deleteBug">
              close
            </button>
          </div>
        </div>
      </div>
      <div class="col-10 d-flex my-2">
        <div class="col-3">
          <h5>User</h5>
        </div>
        <div class="col-2">
          <h5>Message</h5>
        </div>
        <div class="col-8" v-if="activeBug.closed == false">
          <form class="form-group d-flex col-12" @submit.prevent="createNote">
            <input type="text"
                   class="form-control"
                   aria-describedby="helpId"
                   placeholder=""
                   v-model="state.newNote.content"
            >
            <button type="submit" class="btn btn-success ml-1">
              Add
            </button>
          </form>
          <!-- <button class="btn btn-success btn-block" @click="createNote">
            Add
          </button> -->
        </div>
      </div>
      <div class="col-11">
        <note-component v-for="note in notes" :key="note" :note-prop="note" />
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade"
       id="exampleModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Edit your bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="form-group" type="onsubmit">
            <input type="text"
                   class="form-control border border-dark bg-dark-fade"
                   aria-describedby="helpId"
                   placeholder="Bug Title"
                   v-model="state.editedBug.title"
            >
            <input type="text"
                   class="form-control border border-dark bg-dark-fade"
                   aria-describedby="helpId"
                   placeholder="Bug Description"
                   v-model="state.editedBug.description"
            >
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="submit" class="btn btn-primary" data-dismiss="modal" @click.prevent="editActiveBug">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { NoteComponent } from '../components/NoteComponent'

export default {
  name: 'ActiveBugPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      editedBug: {},
      newNote: {},
      editedNote: {},
      closedBug: { closed: true }
    })
    onMounted(async() => {
      await bugsService.getActiveBug(route.params.bugId)
      await notesService.getNotes(route.params.bugId)
    })
    return {
      state,
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      profile: computed(() => AppState.profile),
      async editActiveBug() {
        await bugsService.editBug(route.params.bugId, state.editedBug)
      },
      async deleteBug() {
        await bugsService.editBug(route.params.bugId, state.closedBug)
      },
      async createNote() {
        await notesService.createNote(route.params.bugId, state.newNote)
      }
    }
  },
  components: { NoteComponent }
}
</script>

<style lang="scss" scoped>

</style>
