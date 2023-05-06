<script setup>
import { ref } from 'vue'
const nicknameVal = ref('')
const isVerify = ref(false)
const tipRef = ref('')
import _debounce from '@/utils/debounce'

function verfiyNicknameInput(val) {
  if (!/^[^\s]{1,10}$/.test(val)) {
    tipRef.value.textContent = '昵称长度1~10，不能包含空格'
    tipRef.value.style.color = ' rgb(var(--danger-6))'
    isVerify.value = false
    return
  }
  tipRef.value.style.color = 'rgb(var(--success-6))'
  tipRef.value.textContent = '用户昵称符合要求'
  nicknameVal.value = val
  isVerify.value = true
}
// 对昵称验证进行防抖处理
const verfiyNicknameInput_debounce = _debounce(verfiyNicknameInput, 500)

defineExpose({
  verfiyNicknameInput,
  nicknameVal,
  isVerify
})
</script>

<template>
  <div class="Nickname">
    <a-input
      @input="verfiyNicknameInput_debounce"
      :style="{ width: '320px' }"
      placeholder="请输入昵称"
      allow-clear
    >
      <template #prefix>
        <icon-user />
      </template>
    </a-input>
    <div class="tip" ref="tipRef">昵称长度1~10，不能包含空格</div>
  </div>
</template>

<style scoped>
.tip {
  font-size: 10px;
  text-align: left;
  margin-top: 3px;
}
</style>
