import { onUnmounted, ref } from 'vue';

/**
 * “它返回一个反应值，即窗口高度减去标题高度。”
 *
 * 该函数称为 useResponsiveHeight，它有一个参数，高度。 height 参数是标题的高度
 * @param height - 页眉的高度。
 * @returns 值为 0 的 ref 对象。
 */
export function useResponsiveHeight(height) {
  const result = ref(0);

  function update() {
    result.value = window.innerHeight - height;
  }

  update();
  window.addEventListener('resize', update);

  onUnmounted(() => window.removeEventListener('resize', update));

  return result;
}
