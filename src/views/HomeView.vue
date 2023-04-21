<script setup>
import '@arco-design/web-vue/es/message/style/css.js'
// import { Message } from '@arco-design/web-vue'
</script>

<template>
  <a-layout>
    <a-layout-header class="nav-bar">
      <a-row class="grid-demo" style="margin-bottom: 16px" align="center">
        <a-col flex="200px" class="left" :style="{ marginLeft: '40px' }">
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
        <a-col flex="auto">
          <a-menu mode="horizontal" :default-selected-keys="['1']">
            <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
            </a-menu-item>
            <a-menu-item key="1">Home</a-menu-item>
            <a-menu-item key="2">热门</a-menu-item>
            <a-menu-item key="3">最新</a-menu-item>
            <a-space direction="vertical" size="large" style="margin-left: 50px">
              <a-input :style="{ width: '320px' }" placeholder="请输入搜索内容" allow-clear>
                <template #prefix>
                  <icon-search />
                </template>
              </a-input>
            </a-space>
          </a-menu>
        </a-col>
        <a-col
          flex="200px"
          :style="{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            marginRight: '40px'
          }"
          class="right"
        >
          <a-avatar :style="{ backgroundColor: '#00d0b6', marginLeft: '10px' }">Design</a-avatar>
          <icon-notification />
        </a-col>
      </a-row>
    </a-layout-header>
  </a-layout>
</template>

<style></style>
