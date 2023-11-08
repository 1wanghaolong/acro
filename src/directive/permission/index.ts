import { DirectiveBinding } from 'vue';

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding;
  const local = useLocal();
  if (Array.isArray(value)) {
      let isShow = false
      value?.forEach((item:string) => {
        local.permissions.includes(item) && (isShow = true)
      })
      if (!isShow && el.parentNode) {
          el.parentNode.removeChild(el);
      }
  } else {
    throw new Error(`请使用数组，例如：v-permission="['xxx','xxx']"`);
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
