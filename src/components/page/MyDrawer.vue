<template>
  <div class="w-full h-full">
    <!-- 弹框 -->
    <el-drawer ref="drawerRef" v-model="dialog" title="I have a nested form inside!" direction="rtl">
      <MyForm></MyForm>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="confirmClick">确认</el-button>
          <el-button @click="cancelClick" plain>取消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// interface Props {
// }
// const props = withDefaults(defineProps<Props>(), {
// })

let dialog = ref(false)

// 关闭按钮
function cancelClick() {
  dialog.value = false
}

//确定按钮
function confirmClick() {
  console.log(11);
  dialog.value = false
}

// 改变弹窗
const changeDialog = (e: boolean) => {
  if (e) {
    dialog.value = e
  } else {
    dialog.value = !dialog.value
  }
}

// 通过ref传递方法,父组件触发
defineExpose({ dialog, changeDialog })

</script>

<style scoped></style>