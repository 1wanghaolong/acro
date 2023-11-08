<template>
    <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
        :style="{ maxWidth: '1000px', margin: 'auto',overflow:'auto'}" @submit="submit">
        <a-card :title="$t('task.register.5umxdah5bvc0')">
            <a-row :gutter="16">
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.register.5umxdah5cd00')">
                        {{ useEnumsFormat('market.market',props.detail?.market) }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.register.5umxdah5chc0')">
                        {{ props.detail?.symbol }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.register.5umxdah5cjo0')">
                        {{ props.detail?.currency }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.register.5umxdah5cls0')">
                        {{$t('task.register.5umxdomrv7o0')}}{{ props.detail?.volume || 0 }}{{$t('task.register.5umxdomrw9k0')}}{{ props.detail?.amount }}
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-card :title="$t('task.register.5umxdah5cpg0')" style="margin-top: 20px;">
            <a-row :gutter="16">
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.register.5umxdah5ct00')">
                        {{$t('task.register.5umxdah5cvc0')}}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.register.5umxdah5cxc0')">
                        {{ props.detail?.record_type == 1? $t('task.register.5umxdah5d100') : $t('task.register.5umxdvvark40') }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6" v-if="props.detail?.record_type == 2">
                    <a-form-item :label="$t('task.register.5umxdah5cz80')">
                        {{ dayjs(props.detail?.record_date).format('YYYY-MM-DD') }}
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;margin-top: 20px;">
                <a-space :size="18">
                    <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                        {{$t('task.register.5umxdah5d100')}}
                    </a-button>
                    <a-popconfirm position="top" @ok="cancel" :content="$t('task.register.5umxdah5d3c0')">
                        <a-button :loading="form.loading" :disabled="form.loading" type="primary" status="danger">
                            {{$t('task.register.5umxdah5d540')}}
                        </a-button>
                    </a-popconfirm>
                </a-space>
            </div>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums';
import dayjs from 'dayjs';
const props = defineProps({
    detail:Object,
    current: Number
})
const { t } = useI18n();
const emit = defineEmits(['update:current', 'update:data','refresh']);
const formRef = ref()
const form = reactive({
    show: false,
    loading: false,
    accountList: [],
    data: {
        market:'',
        security_type:'',
        symbol:'',
        currency:'',
        record_date:'',
        record_type:1,
        volume:0,
        amount:0,
    },
    rules: {
        asset_account_id: [{ required: true, message: t('task.register.5umxdah5d740') }],
        currency: [{ required: true, message: t('task.register.5umxdah5d9w0') }],
        open_time: [{ required: true, message: t('task.register.5umxdah5dc40') }],
    }
})
const cancel = async () => {
    form.loading = true
    const { code } = await apiTrs.trsSymbolDividendDelete({
        id: props?.detail?.id
    })
    form.loading = false
    if (code != 1) return;
    emit('refresh')
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code } = await apiTrs.trsSymbolDividendRecord({
        id:props.detail?.id
    })
    form.loading = false
    if (code != 1) return;
    emit('refresh')
}
</script>