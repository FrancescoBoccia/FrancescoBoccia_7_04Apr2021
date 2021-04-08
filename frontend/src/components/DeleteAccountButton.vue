<template>
  <div>
    <div class="d-flex justify-content-center">
      <button
        class="delete-account d-flex justify-content-center align-items-center"
        aria-label="Delete account"
      >
        <p @click="onDeleteAccount" class="my-2 mr-lg-3">
          Delete account
        </p>
        <b-icon icon="trash-fill"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteAccountButton",
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
    };
  },
  methods: {
    async onDeleteAccount() {
      this.$emit("onDeleteAccount");
    },
  },
};
</script>

<style lang="scss">
.delete-account {
  font-size: 15px;
  background-color: transparent;
  border: none;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: none;
  }
}
</style>
