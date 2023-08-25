export const tableColumns = [
  { type: 'selection' },
  { prop: 'name', label: '名字' },
  { prop: 'age', label: '年龄' },
  { prop: 'city', label: '城市' },
  { prop: 'email', label: '地址' },
  { prop: 'birthday', label: '生日' },
  { type: 'slot', label: '操作', prop: 'action', fixed: 'right', align: 'center' },
]

export const form = [
  {
    type: 'input',
    name: '报告名称',
    fieldName: 'name',
    required: true,
  }
];

export const treeFrom = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 50,
  },
  {
    colKey: 'code',
    title: '细目编号',
    width: 80,
  },
]


