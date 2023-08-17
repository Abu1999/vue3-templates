<template>
  <div>
    <el-divider>标签页</el-divider>
    <div class="w-full flex justify-center">
      <el-switch id="dark" @change="(e: any) => { settingStore().changeTabs(e) }" v-model="settingStore().setting.tabs"
        size="large" :active-value="true" :inactive-value="false" inline-prompt>
      </el-switch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { settingStore } from '@/stores';

</script>

<style scoped></style>