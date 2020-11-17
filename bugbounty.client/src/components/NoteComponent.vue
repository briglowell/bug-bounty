<template>
  <div class="note-component border shadow col-12 d-flex p-2">
    <div class="col-3">
      <p>{{ note.creatorId.name }}</p>
    </div>
    <div class="col-7">
      <p>{{ note.content }}</p>
    </div>
    <div class="col-2" v-if="note.creatorId">
      <div v-if="note.creatorId.email === profile.email">
        <div v-if="bug.closed == false">
          <button class="btn btn-danger" @click.prevent="deleteNote">
            delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
export default {
  name: 'NoteComponent',
  props: {
    noteProp: Object
  },
  setup(props) {
    const route = useRoute()
    onMounted(async() => {
      await bugsService.getActiveBug(route.params.bugId)
    })
    return {
      bug: computed(() => AppState.activeBug),
      note: computed(() => props.noteProp),
      profile: computed(() => AppState.profile),
      async deleteNote() {
        await notesService.deleteNote(route.params.blogId, props.noteProp.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
