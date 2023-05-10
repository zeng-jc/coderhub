<script setup>
const community = [
  {
    name: 'GitHub',
    url: 'https://github.com/'
  },
  {
    name: 'StackOverflow',
    url: 'https://stackoverflow.com/'
  },
  {
    name: '掘金',
    url: 'https://juejin.cn/'
  },
  {
    name: 'CSDN',
    url: 'https://blog.csdn.net/'
  }
]

const toCommunity = (index) => {
  window.open(community[index].url)
}
</script>

<template>
  <div class="sidebar">
    <a-list>
      <template #header> 热门社区 </template>
      <a-list-item
        class="community"
        v-for="(item, index) in community"
        :key="index"
        @click="toCommunity(index)"
      >
        {{ item.name }}
      </a-list-item>
    </a-list>
  </div>
</template>

<style lang="less" scoped>
.sidebar {
  background-color: var(--theme-bg1);
  height: fit-content;
}
.community {
  cursor: pointer;
  &:hover {
    color: rgb(var(--primary-6));
  }
}
</style>
