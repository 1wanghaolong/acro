<template>
    <a-modal draggable :visible="true" :title="$t('index.sceneTemp.5um8326m1vc0')" @cancel="emit('update:show', false)" @before-ok="submit">
        <a-form ref="formRef" :model="form.data" layout="vertical">
            <a-row :gutter="6">
                <a-col :xs="24">
                    <a-form-item field="counter_channel_account_scene_temp_id" :label="$t('index.sceneTemp.5um8326m2d00')"
                        :rules="[{ required: true, message: $t('index.sceneTemp.5um8326m2gg0') }]">
                        <a-select allow-clear v-model="form.data.counter_channel_account_scene_temp_id"
                            :placeholder="$t('index.sceneTemp.5um8326m2gg0')">
                            <a-option v-for="item in (form.counterChannelAccountSceneTemplate as any)" :value="item.id">
                                {{ item.name }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>
<script lang="ts" setup>
const formRef = ref()
const props = defineProps({
    detail:Object,
    show:Boolean
})
const emit = defineEmits(['update:show','refresh'])
const form: any = reactive({
    show: true,
    loading: false,
    counterChannelAccountSceneTemplate:[],
    data: {
        counter_channel_account_scene_temp_id:''
    },
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return false;
    const { code,msg } = await apiTrs.accountUpdate({
        id:props.detail?.id,
        data:{
            counter_channel_account_scene_temp_id:form.data?.counter_channel_account_scene_temp_id,
        }
    })
    if(code != 1) return false;
    Message.success({content:msg})
    emit('refresh')
    emit('update:show',false)
}
const getData = async () => {
    const { code, data } = await apiTrs.counterChannelAccountSceneTemplateAll()
    if (code != 1) return;
    form.counterChannelAccountSceneTemplate = data?.length?data:[]
}
onMounted(()=>{
    form.data.counter_channel_account_scene_temp_id = props.detail?.counter_channel_account_scene_temp_id
    getData()
})
</script>