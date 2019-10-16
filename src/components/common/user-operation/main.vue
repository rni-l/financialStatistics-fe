<template>
  <div class="u-userOperation">
    <el-dropdown placement="top" trigger="click">
      <span class="el-dropdown-link">
        <span>{{ welcomeTips }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(v ,i) in dropdownItems" :key="i">
          <span class="u-userOperation-span" @click="handleDropdownClick(v, $event)">{{ v.label }}</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span class="u-userOperation-span" type="text" @click="handleLogout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { DropdownItem } from '../../../../types/common';

@Component({
  components: {},
  name: 'LuUserOperation'
})
export default class LuUserOperation extends Vue {
  @Prop() logout?: any
  @Prop({ default: () => ([]) }) dropdownItems?: DropdownItem[]

  @Getter username!: string

  get welcomeTips() {
    let timeCut = '';
    const now = new Date(),
      hour = now.getHours();
    if (hour > 6 && hour <= 11) {
      timeCut = '早上好';
    } else if (hour > 11 && hour <= 14) {
      timeCut = '中午好';
    } else if (hour > 14 && hour <= 18) {
      timeCut = '下午好';
    } else if (hour > 18 || hour === 0) {
      timeCut = '晚上好';
    } else {
      timeCut = '深夜好';
    }
    // const username = this.username || this.userInfo.username || (this.userInfo.userInfoMap ? this.userInfo.userInfoMap.realName : '');
    const username = this.username || 'admin'
    return `${timeCut}${username ? ('，' + username) : ''}`;
  }

  handleLogout() {
    this.$confirm('是否退出系统, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      if (!this.logout) {
        // 依赖 store
        this.$store.dispatch('logout').then(() => {
          this.$router.push({ path: '/login' });
          this.$nextTick(() => {
            window.location.reload();
          });
        });
      } else {
        this.logout();
      }
    });
  }

  handleDropdownClick(v: DropdownItem, e: Event) {
    console.log('click');
    if (v.handleCallback) {
      v.handleCallback(v, e);
    }
  }
}
</script>

<style lang='scss' scoped>
.u-userOperation {
  font-size: 14px;
  color: #666666;
  display: flex;
  align-items: center;

  .el-dropdown-link {
    font-family: 'PingFangSC-Regular';
    font-size: 14px;
    line-height: 1.5;
    color: #666666;
    cursor: pointer;
    span {
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .change-pwd {
    text-decoration: none;
  }

  .separation {
    margin-left: 22px;
    margin-right: 19px;
  }

  .btn-logout {
    font-size: 14px;
    color: #666666;
  }

  &-span {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
