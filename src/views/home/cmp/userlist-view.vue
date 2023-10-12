<script setup>
defineProps({
  users: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="userlist">
    <a-card hoverable :style="{ width: '200px' }">
      <template #cover>
        <img
          :style="{ width: '100%' }"
          alt="dessert"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
        />
      </template>
      <a-card-meta title="推介用户">
        <template #description>
          <a-list>
            <a-list-item class="user-list-item" v-for="item in users" :key="item.id">
              <router-link :to="`/user/${item.username}`" target="_blank">
                {{ item.nickname }}
              </router-link>
            </a-list-item>
          </a-list>
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<style lang="less" scoped>
.card {
  width: 240px;
  background-color: var(--theme-bg1);
}
.user-list-item {
  cursor: pointer;
  &:hover a {
    color: rgb(var(--primary-6));
  }
}
</style>
