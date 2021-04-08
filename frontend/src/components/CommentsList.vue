<template>
  <div>
    <button
      @click="fetchAllComments"
      class="display-comments mb-1 pt-0 d-flex text-left"
      aria-label="Show comments"
    ></button>
    <div class="comment text-left" v-for="comment in list" :key="comment">
      <Comment
        @commentDeleted="deleteComment"
        :comment="comment"
        :post="post"
      />
    </div>

    <CreateComment @commentCreated="appendAnotherComment" :post="post" />
  </div>
</template>

<script>
import { apiClient } from "../services/ApiClient";
import CreateComment from "./CommentWrite";
import Comment from "./Comment";

export default {
  name: "CommentsList",
  components: {
    CreateComment,
    Comment,
  },
  props: ["post"],
  data() {
    return {
      list: [],
      count: null,
    };
  },

  methods: {
    async fetchAllComments() {
      const res = await apiClient.get(`api/posts/${this.post.id}/comments/`);
      this.list = res.comments.rows;
    },
    appendAnotherComment(comment) {
      this.list.push(comment);
    },
    deleteComment(commentToDelete) {
      this.list = this.list.filter(
        (comment) => comment.id !== commentToDelete.id
      );
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.comment-box {
  background-color: rgba(108, 117, 125, 0.1);
  padding: 7px 13px;
  border-radius: 5px;
  margin-bottom: 0;
}

.display-comments {
  color: gray;
  background-color: transparent;
  border: none;
  font-weight: 500;
  padding: 5px;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    background: none;
    outline: none;
  }
}
</style>
