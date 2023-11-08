<template>
    <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
        :style="{ maxWidth: '600px', margin: 'auto', overflowY:'auto',overflowX:'hidden'}" @submit="submit">
        <a-row :gutter="16">
            <a-col :xs="24">
                <a-form-item field="symbol" :label="$t('task.create.5umxashxaos0')">
                    <a-select @change="changeSymbol" :loading="form.symbolLoading" allow-search v-model:model-value="form.data.symbol" :placeholder="$t('task.create.5umxashxb8w0')"
                    @search="getSymbolList">
                    <template #label="{ data }">
                        {{data?.value}}
                    </template>
                        <a-option v-for="item in (form.symbolList as any)"
                            :value="item.symbol">
                            {{ item.title }}
                        </a-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item :label="$t('task.create.5umxashxbdw0')">
                    <a-input :hide-button="true" readonly :model-value="useEnumsFormat('market.market',form.data.market)" :placeholder="$t('task.create.5umxashxbgc0')" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item :label="$t('task.create.5umxashxbis0')">
                    <a-input :hide-button="true" readonly v-model="form.data.currency" :placeholder="$t('task.create.5umxashxbgc0')" />
                </a-form-item>
            </a-col>
            <a-col :xs="24">
                <a-form-item field="volume" :label="$t('task.create.5umxashxblk0')">
                    <a-input-number v-model="form.data.volume" :placeholder="$t('task.create.5umxashxbok0')" allow-clear>
                        <template #prepend>
                            {{$t('task.create.5umxashxbqw0')}}
                        </template>
                        <template #suffix>
                            {{$t('task.create.5umxashxbtc0')}}
                        </template>
                    </a-input-number>
                </a-form-item>
            </a-col>
            <a-col :xs="24">
                <a-form-item field="amount" hide-label>
                    <a-input-number v-model="form.data.amount" :placeholder="$t('task.create.5umxashxbok0')" allow-clear>
                        <template #prepend>
                            {{$t('task.create.5umxashxbvw0')}}
                        </template>
                        <template #suffix>
                            {{ form.data.currency }}
                        </template>
                    </a-input-number>
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="8">
                <a-form-item field="symbol" :label="$t('task.create.5umxashxby00')">
                    <a-button @click="form.data.record_type = 1" size="small" :type="form.data.record_type == 1?'primary':'secondary'">{{$t('task.create.5umxashxc0g0')}}</a-button>
                    <a-button @click="form.data.record_type = 2" size="small" :type="form.data.record_type == 2?'primary':'secondary'">{{$t('task.create.5umxashxc2c0')}}</a-button>
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="16"  v-if="form.data.record_type == 2">
                <a-form-item :label="$t('task.create.5umxashxc4o0')" field="record_date" :rules="[{ required: true, message: '请选择预约时间'}]">
                    <a-date-picker :disabledDate="(current) => dayjs(current).isBefore(dayjs().subtract(1, 'day'))" style="width: 100%;" value-format="YYYY-MM-DD" v-model="form.data.record_date" />
                </a-form-item>
            </a-col>
            <a-col :xs="24">
                <span style="color:var(--color-text-3)" v-if="form.data.record_type == 1">{{$t('task.create.5umxashxc7c0')}}</span>
                <span style="color:var(--color-text-3)" v-else>{{$t('task.create.5umxashxc9g0')}}</span>
            </a-col>
            <a-col :xs="24">
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button :disabled="form.loading" :loading="form.loading" type="primary" html-type="submit">
                                <template #icon>
                                    <icon-save />
                                </template>
                                {{$t('task.create.5umxashxcbs0')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>
<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums';
import dayjs from 'dayjs';
const local = useLocal()
const router = useRouter()
const { t } = useI18n();
const emit = defineEmits(['update:current', 'update:data','refresh']);
const formRef = ref()
const form = reactive({
    show: false,
    loading: false,
    symbolList:[],
    symbolLoading:false,
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
        volume: [{ required: true, message: t('task.create.5umxashxce00') },useRules.moreThanZero(t('task.create.5umxashxcfw0'))],
        amount: [{ required: true, message: t('task.create.5umxashxci40') },useRules.moreThanZero(t('task.create.5umxashxcl80'))],
        symbol: [{ required: true, message: t('task.create.5umxashxb8w0') }],
    }
})
const getSymbolList = async (value:string) => {
    form.symbolLoading = true
    const { code, data } = await apiMarket.symbolSearch({keyword:value})
    form.symbolLoading = false
    if (code != 1) return;
    form.symbolList = data.list.map((item:any)=>{
        item.title = item.name[local.lang] + '.' + item.text
        return item
    })
}
const changeSymbol = () => {
    form.data.security_type = (form.symbolList as any)?.find((item:any)=>item.symbol == form.data.symbol)?.security_type || ''
    form.data.market = (form.symbolList as any)?.find((item:any)=>item.symbol == form.data.symbol)?.market || ''
    form.data.currency = (form.symbolList as any)?.find((item:any)=>item.symbol == form.data.symbol)?.currency || ''
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code,data } = await apiTrs.trsSymbolDividendCreate({
        data:{
            ...form.data,
            record_date:form.data.record_type == 1?dayjs().format('YYYY-MM-DD'):form.data.record_date
        }
    })
    form.loading = false
    if (code != 1) return;
    router.replace({name:'trsSettlementBonusTask',query:{id:data.id}})
    emit('refresh',data?.id)
}
</script>