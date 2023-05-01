<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isLogin = ref(false)
if (localStorage.getItem('token')) {
  isLogin.value = true
}
const centralClick = () => {}
const logoutClick = () => {
  localStorage.removeItem('token')
  // 简单实现页面刷新，后续需要优化
  router.go(0)
}
const loginClick = () => {
  router.push('/login')
}

const signupClick = () => {
  router.push('/signup')
}
</script>

<template>
  <div class="navbar">
    <a-row class="grid-demo" style="margin-bottom: 16px" align="center">
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
          <a-menu-item key="1">Home</a-menu-item>
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
        <a-popover trigger="click" v-if="isLogin">
          <a-avatar
            class="avatar"
            :size="36"
            imageUrl="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          >
          </a-avatar>
          <template #content>
            <p @click="centralClick" class="central">个人中心</p>
            <p @click="logoutClick" class="logout">退出登录</p>
          </template>
        </a-popover>
        <a-popover trigger="click" v-else>
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
  background-color: var(--theme-bgk1);
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
