<template>
  <div>
    <DeleteAccountButton @onDeleteAccount="removingAccountConfirmation" />
  </div>
</template>

<script>
import { apiClient } from "../services/ApiClient";
import DeleteAccountButton from "../components/DeleteAccountButton";

export default {
  name: "UserDeleteAccount",
  components: {
    DeleteAccountButton,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
    };
  },
  methods: {
    async removingAccountConfirmation() {
      if (confirm("Are you sure you want to delete your account?")) {
        await apiClient.delete(`api/users/${this.userData.id}`);

        localStorage.clear();
        this.$router.push({
          path: "/login?deletedAccount=true",
        });
      }
    },
  },
};
</script>

<style lang="scss"></style>
