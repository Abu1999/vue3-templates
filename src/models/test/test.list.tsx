import { defineComponent, onBeforeMount, reactive } from 'vue';
import RequestHttp from '@/utils/axios';


export default defineComponent({
  props: {
    id: {
      type: [String, Number],
      required: false,
    },
  },
  setup(props, { slots }) {
    // * 数据状态
    const state = reactive({
      data: [],
      loading: false
    } as any);


    const get = () => {
      const url = '/test'
      RequestHttp.get(url).then(res => {
        console.log('res', res);
        state.data = res
      }).catch(error => {
        console.log('error', error);
      })

    }

    const post = (body: any) => {
      const url = '/test'
      RequestHttp.post(url, body).then(res => {
        console.log('res', res);
        get()
      }).catch(error => {
        console.log('error', error);
      })

    }

    const put = (id: number, body: any) => {
      const url = `/test/${id}`
      RequestHttp.put(url, body).then(res => {
        console.log('res', res);
        get()
      }).catch(error => {
        console.log('error', error);
      })
    }

    const del = (id: number) => {
      const url = `/test/${id}`
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