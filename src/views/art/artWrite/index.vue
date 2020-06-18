<template>
  <div v-loading="loading" class="articlesDraft-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 16}" :lg="{span: 16}" :xl="{span: 16}" style="padding-right:8px;margin-bottom:30px;">
        <article-edit ref="editContent" style="height:75vh;" />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 8}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
        <right-up ref="rightUpData" />
      </el-col>
    </el-row>

    <div class="btn-row">
      <el-button type="primary" @click.stop="upto">提交</el-button>
    </div>

  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import articleEdit from '@/components/MarkDowm/index'
import rightUp from './components/rightUp'
import { addArticle, articles, updateArticle } from '@/api/article'
import {
  mapState
} from 'vuex'

export default {
  name: 'ArtsWrite',
  components: {
    articleEdit,
    rightUp
  },
  computed: {
    ...mapState([
      'user_id'
    ])
  },
  inject: ['reload'],
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    if (JSON.stringify(this.$route.query) !== '{}') {
      articles(this.$route.query).then(res => {
        this.$refs.rightUpData.getInitData(res.data.list[0])
        this.$refs.editContent.getInitData(res.data.list[0].article.contentCode)
      })
    }
  },
  methods: {
    upto() {
      this.loading = true
      const basedata = this.$refs.rightUpData.form
      const htmlcontent = this.$refs.editContent
      let datas = {}
      console.log(basedata)

      datas = {
        uid: '5ebca743ba6c2d2f2cb5e627',
        title: basedata.name,
        detail: basedata.desc,
        tid: basedata.region,
        lid: basedata.label,
        content: htmlcontent.html,
        contentCode: htmlcontent.content
      }

      if (JSON.stringify(this.$route.query) !== '{}') {
        datas.titleId = this.$route.query._id
        updateArticle(datas).then(res => {
          const _this = this
          setTimeout(function() {
            _this.loading = false
            _this.$router.go(-1)
          }, 1000)
        })

        return
      }

      addArticle(datas).then(res => {
        const _this = this
        setTimeout(function() {
          _this.loading = false
          _this.reload()
        }, 1000)
      }).catch(err => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.articlesDraft-container{
  margin: 30px;
}
.btn-row{
  display: flex;
  width: 100%;
  justify-content: center;
}
// .dashboard {
//   &-container {
//     margin: 30px;
//   }
//   &-text {
//     font-size: 30px;
//     line-height: 46px;
//   }
// }
</style>
