<template>
    <a-modal draggable :visible="true" :title="$t('index.tradeStatus.5um8371nb8w0')" @cancel="emit('update:show', false)" @before-ok="submit">
        <a-form ref="formRef" :model="form.data" layout="vertical">
            <a-row :gutter="6">
                <a-col :xs="24">
                    <a-form-item field="trade_status" :label="$t('index.tradeStatus.5um8371nc1w0')"
                        :rules="[{ required: true, message: $t('index.tradeStatus.5um8371nc9g0') }]">
                        <a-select allow-clear v-model="form.data.trade_status"
                            :placeholder="$t('index.tradeStatus.5um8371nc9g0')">
                            <a-option v-for="item in useEnums('trs.account.trade_status')" :value="item.value">
                                {{ item.trans[local.lang] }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>
<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
const local = useLocal()
const formRef = ref()
const props = defineProps({
    detail:Object,
    show:Boolean
})
const emit = defineEmits(['update:show','refresh'])
const form: any = reactive({
    show: true,
    loading: false,
    data: {
        trade_status:''
    },
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return false;
    const { code,msg } = await apiTrs.accountUpdate({
        id:props.detail?.id,
        data:{
            trade_status:form.data?.trade_status,
        }
    })
    if(code != 1) return false;
    Message.success({content:msg})
    emit('refresh')
    emit('update:show',false)
}
onMounted(()=>{
    form.data.trade_status = props.detail?.trade_status
})
</script>