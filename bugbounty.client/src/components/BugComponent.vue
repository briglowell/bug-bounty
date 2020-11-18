<template>
  <div class="bug-component col-12 p-0" v-if="bug.closed == true">
    <router-link :to="{name: 'ActiveBug' , params: {bugId : bug._id}}">
      <div class="d-flex bg-success text-white">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-3">
          {{ bug.creatorId.name }}
        </div>
        <div class="col-3">
          Closed
        </div>
        <div class="col-3">
          {{ bug.updatedAt.split("T")[0] }}
        </div>
      </div>
    </router-link>
  </div>
  <div class="bug-component col-12 p-0" v-else>
    <router-link :to="{name: 'ActiveBug' , params: {bugId : bug._id}}">
      <div class="d-flex bg-danger text-white">
        <div class="col-3">
          {{ bug.title }}
        </div>
        <div class="col-3">
          {{ bug.creatorId.name }}
        </div>
        <div class="col-3">
          Active
        </div>
        <div class="col-3">
          {{ bug.updatedAt.split("T")[0] }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'BugComponent',
  props: {
    bugProp: Object
  },
  setup(props) {
    return {
      bug: computed(() => props.bugProp)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
