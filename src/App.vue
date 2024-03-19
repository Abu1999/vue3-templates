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
</template>

<script setup lang="ts">
import LayoutLevel1 from '@/Layout/level1/index.vue'
import LayoutLevel2 from '@/Layout/level2/index.vue'
import SettingConfig from '@/components/setting/index.vue'
import { settingStore, appInfoStore } from '@/stores/index'
import { appConfig } from './appconfig'

settingStore().changeThemeColor()

appInfoStore().changeMobile()
</script>
