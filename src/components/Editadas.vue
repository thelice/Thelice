<template>
  <section>
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="index">
          <td>{{ post.title }}</td>
          <td>
            <el-button type="success" size="mini" @click="accept(post.cat, post.uido, post)">
              Aceitar
            </el-button>

            <el-button type="danger" size="mini" @click="del(post.cat, post.uido)">
              Apagar
            </el-button>

            <el-button size="mini" @click="read(post.cat, post.uido)" >
              Ler
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
    posts: [],
  }),
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.$db().ref('/categorys').on('value', result =>{
        const categorys = result.val()
        this.posts = []
        for(let c in categorys) {
          const pts = categorys[c].edits
          for(let i in pts) {
            let po = pts[i]
            po.uido = i
            po.cat = c
            this.posts.push(po)
          }
        }

      })
    },
    del(c, p) {
      this.$db().ref(`/categorys/${c}/edits/${p}`).remove()
    },
    accept(c, p, o) {
      let obj = {
        title: o.title,
        content: o.content,
        visible: true
      }
      this.$db().ref(`/categorys/${c}/posts/${o.uid}`).set(obj)
      this.$db().ref(`/categorys/${c}/edits/${p}`).remove()
    },
    read(c, p) {
      this.$router.push({path: `/preview/${c}/${p}`, params: {cat: c, uid: p}})
    }
  }
}
</script>
