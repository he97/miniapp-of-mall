<template>
<div>
  <div v-if="!user" class="user-no-login">
      <IconHeadNoLogin></IconHeadNoLogin>
      <van-button type="danger" size="large" @click="login">
        微信登录
      </van-button>
  </div>
  <div v-if="user">
      <!-- <div  style="background-color:#FFA500;clear:both;text-align:center;width:200px; height:200px">
        <van-image :width="100" height="100" round="true" fit="cover" src="/static/images/cat.jpeg" />
      </div> -->
      <div class="welcome_div">

          <div class="photo2">
            <van-image 
          width="100px" 
          height="100px" 
          round="true" 
          fit="cover" 
          :src=user.avatarUrl />
            <!-- <image
            class="photo2"
            src="/static/images/cat.jpeg"
          /> -->
          </div>
          
          <!-- <image
            class="photo3"
            src="/static/images/cat.jpeg"
          /> -->
          <div class="photo3">
            <!-- 大框架 -->
            <!-- 第一个小框架 -->
            <!-- <div class="photo4">
              <van-cell title="单元格" value="内容" />
            </div> -->
            <!-- 第二行 -->
            <div class="photo5">
              <text >{{user.wxNickName}}</text>
            </div>
          </div>  
      </div>
      <!-- 购物车，已买，未买之类 -->
      <div>
        <van-grid  column-num="3" border= "false">
          <van-grid-item icon="cart-o" text="已发布商品" @click="hadSubmit"/>
          <van-grid-item icon="balance-list-o" text="已购买商品" @click="hadBought"/>
          <van-grid-item icon="balance-list-o" text="已卖出商品" @click="hadSell"/>
        </van-grid>
      </div>


      <!-- 下面几个横条 -->
      <div >
        <van-cell
          is-link
          title="添加商品"
          link-type="navigateTo"
          url="/pages/commodity/submit/main"
        />
        <van-cell
          is-link
          title="个人信息"
          link-type="navigateTo"
          url="/pages/user/setting-info/main"
        />
        <van-cell
          is-link
          title="收货地址"
          link-type="navigateTo"
          url="/pages/user/user-address/main"
        />
        <van-cell
          is-link
          title="账户安全"
          link-type="navigateTo"
          url="/pages/user/setting-alter-pwd/main"
        />
        <van-cell
          is-link
          title="常见问题"
          link-type="navigateTo"
          url="/pages/dashboard/index"
        />
      </div>
    <!-- 最后的分界线 -->
    <van-divider dashed contentPosition="center">结束了哦</van-divider>
  </div>
</div>
</template>

<script>
import card from '@/components/card'
import {request} from '@/utils/request'
import {LOGIN_URL, USER_URL_ME} from '@/utils/api'
export default {
  data () {
    return {
      user: null,
      tempdata: null,
      userInfo: null
    }
  },

  components: {
    card
  },

  methods: {
    bindGetUserInfo (e) {
      if (e.mp.detail.rawData) {
        // 用户按了允许授权按钮
        this.login(e)
      } else {
        // 用户按了拒绝按钮
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none'
        })
      }
    },
    hadSubmit () {
      wx.navigateTo({
        url: '/pages/user/had-submit-commodities/main'
      })
    },
    hadSell () {
      wx.navigateTo({
        url: '/pages/user/had-sell/main'
      })
    },
    hadBought () {
      wx.navigateTo({
        url: '/pages/user/had-bought/main'
      })
    },
    login (e) {
      var userInfo
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.info('res:', res)
          userInfo = res.userInfo
          console.info('user:', this.userInfo)
          wx.login({
            success: (res) => {
              console.info('in success')
              console.info('userInfo in success', userInfo)
              request(
                LOGIN_URL,
                'POST', {
                  code: res.code,
                  wxNickName: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl
                }
              ).then(res => {
                console.log('登录成功...', res)
                wx.setStorageSync('token', res.jwtTokenResp)
                wx.setStorageSync('user', res.user)
                console.log('user...', res.user)
                wx.showToast({
                  title: '登录成功！'
                })
                console.log('user...', res.user)
                this.user = res.user
              }).catch(error => {
                console.log('error', error)
                // reject(error)
              })
            }
          })
        }
      })
      // const self = this
      // let userInfo = e.mp.detail.userInfo
      // console.info('e:', e)
      // console.log('userInfo:', userInfo)
      // 登录
      userInfo = this.userInfo
      console.info('userInfo in zhongjian', userInfo)
      // wx.login({
      //   success: (res) => {
      //     console.info('in success')
      //     console.info('userInfo in success', userInfo)
      //     request(
      //       LOGIN_URL,
      //       'POST', {
      //         code: res.code,
      //         wxNickName: userInfo.nickName,
      //         avatarUrl: userInfo.avatarUrl
      //       }
      //     ).then(res => {
      //       console.log('登录成功...', res)
      //       wx.setStorageSync('token', res.token)
      //       wx.setStorageSync('user', res.user)
      //       console.log('user...', res.user)
      //       wx.showToast({
      //         title: '登录成功！'
      //       })
      //       console.log('user...', res.user)
      //       this.user = res.user
      //     }).catch(error => {
      //       console.log('error', error)
      //       // reject(error)
      //     })
      //   }
      // })
    },
    async getUser () {
      let user = await request(
        USER_URL_ME,
        'GET',
        {}
      )
      wx.setStorageSync('user', user)
      this.user = user
    },
    async getInfo () {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.info('res.userInfo', res.userInfo)
          return res.userInfo
        }
      })
    },
    jumpToPostList () {
      wx.navigateTo({
        url: '/pages/user/post-list/main'
      })
    },
    jumpToUserComplete () {
      wx.navigateTo({
        url: `/pages/user/complete/main`
      })
    },
    jumpToBonusLogDetails () {
      wx.navigateTo({
        url: `/pages/user/bonus-log/main`
      })
    },
    jumpToContributionDetails () {
      wx.navigateTo({
        url: `/pages/user/contribution/main`
      })
    },
    to_setting_info () {
      wx.navigateTo({
        url: '/pages/user/setting-info/main'
      })
    },
    to_user_address () {
      wx.navigateTo({
        url: '/pages/user/user-address/main'
      })
    },
    getUserProfile (e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      console.info('in get user profile')
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.info('res:', res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          console.info('res:', res)
        }
      })
    }
  },

  created () {
    // let app = getApp()
  },
  onLoad () {
    // this.fetchSharePostById()
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
  top: 75px;
  position: absolute;
}
.photo4{
  /* style="background-color:#FFA500;clear:both;text-align:center;width:100px; height:100px" */
  width:200px;
  height:50px;
  position: absolute;
}
</style>
