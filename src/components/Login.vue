<template>
  <form>
    <el-dialog
      v-loading="loading"
      title="Faça seu login"
      :visible.sync="loginVisible"
      width="25%"
    >
      <h3>Email:</h3>
      <el-input
        placeholder="Digite seu email"
        v-model="email"
      />
      <h3>Senha:</h3>
      <el-input
        placeholder="Digite sua senha"
        type="password"
        v-model="password"
      />
      
      <br>
      <h5>Não tem uma conta? <a @click="goToRegister">Crie uma!</a></h5>
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
        @click="login"
        round
      >
        Entrar
      </el-button> 
    </el-dialog>

    <cadastro ref='cadastro'></cadastro>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'
  import Cadastro from './Cadastro.vue'

  export default {
    name: 'Login',
    components: {
      Cadastro
    },
    data() {
      return {
        loginVisible: false,
        email: '',
        password: '',
        loading: false
      };
    },
    methods: {
      ...mapActions([ 'setUser' ]),
      show(){
        this.loginVisible = true
      },
      login(){
        this.loading = true
        this.$auth().signInWithEmailAndPassword(this.email, this.password).then(
          user => {

            this.$db().ref(`users/${user.uid}`).once('value').then( response => {
              const user_ = response.val()

              this.$notify({
                title: `Bem-vindo, ${user_.name}!`,
                message: 'Você está logado no sistema.',
                type: 'success',
                position: 'bottom-right'
              })
              this.setUser(user_)

              this.clear()
              this.loginVisible = false
            })
          },
          error => {
            this.$notify.error({
              title: 'Ooops...',
              message: 'Por favor, verifique os seus dados de entrada.',
              position: 'bottom-right'
            })
            this.clear()
          }
        )
      },
      clear() {
      this.loading = false
        this.email = ''
        this.password = ''
      },
      goToRegister(){
        this.$refs.cadastro.show()
        this.loginVisible = false
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