<template>
  <div class="container-fluid">
    <div class="row justify-content-center mt-2">
      <div class="col text-center">
        <h2>Reported Bugs</h2>
      </div>
    </div>
    <br>
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="col-12 d-flex bg-dark text-white">
          <div class="col-3">
            <h5>Title</h5>
          </div>
          <div class="col-3">
            <h5>Reported By</h5>
          </div>
          <div class="col-3">
            <h5>Status</h5>
          </div>
          <div class="col-3">
            <h5>Last Upated</h5>
          </div>
        </div>
      </div>
      <div class="col-10 bugs-height overflow-auto hide-scroll">
        <bug-component v-for="bug in bugs" :key="bug" :bug-prop="bug" />
      </div>
    </div>
    <br>
    <br>
    <div class="row justify-content-center">
      <div class="col-10 bugs-height">
        <div class="col-12 text-center">
          <h2>Report New Bug</h2>
        </div>
        <div class="col-12">
          <form class="form-group col-12 mt-4" id="report-form" @submit.prevent="createBug">
            Title:
            <input type="text"
                   class="form-control"
                   aria-describedby="helpId"
                   placeholder="Bug Title"
                   v-model="state.newBug.title"
            >
            Description:
            <textarea
              class="form-control"
              aria-describedby="helpId"
              placeholder="Description"
              v-model="state.newBug.description"
            >
            </textarea>
            <br>
            <button type="submit" class="btn btn-info ml-1 col-2">
              Report
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import BugComponent from '../components/BugComponent.vue'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'

export default {
  components: { BugComponent },
  name: 'Home',
  setup() {
    const state = reactive({
      newBug: {}
    })
    onMounted(async() => {
      await bugsService.getBugs()
    })
    return {
      state,
      bugs: computed(() => AppState.bugs.sort((a, b) => (a.updatedAt > b.updatedAt) ? 1 : -1)),
      // sortedBugs: computed(() => AppState.bugs.sort((a, b) => (a.updatedAt > b.updatedAt) ? 1 : -1)),
      async createBug() {
        await bugsService.createBug(state.newBug)
        await document.getElementById('report-form').reset()
      }
    }
  }
}

</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.bugs-height{
height: 25vh;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scroll::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scroll {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
