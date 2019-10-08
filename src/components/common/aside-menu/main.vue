<template>
  <transition name="fade-menu">
    <div :class="['u-aside-menu', isCollapse ? 'close' : '']" v-if="isShowMenu">
      <el-menu
        v-if="isUpdateMenu"
        ref="menu"
        :default-active="activeIndex"
        :default-openeds="menuDefaultOpen"
        :unique-opened="true"
        router
        :collapse-transition="false"
        active-text-color="#2f54eb"
        class="el-menu-vertical">
        <template v-for="(v, i) in menuList">
          <!-- permission[v.permission] -->
          <el-submenu :index="v.index || ''"
            v-if="v.children && v.children.length && !v.isNotShow"
            :key="i"
          >
            <!-- 组 -->
            <template slot="title">
              <div class="menu">
                <i :class="['iconfon-rs', v.icon, v.icon || 'icon-rs-ios-cube']"></i>
                <span>{{ v.label }}</span>
              </div>
            </template>
            <!-- 子级 -->
            <el-menu-item-group>
              <template v-for="(child, childIndex) in v.children">
                <!-- v-if="permission[child.permission]" -->
                <el-menu-item
                  v-if="!child.isNotShow"
                  :key="childIndex"
                  @click="handleItem(child)"
                  :index="child.index || ''"
                  :route="{ path: child.index || '' }"
                >
                  {{ child.label }}
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>

          <!-- 单项 -->
          <!-- v-else-if="permission[v.permission]" -->
          <el-menu-item
            v-else-if="!v.isNotShow"
            :key="i" 
            :index="v.index || ''"
            :route="{ path: v.index || '' }"
            @click="handleItem(v)"
            class="single-menu"
          >
            <div class="menu">
              <i :class="['iconfon-rs', v.icon || 'icon-rs-ios-cube']"></i>
              <span>{{ v.label }}</span>
            </div>
          </el-menu-item>
        </template>
      </el-menu>

      <div class="u-aside-menu-arrow" @click="handleCollapse">
        <!-- <i v-if="!isCollapse" class="arrow iconfon-rs icon-rs-jiantouyou"></i>
        <i v-else class="arrow collapse iconfon-rs icon-rs-jiantouyou"></i> -->
        <div :class="['triangle', isCollapse ? 'collapse' : '']"></div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { MenuItem } from '../../../../types/common';

@Component({
  components: {},
  name: 'LuAsideMenu'
})
export default class LuAsideMenu extends Vue {
  @Prop({ default: () => ([]) }) menuList!: MenuItem[]

  menuDefaultOpen = []
  activeIndex = ''
  isCollapse = false
  isShowMenu = false
  isUpdateMenu = true
  timer: any = 0

  @Watch('menuList')
  onMenuList(val: MenuItem) {
    this.checkIsShowMenu();
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.isUpdateMenu = false;
    // 每次刷新 menuList 重新生成一个 menuList
    this.$nextTick(() => {
      this.timer = setTimeout(() => {
        this.isUpdateMenu = true;
        this.timer = 0;
      }, 0);
    });
  }

  @Watch('$route')
  on$route(to: Route) {
    this.activeIndex = to.path;
    if (this.$refs.menu) {
      const menu: any = this.$refs['menu'];
      menu.activeIndex = to.path;
    }
  }

  mounted() {
    this.activeIndex = this.$route.path;
    this.checkIsShowMenu();
  }

  /**
   * 判断当前路由是否存在 menuList 中，如果存在就显示侧边栏
   */
  checkIsShowMenu() {
    this.isShowMenu = !!this.menuList.length;
  }

  handleItem({ link }: MenuItem) {
    if (link) {
      window.open(link);
    }
  }

  handleCollapse() {
    this.isCollapse = !this.isCollapse;
  }
}
</script>

<style lang="scss" scoped>
$menu-activeColor: #2f54eb;
$w: 200px;
$closeW: 52px;
.u-aside-menu {
  align-self: stretch;
  position: relative;
  background-color: #ffffff;
  box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, 0.1);
  width: 200px;
  &.close {
    width: 0;
  }

  .el-menu {
    overflow: hidden;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
  }

  .el-menu--collapse {
    width: $closeW;
  }

  li {
    background-color: #ffffff;

    &:hover {
      background-color: #ffffff;
    }

    .el-submenu.is-active > .el-submenu__title {
      height: 38px !important;
    }

    i {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
    }

    span {
      position: absolute;
      left: 50px;
      height: 56px;
      line-height: 56px;
      font-family: 'PingFangSC-Medium';
      font-size: 14px;
    }
  }
  
  .iconfont {
    font-size: 24px;
  }

  .single-menu {
    padding: 0 14px !important;
  }

  .single-menu.is-active {
    height: 38px;
    line-height: 38px;

    span {
      height: 38px;
      line-height: 38px;
    }
  }

  /deep/ .el-submenu .el-submenu__title {
    padding: 0 14px !important;
  }

  /deep/ .el-submenu:not(:last-child) .el-menu-item-group ul {
    border-bottom: 1px solid #ebebec;
  }

  /deep/ .el-submenu .el-menu-item-group ul {
    padding: 8px 0;
  }

  .el-menu-item-group .el-menu-item {
    height: 28px;
    line-height: 28px;
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
  }

  /deep/ .el-menu-item-group .el-menu-item {
    padding-left: 50px !important;
  }

  .el-menu-item-group .el-menu-item-group__title {
    display: none;
  }

  /deep/ .el-menu-item-group__title {
    display: none;
  }

  /deep/ .el-submenu.is-active {
    .el-submenu__title {
      height: 38px;
    }
    .el-submenu__icon-arrow.el-icon-arrow-down {
      color: #fff;
    }
  }

  .el-submenu.is-active .el-submenu__title span,
  .single-menu.is-active span {
    left: 36px;
  }

  .single-menu.is-active span {
    position: relative;
  }

  li.el-submenu.is-active,
  .single-menu.is-active {
    background-color: $menu-activeColor;

    .iconfon-rs {
      color: #fff;
    }

    .menu {
      position: relative;
      height: 38px;

      i {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
      }

      span {
        height: 38px;
        line-height: 38px;
      }
    }

    span {
      color: #ffffff;
    }
  }

  .icon-arrow-style {
    display: inline-block;
    width: 14px;
    height: 14px;
  }

  /deep/ li.el-submenu.is-active .el-submenu__title:hover,
  .single-menu.is-active,
  .single-menu.is-active:hover {
    background-color: $menu-activeColor;
  }

  .single-menu:hover {
    background-color: #ecf5ff;
  }

  /deep/ .el-submenu__icon-arrow.el-icon-arrow-down {
    transform: rotateZ(-90deg);
    &::before {
      font-size: 18px;
    }
  }

  /deep/ .el-submenu.is-active .el-submenu__icon-arrow.el-icon-arrow-down {
    &::before {
      font-size: 18px;
    }
  }

  /deep/ .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
    transform: rotateZ(0);
  }

  .icon-public-style {
    display: inline-block;
    width: 24px;
    height: 24px;
  }

  &.el-menu-vertical /deep/ .is-opened.el-submenu .el-submenu__title {
    background-color: $menu-activeColor;
  }

  &-arrow {
    $w: 15px;
    position: absolute;
    top: 50%;
    right: -1 * $w;
    transform: translateY(-50%);
    width: $w;
    height: 100px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(210, 210, 210);
    border-radius: 0 25px 25px 0;
    .triangle {
      width: 0;
      height: 0;
      border-right: 5px solid #fff;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      transition: all .3s;
      &.collapse {
        border-right: 0;
        border-left: 5px solid #fff;
      }
    }
  }
}

  .menu-router-link {
    text-decoration: none;
  }

  .fade-menu-enter-active,
  .fade-menu-leave-active {
    transition: all 0.5s ease;
    transform: translateX(0);
    opacity: 1;
  }

  .fade-menu-enter,
  .fade-menu-leave-to {
    transform: translateX(-300px);
    opacity: 0;
  }
</style>
