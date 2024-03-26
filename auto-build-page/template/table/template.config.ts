export const tableColumns = [
  // { type: 'selection' },
  { prop: 'id', label: '序号' },
  { prop: 'name', label: '名称' },
  { prop: 'address', label: '地点' },
  { prop: 'id_code', label: '编码' },
  { prop: 'contact', label: '联系人' },
  { prop: 'phone', label: '电话' },
  { type: 'slot', prop: 'rooms_num', label: '房间数', align: 'center' },
  { type: 'slot', prop: 'devices_num', label: '设备数', align: 'center' },
  { prop: 'update_date', label: '最后时间' },
  { prop: 'updater', label: '最后更新人' },
  { type: 'slot', label: '操作', prop: 'action', fixed: 'right', align: 'center', width: '150' },
]


export const formConfig = [
  {
    type: 'input',
    prop: 'name',
    label: '',
    required: false,
    placeholder: '请输入名称'
    // rules: { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur', required: true }
  }
]


const checkPhone = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入手机号'))
  }
  if (/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/.test(value)) {
    callback()
  } else {
    return callback(new Error('手机号验证不通过'))
  }
}

export const drawerFormPost = [
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
    rules: { min: 1, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur', required: true }
  },
  {
    type: 'input',
    prop: 'address',
    label: '地址',
    rules: { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur', required: true }
  },
  {
    type: 'input',
    prop: 'id_code',
    label: '编码',
    rules: { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur', required: true }
  },
  {
    type: 'input',
    prop: 'contact',
    label: '联系人',
    rules: { min: 1, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur', required: true }
  },
  {
    type: 'input',
    prop: 'phone',
    label: '电话',
    options: [{ lable: '男', value: '男' }, { lable: '女', value: '女' }],
    rules: { validator: checkPhone, trigger: 'blur', required: true }
  }
]
export const drawerFormPut = [
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
    rules: { min: 1, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur', required: true }
  },
  {
    type: 'input',
    prop: 'address',
    label: '地址',
    rules: { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur', required: true }
  },
  {
    type: 'input',
    prop: 'id_code',
    label: '编码',
    rules: { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur', required: true }
  },
  {
    type: 'input',
    prop: 'contact',
    label: '联系人',
    rules: { min: 1, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur', required: true }
  },
  {
    type: 'input',
    prop: 'phone',
    label: '电话',
    options: [{ lable: '男', value: '男' }, { lable: '女', value: '女' }],
    rules: { validator: checkPhone, trigger: 'blur', required: true }
  }
]
