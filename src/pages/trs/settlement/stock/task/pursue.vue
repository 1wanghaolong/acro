<template>
    <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
        :style="{ maxWidth: '1000px', margin: 'auto',overflow:'auto' }" @submit="submit">
        <a-card :title="$t('task.pursue.5umxmjpp49s0')">
            <a-row :gutter="16">
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.pursue.5umxcc40owg0')">
                        {{ useEnumsFormat('market.market', props.detail?.market) }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.pursue.5umxcc40ozg0')">
                        {{ props.detail?.symbol }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.pursue.5umxcc40p480')">
                        {{ props.detail?.from_num || 0 }}{{$t('task.pursue.5umxmjpp4wo0')}}{{props.detail?.type == 1? $t('task.pursue.5umxmjpp53g0') : $t('task.pursue.5umxmjpp5800') }}{{ props.detail?.to_num }}{{$t('task.pursue.5umxmjpp4wo0')}}
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-card :title="$t('task.pursue.5umxcc40p6o0')" style="margin-top: 20px;">
            <a-row :gutter="16">
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.pursue.5umxcc40p8w0')">
                        {{$t('task.pursue.5umxcc40paw0')}}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.pursue.5umxcc40pcw0')">
                        {{ dayjs(props.detail?.record_date).format('YYYY-MM-DD') }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.pursue.5umxcc40pf00')">
                        <a-space direction="vertical">
                            <a-button @click="download">{{$t('task.pursue.5umxcc40ph40')}}</a-button>
                            <div style="color:var(--color-text-3)">{{$t('task.pursue.5umxcc40pjc0')}}</div>
                        </a-space>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-card :title="$t('task.pursue.5umxcc40pl40')" style="margin-top: 20px;">
            <a-row :gutter="16">
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.pursue.5umxcc40pn40')">
                        {{$t('task.pursue.5umxcc40puw0')}}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.pursue.5umxcc40pwo0')">
                        {{ registerNum }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.pursue.5umxmjpp5d00')">
                        {{ paymentNum }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.pursue.5umxcc40q0k0')">
                        <a-space direction="vertical">
                            <a-button @click="download">{{$t('task.pursue.5umxcc40ph40')}}</a-button>
                            <div style="color:var(--color-text-3)">{{$t('task.pursue.5umxcc40q2g0')}}</div>
                        </a-space>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;margin-top: 20px;">
                <a-space :size="18">
                    <a-button @click="step(-1)">
                        {{$t('task.pursue.5umxcc40q480')}}
                    </a-button>
                    <a-popconfirm position="top" @ok="cancel" :content="$t('task.pursue.5umxcc40q700')">
                        <a-button :loading="form.loading" :disabled="form.loading" type="primary" status="danger">
                            {{$t('task.pursue.5umxcc40q8g0')}}
                        </a-button>
                    </a-popconfirm>
                    <a-button :loading="form.loading" :disabled="form.loading" type="primary" html-type="submit">
                        {{$t('task.pursue.5umxcc40qa80')}}
                    </a-button>
                </a-space>
            </div>
        </a-form-item>
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
const emit = defineEmits(['update:current', 'update:data','refresh']);
const formRef = ref()
const form = reactive({
    show: false,
    loading: false,
    accountList: [],
    recordList:[],
    data: {
        market:'HKEX',
        symbol:'',
        currency:'',
        type:1,
        time:''
    },
    rules: {
        asset_account_id: [{ required: true, message: t('task.pursue.5umxcc40qbg0') }],
        currency: [{ required: true, message: t('task.pursue.5umxcc40qd00') }],
        open_time: [{ required: true, message: t('task.pursue.5umxcc40qes0') }],
    }
})
const registerNum = computed(()=>{
    return form.recordList.reduce((sum, e:any) => sum + Number(e.register_num || 0), 0)
})
const paymentNum = computed(()=>{
    return form.recordList.reduce((sum, e:any) => sum + Number(e.payment_num || 0), 0)
})
const download = () => {
    if(!form.recordList?.length) return Message.warning(t('task.pursue.5umxcc40qgg0'))
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
    }), t('task.pursue.5umxcc40qww0'))
}
const step = (type: number) => {
    if (type == -1) return emit('update:current', Number(props.current) - 1)
    emit('update:current', Number(props.current) + 1)
}
const getData = async () => {
    const { code, data } = await apiTrs.trsSymbolItemSplitRecordList({
        ...useFilter({
            split_id: props?.detail?.id
        })
    })
    if (code != 1) return;
    form.recordList = data.list
}
const cancel = async () => {
    form.loading = true
    const { code } = await apiTrs.trsSymbolSplitDelete({
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
    const { code } = await apiTrs.trsSymbolSplitExecute({
        id:props.detail?.id
    })
    form.loading = false
    if (code != 1) return;
    emit('refresh')
}
onMounted(() => {
    getData()
})

</script>