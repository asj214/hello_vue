<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <img :src="attachments[0].url" class="card-img-top img-fluid" v-if="attachments.length > 0" />
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <div class="mb-2">
              <span class="text-muted">{{ post.created_at | moment('YYYY.MM.DD') }}</span>
            </div>
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
                <b-icon icon="chat-dots"></b-icon> {{ post.comments_count }}
              </span>
              <a href="#" @click.prevent="likeAction('posts', post.id)">
                <b-icon icon="heart"></b-icon> {{ post.likes_count }}
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
          <div class="card-body" v-if="this.comments">
            <ul class="list-unstyled">
              <li class="media my-4" v-for="(comment, index) in this.comments" :key="index">
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
                  <br style="clear:both;">
                  <p>{{ comment.body }}</p>
                  <div class="media-body">
                    <div class="float-right">
                      <a href="#" @click.prevent="likeAction('comments', comment.id)">
                        <b-icon icon="heart"></b-icon> {{ comment.likes_count }}
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
export default {
  components: {
  },
  data() {
    return {
      current_user_id: this.$store.state.user.id,
      postId: this.$route.params.id,
      post: {
        id: null,
        title: '',
        body: '',
        user: null,
        comments_count: 0,
        likes_count: 0,
        created_at: '1988-02-14',
      },
      attachments: [],
      comments: [],
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
    async getPostDetail () {
      await this.axios.get(`/posts/${this.postId}`).then((res) => {
        this.post = res.data.post
        this.comments = res.data.post.comments
        this.attachments = res.data.post.attachments
      })
    },
    isContentsOwner (user_id) {
      return user_id === this.current_user_id
    },
    commentLists () {
      let params = {
        commentable_id: this.postId,
        commentable_type: 'posts'
      }
      this.axios.get('/comments', { params: params }).then((res) => {
        if (res.status === 200) {
          this.comments = res.data.comments
        }
      })
    },
    commentCreate () {
      let params = { body: this.commentBody }
      this.axios.post(`/posts/${this.postId}/comments`, params).then((res) => {
        if (res.status === 200) {
          this.commentBody = ''
          this.post = res.data.post
        }
      })
    },
    commentDestroy (commentId) {
      this.axios.delete(`/posts/${this.postId}/comments/${commentId}`).then((res) => {
        if (res.status === 200) {
          this.post = res.data.post
        }
      })
    },
    likeAction (likeable, id) {
      let params = {
        likeable_type: likeable,
        likeable_id: id
      }
      this.axios.post(`/likes`, params).then((res) => {
        if (res.status === 200) {
          if (likeable === 'posts') {
            this.post.likes_count += 1
          } else if (likeable == 'comments') {
            this.commentLists()
          }
        }
      })
    }
  }
}
</script>
