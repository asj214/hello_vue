<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <div class="container">
      <a class="navbar-brand" href="/">Hello Vue</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Left Side Of Navbar -->
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'postList' }" class="nav-link">posts</router-link>
          </li>
        </ul>
        <!-- Right Side Of Navbar -->
        <ul class="navbar-nav ml-auto" v-if="!this.$store.state.isAuthenticated">
          <!-- Authentication Links -->
          <li class="nav-item">
            <router-link :to="{ name: 'login' }" exact class="nav-link">login</router-link>
          </li>
        </ul>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown :text="$store.state.user.name" right>
            <b-dropdown-item href="#">MyPage</b-dropdown-item>
            <b-dropdown-item @click.prevent="logout()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
    },
  },
};
</script>