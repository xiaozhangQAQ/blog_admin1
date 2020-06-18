<template>
  <div id="md-preview">
    <link href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css" rel="stylesheet">
    <section id="markdown-preview-body" v-highlight class="preview markdown-body" v-html="contents" />
  </div>
</template>

<script>
import { markdown } from '@/utils/markdowm.js'
export default {
  name: 'Mdpreview',
  components: {
  },
  props: ['contents'],
  data() {
    return {
      imgList: []
    }
  },
  watch: {
    contents(content) {
      setTimeout(this.init, 1000)
    }
  },
  created() {
  },
  mounted() {
    setTimeout(this.init, 1000)
  },
  beforeDestroy() {
  },
  methods: {
    init() {
      document.body.scrollTop = document.documentElement.scrollTop = 0
      this.getImg()
    },
    getImg() {
      const imgDomList = document.getElementById('markdown-preview-body').getElementsByTagName('img')
      this.imgList = []
      Array.prototype.slice.call(imgDomList).forEach((img, index) => {
        img.indexTag = index
        img.onclick = this.showBigImg
        this.imgList.push({
          src: img.src,
          w: img.width,
          h: img.height,
          target: img
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown-body{
  color: #555555 !important;
  @media (max-width: 768px){
    font-size: 12px !important;
  }
  img{
    max-width: calc(100% - 10px) !important;
    padding: 4px;
    border: 1px solid #eeeeee !important;
    cursor: zoom-in;
  }
  li{
    list-style: disc;
    li{
      list-style: circle;
    }
  }
#md-preview{
  position: relative;
  width: 100%;
  margin-top: 10px;
}
}
</style>
