<template>
  <div class="w-full flex flex-col items-center justify-center" style="height: 80vh">
    <el-result icon="warning" title="404提示" sub-title="你找的页面走丢了~">
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        <el-button type="primary" @click="$router.go(-1)">返回上一页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
