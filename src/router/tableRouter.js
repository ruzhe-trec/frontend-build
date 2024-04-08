const TableRouter = [
  {
    path: '',
    name: 'DataTable',
    meta: {
      title: '查询表格'
    },
    component: () => import('@/views/pages/table/DataTable.vue')
  },
  {
    path: 'virtualTable',
    name: 'VirtualTable',
    meta: {
      title: '虚拟表格'
    },
    component: () => import('@/views/pages/table/VirtualTable.vue')
  },
  {
    path: 'detailTable',
    name: 'DetailTable',
    meta: {
      title: '表格详情'
    },
    component: () => import('@/views/pages/table/DetailTable.vue')
  }
];
export default TableRouter;
