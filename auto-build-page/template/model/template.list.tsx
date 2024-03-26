import { defineComponent, onBeforeMount, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import RequestHttp from '@/utils/axios';


export default defineComponent({
  props: {

  },
  setup(props, { slots }) {
    const router = useRouter()

    // * 数据状态
    const state = reactive({

    });

    const baseUrl = ''

    const get = async () => {
      let url = baseUrl + ''
      await RequestHttp.get(url).then((res: any) => {
        if (res && res?.data) {

        }
      }).catch(error => {
        console.log('error', error);
      })
    }

    const post = async () => {
      let url = baseUrl + ''
      let body = {}
      await RequestHttp.post(url, body).then(res => {
        if (res && res?.data) {
          ElMessage.success('添加成功')
          get()
        } else {
          ElMessage.error('添加失败')
        }
      }).catch(error => {
        console.log('error', error);
      })

    }

    const put = async (row: any) => {
      let url = baseUrl + ``
      let body = {}
      await RequestHttp.put(url, body).then(res => {
        if (res) {
          ElMessage.success('修改成功')
          get()
        } else {
          ElMessage.error('修改失败')
        }
      }).catch(error => {
        console.log('error', error);
      })
    }

    const del = async (row: any) => {
      let url = baseUrl + `/user/${row.id}`
      await RequestHttp.delete(url).then(res => {
        if (res) {
          ElMessage.success('删除成功')
          get()
        } else {
          ElMessage.error('删除失败')
        }
      }).catch(error => {
        console.log('error', error);
      })
    }

    // 数据命令
    const commands = {
      get, post, put, del
    };

    onBeforeMount(() => {
      // get()
    });

    return () => {
      if (slots.default)
        return slots.default({ state, commands });
    }
  }
})