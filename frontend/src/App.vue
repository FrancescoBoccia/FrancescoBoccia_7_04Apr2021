<template>
  <div id="app">
    <div
      id="nav"
      class="d-flex sticky-top justify-content-start justify-content-sm-center mb-2 p-2"
    >
      <router-link to="/">
        <img
          id="logo"
          :src="require('./assets/icon-left-font-monochrome-black.svg')"
          alt="Groupomania Logo"
          width="200"
          height="200"
        />
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  background: white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  height: 90px;
  z-index: 1;
  #logo {
    max-width: 500px;
    position: relative;
    bottom:83%;
  }
}

@media screen and (min-width: 280px) and (max-width: 767px) {
  body,
  .btn,
  .form-control {
    font-size: 13px !important;
  }

  #nav #logo {
    max-width: 180px;
    margin-left: 5rem;
  }
}

@media screen and (min-width: 767px) and (max-width: 991px) {
  #nav #logo {
    max-width: 200px;
  }
}
</style>
