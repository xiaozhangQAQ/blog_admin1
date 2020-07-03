<template>
  <div class="articlesDraft-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
    <el-row :gutter="20">
      <el-col :span="8" class="box_sizing">
        <div class="grid-content bg-purple tree-check">
          <div class="tree-check_header">
            <el-input placeholder="请输入内容" v-model="filterText" class="tree-check_header_input"></el-input>
            <div class="tree-check_header_iconbox">
              <i class="el-icon-circle-plus tree-check_header_icon" @click="addRootNode"></i>
              <i class="el-icon-refresh tree-check_header_icon"></i>
            </div>       
          </div> 
          <div class="tree-check_body">
            <div class="custom-tree-container">
                <el-tree 
                :data="data" 
                :props="defaultProps" 
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                ref="tree"
                >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                      <!-- <el-button
                        type="text"
                        size="mini"
                        @click="() => append(data)">
                        Append
                      </el-button>
                      <el-button
                        type="text"
                        size="mini"
                        @click="() => remove(node, data)">
                        Delete
                      </el-button> -->
                      <i class="el-icon-edit tree-check_item_icon" @click="() => editNode(data)"></i>
                      <i class="el-icon-circle-plus tree-check_item_icon" @click="() => append(data)"></i>
                      <i class="el-icon-delete-solid tree-check_item_icon" @click="() => remove(node, data)"></i> 

                    </span>
                  </span>
                </el-tree>
            </div>
            
          </div>
          
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          b
        </div>
      </el-col>
    </el-row>


    <el-dialog :title="nodeCreateType==2?'更新菜单':'新增菜单'" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="confirm_box">
        <el-form-item label="上级菜单名称" class="confirm_item">
          <el-input v-model="form.pname" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" class="confirm_item">
          <el-input v-model="form.tname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路经名称" class="confirm_item">
          <el-input v-model="form.lname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" class="confirm_item">
          <el-input type="number" min="0" v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="菜单图标" class="confirm_item">
          
        </el-form-item> -->
      </el-form>
      <div class="confirm_checkicon">
        <h4>图标</h4>
        <el-select v-model="iconvalue" filterable placeholder="请选择">
          <el-option
            filterable
            v-for="item in iconoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
             <svg-icon :icon-class="item.label"></svg-icon>
            <span>{{ item.value }}</span>
           
          </el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-if="nodeCreateType==1" @click="addSysMenu">确 定</el-button>
        <el-button type="primary" v-else @click="editSysMenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {sysMenu,addMenu,updateMenu,remoteMenu} from '@/api/user'
import {authRoute} from '@/utils/authRoute'
import svgIcons from './svg-icons'

export default {
  name: 'Webset',
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  inject: ['reload'],
  data() {
      return {
        filterText:'',
        dialogFormVisible:false,
        data:[],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        form: { //新增表单数据
          pname: '',
          tname:'',
          lname:'',
          sort:1
        },
        actNode:{}, //点击的节点
        actType:1, //1为根目录  2为子目录菜单
        nodeCreateType:1, //1为 新建   2为更新
        iconoptions: [{
          value: 'share',
          label: 'share'
        }, {
          value: 'share',
          label: 'share'
        }, {
          value: 'share',
          label: 'share'
        }, {
          value: 'share',
          label: 'share'
        }, {
          value: 'share',
          label: 'share'
        }],
        iconvalue: 'example'//选择图标值 
      };
  },
  mounted(){
    this.iconoptions = svgIcons.map((i)=>{
       let svgobj = {
         value:i,
         label:i
       };
       return svgobj;       
    })
    // this.data = formatdata;
    sysMenu({}).then(res=>{
      this.data = authRoute(res.data);
    }) 
  },
  methods: {
    append(data) {
      // const newChild = { id: id++, title: 'testtest', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
      this.form = { //初始化
          pname: '',
          tname:'',
          lname:'',
          sort:0
      }
     
      this.form.pname = data.title;
      this.actNode = data;
      this.actType = 2;
      this.nodeCreateType = 1;
      this.sort = data.sort;
      this.dialogFormVisible = true; 
      
    },
    editNode(data){
      this.form = { //初始化
          pname: '',
          tname:'',
          lname:'',
          sort:0
      }
      if(data.parents){
        this.form.pname = data.parents.title;
        this.actType = 2;
      }else{
        this.actType = 1;
      }
      this.form.tname = data.title;
      this.form.lname = data.name;
      this.actNode = data;
      this.form.sort = data.sort;
      this.nodeCreateType = 2;
      this.dialogFormVisible = true; 
    },
    remove(node, data) {
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
      this.$confirm('确定是否删除该菜单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        remoteMenu({id:data.id}).then(res=>{
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          window.location.reload();  
        })
        
      })
      
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },

    addRootNode(){
      this.form = { //初始化
          pname: '',
          tname:'',
          lname:'',
          sort:0
      }
       this.actType = 1;
       this.dialogFormVisible = true; 
    },
    addSysMenu(){
      //  {parentId:0,name:'Art',path:'art',component:'Layout',meta: { title: '文章', icon: 'example' }}
      const _this = this;
      let nodedata={};
      if(this.actType == 1){
        nodedata = {
          parentId:0,
          name:_this.form.lname,
          path:_this.form.lname,
          component:'Layout',
          meta:{
            title:_this.form.tname,
            icon: _this.iconvalue
          },
          sort:parseInt(_this.form.sort)
        }
      }else{
        nodedata = {
          parentId:_this.actNode.id,
          name:_this.form.lname,
          path:_this.form.lname,
          component:_this.form.lname,
          meta:{
            title:_this.form.tname,
            icon: _this.iconvalue
          },
          sort:parseInt(_this.form.sort)
        }
      }

      addMenu(nodedata).then(res=>{
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.dialogFormVisible = false; 
        window.location.reload();
        // this.$confirm('添加成功，是否重新加载页面?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'success'
        // }).then(() => {
        //   window.location.reload();
        // })
      })
      .catch(err=>{
        this.$message.error('添加失败');
        this.dialogFormVisible = false; 
      })
    },
    editSysMenu(){
      const _this = this;
      let nodedata={};
      if(this.actType == 1){
        nodedata = {
          id:_this.actNode.id,
          name:_this.form.lname,
          path:_this.form.lname,
          component:'Layout',
          meta:{
            title:_this.form.tname,
            icon: _this.iconvalue
          },
          sort:parseInt(_this.form.sort)
        }
      }else{
        nodedata = {
          id:_this.actNode.id,
          name:_this.form.lname,
          path:_this.form.lname,
          component:_this.form.lname,
          meta:{
            title:_this.form.tname,
            icon: _this.iconvalue
          },
          sort:parseInt(_this.form.sort)
        }
      }
      
      updateMenu(nodedata).then(res=>{
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.dialogFormVisible = false; 
        window.location.reload();
      }) 
    }
  }
}
</script>

<style lang="scss" scoped>

.tree-check{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 10px 20px;
  .tree-check_header{
    padding: 10px 20px;
    display: flex;
    align-items: center;
    .tree-check_header_input{
      flex: 1;
    }
    .tree-check_header_iconbox{
      margin-left: 20px;
      .tree-check_header_icon{
        font-size: 18px;
        margin-right: 5px;
      }
    }
  } 
  .tree-check_body{
    padding: 10px 20px;
  }
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .tree-check_item_icon{
    margin-left: 5px;
  }
}


.confirm_box{
  display: flex;
  flex-wrap: wrap;
  .confirm_item{
    margin-bottom: 10px;
    width: 50%;
    padding: 0 10px;
  }
  .confirm_checkicon{
    margin-top: 20px;
  }
}

</style>

