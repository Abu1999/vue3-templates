<!-- eslint-disable -->
<template>
  <el-dialog v-model="props.config.visible" :title="props.config.title ?? ''" width="30%" align-center>
    <slot name="body"></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="props.config.visible = false">取消</el-button>
        <el-button type="primary" @click="submit()">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'MyDialog'
})

interface Props {
  config: {
    visible: boolean,
    title?: string,
  }
}

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const props = withDefaults(defineProps<Props>(), {
  config: () => ({ visible: false })
})

const submit = () => {
  emit('submit')
}

</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
