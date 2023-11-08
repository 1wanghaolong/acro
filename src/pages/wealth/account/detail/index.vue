<template>
    <div>
        <a-card :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('detail.index.5umyhfwf0440')}}
                    </a-space>
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical"
                @submit="submit">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="account" :label="$t('detail.index.5umyhfwf2ts0')">
                            {{ form.data.account ? form.data.account : '--' }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="asset_account" :label="$t('detail.index.5umyhfwf3ks0')">
                            <a-input v-if="form.setup" v-model="form.data.asset_account_info.account" :placeholder="$t('detail.index.5umyhfwf40k0')" />
                            <div v-else>{{ form.data.asset_account_info.account ? form.data.asset_account_info.account : '--' }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="currency" :label="$t('detail.index.5umyhfwf4ls0')">
                            <a-input v-if="form.setup" v-model="form.data.currency" :placeholder="$t('detail.index.5umyhfwf4uo0')" />
                            <div v-else>{{ form.data.currency ? form.data.currency : '--' }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('detail.index.5umyhfwf5ao0')">
                            {{ form.data.create_time ? dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') :
                                "--" }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="status" :label="$t('detail.index.5umyhfwf5ik0')">
                            {{ useEnumsFormat('wealth.account.account.status', form.data.status) }}
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
        <div style="margin-top:20px;">
            <a-card :loading="loading" class="general-card">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('detail.index.5umyhfwf5rg0')}}
                        </a-space>
                    </div>
                </template>
                <div style="width: 100%;">
                    <div>
                        <a-row :gutter="16" style="padding-bottom: 15px;">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <div>{{ $t('detail.index.5umyhfwf6140') }}</div>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <div>{{ $t('detail.index.5umyhfwf6as0') }}</div>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <div>{{ $t('detail.index.5umyhfwf6j40') }}</div>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16" style="padding-bottom: 15px;">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <div>{{ ''+form.data.continuing_amount ? $numberFormat(form.data.continuing_amount)
                                    : '--' }}</div>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">

                                <div>{{ ''+form.data.to_settled_amount ? $numberFormat(form.data.to_settled_amount)
                                    : '--' }}</div>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <div v-if="form.data.history_profit > 0">{{'+'+ $numberFormat(form.data.history_profit) }}</div>
                                <div v-if="form.data.history_profit <= 0">{{ $numberFormat(form.data.history_profit) }}</div>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </a-card>
        </div>
        <a-card style="margin: 20px 0;">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('detail.index.5umyhfwf6sw0')}}
                    </a-space>
                </div>
            </template>
            <a-row :gutter="[16, 16]">
                <a-col :xs="24">
                    <div class="title">{{$t('detail.index.5umyhfwf7280')}}</div>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6">
                    <a-card hoverable class="button"
                        @click="router.push({ name: 'wealthTradePositionCreate', query: { account: form.data?.asset_account_info?.account } })">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            {{$t('detail.index.5umyhfwf7gg0')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6">
                    <a-card hoverable class="button"
                    @click="router.push({ name: 'wealthTradeOrderCreate', query: { account: form.data?.asset_account_info?.account } })">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            {{$t('detail.index.5umyhfwf7qo0')}}
                        </a-space>
                    </a-card>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const route = useRoute()
const formRef = ref()
const emit = defineEmits(['update:AccountUser'])
const router = useRouter()
const loading = ref(false)
const form:any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {
        id: '',
        account: "",
        asset_account: '',
        currency: "",
        create_time: 0,
        status: 1,
        is_open: false,
        sex: 2,
        continuing_amount:0,
        to_settled_amount:0,
        history_profit:0,
        asset_account_info:{

        }
    },
    rules: {
        // real_name: [{ required: true, message: '请输入中文姓名' }],
        // english_name: [{ required: true, message: '请输入英文姓名' }],
        // email: [{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱' }]
    }
})
const submit = async () => {

}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiWealth.wealthAccountInfo({
        id: route.params?.accountid || route.query.accountid
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
    emit('update:AccountUser',data.asset_account_info.account)
}
{
    getData()
}
</script>
<style lang="less" scoped>
.title {
    line-height: 26px;
    position: relative;
    padding-left: 10px;

    &::before {
        position: absolute;
        content: '';
        width: 3px;
        height: 100%;
        left: 0;
        background-color: rgb(var(--arcoblue-6));
    }
}

.arco-row {
    margin-top: 10px !important;

    +.arco-row {
        margin-top: 25px !important;
    }
}

.button {
    cursor: pointer;

    :hover {
        color: rgb(var(--arcoblue-6)) !important;
    }
}</style>