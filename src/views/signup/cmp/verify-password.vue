<script setup>
import { ref } from 'vue'
const pwdVal = ref('')
const isVerify = ref(false)
const tipRef = ref('')

function verfiyNicknameInput(val) {
  if (!/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(val)) {
    tipRef.value.textContent = '包含1个大写和小写，1个数字，1个特殊字符'
    tipRef.value.style.color = ' rgb(var(--danger-6))'
    isVerify.value = false
    return
  }
  tipRef.value.textContent = '密码格式正确'
  tipRef.value.style.color = ' rgb(var(--success-6))'
  console.log(pwdVal.value)
  pwdVal.value = val
  isVerify.value = true
}

defineExpose({
  verfiyNicknameInput,
  pwdVal,
  isVerify
})
</script>

<template>
  <div class="Nickname">
    <a-input-password
      :style="{ width: '320px' }"
      placeholder="请输入密码"
      allow-clear
      @input="verfiyNicknameInput"
    />
    <div class="tip" ref="tipRef">包含1个大写和小写，1个数字，1个特殊字符</div>
  </div>
</template>

<style scoped>
.tip {
  font-size: 10px;
  text-align: left;
  margin-top: 3px;
}
</style>
