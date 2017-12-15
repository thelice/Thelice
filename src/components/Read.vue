<template>
<div>
  <div class="title">
    <h1>{{ post.title }}</h1>
  </div>
  <br>
  <div class="row" v-html="post.content"></div>

  <hr>
  <div class="comments" style="padding: 20px">
    <vue-disqus shortname="Thelice" :identifier="url" :url="url"></vue-disqus>
  </div>
</div>
</template>

<script>
  import VueDisqus from 'vue-disqus/VueDisqus.vue'

  export default {
    components: {
      VueDisqus
    },
    props: ['cat', 'uid'],
    data: () => ({
      post: {title: '', content: ''},
      url: ''
    }),
    mounted() {
      this.url = window.location.href
      this.load()
    },
    methods: {
      load() {
        this.$db().ref(`/categorys/${this.cat}/posts/${this.uid}`).on('value', response => {
          this.post = response.val()
        })
      }
    }
  }
</script>

<style>

  #img {
    height: 35%;
    width: 25%;
  }

  .title {
    text-align: center;
  }

  .row {
    text-align: left;
    padding-right: 3%;
    padding-left: 3%;
  }

  ol, ol>li {
    display: block;
  }

@media (max-width: 800px) {
  #img {
    height: 55%;
    width: 55%;
  }
}
</style>
