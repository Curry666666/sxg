<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 需要鼠标离开h2红色盒子一级联动才失去颜色 用事件委派的方法 给父盒子鼠标离开事件 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <nav class="nav">
          <a href="javascript:">服装城</a>
          <a href="javascript:">美妆馆</a>
          <a href="javascript:">舒心购超市</a>
          <a href="javascript:">全球购</a>
          <a href="javascript:">闪购</a>
          <a href="javascript:">团购</a>
          <a href="javascript:">有趣</a>
          <a href="javascript:">秒杀</a>
        </nav>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 事件委托及编程式导航的方式控制路由跳转及传参 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="c1 in categoryList.slice(0, 16)"
                :key="c1.categoryId"
                :class="{ cur: currentId == c1.categoryId }"
              >
                <!-- JS控制经过颜色 其实用css样式控制最简单 这里主要练习js逻辑 -->
                <h3 @mouseenter="changeId(c1.categoryId)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 此处为通过js来控制二三级分类的显示与隐藏 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentId == c1.categoryId ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentId: 0,
      // 控制TypeNav是否隐藏
      show: true,
    };
  },
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注册一个参数state 其实是大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 用ES6的话 不好写节流 改用ES5
    changeId: throttle(function (categoryId) {
      this.currentId = categoryId;
    }, 50),
    leaveShow() {
      this.currentId = 0;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    enterShow() {
      this.show = true;
    },
    // 控制路由跳转与回调
    goSearch(e) {
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          // 动态添加参数
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 合并参数
        location.params = this.$route.params;
        location.query = query;
        this.$router.push(location);
      }
    },
  },
};
</script>

<style scoped lang="less">
.cur {
  background-color: skyblue;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
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

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              cursor: pointer;
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
                  cursor: pointer;
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
                    cursor: pointer;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s;
      overflow: hidden;
    }
  }
}
</style>