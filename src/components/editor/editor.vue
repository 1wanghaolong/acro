<template>
  <div class="editorTinymce">
    <tinymce v-model="text" :api-key="apiKey" :init="options" v-if="ishsow" />
    <tinymce v-model="text" :api-key="apiKey" :init="options2" ref="tinymceRef" v-else />
    <div class="skeleton" v-if="!boolTime && !ishsow">
      <a-skeleton animation>
        <a-space direction="vertical" :style="{ width: '100%' }" size="large">
          <a-skeleton-line :line-height="300" :rows="1" />
        </a-space>
      </a-skeleton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import tinymce from "@tinymce/tinymce-vue";
import { onBeforeUnmount, ref, watch } from "vue";
const props = defineProps({
  html: String,
});
const emit = defineEmits(["update:html"]);
const text = ref("");
const local = useLocal();
const router = useRouter();
const ishsow = ref(true);
const apiKey = ref("1wlo8mfvj1w2brmyv6av6xgkqnhg03sjutxguohzom166ach");
const options = ref({
  width: "100%",
  height: 300,
  language:local.lang=='en'?"en":local.lang=='tc'?"zh_TW":"zh_CN",
  skin: "oxide",
  theme: "silver",
  selector: "#tinydemo",
  plugins:
    "preview searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount charmap quickbars emoticons",
});
const options2 = ref({
  height: 300,
  language: local.lang=='en'?"en":local.lang=='tc'?"zh_TW":"zh_CN",
  skin: "oxide-dark",
  theme: "silver",
  selector: "#tinydemo",
  content_style: `
          body {
            background-color:#222f3e;
            color: #ffffff;
          }
        `,
  plugins:
    "preview searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount charmap quickbars emoticons",
});
const boolTime = ref(false)
const tinymceRef = ref(null)
let timeNum = ref(0)
if (local.theme == 'dark') {
  const time = setInterval(() => {
    timeNum.value=timeNum.value+1
    if (tinymceRef.value) {
      setTimeout(() => {
        timeNum.value = 0
        boolTime.value = true
      }, 1500)
      clearInterval(time)
    }
    if(timeNum.value==10){
      timeNum.value = 0
      boolTime.value = true
      clearInterval(time)
    }
  }, 1000)
}

const watchText = watch(text, (val) => {
  emit("update:html", val);
});
watch(
  () => local.theme,
  (newval: any) => {
    ishsow.value = newval == "dark" ? false : true;
    router.go(0);
  }
);
const watchProps = watch(
  () => props.html,
  (val) => {
    text.value = String(val || "");
  }
);
nextTick(() => {
  ishsow.value = local.theme == "dark" ? false : true;
});
onBeforeUnmount(() => {
  watchText && watchText();
  watchProps && watchProps();
});
</script>
<style scoped lang="less">
.editorTinymce {
  min-width: 100%;
  position: relative;
  height: 300px;

  textarea {
    display: none !important;
  }

  .skeleton {
    position: absolute;
    z-index: 9999;
    width: 100%;
    top: 0;
    background-color: #222f3e;
    border-radius: 10px;

    :deep(.arco-skeleton-line-row) {
      border-radius: 10px;
    }
  }
}</style>
