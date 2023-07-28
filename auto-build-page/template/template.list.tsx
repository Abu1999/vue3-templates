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
    });


    const get = () => {
      let url = ''
      RequestHttp.get(url).then(res => {
        console.log('res', res);
      }).catch(error => {
        console.log('error', error);
      })

    }

    const post = () => {
      let url = ''
      let body = {}
      RequestHttp.post(url, body).then(res => {
        get()
        console.log('res', res);
      }).catch(error => {
        console.log('error', error);
      })

    }

    const put = () => {
      let url = ''
      let body = {}
      RequestHttp.put(url, body).then(res => {
        get()
        console.log('res', res);
      }).catch(error => {
        console.log('error', error);
      })
    }

    const del = () => {
      let url = ''
      let body = {}
      RequestHttp.delete(url, body).then(res => {
        get()
        console.log('res', res);
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