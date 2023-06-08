<template>
  <div class="shuffling-font">
    <a-carousel
      :style="{
        width: '100%',
        height: '50%',
      }"
      indicator-position="outer"
      :auto-play="true"
      animation-name="fade"
      indicator-type="slider"
      show-arrow="never"
    >
      <a-carousel-item v-for="image in images">
        <div>
          <h2>{{ image.name1 }}</h2>
          <p>{{ image.name2 }}</p>
        </div>
      </a-carousel-item>
    </a-carousel>
  </div>
</template>

<script setup lang="ts">
  import {} from 'vue';
  const images = [
    {
      name1:"助力券商IT自主化",
      name2:"我们将为您提供聚合金融交易、网上开户、集中管理、行情数据等功能服务的LINKSOFT生态产品。"
    },
    {
      name1:"尽心竭力的客户服务",
      name2:"助力金融机构互联网化转型的同时，更深入的为智能化运营考虑，提供金融行业一站式解决方案，让你和你的客户更满意。"
    },
    {
      name1:"精益求精的技术追求",
      name2:"技术团队追逐于科技行业前沿，将系统体验推向极致。同时，LINKSOFT 致力于为金融机构打破技术壁垒，让金融因科技更美好。"
    }
  ];
</script>

<style lang="less" scoped>
.shuffling-font {
    width: 100%;
    color: #fff;
    position: absolute;
    top: 60%;
    transform: translateY(-50%);
    padding: 0 30px 0px 30px;
    box-sizing: border-box;
    height: 45%;
}
</style>
