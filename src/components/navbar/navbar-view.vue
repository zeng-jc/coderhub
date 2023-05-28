<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// hooks
import { authInfoClear } from '@/hooks/authInfo'
import useUserStore from '@/stores/user.store.js'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { verifyLogin } = storeToRefs(userStore)
const router = useRouter()

// 检查是否登录
if (localStorage.getItem('token')) {
  verifyLogin.value = true
}
// 进入个人中心界面(现在使用router-link跳转)
// const userClick = () => {
//   // 从token中解析出用户信息，获取用户id
//   // const userInfo = localStorage.getItem('token').match(/(?<=\.)[^.]+(?=\.)/)[0]
//   // const username = JSON.parse(decodeURIComponent(atob(userInfo))).name
//   router.push({
//     name: 'user',
//     params: { username: localStorage.getItem('username') }
//   })
// }
const username = () => {
  return localStorage.getItem('username')
}
const visible = ref(false)
// 注销登录
const signoutClick = () => {
  visible.value = true
}
// 确定退出
const handleOk = () => {
  authInfoClear()
  verifyLogin.value = false
  router.replace('home')
}
// 进入登录界面
const signinClick = () => {
  router.push('/signin')
}
// 进入注册界面
const signupClick = () => {
  router.push('/signup')
}
// 进入home主页
const toHome = () => {
  router.push('/home')
}

const getAvatar = () => {
  return localStorage.getItem('avatar')
}
</script>

<template>
  <div class="navbar">
    <a-modal v-model:visible="visible" @ok="handleOk" :simple="true">
      <div>
        <icon-exclamation-circle-fill style="color: rgb(var(--warning-6))" /> 你确定要退出登录吗？
      </div>
    </a-modal>
    <a-row align="center">
      <a-col :flex="2" class="left">
        <div
          :style="{
            width: '80px',
            height: '30px',
            borderRadius: '2px',
            background: 'var(--color-fill-3)',
            cursor: 'pointer'
          }"
        />
      </a-col>
      <a-col :flex="8" class="center">
        <a-menu mode="horizontal" :default-selected-keys="['1']">
          <a-menu-item key="1" @click="toHome">Home</a-menu-item>
          <a-menu-item key="2">热门</a-menu-item>
          <a-menu-item key="3">最新</a-menu-item>
          <a-menu-item key="4">动态</a-menu-item>
          <a-menu-item key="5">文章</a-menu-item>
          <a-menu-item key="6">资源</a-menu-item>
        </a-menu>
        <a-input
          placeholder="请输入搜索内容"
          allow-clear
          :style="{ width: '300px', marginRight: '110px' }"
        >
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
      </a-col>
      <a-col :flex="2" class="right">
        <icon-notification class="notify" />
        <a-popover v-if="verifyLogin">
          <a-avatar :size="36" class="avatar">
            <img :src="getAvatar()" alt="" />
          </a-avatar>
          <template #content>
            <router-link :to="`/user/${username()}`" target="_blank">
              <p class="central">个人中心</p>
            </router-link>
            <p @click="signoutClick" class="signout">退出登录</p>
          </template>
        </a-popover>
        <a-popover v-else>
          <a-avatar class="avatar" :size="36">未登录</a-avatar>
          <template #content>
            <p @click="signinClick" class="signin">立即登录</p>
            <p @click="signupClick" class="signup">立即注册</p>
          </template>
        </a-popover>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="less" scoped>
.central,
.signout,
.signin,
.signup {
  color: var(--color-text-1);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.navbar {
  background-color: var(--color-menu-light-bg);
  box-shadow: 0 0 10px -5px #86909c;

  .left,
  .right {
    display: flex;
    justify-content: center;
  }
  .center {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
    .notify {
      margin-right: 15px;
      cursor: pointer;
      font-size: 20px;
    }

    .avatar {
      cursor: pointer;
    }
  }
}
</style>
