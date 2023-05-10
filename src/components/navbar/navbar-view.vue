<script setup>
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/user.store.js'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { verifyLogin } = storeToRefs(userStore)
const router = useRouter()

// 检查是否登录
if (localStorage.getItem('token')) {
  verifyLogin.value = true
}
// 进入个人中心界面
const userClick = () => {
  // 从token中解析出用户信息，获取用户id
  // const userInfo = localStorage.getItem('token').match(/(?<=\.)[^.]+(?=\.)/)[0]
  // const username = JSON.parse(decodeURIComponent(atob(userInfo))).name
  router.push({
    name: 'user',
    params: { username: localStorage.getItem('username') }
  })
}
// 注销登录
const logoutClick = () => {
  localStorage.removeItem('token')
  verifyLogin.value = false
}
// 进入登录界面
const loginClick = () => {
  router.push('/login')
}
// 进入注册界面
const signupClick = () => {
  router.push('/signup')
}
// 进入home主页
const toHome = () => {
  router.push('/home')
}
</script>

<template>
  <div class="navbar">
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
          <a-avatar
            class="avatar"
            :size="36"
            imageUrl="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          >
          </a-avatar>
          <template #content>
            <p @click="userClick" class="central">个人中心</p>
            <p @click="logoutClick" class="logout">退出登录</p>
          </template>
        </a-popover>
        <a-popover v-else>
          <a-avatar class="avatar" :size="36">未登录</a-avatar>
          <template #content>
            <p @click="loginClick" class="login">立即登录</p>
            <p @click="signupClick" class="signup">立即注册</p>
          </template>
        </a-popover>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less">
.central,
.logout,
.login,
.signup {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.navbar {
  background-color: var(--color-menu-light-bg);
  box-shadow: 0 0 10px -5px #86909c;
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // z-index: 9;

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
