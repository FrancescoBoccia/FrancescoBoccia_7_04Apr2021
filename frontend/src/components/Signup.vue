<template>
  <div class="page-container">
    <b-container fluid>
      <b-row class="text-center justify-content-center">
        <b-col cols="12" lg="4">
          <b-card
            class="account-card border-0 shadow p-3 mb-5 mt-3 bg-white rounded"
          >
            <div class="pt-sm-3 pt-lg-0">
              <b-card-text class="login-text h3">Sign In</b-card-text>
              <b-form>
                <b-form-group>
                  <b-form-input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    v-model="input.firstName"
                    class="account-input text-dark mb-2 mt-3 pl-3 w-100"
                  ></b-form-input>
                  <b-form-input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    v-model="input.lastName"
                    class="account-input text-dark mb-2 pl-3 w-100"
                  ></b-form-input>
                  <b-form-input
                    id="email"
                    type="email"
                    placeholder="Email"
                    v-model="input.email"
                    class="account-input text-dark mb-2 pl-3 w-100"
                  ></b-form-input>
                  <b-form-input
                    id="password"
                    type="password"
                    placeholder="Password"
                    v-model="input.password"
                    class="account-input text-dark mb-2 pl-3 w-100"
                  ></b-form-input>
                </b-form-group>

                <button
                  v-on:click.stop="signUp()"
                  type="submit"
                  id="signup-button"
                  class="account-btn font-weight-bold">
                  Register
                </button>
                <p class="mb-4 text-danger">{{ errorMessage }}</p>
              </b-form>
            </div>
            <div class="line mb-4"></div>

            <p class="font-small grey-text d-flex justify-content-center mb-1">
              Already own an account?
              <router-link to="/login" class="log-in font-weight-bold ml-3">
                Log In</router-link
              >
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { apiClient } from "../services/ApiClient";
import router from "../router/index";

export default {
  name: "Signup",
  data() {
    return {
      errorMessage: "",
      input: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signUp() {
      if (
        this.input.firstName != "" &&
        this.input.lastName != "" &&
        this.input.email != "" &&
        this.input.password != ""
      ) {
        apiClient
          .post("api/auth/signup", this.input)
          .then((data) => {
            if (!data.token) {
              this.errorMessage = data.error.errors[0].message;
            } else {
            const storage = {
                id: data.user.id,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                email: data.user.email,
                imageUrl: data.user.imageUrl,
                deleted: false,
              };
              localStorage.setItem("userToken", data.token);
              localStorage.setItem("userData", JSON.stringify(storage));
              router.push({ name: "Posts" });
            }
          })
          .catch((error) => {
            if (error.error) {
              return (this.errorMessage = error.error.errors[0].message);
            }

            this.errorMessage = "Connection problem";
          });
      } else {
        this.errorMessage = "Fill up empty spaces";
      }
    },
  },
};
</script>

<style lang="scss">
.account-btn {
  background-color: black;
  color: white;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
  padding: 0.375rem 0.75rem;
  &:hover,
  &:focus,
  &:active {
    background-color: royalblue;
    color: white;
    outline: none;
  }
}
.log-in {
  color: black;
  &:hover {
    color: royalblue !important;
  }
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .account-card {
    .card-body {
      padding: 0.7rem;
    }
  }

  .shadow {
    box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.08) !important;
  }

  .login-text {
    font-size: 1.1rem;
  }
}
</style>
