<script setup>
import navbarView from '@/components/navbar/navbar-view.vue'
</script>

<template>
  <div class="app">
    <navbar-view />
    <router-view v-slot="{ Component }">
      <keep-alive exclude="detail-view,signup-view">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped></style>
