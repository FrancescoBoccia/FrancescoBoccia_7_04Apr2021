<template>
  <div>
    <EditButton
      :editingPost="true"
      :isCreator="post.userId == userData.id"
      @onDelete="onPostDeleted"
      :elementId="post.id"
      modifyText="Update Post"
      deleteText="Delete Post"
    >
      <b-modal
        :id="`modal-${post.id}`"
        title="Update Post"
        ok-title="Update"
        @ok="onPostUploaded"
        ok-only
      >
        <b-form>
          <PostForm
            :imgUrl="post.imageUrl"
            @onFileSelected="onFileSelected"
            v-model="content"
          />
        </b-form>
      </b-modal>
    </EditButton>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PostForm from "./PostForm";
import EditButton from "./EditButtonPost&Comment";

export default {
  name: "EditPost",
  components: {
    PostForm,
    EditButton,
  },
  props: ["post"],
  data() {
    return {
      content: this.post.content,
      userData: JSON.parse(localStorage.getItem("userData")),
      selectedFile: null,
    };
  },
  methods: {
    ...mapActions(["deletePost", "modifyPost"]),

    toggleActions() {
      this.areActionsVisible = !this.areActionsVisible;
    },

    async onPostDeleted() {
      await this.deletePost(this.post.id);
    },

    onFileSelected(file) {
      this.selectedFile = file;
    },

    async onPostUploaded() {
      if (!this.content.trim().length) return;
      await this.modifyPost({
        postId: this.post.id,
        selectedFile: this.selectedFile,
        content: this.content,
      });
    },
  },
};
</script>

<style></style>
