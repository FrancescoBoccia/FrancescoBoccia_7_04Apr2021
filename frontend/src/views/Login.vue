<template>
  <div class="page-container">
    <b-container fluid>
      <b-row class="text-center justify-content-center">
        <b-col cols="12" lg="4">
          <b-card
            class="border-0 shadow p-2 mt-4"
          >
            <div class="pt-sm-3 pt-lg-0">
              <b-card-text class="login-text h3">Log In</b-card-text>

              <b-form>
                <b-form-group>
                  <b-form-input
                    id="email"
                    type="email"
                    placeholder="Email"
                    v-model="input.email"
                    class="account-input text-dark mb-2 mt-4 pl-3 w-100"
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
                  v-on:click.stop="logIn()"
                  type="submit"
                  class="account-btn font-weight-bold"
                >
                  Log In
                </button>
                <p class="my-4 text-danger">{{ errorMessage }}</p>
              </b-form>
            </div>
            <div class="line my-4"></div>

            <p class="font-small grey-text d-flex justify-content-center mb-2">
              Why? You still don't have an account?
              <router-link
                to="/signup"
                class="create-account font-weight-bold ml-5"
              >
                Create your account</router-link
              >
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Signup from "../components/Signup";
import { apiClient } from "../services/ApiClient";
import router from "../router/index";

export default {
  name: "Login",
  components: {
    Signup,
  },
  data() {
    return {
      errorMessage: "",
      input: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    logIn() {
      if (this.input.email != "" && this.input.password != "") {
        apiClient
          .post("api/auth/login", this.input)
          .then((data) => {
            if (!data.token) {
              this.errorMessage = "User not found";
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
              return (this.errorMessage = error.error);
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
a {
  text-decoration: none;
  color: black !important;
}

.line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: black;
}


.account-input:focus {
  border: none;
  border-radius: 6px;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(10, 99, 223, 0.5);
}
</style>
