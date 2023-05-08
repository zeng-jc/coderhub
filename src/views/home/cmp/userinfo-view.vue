<script setup></script>

<template>
  <div class="userinfo">
    <a-card hoverable class="card">
      <template #cover>
        <div
          :style="{
            height: '300px',
            overflow: 'hidden'
          }"
        ></div>
      </template>
      <a-card-meta title="Card Title">
        <template #description>
          Card content <br />
          Card content
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<style scoped>
.card {
  width: 240px;
  background-color: var(--theme-bg1);
}
</style>
