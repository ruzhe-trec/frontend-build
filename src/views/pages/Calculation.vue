<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="常规计算">
          <p>0.1 + 0.2 = {{ usual.plus }}</p>
          <p>0.3 - 0.2 = {{ usual.minus }}</p>
          <p>0.6 × 3 = {{ usual.times }}</p>
          <p>0.6 ÷ 3 = {{ usual.div }}</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="高精计算">
          <p>0.1 + 0.2 = {{ precision.plus }}</p>
          <p>0.3 - 0.2 = {{ precision.minus }}</p>
          <p>0.6 × 3 = {{ precision.times }}</p>
          <p>0.6 ÷ 3 = {{ precision.div }}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { calc } from '@/utils/frontend-utils';

// 常规计算
const usual = {
  plus: 0.1 + 0.2,
  minus: 0.3 - 0.2,
  times: 0.6 * 3,
  div: 0.6 / 3
};

// 高精计算
const precision = {
  plus: calc(0.1).plus(0.2).toNumber(),
  minus: calc(0.3).minus(0.2).toNumber(),
  times: calc(0.6).times(3).toNumber(),
  div: calc(0.6).div(3).toNumber()
};
</script>
