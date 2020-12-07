<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div
        class="col-md-3 col-xs-12"
        v-for="(post, index) in posts"
        :key="index"
        @click.prevent="goDetail(post.id)"
      >
        <div class="card mb-4">
          <div class="carousel">
            <img :src="post.attachments[0].url" class="card-img-top" />
          </div>
          <div class="card-body">
            <h5 class="card-title">
              <a href="#">{{ post.title }}</a>
            </h5>
            <p class="card-text">{{ post.body }}</p>
          </div>
          <div class="card-body custom-box">
            <a href="#">
              <font-awesome-icon :icon="faCommentDots" />&nbsp;{{
                post.comments_count
              }}
            </a>
            <a href="#"> <font-awesome-icon :icon="faHeart" />&nbsp;0 </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart, faCommentDots } from "@fortawesome/free-regular-svg-icons";

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      faHeart,
      faCommentDots,
      page: 1,
      category_id: 2,
      posts: [],
    };
  },
  created() {
    this.getPostList();
  },
  methods: {
    getPostList() {
      let params = {
        category_id: this.category_id,
        page: this.page,
      };
      this.axios.get("posts", { params: params }).then((res) => {
        this.posts = res.data.posts;
      });
    },
    goDetail(id) {
      this.$router.push({ path: `/posts/${id}` });
    },
  },
};
</script>