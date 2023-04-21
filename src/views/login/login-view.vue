<script setup>
import { reactive } from 'vue'
const form = reactive({
  nickname: '',
  username: '',
  password: '',
  rePassword: '',
  isRead: false
})
</script>

<template>
  <div class="loginView">
    <a-form :model="form" layout="vertical" class="form">
      <a-form-item field="nickname" label="Nickname">
        <a-input v-model="form.name" placeholder="请输入昵称" />
      </a-form-item>
      <a-form-item field="username" label="Account">
        <a-input v-model="form.username" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="password" label="Password">
        <a-input v-model="form.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item field="rePassword" label="rePassword">
        <a-input v-model="form.rePassword" placeholder="请确认密码" />
      </a-form-item>
      <a-radio-group>
        <a-radio value="male">男</a-radio>
        <a-radio value="female">女</a-radio>
      </a-radio-group>
      <a-form-item field="isRead">
        <a-checkbox v-model="form.isRead"> 同意注册 </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button>Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.loginView {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .form {
    width: 310px;
  }
}
</style>
