<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/user.store.js'
import { Message } from '@arco-design/web-vue'

// hooks
import { emailRule, passwordRule, codeRule } from '@/hooks/formRules'
// utils
import countdownFn from '@/utils/countdownFn'

const userStore = useUserStore()
const router = useRouter()
const loginLoading = ref(false)

const form = reactive({
  email: '',
  password: '',
  code: null,
  isRemember: false
})

const handleSubmit = async (data) => {
  loginLoading.value = true
  try {
    let msg
    // 如果填写了验证码，使用验证码登录
    if (data.code) {
      msg = await userStore.emailVerifyLogin(data.email, data.code)
    } else {
      msg = await userStore.login(data.email, data.password)
    }
    if (msg) {
      loginLoading.value = false
      return Message.error(`登录失败，${msg}`)
    }
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

const loginForm = ref()
const curTabActive = ref(0)
const tabs = reactive(['密码登录', '验证码登录'])
const tabClick = (index) => {
  // 重置表单数据
  loginForm.value.resetFields()
  curTabActive.value = index
}

const isDisabled = ref(false)
// 获取验证码
const getVerifyCode = async (event) => {
  const res = await loginForm.value.validateField('email')
  if (res) return
  countdownFn(60, event.target, isDisabled)
  const isSend = await userStore.getEmialVerifyCode(form.email)
  if (isSend) Message.success('验证码已发送，请注意查收')
  else Message.error('验证码发送失败')
}
</script>

<template>
  <div class="left-section">
    <h2>欢迎回来~</h2>
    <div class="login-mode">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="tabClick(index)"
        :class="{ active: curTabActive === index }"
      >
        {{ item }}
      </span>
    </div>
    <a-form
      :model="form"
      layout="vertical"
      class="login-form"
      @submit-success="handleSubmit"
      ref="loginForm"
    >
      <!-- 邮箱输入框 -->
      <a-form-item field="email" label="Email" :rules="emailRule">
        <a-input v-model="form.email" placeholder="请输入邮箱" allow-clear>
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <!-- 密码输入框 -->
      <a-form-item
        field="password"
        label="Password"
        :rules="passwordRule"
        v-if="curTabActive === 0"
      >
        <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <!-- 验证码输入框 -->
      <a-form-item field="code" label="Code" :rules="codeRule" v-else>
        <a-input-number v-model="form.code" placeholder="请输入验证码" allow-clear hide-button>
          <template #prefix>
            <icon-info-circle />
          </template>
        </a-input-number>
        <a-button
          style="margin-left: 15px"
          @click="getVerifyCode"
          type="outline"
          ref="getVerifyCodeBtnRef"
          :disabled="isDisabled"
        >
          获取验证码
        </a-button>
      </a-form-item>
      <a-form-item field="isRemember" class="handler">
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
</template>

<style lang="less" scoped>
:deep(.arco-form-item-content.arco-form-item-content-flex) {
  justify-content: space-between;
  .forgetPassword {
    color: rgb(var(--primary-6));
    cursor: pointer;
  }
}

.active {
  color: rgb(var(--primary-6));
  border-bottom: 2px solid rgb(var(--primary-6));
}

.left-section {
  flex: 1;
  padding: 0 40px;
  .login-mode {
    color: #c9cdd4;
    font-size: 10px;
    margin-bottom: 10px;
    text-align: right;
    span {
      margin-left: 10px;
      cursor: pointer;
    }
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
</style>
