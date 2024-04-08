<template>
  <a-modal :wrap-style="{ overflow: 'hidden' }" :width="'700px'" @cancel="onCancel">
    <template #title>
      {{ title }}
    </template>
    <a-form ref="formRef" :model="form" layout="vertical">
      <a-row :gutter="24" justify="space-between">
        <a-col :span="12">
          <a-form-item :rules="[{ required: true, message: '请输入编号规则!' }]" label="编号规则" name="code">
            <a-input v-model:value="form.code" :disabled="isEdit" placeholder="编号规则" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="创建人" name="createUser">
            <a-input v-model:value="form.createUser" disabled placeholder="创建人" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" justify="space-between">
        <a-col :span="12">
          <a-form-item :rules="[{ required: true, message: '请输入服务调用次数!' }]" label="服务调用次数" name="num">
            <a-input v-model:value="form.num" placeholder="服务调用次数" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="状态" name="state">
            <a-select
              v-model:value="form.state"
              :options="stateOptions"
              show-search
              placeholder="请选择"
              style="width: 100%"></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="更新时间" name="updateDate">
        <a-date-picker
          v-model:value="form.updateDate"
          :value-format="'YYYY-MM-DD'"
          placeholder="请输入更新日期"
          style="width: 100%" />
      </a-form-item>
      <a-form-item label="描述" name="remark">
        <a-textarea v-model:value="form.remark" :rows="4" placeholder="描述" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="onCancel">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSubmit"> 确定 </a-button>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, computed } from 'vue';
import { isEmpty, cloneDeep } from '@/utils/frontend-utils';
import { addTable, editTable } from '@/api/table';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/store';

const userStore = useUserStore();
const emit = defineEmits(['result', 'cancel']);
const loading = ref(false);
const props = defineProps({
  // 编辑入参
  params: {
    type: Object,
    default: () => ({}),
    required: true
  }
});
const formRef = ref(null);
// 表单form
const form = ref({});
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
// 创建人字段赋默认值
form.value.createUser = computed(() => userStore.userName);

// 是否编辑状态
const isEdit = computed(() => {
  return !isEmpty(props.params);
});

// 编辑状态 form表单赋值
if (isEdit.value) {
  form.value = cloneDeep(props.params);
}

// 弹窗title
const title = computed(() => {
  return isEdit.value ? '编辑' : '新增';
});

// 取消事件
const onCancel = () => {
  emit('cancel');
};

// 提交事件
const onSubmit = () => {
  // 表单规则校验
  formRef.value.validateFields().then(values => {
    loading.value = true;
    if (isEdit.value) {
      editTable(values)
        .then(response => {
          if (response.code === 0) {
            message.success(`数据修改成功！`);
            emit('result');
          } else {
            message.warning(`数据修改失败！`);
          }
          loading.value = false;
        })
        .catch(err => {
          console.log(err);
          message.error(`数据修改失败！`);
          loading.value = false;
        });
      return;
    }
    addTable(values)
      .then(response => {
        if (response.code === 0) {
          message.success(`数据添加成功！`);
          emit('result');
        } else {
          message.warning(`数据添加失败！`);
        }
        loading.value = false;
      })
      .catch(err => {
        console.log(err);
        message.error(`数据添加失败！`);
        loading.value = false;
      });
  });
};
</script>
