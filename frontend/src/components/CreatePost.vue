<template>
  <div>
    <b-form @submit="postSubmitted">
      <PostForm
        @onFileSelected="fileSelected"
        v-model="content"
        :onFormSubmit="formSubmitted"
        :isCreating="true"
      />
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PostForm from "./PostForm";

export default {
  name: "CreatePost",
  components: {
    PostForm,
  },
  props: {},
  data() {
    return {
      content: "",
      selectedFile: null,
      formSubmitted: false,
    };
  },
  methods: {
    ...mapActions(["createPost"]),

    fileSelected(file) {
      this.selectedFile = file;
    },

    async postSubmitted(event) {
      await this.createPost({
        selectedFile: this.selectedFile,
        content: this.content,
      });
      this.resetPostForm(event);
    },

    resetPostForm(event) {
      event.target.reset();
      this.content = "";
      this.selectedFile = null;
      this.formSubmitted = !this.formSubmitted;
    },
  },
};
</script>

<style lang="scss">
.custom-file-label {
  text-align: left;
}
</style>
