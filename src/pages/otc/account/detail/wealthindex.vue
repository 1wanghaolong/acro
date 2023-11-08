<template>
    <div>
        <a-card :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('detail.wealthindex.5um3jgph8gc0')}}
                    </a-space>
                    <!-- <a-space :size="18">
                        <a-button v-if="form.setup" @click="form.setup = false;getData()">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            {{$t('detail.wealthindex.5um3jgph9c80')}}
                        </a-button>
                        <a-button v-if="form.setup" @click="submit" type="primary" :loading="form.loading" :disabled="form.loading">
                            <template #icon>
                                <icon-save />
                            </template>
                            {{$t('detail.wealthindex.5um3jgph9lw0')}}
                        </a-button>
                        <a-button v-if="!form.setup" @click="form.setup = true" type="primary">
                            <template #icon>
                                <icon-edit />
                            </template>
                            {{$t('detail.wealthindex.5um3jgph9rw0')}}
                        </a-button>
                    </a-space> -->
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical"
                @submit="submit">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="account" :label="$t('detail.wealthindex.5um3jgph9xc0')">
                            {{ form.data.account }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="real_name" :label="$t('detail.wealthindex.5um3jgpha2o0')">
                            <a-input v-if="form.setup" v-model="form.data.real_name" :placeholder="$t('detail.wealthindex.5um3jgpha880')" />
                            <div v-else>{{ form.data.real_name }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="english_name" :label="$t('detail.wealthindex.5um3jgphaeo0')">
                            <a-input v-if="form.setup" v-model="form.data.english_name" :placeholder="$t('detail.wealthindex.5um3jgphajk0')" />
                            <div v-else>{{ form.data.english_name }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="email" :label="$t('detail.wealthindex.5um3jgphaog0')">
                            <a-input v-if="form.setup" v-model="form.data.email" :placeholder="$t('detail.wealthindex.5um3jgphatg0')" />
                            <div v-else>{{ form.data.email }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="country_code" :label="$t('detail.wealthindex.5um3jgphaz40')">
                            {{ useEnumsFormat('otc.account.status', form.data.status) }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('detail.wealthindex.5um3jgphb3w0')">
                            {{ dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                        </a-form-item>
                    </a-col>
                </a-row>

            </a-form>
        </a-card>
        <a-card class="general-card" :title="$t('detail.wealthindex.5um3jgphb8k0')" style="margin-top: 15px">
            <div v-for="item in form.data.asset_account_asset_list"
                style="width: 100%;display: flex;flex-direction: column;justify-content: space-between;padding-bottom: 10px;">
                <a-row class="grid-demo" :gutter="{ md: 8, lg: 24, xl: 32 }">
                    <a-col :span="24" style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        ">
                        <div style="display: flex; align-items: center;justify-content: space-between;">
                            <span class="title" style="font-size: 14px;margin-top: 10px;">{{ item.currency == 'CNY' ? $t('detail.wealthindex.5um3jgphbdc0') :
                                item.currency == 'HKD' ? $t('detail.wealthindex.5um3jgphbic0') : item.currency == 'USD' ? $t('detail.wealthindex.5um3jgphbng0') : "--" }}</span>
                        </div>
                        <div v-permission="['wealthAccountDetail']">
                            <a-button type="primary" @click="tzDetail(item.currency)">{{ item.currency ==
                                'CNY' ? $t('detail.wealthindex.5um3jgphbsc0') : item.currency == 'HKD' ? $t('detail.wealthindex.5um3jgphbxo0') : item.currency == 'USD' ? $t('detail.wealthindex.5um3jgphc2w0') : "--"
                            }}</a-button>
                        </div>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="real_name" :label="$t('detail.wealthindex.5um3jgphc9o0')" style="display: flex;flex-direction: column;">
                            <div>{{ item.usable_cash }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="real_name" :label="$t('detail.wealthindex.5um3jgphcds0')" style="display: flex;flex-direction: column;">
                            <div>{{ item.freeze_cash }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="real_name" :label="$t('detail.wealthindex.5um3jgphci40')" style="display: flex;flex-direction: column;">
                            <div>{{ $numberFormat(item.scale_existence) }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="real_name" :label="$t('detail.wealthindex.5um3jgphclo0')" style="display: flex;flex-direction: column;">
                            <div>{{ $numberFormat(item.to_settle_scale) }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="real_name" :label="$t('detail.wealthindex.5um3jgphcpo0')" style="display: flex;flex-direction: column;">
                            <div v-if="Number(item.history_profit) < 0">{{ '+'+item.history_profit }}</div>
                            <div v-if="Number(item.history_profit) >= 0">{{ item.history_profit}}</div>
                        </a-form-item>
                    </a-col>
                </a-row>
            </div>
        </a-card>
        <a-card style="margin: 20px 0;" :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('detail.wealthindex.5um3jgphcts0')}}
                    </a-space>
                </div>
            </template>
            <a-row :gutter="[16, 16]" v-permission="['otcAccountPaymentCreate']">
                <a-col :xs="24">
                    <div class="title">{{$t('detail.wealthindex.5um3jgphcxc0')}}</div>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6">
                    <a-card hoverable class="button"
                        @click="router.push({ name: 'otcAccountPaymentCreate', query: { account: form.data?.account } })">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('detail.wealthindex.5um3jgphd100')}}
                        </a-space>
                    </a-card>
                </a-col>
                <!-- <a-col :xs="24" :sm="12" :md="8" :xl="6">
                    <a-card hoverable class="button"
                        @click="router.push({ name: 'trsAccountDetailInterest', query: { setup: 1 } })">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('detail.wealthindex.5um3jgphd540')}}
                        </a-space>
                    </a-card>
                </a-col> -->
            </a-row>
            <a-row :gutter="[16, 16]" v-permission="['wealthTradeOrderCreate','wealthTradePositionCreate','wealthTradeInquiryCreate']">
                <a-col :xs="24">
                    <div class="title">{{$t('detail.wealthindex.5um3jgphd8k0')}}</div>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['wealthTradeOrderCreate']">
                    <a-card hoverable class="button"
                        @click="router.push({ name: 'wealthTradeOrderCreate', query: { account: form.data?.account } })">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            {{$t('detail.wealthindex.5um3jgphdcg0')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['wealthTradePositionCreate']">
                    <a-card hoverable class="button"
                    @click="router.push({ name: 'wealthTradePositionCreate', query: { account: form.data?.account } })">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            {{$t('detail.wealthindex.5um3jgphdfs0')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['wealthTradeInquiryCreate']">
                    <a-card hoverable class="button"
                    @click="router.push({ name: 'wealthTradeInquiryCreate', query: { account: form.data?.account } })">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            {{$t('detail.wealthindex.5um3jgphdjg0')}}
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
const router = useRouter()
const formRef = ref()
const { t } = useI18n();
const loading = ref(false)
const form = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {
        id: '',
        account: '',
        charge_package_id: '',
        real_name: '',
        english_name: '',
        country_code: '',
        mobile: '',
        email: '',
        create_time: 0,
        status: 1,
        currency_account_list:[],
        asset_account_asset_list: [{
            currency: "CNY",
            freeze_cash: 0,  //冻结金额
            usable_cash: 0, //可用金额
            scale_existence: 0, // 存续规模
            to_settle_scale: 0,  // 结算规模
            history_profit: 0,  //历史盈亏
        }, {
            currency: "HKD",
            freeze_cash: 0,  //冻结金额
            usable_cash: 0, //可用金额
            scale_existence: 0, // 存续规模
            to_settle_scale: 0,  // 结算规模
            history_profit: 0,  //历史盈亏
        }, {
            currency: "USD",
            freeze_cash: 0,  //冻结金额
            usable_cash: 0, //可用金额
            scale_existence: 0, // 存续规模
            to_settle_scale: 0,  // 结算规模
            history_profit: 0,  //历史盈亏
        }]
    },
    rules: {
        real_name: [{ required: true, message: t('detail.wealthindex.5um3jgpha880') }],
        english_name: [{ required: true, message: t('detail.wealthindex.5um3jgphajk0') }],
        email: [{ required: true, message: t('detail.wealthindex.5um3jgphatg0') }, { type: 'email', message: t('detail.wealthindex.5um3jgphdn80') }]
    }
})
const tzDetail = (currency: any) => {
    if (!form.data.currency_account_list || !form.data.currency_account_list.length) {
        return
    }
    let id:any
    form.data.currency_account_list.forEach((item:any)=>{
        if (item.currency == currency) {
           id = item.wealth_account_id
        }
    })
    router.push({ name: 'wealthAccountDetail', params: { accountid:id }})
}
const submit = async () => {
    // const validate = await formRef.value?.validate()
    // if (validate) return;
    // form.loading = true
    // const { code, msg } = await apiOtc.accountUpdate({
    //     id: form.data.id,
    //     data: {
    //         real_name: form.data.real_name,
    //         english_name: form.data.english_name,
    //         email: form.data.email
    //     }
    // })
    // form.loading = false
    // if (code != 1) return;
    // Message.success({ content: msg })
    // form.setup = false
    // getData()
}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiWealth.wealthAccountAccountInfo({
        asset_account_id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
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