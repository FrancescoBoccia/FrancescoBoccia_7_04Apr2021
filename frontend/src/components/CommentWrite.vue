<template>
  <div>
    <div class="d-flex align-items-center mt-3">
      <b-form class="w-100" @submit="createComment">
        <b-form-group>
          <b-form-textarea
            :id="`comment-area-${post.id}`"
            v-model="content"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="createComment"
            @keydown.enter.shift.exact="newline"
            class="comment-area border-0"
            placeholder="Write a comment here..."
            aria-label="Write a comment here"
          >
          </b-form-textarea
        ></b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
import { apiClient } from '../services/ApiClient'

export default {
  name: 'CreateComment',
  components: {
  },
  props: ['post'],
  data () {
    return {
      content: '',
      userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  methods: {
    async createComment (event) {
      if (!this.content.trim().length) return

      const { comment } = await apiClient.post(
        `api/posts/${this.post.id}/comments`,
        {
          content: this.content
        }
      )
      this.content = ''
      this.$emit('commentCreated', comment)
    },
    newline () {
      this.content = `${this.content}\n`
    }
  }
}
</script>

<style lang="scss">
.comment-area {
  background-color: rgba(108, 117, 125, 0.1);
}
</style>
