<template>
  <div class="u-businessContainer">
    <!-- 顶部导航栏 -->
    <div class='u-header'>
      <section class="u-header-wrap">
        <!-- logo -->
        <img
          class='u-businessContainer-logo'
          v-if="logo"
          :src="logo"
        >
        <div class="u-header-spacer" v-if="logo && title"></div>
        <!-- title -->
        <div class="u-businessContainer-title" v-if="title">{{ title }}</div>
        <!-- 菜单栏 -->
        <div class="u-businessContainer-menu">
          <u-menu
            :menuList="menuList" />
        </div>
        <!-- 用户操作栏 -->
        <user-operation :isPhone="isPhone" :logout="logout" :dropdownItems="dropdownItems" />
      </section>
    </div>

    <div class="u-businessContainer-wrap">
      <u-aside-menu :menuList="secondMenuList" />
      <!-- 这里已经默认带上了 basic-container 组件，该路由下的子路由无需再写 -->
      <basic-container :class="[isShowContainer ? '' : 'noPadding']">
        <transition :name="transitionName" :mode="transitionMode"  v-if="$route.meta.keepAlive">
          <keep-alive>
            <router-view class="avue-view"/>
          </keep-alive>
        </transition>
        <transition :name="transitionName" :mode="transitionMode" v-else>
          <router-view class="avue-view"/>
        </transition>
      </basic-container>
    </div>
  </div>
</template>

<script lang='ts'>
import { Route } from 'vue-router';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { checkMatchIndex } from '@/utils/indexTs';
import BasicContainer from '../basic-container/main.vue';
import UMenu from '../menu/main.vue';
import UAsideMenu from '../aside-menu/main.vue';
import UserOperation from '../user-operation/main.vue';
import { MenuItem, DropdownItem } from '../../../../types/common';

@Component({
  components: {
    BasicContainer,
    UMenu,
    UAsideMenu,
    UserOperation
  },
  name: 'LuBusinessContainer'
})
export default class LuBusinessContainer extends Vue {
  @Prop() logo?: string
  @Prop({ default: true }) isShowLogo?: boolean
  @Prop({ default: '系统中心' }) title!: string
  @Prop({ default: () => ([]) }) menuList!: MenuItem[]
  @Prop() logout?: any
  @Prop({ default: () => ([]) }) dropdownItems?: DropdownItem[]
  @Prop({ default: 'fade' }) transitionName?: string
  @Prop({ default: 'out-in' }) transitionMode?: string

  secondMenuList: MenuItem[] = []
  isShowContainer = true
  isPhone = false

  @Watch('$route')
  on$route(to: Route) {
    this.updateMenuRoute(to.path);
    this.isShowContainer = !to.meta.isNotShowContainer;
  }

  created() {
    this.isShowContainer = !this.$route.meta.isNotShowContainer;
    this.isPhone = document.documentElement.offsetWidth < 768;
    this.updateMenuRoute(this.$route.path);
  }

  checkMatchIndex(children: MenuItem[], activeIndex: string): boolean {
    return children && checkMatchIndex(children, activeIndex);
  }

  /**
   * 切换路由，返回当前一级菜单的选中路由地址
   */
  updateMenuRoute(activeIndex: string) {
    // 查找父级
    const parentObj = this.menuList.find(menu => menu.index === activeIndex);
    if (parentObj) {
      return (this.secondMenuList = parentObj.children || []);
    }
    // 递归查找子级
    const obj = this.menuList.find(menu => menu.index === activeIndex || this.checkMatchIndex(menu.children || [], activeIndex));
    this.secondMenuList = (obj && obj.children) ? obj.children : [];
  }
}
</script>

<style lang='scss' scoped>
.u-businessContainer {
  height: 100%;
  background-color: #f7f7f7;

  &-title {
    color: $c-primary;
    font-size: 32px;
    line-height: 1;
    vertical-align: middle;
    white-space: nowrap;
  }

  &-logo {
    height: $headerHeight - 20px;
    display: block;
  }

  &-menu {
    $ml: 20px;
    $mr: 30px;
    margin: 0 $mr 0 $ml;
    flex: 1;
    overflow-x: auto;
  }

  .u-header {
    position: fixed;
    z-index: 200;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    &-logo {
      display: block;
      width: 86px;
    }
    &-wrap {
      line-height: 1;
      display: flex;
      align-items: center;
      position: relative;
      padding: 0 32px;
      text-align: right;
      height: $headerHeight;
      overflow-y: hidden;
    }
    .u-userOperation {
      height: auto;
      vertical-align: middle;
      white-space: nowrap;
      .el-dropdown {
        height: auto;
      }
    }
    &-spacer {
      width: 1px;
      height: 50px;
      background: #DDDDDD;
      margin: 0 14px 0 17px;
    }
  }

  &-wrap {
    padding-top: $headerHeight;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    /deep/ .basic-container {
      flex: 1;
      align-self: stretch;
      overflow: hidden;
      transition: all .3s;
      &.noPadding {
        padding: 0;
        box-shadow: 0;
        border-radius: 0;
        & > .el-card {
          & > .el-card__body {
            padding: 0;
          }
        }
      }
      & > .el-card {
        height: 100%;
        width: 100%;
        overflow: auto;
        & > .el-card__body {
          height: 100%;
          box-sizing: border-box;
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  @media screen and (max-width: 1024px) {
    .u-header-wrap {
      padding: 0 20px;
    }
  }

  @media screen and (max-width: 768px) {
    .u-header-wrap {
      padding: 0 20px;
    }
    .u-businessContainer  {
      &-title {
        font-size: 24px;
      }
    }
  }

  @media screen and (max-width: 560px) {
    .u-header-wrap {
      padding: 0 12px;
    }
    .u-logo {
      height: $mHeaderHeight - 20px;
    }
    .u-businessContainer  {
      &-title {
        font-size: 16px;
      }
      &-wrap {
        padding-top: $mHeaderHeight;
      }
      &-menu {
        padding: 0;
      }
    }
  }
}
</style>
