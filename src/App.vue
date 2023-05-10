<script setup>
import navbarView from '@/components/navbar/navbar-view.vue'
</script>

<template>
  <navbar-view />
  <router-view v-slot="{ Component }">
    <keep-alive include="home-view">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
