<template>
    <a-modal draggable :visible="true" :title="$t('index.accountCancel.5um820hpr5g0')" @cancel="emit('update:show', false)" @before-ok="submit">
        <div>{{$t('index.accountCancel.5um820hprws0')}}</div>
        <div v-if="props.detail?.expire_is_close_position == '0'">{{$t('index.accountCancel.5um820hps500')}}</div>
        <div v-if="props.detail?.expire_is_close_position == '1'">{{$t('index.accountCancel.5um820hpsb80')}}</div>
    </a-modal>
</template>
<script lang="ts" setup>
const local = useLocal()
const props = defineProps({
    detail: Object,
    show: Boolean
})
const emit = defineEmits(['update:show', 'refresh'])
const submit = async () => {
    const { code, msg } = await apiTrs.accountCancelApplyCreate({
        data: {
            trs_account_id: props.detail?.id,
            operator_id: local.userInfo?.id || 1
        }
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    emit('refresh')
    emit('update:show', false)
}
</script>