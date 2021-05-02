<template>
  <div>
      <!-- <div  style="background-color:#FFA500;clear:both;text-align:center;width:200px; height:200px">
        <van-image :width="100" height="100" round="true" fit="cover" src="/static/images/cat.jpeg" />
      </div> -->
      <div class="welcome_div">
        
        <!-- <van-image 
          width="100px" 
          height="100px" 
          round="true" 
          fit="cover" 
          position:
          src="/static/images/cat.jpeg" /> -->
        <!-- <van-image 
          width="100px" 
          height="100px" 
          round="true" 
          fit="cover" 
          src="/static/images/cat.jpeg" /> -->
          <div class="photo2">
            <image
            class="photo2"
            src="/static/images/cat.jpeg"
          />
          </div>
          
          <!-- <image
            class="photo3"
            src="/static/images/cat.jpeg"
          /> -->
          <div class="photo3">
            <!-- 大框架 -->
            <!-- 第一个小框架 -->
            <div class="photo4">
              <van-cell title="单元格" value="内容" />
            </div>
            <!-- 第二行 -->
            <div class="photo5">
              <van-cell title="单元格" value="内容" />
            </div>
          </div>  
      </div>
      <!-- 购物车，已买，未买之类 -->
      <div>
        <van-grid  column-num="3" border= "false">
          <van-grid-item icon="cart-o" text="所有订单" />
          <van-grid-item icon="balance-list-o" text="未支付" />
          <van-grid-item icon="shopping-cart-o" text="已支付订单"  />
        </van-grid>
      </div>


      <!-- 下面几个横条 -->
      <div >
        <van-cell
          is-link
          title="个人信息"
          link-type="navigateTo"
          url="/pages/dashboard/index"
        />
        <van-cell
          is-link
          title="收货地址"
          link-type="navigateTo"
          url="/pages/dashboard/index"
        />
        <van-cell
          is-link
          title="账户安全"
          link-type="navigateTo"
          url="/pages/dashboard/index"
        />
        <van-cell
          is-link
          title="常见问题"
          link-type="navigateTo"
          url="/pages/dashboard/index"
        />
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
    }
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
</style>
