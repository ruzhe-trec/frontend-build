import { ref, watch } from 'vue';

/**
 * 它监视 visible 属性的值并将 isVisible ref 设置为 visible 属性的值
 * @returns 返回布尔值的计算属性。
 */
export const visibleRender = visible => {
  const isVisible = ref(false);

  watch(visible, () => {
    if (visible.value) {
      isVisible.value = visible.value;
    } else {
      setTimeout(() => {
        isVisible.value = visible.value;
      }, 500);
    }
  });

  return isVisible;
};
