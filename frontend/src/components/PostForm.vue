<template>
  <div>
    <b-form-group>
      <div class="d-flex align-items-center">
        <b-form-textarea
          :value="value"
          @input="updateValue"
          id="content"
          :placeholder="`Write something funny, ${userData.firstName}!!`"
          aria-label="Write post"
          class="text-dark mb-2 mr-2 w-100"
        ></b-form-textarea>
      </div>
      <div
        id="preview-img"
        class="d-flex justify-content-center align-items-center"
      >
        <img
          class="mt-3"
          v-if="url"
          :src="url"
          alt="Whatever the user choose"
        />
      </div>
    </b-form-group>
    <div class="line "></div>
    <b-form-group>
      <div class="d-flex justify-content-around">
        <button
          class="d-flex align-items-center justify-content-center create-post-button btn-block"
          @click="chooseFile"
          type="button"
          aria-label="Choose an image"
        >
          <span class="mr-2 d-none d-md-block">Choose an image </span>
          <b-icon icon="image-fill" class="text-primary"></b-icon>
        </button>
        <button
          v-if="isCreating"
          :class="
            `d-flex align-items-center justify-content-center create-post-button btn-block ${
              emptyPost ? 'disabled' : ''
            }`
          "
          :disabled="emptyPost"
          type="submit"
          aria-label="Publish"
        >
          <span class="mr-2 d-none d-md-block">Publish</span>
          <b-icon icon="caret-right-fill" class="text-primary"></b-icon>
        </button>
        <input
          ref="fileInput"
          class="d-none"
          type="file"
          @change="onFileSelected"
        />
      </div>
      <div class="line "></div>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "PostForm",
  components: {},
  props: ["value", "imgUrl", "onFormSubmit", "isCreating"],
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      url: this.imgUrl,
    };
  },
  watch: {
    onFormSubmit() {
      this.url = null;
    },
  },
  methods: {
    onFileSelected(event) {
      this.url = URL.createObjectURL(event.target.files[0]);
      this.$emit("onFileSelected", event.target.files[0]);
    },
    updateValue(value) {
      this.$emit("input", value);
    },
    chooseFile() {
      this.$refs.fileInput.click();
    },
  },
  computed: {
    emptyPost() {
      return !this.value.trim().length && !this.url;
    },
  },
};
</script>

<style lang="scss">
#preview-img img {
  max-width: 50%;
  max-height: 300px;
}

.disabled {
  cursor: not-allowed;
}

.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: black;
}

.create-post-button {
  background: white;
  color: #747474;
  border: none;

  border-radius: 0.25rem;
  font-weight: 600;
  padding: 8px;
  &:hover {
    background-color: rgba(108, 117, 125, 0.1);
  }
  &:active,
  &:focus {
    background-color: white !important;
    outline: none;
  }
}
</style>
