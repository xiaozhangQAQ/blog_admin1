<template>
  <div class="rightUp">
    <div class="img-upload">
      <el-upload
        ref="upload"
        class="upload-demo"
        drag
        action="https://upload-z2.qiniup.com"
        :data="token"
        :show-file-list="false"
        :auto-upload="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-change="onFileChange"
        :on-progress="onUploadProgress"
      >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:100%;height:100%;"> -->
        <el-image v-if="imageUrl" style="width: auto; height: 100%" :src="imageUrl" fit="content" />
        <div v-else class="uploadbox">
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </div>
        <!-- <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
      </el-upload>
    </div>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.region" placeholder="请选择分类">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item> -->
      <el-form-item label="标签">
        <el-select
          v-model="form.label"
          multiple
          placeholder="请选择文章标签"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <img-cropper
      ref="cropperBox"
      :options="options"
      :upload-progress="uploadProgress"
      @finishCropImage="finishCropImage"
    />

  </div>
</template>

<script>

import imgCropper from '@/components/ImageCropper/index1.vue'
import { qntoken } from '@/api/qnToken.js'
import { articleCate, articleLabel } from '@/api/article'

export default {
  name: 'RightUp',
  components: {
    imgCropper
  },
  data() {
    return {
      cropper: null,
      newFile: null,
      options: {
        aspectRatio: 1,
        preview: '#cropperRes',
        zoomOnWheel: false,
        minCropBoxWidth: 50
      },
      token: {},
      uploadProgress: 0,
      calcHeight: 0,
      defaultImg: '', // https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191
      form: {
        name: '',
        region: '',
        delivery: false,
        label: [],
        resource: '',
        desc: ''
      },
      options: [],
      options1: []
    }
  },
  computed: {
    imageUrl() {
      return this.defaultImg
    }
  },
  // created(){
  //   console.log(this.datas)
  // },
  mounted() {
    articleCate().then(res => {
      this.options1 = res.data.map((i, e) => {
        const objs = {}
        objs.value = i._id
        objs.label = i.name
        return objs
      })
    })
    articleLabel().then(res => {
      this.options = res.data.map((i, e) => {
        const objs = {}
        objs.value = i._id
        objs.label = i.name
        return objs
      })
    })
  },
  methods: {
    // typeChange(e){
    //   console.log(e)
    // },
    getInitData(datas) {
      // this.initData = datas;
      // console.log(datas)
      this.form.name = datas.article.title
      this.form.region = datas.category._id
      this.form.desc = datas.article.detail
      this.form.label = datas.tags.map((item, index) => {
        return item._id
      })
    },
    // labelChange(e){
    //    console.log(e)
    // },

    onFileChange(file, fileList) {
      if (file.status === 'ready') {
        const fileType = [
          'image/jpeg',
          'image/png',
          'image/webp'
        ]
        console.log(fileList)
        const type = fileType.indexOf(file.raw.type)
        const size = file.raw.size / 1024 / 1024 <= this.maxSize
        if (type === -1) {
          this.$message('只限jpg、png、webp格式', 'error')
          return false
        }
        // if (!size) {
        //   this.$message(`图片太大了~最多支持${this.maxSize}MB`, 'error')
        //   return false
        // }
        this.$refs.cropperBox.show()
        this.$refs.cropperBox.loadCropper(file.raw)
      }
    },
    finishCropImage(newFile) {
      this.newFile = newFile
      // this.$refs.upload.submit();
      qntoken().then(data => {
        this.token = data.data
        this.$refs.upload.submit()
      })
    },
    handleAvatarSuccess(response, file) {
      // this.$emit('uploadSuccess', response.imgUrl
      console.log(this.newFile)
      this.defaultImg = URL.createObjectURL(this.newFile)
      this.$refs.cropperBox.close()
    },
    beforeAvatarUpload(file) {
      const uploadFile = new window.File([this.newFile], file.name, { type: this.newFile.type })
      uploadFile.uid = this.newFile.uid
      return Promise.resolve(uploadFile)
    },
    onUploadProgress(event, file, fileList) {
      this.uploadProgress = parseInt(event.percent) - 1
    }
  }
}
</script>

<style lang="scss">
.rightUp{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  .img-upload{
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
    .upload-demo{
      width: 100%;
      max-width: 330px;
      .el-upload{
        width: 100%;
        .el-upload-dragger{
          width: 100%;
        }
      }
    }
  }
}

</style>
