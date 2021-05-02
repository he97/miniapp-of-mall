<template>
  <div >
    <!-- 上面的 -->
    <!-- 图像 -->
    <div class="title">
      <div class="title-photo">
        <van-image width="75" height="75" src="/static/images/cat.jpeg" />
      </div>
      <!-- 右上的商店介绍区 -->
      <view class="shop-info">
        <text class="shop-info-text">
          欢迎来到我的小店
        </text>
      </view>
    </div>
    <!-- 写右边的导航 及右边的商品界面-->
    <div>
      <div class="index">
        <van-sidebar active-key="0">
          <van-sidebar-item title="标签名" />
          <van-sidebar-item title="标签名" />
          <van-sidebar-item title="标签名" />
        </van-sidebar>
      </div>
        <div class="shop-card">
          <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="/static/math-info/math_1.jpg"
          />
        </div>
    </div>
    

  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
    }
  },

  components: {
    card
  },

  methods: {
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.shop-info{
  position: absolute;
  left: 75px;
  width: 100%;
  /* background-color: green; */
}
.title{
  height: 75px;
  width: 100%;
  background-color: olive;
  position: relative;
}
.title-photo{
  position: absolute;
}
.shop-info-text{
  position: absolute;
  top:46.7px;
  font-weight: bold;
  font-size: 22px;
  width: 100%;
  text-align: left;
}
.welcome-word{
  position: absolute;
  top: 40px;
  width: 100%;
  text-align: left;
  font-weight: small;
  font-size: 12px;
}
.shop-card{
  position: absolute;
  left: 75px;
  width: 300px;
}
.index{
  position: absolute;
}
</style>
