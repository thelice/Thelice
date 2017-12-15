<template>
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <el-button v-if="user.type == 'editor'" type="success" icon="el-icon-check" size="mini" @click="toggle(index, user, 'admin')">
            Tornar admin
          </el-button>
          <el-button v-else type="danger" icon="el-icon-error" size="mini" @click="toggle(index, user, 'editor')">
            Remover admin
          </el-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data: () => ({
    users: {}
  }),
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$db().ref('/users').on('value',result =>{
        this.users = result.val()
      })
    },
    toggle(index, user, type) {
      user.type = type
      this.$db().ref(`/users/${index}`).set(user)
    }
  }
}
</script>
