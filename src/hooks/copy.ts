import useClipboard from 'vue-clipboard3'
import { Message } from '@arco-design/web-vue';
export const useCopy = async (text:any) => {
  const local = useLocal()
    const { toClipboard } = useClipboard()
      try {
        await toClipboard(text)
        Message.success(local.lang=='en'?'Replicating Success':local.lang=='tc'?'複製成功':'复制成功');
      } catch (e) {
        Message.success(local.lang=='en'?'Copy failed, please check browser permissions':local.lang=='tc'?'複製失敗，請檢查瀏覽器許可權':'复制失败，请检查浏览器权限');
      }
}