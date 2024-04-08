<template>
  <a-form
    ref="refForm"
    layout="inline"
    :model="form"
    :labelCol="{
      style: {
        width: '100px'
      }
    }"
    class="page-search">
    <div class="column">
      <a-form-item label="规则编号：" name="code">
        <a-input v-model:value="form.code" />
      </a-form-item>
    </div>
    <div class="column">
      <a-form-item label="使用状态：" name="state">
        <a-select
          v-model:value="form.state"
          :options="stateOptions"
          placeholder="请选择"
          style="width: 100%"></a-select>
      </a-form-item>
    </div>
    <div v-if="isCollapsed" class="column">
      <a-form-item label="调用次数：" name="num">
        <a-input v-model:value="form.num" />
      </a-form-item>
    </div>
    <div v-if="isCollapsed" class="column">
      <a-form-item label="更新日期：" name="updateDate">
        <a-date-picker
          v-model:value="form.updateDate"
          :value-format="'YYYY-MM-DD'"
          placeholder="请输入更新日期"
          style="width: 100%" />
      </a-form-item>
    </div>
    <div v-if="isCollapsed" class="column">
      <a-form-item label="创建人：" name="createUser">
        <a-input v-model:value="form.createUser" />
      </a-form-item>
    </div>
    <div class="column atr">
      <a-button type="primary" class="mr-8" @click="onSearchClick"> 查询 </a-button>
      <a-button class="mr-8" @click="onRestart">重置</a-button>
      <a v-if="isCollapsed" @click="onCollapsedClick(false)">
        收起
        <UpOutlined :style="{ fontSize: '16px', color: '#08c' }" />
      </a>
      <a v-else @click="onCollapsedClick(true)">
        展开
        <DownOutlined :style="{ fontSize: '16px', color: '#08c' }" />
      </a>
    </div>
  </a-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { cloneDeep } from '@/utils/frontend-utils';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';

const refForm = ref(null);

// 查询form表单
const form = reactive({
  code: '',
  state: '',
  num: '',
  createUser: '',
  updateDate: ''
});

// 是否展开
const isCollapsed = ref(false);
// 状态options
const stateOptions = [
  {
    value: '',
    label: '全部'
  },
  {
    value: 'close',
    label: '关闭'
  },
  {
    value: 'doing',
    label: '进行中'
  }
];

const emit = defineEmits(['result', 'add', 'delete']);

// 表单重置
const onRestart = () => {
  refForm.value.resetFields();
};

// 查询视图收起/展开事件
const onCollapsedClick = val => {
  isCollapsed.value = val;
  emit('is-collapsed', isCollapsed.value);
};

// 查询
const onSearchClick = () => {
  const formCopy = cloneDeep(form);
  emit('result', formCopy);
};
</script>

<style lang="less" scoped>
.page-search {
  width: 100%;
  .column {
    width: 33%;
  }
  :deep(.ant-form-item) {
    margin-right: 0;
    margin-bottom: 24px;
  }
}
</style>
