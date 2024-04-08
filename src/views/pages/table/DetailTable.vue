<template>
  <a-row class="page-detail">
    <a-col span="24" class="page-detail-main">
      <a-card title="规则详情">
        <a-descriptions>
          <a-descriptions-item label="编号规则">
            {{ form.code }}
          </a-descriptions-item>
          <a-descriptions-item label="描述">
            {{ form.remark }}
          </a-descriptions-item>
          <a-descriptions-item label="服务调用次数">
            {{ form.num }}
          </a-descriptions-item>
          <a-descriptions-item label="状态">{{ form.state }}</a-descriptions-item>
          <a-descriptions-item label="更新时间">
            {{ form.updateDate }}
          </a-descriptions-item>
          <a-descriptions-item label="创建人">
            {{ form.createUser }}
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
      <a-card title="流程进度" class="mt-24">
        <a-steps :current="current - 1" :direction="direction">
          <template #progressDot="{ prefixCls }">
            <a-popover>
              <span :class="`${prefixCls}-icon-dot`" />
            </a-popover>
          </template>
          <a-step v-for="(item, index) in form.steps" :key="index" :title="item.name">
            <template #description>
              <a-row>
                <a-col span="24">
                  {{ item.approval.userName }}
                </a-col>
                <a-col v-if="item.state" span="24">
                  {{ item.approval.date }}
                </a-col>
                <a-col v-if="!item.state" span="24">
                  <a-button type="link">催一下</a-button>
                </a-col>
              </a-row>
            </template>
          </a-step>
        </a-steps>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import { useConfigStore } from '@/store';
import { isEmpty } from '@/utils/frontend-utils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getTableDetail } from '@/api/table';

const configStore = useConfigStore();
const route = useRoute();

// 获取路由参数
const ruleCode = route.query.code;
const form = ref({});
const direction = 'horizontal';
const current = 3;

// 获取表格详情
const getTableInfo = () => {
  configStore.setIsLoading(true);
  getTableDetail({ code: ruleCode })
    .then(res => {
      configStore.setIsLoading(false);
      if (isEmpty(res.data)) {
        return;
      }
      form.value = res.data;
    })
    .catch(err => {
      configStore.setIsLoading(false);
      console.log(err);
    });
};

onMounted(() => {
  getTableInfo();
});
</script>

<style lang="less" scoped>
:deep(.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-tail::after) {
  background-color: #e8e8e8;
}
:deep(.ant-steps-label-vertical .ant-steps-item-content) {
  width: 120px;
}
</style>
