<template>
  <div>
    <b-card
      class="mx-auto border-0 shadow p-0 p-lg-3 mb-2 mt-2 mb-lg-5 mt-lg-3 bg-white rounded"
    >
      <div class="d-flex align-items-center">
        <div class="text-left">
          <router-link
            :to="{ name: 'UserProfile', params: { userId: post.User.id } }"
            ><p class="font-weight-bold mb-0">
              {{ post.User.firstName }} {{ post.User.lastName }}
            </p></router-link
          >
          <p class="text-secondary">
            {{
              moment(post.createdAt)
                .locale("en")
                .format("LLL")
            }}
          </p>
        </div>
      </div>
      <EditPost :post="post" />

      <b-card-text class="text-left mt-3 mb-0 mb-lg-3" v-if="post.content">
        {{ post.content }}
      </b-card-text>

      <div
        class="post d-flex align-items-center justify-content-center my-1 mb-lg-4"
        v-if="post.imageUrl"
      >
        <img
          v-b-modal="`modal-photo-${post.id}`"
          class="post__image"
          :src="post.imageUrl"
          alt=""
        />
        <b-modal
          :id="`modal-photo-${post.id}`"
          size="xl"
          class="modal-photo"
          header-class="header-style"
        >
          <div slot="modal-title"></div>
          <div class="d-flex align-items-center justify-content-center">
            <img
              class="modal-photo__img"
              :src="post.imageUrl"
              alt="Whatever user choose"
            />
          </div>
          <div slot="modal-footer"></div>
        </b-modal>
      </div>

      <LikesList :post="post" :likesCount="likesCount" />

      <div class="line"></div>

      <div class="footer d-flex justify-content-around">
        <button
          @click="likeOrDislikePost"
          class="react-btn footer-btn btn-block"
          aria-label="Like or Dislike"
        >
          <b-icon
            v-if="likeThisPost"
            icon="hand-thumbs-up"
            class="mr-2"
          ></b-icon>
          <b-icon
            v-else
            icon="hand-thumbs-up"
            fill="currentColor"
            class="mr-2"
          ></b-icon>

          <span :class="`ml-2 ${likeThisPost ? 'blue' : ''}`">Like</span>
        </button>
        <button
          class="react-btn footer-btn btn-block"
          @click="focusInput(post)"
          aria-label="Comment"
        >
          <b-icon icon="chat-left" class="mr-2"></b-icon>
          <span class="ml-2">Comment</span>
        </button>
      </div>
      <div class="line mb-3"></div>
      <CommentsList :post="post" />
    </b-card>
  </div>
</template>

<script>
import { apiClient } from "../services/ApiClient";
import EditPost from "../components/EditPost";
import CommentsList from "../components/CommentsList";
import LikesList from "../components/LikesListUsers";

export default {
  name: "Post",
  components: {
    EditPost,
    CommentsList,
    LikesList,
  },
  props: ["post"],
  async mounted() {
    const res = await apiClient.get(`api/posts/${this.post.id}/like`);
    this.likeThisPost = res.like;
  },
  data() {
    return {
      likeThisPost: false,
      likesCount: this.post.likesCount,
    };
  },
  methods: {
    async likeOrDislikePost() {
      const res = await apiClient.post(`api/posts/${this.post.id}/likes`);

      if (res.like !== this.likeThisPost) {
        this.likesCount += res.like ? 1 : -1;
      }

      this.likeThisPost = res.like;
    },

    focusInput() {
      document.getElementById(`comment-area-${this.post.id}`).focus();
    },
  },
};
</script>

<style lang="scss">
.btn-block + .btn-block{
  margin-top: 0px;
  margin-bottom: 0px;
}

.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: gray;
}

.blue {
  color: royalblue;
}
.react-btn {
  background: white;
  border: none;
  margin: 0px;
  color: #747474;
  border-radius: 0.25rem;
  font-weight: bold;
  padding: 8px 8px;
  &:focus {
    border: none !important;
    outline: none !important;
  }
  &:hover {
    color: #747474 !important;
    background-color: rgba(108, 117, 125, 0.1) !important;
  }
}

.like-btn {
  color: #747474;
  font-weight: normal;
  &:hover,
  &:focus,
  &:active {
    color: #747474 !important;
    font-weight: normal;
    background: none !important;
  }
}

.modal-photo {
  &__img {
    max-width: 100%;
    max-height: calc(100vh - 110px);
  }
}

.header-style {
  padding-bottom: 0;
  border-bottom: none;
}
</style>
