<template>
  <div>
      <el-dialog title="Entre em contato conosco!" :visible.sync="dialogVisible" width="60%">
            <h3>Projeto de pesquisa do Intituto federal do triângulo Mineiro (IFTM) campus Pontal</h3>
            <hr>
            <h4>Alunos graduandos envolvidos:</h4>
            <span>Guilherme Mamedio <b>(mamedioguilherme@gmail.com)</b></span>
            <br>
            <span>Júnior Martins <b>(juniorm2488@gmail.com)</b></span>
            <br>
            <span>Leonardo Vilarinho <b>(leonardo-i@outlook.com)</b></span>
            <br>
            <h4>Coordenadora:</h4>
            <span>Reane Franco <b>(reane@iftm.edu.br)</b></span>
            <br>
      </el-dialog>  
  </div>
</template>

<script>
  export default {
    name: 'Contato',
    data() {
      return {
        dialogVisible: false,
      };
    },
    methods: {
      show(){
        this.dialogVisible = true
      },
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
    width: 50% !important;
  }
}
</style>