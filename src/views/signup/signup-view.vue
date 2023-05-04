<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// arco-design
import { Message } from '@arco-design/web-vue'
import '@arco-design/web-vue/es/message/style/css.js'
// 子组件
import verifyNickname from './cmp/verify-nickname.vue'
import verifyEmail from './cmp/verify-email.vue'
import verifyUsername from './cmp/verify-username.vue'
import verifyPassword from './cmp/verify-password.vue'
// 网络请求
import { fetchSignupUser } from '@/service'

const router = useRouter()
const current = ref(1)
const verifyNicknameRef = ref()
const verifyEmailRef = ref()
const verifyUsernameRef = ref()
const verifyPasswordRef = ref()
const loading = ref(false)
const onPrev = () => {
  current.value = Math.max(1, current.value - 1)
}
const onNext = async () => {
  switch (current.value) {
    case 1:
      if (!verifyNicknameRef.value.isVerify) return
      break
    case 2:
      if (!verifyEmailRef.value.isVerify) return
      break
    case 3:
      if (!verifyUsernameRef.value.isVerify) return
      break
    case 4:
      if (!verifyPasswordRef.value.isVerify) return
      break
  }
  current.value = Math.min(5, current.value + 1)
  console.log(current.value)
  if (current.value === 5) {
    try {
      const res = await fetchSignupUser(
        verifyNicknameRef.value.nicknameVal,
        verifyEmailRef.value.emailVal,
        verifyUsernameRef.value.usernameVal,
        verifyPasswordRef.value.pwdVal
      )
      if (res.code !== 200) return Message.error(res.msg)
      Message.success('注册成功')
      router.push('/login')
      loading.value = false
    } catch (error) {
      Message.error('服务器异常')
      loading.value = false
    }
  }
}
</script>

<template>
  <div class="signupView">
    <div class="frame-body">
      <a-steps :current="current">
        <a-step description="验证昵称">用户昵称</a-step>
        <a-step description="验证邮箱">电子邮箱</a-step>
        <a-step description="验证用户名">用户名</a-step>
        <a-step description="验证密码">用户密码</a-step>
      </a-steps>
      <div class="frame-main">
        <div class="frame-content">
          <verifyNickname ref="verifyNicknameRef" v-show="current === 1" />
          <verifyEmail ref="verifyEmailRef" v-show="current === 2" />
          <verifyUsername ref="verifyUsernameRef" v-show="current === 3" />
          <verifyPassword ref="verifyPasswordRef" v-show="current === 4" />
        </div>
        <a-space size="large">
          <a-button type="secondary" :disabled="current <= 1" @click="onPrev">
            <IconLeft /> Back
          </a-button>
          <a-button
            type="primary"
            :disabled="current >= 5"
            @click="onNext"
            v-if="current === 4"
            :loading="loading"
          >
            完成注册
          </a-button>
          <a-button
            html-type="submit"
            type="primary"
            :disabled="current >= 4"
            @click="onNext"
            v-else
          >
            Next <IconRight />
          </a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
//  background: var(--color-bg-2);
// rgb(var(--danger-6));
.frame-body {
  width: 50vw;
  margin: 15vh auto;
  .frame-main {
    text-align: center;
    background: var(--color-bg-2);
    color: #c2c7cc;
  }
  .frame-content {
    width: 45%;
    margin: 40px auto;
  }
}
</style>
