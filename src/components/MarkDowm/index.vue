
<template>
  <div id="editor">
    <mavon-editor
      ref="md"
      v-model="content"
      style="height: 100%"
      :box-shadow="false"
      default-open="edit"
      :toolbars="{
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        navigation: false, // 导航目录
        alignleft: false, // 左对齐
        aligncenter: false, // 居中
        alignright: false, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }"
      @imgAdd="$imgAdd"
      @change="change"
    />
  </div>
</template>
<script>
// Local Registration
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { qntoken, uploadToQiniu } from '@/api/qnToken.js'

export default {
  name: 'Editor',
  components: {
    mavonEditor
    // or 'mavon-editor': mavonEditor
  },
  data() {
    return {
      content: '',
      html: ''
    }
  },
  methods: {
    getInitData(datas) {
      this.content = datas
    },
    change(value, render) {
      this.html = render
    },
    $imgAdd(pos, $file) {
      qntoken()
        .then((data) => {
          const formParams = new FormData()
          formParams.append('token', data.data.token)
          formParams.append('file', $file)
          this.startUploadImg(formParams, pos)
        })
        .catch((err) => {
          // this.$toast(err.msg, 'error')
          this.$message.error(err.msg)
        })
    },
    startUploadImg(formParams, pos) {
      uploadToQiniu(formParams)
        .then((qiniuData) => {
          this.$refs.md.$img2Url(pos, qiniuData.imgUrl)
        })
      // .catch((err) => {
      //    this.$message.error('上传失败');
      // })
    }
  }
}
</script>
<style lang='scss' scoped>

#editor {
    margin: auto;
}
</style>
