<template>
  <div class="w-full h-full" style="background-color: #242f42; color:#fff ">
    <div class="flex justify-center items-center " style="height: 60px;">
      <div style="width: 64px;" class="flex justify-center items-center">
        <el-image style="width: 40px; height: 40px" :src="url" fit="cover" />
      </div>
      <div class="font-bold" v-if="!props.isCollapse" @click="myClick">element-puls</div>
    </div>

    <el-menu style="border: 0;" background-color="#242f42" text-color="#fff" default-active="2"
      class="el-menu-vertical-demo left-menu-bg-active-color" :collapse="props.isCollapse" :collapse-transition="false"
      :active="$route.path">

      <el-menu-item index="1" @click="$router.push('/')">
        <el-icon>
          <document />
        </el-icon>
        <template #title>Navigator Two</template>
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

const myClick = () => {
  console.log(111111);

}

</script>

<style scoped></style>