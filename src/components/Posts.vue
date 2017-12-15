<template>
  <div>
    <el-button v-if="logged" type="text" @click="$refs.new.show()">Nova</el-button>
    <h2>Postagens de {{category.name}}</h2>
    <br>
    <el-row>
      <div v-for="(c, index) in category.posts" :key="index">
        <el-col v-if="c.visible" :span="6"  :offset="index > 0 ? 3 : 0">
          <el-card :body-style="{ padding: '1%' }">
            <h1><font>{{ c.title.substring(0, 1) }}</font></h1>
            <div style="padding: 2%;">
              <span>{{ c.title }}</span>
              <div class="bottom clearfix">
                <el-button type="text" @click="read(index)" class="button">Acessar</el-button>

                <el-button type="text" @click="edit(index)" icon="el-icon-edit" size="mini" style="float:right"></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
    <new-post :cat="cat" ref="new"></new-post>
    <edit-post :cat="cat" ref="edit"></edit-post>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import NewPost from './NewPost.vue'
  import EditPost from './EditPost.vue'

  export default {
    components: {NewPost, EditPost},
    props: {
        cat: {
            type: String,
            required: true
        }
    },
    data: () => ({
      category: {},
      loading: false
    }),
    computed: {
      ...mapGetters(['getUser']),
      logged() {
        return this.getUser.type != null
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      loadData() {
        // this.loading = true
        this.$db().ref(`/categorys/${this.cat}`).on('value', result => {
          this.category = result.val()
          // this.loading = false
        })
      },
      read(p) {
        this.$router.push({path: `/read/${this.cat}/${p}`, params: {cat: this.cat, uid: p}})
      },
      edit(p) {
        this.$refs.edit.show(p)
      }
    }
  }
</script>

<style>
  h1 {
   padding-top: 8%;
   padding-bottom: 8%;
   background-color: #0B173B;
   color: #FFFFFF;
  }
  font {
    font-size: 60px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: center;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .el-row {
    padding-right: 5%;
    padding-left: 5%;
  }
</style>
