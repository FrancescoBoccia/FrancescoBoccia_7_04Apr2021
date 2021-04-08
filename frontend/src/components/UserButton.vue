<template>
  <div>
    <button
      @click="toggleActions"
      class="profile-btn d-flex position-fixed justify-content-center align-items-center"
      aria-label="Afficher les actions"
    >
      <span class="profile-btn-name-last-name d-none d-lg-block"
        >{{ userData.firstName }} {{ userData.lastName }}</span
      ><b-icon icon="person-circle" class="user-button-mobile"></b-icon>
    </button>
    <b-collapse
      id="profile-btn-collapse"
      v-bind:class="
        `collapsed mt-2 position-fixed ${areActionsVisible && 'visible'}`
      "
    >
      <b-card class="border-0" @click="toggleActions">
        <p class="card-text">
          <button
            class="collapsed-btn btn-block text-left"
            @click="choosePage('Profile')"
            aria-label="My profile"
          >
            <b-icon icon="person-circle" class="mr-2"></b-icon>My Profile
          </button>
        </p>
        <p class="card-text">
          <button
            class="collapsed-btn btn-block text-left"
            @click="choosePage('Posts')"
            aria-label="Home"
          >
            <b-icon icon="house-door" class="mr-2"></b-icon>Home
          </button>
        </p>
        <p class="card-text">
          <button class="collapsed-btn btn-block text-left" @click="signOut">
            <b-icon icon="door-open" class="mr-2"></b-icon>
            Sign out
          </button>
        </p>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "ProfileButton",
  components: {},
  props: {},
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      areActionsVisible: false,
    };
  },
  methods: {
    toggleActions() {
      this.areActionsVisible = !this.areActionsVisible;
    },
    signOut() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
    choosePage(name) {
      if (name === this.$route.name) return window.location.reload();
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss">
.profile-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.profile-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.profile-btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}
.profile-btn {
  font-weight: 500;
  text-align: center;
  border: none;
  color: black;
  top: 28px;
  right: 63px;
  height: 40px;
  padding: 5px 0 5px 10px;
  border: 0.5px solid black;
  border-radius: 10px;
  z-index: 2;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
}

.collapsed-btn {
  font-weight: 500;
  color: #000;
  background-color: white;
  border: none;
  padding: 5px 9px;
  &:hover,
  &:focus,
  &active {
    background-color: royalblue;
    outline: none;
    transition: 0.6s ease all !important;
    transform: scale(1.1);
  }
  .b-icon {
    font-size: 105%;
    vertical-align: text-bottom;
  }
}
.collapsed .card-body {
  border-radius: 10px;
}

#profile-btn-collapse {
  top: 68px;
  right: 65px;
  z-index: 1;
}

@media screen and (min-width: 280px) and (max-width: 769px) {
  .profile-btn {
    top: 35px;
    right: 20px;
    height: 25px;
    padding: 9px;
    color: royalblue;
    &:hover {
      outline: none;
    }
    &:focus {
      outline: none;
    }
  }

  .user-button-mobile {
    text-decoration: none;
    color: black;
  }

  #profile-btn-collapse {
    top: 45px;
    right: 15px;
  }
}

@media screen and (min-width: 769px) and (max-width: 992px) {
  .profile-btn-name-last-name {
    display: block !important;
  }
}

@media screen and (min-width: 992px) and (max-width: 3000px) {
  .user-button-mobile {
    visibility: hidden;
  }
}
</style>
