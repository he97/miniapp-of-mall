<template>
  <div>
    <div>
      <!-- 协格尔滚动播放通知栏 -->
      <van-notice-bar scrollable text="请保证您添加的商品符合社会主义核心价值观的要求，我们在检测合格后才会对其进上架，若是多次不符合规范，您将会受到相应的惩罚" />
    <!--下面写虚线  -->
      <van-divider dashed contentPosition="center">请添加您的商品</van-divider>
    </div>


    <div>
      <!-- 下面写设置商品名称，以及商品品牌-->
      <!-- value="" -->
      <van-cell-group>
        <!-- 商品名称 -->
        <van-field
          clearable
          :value="name"
          label="商品名称"
          placeholder="请点击输入商品名称"
          name="name"
          @blur="setName"
        />
        <!-- 商品品牌 -->
        <van-field
          :value="brand"
          clearable
          label="品牌"
          placeholder="请点击输入商品品牌"
          name="brand"
          @blur="setBrand"
        />
        <!-- 添加商品描述 -->
        <van-field
          :value="desc"
          clearable
          label="商品描述"
          placeholder="请点击输入商品描述"
          name="desc"
          @blur="setDesc"
        />
        <!-- 添加商品余额 -->
        <van-cell center title="商品余额">
          <van-stepper
            :value="commodity_balance"
            async-change
            @plus="onChange"
          />
        </van-cell>
        <!-- <demo-block title="文件预览" padding>
          <van-uploader
            name="upPhoto2"
            :file-list="fileList"
            multiple
            @after-read="afterRead"
            @delete="deletephoto"
            @click-preview="clickPreview"
          />
        </demo-block> -->

        <!-- 添加商品价格 -->
        <van-field
          :value="price"
          clearable
          label="商品价格"
          placeholder="请点击输入商品价格"
          name="price"
          :type="digit"
          @blur="setPrice"
        />
        <!-- 选择商品仓库 -->
        <van-cell title="选择商品的种类" is-link @click="showcategory" />
        <van-popup
          :show="showCategory"
          position="bottom"
          custom-style="height: 40%;"
          @close="onClose"
        >
          <div>
            <van-picker
              :columns="category"
              :show-toolbar="true"
              :default-index="3"
              @change="onChange1"
              @confirm="comfirmcategory"
              @cancel="onClose"
            />
          </div>
        </van-popup>
        <!-- 虚线，下面为上传照片 -->
        <van-divider dashed contentPosition="center">请添加一些照片</van-divider>
        <!-- 以下为照片上传 -->
        <demo-block title="文件预览" padding>
          <van-uploader
            name="upPhoto2"
            :file-list="fileList"
            accept="all"
            multiple
            @afterRead="afterRead"
            @delete="deletephoto"
            @click-preview="clickPreview"
          />
        </demo-block>
        <!-- 上传或者取消按钮 -->
        <!-- <van-row>
          <van-col span="8" offset="2">
            <van-button type="danger">取消</van-button>
          </van-col>
          <van-col span="10" offset="12">
            <van-button type="primary">提交</van-button>
          </van-col>
        </van-row> -->
        <!-- <van-image width="100" height="100" :src="tempUrl" /> -->
<van-button type="danger" block>取消</van-button>
<div v-if="!isAlter">
<van-button type="primary" block @click="submitCommodity">提交</van-button>
</div>
<div v-if="isAlter">
<van-button type="primary" block @click="submitCommodity">修改</van-button>
</div>
      </van-cell-group>

      <van-dialog
        title="添加成功"
        :show="addSuccess"
        :message="addSuccessMessage"
        show-cancel-button
        @cancel="successCancel"
        @confirm="successConfirm"
     />
     <van-dialog
        title="添加失败"
        :show="addFail"
        :message="addFailMessage"
        show-cancel-button
        @cancel="failCancel"
        @confirm="faileConfirm"
     />
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import {request} from '@/utils/request'
import {SUBMIT_COMMODITY_URL, COMMODITY_INFO} from '@/utils/api'
export default {
  data () {
    return {
      isAlter: false,
      name: '',
      brand: '',
      price: '',
      desc: '',
      link: '',
      commodity_balance: 4,
      commodity_id: '',
      fileList: [
      ],
      picPath: [
      ],
      tempUrl: '',
      showCategory: false,
      category: ['服装', '书籍', '3C用品', '文娱用品', '日用百货', '家用电器', '商品', '包包'],
      commodityCategory: '',
      addSuccess: false,
      addFail: false,
      addSuccessMessage: '',
      addFailMessage: ''
    }
  },

  components: {
    card
  },

  methods: {
    onChange (event) {
      this.commodity_balance += 1
      console.info('balance:', this.commodity_balance)
    },
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    onSelect (event) {
      console.log(event.detail)
    },
    sex_toggle () {
      this.show_sex = !this.show_sex
      console.info(this.show_sex)
    },
    birthday_toggle () {
      this.show_birthday = !this.show_birthday
      console.info(this.show_sex)
    },
    setName (event) {
      console.info('event:', event.target.value)
      this.name = event.target.value
    },
    setBrand (event) {
      console.info('event:', event.target.value)
      this.brand = event.target.value
    },
    setLink (event) {
      console.info('event:', event.target.value)
      this.link = event.target.value
    },
    setPrice (event) {
      console.info('event:', event.target.value)
      this.price = event.target.value
    },
    setDesc (event) {
      console.info('event:', event.target.value)
      this.desc = event.target.value
    },
    successCancel () {
      this.addSuccess = false
    },
    failCancel () {
      this.addFail = false
    },
    successConfirm () {
      this.addSuccess = false
    },
    failConfirm () {
      this.addFail = false
    },
    clickPreview () {},
    deletephoto (event) {
      console.info('in delete')
      console.log('event.detail:', event)
      const index = event.target.index
      console.info('index为:', index)
      const fileList = this.fileList
      console.log('index:{},fileList:{}', index, fileList)
      fileList.splice(index, 1)
      this.fileList = fileList
    },
    async afterRead (event) {
      // this.picPath = this.picPath.concat('1')
      // console.info('1picPath:', this.picPath)

      console.info('in afterRead')
      var file = event.target.file[0]
      console.log('event.target:', event.target)
      console.log('file', file)
      console.log(JSON.stringify(file, null, 2))
      console.log('url', event.target.file[0].url)
      this.tempUrl = file.url
      wx.cloud.init({
        env: 'mall-2gphxafjf4f465c4',
        traceUser: true
      })
      var testData = ''
      await wx.cloud.uploadFile({
        cloudPath: 'userCommodities/' + file.name,
        filePath: file.url,
        // url: POST_PIC_URL,
        success: res => {
          console.info('success')
          console.info('res:', res)
          var path = ''
          path = res.fileID
          this.picPath = this.picPath.concat(path)
          console.info('1picPath:', this.picPath)
        }
      })
      console.info('tetsdata:', testData)
      const fileList = this.fileList
      this.fileList = fileList.concat(file)
      console.info('fileList:', this.fileList)
      // this.setData({ [`fileList${name}`]: fileList.concat(file) })
    },
    showcategory () {
      this.showCategory = true
    },
    onClose () {
      this.showCategory = false
    },
    comfirmcategory (env) {
      console.info('catrgory index:', env)
      this.commodityCategory = env.target.index + 1
      this.showCategory = false
    },
    async submitCommodity () {
      console.info('in submit')
      console.info('name', this.name)
      console.info('brand', this.brand)
      console.info('desc', this.desc)
      console.info('price', this.price)
      console.info('balance', this.commodity_balance)
      console.info('link', this.picPath)
      console.info('category', this.commodityCategory)
      let post = await request(
        SUBMIT_COMMODITY_URL,
        'POST',
        {
          'brandName': this.brand,
          'commodityName': this.name,
          'commodityCategory': this.commodity_balance,
          'commodityInformation': this.desc,
          'commodityRemainder': this.commodity_balance,
          'commodityPictureUrl': this.picPath,
          'price': this.price
        }
      )
      this.picPath = []
      if (post.status === '200') {
        this.addSuccess = true
        this.addSuccessMessage = post.message
      }
      if (post.status === '500') {
        this.addFail = true
        this.addFailMessage = post.message
      }
      console.info('post:', post)
      // let thus = this
      // wx.showModal({
      //   title: '提示',
      //   content: '投稿成功，将在最快是速度审核资源！',
      //   cancelText: '继续投稿',
      //   confirmText: '前往预览',
      //   success (res) {
      //     thus.isOriginal = 'false'
      //     thus.title = ''
      //     thus.author = ''
      //     thus.price = ''
      //     thus.summary = ''
      //     thus.downloadUrl = ''
      //     if (res.confirm) {
      //       let id = post.id
      //       wx.navigateTo({
      //         url: `/pages/share/preview/main?id=${id}`
      //       })
      //     }
      //   }
      // })
    },
    async getCommodityInfo () {
      const id = this.commodity_id
      let result = await request(
        COMMODITY_INFO + '/' + id,
        'GET'
      )
      console.info('result of getCommodityInfo:', result)

      // 改一下地址
      var urls = result.commodityPictureUrl
      var i = 0
      var newUrls = []
      wx.cloud.init({
        env: 'mall-2gphxafjf4f465c4',
        traceUser: true
      })
      // 改一下地址
      if (result.cloud) {
        for (; i < urls.length; i = i + 1) {
          var test = {}
          test.url = urls[i]
          test.name = 'fk photo'
          test.thumb = urls[i]
          test.type = 'image'
          test.isImage = true
          test.isVideo = false
          newUrls.push(test)
          console.info('newUrl:', newUrls)
        }
      }
      console.info('1')
      this.picPath = result.commodityPictureUrl
      this.fileList = newUrls
      this.brand = result.brandName
      this.name = result.commodityName
      this.commodity_balance = result.commodityRemainder
      this.desc = result.commodityInformation
      this.price = result.price
      this.picPath = result.commodityPictureUrl
      console.info('2')
      console.info('in get commodityinfo')
      console.info('name', this.name)
      console.info('brand', this.brand)
      console.info('desc', this.desc)
      console.info('price', this.price)
      console.info('balance', this.commodity_balance)
      console.info('link', this.fileList)
      console.info('category', this.commodityCategory)
    },
    async getFileUrl (picurls) {
      var urls = picurls
      var i = 0
      try {
        await wx.cloud.init({
          env: 'mall-2gphxafjf4f465c4',
          traceUser: true
        })
        for (; i < urls.length; i = i + 1) {
          await wx.cloud.downloadFile({
            fileID: urls[i],
            success: res => {
              // get temp file path
              console.info('in change url')
              urls[i] = res.tempFilePath
              console.log(res.tempFilePath)
            }
          })
        }
      } catch (error) {
        console.info('in error')
      } finally {
        console.info('fk')
        console.info('link', this.fileList)
      }
      return urls
    }
  },

  created () {
    // let app = getApp()
  },
  onShow () {
  },

  onLoad (option) {
    console.log('option.query:', option)
    this.commodity_id = option.commodityId
    const id = this.commodity_id
    if (id !== undefined) {
      this.isAlter = true
      console.info('id:', id)
      this.getCommodityInfo()
      // this.getFileUrl(this.picPath)
    }
  }
}
</script>

<style scoped>
.back-revise-div{
  height: 20px;
}
.back-left{
  position: absolute;
  justify-content:center;
  align-items:center;
  left: 46.9px;
}
.revise-right{
  position: absolute;
  justify-content:center;
  align-items:center;
  left: 234.5px;
}
</style>
