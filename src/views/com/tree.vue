<template>
  <div class="w-full h-full p-5">
    <el-card class="w-[220px] h-[80vh]">
      <MyTree :data="[]"></MyTree>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { MyTree } from "@/components/page"

</script>

<style scoped></style>