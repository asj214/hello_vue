<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="text-right">
          <router-link :to="{ path: '/posts/create' }" class="btn btn-outline-primary">Write</router-link>
        </div>
        <div>
          <div v-for="(post, index) in posts" :key="index">
            <hr>
            <div class="row">
              <div class="col-sm-4" v-if="post.attachments.length > 0">
                <img :src="post.attachments[0].url" class="img-fluid">
              </div>
              <div :class="post.attachments.length > 0 ? 'col-sm-8': 'col-sm-12'">
                <h3 class="title">
                  <a href="#" @click.prevent="goDetail(post.id)">{{ post.title }}</a>
                </h3>
                <p class="text-muted">{{ post.user.name }} - {{ post.created_at | moment('YYYY.MM.DD') }}</p>
                <p class="text-justify">{{ post.body }}</p>
                <div class="text-right">
                  <span class="mr-1 color-link"><font-awesome-icon :icon="faHeart" />&nbsp;0</span>
                  <span class="color-link"><font-awesome-icon :icon="faCommentDots" />&nbsp;{{ post.comments_count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faHeart, faCommentDots } from "@fortawesome/free-regular-svg-icons"

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      faHeart,
      faCommentDots,
      page: parseInt(this.$route.query.page) || 1,
      per_page: parseInt(this.$route.query.per_page) || 5,
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
      this.per_page = parseInt(query.per_page) || 5
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
.color-link {
  color: #007bff
}
</style>