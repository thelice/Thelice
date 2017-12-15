<template>
  <div id="app">
  	<header>
	    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
	      background-color="#545c64"
	      text-color="#fff"
	      active-text-color="#8595f5">
	      <el-menu-item index="home">Thelice</el-menu-item>
	      <el-submenu index="categorias">
	        <template slot="title">Categorias</template>
	        <el-menu-item  index="certification" >Certificações</el-menu-item>
	        <el-menu-item index="tips" >Dicas</el-menu-item>
	        <!-- <el-menu-item index="videolessons">Vídeo Aulas</el-menu-item> -->
	        <el-menu-item index="prepare">Como se preparar</el-menu-item>
	      </el-submenu>
	      <el-menu-item @click="irContato">Contato</el-menu-item>
        <div id="login"> 
          <el-button v-if="isAdmin" type="primary" icon="el-icon-news" @click="irControle" round>Controle</el-button> 
          <el-button v-if="!logged" type="primary" icon="el-icon-news" @click="irLogin" round>Login</el-button> 
          <el-button v-else type="primary" icon="el-icon-news" @click="logout" round>Sair</el-button>
          <!-- <el-button type="primary" icon="el-icon-news" @click="irPerfil" round>Perfil</el-button>  -->
        </div>
	    </el-menu>
  	</header>

    <login ref='login'/>

    <perfil ref='perfil'/>

    <contato ref='contato' />

    <router-view></router-view>
  </div>
</template>

<script>
  import Perfil from './components/Perfil.vue'
  import Login from './components/Login.vue'
  import Contato from './components/Contato.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      Perfil,
      Login,
      Contato
    },
    data() {
      return {
        activeIndex: '1',
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
    methods: {
      ...mapActions(['setUser']),
      handleSelect(route, keyPath) {
        if(route != '')
          this.$router.push(`/${route}`)
      },
      irLogin(){
        this.$refs.login.show()
      },
      irPerfil(){
        this.$refs.perfil.show()
      },
      irContato(){
        this.$refs.contato.show()
      },
      irControle(){
        this.$router.push('/control')
      },
      logout() {
        this.$auth().signOut().then(() => {
          this.setUser({
            name: '',
            email: null,
            type: null
          })
          this.$notify({
            title: 'Até logo!',
            message: 'Obrigado pela visita, volte logo.',
            type: 'success',
            position: 'bottom-right'
          })
        }, error => {
          this.$notify.error({
            title: 'Ooops...',
            message: 'Houve um erro ao tentar sair do sistema, tente novamente.',
            position: 'bottom-right'
          })
        })
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

#login {
  text-align: right;
  padding-right: 2%;
  padding-top: 10px ;
}

#descTitle {
  margin-top: 3%;
  margin-bottom: 4%;
}

.el-carousel__item h3 {
  color: #8595f5;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #ffffff;
}

img {
  height: 100%;
}

footer {
  padding-bottom: 2%;
}

h1, h2 {
  font-weight: normal;
}

main {
  margin: 3%;
  margin-right: 10%;
  margin-left:  10%;
}

body, html {
  margin: 0;
  Padding:0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
  cursor: pointer;
}

@media (max-width: 800px) {
  #login {
    text-align: center;
    padding-top: 20% ;
    padding-bottom: 2%;
  }
  .el-button{
    width: 35%;
  }
}
</style>