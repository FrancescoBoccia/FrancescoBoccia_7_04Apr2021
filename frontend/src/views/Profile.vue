<template>
  <div>
    <Menu />

    <b-row class="text-center justify-content-center">
      <b-col id="card-moving" cols="12" lg="6">
        <b-card
          class="mx-auto border-0 shadow p-3 mb-4 mt-4 bg-4"
        >
          <b-form @submit="editUser">
            <b-form-group>
              <div class="d-flex align-items-center">
                <b-col sm="2" class="d-none d-lg-block p-0">
                  <label for="firstName"> First Name </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    v-model="input.firstName"
                    class="text-dark mb-3 pl-3"
                  ></b-form-input>
                </b-col>
              </div>
              <div class="d-flex align-items-center">
                <b-col sm="2" class="d-none d-lg-block p-0">
                  <label for="lastName"> Last Name </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    v-model="input.lastName"
                    class="text-dark mb-3 pl-3"
                  ></b-form-input>
                </b-col>
              </div>
              <div class="d-flex align-items-center">
                <b-col sm="2" class="d-none d-lg-block p-0">
                  <label for="email"> Email </label>
                </b-col>
                <b-col sm="10">
                  <b-form-input
                    id="email"
                    type="email"
                    placeholder="Email"
                    v-model="input.email"
                    class="mb-3 pl-3"
                    disabled
                  ></b-form-input>
                </b-col>
              </div>
            </b-form-group>
            <button
              type="submit"
              :class="`update-btn ${emptyInput ? 'disabled' : ''}`"
              :disabled="emptyInput"
              aria-label="Update"
            >
              Update
            </button>
          </b-form>

          <UserDeleteAccount />
        </b-card>
      </b-col>
    </b-row>

    <PostsList :userId="userData.id" />
  </div>
</template>

<script>
import { apiClient } from "../services/ApiClient";
import PostsList from "../components/PostsList";
import Menu from "../components/Menu";
import UserDeleteAccount from "../components/UserDeleteAccount";

export default {
  name: "Profile",
  components: {
    PostsList,
    Menu,
    UserDeleteAccount,
  },
  data() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return {
      userData,
      input: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      },
    };
  },
  methods: {
    editUser(event) {
      let body = this.input;

      const isFormData = null;

      if (isFormData) {
        const formData = new FormData();
        formData.append("user", JSON.stringify(body));
        body = formData;
      }
      apiClient.put("api/auth/update", body, { isFormData }).then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.user));
        this.userData = res.user;
        window.location.reload();
      });
    },
  },
  computed: {
    emptyInput() {
      return (
        !this.input.firstName.trim().length ||
        !this.input.lastName.trim().length
      );
    },
  },
};
</script>

<style lang="scss">
.row {
  margin-left: 0;
  margin-right: 0;
}

.update-btn {
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: 1rem;
  border: none;
  margin-bottom: 1rem;
  padding: 0.375rem 0.75rem;
  &:hover,
  &:focus,
  &:active {
    background-color: royalblue;
    color: white;
    outline: none;
  }
}

.card-body {
  padding-bottom: 0;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .create-button {
    width: 100% !important;
  }

  .shadow {
    box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.08) !important;
  }
}
</style>
