<template>
  <div>
    <!-- 最上面的导航栏 -->
    <div>
      <van-nav-bar title="标题" left-text="返回" left-arrow :safe-area-inset-top="false">
        <van-icon name="plus" slot="right" @click="go_alter"/>
      </van-nav-bar>
    </div>
  <!-- 自己写的地址布局 -->
    <div v-for="(i,value) in address" :key="value">
      <div class="address" decode="emsp" @click="returnPurchase(i.addressId)">
        <!-- 左边的名字和电话和详细信息 -->
        <div class="address-left">
          <!-- 上面的名字和电话 -->
          <div class="address-left-name-phone">
            <text class="address-name"> &emsp;{{i.addressName}}</text>
            <text class="address-phone">  &emsp;{{i.addressPhone}}</text>
          </div>
          <!-- 下面的具体信息 -->
          <div class="address-left-concrete">
            <text class="address-concrete">&emsp;{{i.addressCity}}{{i.addressAccurateAddress}}</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import {request} from '@/utils/request'
import {GET_ADDRESS} from '@/utils/api'

export default {
  data () {
    return {
      address: [],
      token: '',
      idList: ''
    }
  },

  components: {
    card
  },

  methods: {
    go_alter () {
      wx.navigateTo({
        url: '/pages/user/address-alter/main'
      })
    },
    async get_user_address () {
      const result = await request(
        GET_ADDRESS,
        'GET'
      )
      console.info('address:', result)
      this.address = result
    },
    returnPurchase (addressId) {
      // let pages =  wx.getCurrentPages()
      // console.info('pages:', pages)
      // let prevPage = pages[pages.length - 2]
      // console.info('prepage:', prevPage)
      // prevPage.addressId = addressId
      // EventChannel.emit('addressId', addressId)
      var idList = this.idList
      console.info('tmd idlist', idList)
      wx.navigateTo({
        url: '/pages/purchase/purchase-page/main',
        success: function (res) {
          res.eventChannel.emit('transactionAddress', {'addressId': addressId, 'idList': idList})
          console.info('ok send')
        }
      })
    }
  },

  created () {
    // let app = getApp()
  },

  onShow () {
    let token = wx.getStorageSync('token')
    let user = wx.getStorageSync('user')
    console.info('token:', token)
    console.info('user', user)
    this.token = token
    this.get_user_address(token)
    this.address = []
  },

  onLoad () {
    let channel = this.$mp.page.getOpenerEventChannel()
    console.info('this:', channel)
    channel.on('alterAddress', (data) => {
      console.log('to alter', data)
      this.idList = data.idList
    })
  }
}
</script>

<style scoped>
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
