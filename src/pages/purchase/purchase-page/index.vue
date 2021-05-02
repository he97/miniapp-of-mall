<template>
<!-- 整体外框架 -->
  <div>
    <!-- 写点通知栏和分割线 -->
    <div>
      <!-- 滚动条 -->
      <van-notice-bar
        left-icon="volume-o"
        text="请注意您的收货地址和商品"
      />
      <!-- 分割线 -->
      <van-divider />
    </div>
    <!-- 自己写的快递布局 -->
    <div class="address" decode="emsp">
      <!-- 左边的名字和电话和详细信息 -->
      <div class="address-left">
        <!-- 上面的名字和电话 -->
        <div class="address-left-name-phone">
          <text class="address-name"> &emsp;{{address.addressName}}</text>
          <text class="address-phone">  &emsp;{{address.addressPhone}} </text>
        </div>
        <!-- 下面的具体信息 -->
        <div class="address-left-concrete">
          <text class="address-concrete">&emsp;{{address.addressCity}}{{address.addressAccurateAddress}}</text>
        </div>
      </div>
      <!-- 右边的修改按钮 -->
      <div class="address-right">
        <div>
          <van-icon name="info" size="60px" @click="toChooseAddress"/>
        </div>
      </div>
    </div>
    <!-- 商品大模块 -->
    <div v-for="(i,value) in commodities" :key="value">
      <!-- 商品信息 -->
      <div>
        <!-- 商品块页面 -->
        <van-card
            :price="i.price"
            :num="i.count"
            :desc="i.commodityInformation"
            :title="i.commodityName"
            :thumb="i.commodityFirstPictureUrl"
            thumb-mode="fill"
          >
          </van-card>
          <!-- 一些field -->
        <van-cell-group>
          <van-field
            label="您的余额"
            placeholder="¥99999"
            border="flase"
            bind:change="onChange"
            readonly
          />
          <van-field
            label="备注"
            placeholder="请输入备注"
            border="flase"
            bind:change="onChange"
          />
        </van-cell-group>
      </div>
    </div>
<!-- 最底部的支付订单按钮 -->
    <div>
      <van-submit-bar
        :price="sumPrice*100"
        button-text="支付订单"
        @submit="handleOrder"
      />
    </div>
    <!-- 两个弹窗 -->
    <van-dialog
        title="交易成功"
        :show="addSuccess"
        :message="addSuccessMessage"
        show-cancel-button
        @cancel="successCancel"
        @confirm="successConfirm"
     />
     <van-dialog
        title="交易失败"
        :show="addFail"
        :message="addFailMessage"
        show-cancel-button
        @cancel="failCancel"
        @confirm="faileConfirm"
     />
  </div>
</template>

<script>
import card from '@/components/card'
import {request} from '@/utils/request'
import {GET_SELECTED_URL, HANDLE_ORDER_URL, GET_TRANSACTION_ADDRESS} from '@/utils/api'
export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      idList: '',
      address: [],
      commodities: null,
      addSuccess: false,
      addFail: false,
      addSuccessMessage: '',
      addFailMessage: '',
      sumPrice: 0,
      addressId: ''
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
    onClose () {
      this.setData({ show: false })
    },
    successCancel () {
      this.addSuccess = false
    },
    failCancel () {
      this.addFail = false
    },
    successConfirm () {
      this.addSuccess = false
      wx.switchTab({
        url: '/pages/shopping/shopping_cart/main'
      })
    },
    failConfirm () {
      this.addFail = false
      wx.switchTab({
        url: '/pages/shopping/shopping_cart/main'
      })
    },
    async submitCommodity () {
      console.info('in submit')
      let post = await request(
        GET_SELECTED_URL,
        'POST',
        {
          'isOriginal': 'yes',
          'title': 'this.title',
          'author': 'this.author',
          'price': 'this.priec',
          'summary': 'this.summary',
          'downloadUrl': 'this.downloadUrl'
        }
      )
      let thus = this
      wx.showModal({
        title: '提示',
        content: '投稿成功，将在最快是速度审核资源！',
        cancelText: '继续投稿',
        confirmText: '前往预览',
        success (res) {
          thus.isOriginal = 'false'
          thus.title = ''
          thus.author = ''
          thus.price = ''
          thus.summary = ''
          thus.downloadUrl = ''
          if (res.confirm) {
            let id = post.id
            wx.navigateTo({
              url: `/pages/share/preview/main?id=${id}`
            })
          }
        }
      })
    },
    // 获取前页的商品
    async getSelectedCommodities (idList, token) {
      const result = await request(
        GET_SELECTED_URL,
        'PUT',
        {
          list: idList,
          token: token.token
        }
      )
      console.info('result:', result)
      this.idList = idList
      var i = 0
      wx.cloud.init({
        env: 'mall-2gphxafjf4f465c4',
        traceUser: true
      })
      this.sumPrice = 0
      for (; i < result.length; i = i + 1) {
        if (result[i].cloud) {
          wx.cloud.downloadFile({
            fileID: result[i].commodityFirstPictureUrl,
            success: res => {
              // get temp file path
              result[i].commodityFirstPictureUrl = res.tempFilePath
              console.log(res.tempFilePath)
            }
          })
        }
        this.sumPrice += result[i].price * result[i].count
      }
      this.commodities = result
      console.info('this.cartCommodity', this.commodities)
    },
    async getDefaultAddress (addressId) {
      const result = await request(
        GET_TRANSACTION_ADDRESS,
        'POST',
        {
          addressId: addressId
        }
      )
      console.info('result', result)
      this.address = result
    },
    // 更待地址
    toChooseAddress () {
      var idList = this.idList
      wx.navigateTo({
        url: '/pages/user/choose-address/main',
        success: function (res) {
          res.eventChannel.emit('alterAddress', { 'idList': idList })
        }
      })
    },
    async handleOrder (env) {
      console.info('idlist:', this.commodities)
      const result = await request(
        HANDLE_ORDER_URL,
        'PUT',
        {
          commodities: this.commodities,
          status: 'NOT_HANDLE',
          price: this.sumPrice,
          info: '这是staticinfo',
          phone: this.address.addressPhone,
          address: this.address.addressCity + this.address.addressAccurateAddress,
          name: this.address.addressName
        }
      )
      console.info('handle result:', result)
      if (result.status === '200') {
        // 交易成功
        this.addSuccess = true
        this.addSuccessMessage = result.message
      }
      if (result.status === '500') {
        this.addFail = true
        this.addFailMessage = result.message
      }
    }
  },
  onShow () {
  },
  onHide () {
    this.sumPrice = 0
  },
  onLoad (env) {
    this.idList = env.idList
    let token = wx.getStorageSync('token')
    // console.info('env.idList', env.idList)
    let channel = this.$mp.page.getOpenerEventChannel()
    console.info('this:', channel)
    channel.on('transactionAddress', (data) => {
      console.info('data:', data)
      this.idList = data.idList
      this.addressId = data.addressId
    })
    this.getSelectedCommodities(this.idList, token)
    this.getDefaultAddress(this.addressId)
    console.info('load 结束')
  },
  created () {
    // let app = getApp()
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
.address{
  height: 60px;
  width: 100%;
  position: relative;
}
.address-left{
  height: auto;
}
.address-right{
  height: auto;
  position: absolute;
  left: 300px;
}
.address-left-name-phone{
  position: absolute;
  height: auto;
}
.address-left-concrete{
  position: absolute;
  top: 30px;
}
.address-name{
  font-size: large;
}
.address-phone{
  font-size: small;
  font-weight: 300;
}
.address-concrete{
  font-weight: bold;
  word-break: unset;
}
</style>
