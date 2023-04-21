<script setup></script>

<template>
  <div class="userinfo">
    <a-card hoverable :style="{ width: '200px' }">
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

<style scoped></style>
