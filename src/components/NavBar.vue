<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="/">Hello Vue</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link :to="{ name: 'posts' }" class="nav-link">posts</router-link>
                    </li>
                </ul>
                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto" v-if="!this.$store.state.isAuthenticated">
                    <!-- Authentication Links -->
                    <li class="nav-item">
                        <router-link
                        :to="{ name: 'login' }"
                        exact
                        class="nav-link"
                        >
                        login
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto" v-else>
                    <li class="nav-item">
                        <a class="nav-link" @click.prevent="logout()">logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'NavBar',
    methods: {
        logout() {
            console.log('logout')
        }
    }
}
</script>