<template>
  <a-spin class="loading" :indicator="indicator" v-show="isLoading" />
</template>

<script setup>
import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

defineProps({
  isLoading: Boolean
});

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '40px'
  },
  spin: true
});
</script>

<style scoped lang="less">
.loading {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  div {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 6px 15px;
  }
}
</style>
