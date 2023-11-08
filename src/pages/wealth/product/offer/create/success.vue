<template>
    <div style="width: 600px;margin: auto;">
        <a-result status="success">
            <template #subtitle>
                {{$t('offer.success.5umxbb7flcg0')}}
            </template>
            <template #extra>
                <a-space style="margin-top: 30px;">
                    <a-button @click="reset">{{$t('offer.success.5umxbb7fm1c0')}}</a-button>
                    <a-button type='primary' @click="router.replace({name:'wealthProductOffer'})">{{$t('offer.success.5umxbb7fm9c0')}}</a-button>
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