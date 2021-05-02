<template>
  <div>
    <div>
    <!--下面写虚线  -->
      <van-divider dashed contentPosition="center">点击即可修改对应设置</van-divider>
    </div>
    <div>
      <!-- 下面写设置姓名，性别， 手机号-->
      <!-- value="" -->
      <van-cell-group>
        <!-- 更改用户名 -->
        <van-field
          clearable
          label="用户名"
          left-icon="user-circle-o"
          placeholder="请点击输入用户名"
          @change="setName"
        />
        <!-- 更改手机号 -->
        <van-field
          clearable
          label="手机号"
          left-icon="phone-circle-o"
          placeholder="请点击输入手机号"
          @change="setPhone"
        />
        <!-- 更改性别 -->
        <van-field
          readonly
          :value="sex_value"
          id="sex"
          clearable
          label="性别"
          left-icon="aim"
          @click="sex_toggle"
        />
        <van-action-sheet
          :show="show_sex"
          :actions="sex_actions"
          @select="sex_toggle"
        />
        <!-- 更改出生日期 -->
        <van-field
          readonly
          value="请选择出生日期"
          id="birthday"
          clearable
          label="生日"
          left-icon="birthday-cake-o"
          @click="birthday_toggle"
        />
        <van-popup 
          :show="show_birthday"
          position="bottom"
          @close="birthday_toggle"
          @confirm="setBirthday">
          <div>
            <van-datetime-picker
              type="date"
              :value="currentDate"
              :min-date="maxDate"
              :max-date="minDate"
              @confirm="setBirthday"
              @cancel="birthday_toggle"
            />
          </div>
        </van-popup>
        <van-button type="primary" block plain>返回上级</van-button>
        <van-button type="danger" block @click="alterUserInfo">修改设置</van-button>
      </van-cell-group>

    </div>

  </div>
</template>

<script>
import card from '@/components/card'
import {request} from '@/utils/request'
import {ALTER_INFO} from '@/utils/api'
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
      name: '',
      phone: '',
      maxDate: new Date(1950, 0, 1).getTime(),
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
    setName (value) {
      this.name = value.mp.detail
    },
    setPhone (value) {
      this.phone = value.mp.detail
    },
    async alterUserInfo () {
      console.info('name:', this.name)
      console.info('phone:', this.phone)
      console.info('sex:', this.sex_value)
      console.info('birthdate:', this.birthday_value)
      let post = await request(
        ALTER_INFO,
        'POST',
        {
          'userName': this.name,
          'userSex': this.sex_value,
          'userPhone': this.phone,
          'userBirthdate': this.birthday_value
        }
      )
      console.info(post)
    },
    setBirthday (value) {
      // 存储时间戳
      this.birthday_value = value.mp.detail
      this.show_birthday = !this.show_birthday
      console.info('this.birthday_value', value)
    },
    onClose () {
      this.setData({ show: false })
    },

    onSelect (event) {
      console.log(event.detail)
    },
    sex_toggle (detail) {
      this.show_sex = !this.show_sex
      this.sex_value = detail.target.name
      console.info(this.show_sex)
      console.info('detail', detail)
    },
    birthday_toggle (detail) {
      this.show_birthday = !this.show_birthday
      console.info('展示birth弹出')
      console.info('detail in birth', detail)
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
