import { menuStore } from "@/stores/index";


export const changeMenu = () => {
  menuStore().changemenuData([{ title: 'axios请求', icon: 'Coin', path: '/axios', code: 'axios' },
  { title: '模版table页面', icon: 'Tickets', path: '/table', code: 'table' },])
}