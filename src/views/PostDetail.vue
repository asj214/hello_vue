<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="card">
        <img src="https://via.placeholder.com/800x600" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.body }}</p>
        </div>
        <div class="card-body">
          <div class="float-left">
            <a href="#" @click.prevent="goPostList()" class="card-link">List</a>
            <a href="#" class="card-link" v-if="isContentsOwner(post.user_id)">Modify</a>
            <a href="#" class="card-link text-danger" v-if="isContentsOwner(post.user_id)">Delete</a>
          </div>
          <div class="float-right">
            <a href="#">
              <font-awesome-icon :icon="faCommentDots" />&nbsp;{{ post.comments_count }}
            </a>
            <a href="#"><font-awesome-icon :icon="faHeart" />&nbsp;0 </a>
          </div>
        </div>
        <hr />
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="body">댓글</label>
              <textarea name="body" id="body" class="form-control" aria-label="With textarea" required></textarea>
            </div>
            <input type="submit" class="btn btn-block btn-light btn-outline-secondary" value="작성" />
          </form>
        </div>
        <div class="card-body" v-if="this.post.comments">
          <ul class="list-unstyled">
            <li class="media my-4" v-for="(comment, index) in this.post.comments" :key="index">
              <a href="#">
                <img src="https://via.placeholder.com/64" class="mr-3 rounded-circle" />
              </a>
              <div class="media-body">
                <div>
                  <div class="float-left">
                    <a href="#"><b>{{ comment.user.name }}</b></a>
                    &nbsp;
                    <span class="text-monospace">{{ comment.created_at }}</span>
                  </div>
                  <div class="float-right" v-if="isContentsOwner(comment.user_id)">
                    <a href="#" class="btn btn-link">Delete</a>
                  </div>
                </div>
                <br />
                <p>{{ comment.body }}</p>
                <div class="media-body">
                  <div class="float-right">
                    <a href="#">
                      <font-awesome-icon :icon="faHeart" />&nbsp;0
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
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
      current_user_id: this.$store.state.user.id,
      postId: this.$route.params.id,
      post: [],
    };
  },
  created() {
    this.getPostDetail();
  },
  methods: {
    goPostList() {
      this.$router.push({ path: `/posts` });
    },
    getPostDetail() {
      this.axios.get(`/posts/${this.postId}`, {}).then((res) => {
        this.post = res.data.post;
      });
    },
    isContentsOwner(user_id) {
      let ret = false;
      if (user_id == this.current_user_id) {
        ret = true;
      }
      return ret;
    },
  },
};
</script>