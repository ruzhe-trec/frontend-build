// 自定义指令权限控制
export const permission = {
  mounted(el, binding) {
    const { value } = binding;
    if (!value && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
};
