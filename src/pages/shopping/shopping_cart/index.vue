<template>
  <div>
    <!-- <van-nav-bar title="新的客户" left-text="返回" right-text="保存" fixed="false" safe-area-inset-top="false" left-arrow bind:click-left="onClickLeft" bind:click-right="onClickRight" /> -->
    

    <van-checkbox-group value="result" data-key="result" @change="onChange">
      <!-- 开始循环 -->
      <div v-for="(i,value) in cartCommodity" :key="value">
        <van-swipe-cell right-width="65">
          <view class="shopping-card-skeleton">
            <van-checkbox-group :value="result" @change="onChange">
            <view class="checkbox-skeleton">
              <van-checkbox
                :name="i.commodityId"
                label-position="right"
              >
              </van-checkbox>
            </view>
            <view class="cart-skeleton">
              <van-card
              :num="i.count"
              tag="标签" 
              :price="i.price"
              :desc="i.commodityInformation"
              :title="i.commodityName"
              :thumb="i.commodityFirstPictureUrl"
              :thumb-link="'/pages/home-page/goods-info/main?id=' + i.commodityId"
              custom-class="mycard"
              >
                <view slot="footer">
                  <van-button size="mini">+1</van-button>
                  <van-button size="mini">-1</van-button>
                </view>
              </van-card>
            </view>
            </van-checkbox-group>
          </view>
          <view slot="right" class="demo-text-1" @click="removeCommodity(i.commodityId)">删除</view>
        </van-swipe-cell>
      </div>
  </van-checkbox-group>
  
  <!-- 上为购物车的商品 -->
<!-- 写结算 -->
  <van-submit-bar
    :price="sumPrice*100"
    button-text="提交订单"
    @submit="settle"
    custom-class="van-submit-bar"
    tip
    :safe-area-inset-bottom="false"
  >
    <van-tag type="primary" custom-class="submit-tag">标签</van-tag>
  </van-submit-bar>
  <!--  -->
  <!-- <van-goods-action>
  <van-goods-action-icon icon="chat-o" text="客服" dot />
  <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
  <van-goods-action-icon icon="shop-o" text="店铺" />
  <van-goods-action-button text="加入购物车" type="warning" />
  <van-goods-action-button text="立即购买" />
</van-goods-action> -->
  <div style="height: 50px">
  </div>
  </div>

</template>

<script>
import card from '@/components/card'
import {request} from '@/utils/request'
import {USER_CART, REMOVE_CART_COMMODITY} from '@/utils/api'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      result: [],
      cartCommodity: null,
      userToken: [],
      sumPrice: 0
    }
  },

  components: {
    card
  },

  methods: {
    async removeCommodity (id) {
      const result = await request(
        REMOVE_CART_COMMODITY,
        'POST',
        {
          commodityId: id
        }
      )
      if (result.status === '200') {
        this.fetchSharePosts(this.userToken)
      }
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
    computeSum (list) {
      console.info('list', list)
      console.info('list', list.length)
      const commodities = this.cartCommodity
      console.info('commodities', commodities)
      console.info('commodities', commodities.length)
      var listIndex = 0
      var index = 0
      var count = 0
      for (; listIndex < list.length; listIndex = listIndex + 1) {
        for (; index < commodities.length; index = index + 1) {
          console.info(commodities[index].commodityId === list[listIndex])
          if (commodities[index].commodityId === list[listIndex]) {
            count = count + commodities[index].price * commodities[index].count
            break
          }
        }
        index = 0
      }
      console.info('count:', count)
      this.sumPrice = count
    },
    onChange (event) {
      console.info('event:', event)
      // const key = event.target
      // const { key } = event.currentTarget.dataset
      this.result = event.mp.detail
      // console.info('target:', event.target)
      this.computeSum(event.mp.detail)
      // this.setData({ [key]: event.detail })
    },
    async fetchSharePosts (token) {
      const result = await request(
        USER_CART,
        'PUT',
        {
          token: token.token
        }
      )
      console.info('result:', result)
      var i = 0
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
        // console.info('每次的初始url：', mainPageCommodity[i].commodityFirstPictureUrl)
        // mainPageCommodity[i].commodityFirstPictureUrl = '/static/commodities/' + mainPageCommodity[i].commodityFirstPictureUrl
        // console.info('后来的初始url：', mainPageCommodity[i].commodityFirstPictureUrl)
      }
      this.cartCommodity = result
      console.info('this.cartCommodity', this.cartCommodity)
      // if (result) {
      //   this.cartCommodity = result.data
      //   console.info('this.cartCommodity', this.cartCommodity)
      // }
      // console.info('in fetch')
      // if (init) {
      //   this.pageNo = 1
      //   this.more = true
      // }
      // wx.showNavigationBarLoading()
      // let title = this.title
      // const mainPageCommodity = await request(
      //   MAIN_COMMODITIES,
      //   'GET',
      //   {
      //     pageNo: this.pageNo,
      //     title: title
      //   }
      // )
      // // console('测试：', mainPageCommodity[0])
      // console.info('mainPageCommodity', mainPageCommodity)
      // console.info('length:', mainPageCommodity.length)
      // var i = 0
      // for (; i < mainPageCommodity.length; i = i + 1) {
      //   console.info('每次的初始url：', mainPageCommodity[i].commodityFirstPictureUrl)
      //   mainPageCommodity[i].commodityFirstPictureUrl = '/static/commodities/' + mainPageCommodity[i].commodityFirstPictureUrl
      //   console.info('后来的初始url：', mainPageCommodity[i].commodityFirstPictureUrl)
      // }
      // this.commodities = mainPageCommodity
      // console('测试：', this.commodities[0])
    },
    settle (env) {
      if (this.result.length > 0) {
        wx.navigateTo({
          url: '/pages/purchase/purchase-page/main?idList=' + this.result
        })
      }
      this.result = []
    }
  },
  onShow (event) {
    console.info('onshow')
    let token = wx.getStorageSync('token')
    let user = wx.getStorageSync('user')
    console.info('token:', token)
    console.info('user', user)
    this.userToken = token
    this.fetchSharePosts(token)
    this.result = []
    // this.cartCommodity = result.data
    // console.info('this.cartCommodity', this.cartCommodity)
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.welcome_div{
  /* style="background-color:#FFA500;clear:both;text-align:center;width:100px; height:100px" */
  background-color:#288d79;
  height:100px;
  position: relative;
}

.photo2{
  /* style="background-color:#FFA500;clear:both;text-align:center;width:100px; height:100px" */
  width:100px;
  height:100px;
  position: absolute;
}

.photo3{
  /* style="background-color:#FFA500;clear:both;text-align:center;width:100px; height:100px" */
  width:200px;
  height:100px;
  left: 100px;
  position: absolute;
}
.photo5{
  /* style="background-color:#FFA500;clear:both;text-align:center;width:100px; height:100px" */
  width:200px;
  height:50px;
  top: 50px;
  position: absolute;
}
.photo4{
  /* style="background-color:#FFA500;clear:both;text-align:center;width:100px; height:100px" */
  width:200px;
  height:50px;
  position: absolute;
}

.demo-text-1{
  width: 65px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1AAD19;
  color: #FFFFFF;
  font-size: 36rpx;
}
.van-submit-bar {
  position: relative !important;
}

.edit-address {
  color: #1989fa;
}

.submit-tag {
  margin-left: 15px;
}
.mycard{
  position: fixed;
  height: 100%;
  width: 100%;
  display:flex;
}
.my-checkbox{
      height:359.56px;
      display:flex;
      justify-content:center;
        /* 子元素水平居中 */
      align-items:center;  
}
.shopping-card-skeleton{
  position: relative;
  height: 126px
}
.checkbox-skeleton{
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 20px;
  display:flex;
  justify-content:center;
    /* 子元素水平居中 */
  align-items:center;  
}
.cart-skeleton{
  position: relative;
  height: 100%;
  left: 20px;
  width: 355px;
}
</style>
