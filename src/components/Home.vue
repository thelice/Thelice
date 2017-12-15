<template>
  <div>
    <div id="descTitle">
      <h5>Esse web site foi feito especialmente para você que deseja ser um bom especialista em TI e obter as melhores certificações para sua carreira profissional!</h5>
    </div>

    <main>
      <el-carousel indicator-position="outside">
        <el-carousel-item name="Bosta">
          <img src="../img/home/1.jpg" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../img/home/2.jpg" />
        </el-carousel-item>
        <el-carousel-item> 
          <img src="../img/home/3.jpg" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../img/home/4.jpg" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../img/home/5.jpg" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="../img/home/6.jpg" />
        </el-carousel-item>
      </el-carousel>
    </main>

    <footer>
      <h3>Veja mais categorias de certificações</h3>
     <el-button type="primary" icon="el-icon-menu" @click="irCertf" round>Ver lista completa</el-button>
    </footer>
  </div>
</template>


<script>
  export default {
    data() {
      return {

      };
    },
    methods: {
      irCertf(){
        this.$router.push('/certification')
      }
    }
  }
</script>