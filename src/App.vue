<template>
  <!-- 添加route.name判断刷新路由会重置 -->
  <template v-if="$route.name && !($route.meta.layout && $route.meta.layout.visible)">
    <div>
      <LayoutLevel1 v-if="settingStore().setting.layout === 1">
        <router-view></router-view>
      </LayoutLevel1>
      <LayoutLevel2 v-else>
        <router-view></router-view>
      </LayoutLevel2>
    </div>
    <SettingConfig v-if="appConfig.setting && !appInfoStore().data.isMobile" />
  </template>
  <router-view v-else></router-view>
  <canvas id="canvas_view"></canvas>
</template>

<script setup lang="ts">
import LayoutLevel1 from '@/Layout/level1/index.vue'
import LayoutLevel2 from '@/Layout/level2/index.vue'
import SettingConfig from '@/components/setting/index.vue'
import { settingStore, appInfoStore } from '@/stores/index'
import { appConfig } from './appconfig'
import { init } from '@/components/live2d/index'
import { onMounted } from 'vue'


onMounted(() => {
  init()
})
// 颜色设置
settingStore().changeThemeColor()

// 判断客户端
appInfoStore().changeMobile()
</script>


<style>
#canvas_view {
  position: fixed;
  right: 0;
  bottom: 0;
  /* z-index: 1000000; */
  /* width: 200px;
  height: 200px; */
  /* background: #000; */
  /* 防止点击广告 */
}
</style>
