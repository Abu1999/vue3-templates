import { defineComponent, onBeforeMount, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import RequestHttp from '@/utils/axios';


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
    } as any);


    const get = () => {
      let url = '/test'
      RequestHttp.get(url).then(res => {
        console.log('res', res);
        state.data = res
      }).catch(error => {
        console.log('error', error);
      })

    }

    const post = (body: any) => {
      let url = '/test'
      RequestHttp.post(url, body).then(res => {
        console.log('res', res);
        get()
      }).catch(error => {
        console.log('error', error);
      })

    }

    const put = (id: number, body: any) => {
      let url = `/test/${id}`
      RequestHttp.put(url, body).then(res => {
        console.log('res', res);
        get()
      }).catch(error => {
        console.log('error', error);
      })
    }

    const del = (id: number) => {
      let url = `/test/${id}`
      RequestHttp.delete(url).then(res => {
        console.log('res', res);
        get()
      }).catch(error => {
        console.log('error', error);
      })
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