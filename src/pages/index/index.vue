<script setup lang="ts">
import { ref, reactive } from 'vue'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { encryptData } from '@/http/encrypt'

usePullDownRefresh(() => {
  setTimeout(() => {
    Taro.stopPullDownRefresh()
  }, 1000)
})
function onRoute () {
  Taro.navigateTo({
    url: '/subpackages/pageA/index'
  })
}
const url = {
  detail: '/collecting/repertoryRecordInfo',
  submit: '/collecting/repertoryApply',
  upload: '/api/tools/file/upload'
}
const uploadUrl = process.env.TARO_APP_PROXY + url.upload
interface Image {
  name: string
  url: string
}
interface FormType {
  images: Image[]
  [key: string]: any
}
const formData = reactive<FormType>({
  images: []
})
const uploadFileList = ref<any[]>([])
  function uploadFile (src, taroUploadFile, options) {
  const fs = Taro.getFileSystemManager()
  fs.getFileInfo({
    filePath: src,
    success: (res) => {
      console.log('getFileInfo res', res)
    }
  })
  fs.readFile({
    filePath: src, // 文件的临时路径
    encoding: 'base64',
    success: (res) => {
      const data = {
        decodeFile: res.data,
        fileFormat: options.taroFilePath.slice(options.taroFilePath.lastIndexOf('.') + 1)
      }
      const uploadData = encryptData(data, 'post')
      // console.log('readFile', res.data)
      const uploadTask = taroUploadFile({
        url: options.url,
        filePath: src,
        name: options.name,
        fileType: options.fileType,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        formData: uploadData,
        success: (response: { errMsg; statusCode; data }) => {
          if (options.xhrState == response.statusCode) {
            options.onSuccess?.(response, options)
          } else {
            options.onFailure?.(response, options)
          }
        },
        fail: (e) => {
          options.onFailure?.(e, options)
        }
      })
      options.onStart?.(options)
      uploadTask.progress((res) => {
        options.onProgress?.(res, options)
        // console.log('上传进度', res.progress);
        // console.log('已经上传的数据长度', res.totalBytesSent);
        // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
      })
    },
    fail: (err) => {
      console.error(err)
    }
  })
}
function beforeXhrUpload (taroUploadFile, options) {
  console.log('before taroUploadFile', taroUploadFile)
  console.log('before options', options)
  Taro.compressImage({
    src: options.taroFilePath,
    quality: 80,
    compressedWidth: 300,
    success: (res: any) => {
      console.log('compress', res)
      uploadFile(res.tempFilePath, taroUploadFile, options)
    },
    fail: (err: any) => {
      console.log('compress err', err)
      abortUpload(taroUploadFile, options)
    }
  })
}
function abortUpload (taroUploadFile, options) {
  const uploadTask = taroUploadFile(options)
  uploadTask.abort()
}
function onStart (options) {
  console.log('start options', options)
}
function onDelete ({index}) {
  console.log('delete', index)
  formData.img.splice(index, 1)
  console.log('img', formData.img)
  console.log('uploadFileList', uploadFileList.value)
}
function onOversize (files) {
  console.log('oversize files', files)
}
function onSuccess ({data}) {
  console.log('success', data)
  const res = JSON.parse(data.data)
  console.log('res', res)
  if (res.message.code === 0) {
    formData.img.push({
      name: res.data.fileUrl.split('/').pop(),
      url: res.data.fileUrl
    })
    console.log('img', formData.img)
  } else {
    Taro.showToast({
      title: res.message.message,
      icon: 'none',
      mask: true,
      duration: 2000
    })
  }
  console.log('uploadFileList', uploadFileList.value)
}
function onFailure ({data}) {
  console.log('failure', data)
  if (data !== undefined) {
    Taro.showToast({
      title: '上传失败',
      icon: 'none',
      mask: true,
      duration: 2000
    })
    uploadFileList.value.pop()
    console.log('uploadFileList', uploadFileList.value)
  }
}
</script>
<template>
  <view>
    <text>首页</text>
    <button @tap="onRoute">访问页面A</button>
    <view class="m-image-wrap">
      <view class="u-head">
        上传照片<text class="u-tip">（最多支持3张）</text>
      </view>
      <view class="m-upload-wrap">
        <nut-uploader
          v-model:file-list="uploadFileList"
          :url="uploadUrl"
          multiple
          :maximize="10 * 1024 * 1024"
          :maximum="3"
          :media-type="['image']"
          :size-type="['compressed']"
          :before-xhr-upload="beforeXhrUpload"
          @start="onStart"
          @delete="onDelete"
          @oversize="onOversize"
          @success="onSuccess"
          @failure="onFailure" />
      </view>
    </view>
  </view>
</template>
<style lang="less">
.m-image-wrap {
  margin-top: 20px;
  padding: 24px 28px 40px;
  width: 690px;
  height: 349px;
  background: #FFFFFF;
  border-radius: 12px;
  .m-upload-wrap {
    margin-top: 40px;
    .nut-uploader__preview {
      margin-bottom: 0;
      margin-right: 0;
      &:not(:last-child) {
        margin-right: 17px;
      }
    }
  }
}
</style>
