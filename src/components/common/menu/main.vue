<template>
  <div class="u-menu">
    <transition mode="out-in">
      <el-menu
        class="u-el-menu"
        :default-active="activeIndex"
        :router="true"
        mode="horizontal"
        v-if="isShowMenu"
      >
        <template v-for="menu in menuList">
          <!-- v-if="permission[menu.permission] || !menu.permission" -->
          <el-menu-item
            v-if="!menu.isNotShow"
            :key="menu.index"
            :index="menu.index"
            @click="handleItem(menu)"
          >{{ menu.label }}</el-menu-item>
        </template>
      </el-menu>

      <el-dropdown v-else @command="handleCommond">
        <span class="el-dropdown-link">
          {{ activeLabel }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <template v-for="(menu, i) in menuList">
            <el-dropdown-item v-if="!menu.isNotShow"
              :key="menu.index"
              :index="menu.index"
              :command="i"
              @click="handleItem(menu)">{{ menu.label }}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { Menu, MenuItem as ElMenuItem } from 'element-ui';
import { checkMatchIndex } from '@/utils/indexTs';
import { MenuItem } from '../../../../types/common';

const menuPd = 40,
  menuFs = 14 / 2;

@Component({
  components: {
    ElMenu: Menu,
    ElMenuItem
  },
  name: 'LuMenu'
})
export default class LuMenu extends Vue {
  @Prop({ default: () => ([]) }) menuList!: MenuItem[]

  @Watch('$route')
  on$route(to: Route) {
    this.activeIndex = to.path;
    if (this.$refs.menu) {
      const menu: any = this.$refs['menu'];
      menu.activeIndex = to.path;
    }
  }

  activeIndex = ''
  isShowMenu = true
  activeLabel = ''
  bindWindowResize = () => {}

  mounted() {
    this.bindWindowResize = this.windowResize.bind(this);
    window.addEventListener('resize', this.bindWindowResize, false);
    this.setMenuType();
    this.setDefaultRoute();
  }
  
  destroyed() {
    window.removeEventListener('resize', this.bindWindowResize, false);
  }

  setMenuType() {
    const menuWidth = this.$el.clientWidth,
      menuListWidth = this.menuList.reduce((acc, cur) => {
        let _acc = acc;
        _acc += (cur.label.length * menuFs + menuPd);
        return _acc;
      }, 0);
    this.isShowMenu = menuWidth > menuListWidth;
  }

  setDefaultRoute() {
    const activeIndex = this.$route.path,
      obj = this.menuList.find(menu => menu.index === activeIndex || checkMatchIndex(menu.children || [], activeIndex));
    this.activeIndex = obj ? (obj.index || '') : activeIndex;
    this.activeLabel = obj ? obj.label : (this.menuList.length ? this.menuList[0].label : '');
  }

  handleItem({ link }: MenuItem) {
    if (link) {
      window.open(link);
    }
  }

  handleCommond(index: number) {
    const obj = this.menuList[index];
    if (obj) {
      if (obj.link) {
        this.handleItem(obj);
      } else {
        this.$router.push({ path: obj.index });
      }
    }
  }

  windowResize() {
    this.setMenuType();
  }
}
</script>

<style lang="scss" scoped>
.u-menu {
  padding: 5px 0;
}
.u-el-menu {
  height: auto;
  line-height: 0;
  white-space: nowrap;
  background-color: transparent;
  user-select: none;
  &.el-menu--horizontal {
    border-bottom: 0;
  }

  .el-menu-item {
    display: inline-block;
    float: none;
    color: #333;
    &:hover {
      border-bottom: 2px solid #409EFF !important;
    }
  }
}

@media screen and (max-width: 768px) {
  .u-el-menu {
    .el-menu-item {
      padding: 0 10px;
    }
  } 
}
</style>
