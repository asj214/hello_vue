<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <div class="container">
      <b-navbar-brand href="#" :to="{ name: 'home' }">Hello Vue</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" :to="{ name: 'postList' }">Posts</b-nav-item>
          <b-nav-item href="#" :to="{ name: 'login' }" v-if="!this.$store.state.isAuthenticated">Login</b-nav-item>
          <b-nav-item-dropdown :text="$store.state.user.name" right v-else>
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