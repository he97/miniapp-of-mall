<template>
  <div>
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
              <van-button size="mini" round @click="addCart(i.commodityId)">加入购物车</van-button>
              <van-button size="mini" round @click="justBuy(i.commodityId)">直接购买</van-button>
            </view>
          </van-card>
        </div>
      </div>
  </div>
</template>

<script>
import card from '@/components/card'
import {request} from '@/utils/request'
import {CATEGORY_COMMODITIES, ADD_CART} from '@/utils/api'

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
      more: false,
      category: 0
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
    justBuy (idlist) {
      wx.navigateTo({
        url: '/pages/purchase/purchase-page/main?idList=' + idlist
      })
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
        CATEGORY_COMMODITIES + '/' + this.category,
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
              console.info('res in if', res)
              mainPageCommodity[i].commodityFirstPictureUrl = res.tempFilePath
              console.log(res.tempFilePath)
            },
            fail: err => {
              console.info('error', err)
            }
          })
          console.info('云存储的：', mainPageCommodity[i])
        }
        // console.info('每次的初始url：', mainPageCommodity[i].commodityFirstPictureUrl)
        // mainPageCommodity[i].commodityFirstPictureUrl = '/static/commodities/' + mainPageCommodity[i].commodityFirstPictureUrl
        // console.info('后来的初始url：', mainPageCommodity[i].commodityFirstPictureUrl)
      }
      this.commodities = mainPageCommodity
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
  onPullDownRefresh () {
    this.fetchSharePosts(true)
  },
  mounted () {
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
  onLoad: function (option) {
    console.log('option.query:', option)
    this.category = option.category
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'})
    eventChannel.emit('someEvent', {data: 'test'})
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
    })
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
