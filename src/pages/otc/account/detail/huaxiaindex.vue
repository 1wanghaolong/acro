<template>
    <div>
        <a-card :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('detail.huaxiaindex.5um3iwhshs80')}}
                    </a-space>
                    <a-space :size="18">
                        <a-button v-if="form.setup" @click="form.setup = false;getData()">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            {{$t('detail.huaxiaindex.5um3iwhsi9o0')}}
                        </a-button>
                        <a-button v-if="form.setup" @click="submit" type="primary" :loading="form.loading" :disabled="form.loading">
                            <template #icon>
                                <icon-save />
                            </template>
                            {{$t('detail.huaxiaindex.5um3iwhsicg0')}}
                        </a-button>
                        <a-button v-if="!form.setup" @click="form.setup = true" type="primary">
                            <template #icon>
                                <icon-edit />
                            </template>
                            {{$t('detail.huaxiaindex.5um3iwhsieg0')}}
                        </a-button>
                    </a-space>
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical"
                @submit="submit">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="account" :label="$t('detail.huaxiaindex.5um3iwhsigg0')">
                            {{ form.data.account }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="real_name" :label="$t('detail.huaxiaindex.5um3iwhsiik0')">
                            <a-input v-if="form.setup" v-model="form.data.real_name" :placeholder="$t('detail.huaxiaindex.5um3iwhsiko0')" />
                            <div v-else>{{ form.data.real_name }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="english_name" :label="$t('detail.huaxiaindex.5um3iwhsimk0')">
                            <a-input v-if="form.setup" v-model="form.data.english_name" :placeholder="$t('detail.huaxiaindex.5um3iwhsiog0')" />
                            <div v-else>{{ form.data.english_name }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="email" :label="$t('detail.huaxiaindex.5um3iwhsiq80')">
                            <a-input v-if="form.setup" v-model="form.data.email" :placeholder="$t('detail.huaxiaindex.5um3iwhsiv80')" />
                            <div v-else>{{ form.data.email }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="country_code" :label="$t('detail.huaxiaindex.5um3iwhsixw0')">
                            <a-tag size="small" :color="form.data.status == 1?'#00b42a':'#f53f3f'">
                                {{useEnumsFormat('otc.account.status',form.data.status)}}
                            </a-tag>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('detail.huaxiaindex.5um3iwhsj080')">
                            {{ dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="open_bank_card_info.bank_region" :label="$t('detail.huaxiaindex.5um3iwhsj2k0')">
                            <a-select v-if="form.setup" v-model:model-value="form.data.open_bank_card_info.bank_region" allow-search :placeholder="$t('detail.huaxiaindex.5um3iwhsj4o0')" @change='getbankRegion'>
                                <a-option v-for="item in useEnums('otc.account.bankRegion')" :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                            <div v-else>{{ useEnumsFormat('otc.account.bankRegion',form.data.open_bank_card_info.bank_region)  }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="open_bank_card_info.bank_code" :label="$t('detail.huaxiaindex.5um3iwhsj740')">
                            <a-select  v-if="form.setup" v-model:model-value="form.data.open_bank_card_info.bank_code" allow-search :placeholder="$t('detail.huaxiaindex.5um3iwhsj980')"
                                :field-names="{ value: 'bankCode', label: 'account' }" @search="getBankList" :filter-option="true"
                                :show-extra-options="false">
                                <a-option v-for="item in form.bankList" :value="item.bankCode">
                                    {{ item.bankFullName }}({{ item.bankCode }})
                                </a-option>
                            </a-select>
                            <div v-else>{{ bankName }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="open_bank_card_info.currency_list" :label="$t('detail.huaxiaindex.5um3iwhsjbw0')">
                            <a-select  v-if="form.setup" multiple allow-clear v-model="form.data.open_bank_card_info.currency_list" :placeholder="$t('detail.huaxiaindex.5um3iwhsje40')">
                                <a-option v-for="item in useEnums('currency')" :value="item.value">{{item.trans[local.lang] }}</a-option>
                            </a-select>
                            <div v-else>{{ form.data.open_bank_card_info.currency_list.join(',') }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="id_card" :label="$t('detail.huaxiaindex.5um3iwhsjg80')">
                            <a-input v-if="form.setup"  v-model="form.data.id_card" :placeholder="$t('detail.huaxiaindex.5um3iwhsjj00')" />
                            <div v-else>{{ form.data.id_card }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="detail_address" :label="$t('detail.huaxiaindex.5um3iwhsjko0')">
                            <a-input v-if="form.setup"  v-model="form.data.detail_address" :placeholder="$t('detail.huaxiaindex.5um3iwhsjmo0')" />
                            <div v-else>{{ form.data.detail_address }}</div>
                        </a-form-item>
                    </a-col>
                </a-row>

            </a-form>
        </a-card>
        <div style="margin-top:20px;display:flex;flex-wrap: wrap;">
            <a-space size="large">
                <a-card v-for="item in form.data.asset_account_asset_list" :loading="loading">
                    <template #title>
                        {{  item.currency == 'HKD'?$t('detail.huaxiaindex.5um3iwhsjo00'):item.currency == 'USD'?$t('detail.huaxiaindex.5um3iwhsjq80'):item.currency == 'CNY'?'人民币资产':'其他资产' }}
                    </template>
                    <a-space size="large">
                        <a-statistic :title="$t('detail.huaxiaindex.5um3iwhsjro0')" :precision="4"
                            :value="Number(item?.usable_cash || 0)"
                            show-group-separator />
                        <a-statistic :title="$t('detail.huaxiaindex.5um3iwhsjtk0')" :precision="4"
                            :value="Number(item?.freeze_cash || 0)"
                            show-group-separator />
                    </a-space>
                </a-card>
            </a-space>
        </div>
        <a-card style="margin: 20px 0;" :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('detail.huaxiaindex.5um3iwhsjv40')}}
                    </a-space>
                </div>
            </template>
            <a-row :gutter="[16, 16]">
                <a-col :xs="24">
                    <div class="title">{{$t('detail.huaxiaindex.5um3iwhsjwk0')}}</div>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6">
                    <a-card hoverable class="button" @click="router.push({ name: 'otcAccountDetailAssure', query: { create: 1 } })">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('detail.huaxiaindex.5um3iwhsjxw0')}}
                        </a-space>
                    </a-card>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums,useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const route = useRoute()
const router = useRouter()
const local = useLocal()
const formRef = ref()
const { t } = useI18n();
const loading = ref(false)
const bankName = ref("")
const form:any = reactive({
    show: false,
    loading: false,
    setup:false,
    bankList:[],
    data: {
        id:'',
        account: '',
        charge_package_id: '',
        real_name: '',
        english_name: '',
        country_code: '',
        mobile: '',
        email: '',
        detail_address:"",
        id_card:"",
        create_time: 0,
        status: 1,
        open_bank_card_info:{},
        asset_account_asset_list: [{
            currency: "CNY",
            freeze_cash: 0,
            usable_cash: 0
        }, {
            currency: "HKD",
            freeze_cash: 0,
            usable_cash: 0
        }, {
            currency: "USD",
            freeze_cash: 0,
            usable_cash: 0
        }]
    },
    rules: {
        real_name: [{ required: true, message: t('detail.huaxiaindex.5um3iwhsiko0') }],
        english_name: [{ required: true, message: t('detail.huaxiaindex.5um3iwhsiog0') }],
        email: [{ required: true, message: t('detail.huaxiaindex.5um3iwhsiv80') }, { type: 'email', message: t('detail.huaxiaindex.5um3iwhsjzc0') }],
        'open_bank_card_info.bank_region': [{required:true,message:t('detail.huaxiaindex.5um3iwhsk0o0')}],
        'open_bank_card_info.bank_code': [{required:true,message:t('detail.huaxiaindex.5um3iwhsk240')}],
        'open_bank_card_info.bank_account': [{required:true,message:t('detail.huaxiaindex.5um3iwhsk3o0')}],
        'open_bank_card_info.currency_list': [{required:true,message:t('detail.huaxiaindex.5um3iwhsje40')}],
        detail_address: [{required:true,message:t('detail.huaxiaindex.5um3iwhsjmo0')}],
        id_card: [{required:true,message:t('detail.huaxiaindex.5um3iwhsjj00')}],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiOtc.accountUpdate({
        id:form.data.id,
        data:{
            charge_package_id:form.data.charge_package_id,
            real_name:form.data.real_name,
            english_name:form.data.english_name,
            email:form.data.email,
            id_card:form.data.id_card,
            detail_address:form.data.detail_address,
            extra:{
                bank_card:{
                    id:form.data.open_bank_card_info.id,
                    bank_code:form.data.open_bank_card_info.bank_code,
                    bank_account:form.data.open_bank_card_info.bank_account,
                    bank_region:form.data.open_bank_card_info.bank_region,
                    currency_list:form.data.open_bank_card_info.currency_list,
                    from:form.data.open_bank_card_info.from
                }
            }
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    form.setup = false
    getData()
}
const getbankRegion = () =>{
    getBankList('')
    form.data.open_bank_card_info.bank_code = ''
}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiOtc.huaxiaAccountInfo({
        id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
    let currency:any = []
    bankName.value = form.bankList.find((item:any) => item.bankCode == data.open_bank_card_info.bank_code)?.bankName
    if (data.open_bank_card_info.currency_list.length) {
        data.open_bank_card_info.currency_list.forEach((item:any) => currency.push(item.currency)) 
    }
    data.open_bank_card_info.currency_list = currency
}
const getBankList = async (value: string) => {
    const { code, data } = await apiSystem.bankList({
        bankName: value,
        bankRegion:form.data.open_bank_card_info.bank_region,
    })
    if (code != 1) return;
    form.bankList = data?.list
}
{
    getBankList('')
    getData()
}
</script>
<style lang="less" scoped>
.title{
    line-height: 26px;
    position: relative;
    padding-left: 10px;
    &::before{
        position: absolute;
        content: '';
        width: 3px;
        height: 100%;
        left: 0;
        background-color: rgb(var(--arcoblue-6));
    }
}
.arco-row{
    margin-top: 10px !important;
    +.arco-row{
        margin-top: 25px !important;
    }
}
.button{
    cursor: pointer;
    :hover{
        color: rgb(var(--arcoblue-6)) !important;
    }
}
</style>