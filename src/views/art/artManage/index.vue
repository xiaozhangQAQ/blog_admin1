<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input v-model="listQuery.stitle" placeholder="请输入名称检索" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>

    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.article._id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="日期">
        <template slot-scope="scope">
          <span>{{ scope.row.article.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="120px" align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column width="100px" label="评分">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column> -->

      <el-table-column min-width="140px" label="标题">
        <template slot-scope="{row}">
          <span>{{ row.article.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" label="分类">
        <template slot-scope="{row}">
          <el-tag>
            {{ row.category.name }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="标签" width="110">
        <template slot-scope="{row}">
          <el-tag v-for="(tagsitem,tagsindex) in row.tags" :key="tagsindex" type="info" style="margin-bottom:10px;margin-right:5px;">
            {{ tagsitem.name }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态">
        <template slot-scope="{row}">
          <el-tag :type="row.article.status | statusFilter">
            {{ row.article.status | statusName }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态变化" width="110">
        <template slot-scope="{row}">
          <el-switch
            :value="row.article.status == '0'?true:false"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus(row.article._id,row.article.status)"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="240">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-view" class="act_form" @click="readArticle(scope.row.article._id)">
            预览
          </el-button>
          <router-link :to="'/art/write?_id='+scope.row.article._id">
            <el-button type="primary" size="mini" class="act_form" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
          <el-button size="mini" type="danger" icon="el-icon-delete" class="act_form" @click="deleteArticle(scope.row.article._id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog
      title="文章预览"
      :visible.sync="dialogVisible"
      width="80%"
      top="5vh"
    >
      <div style="height:65vh;overflow-y: auto;">
        <articleDetail />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="deleteDialog"
      width="30%"
    >
      <span>您确定要删除吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { articles, deleteArticle, changeStatus } from '@/api/article'
// import json from './list.js'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import articleDetail from './articleDetail'

export default {
  name: 'ArticleList',
  components: { Pagination, articleDetail },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'info'
      }
      return statusMap[status]
    },
    statusName(status) {
      const statusMap = {
        0: '上架',
        1: '下架'
      }
      return statusMap[status]
    },
    statusC(status) {
      const statusMap = {
        0: true,
        1: false
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20,
        limit: 10,
        stitle: ''
      },
      dialogVisible: false,
      deleteDialog: false,
      deleteId: '',
      statusType: false
    }
  },
  created() {
    this.getList()
  },
  inject: ['reload'],
  methods: {
    handleFilter() {
      this.getList()
    },
    deleteArticle(id) {
      this.deleteDialog = true
      this.deleteId = id
    },
    confirmDelete() {
      deleteArticle({ _id: this.deleteId }).then(res => {
        this.$message({
          message: '删除成功!',
          type: 'success'
        })
        this.getList()
        this.deleteDialog = false
      })
    },
    getList(objs) {
      this.listLoading = true
      if (objs) {
        this.listQuery.page = objs.page
        this.listQuery.limit = objs.limit
      }
      articles({ uid: '5ebca743ba6c2d2f2cb5e627', page: this.listQuery.page, limit: this.listQuery.limit, stitle: this.listQuery.stitle }).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.listLoading = false
      })
    },
    readArticle(id) {
      this.dialogVisible = true
    },
    changeStatus(id, status) {
      if (status == '0') status = '1'
      else status = '0'
      console.log(status)
      changeStatus({ _id: id, status }).then(res => {
        this.getList()
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.act_form{
  margin-bottom: 5px;
}
</style>
