<template>
  <div>
    <div > 
          <!-- 轮播图写好了 -->
          <swiper indicator-dots="true" autoplay="true" interval="5000" duration="1000" style="height:375px">
            <block v-for="(i,value) in pics" :key="value" >
              <swiper-item>
                <!-- <textarea :value="value"/> -->
                <!-- <van-image width="375.2px" height="150px" :src="'/static/math-info/math_' + i + '.jpg'"/> -->
                <!-- {{item}} -->
                <image :src="i" style="height:100%;width:100%"/>
              </swiper-item>
            </block>
          </swiper>
    </div>
    <div class="head">
      <!-- 商品标题及价格 -->
      <div class="head">
        <!-- 商品标题 -->
        <text class="commodity-title">{{name}}</text>
      </div>
      <div style="height:30px">
        <!-- 商品价格 -->
        <div class="head">
        <text class="info-price-symbol">￥</text>
        </div>
        <div class="head">
        <text class="info-price-num">{{price}}</text>
        </div>
      </div>
    </div>
<!-- 写个分割线 -->
    <div>
      <van-divider />
    </div>
    <!-- 写个cellgroups 展示信息 -->
    <div>
      <van-cell-group>
        <van-cell title="商品描述" :value="info" />
        <van-cell title="品牌名" :value="brandName" />
        <van-cell title="品类" :value="categoryName" />
        <van-cell title="余额" :value="remainder" />
        <van-cell title="发货" value="合肥" />
        <van-cell title="参数"  is-link  @click="parameter_open"/>
      </van-cell-group>
      <van-popup 
        :show="show_parameter"
        @close="parameter_close"
        position="bottom"
        round
        closeable
        >
        <div style="height:30px"/>
        <van-cell-group v-for="(para,key) in parameters" :key="key">
          <van-cell :title="para.name" :value="para.value" />
        </van-cell-group>
        </van-popup>
    </div>
    <!-- 分割线 -->
    <van-divider />
    <!-- 写个商家界面的卡片 -->
    <!-- <div>
      <van-card
        thumb="/static/shopper-icons/商家.png"
      >
        <view slot="title">
          <text class="shop_title">{{shop_title}}</text>
        </view>
        <view slot="desc">
          <text class="shop_desc" >{{shop_desc}}</text>
        </view>
        <view slot="footer">
          <van-button @click="to_shopping_store" >所有物品</van-button>
        </view>
      </van-card>
    </div> -->
    <!-- 分割线 -->
    <div>
      <van-divider  contentPosition="center">详细内容</van-divider>
    </div>
    <!-- 展示下面的图片 -->
    <div v-for="(i,value) in pics" :key="value">
      <image :src="i" mode="widthFix" style="width:100%"/>
    </div>
    <!-- 为底部留出点间隙 -->
      <div style="height:50px"/>
    <div>
      <!-- 现在写最底部的商品界面 -->
      <van-goods-action>
        <!-- <van-goods-action-icon icon="chat-o" text="客服" /> -->
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <!-- <van-goods-action-icon icon="shop-o" text="店铺" /> -->
        <van-goods-action-button color="#be99ff" text="加入购物车" type="warning" @click="addCart(i.commodityId)"/>
        <van-goods-action-button color="#7232dd" text="立即购买"  @click="justBuy(i.commodityId)"/>
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import {request} from '@/utils/request'
import {COMMODITY_INFO, ADD_CART} from '@/utils/api'
export default {
  data () {
    return {
      shop_title: '商店标签',
      shop_desc: '商店描述',
      show_parameter: false,
      parameters: [
        {
          name: '生产商',
          value: '同济大学'
        },
        {
          name: 'BSID',
          value: '784244545487215'
        }
      ],
      name: '',
      id: '',
      brandId: '',
      brandName: '',
      commodityName: '',
      categoryName: '',
      info: '',
      remainder: '',
      price: 0.00,
      pics: []
    }
  },

  components: {
    card
  },

  methods: {
    async addCart (id) {
      const addCartResp = await request(
        ADD_CART + '/' + id,
        'GET'
      )
      console.info('addCartResp:', addCartResp)
    },
    justBuy (idlist) {
      wx.navigateTo({
        url: '/pages/purchase/purchase-page/main?idList=' + idlist
      })
    },
    parameter_open () {
      this.show_parameter = true
      console.info(this.show_sex)
    },
    parameter_close () {
      this.show_parameter = false
    },
    to_shopping_store () {
      wx.navigateTo({
        url: '/pages/shopping/store/main'
      })
    },
    async fetchSharePosts (init) {
      console.info('in fetch')
      if (init) {
        this.pageNo = 1
        this.more = true
      }
      wx.showNavigationBarLoading()
      const commodity = await request(
        COMMODITY_INFO + '/' + this.id,
        'GET',
        {
        }
      )
      // console('测试：', mainPageCommodity[0])
      console.info('Commodity', commodity)
      var urls = commodity.commodityPictureUrl
      var i = 0
      wx.cloud.init({
        env: 'mall-2gphxafjf4f465c4',
        traceUser: true
      })
      // 改一下地址
      if (commodity.cloud) {
        for (; i < urls.length; i = i + 1) {
          if (urls[i].cloud) {
            wx.cloud.downloadFile({
              fileID: urls[i],
              success: res => {
                // get temp file path
                urls[i] = res.tempFilePath
                console.log(res.tempFilePath)
              }
            })
          }
        }
      }
      this.name = commodity.commodityName
      this.categoryName = commodity.categoryName
      this.brandName = commodity.brandName
      this.brandId = commodity.brandId
      this.info = commodity.commodityInformation
      this.remainder = commodity.commodityRemainder
      this.price = commodity.price
      this.pics = urls
      console.info('name', this.name)
      console.info('categoryName', this.categoryName)
      console.info('brandName', this.brandName)
      console.info('brandId', this.brandId)
      console.info('info', this.info)
      console.info('remainder', this.remainder)
      console.info('price', this.price)
      console.info('pics', this.pics)
      // this.commodities = mainPageCommodity
      // console('测试：', this.commodities[0])
      // if (sharesRemote.list.length < 10 && this.pageNo > 0) {
      //   this.more = false
      //   console.log(this.more)
      // }
      // if (init) {
      //   this.shares = sharesRemote.list
      //   wx.stopPullDownRefresh()
      // } else {
      //   // 下拉刷新，不能直接覆盖books 而是累加
      //   this.shares = this.shares.concat(sharesRemote.list)
      // }
      // wx.hideNavigationBarLoading()
    }
  },
  onShow () {
    this.fetchSharePosts(true)
  },
  onLoad: function (option) {
    console.log('option.query:', option)
    this.id = option.id
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
.info-title{
  color: red;
  height: 30px;
}
.info-price-symbol{
  color: red;
  font-weight: 900;
  font-size: 22px;
  height: 30px;
  width:30px;
  position: absolute;
}
.commodity-title{
  font-weight: bold;
}
.info-price-num{
  color: red;
  height: 30px;
  font-size: 22px;
  position: absolute;
  left: 30px;
}
.head{
  position: relative;
  height: auto;
}
.shop_title{
  font-size: large;
  font-weight: bold;
}
</style>
