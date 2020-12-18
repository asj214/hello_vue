<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="text-right">
          <router-link :to="{ path: '/posts/create' }" class="btn btn-outline-primary">Write</router-link>
        </div>
        <hr>
        <div>
          <div class="row">
            <div class="col-md-4" v-for="(post, index) in posts" :key="index">
              <div class="card mb-3">
                <img :src="post.attachments[0].url" class="card-img-top" v-if="post.attachments.length > 0">
                <div class="card-body">
                  <span class="text-muted mb-2">{{ post.created_at | moment('YYYY.MM.DD') }}</span>
                  <h5 class="card-title">
                    <v-clamp autoresize :max-lines="1">{{ post.title }}</v-clamp>
                  </h5>
                  <p class="card-text">
                    <v-clamp autoresize :max-lines="4">{{ post.body }}</v-clamp>
                  </p>
                  <a href="#" class="btn btn-primary" @click.prevent="goDetail(post.id)">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" v-for="(p, k) in paginate.total_pages" :key="k" :class="{ active: p === page }">
                <a href="#" class="page-link" @click.prevent="p !== page ? handlePageMove(p): null">{{ p }}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VClamp from 'vue-clamp'

export default {
  components: {
    VClamp
  },
  data() {
    return {
      page: parseInt(this.$route.query.page) || 1,
      per_page: parseInt(this.$route.query.per_page) || 6,
      category_id: 2,
      posts: [],
      paginate: {}
    };
  },
  created() {
    this.getPostList()
  },
  watch: {
    '$route.query' (query) {
      this.page = parseInt(query.page) || 1
      this.per_page = parseInt(query.per_page) || 6
      this.getPostList()
    }
  },
  methods: {
    getPostList () {
      let params = {
        category_id: this.category_id,
        page: this.page,
        per_page: this.per_page
      }
      this.axios.get("posts", { params: params }).then((res) => {
        this.posts = res.data.posts
        this.paginate = res.data.meta.pagination
      })
    },
    goWrite () {
      console.log('Go Write')
    },
    goDetail (id) {
      this.$router.push({ path: `/posts/${id}` })
    },
    handlePageMove (page) {
      this.page = parseInt(page)
      this.$router.push({
        query: {
          page: parseInt(page),
          per_page: this.per_page
        }
      })
    }
  },
};
</script>
<style>
.card-body, card-title, .card-text {
  font-weight: 400
}
</style>
