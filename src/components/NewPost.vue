<template>
  <form>
    <el-dialog
      v-loading="loading"
      title="Crie uma nova postagem"
      :visible.sync="loginVisible"
    >
      <h3>Título:</h3>
      <el-input
        placeholder="Digite o titulo da postagem"
        v-model="post.title"
      />
      <h3>Conteúdo:</h3>

      <vue-editor v-model="post.content" style="max-height: 25vh; overflow-y: auto"></vue-editor>
      <!-- <el-input
        type="textarea"
        autosize
        placeholder="Conteúdo da postagem"
        v-model="post.content">
      </el-input> -->
      
      <br><br>
      <el-button
        type="danger"
        icon="el-icon-close"
        @click="loginVisible = false"
        round
      >
        &nbsp;Sair&nbsp;
      </el-button>

      <el-button
        type="primary"
        icon="el-icon-arrow-right"
        @click="create"
        round
      >
      Criar
      </el-button> 
    </el-dialog>
  </form>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {
    name: 'NewPost',
    props: ['cat'],
    components: {VueEditor},
    data() {
      return {
        loginVisible: false,
        post: {
          title: '',
          content: '<h2>Introdução</h2>...<h2>Preparação</h2>...<h2>Plano de ação</h2>...<h2>Próximo a prova</h2>...<h2>Na prova</h2>...<h2>Falhei, e agora?</h2>...<h2>Passei!</h2>...<h2>Dicas</h2>...',
          visible: false
        },
        loading: false
      };
    },
    methods: {
      show() {
        this.loginVisible = true
      },
      create(){
        this.$db().ref(`/categorys/${this.cat}/posts`).push(
          this.post
        )
        this.post = {
          title: '',
          content: ''
        };
        this.$notify({
          title: 'Postagem criada!',
          message: 'Postagem foi criada com sucesso, obrigado por contribuir.',
          type: 'success',
          position: 'bottom-right'
        })
        this.loginVisible = false
      },
    }
  }
</script>
