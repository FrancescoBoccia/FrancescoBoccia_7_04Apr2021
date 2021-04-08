<template>
  <div>
    <button
      v-b-modal="`modal-likes-${post.id}`"
      @click="fetchLikesList"
      v-if="likesCount > 0"
      class="like-btn d-flex align-items-center my-2 mt-lg-0 mb-lg-3 ml-2 text-left"
    >
      <div
        class="like-count-container d-flex justify-content-center align-items-center"
      >
        <icon name="likesCounter"></icon>
      </div>
      <span class="likes-number ml-2">{{ likesCount }}</span>
    </button>
    <b-modal :id="`modal-likes-${post.id}`" :title="`${likesCount} Like`">
      <div v-for="like in likesList" :key="like">
        <router-link
          :to="{ name: 'UserProfile', params: { userId: like.User.id } }"
        >
          <div class="d-flex align-items-center">
            <p class="userProfile">
              {{ like.User.firstName }} {{ like.User.lastName }}
            </p>
          </div></router-link
        >
      </div>
      <div slot="modal-footer"></div>
    </b-modal>
  </div>
</template>

<script>
import { apiClient } from "../services/ApiClient";
import Icon from "./Icons.vue";

export default {
  name: "LikesList",
  components: {
    Icon,
  },
  props: ["post", "likesCount"],
  data() {
    return {
      likesList: [],
    };
  },
  methods: {
    async fetchLikesList() {
      const res = await apiClient.get(`api/posts/${this.post.id}/likes`);
      this.likesList = res.allLikes;
    },
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none !important;
  color: black;
}
.like-btn {
  background-color: transparent;
  border: none;
  &:focus {
    outline: none;
  }
}

.modal-body {
  padding: 12px;
  padding-bottom: 0px;
}

.modal-title {
  color: royalblue;
  font-size: 18px;
  font-weight: 500;
}

.modal-footer {
  padding: 0;
  border-top: none;
}

.likes-number {
  font-size: 15px;
}

@media screen and (min-width: 280px) and (max-width: 767px) {
  .modal-title {
    font-size: 14px;
  }

  .likes-number {
    font-size: 13px;
  }
}

.like-count-container {
  border-radius: 100%;
  background-color: rgb(32, 120, 244);
  width: 25px;
  height: 25px;
}
</style>
