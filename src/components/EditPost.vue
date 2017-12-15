<template>
  <form>
    <el-dialog
      v-loading="loading"
      title="Editar essa postagem"
      :visible.sync="loginVisible"
    >
      <h3>Título:</h3>
      <el-input
        placeholder="Digite o titulo da postagem"
        v-model="post.title"
      />
      <h3>Conteúdo:</h3>

      <vue-editor v-model="post.content" style="max-height: 25vh; overflow-y: auto"></vue-editor>

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
        @click="edit"
        round
      >
      Editar
      </el-button> 
    </el-dialog>
  </form>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {
    name: 'EditPost',
    props: ['cat'],
    components: {VueEditor},
    data() {
      return {
        uid: '',
        loginVisible: false,
        post: {
          title: '',
          content: ''
        },
        loading: false
      };
    },
    methods: {
      show(uid) {
        this.uid = uid

        this.$db().ref(`/categorys/${this.cat}/posts/${uid}`).on('value', response => {
          this.post = response.val()
          delete this.post.visible

          this.loginVisible = true
        })
      },
      edit(){
        this.post.uid = this.uid
        this.$db().ref(`/categorys/${this.cat}/edits`).push(
          this.post
        )
        this.post = {
          title: '',
          content: ''
        };
        this.$notify({
          title: 'Postagem editada!',
          message: 'Postagem foi editada com sucesso, obrigado por contribuir.',
          type: 'success',
          position: 'bottom-right'
        })
        this.loginVisible = false
      },
    }
  }
</script>
