<template>
  <div class="m-login">
    <el-form :model="ruleForm" :rules="rules" ref="form" label-width="100px" class="form">
      <div class="title">登录</div>
      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button :loading="isLoading" type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { Form } from 'element-ui';
import { apiAdminUserLogin } from '../../api/adminUser';

@Component({
  components: {}
})
export default class Login extends Vue {
  @Ref() readonly form!: Form

  ruleForm = {
    name: '',
    password: ''
  }
  rules = {
    name: [
      { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]
  }
  isLoading = false

  submitForm() {
    this.form.validate((valid) => {
      if (valid) {
        this.login()
      } else {
        return false;
      }
    });
  }

  async login() {
    this.isLoading = true
    const { name, password } = this.ruleForm
    const { isSuccess } = await apiAdminUserLogin({ name, password })
    this.isLoading = false
    if (isSuccess) {
      this.$router.push({ name: 'store' })
    }
  }
}
</script>

<style lang="scss" scoped>
.m-login {
  .form {
    width: 90%;
    max-width: 500px;
    background: #fff;
    box-shadow: 0 0 10px 2px rgba(#333, .5);
    padding: 50px 20px;
    box-sizing: border-box;
    border-radius: 15px;
    @include f-absoluteCenter;
    .title {
      padding-bottom: 50px;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      text-align: center;
    }
  }
}
</style>
