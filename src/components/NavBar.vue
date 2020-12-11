<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <div class="container">
      <b-navbar-brand href="#" :to="{ name: 'home' }">Hello Vue</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
          <b-nav-item href="#" :to="{ name: 'postList' }">Posts</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!this.$store.state.isAuthenticated">
          <b-nav-item href="#" :to="{ name: 'login' }">Login</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown :text="$store.state.user.name" right>
            <b-dropdown-item href="#">MyPage</b-dropdown-item>
            <b-dropdown-item @click.prevent="logout()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
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