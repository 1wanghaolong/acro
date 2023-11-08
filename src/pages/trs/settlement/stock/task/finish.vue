<template>
    <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
        :style="{ maxWidth: '1000px', margin: 'auto',overflow:'auto' }" @submit="submit">
        <a-result v-if="props.detail?.is_cancel || props.detail?.status == 5" status="error" :title="$t('task.finish.5umxb5ncbhg0')" :subtitle="$t('task.finish.5umxb5ncc240')"/>
        <a-result v-else status="success" :title="$t('task.finish.5umxb5ncc8o0')"/>
        <a-card :title="$t('task.finish.5umxkqxl6ko0')">
            <a-row :gutter="16">
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.finish.5umxb5ncci00')">
                        {{ useEnumsFormat('market.market',props.detail?.market) }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.finish.5umxb5nccn40')">
                        {{ props.detail?.symbol }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.finish.5umxb5nccw80')">
                        {{ props.detail?.from_num || 0 }}{{$t('task.finish.5umxlgklcmc0')}}{{props.detail?.type == 1? $t('task.finish.5umxlorlhqw0') : $t('task.finish.5umxlorli640') }}{{ props.detail?.to_num }}{{$t('task.finish.5umxlgklcmc0')}}
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-card :title="$t('task.finish.5umxb5ncd140')" style="margin-top: 20px;">
            <a-row :gutter="16">
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.finish.5umxb5ncd7w0')">
                        {{props.detail?.status>1? $t('task.finish.5umxbvnzsm00') : $t('task.finish.5umxbvnzt8g0') }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.finish.5umxb5ncdco0')">
                        {{ dayjs(props.detail?.record_date).format('YYYY-MM-DD') }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.finish.5umxb5ncdhg0')">
                        <a-space direction="vertical">
                            <a-button @click="download">{{$t('task.finish.5umxb5ncdm40')}}</a-button>
                            <div style="color:var(--color-text-3)">{{$t('task.finish.5umxb5ncdqo0')}}</div>
                        </a-space>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-card :title="$t('task.finish.5umxb5ncdv40')" style="margin-top: 20px;">
            <a-row :gutter="16">
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.finish.5umxb5ncdzw0')">
                        {{props.detail?.status>2? $t('task.finish.5umxbvnztcs0') : $t('task.finish.5umxbvnztf00') }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.finish.5umxb5nce4o0')">
                        {{ registerNum }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.finish.5umxkqxl70w0')">
                        {{ paymentNum }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="props.detail?.status>3? $t('task.finish.5umxb5ncfv80') : $t('task.finish.5umxbvnzth00') ">
                        <a-space direction="vertical">
                            <a-button @click="download">{{$t('task.finish.5umxb5ncdm40')}}</a-button>
                            <div style="color:var(--color-text-3)">{{props.detail?.status>3? $t('task.finish.5umxbvnztk40') : $t('task.finish.5umxbvnztmo0') }}</div>
                        </a-space>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
    </a-form>
</template>
<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums';
import dayjs from 'dayjs';
const props = defineProps({
    current: Number,
    detail:Object
})
const { t } = useI18n();
const emit = defineEmits(['update:current', 'update:data']);
const formRef = ref()
const form = reactive({
    show: false,
    loading: false,
    recordList:[],
    accountList: [],
    data: {
        market:'HKEX',
        symbol:'',
        currency:'',
        type:1,
        time:''
    },
    rules: {
        asset_account_id: [{ required: true, message: t('task.finish.5umxb5ncefc0') }],
        currency: [{ required: true, message: t('task.finish.5umxb5ncejw0') }],
        open_time: [{ required: true, message: t('task.finish.5umxb5ncep80') }],
    }
})
const registerNum = computed(()=>{
    return form.recordList.reduce((sum, e:any) => sum + Number(e.register_num || 0), 0)
})
const paymentNum = computed(()=>{
    return form.recordList.reduce((sum, e:any) => sum + Number(e.payment_num || 0), 0)
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    emit('update:current', Number(props.current) + 1)
}
const download = () => {
    if(!form.recordList?.length) return Message.warning(t('task.finish.5umxb5ncesw0'))
    let fields = [
        {
            title: 'TRS账户',
            field: 'position_item_info.trs_account_info.account'
        }, {
            title: '上手账户号',
            field: 'position_item_info.counter_channel_account_info.account'
        }, {
            title: '通道标识',
            field: 'position_item_info.counter_channel_info.channel'
        }, {
            title: '交易方式',
            field: 'position_item_info.counter_channel_scene'
        }, {
            title: '市场',
            field: 'market'
        }, {
            title: '股票代码',
            field: 'symbol'
        }, {
            title: '登记数量',
            field: 'register_num'
        }, {
            title: '登记日期',
            field: 'record_date'
        }, {
            title: '起始股数',
            field: 'from_num'
        }, {
            title: '规则',
            field: 'type'
        }, {
            title: '目标股数',
            field: 'to_num'
        }, {
            title: '调整后持仓量',
            field: 'payment_num'
        }, {
            title: '持仓项ID',
            field: 'position_item_id'
        }
    ]
    let list = cloneDeep(form.recordList)
    useDownloadExcel(fields, list?.map((item: any) => {
        item.record_date = dayjs(item.record_date).format('YYYY-MM-DD')
        item.type = item.type == 1?'拆股':'并股'
        return item
    }), t('task.finish.5umxb5ncfv80'))
}
const getData = async () => {
    form.loading = true
    const { code, data } = await apiTrs.trsSymbolItemSplitRecordList({
        ...useFilter({
            split_id: props?.detail?.id
        })
    })
    form.loading = false
    if (code != 1) return;
    form.recordList = data.list
}
onMounted(() => {
    getData()
})

</script>