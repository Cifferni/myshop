<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartListInfo" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @change="updataItemChecked(item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeCarNum(-1, true, item)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="changeCarNum($event.target.value * 1, false, item)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeCarNum(+1, true, item)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click.prevent="deleteItem(item.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="allChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click.prevent="deleteAllItem">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ checkedCommodityPrice }}</i>
        </div>
        <div class="sumbtn">
      
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getCartList();
  },
  methods: {
    getCartList() {
      this.$store.dispatch("getCartList");
    },
    async changeCarNum(value, falg, item) {
      let originNum = item.skuNum;
      if (falg) {
        if (originNum + value < 1) {
          value = 1 - originNum; //结果 0 不加不减
        }
      } else {
        if (value < 1) {
          //1-originNum 是个负数,负号后边的数字比原来的数字会少一,这样后台服务器计算,就是原来的 - 传过去的 = 1
          value = 1 - originNum;
        } else {
          /* 
               如果 输入的 - 原来的值(原来的值比输入的大) 则就是负数,就可以通知服务器减去多少
               如果 输入的 - 原来的值(输入的比原来来) 则是正数,就通知服务器加多少
            */
          value = value - originNum;
        }
      }
      try {
        await this.$store.dispatch("addShopCart", {
          skuId: item.skuId,
          skuNum: value,
        });

        this.getCartList();
      } catch (error) {
        alert(error.message);
      }
    },
    async updataItemChecked(value) {
      let { skuId, isChecked } = value;

      try {
        await this.$store.dispatch("setItemChecked", {
          skuID: skuId,
          isChecked: isChecked ? 0 : 1,
        });
        this.getCartList();
      } catch (error) {
        alert(error.message);
      }
    },
    async deleteItem(value) {
      try {
        await this.$store.dispatch("deleteItem", value);
        this.getCartList();
      } catch (error) {
        alert(error);
      }
    },
   async deleteAllItem(){
      try {
      await this.$store.dispatch('deleteAllItem')
      this.getCartList();
      } catch (error) {
        alert('删除失败')
      }
    }
  },
  computed: {
    ...mapGetters(["cartListItem"]),
    cartListInfo() {
      return this.cartListItem.cartInfoList || [];
    },
    //计算已选几件商品
    checkedNum() {
      const checkedNum = this.cartListInfo.reduce((prev, item) => {
        return (prev += item.isChecked ? item.skuNum : 0);
      }, 0);
      return checkedNum;
    },
    //统计总价
    checkedCommodityPrice() {
      const totalPrice = this.cartListInfo.reduce((prev, item) => {
        return (prev += item.isChecked ? item.skuPrice * item.skuNum : 0);
      }, 0);
      return totalPrice;
    },
    //计算全选和不全选
    allChecked: {
      async set(value) {
        try {
          await this.$store.dispatch("setAllItemChecked", value ? 1 : 0);
        } catch (error) {
          alert(error.message);
        }
      },
      get() {
        return this.cartListInfo.every((item) => item.isChecked);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
          line-height: 70px;
        }

        .cart-list-con5 {
          width: 17%;
          margin-top: 20px;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
          a {
            text-decoration: none;
          }
        }

        .cart-list-con6 {
          width: 10%;
          line-height: 70px;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;
          line-height: 40px;
          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    margin-bottom: 15px;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;
      margin-top: 8px;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
        margin-right: 8px;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;
      margin-top: 8px;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
        margin-top: 8px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;
        margin-top: 8px;
        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
