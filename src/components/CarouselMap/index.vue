<template>
  <div class="swiper-container" id="mySwiper" ref="bannerSwiper1">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in bannerData" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
 props:["bannerData"],
  name: "Swiper",
  watch: {
    bannerData: {
      immediate: true,
      handler() {
        this.$nextTick(function() {
          new Swiper(this.$refs.bannerSwiper1, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            autoplay: {
              delay: 5000,
              stopOnLastSlide: false,

              disableOnInteraction: true,
            },
          });
        });
      },
    },
  },
};
</script>

<style></style>
