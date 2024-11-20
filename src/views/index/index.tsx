import { defineComponent, onBeforeMount, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import RequestHttp from '@/utils/axios'
import { render } from 'nprogress'
import { SlotsType } from 'vue'


export default defineComponent({
  name: 'test',
  props: {
    id: {
      type: [String, Number],
      required: false
    }
  },
  setup(props, { slots }) {
    // * 数据状态
    const state: State = reactive({
      num: 10
    })

    const get = () => {
      console.log(1111);
    }
    // 数据命令
    const commands = {
      get
    }

    onBeforeMount(() => {
    })

    return () => (<>
      <div>{slots.default?.({ state })}</div>
    </>)
    // if (slots.default) return slots.default({ state, commands })
  }
})


