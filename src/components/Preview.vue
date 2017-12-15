<template>
<div>
  <div class="title">
    <h1>{{ post.title }}</h1>
  </div>
  <br>
  <div class="row" v-html="post.content"></div>
</div>
</template>

<script>

  export default {
    props: ['cat', 'uid'],
    data: () => ({
      post: {title: '', content: ''},
      url: ''
    }),
    mounted() {
      this.url = window.location.href
      this.load()
      this.$notify.warning({
        title: 'Atenção!',
        message: 'Você está vendo a previsualização do post, para que ele seja habilitado, ative ele como administrador.',
        showClose: false,
        position: 'bottom-right'
      });
    },
    methods: {
      load() {
        this.$db().ref(`/categorys/${this.cat}/edits/${this.uid}`).on('value', response => {
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
