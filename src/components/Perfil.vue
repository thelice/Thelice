<template>
    <el-dialog title="Meu Perfil" :visible.sync="profileVisible" width="35%">
      <h3>Nome:</h3>
      <el-input placeholder="Digite seu nome" v-model="name"></el-input>
      <h3>Email:</h3>
      <el-input placeholder="Digite seu email" v-model="email" :disabled="true"></el-input>
      <h3>Senha:</h3>
      <el-input placeholder="Digite sua senha" type="password" v-model="password"></el-input>
      <br><br><br>
      <el-button type="danger" icon="el-icon-close" @click="profileVisible = false" round> &nbsp;&nbsp;&nbsp;Sair&nbsp;&nbsp;&nbsp;</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="refresh" round>Atualizar</el-button> 
    </el-dialog>
</template>

<script>
  export default {
      name: 'Perfil',
    data() {
      return {
        profileVisible: false,
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      show(){
        this.profileVisible = true
      },
      refresh(){
        
      }
    }
  }
</script>

<style>
.el-dialog{
    width: 90% !important;
}
@media (min-width: 800px) 
{
  .el-dialog{
    width: 35% !important;
  }
}
</style>