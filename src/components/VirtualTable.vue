<template>
  <!-- 根元素，设置了一个类名为 virtual-table 的 div -->
  <div class="virtual-table">
    <!-- 一个复选框，用于全选/全不选行，:indeterminate 绑定了一个中间状态，:checked 绑定了一个全选状态，@change 绑定了一个改变全选状态的方法 -->
    <a-checkbox
      class="table-checkbox"
      :indeterminate="indeterminate"
      :checked="checkAll"
      @change="handleCheckAllChange">
    </a-checkbox>
    <!-- 一个表格组件，表格的各种参数和方法通过props和events传递给子组件 -->
    <a-table
      ref="refTable"
      :data-source="virtualDataSource"
      :columns="props.columns"
      :loading="props.loading"
      :scroll="props.scroll"
      :row-selection="rowSelection"
      :pagination="props.pagination"
      @change="tableChangeEmit"
      v-bind="attrs">
      <!-- 列头单元格插槽 -->
      <template #headerCell="headerCell">
        <!-- 使用插槽分发内容 -->
        <slot name="headerCell" v-bind="headerCell">
          <!-- 列头的标题 -->
          <span>{{ headerCell.title }} </span>
        </slot>
      </template>
      <!-- 列单元格插槽 -->
      <template #bodyCell="bodyCell">
        <!-- 使用插槽分发内容 -->
        <slot name="bodyCell" v-bind="bodyCell"></slot>
      </template>
    </a-table>
  </div>
</template>
<script setup>
// 导入所需的模块和方法
import { ref, watch, useAttrs, computed, onMounted, onBeforeUnmount } from 'vue';
import { differenceBy, uniqBy } from '@/utils/frontend-utils';

// 定义组件发出的事件
const emits = defineEmits(['change']);

// 定义组件的属性
const props = defineProps({
  columns: Array,
  dataSource: Array,
  loading: Boolean,
  scroll: Object,
  pagination: Object,
  class: String,
  rowSelection: Object,
  virtualSize: Number,
  rowHeight: Number
});

// 定义一些引用和计算属性
const first = ref(true);

// 使用 attrs 函数获取父组件传递给子组件的 attribute
const attrs = useAttrs();

// 全选复选框的状态
const checkAll = ref(false);
const indeterminate = ref(false);
// 选中行的 key 的集合
const selectedRowKeys = ref([]);

// 表格和容器的引用
const refTable = ref(null);
const tableContainer = ref(null);
const tableDom = ref(null);
// 虚拟滚动的开始和结束索引
const start = ref(0);
const end = ref(props.virtualSize);

// 计算属性，用于生成虚拟滚动的数据源
const virtualDataSource = computed(() => {
  return props.dataSource.slice(start.value, end.value);
});

// 计算属性，用于生成数据源的key集合
const dataSourceKeys = computed(() => {
  return props.dataSource.map(item => item.key);
});

// 处理行选择状态改变的方法
const handleRowSelectionChange = keys => {
  // 选中行的key集合进行更新
  selectedRowKeys.value = uniqBy(selectedRowKeys.value.concat(keys));
  selectedRowKeys.value = differenceBy(
    selectedRowKeys.value,
    differenceBy(
      virtualDataSource.value.map(item => item.key),
      keys
    )
  );

  // 更新全选和半选状态
  checkAll.value = dataSourceKeys.value.length === selectedRowKeys.value.length;
  indeterminate.value = !checkAll.value && selectedRowKeys.value.length > 0;

  // 调用行选择状态改变的回调
  rowSelectionOnChange(selectedRowKeys.value);
};

// 处理全选状态改变的方法
const handleCheckAllChange = e => {
  // 更新选中行的key集合
  selectedRowKeys.value = e.target.checked ? props.dataSource.map(item => item.key) : [];
  // 更新全选和半选状态
  checkAll.value = e.target.checked;
  indeterminate.value = false;

  // 调用行选择状态改变的回调
  rowSelectionOnChange(selectedRowKeys.value);
};

// 提取行选择的配置项
// eslint-disable-next-line vue/no-setup-props-destructure
const { onChange: rowSelectionOnChange, ...rowSelectionProps } = props.rowSelection;

// 创建行选择的配置对象
const rowSelection = Object.assign(rowSelectionProps, {
  hideSelectAll: true, // 隐藏全选按钮
  selectedRowKeys: selectedRowKeys, // 已选项的 key 数组
  onChange: handleRowSelectionChange // 选中项改变时的回调
});

// 表格改变事件的处理函数
const tableChangeEmit = (pagination, filters, sorter, { currentDataSource }) => {
  let newOrder;
  if (sorter.order) {
    newOrder = sorter.order === 'descend' ? 'desc' : 'asc';
  }
  sorter.order = newOrder;
  emits('change', pagination, filters, sorter, { currentDataSource }); // 触发 change 事件
};

// 定义滚动监听函数，利用节流函数优化性能
const onScrollListener = () => {
  const scrollTop = tableContainer.value.scrollTop;
  // 计算开始和结束索引
  start.value = parseInt(scrollTop / props.rowHeight);
  end.value = start.value + props.virtualSize;
  // 更新表格的位置
  tableDom.value.style.transform = `translateY(${start.value * props.rowHeight}px)`;
};

// 监听数据源的变化，更新虚拟滚动的相关状态
watch(
  () => props.dataSource,
  () => {
    // 更新滚动条的高度
    if (tableContainer.value.querySelector('.virtual-table-scroll')) {
      tableContainer.value.querySelector('.virtual-table-scroll').style.height = `${
        props.dataSource.length * props.rowHeight
      }px`;
    } else {
      const scrollDom = document.createElement('div');
      scrollDom.className = 'virtual-table-scroll';
      scrollDom.style.height = `${props.dataSource.length * props.rowHeight}px`;
      tableContainer.value.appendChild(scrollDom);
    }
    // 重置全选和半选状态
    checkAll.value = false;
    indeterminate.value = false;
    // 更新选中行的key集合
    if (first.value) {
      selectedRowKeys.value = props.rowSelection?.selectedRowKeys || [];
      first.value = false;
    } else {
      selectedRowKeys.value = [];
    }
  }
);

// 监听虚拟滚动大小的变化，重新计算滚动
watch(
  () => props.virtualSize,
  () => {
    onScrollListener();
  }
);

// 监听行选择的key数组的变化，同步到选中行的key集合
watch(
  () => props?.rowSelection?.selectedRowKeys,
  () => {
    if (props?.rowSelection?.selectedRowKeys) {
      selectedRowKeys.value = props.rowSelection.selectedRowKeys;
    }
  }
);

// 监听选中行的key集合的变化，同步到行选择的key数组
watch(
  () => selectedRowKeys.value,
  () => {
    if (props?.rowSelection?.selectedRowKeys) {
      // eslint-disable-next-line vue/no-mutating-props
      props.rowSelection.selectedRowKeys = selectedRowKeys.value;
    }
  }
);

// 监听分页大小的变化，重置全选、半选状态和选中行的key集合
watch(
  () => props?.pagination?.pageSize,
  () => {
    checkAll.value = false;
    indeterminate.value = false;
    selectedRowKeys.value = [];
  }
);

// 组件挂载后，获取表格和容器的引用，添加滚动事件监听
onMounted(() => {
  tableContainer.value = refTable.value.$el.querySelector('.ant-table-body');
  tableDom.value = tableContainer.value.querySelector('table');
  tableContainer.value.addEventListener('scroll', onScrollListener);
});

// 组件卸载前，移除滚动事件监听
onBeforeUnmount(() => {
  tableContainer.value.removeEventListener('scroll', onScrollListener);
});
</script>

<style lang="less" scoped>
.virtual-table {
  position: relative; // 设置相对定位
}
.table-checkbox {
  position: absolute; // 设置绝对定位
  z-index: 4; // 设置z-index
  top: 9px; // 设置顶部距离
  left: 28px; // 设置左侧距离
}

:deep(.ant-table-body) {
  position: relative; // 设置相对定位
  overflow: auto; // 设置滚动
  table {
    position: relative; // 设置相对定位
  }
  .virtual-table-scroll {
    position: absolute; // 设置绝对定位
    top: 0; // 设置顶部距离
    width: 100%; // 设置宽度
    z-index: -1; // 设置z-index
  }
}
</style>
