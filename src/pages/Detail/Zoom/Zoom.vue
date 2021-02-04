<template>
  <div class="spec-preview">
    <img :src="skuImageItem.imgUrl" />
    <div class="event" @mousemove="move($event)"></div>
    <div class="big">
      <img :src="skuImageItem.imgUrl" ref="bigImage" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      index: 0,
    };
  },
  mounted() {
    this.$bus.$on("changePicture", this.changePicture);
  },
  props: ["skuImageList"],
  computed: {
    skuImageItem() {
      return this.skuImageList[this.index] || {};
    },
  },
  methods: {
    changePicture(value) {
      this.index = value;
    },
    move(event) {
      let {
        $refs: { mask, bigImage },
      } = this;
      //获取鼠标位置
      let offsetY = event.offsetY;
      let offsetX = event.offsetX;

      //获容器的大小 offsetWidth 包块边框
      let width = event.target.clientWidth;
      let height = event.target.clientHeight;

      //计算蒙版大小
      let maskHeight = mask.clientHeight;
      let maskwidth = mask.clientWidth;

      //计算蒙版的位置
      let maskTop = offsetY - maskHeight / 2;
      let maskLeft = offsetX - maskwidth / 2;

      //限定便捷
      if (maskLeft < 0) {
        maskLeft = 0;
      } else if (maskLeft > width - maskwidth) {
        maskLeft = width - maskwidth;
      }

      if (maskTop < 0) {
        maskTop = 0;
      } else if (maskTop > height - maskHeight) {
        maskTop = height - maskHeight;
      }

      mask.style.top = maskTop + "px";
      mask.style.left = maskLeft + "px";

      bigImage.style.top = -2 * maskTop + "px";
      bigImage.style.left = -2 * maskLeft + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
