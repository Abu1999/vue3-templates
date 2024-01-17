<!--
 * @Author: bbw 1526699702@qq.com
 * @Date: 2023-09-12 14:33:45
 * @LastEditors: bbw 1526699702@qq.com
 * @LastEditTime: 2023-11-10 10:47:39
 * @FilePath: \smart-web\src\components\page\MyVideo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="w-full h-full">
    <videoPlay v-bind="options" poster="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg" />
  </div>
</template>

<script setup lang="ts">
// https://github.com/xdlumia/vue3-video-play github网址
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";
import { reactive } from "vue";

const options = reactive({
  width: "800px", //播放器宽度
  height: "450px", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
});
</script>

<style scoped></style>