<template>
    <a-modal draggable :visible="true" :title="$t('index.renewal.5um825vlxk40')" @cancel="emit('update:show', false)" @before-ok="submit">
        <a-form ref="formRef" :model="form.data" layout="vertical">
            <a-row :gutter="6">
                <a-col :xs="24">
                    <a-form-item :label="$t('index.renewal.5um825vlybk0')">
                        <div>{{ dayjs.unix(props.detail?.open_time).format('YYYY-MM-DD') }}</div>
                    </a-form-item>
                    <a-form-item :label="$t('index.renewal.5um825vlyjg0')">
                        <div>{{ dayjs.unix(props.detail?.expire_time).format('YYYY-MM-DD') }}</div>
                    </a-form-item>
                    <a-form-item field="expire_date" :label="$t('index.renewal.5um825vlypc0')" :rules="[{ required: true, message: $t('index.renewal.5um82fyuamc0') }]">
                        <a-date-picker :disabledDate="(current) => dayjs(current).isBefore(dayjs((props.detail?.expire_time*1000)))" style="width: 100%;" v-model="form.data.expire_date" />
                    </a-form-item>
                    <a-form-item hide-label>
                        <a-space>
                            <a-button @click="change(1)">1{{$t('index.renewal.5um82fyubm40')}}</a-button>
                            <a-button @click="change(2)">2{{$t('index.renewal.5um82fyubm40')}}</a-button>
                            <a-button @click="change(3)">3{{$t('index.renewal.5um82fyubm40')}}</a-button>
                            <a-button @click="change(4)">4{{$t('index.renewal.5um82fyubm40')}}</a-button>
                            <a-button @click="change(5)">5{{$t('index.renewal.5um82fyubm40')}}</a-button>
                        </a-space>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
const local = useLocal()
const formRef = ref()
const props = defineProps({
    detail: Object,
    show: Boolean
})
const emit = defineEmits(['update:show', 'refresh'])
const form: any = reactive({
    show: true,
    loading: false,
    data: {
        expire_date: ''
    },
})
const change = (num:number) => {
    form.data.expire_date = dayjs.unix(props.detail?.expire_time).add(num,'month').format('YYYY-MM-DD')
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return false;
    const { code, msg } = await apiTrs.accountTimeApplyCreate({
        data: {
            trs_account_id: props.detail?.id,
            operator_id: local.userInfo?.id || 1,
            expire_date: form.data?.expire_date,
        }
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    emit('refresh')
    emit('update:show', false)
}
onMounted(() => {
    form.data.expire_date = dayjs.unix(props.detail?.expire_time).add(5,'month').format('YYYY-MM-DD')
})
</script>