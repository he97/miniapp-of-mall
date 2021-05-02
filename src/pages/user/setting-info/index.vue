<template>
  <div>
    <div>
    <!--下面写虚线  -->
      <van-divider dashed contentPosition="center">以下是您的个人信息</van-divider>
    </div>
    <div>
      <!-- 下面写个人信息 -->
      <van-cell title="姓名" icon="user-circle-o" :value="name" size="large" />
      <van-cell title="性别" icon ="aim" :value="sex" size="large" />
      <van-cell title="年龄" icon="calendar-o" :value="age" size="large" />
      <van-cell title="生日" icon="birthday-cake-o" :value="birthdate" size="large" />
      <van-cell title="余额" icon="gold-coin-o" :value="balance" size="large" />
      <van-cell title="手机号" icon="phone-circle-o" :value="phone" size="large" />
    </div>
    <div>
    <!--下面两个按钮的间隔虚线  -->
      <van-divider dashed contentPosition="center">您的信息展示完毕</van-divider>
    </div>
    <div class="back-revise-div">
      <div >
        <!-- 左边的按钮 -->
        <!-- <van-button type="primary">主要按钮</van-button> -->
        <van-button type="primary" block plain>返回上级</van-button>
      </div>
      <div >
        <!-- 右边的按钮 -->
        <!-- <van-button type="danger">危险按钮</van-button> -->
        <van-button type="danger" block send-message-path="/pages/user/setting-alter/main" @click="revise_setting">修改设置</van-button>
      </div>
    </div>

  </div>
</template>

<script>
import card from '@/components/card'
import {request} from '@/utils/request'
import {USER_INFO} from '@/utils/api'
export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      name: '',
      sex: '',
      age: '',
      balance: 0.00,
      birthdate: '',
      phone: ''
    }
  },

  components: {
    card
  },

  methods: {
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
    revise_setting () {
      wx.navigateTo({
        url: '/pages/user/setting-alter-others/main'
      })
    },
    async getUserInfo () {
      console.info('in getUserInfo')
      const userInfo = await request(
        USER_INFO,
        'GET'
      )
      // console('测试：', mainPageCommodity[0])
      console.info('Commodity', userInfo)
      this.name = userInfo.userName
      this.sex = userInfo.userSex
      this.age = userInfo.userAge
      this.birthdate = userInfo.userBirthdate
      this.balance = userInfo.userBalance
      this.phone = userInfo.userPhone
    }
  },

  created () {
    // let app = getApp()
  },
  onShow () {
    this.getUserInfo()
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
