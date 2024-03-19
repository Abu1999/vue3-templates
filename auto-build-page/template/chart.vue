<template>
  <div class="w-full h-full">
    <div :id='props.id' class="w-full h-full"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue'

type EChartsOption = echarts.EChartsOption;

let option: EChartsOption | any;
const props = withDefaults(defineProps<{
  id?: string
  data: any

}>(), {
  id: 'bar',
})

option = {

};

const init = () => {
  let myChart = echarts.init(document.getElementById(props.id));
  option && myChart.setOption(option);

  window.addEventListener('resize', () => {
    myChart.resize()
  })

  watch(() => props.data, () => {
    if (props.data.length) {
      let series = [] as any
      props.data?.forEach((el: any, index: number) => {

      })
      option.series = series
      option && myChart.setOption(option, true);
    }
  }, { deep: true })
}

onMounted(() => {
  init()
})



</script>

<style scoped></style>