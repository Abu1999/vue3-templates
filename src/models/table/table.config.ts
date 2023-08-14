export const tableColumns = [
  {
    key: 'name',
    dataKey: `name`,
    title: `名字`,
    width: 1000,
    maxWidth: 100
  },
  {
    key: 'age',
    dataKey: `age`,
    title: `年龄`,
    width: 1000,
    maxWidth: 100
  },
  {
    key: 'city',
    dataKey: `city`,
    title: `城市`,
    width: 1000
  },
  {
    key: 'email',
    dataKey: `email`,
    title: `邮箱`,
    width: 1000
  },
  {
    key: 'birthday',
    dataKey: `birthday`,
    title: `生日`,
    width: 1000
  },
];

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


