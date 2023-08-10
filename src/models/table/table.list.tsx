import { defineComponent, onBeforeMount, reactive, watch, unref } from 'vue';
import { ElCheckbox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import RequestHttp from '@/utils/axios';
import { tableColumns } from './table.config'


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
      data: [] as any,
      columns: [] as any,
      pagination: {
        pageSize: 10, // 单页数据量
        currentPage: 1,  //当前页数
        total: 1000, //总数据量
      },
      loading: false
    });

    state.columns = tableColumns

    const get = (pagination?: any) => {
      state.loading = true
      if (!pagination) {
        pagination = sessionStorage.getItem('TableList') ? JSON.parse(sessionStorage.getItem('TableList') as any) : {
          pageSize: 10, // 单页数据量
          currentPage: 1,  //当前页数
          total: 1000, //总数据量
        }
      }
      const url = '/tableList'
      RequestHttp.get(url, pagination).then(res => {
        console.log('res', res);
        state.data = res.data
        state.loading = false
      }).catch(error => {
        console.log('error', error);
        state.loading = false
        ElMessage.error('请求错误')
      })

    }

    const post = () => {
      const url = ''
      const body = {}
      RequestHttp.post(url, body).then(res => {
        get()
        console.log('res', res);
      }).catch(error => {
        console.log('error', error);
      })

    }

    const put = () => {
      const url = ''
      const body = {}
      RequestHttp.put(url, body).then(res => {
        get()
        console.log('res', res);
      }).catch(error => {
        console.log('error', error);
      })
    }

    const del = () => {
      const url = ''
      const body = {}
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