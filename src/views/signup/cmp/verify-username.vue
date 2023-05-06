<script setup>
import { ref } from 'vue'
import { fetchVerifyUsername } from '@/service'
const usernameVal = ref('')
const isVerify = ref(false)
const tipRef = ref('')
import _debounce from '@/utils/debounce'

async function verifyUsernameInput(val) {
  if (!/^[A-Za-z0-9_]{6,25}$/.test(val)) {
    tipRef.value.textContent = '长度为6-25，英文、数字、下划线的组合'
    tipRef.value.style.color = ' rgb(var(--danger-6))'
    isVerify.value = false
    return
  }
  const res = await fetchVerifyUsername(val)
  if (res.code !== 200) {
    tipRef.value.textContent = '用户名已经被注册'
    tipRef.value.style.color = ' rgb(var(--danger-6))'
    isVerify.value = false
    return
  }
  tipRef.value.textContent = '用户名符合要求'
  tipRef.value.style.color = 'rgb(var(--success-6))'
  isVerify.value = true
  usernameVal.value = val
}
// 对用户名验证进行防抖处理
const verifyUsernameInput_debounce = _debounce(verifyUsernameInput, 500)
defineExpose({
  verifyUsernameInput,
  usernameVal,
  isVerify
})
</script>

<template>
  <div class="username">
    <a-input
      @input="verifyUsernameInput_debounce"
      :style="{ width: '320px' }"
      placeholder="请输入用户名"
      allow-clear
    >
      <template #prefix>
        <icon-user />
      </template>
    </a-input>
    <div class="tip" ref="tipRef">长度为6-25，英文、数字、下划线的组合</div>
  </div>
</template>

<style scoped>
.tip {
  font-size: 10px;
  text-align: left;
  margin-top: 3px;
}
</style>
