<template>
  <section>

    <el-form :inline="true">
      <el-form-item label="Nova categoria">
        <el-input
          placeholder="Digite o nome da nova categoria..."
          v-model="write.name"
          size="mini"
        />
      </el-form-item>

      <el-form-item label="Dica?">
        <el-switch v-model="write.tip">
        </el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-check" size="mini" @click="create">
          Criar
        </el-button>
      </el-form-item>
      
    </el-form>

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Dica?</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categorys" :key="index">
          <td>{{ category.name }}</td>
          <td>
            <el-tag size="mini">{{category.tip}}</el-tag>
          </td>
          <td>
            <el-button type="danger" size="mini" @click="del(index)">
              Apagar
            </el-button>

            <el-button size="mini" >
              Postagens
            </el-button>
          </td>
        </tr>
      </tbody>
    </table>
    </section>
</template>

<script>
export default {
  data: () => ({
    categorys: {},
    write: {
      name: '',
      tip: false,
      posts: []
    }
  }),
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$db().ref('/categorys').on('value',result =>{
        this.categorys = result.val()
      })
    },
    del(index) {
      this.$db().ref(`/categorys/${index}`).remove()
    },
    create() {
      if(this.write.name != '') {
        this.$db().ref('/categorys').push(this.write);
        this.$notify({
          title: 'Categoria criada!',
          message: '',
          type: 'success'
        })
        this.write = {
          name: '',
          tip: false,
          posts: []
        }
      }
      else {
        this.$notify.error({
          title: 'Ooops...',
          message: 'Por favor, informe um nome para a categoria'
        })
      }
    }
  }
}
</script>
