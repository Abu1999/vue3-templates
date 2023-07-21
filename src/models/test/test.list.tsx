import { defineComponent, onBeforeMount, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import RequestHttp from '@/utils/axios';


interface State {
  data: any
}

export default defineComponent({
  props: {
    id: {
      type: [String, Number],
      required: false,
    },
  },
  setup(props, { slots }) {
    const router = useRouter()

    // * 数据状态
    const state = reactive({
      data: [],
      loading: false
    } as State);


    const get = () => {
      const url = '/test/1'
      RequestHttp.get(url).then(res => {
        console.log(res);
        state.data = res
      })

    }

    const post = () => {

    }

    const put = () => {

    }

    const del = () => {

    }



    // 数据命令
    const commands = {
      get, post, put, del
    };

    onBeforeMount(() => {
      get()
    });

    return () => {
      if (slots.default)
        return slots.default({ state, commands });
    }
  }
})