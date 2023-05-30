<script setup>
import { ref, defineEmits } from 'vue'
import { IconEdit } from '@arco-design/web-vue/es/icon'
import { Modal } from '@arco-design/web-vue'
const emits = defineEmits(['uploadAvatar'])
defineProps({
  avatar: {
    type: String,
    default: ''
  }
})

const file = ref({})

// 上传的文件状态发生改变时触发
const onChange = (_, currentFile) => {
  file.value = {
    ...currentFile
  }
}

// 头像上传前的校验
const beforeUpload = (file) => {
  return new Promise((resolve, reject) => {
    if (
      (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') &&
      file.size <= 1 * 1024 * 1024
    ) {
      return resolve(true)
    }
    Modal.warning({
      title: '警告',
      content: `“ ${file.name} ” 图片不符合要求，请重新选择`,
      onOk: () => reject('cancel')
    })
  })
}
// 自行上传
const customRequest = (option) => {
  const { fileItem } = option
  const formData = new FormData()
  formData.set('avatar', fileItem.file)
  emits('uploadAvatar', formData)
}
</script>

<template>
  <div class="avatar-upload">
    <a-upload
      :custom-request="customRequest"
      :fileList="file ? [file] : []"
      :show-file-list="false"
      @change="onChange"
      @before-upload="beforeUpload"
    >
      <template #upload-button>
        <div
          :class="`arco-upload-list-item${
            file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
          }`"
        >
          <div class="arco-upload-list-picture custom-upload-avatar">
            <img :src="file.url ? file.url : avatar" />
            <div class="arco-upload-list-picture-mask">
              <IconEdit />
            </div>
          </div>
        </div>
      </template>
    </a-upload>
    <div style="color: var(--color-text-3); font-size: 12px">
      支持头像格式 jpeg、jpg、png
      <br />
      大小不超过1mb
    </div>
  </div>
</template>

<style scoped></style>
