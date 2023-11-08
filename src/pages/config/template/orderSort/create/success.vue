<template>
    <div style="width: 600px;margin: auto;">
        <a-result status="success">
            <template #subtitle>
                {{$t('create.success.5umyzkotc8g0')}}
            </template>
            <template #extra>
                <a-space style="margin-top: 30px;">
                    <a-button @click="reset">{{$t('create.success.5um7z6ve9ks0')}}</a-button>
                    <a-button type='primary' @click="router.replace({name:'configTemplateOrderSort'})">{{$t('create.success.5um7z6vea2w0')}}</a-button>
                </a-space>
            </template>
        </a-result>
    </div>
</template>
<script lang="ts" setup>
const router = useRouter()
const props = defineProps({
    data:Object,
    current:Number
})
const formData = ref()
const emit = defineEmits(['update:current','update:data']);
const reset = () => {
    emit('update:data',formData.value)
    emit('update:current',1)
}
onMounted(()=>{
    formData.value = props.data
})
</script>
<style>
.arco-divider-text{
    color: var(--color-text-3);
    font-size: 12px;
}
</style>