<template>
  <div>
    <div id="head-notice-bar">
      <!-- 顶部通知栏 -->
      <van-notice-bar 
      scrollable
      text="欢迎您光临我的商城" 
      speed="25"/>
    </div>
    <div>
      <!-- 循环播报图片 -->
      
      <div :id="pictures">
        <!-- <block wx:for="pictures" wx:key="pic_id"> -->
          <!-- <swiper-item> -->
            <!-- <van-image :src=pic_path height="200px" width="200px"/> -->
          <!-- </swiper-item> -->
        <!-- </block> -->
        <div > 
          <!-- 轮播图写好了 -->
          <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
            <block v-for="(item, key) in pictures" :key="key">
              <swiper-item>
                <!-- <textarea :value="item.pic_path"/> -->
                <van-image width="375.2px" height="150px" :src="item.pic_path"/>
                <!-- {{item}} -->
                <!-- <image :src="item.pic_path" style="height=100%;width="/> -->
              </swiper-item>
            </block>
          </swiper>
        </div>
        <div>
          <!-- 两行，一行四个图标 -->
          <van-grid >
            <van-grid-item icon="/static/home-icons/clothes.png" text="服装" id="1" @click="toCategory"/>
            <van-grid-item icon="/static/home-icons/books.png" text="书籍" id="2" @click="toCategory"/>
            <van-grid-item icon="/static/home-icons/3c.png" text="3c产品" id="3" @click="toCategory"/>
            <van-grid-item icon="/static/home-icons/culture.png" text="文娱用品·" id="4" @click="toCategory"/>
            <van-grid-item icon="/static/home-icons/daily-goods.png" text="日用百货" id="5" @click="toCategory"/>
            <van-grid-item icon="/static/home-icons/domestic-appliance.png" text="家用电器" id="6" @click="toCategory"/>
            <van-grid-item icon="/static/home-icons/food.png" text="食品" id="7" @click="toCategory"/>
            <van-grid-item icon="/static/home-icons/handbag.png" text="包包" id="8" @click="toCategory"/>
          </van-grid>
        </div>
        <div>
          <!-- 写筛选 -->
          <van-dropdown-menu active-color="#1989fa">
            <van-dropdown-item :value="value1" :options="option1" />
            <van-dropdown-item :value="value2" :options="option2" />
          </van-dropdown-menu>
        </div>
      </div>
      <div>
        <!-- 写详细的商品页面 -->
        <!-- 在mall3这个目录 -->
        <div v-for="(i,value) in commodities" :key="value">
          <van-card
            :price="i.price"
            :desc="i.commodityInformation"
            :title="i.commodityName"
            :thumb="i.commodityFirstPictureUrl"
            :thumb-link="'/pages/home-page/goods-info/main?id=' + i.commodityId"
          >
            <view slot="footer">
              <van-button size="mini" @click="addCart(i.commodityId)">加入购物车</van-button>
              <van-button size="mini" @click="justBuy(i.commodityId)">直接购买</van-button>
            </view>
          </van-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import {request} from '@/utils/request'
import {MAIN_COMMODITIES, ADD_CART} from '@/utils/api'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      pictures: [
        {
          pic_path: '/static/top_pictures/top1.jpg'
        },
        {
          pic_path: '/static/top_pictures/top2.jpg'
        },
        {
          pic_path: '/static/top_pictures/top3.jpg'
        }
      ],
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      value1: 0,
      value2: 'a',
      commodities: [],
      init: true,
      pageNo: 1,
      more: false
    }
  },

  components: {
    card
  },

  methods: {
    toInfo (id) {
      console.info('to info')
      wx.navigateTo({
        url: '/pages/home-page/goods-info/main?id=' + id
      })
      console.info('id:', id)
    },
    demo () {
      console.info('demo')
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    async fetchSharePosts (init) {
      console.info('in fetch')
      if (init) {
        this.pageNo = 1
        this.more = true
      }
      wx.showNavigationBarLoading()
      let title = this.title
      const mainPageCommodity = await request(
        MAIN_COMMODITIES,
        'GET',
        {
          pageNo: this.pageNo,
          title: title
        }
      )
      // console('测试：', mainPageCommodity[0])
      console.info('mainPageCommodity', mainPageCommodity)
      console.info('length:', mainPageCommodity.length)
      wx.cloud.init({
        env: 'mall-2gphxafjf4f465c4',
        traceUser: true
      })
      var i = 0
      for (; i < mainPageCommodity.length; i = i + 1) {
        if (mainPageCommodity[i].cloud) {
          wx.cloud.downloadFile({
            fileID: mainPageCommodity[i].commodityFirstPictureUrl,
            success: res => {
              // get temp file path
              mainPageCommodity[i].commodityFirstPictureUrl = res.tempFilePath
              console.log(res.tempFilePath)
            }
          })
        }
        // console.info('每次的初始url：', mainPageCommodity[i].commodityFirstPictureUrl)
        // mainPageCommodity[i].commodityFirstPictureUrl = '/static/commodities/' + mainPageCommodity[i].commodityFirstPictureUrl
        // console.info('后来的初始url：', mainPageCommodity[i].commodityFirstPictureUrl)
      }
      this.commodities = mainPageCommodity
      console('测试：', this.commodities[0])
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
    },
    justBuy (idlist) {
      wx.navigateTo({
        url: '/pages/purchase/purchase-page/main?idList=' + idlist
      })
    },
    async addCart (id) {
      const addCartResp = await request(
        ADD_CART + '/' + id,
        'GET'
      )
      console.info('addCartResp:', addCartResp)
    },
    toCategory (env) {
      // env.currentTarget.dataset.id
      console.info('env', env)
      wx.navigateTo({
        url: '/pages/commodity/viewByCategory/main?category=' + env.currentTarget.id,
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function (data) {
            console.log(data)
          },
          someEvent: function (data) {
            console.log(data)
          }
        },
        success: function (res) {
          console.info('urlInfo:', '/pages/commodity/viewByCategory/main?category=' + env.currentTarget.id)
          // 通过eventChannel向被打开页面传送数据
          console.info('res:', res)
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'to destination' })
          console.info('res after:', res)
        }
      })
    }
  },
  onPullDownRefresh () {
    this.fetchSharePosts(true)
  },
  onShow () {
    this.fetchSharePosts(true)
    console.info('onshow')
    // wx.getImageInfo({
    //   src: '../../../../../../my_mall/commodity_center/src/main/resources/commodities/李宁_1_1.jpg',
    //   success (res) {
    //     console.log(res.width)
    //     console.log(res.height)
    //   },
    //   fail (res) {
    //     console.log('fail')
    //   }
    // })
    // wx.chooseImage({
    //   success (res) {
    //     wx.getImageInfo({
    //       src: res.tempFilePaths[0],
    //       success (res) {
    //         console.log(res.width)
    //         console.log(res.height)
    //       }
    //     })
    //   }
    // })
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
