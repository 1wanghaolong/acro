<template>
    <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
        :style="{ maxWidth: '1000px', margin: 'auto', overflow: 'auto' }" @submit="submit">
        <a-card :title="$t('task.confirm.5umxjapba5k0')">
            <a-row :gutter="16">
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.confirm.5umx9mggnlk0')">
                        {{ useEnumsFormat('market.market', props.detail?.market) }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.confirm.5umx9mggnp00')">
                        {{ props.detail?.symbol }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.confirm.5umxjapbakc0')">
                        {{ props.detail?.from_num || 0 }}{{$t('task.confirm.5umxjwoj3q80')}}{{props.detail?.type == 1? $t('task.confirm.5umxjwoj2vs0') : $t('task.confirm.5umxjwoj3ms0') }}{{ props.detail?.to_num }}{{$t('task.confirm.5umxjwoj3q80')}}
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-card :title="$t('task.confirm.5umx9mggnvg0')" style="margin-top: 20px;">
            <a-row :gutter="16">
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.confirm.5umx9mggnxo0')">
                        {{$t('task.confirm.5umx9mggnzk0')}}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.confirm.5umx9mggo1s0')">
                        {{ dayjs(props.detail?.record_date).format('YYYY-MM-DD') }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.confirm.5umx9mggo5c0')">
                        <a-space direction="vertical">
                            <a-button @click="download">{{$t('task.confirm.5umx9mggo7k0')}}</a-button>
                            <div style="color:var(--color-text-3)">{{$t('task.confirm.5umx9mggoa40')}}</div>
                        </a-space>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-card :title="$t('task.confirm.5umx9mggoc40')" style="margin-top: 20px;">
            <a-row :gutter="16">
                <a-col :xs="24" :sm="12" :md="6">
                    <a-form-item :label="$t('task.confirm.5umx9mggogc0')">
                        {{ form.msg ? $t('task.confirm.5umx9mggois0') : props.detail?.status == 2 ?$t('task.confirm.5umx9mggokk0') : $t('task.confirm.5umx9mggoms0') }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="6" v-if="form.msg">
                    <a-form-item :label="$t('task.confirm.5umx9mggoos0')">
                        {{ form.msg }}
                    </a-form-item>
                </a-col>
            </a-row>
        </a-card>
        <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;margin-top: 20px;">
                <a-space :size="18">
                    <a-upload :limit="1" :loading="form.loading" :disabled="form.loading" @before-upload="beforeUpload" :custom-request="(upload as any)"
                        :auto-upload="true">
                        <template #upload-button>
                            <a-button type="outline">
                                {{$t('task.confirm.5umx9mggoqo0')}}
                            </a-button>
                        </template>
                    </a-upload>
                    <a-popconfirm position="top" @ok="cancel" :content="$t('task.confirm.5umx9mggot00')">
                        <a-button :loading="form.loading" :disabled="form.loading" type="primary" status="danger">
                            {{$t('task.confirm.5umx9mggowg0')}}
                        </a-button>
                    </a-popconfirm>
                    <a-button :disabled="props.detail?.status == 2" type="primary" html-type="submit">
                        {{$t('task.confirm.5umx9mggoyk0')}}
                    </a-button>
                </a-space>
            </div>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums';
import dayjs from 'dayjs'
import * as XLSX from 'xlsx';
const props = defineProps({
    detail: Object,
    current: Number
})
const { t } = useI18n();
const emit = defineEmits(['update:current', 'update:data', 'refresh']);
const formRef = ref()
const form = reactive({
    show: false,
    loading: false,
    accountList: [],
    recordList:[],
    msg:'',
    data: {
        market: 'HKEX',
        symbol: '',
        currency: '',
        type: 1,
        time: ''
    },
    rules: {
        asset_account_id: [{ required: true, message: t('task.confirm.5umx9mggp0c0') }],
        currency: [{ required: true, message: t('task.confirm.5umx9mggp1s0') }],
        open_time: [{ required: true, message: t('task.confirm.5umx9mggp380') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    emit('update:current', Number(props.current) + 1)
}
const download = () => {
    if(!form.recordList?.length) return Message.warning(t('task.confirm.5umx9mggp500'))
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
    }), t('task.confirm.5umx9mggpn00'))
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
const beforeUpload = (file: any): any => {
    return new Promise(async (resolve, reject) => {
        const extension = file.name.split('.').pop().toLowerCase();
        const isXlsxFile = extension === 'xlsx';
        if (isXlsxFile) {
            resolve(true)
        } else {
            Message.info(t('task.confirm.5umx9mggpoo0'))
            reject()
        }
    });
};
const upload = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    try {
        const reader = new FileReader();
        reader.onload = async (e: any) => {
            const fileData = new Uint8Array(e.target.result);
            const workbook = XLSX.read(fileData, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            let arr = jsonData.map((item: any) => {
                item = item.map((i:any)=>{
                    if(typeof i == 'string'){
                        i = i?.replace(/\t/g, '');
                    }
                    return i
                })
                return {
                    position_item_id: item[12],
                    type:item[9] == t('task.confirm.5umxjapbay80')?1:2,
                    from_num: Number(item[8]),
                    to_num: Number(item[10]),
                    register_num: Number(item[6]),
                    payment_num: Number(item[11]),
                }
            })?.filter((_:any,index:any)=>index>0)
            const { code,msg } = await apiTrs.trsSymbolSplitRecordCreate({
                market: props?.detail?.market,
                security_type: props?.detail?.security_type,
                symbol: props?.detail?.symbol,
                record_date: props?.detail?.record_date,
                split_id: props?.detail?.id,
                data: {
                    item_list: arr
                }
            })
            if (code != 1){
                form.msg = msg
                return onError(t('task.confirm.5umx9mggpqc0'));
            }
            onSuccess(true)
            emit('refresh')
        };
        reader.readAsArrayBuffer(fileItem.file);
    } catch (error) {
        onError(t('task.confirm.5umx9mggps00'))
    }
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
onMounted(() => {
    getData()
})

</script>