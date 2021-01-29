<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="leaveItem" @mouseenter="isShow = true">
          <h2 class="all">全部商品分类</h2>
          <transition name="sort">
            <div class="sort" v-show="isShow">
              <div class="all-sort-list2" @click="toSearch($event)">
                <div
                  class="item"
                  :class="{ 'item-bg': index1 === bgShow }"
                  v-for="(item1, index1) in categoryList"
                  :key="item1.categoryId"
                  @mouseenter="moveInItem(index1)"
                >
                  <h3>
                    <a
                      href="javaScript:;"
                      :data-category1Id="item1.categoryId"
                      :data-categoryName="item1.categoryName"
                    >
                      {{ item1.categoryName }}</a
                    >
                  </h3>
                  <div class="item-list clearfix">
                    <div class="subitem">
                      <dl
                        class="fore"
                        v-for="item2 in item1.categoryChild"
                        :key="item2.categoryId"
                      >
                        <dt>
                          <a
                            href="javaScript:;"
                            :data-category2Id="item2.categoryId"
                            :data-categoryName="item2.categoryName"
                          >
                            {{ item2.categoryName }}
                          </a>
                        </dt>
                        <dd>
                          <em
                            v-for="item3 in item2.categoryChild"
                            :key="item3.categoryId"
                          >
                            <a
                              href="javaScript:;"
                              :data-category3Id="item3.categoryId"
                              :data-categoryName="item3.categoryName"
                            >
                              {{ item3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入lodash中的throttle
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      bgShow: -6,
      isShow: true,
    };
  },
  methods: {
    //使用函数节流控制背景
    moveInItem: throttle(
      function(value) {
        this.bgShow = value;
      },
      20,
      { trailing: false }
    ),
    //点击导航传递参数
    toSearch(event) {
      let {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = event.target.dataset; //手机默认属性
      if (categoryname) {
        let location = {
          name: "search",
        };
        let query = {
          categorName: categoryname,
        };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        //合并路由参数
        let {
          $route: { params },
        } = this;
        if (params) {
          location.params = params;
        }

        location.query = { ...query };
        this.$router.push(location);
      }
    },
    //全部商品移除背景消失,和item消失
    leaveItem() {
      this.bgShow = -6;
      if (this.$route.path === "/search") {
        this.isShow = false;
      }
    },
  },
  mounted() {
    if (this.$route.path === "/search") {
      this.isShow = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #860786;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #860786;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      &.sort-enter {
        box-shadow: #333 0px 0px 0px;
        opacity: 0.1;
      }
      &.sort-enter-to {
        box-shadow: #333 0px 0px 2px;
        opacity: 1;
      }
      &.sort-enter-active {
        transition: all 1s;
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item-bg {
            background-color: rgb(170, 123, 192);
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
