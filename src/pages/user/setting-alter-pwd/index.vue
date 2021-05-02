<template>
  <div>
    <div>
    <!--下面写虚线  -->
      <van-divider dashed contentPosition="center">点击即可修改对应设置</van-divider>
    </div>
    <div>
      <van-cell-group>
        <van-field
          value="username"
          required
          clearable
          label="用户名"
          icon="question-o"
          placeholder="请输入用户名"
          bind:click-icon="onClickIcon"
        />
        <van-field
          value="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          :border="false"
        />
      </van-cell-group>
      <van-button type="primary" size="large">确认更改</van-button>
      <van-button type="danger" size="large">取消更改</van-button>

    </div>

  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      show_sex: false,
      show_birthday: false,
      sex_value: '请点击更改性别',
      birthday_value: '请点击更改出生日期',
      sex_actions: [
        {
          name: '男'
        },
        {
          name: '女'
        }
      ],
      currentDate: new Date().getTime(),
      minDate: new Date().getTime(),
      formatter (type, value) {
        if (type === 'year') {
          return `${value}年`
        } else if (type === 'month') {
          return `${value}月`
        }
        return value
      }
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
    onClose () {
      this.setData({ show: false })
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
    }
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
</style>
