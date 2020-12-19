<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="text-right">
          <router-link :to="{ path: '/posts/create' }" class="btn btn-outline-primary">Write</router-link>
        </div>
        <hr>
        <div class="post-lists">
          <div class="row">
            <div class="col-md-4 col-xs-12" v-for="(post, index) in posts" :key="index">
              <div class="card shadow-sm mb-4">
                <img :src="post.attachments[0].url" class="card-img-top" v-if="post.attachments.length > 0">
                <div class="card-body">
                  <div class="float-none mb-2">
                    <small class="text-muted">
                      <b-icon icon="calendar3"></b-icon> {{ post.created_at | moment('YYYY.MM.DD') }}
                    </small>
                    <small class="text-muted">
                      <b-icon icon="person-fill"></b-icon> {{ post.user.name }}
                    </small>
                  </div>
                  <h5 class="card-title">
                    <v-clamp autoresize :max-lines="1">{{ post.title }}</v-clamp>
                  </h5>
                  <p class="card-text">
                    <v-clamp autoresize :max-lines="4">{{ post.body }}</v-clamp>
                  </p>
                  <a href="#" class="btn btn-primary" @click.prevent="goDetail(post.id)">Read More</a>
                </div>
                <div class="card-footer bg-transparent">
                  <div class="float-right">
                    <span class="color-link">
                      <b-icon icon="chat-dots"></b-icon> {{ post.comments_count }}
                    </span>
                    <span class="color-link">
                      <b-icon icon="heart"></b-icon> {{ post.likes_count }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <nav aria-label="Page navigation">
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
<style lang="scss" scoped>
.post-lists {
  .card-body, .card-title, .card-text {
    font-weight: 400;
    font-style: normal;
  }
  .card-text { color: #999; }
}
</style>
