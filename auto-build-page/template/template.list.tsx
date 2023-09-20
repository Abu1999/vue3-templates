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
      table: {
        data: [] as any,
        pagination: {
          pageSize: 10, // 单页数据量
          currentPage: 1,  //当前页数
          total: 50, //总数据量
        } as any,
        loading: false
      },
      form: {
        data: {
          name: '',
        },
      },
      drawer: {
        config: {
          dialog: false,
          title: ''
        },
        data: {} as any
      }
    });

    const get = async () => {
      state.table.loading = true
      let url = '/api/admin/user/page'
      await RequestHttp.get(url, { page: state.table.pagination.currentPage, limit: state.table.pagination.pageSize }).then((res: any) => {
        if (res) {
          state.table.pagination.total = res.data.total
          state.table.data = res.data.rows
        }
      }).catch(error => {
        console.log('error', error);
      })
      state.table.loading = false
    }

    const getItem = async (id: string | number) => {
      let url = `/api/admin/user/${id}`
      await RequestHttp.get(url).then((res: any) => {
        state.drawer.data = res.data

      }).catch(error => {
        console.log('error', error);
      })
    }

    const post = async () => {
      let url = '/api/admin/user'
      let body = state.drawer.data
      await RequestHttp.post(url, body).then(res => {
        if (res) {
          ElMessage.success('添加成功')
          get()
          state.drawer.config.dialog = false
        } else {
          ElMessage.success('添加失败')
        }
      }).catch(error => {
        console.log('error', error);
        ElMessage.success('添加失败')

      })

    }

    const put = async (row: any) => {
      let url = `/api/admin/user/${row.id}`
      const { name, username, sex, description, id } = state.drawer.data
      let body = { name, username, sex, description, id }
      await RequestHttp.put(url, body).then(res => {
        if (res) {
          ElMessage.success('修改成功')
          get()
          state.drawer.config.dialog = false
        } else {
          ElMessage.success('修改失败')
        }
      }).catch(error => {
        console.log('error', error);
        ElMessage.success('修改失败')
      })
    }

    const del = async (row: any) => {
      let url = `/api/admin/user/${row.id}`
      await RequestHttp.delete(url).then(res => {
        if (res) {
          ElMessage.success('删除成功')
          get()
        } else {
          ElMessage.success('删除失败')
        }
      }).catch(error => {
        ElMessage.success('删除失败')
        console.log('error', error);
      })
    }

    const search = async () => {
      state.table.loading = true
      state.table.pagination.currentPage = 1
      let url = '/api/admin/user/page'
      await RequestHttp.get(url, { page: state.table.pagination.currentPage, limit: state.table.pagination.pageSize, name: state.form.data.name }).then((res: any) => {
        state.table.pagination.total = res.data.total
        state.table.data = res.data.rows
        console.log('res', res);
      }).catch(error => {
        console.log('error', error);
      })
      state.table.loading = false
    }



    // 数据命令
    const commands = {
      get, post, put, del, search, getItem
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