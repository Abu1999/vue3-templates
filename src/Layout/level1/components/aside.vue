<template>
  <div class="w-full h-full" style="background-color: #242f42; color:#fff ">
    <div class="flex justify-center items-center " style="height: 60px;">
      <div style="width: 64px;" class="flex justify-center items-center">
        <el-image style="width: 40px; height: 40px" :src="url" fit="cover" />
      </div>
      <div class="font-bold" v-if="!props.isCollapse">element-puls</div>
    </div>

    <el-menu style="border: 0;" background-color="#242f42" text-color="#fff" default-active="2"
      class="el-menu-vertical-demo left-menu-bg-active-color" :collapse="props.isCollapse">
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2" @click="$router.push('/test')">
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon>
          <document />
        </el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <setting />
        </el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isCollapse: boolean
}
const props = defineProps<Props>()

const url = 'https://tdesign.gtimg.com/demo/demo-image-1.png'


</script>

<style scoped></style>