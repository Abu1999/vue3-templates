import { defineComponent, onBeforeMount, reactive, watch } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import "%Class%" from './"%class%"'
import { useRouter } from 'vue-router'


export default defineComponent({
  props: {
    id: {
      type: [String, Number],
      required: false,
    },
  },
  setup(props, { slots }) {
    const model = new "%Class%"();
    const router = useRouter()
    let id: any = 1

    // * 数据状态
    const state = reactive({
      data: [],
      treeData: {
        data: null,
        loading: true,
        key: 0
      },// * 树结构数据

      loading: false, // * table

      queryParams: {  // * 搜索框
        q: '',
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0
        },
        filter: {

        },
        pageChange: (info: { current: number, pageSize: number }) => {
          state.queryParams.pagination.current = info.current;
          state.queryParams.pagination.pageSize = info.pageSize;
        } // 页面更改
      }
    });

    // * 平铺数据转换为结构树
    const listToTree = (data: any) => {
      const obj: any = {};
      data.forEach((item: any) => {
        obj[item.id] = item;
      });
      const parentList: any = [];
      data.forEach((item: any) => {
        const parent = obj[item.dad];
        if (parent) {
          // * 当前项有父节点
          parent.children = parent.children || [];
          parent.children.push(item);
        } else {
          // * 当前项没有父节点 -> 顶层
          parentList.push(item);
        }
      });
      return parentList;
    }

    const get = () => {
      state.loading = true;
      model.read({ url: ``, body: state.queryParams }).then((res: any) => {
        state.data = res.data.data;
        state.queryParams.pagination.total = res.data.total;

        state.loading = false;
      });
    }

    const post = () => {
      let body: any;
      body = {}
      model.create({ url: ``, body }).then((res: any) => {
        get()
        MessagePlugin.success('添加成功')
      });
    }

    const put = () => {
      let body: any;
      body = {}
      model.update({ url: ``, body }).then((res: any) => {
        get()
        MessagePlugin.success('编辑成功')
      });
    }

    const del = () => {
      model.delete({ url: `` }).then((res: any) => {
        get()
        MessagePlugin.success('删除成功')
      });
    }



    // 数据命令
    const commands = {
      get, post, put, del
    };

    onBeforeMount(() => {
      get()
    });


    watch(() => state.queryParams, () => {
      get()
    }, { deep: true });  //搜索变化


    return () => {
      if (slots.default)
        return slots.default({ state, commands });
    }
  }
})