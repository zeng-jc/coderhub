<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/user.store.js'
import { Message } from '@arco-design/web-vue'
import '@arco-design/web-vue/es/message/style/css.js'

// hooks
import { usernameRule, passwordRule } from '@/hooks/formRules'

const userStore = useUserStore()
const router = useRouter()
const loginLoading = ref(false)

const form = reactive({
  username: '',
  password: '',
  isRemember: false
})

const handleSubmit = async (data) => {
  loginLoading.value = true
  try {
    const msg = await userStore.login(data.username, data.password)
    if (msg) return Message.error(`登录失败，${msg}`)
    router.push('/home')
    loginLoading.value = false
    userStore.verifyLogin = true
    Message.success('登录成功')
  } catch (error) {
    Message.error('服务器异常')
    loginLoading.value = false
  }
}

const toSignup = () => {
  router.push('signup')
}
</script>

<template>
  <div class="login-view">
    <div class="loginSection">
      <div class="left">
        <h2>欢迎回来~</h2>
        <div class="tip">请输入你的信息</div>
        <a-form :model="form" layout="vertical" class="loginform" @submit-success="handleSubmit">
          <a-form-item field="username" label="Username" :rules="usernameRule">
            <a-input v-model="form.username" placeholder="请输入用户名/邮箱">
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="password" label="Password" :rules="passwordRule">
            <a-input-password v-model="form.password" placeholder="请输入密码">
              <template #prefix>
                <icon-lock />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item field="isRead" class="handler">
            <a-checkbox v-model="form.isRemember"> 记住密码 </a-checkbox>
            <div class="forgetPassword">忘记密码</div>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" long html-type="submit" :loading="loginLoading">登录</a-button>
          </a-form-item>
        </a-form>
        <div class="toSignup">
          没有账号？
          <span @click="toSignup">立即注册</span>
        </div>
      </div>
      <div class="right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
:deep(.arco-form-item-content.arco-form-item-content-flex) {
  justify-content: space-between;
  .forgetPassword {
    color: rgb(var(--primary-6));
    cursor: pointer;
  }
}
.login-view {
  background-color: var(--theme-bgk1);
  display: flex;
  justify-content: center;
  .loginSection {
    margin-top: 18vh;
    background-color: #fff;
    height: fit-content;
    width: 700px;
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 10px -5px #86909c;
    .left {
      flex: 1;
      padding: 0 40px;
      .tip {
        color: #c9cdd4;
        font-size: 10px;
        margin-bottom: 10px;
      }
      .toSignup {
        margin: 15px 0;
        text-align: center;
        span {
          cursor: pointer;
          color: rgb(var(--primary-6));
        }
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f7f9;
      .circle {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: rgb(var(--primary-6));
        position: relative;
        &::after {
          content: '';
          width: 180px;
          height: 85px;
          background-color: transparent;
          backdrop-filter: blur(8px);
          position: absolute;
          top: 50%;
          right: 50%;
          transform: translateX(50%);
        }
      }
    }
  }
}
</style>
