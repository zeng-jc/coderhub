<script setup>
import { ref } from 'vue'
const pwdVal = ref('')
const isVerify = ref(false)
const tipRef = ref('')
import _debounce from '@/utils/debounce'

function verifyPasswordInput() {
  if (
    !/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(pwdVal.value)
  ) {
    tipRef.value.textContent = '包含1个大写和小写，1个数字，1个特殊字符'
    tipRef.value.style.color = ' rgb(var(--danger-6))'
    isVerify.value = false
    return
  }
  tipRef.value.textContent = '密码格式正确'
  tipRef.value.style.color = ' rgb(var(--success-6))'
  isVerify.value = true
}
// 对密码验证进行防抖处理
const verifyPasswordInput_debounce = _debounce(verifyPasswordInput, 500)
defineExpose({
  verifyPasswordInput,
  pwdVal,
  isVerify
})
</script>

<template>
  <div class="password">
    <a-input-password
      @input="verifyPasswordInput_debounce"
      v-model="pwdVal"
      :style="{ width: '320px' }"
      placeholder="请输入密码"
      allow-clear
    />
    <div class="tip" ref="tipRef">包含1个大写和小写，1个数字，1个特殊字符</div>
  </div>
</template>

<style scoped>
.tip {
  font-size: 10px;
  text-align: center;
  margin-top: 3px;
}
</style>
