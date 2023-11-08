<template>
    <div>
        <a-card :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('detail.otcindex.5um3husv1ts0')}}
                    </a-space>
                    <a-space :size="18">
                        <a-button v-if="form.setup" @click="form.setup = false;getData()">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            {{$t('detail.otcindex.5um3husv28k0')}}
                        </a-button>
                        <a-button v-if="form.setup" @click="submit" type="primary" :loading="form.loading" :disabled="form.loading">
                            <template #icon>
                                <icon-save />
                            </template>
                            {{$t('detail.otcindex.5um3husv2c40')}}
                        </a-button>
                        <a-button v-if="!form.setup" @click="form.setup = true" type="primary">
                            <template #icon>
                                <icon-edit />
                            </template>
                            {{$t('detail.otcindex.5um3husv2eg0')}}
                        </a-button>
                    </a-space>
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical"
                @submit="submit">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="account" :label="$t('detail.otcindex.5um3husv2gg0')">
                            {{ form.data.account }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="real_name" :label="$t('detail.otcindex.5um3husv2is0')">
                            <a-input v-if="form.setup" v-model="form.data.real_name" :placeholder="$t('detail.otcindex.5um3husv2lc0')" />
                            <div v-else>{{ form.data.real_name }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="english_name" :label="$t('detail.otcindex.5um3husv2nc0')">
                            <a-input v-if="form.setup" v-model="form.data.english_name" :placeholder="$t('detail.otcindex.5um3husv2pc0')" />
                            <div v-else>{{ form.data.english_name }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="email" :label="$t('detail.otcindex.5um3husv2r40')">
                            <a-input v-if="form.setup" v-model="form.data.email" :placeholder="$t('detail.otcindex.5um3husv2ss0')" />
                            <div v-else>{{ form.data.email }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="country_code" :label="$t('detail.otcindex.5um3husv2us0')">
                            <a-tag size="small" :color="form.data.status == 1?'#00b42a':'#f53f3f'">
                                {{useEnumsFormat('otc.account.status',form.data.status)}}
                            </a-tag>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('detail.otcindex.5um3husv2x40')">
                            {{ dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if='viteItemName == "hx"'>
                        <a-form-item field="address" :label="$t('detail.otcindex.5um3husv2z00')">
                            <a-input v-if="form.setup" v-model="form.data.address" :placeholder="$t('detail.otcindex.5um3husv31o0')" />
                            <div v-else>{{ form.data.address }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if='viteItemName == "hx"'>
                        <a-form-item field="openingCode" :label="$t('detail.otcindex.5um3husv33k0')">
                            <a-input v-if="form.setup" v-model="form.data.openingCode" :placeholder="$t('detail.otcindex.5um3husv35c0')" />
                            <div v-else>{{ form.data.openingCode }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if='viteItemName == "hx"'>
                        <a-form-item field="openingNumber" :label="$t('detail.otcindex.5um3husv3740')">
                            <a-input v-if="form.setup" v-model="form.data.openingNumber" :placeholder="$t('detail.otcindex.5um3husv38w0')" />
                            <div v-else>{{ form.data.openingNumber }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if='viteItemName == "hx"'>
                        <a-form-item field="currency" :label="$t('detail.otcindex.5um3husv3b00')">
                            <a-select v-if="form.setup" allow-clear v-model="form.data.currency" :placeholder="$t('detail.otcindex.5um3husv3ds0')">
                                <a-option v-for="item in useEnums('currency')" :value="item.value">{{item.trans[local.lang] }}</a-option>
                            </a-select>
                            <div v-else>{{ form.data.currency }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if='viteItemName == "hx"'>
                        <a-form-item field="card" :label="$t('detail.otcindex.5um3husv3g80')">
                            <a-input v-if="form.setup"  v-model="form.data.card" :placeholder="$t('detail.otcindex.5um3husv3i40')" />
                            <div v-else>{{ form.data.card }}</div>
                        </a-form-item>
                    </a-col>
                </a-row>

            </a-form>
        </a-card>
        <div style="margin-top:20px;display:flex;flex-wrap: wrap;">
            <a-space size="large">
                <a-card v-for="item in form.data.asset_account_asset_list" :loading="loading">
                    <template #title>
                        {{  item.currency == 'HKD'?$t('detail.otcindex.5um3husv3jk0'):item.currency == 'USD'?$t('detail.otcindex.5um3husv3lc0'):item.currency == 'CNY'? $t('detail.otcindex.5uns40jxpi40') : $t('detail.otcindex.5uns40jxqv80') }}
                    </template>
                    <a-space size="large">
                        <a-statistic :title="$t('detail.otcindex.5um3husv3mo0')" :precision="4"
                            :value="Number(item?.usable_cash || 0)"
                            show-group-separator />
                        <a-statistic :title="$t('detail.otcindex.5um3husv3o00')" :precision="4"
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
                        {{$t('detail.otcindex.5um3husv3pc0')}}
                    </a-space>
                </div>
            </template>
            <a-row :gutter="[16, 16]">
                <a-col :xs="24">
                    <div class="title">{{$t('detail.otcindex.5um3husv3qs0')}}</div>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6">
                    <a-card hoverable class="button" @click="router.push({ name: 'otcAccountDetailAssure', query: { create: 1 } })">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('detail.otcindex.5um3husv3t00')}}
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
const { t } = useI18n();
const formRef = ref()
const loading = ref(false)
const viteItemName = import.meta.env.VITE_ITEM_NAME || ""
const Validator = (value:any,callback:any) =>{
  if (!value) {
    return;
  }
  let zc:any = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g
  if (!zc.test(value)) {
    callback(t('detail.otcindex.5um3husv3ug0'))
    return
  }
  return true
}
const form = reactive({
    show: false,
    loading: false,
    setup:false,
    data: {
        id:'',
        account: '',
        charge_package_id: '',
        real_name: '',
        english_name: '',
        country_code: '',
        mobile: '',
        email: '',
        address:"",
        openingCode:"",
        openingNumber:"",
        card:"",
        currency:"",
        create_time: 0,
        status: 1,
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
        real_name: [{ required: true, message: t('detail.otcindex.5um3husv2lc0') }],
        english_name: [{ required: true, message: t('detail.otcindex.5um3husv2pc0') }],
        email: [{ required: true, message: t('detail.otcindex.5um3husv2ss0') }, { type: 'email', message: t('detail.otcindex.5um3husv3w40') }],
        address: [{required:true,message:t('detail.otcindex.5um3husv31o0')}],
        openingCode: [{required:true,message:t('detail.otcindex.5um3husv35c0')}],
        currency: [{required:true,message:t('detail.otcindex.5um3husv3y40')}],
        openingNumber: [{required:true,message:t('detail.otcindex.5um3husv38w0')}],
        card: [{required:true,message:t('detail.otcindex.5um3husv3i40')},{validator:Validator}],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiOtc.accountUpdate({
        id:form.data.id,
        data:{
            real_name:form.data.real_name,
            english_name:form.data.english_name,
            email:form.data.email
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    form.setup = false
    getData()
}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiOtc.accountInfo({
        id: route.params?.id
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