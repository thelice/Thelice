<template>
  <el-dialog v-loading="loading" title="Faça seu cadastro" :visible.sync="registerVisible" width="35%">
        <h3>Nome:</h3>
        <el-input placeholder="Digite seu nome" v-model="name"></el-input>
        <h3>Email:</h3>
        <el-input placeholder="Digite seu email" v-model="email"></el-input>
        <h3>Senha:</h3>
        <el-input placeholder="Digite sua senha" type="password" v-model="password"></el-input>
        <br><br><br>
        <el-button type="danger" icon="el-icon-close" @click="registerVisible = false" round> &nbsp;&nbsp;&nbsp;Sair&nbsp;&nbsp;&nbsp;</el-button>
        <el-button type="primary" icon="el-icon-arrow-right" @click="register" round>Cadastrar</el-button> 
  </el-dialog>
</template>

<script>
  export default {
      name: 'Cadastro',
    data() {
      return {
        registerVisible: false,
        name: '',
        email: '',
        password: '',
        loading: true,
      };
    },
    methods: {
      show(){
        this.registerVisible = true
      },
      register(){
        this.loading = true
        this.$auth().createUserWithEmailAndPassword(this.email, this.password).then(
          user => {
            this.$db().ref(`/users/${user.uid}`).set({
              name: this.name,
              type: 'editor',
              email: this.email
            })
            this.$notify({
              title: 'Bem-vindo!',
              message: 'Você foi registrado no sistema, obrigado por contribuir.',
              type: 'success',
              position: 'bottom-right'
            })
            this.clear()
          },
          error => {
            this.$notify.error({
              title: 'Ooops...',
              message: 'Houve um erro ao tentar te registrar, por favor verifique seus dados.',
              position: 'bottom-right'
            })
            this.loading = false
          }
        )
      },
      clear() {
        this.loading = false
        this.name = ''
        this.email = ''
        this.password = ''
      }
    }
  }
</script>

<style>
.el-dialog{
    width: 80% !important;
}
@media (min-width: 800px) 
{
  .el-dialog{
    width: 25% !important;
  }
}
</style>