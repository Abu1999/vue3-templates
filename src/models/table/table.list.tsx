import { defineComponent, onBeforeMount, reactive, watch, unref } from 'vue';
import { ElCheckbox, ElMessage } from 'element-plus'
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
      data: [] as any,
      columns: [] as any,
      pagination: {
        pageSize: 10, // 单页数据量
        currentPage: 1,  //当前页数
        total: 1000, //总数据量
      }
    });

    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
      Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex + 1}`,
        dataKey: `${prefix}${columnIndex + 1}`,
        title: `Column ${columnIndex + 1}`,
        // width: columnIndex == 9 ? 150 : 200,
        // fixed: columnIndex == 9 ? 'right' : false,
        minWidth: 200,
        width: 200
      }))

    const generateData = (
      columns: ReturnType<typeof generateColumns>,
      length = 200,
      prefix = 'row-'
    ) =>
      Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
          (rowData, column, columnIndex) => {
            rowData[column.dataKey] = `Row ${rowIndex + 1} - Col ${columnIndex + 1}`
            return rowData
          },
          {
            id: `${prefix}${rowIndex}`,
            parentId: null,
            select: false
          }
        )
      })

    const get = (pagination?: any) => {
      if (!pagination) {
        pagination = sessionStorage.getItem('TableList') ? JSON.parse(sessionStorage.getItem('TableList') as any) : {
          pageSize: 10, // 单页数据量
          currentPage: 1,  //当前页数
          total: 1000, //总数据量
        }
      }
      // let url = ''
      // RequestHttp.get(url).then(res => {
      //   console.log('res', res);
      // }).catch(error => {
      //   console.log('error', error);
      // })
      state.columns = generateColumns(10)
      state.data = generateData(state.columns, pagination.total).slice(pagination.pageSize * (pagination.currentPage - 1), pagination.pageSize * pagination.currentPage)
      state.columns.unshift({
        dataKey: 'select',
        key: 'selection',
        width: 100,
        // minWidth: '50',
        cellRenderer: (data: any) => (
          <ElCheckbox v-model={data.rowData.select}>
          </ElCheckbox>
        ),
        headerCellRenderer: (data: any) => {
          const onChange = (e: any) => {
            console.log(data, e, state.data);
            state.data.map((list: any) => { list.select = e })
          }
          const allSelected: Boolean = state.data.every((row: any) => row.select)
          return (
            <ElCheckbox v-model={allSelected} onChange={onChange} indeterminate={true}>
            </ElCheckbox>
          )
        },
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