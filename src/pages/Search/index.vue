<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="reqSearchInfo.categorName">
              {{ reqSearchInfo.categorName }}<i @click="clearCategorName">×</i>
            </li>
            <li class="with-x" v-if="reqSearchInfo.keyword">
              {{ reqSearchInfo.keyword }}<i @click="clearkeyword">×</i>
            </li>
            <li class="with-x" v-if="reqSearchInfo.trademark">
              {{ reqSearchInfo.trademark.split(":")[1]
              }}<i @click="clearTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(item, index) in reqSearchInfo.props"
              :key="item"
            >
              {{ item.split(":")[1] }}<i @click="clearProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @getTrademark="getTrademark" @getProps="getProps" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: SortKey === '1' }">
                  <a href="#" @click.prevent="goSort('1')">
                    综合
                    <i
                      v-if="reqSearchInfo.order.split(':')[0] === '1'"
                      class="iconfont"
                      :class="{
                        icondown: SortValue === 'desc',
                        iconup: SortValue === 'asc',
                      }"
                    >
                    </i>
                  </a>
                </li>
                <li :class="{ active: SortKey === '2' }">
                  <a href="#" @click.prevent="goSort('2')">
                    价格
                    <i
                      v-if="reqSearchInfo.order.split(':')[0] === '2'"
                      class="iconfont"
                      :class="{
                        icondown: SortValue === 'desc',
                        iconup: SortValue === 'asc',
                      }"
                    >
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${item.id}`"
                      ><img v-lazy="item.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link
                      :to="`/detail/${item.id}`"
                      :title="item.title"
                      >{{ item.title }}</router-link
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <Pagination
              :pageNo="reqSearchInfo.pageNo"
              :total="SeardInfro.total"
              :pageSize="SeardInfro.pageSize"
              :continuousNum="5"
              @turnPage="turnPage"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      reqSearchInfo: {
        category3Id: "",
        category2Id: "",
        category1Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "1:desc", //排序规则
        pageNo: 1, //搜索第几页的商品
        pageSize: 10, //每页错少个商品
      },
    };
  },
  beforeMount() {
    //让请求数据之前修改this.reqSearchInfo中的数据从而改变内容
    this.SearchInfoFun();
  },
  mounted() {
    //页面挂载获取数据
    this.getSearchInfo();
  },
  computed: {
    //从Vuex中的serach的getters中获取数据
    ...mapGetters(["goodsList"]),
    ...mapState({
      SeardInfro: (state) => state.search.SeardInfro,
    }),
    SortKey() {
      return this.reqSearchInfo.order.split(":")[0];
    },
    SortValue() {
      return this.reqSearchInfo.order.split(":")[1];
    },
  },
  methods: {
    //定义函数dispatch actions 中的函数
    getSearchInfo() {
      this.$store.dispatch("getSearchInfo", this.reqSearchInfo);
    },
    //从route中拿取数据,改变 this中的数据
    SearchInfoFun() {
      let {
        category3Id,
        category2Id,
        category1Id,
        categorName,
      } = this.$route.query;
      let { keyWord } = this.$route.params;
      let keyword = keyWord;
      let result = {
        ...this.reqSearchInfo,
        category3Id,
        category2Id,
        category1Id,
        categorName,
        keyword,
      };
      //清楚空串就是给赋值能undefined 发送请求的时候undeinfed的数据就不会发过去
      Object.keys(result).forEach((item) => {
        if (result[item] === "") result[item] = undefined;
      });
      this.reqSearchInfo = result;
    },
    //点击x就会清除CategorName中的内容,修改成undefined
    clearCategorName() {
      //id也要清除,因为点击导航分类会将categorName,和因为点击导航分类会将categorId当做query发送给服务器,我们只删除因为点击导航分类会将categorName是不行的
      this.reqSearchInfo.category3Id = undefined;
      this.reqSearchInfo.category2Id = undefined;
      this.reqSearchInfo.category1Id = undefined;
      this.reqSearchInfo.categorName = undefined;
      this.reqSearchInfo.pageNo = 1;
      this.getSearchInfo();
      this.$router.replace({
        name: "search",
        params: this.$route.params,
      });
    },
    //点击x就会清除keyword中的内容,修改成undefined
    clearkeyword() {
      this.reqSearchInfo.keyword = undefined;
      //清除header搜索框中的文字,使用全局事件总线,实现任意组件之间的通信
      this.$bus.$emit("clearKeyWord");
      this.reqSearchInfo.pageNo = 1;
      this.$router.replace({
        name: "search",
        query: this.$route.query,
      });
    },
    //获取子组件中的品牌数据
    getTrademark(value) {
      this.reqSearchInfo.trademark = `${value.tmId}:${value.tmName}`;
      this.reqSearchInfo.pageNo = 1;
      this.getSearchInfo();
    },
    clearTrademark() {
      this.reqSearchInfo.trademark = undefined;
      this.reqSearchInfo.pageNo = 1;
      this.getSearchInfo();
    },
    getProps(item1, item2) {
      const props = `${item1.attrId}:${item2}:${item1.attrName}`;
      const result = this.reqSearchInfo.props.some((item) => item === props);
      this.reqSearchInfo.pageNo = 1;
      if (!result) {
        this.reqSearchInfo.props.push(props);
        this.getSearchInfo();
      }
    },
    clearProps(index) {
      this.reqSearchInfo.props.splice(index, 1);
      this.reqSearchInfo.pageNo = 1;
      this.getSearchInfo();
    },
    goSort(value) {
      let key = this.reqSearchInfo.order.split(":")[0];
      let val = this.reqSearchInfo.order.split(":")[1];
      let newOrder = "";
      if (value === key) {
        newOrder = `${key}:${val === "asc" ? "desc" : "asc"}`;
      } else {
        newOrder = `${value}:asc`;
      }
      this.reqSearchInfo.order = newOrder;
      this.getSearchInfo();
    },
    turnPage(value) {
      this.reqSearchInfo.pageNo = value;
      this.getSearchInfo();
    },
  },
  watch: {
    //监视$route从而达到可以可以监视path的改变,只要path改变就会重新请求api获取数据
    $route() {
      this.SearchInfoFun();
      this.getSearchInfo();
    },
  },

  components: {
    SearchSelector,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        margin: 0 0 0 280px;
        overflow: hidden;
        float: left;
      }
    }
  }
}
</style>
