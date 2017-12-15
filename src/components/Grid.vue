<template>
  <div v-loading="loading">
    <h2>{{title}}</h2>
    <br>
    <el-row>
      <el-col :span="6" v-for="(c, index) in items" :key="index" :offset="index > 0 ? 3 : 0">
        <el-badge :value="quanti(c)" style="width: 100%">
          <el-card :body-style="{ padding: '1%' }">
            <h1><font>{{ c.name.substring(0, 1) }}</font></h1>
            <div style="padding: 2%;">
              <span>{{ c.name }}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="toPosts(index)">
                  Acessar
                </el-button>
              </div>
            </div>
          </el-card>
        </el-badge>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
        tips: {
            type: Boolean,
            default: false
        },
        title: {
            type:String
        }
    },
    data: () => ({
      items: [],
      loading: false
    }),
    computed: {
      ...mapGetters(['getUser']),
      logged() {
        return this.getUser != null
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      quanti(c) {
        if(c.posts == undefined)
          return 0
        else
          return Object.keys(c.posts).length
      },
      loadData() {
        this.loading = true
        this.$db().ref('/categorys').orderByChild('tip').equalTo(this.tips).on('value', result => {
          this.items = result.val()
          this.loading = false
        })
      },
      toPosts(index) {
        console.log('indo para ', index)
        this.$router.push({ path: `/posts/${index}`, params: { cat: index }})

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
