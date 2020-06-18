
<template>
  <div class="cropper-wrap">
    <!-- <div class="cropper-alert-mask" :class="{ show: imgHasLoad }"></div>
        <div class="cropper-alert" :class="{ show: imgHasLoad }">
        <div class="cropper">
            <span class="layout-icon-wrap"><i class="el-icon-circle-close" @click="imgHasLoad=false"></i></span>
            <div class="cropper-box">
            <img ref="uploadPreview" style="width:100px;height:auto;">
            </div>
            <div class="cropper-res-wrap">
            <div class="cropper-res" id="cropperRes">
                <img style="width:100px;height:100px;">
            </div>
            </div>
        </div>
        <div class="cropper-btns-wrap">
            <el-progress
            :text-inside="true"
            :stroke-width="30"
            :percentage="uploadProgress">
            </el-progress>
            <button
            type="button"
            class="cropper-btn"
            @click="finishCropImage"
            :disabled="btnTips.disable"
            :class="{'btn-bg': uploading}">
            {{ btnTips.value }}
            </button>
        </div>
        </div> -->
    <el-dialog title="上传图片" :visible.sync="imgHasLoad">
      <el-row :gutter="20">
        <el-col :span="14">
          <div style="width:100%;height:300px">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :output-size="option.outputSize"
              :output-type="option.outputType"
              :info="option.info"
              :can-scale="option.canScale"
              :auto-crop="option.autoCrop"
              :auto-crop-width="option.autoCropWidth"
              :auto-crop-height="option.autoCropHeight"
              :fixed="option.fixed"
              :fixed-number="option.fixedNumber"
              :center-box="true"
              @real-time="realTime"
            />
          </div>
        </el-col>
        <el-col :span="10">
          <el-divider content-position="left">图片预览</el-divider>
          <div style="border: 1px solid rgba(0,0,0,.15);padding: 3px;display:inline-block;">
            <div class="el-image" style="width: 100px; height: 100px;">
              <img :src="previews.url" class="el-image__inner" :style="previews.img"><!---->
            </div>
          </div>

        </el-col>
      </el-row>

      <div class="cropper-btns-wrap">
        <el-progress
          :text-inside="true"
          :stroke-width="30"
          :percentage="uploadProgress"
        />
        <button
          type="button"
          class="cropper-btn"
          :disabled="btnTips.disable"
          :class="{'btn-bg': uploading}"
          @click="finishCropImage"
        >
          {{ btnTips.value }}
        </button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// Local Registration
// import Cropper from 'cropperjs'
import Vue from 'vue'
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

export default {
  name: 'ImageCropper1aa',
  props: {
    options: {
      default: {
        aspectRatio: 1 / 1,
        preview: '#cropperRes',
        zoomOnWheel: false,
        minCropBoxWidth: 50
      }
    },
    uploadProgress: {
      default: 0
    }
  },

  data() {
    return {
      previews: {},
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 4] // 截图框的宽高比例
      },
      //   cropper: null,
      imgHasLoad: false,
      //   cropperHasInit: false,
      uploading: false,
      rawFile: null
    }
  },
  computed: {
    btnTips() {
      if (this.uploading) {
        return {
          value: '正在上传，请稍等',
          disable: true
        }
      }
      return {
        value: '裁剪完成，立即上传',
        disable: false
      }
    }
  },
  watch: {
    imgHasLoad(val) {
      if (!val) {
        this.uploading = false
      }
    }
  },
  methods: {
    show() {
      this.imgHasLoad = true
    },
    close() {
      this.imgHasLoad = false
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data
    },
    loadCropper(rawFile) {
      this.rawFile = rawFile
      const URL = window.URL || window.webkitURL
      const blobURL = window.URL.createObjectURL(rawFile)

      //   const reader = new FileReader();
      //   const dataURL = reader.readAsDataURL(rawFile);
      //   console.log(dataURL)
      var image = this.$refs.uploadPreview
      //   if (!this.cropper) this.cropper = new Cropper(image, this.options)
      //   this.cropper.reset().replace(blobURL)
      this.option.img = blobURL
    },
    finishCropImage() { // 完成裁剪，并输出裁剪结果，然后传到七牛
      this.uploading = true
      // const croppedCanvas = this.cropper.getCroppedCanvas();

      // const croppedDataUrl = croppedCanvas.toDataURL(this.rawFile.type);
      // const blob = this.dataURLtoBlob(croppedDataUrl);
      // blob.uid = this.rawFile.uid;
      this.$refs.cropper.getCropBlob((data) => {
        // const blob = this.dataURLtoBlob(data);
        // blob.uid = this.rawFile.uid;
        this.$emit('finishCropImage', data)
      })
      // this.$emit('finishCropImage', blob);
    },
    // dataUrl 转 blob
    dataURLtoBlob(dataurl) {
      /* eslint-disable */
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
      /* eslint-enable */
    }
  }
}
</script>
<style lang='scss' scoped>

.cropper-wrap{
  .cropper-alert-mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    background-color: rgba(0,0,0,.5);
    visibility: hidden;
    height: 0;
    transition: all .3s ease;
  }
  .cropper-alert-mask.show{
    visibility: visible;
    height: 100%;
  }
  .cropper-alert{
    opacity: 0;
    transition: all .3s ease;
    visibility: hidden;
    padding: 10px;
    position: fixed;
    z-index: 2000;
    top: 50px;
    left: 50%;
    transform: translateX(-50%) scale(2);
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    max-width: 600px;
    max-height: 530px;
    &.show{
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) scale(1);
    }
    .cropper{
      position: relative;
      max-width: 600px;
      max-height: 460px;
      height: 100%;
      padding: 10px;
      padding-right: 120px;
      background-color: grey;
      .layout-icon-wrap{
        position: absolute;
        cursor: pointer;
        right: 0px;
        top: 0px;
        font-size: 20px;
      }
      .cropper-box{
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
      }
      .cropper-res-wrap{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        width: 100px;
        height: auto;
        padding: 10px;
        background-color: grey;
        box-sizing: content-box;
        .cropper-res{
          width: 100px;
          height: 100px;
          overflow: hidden;
          background-color: #fff;
        }
      }
    }
  }
  .cropper-btns-wrap{
      position: relative;
      margin-top: 20px;
      .cropper-btn{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 30px;
        line-height: 1;
        background: #fff;
        border: 1px solid grey;
        border-radius: 15px;
        color: grey;
        cursor: pointer;
      }
      .btn-bg{
        background: #FF000000;
      }
    }
}
</style>
