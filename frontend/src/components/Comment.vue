<template>
  <div>
    <div class="d-flex align-items-center position-relative">
      <div class="comment-box">
        <router-link
          :to="{ name: 'UserProfile', params: { userId: comment.User.id } }"
          ><p class="name-surname mb-0 font-weight-bold">
            {{ comment.User.firstName }} {{ comment.User.lastName }}
          </p></router-link
        >
        <input
          v-if="update"
          ref="inputComment"
          v-model="comment.content"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="updateComment"
          @keydown.enter.shift.exact="newCommentLine"
          type="text"
          class="input-content border-0"
          aria-label="Update comment"
        />
        <p v-else class="mb-0">{{ comment.content }}</p>
      </div>
      <div class="position-relative">
        <EditButton
          customClass="comment-button"
          classCollapse="comment-btn-collapsed"
          :isCreator="comment.User.id == userData.id"
          @clickedEditButton="clickToUpdateComment"
          @onDelete="deleteComment"
          modifyText="Update"
          deleteText="Delete"
        />
      </div>
    </div>
    <p class="text-secondary comment-date">
      {{
        moment(comment.updatedAt)
          .locale("en")
          .fromNow("LL")
      }}
    </p>
  </div>
</template>

<script>
import { apiClient } from "../services/ApiClient";
import EditButton from "./EditButtonPost&Comment";

export default {
  name: "Comment",
  components: {
    EditButton,
  },
  props: ["comment", "post"],
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      update: false,
    };
  },
  methods: {
    toggleActions() {
      this.areActionsVisible = !this.areActionsVisible;
    },

    async deleteComment() {
      const res = await apiClient.delete(
        `api/posts/${this.post.id}/comments/${this.comment.id}`
      );
      this.$emit("commentDeleted", this.comment);
    },

    clickToUpdateComment() {
      this.update = true;
      setTimeout(() => {
        this.$refs.inputComment.focus();
      }, 30);
    },
    newCommentLine() {
      this.comment.content = `${this.comment.content}\n`;
    },

    async updateComment() {
      const res = await apiClient.put(
        `api/posts/${this.post.id}/comments/${this.comment.id}`,
        { content: this.comment.content }
      );
      this.comment.updatedAt = res.comment.updatedAt;
      this.update = false;
    },
  },
};
</script>

<style lang="scss">
.comment-button {
  position: static !important;
  margin-left: 10px;
}

.comment-btn-collapsed {
  left: 14px;
  top: 40px;
  width: 200px;
}

.input-content:focus {
  border-radius: 0.25rem;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.comment-date {
  margin-left: 58px;
  font-size: 0.8rem;
}

@media screen and (min-width: 280px) and (max-width: 767px) {
  .comment-date {
    font-size: 0.6rem;
  }

  .comment-button {
    margin-bottom: 0;
    margin-left: 3px;
  }

  .comment-btn-collapsed {
    left: 6px;
    top: 23px;
    width: 135px;
  }
}
</style>
