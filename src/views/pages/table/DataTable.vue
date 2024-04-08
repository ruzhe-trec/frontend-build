<template>
  <div class="page-table">
    <SearchCriteria @is-collapsed="emitIsCollapsed" @result="emitSearchResult" />
    <div class="page-table-operator">
      <a-button type="primary" class="mr-8" @click="onAddClick">
        <template #icon>
          <PlusOutlined />
        </template>
        新建
      </a-button>
      <a-button @click="onDeleteClick">
        <template #icon>
          <DeleteOutlined />
        </template>
        删除
      </a-button>
    </div>
    <a-table
      :columns="tableColumns"
      :data-source="tableList"
      :row-selection="rowSelection"
      :pagination="pagination"
      :scroll="tableScroll"
      size="small"
      bordered
      @change="handleTableChange">
      <template #bodyCell="{ record, column }">
        <template v-if="column.dataIndex === 'code'">
          <a @click="onPushPageClick(record)">{{ record.code }}</a>
        </template>
        <template v-if="column.dataIndex === 'state'">
          <a-badge :status="record.state === 'close' ? 'error' : 'success'" />
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-button type="link" @click="onEditClick(record)">修改</a-button>
        </template>
      </template>
    </a-table>
    <ModalEdit
      v-model:visible="isShowAdd"
      v-if="isShowAddRender"
      :params="editParams"
      @result="emitAddEditResult"
      @cancel="emitCancel" />
  </div>
</template>

<script setup>
import { useConfigStore } from '@/store';
import { useRouter } from 'vue-router';
import { ref, reactive, createVNode, onMounted } from 'vue';
import { isEmpty } from '@/utils/frontend-utils';
import { visibleRender } from '@/hooks/modalVisible.js';
import { getTableList, deleteTable } from '@/api/table';
import { message, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import ModalEdit from './components/ModalEdit.vue';
import SearchCriteria from './components/SearchCriteria.vue';

const configStore = useConfigStore();
const router = useRouter();

// 查询form表单
const form = reactive({
  code: '',
  state: '',
  num: '',
  updateDate: '',
  createUser: '',
  orderByColumn: 'num',
  order: 'desc'
});

const tableScroll = reactive({ x: 2000, y: 'calc(100vh - 408px)' });
// 复选框选择id
const selectedIds = ref([]);
// 表格数据
const tableList = ref([]);
// 表格列
const tableColumns = [
  {
    title: '编号规则',
    dataIndex: 'code',
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    title: '描述',
    dataIndex: 'remark',
    align: 'center',
    width: 150
  },
  {
    title: '服务调用次数',
    dataIndex: 'num',
    align: 'center',
    defaultSortOrder: 'descend',
    sorter: true,
    width: 60
  },
  {
    title: '状态',
    dataIndex: 'state',
    align: 'center',
    width: 60
  },
  {
    title: '更新时间',
    dataIndex: 'updateDate',
    align: 'center',
    sorter: true,
    width: 120
  },
  {
    title: '创建人',
    dataIndex: 'createUser',
    align: 'center',
    width: 60
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    fixed: 'right',
    width: 40
  }
];

// 分页
const pagination = reactive({
  current: 1, // 当前页
  pageSize: 10, // 每页数量
  total: 0 // 总条数
});
// 编辑页面参数
const editParams = ref({});
// 是否显示添加/编辑开关
const isShowAdd = ref(false);
const isShowAddRender = visibleRender(isShowAdd);
// 选择功能配置
const rowSelection = {
  columnWidth: 20, // 选择框宽度
  checkStrictly: false, // 复选框 父子数据选中状态是否关联
  onChange: rows => {
    // 选中项发生变化时的回调
    selectedIds.value = rows;
  }
};

// 获取表格数据
const getTableData = () => {
  // 表格查询参数
  const params = {
    ...form,
    size: pagination.pageSize,
    current: pagination.current
  };
  configStore.setIsLoading(true);
  getTableList(params)
    .then(response => {
      configStore.setIsLoading(false);
      if (response.code === 0) {
        selectedIds.value = [];
        tableList.value = response.data.records;
        pagination.total = response.data.total;
      } else {
        message.warning('获取数据失败!');
      }
    })
    .catch(() => {
      configStore.setIsLoading(false);
    });
};

// table change事件 分页、排序、筛选变化时触发
const handleTableChange = (page, _filters, sorter) => {
  form.orderByColumn = sorter?.field;
  form.order = sorter?.order?.replace('end', '') || '';

  // 设定分页数据
  pagination.current = page.current;
  pagination.pageSize = page.pageSize;
  // 拉取表格数据
  getTableData();
};

// 打开详情界面
const onPushPageClick = params => {
  router.push({
    name: 'DetailTable',
    query: { code: params.code }
  });
};

// 修改事件
const onEditClick = params => {
  editParams.value = params;
  isShowAdd.value = true;
};

// form查询窗口 收起/展开回调
const emitIsCollapsed = res => {
  const isCollapsedSearch = 464;
  const CollapsedSearch = 408;
  tableScroll.y = `calc(100vh - ${res ? isCollapsedSearch : CollapsedSearch}px)`;
};

// 添加/修改窗口 查询回调
const emitAddEditResult = () => {
  editParams.value = {};
  isShowAdd.value = false;
  getTableData();
};

// 添加/修改窗口 取消回调
const emitCancel = () => {
  isShowAdd.value = false;
};

// 添加
const onAddClick = () => {
  isShowAdd.value = true;
  editParams.value = {};
};

// 删除
const onDeleteClick = () => {
  if (isEmpty(selectedIds.value)) {
    message.warning('请选择需要删除的数据!');
    return;
  }

  Modal.confirm({
    title: '确定删除该数据？',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode('div', { style: 'color:red;' }, `确定要删除 ${selectedIds.value.length} 条数据吗?`),
    onOk() {
      return new Promise(resolve => {
        deleteTable({
          ids: selectedIds.value.toString()
        }).then(response => {
          if (response.code === 0) {
            selectedIds.value = [];
            message.success('数据删除成功!');
            getTableData();
            resolve();
          } else {
            message.warning('数据删除失败!');
          }
        });
      });
    }
  });
};

// 查询窗口回调
const emitSearchResult = res => {
  form.code = res.code;
  form.state = res.state;
  form.num = res.num;
  form.updateDate = res.updateDate;
  form.createUser = res.createUser;
  // 查询重置页码
  pagination.current = 1;
  getTableData();
};

onMounted(() => {
  getTableData();
});
</script>

<style lang="less" scoped>
.page-table {
  width: 100%;
  background: #ffffff;
  padding: 24px;
  &-operator {
    width: 100%;
    margin-bottom: 18px;
  }
  :deep(.ant-table-pagination.ant-pagination) {
    margin: 16px 0 0 0;
  }
}
</style>
