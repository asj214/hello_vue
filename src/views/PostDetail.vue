<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <img :src="attachments[0].url" class="card-img-top img-fluid" v-if="attachments.length > 0" />
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <span class="text-muted mb-2">{{ post.created_at | moment('YYYY.MM.DD') }}</span>
            <p class="card-text">{{ post.body }}</p>
          </div>
          <div class="card-body">
            <div class="float-left">
              <a href="#" @click.prevent="goPostList()" class="card-link">List</a>
              <a href="#" class="card-link" v-if="isContentsOwner(post.user_id)">Modify</a>
              <a href="#" class="card-link text-danger" v-if="isContentsOwner(post.user_id)">Delete</a>
            </div>
            <div class="float-right">
              <span class="color-link">
                <font-awesome-icon :icon="faCommentDots" />&nbsp;{{ post.comments_count }}
              </span>
              <a href="#">
                <font-awesome-icon :icon="faHeart" />&nbsp;0
              </a>
            </div>
          </div>
          <hr />
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="body">댓글</label>
                <textarea v-model="commentBody" class="form-control" aria-label="With textarea" required></textarea>
              </div>
              <button type="button" class="btn btn-block btn-light btn-outline-secondary" @click.prevent="commentCreate">작성</button>
            </form>
          </div>
          <div class="card-body" v-if="this.post.comments">
            <ul class="list-unstyled">
              <li class="media my-4" v-for="(comment, index) in this.post.comments" :key="index">
                <a href="#" @click.prevent="false">
                  <img src="https://via.placeholder.com/64" class="mr-3 rounded-circle" />
                </a>
                <div class="media-body">
                  <div>
                    <div class="float-left">
                      <a href="#"><b>{{ comment.user.name }}</b></a>
                      &nbsp;
                      <span class="text-monospace">{{ comment.created_at | moment('YYYY.MM.DD') }}</span>
                    </div>
                    <div class="float-right" v-if="isContentsOwner(comment.user_id)">
                      <a href="#" class="btn btn-link" @click.prevent="commentDestroy(comment.id)">Delete</a>
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
          <!-- end card body -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faCommentDots } from '@fortawesome/free-regular-svg-icons'

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
      post: null,
      attachments: [],
      commentBody: ''
    }
  },
  created() {
    this.getPostDetail()
  },
  methods: {
    goPostList () {
      this.$router.push({ path: `/posts` })
    },
    getPostDetail () {
      this.axios.get(`/posts/${this.postId}`).then((res) => {
        this.post = res.data.post
        this.attachments = res.data.post.attachments
      })
    },
    isContentsOwner (user_id) {
      return user_id === this.current_user_id
    },
    commentCreate () {
      let params = { body: this.commentBody }
      this.axios.post(`/posts/${this.postId}/comments`, params).then((res) => {
        if (res.status === 200) {
          this.commentBody = ''
          this.getPostDetail()
        }
      })
    },
    commentDestroy (commentId) {
      this.axios.delete(`/posts/${this.postId}/comments/${commentId}`).then((res) => {
        if (res.status === 200) {
          this.getPostDetail()
        }
      })
    }
  },
};
</script>
