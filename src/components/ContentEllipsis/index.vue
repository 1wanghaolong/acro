<template>
    <div class="ellipsis-container" ref="containerRef">
        <div v-if="!expanded && isOverflow" :style="{'padding-right':local.lang=='en'?'47px':'27px'}" class="ellipsis-content">
            <span  ref="spanWdith">
                {{ props.content }}
            </span>
        </div>
        <div v-else class="expanded-content">
            <span ref="spanWdith">
                {{ props.content }}
            </span>
        </div>
        <a-link class="show" v-if="isOverflow&&expanded" @click="toggleExpanded">
            {{ expanded ? $t('ContentEllipsis.index.5ulhegm45nw0') : $t('ContentEllipsis.index.5ulhegm4gfk0') }}
        </a-link>
        <a-link class="noShow" v-if="isOverflow&&!expanded" @click="toggleExpanded">
            {{ expanded ? $t('ContentEllipsis.index.5ulhegm45nw0') : $t('ContentEllipsis.index.5ulhegm4gfk0') }}
        </a-link>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, Ref,nextTick  } from 'vue';
const local = useLocal()
const props = defineProps({
    content: String
})
const spanWdith:any = ref(null)

const expanded = ref(false);
const isOverflow = ref(false);
const containerRef: Ref<HTMLElement | null> = ref(null);

const toggleExpanded = () => {
    expanded.value = !expanded.value;
};
watch(props, async (newVal, oldVal) => {
  // 侦听器逻辑
  console.log(newVal,oldVal);
  await nextTick();
  const container = containerRef.value;
    if (container) {
        const containerWidth = container.getBoundingClientRect().width;
        let widths = spanWdith.value?.offsetWidth
        if(containerWidth>400){
            widths = widths+30
        }else{
            widths = widths+15
        }
        const isTextOverflow = widths >= containerWidth;
        isOverflow.value = isTextOverflow;
    }
  
});

onMounted(() => {
    const container = containerRef.value;
    if (container) {
        const containerWidth = container.getBoundingClientRect().width;
        let widths = spanWdith.value?.offsetWidth
        if(containerWidth>400){
            widths = widths+30
        }else{
            widths = widths+15
        }
        const isTextOverflow = widths >= containerWidth;
        isOverflow.value = isTextOverflow;
    }
});
</script>
  
<style scoped>
.ellipsis-container {
    position: relative;
}

.ellipsis-content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.expanded-content {
    white-space: normal;
}

.noShow{
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
}
</style>