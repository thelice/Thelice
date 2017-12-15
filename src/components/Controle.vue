<template>
 <div id="controle" v-if="isAdmin"> 
	<h3>Controle de ações do sistema</h3>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="Usuários" name="usuarios">
			<usuarios></usuarios>
		</el-tab-pane>

		<el-tab-pane label="Categorias" name="categorias">
			<categorias></categorias>
		</el-tab-pane>

		<el-tab-pane label="Postagens novas" name="postagens">
			<postagens></postagens>
		</el-tab-pane>

		<el-tab-pane label="Postagens editadas" name="editadas">
			<editadas></editadas>
		</el-tab-pane>
		
	</el-tabs>

 </div>
 <div v-else>
	 <h1>Você não é um administrador para acessar aqui.</h1>
 </div>
</template>

<script>
	import Usuarios from './Usuarios.vue'
	import Categorias from './Categorias.vue'
	import Postagens from './Postagens.vue'
	import Editadas from './Editadas.vue'
	import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        activeName: 'usuarios'
      };
		},
		computed: {
      ...mapGetters(['getUser']),
      logged() {
        return this.getUser.type != null
      },
      isAdmin() {
        return this.getUser.type == 'admin'
      }
    },
		components: {Usuarios, Categorias, Postagens, Editadas},
    methods: {
      handleClick(tab, event) {
        // console.log(tab)
      }
    }
  }
</script>

<style>

#controle {
	margin-left: 3%;
	margin-right: 3%;
}

#botaoAcao {
	width: 95%;
	size: 2;
}

table {
	width: 100%;
	text-align: left;
	margin: 1%;
}

h3 {
	text-align: center;
	padding-top: 1%;
}

</style>
