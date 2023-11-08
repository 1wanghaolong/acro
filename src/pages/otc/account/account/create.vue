<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical" :style="{ maxWidth: '600px',margin:'auto' }" @submit="submit">
                <a-form-item field="account" :label="$t('account.create.5um3f9vb91s0')">
                    <a-input v-model="form.data.account" :placeholder="$t('account.create.5um3f9vb9jg0')" />
                </a-form-item>
                <a-form-item field="real_name" :label="$t('account.create.5um3f9vb9n00')">
                    <a-input v-model="form.data.real_name" :placeholder="$t('account.create.5um3f9vb9ow0')" />
                </a-form-item>
                <a-form-item field="english_name" :label="$t('account.create.5um3f9vb9qo0')">
                    <a-input v-model="form.data.english_name" :placeholder="$t('account.create.5um3f9vb9t00')" />
                </a-form-item>
                <a-form-item field="country_code" :label="$t('account.create.5um3f9vb9v40')">
                    <a-select allow-search allow-clear v-model="form.data.country_code" :placeholder="$t('account.create.5um3f9vb9x80')">
                        <a-option v-for="item in countryCodeList" :value="item.country_code">
                            {{ item.country_code }} {{ item.name }} {{ item.country_label }}
                        </a-option> 
                    </a-select>
                </a-form-item>
                <a-form-item field="mobile" :label="$t('account.create.5um3f9vb9zc0')">
                    <a-input v-model="form.data.mobile" :placeholder="$t('account.create.5um3f9vba1c0')" />
                </a-form-item>
                <a-form-item field="extra.bank_card.bank_region" :label="$t('account.create.5um3f9vba400')" v-if='viteItemName == "hx"'>
                    <a-select v-model:model-value="form.data.extra.bank_card.bank_region" allow-search :placeholder="$t('account.create.5um3f9vba600')" @change='getbankRegion'>
                        <a-option v-for="item in useEnums('otc.account.bankRegion')" :value="item.value">
                            {{ item.trans[local.lang] }}
                        </a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="extra.bank_card.bank_code" :label="$t('account.create.5um3f9vba980')" v-if='viteItemName == "hx"'>
                    <a-select :disabled='!form.data.extra.bank_card.bank_region' v-model:model-value="form.data.extra.bank_card.bank_code" allow-search :placeholder="$t('account.create.5um3f9vbabc0')"
                        :field-names="{ value: 'bankCode', label: 'account' }" @search="getBankList" :filter-option="true"
                        :show-extra-options="false">
                        <a-option v-for="item in form.bankList" :value="item.bankCode">
                            {{ item.bankFullName }}({{ item.bankCode }})
                        </a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="extra.bank_card.bank_account" :label="$t('account.create.5um3f9vbadk0')" v-if='viteItemName == "hx"'>
                    <a-input v-model="form.data.extra.bank_card.bank_account" :placeholder="$t('account.create.5um3f9vbafw0')" />
                </a-form-item>
                <a-form-item field="extra.bank_card.currency_list" :label="$t('account.create.5um3f9vbai80')" v-if='viteItemName == "hx"'>
                    <a-select multiple allow-clear v-model="form.data.extra.bank_card.currency_list" :placeholder="$t('account.create.5um3f9vbalg0')">
                        <a-option v-for="item in useEnums('currency')" :value="item.value">{{item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="id_card" :label="$t('account.create.5um3f9vbano0')" v-if='viteItemName == "hx"'>
                    <a-input v-model="form.data.id_card" :placeholder="$t('account.create.5um3f9vbar40')" />
                </a-form-item>
                <a-form-item field="detail_address" :label="$t('account.create.5um3f9vbavk0')" v-if='viteItemName == "hx"'>
                    <a-textarea v-model="form.data.detail_address" :placeholder="$t('account.create.5um3f9vbaxk0')" />
                </a-form-item>
                <a-form-item field="email" :label="$t('account.create.5um3f9vbb000')">
                    <a-input v-model="form.data.email" :placeholder="$t('account.create.5um3f9vbb240')" />
                </a-form-item>
                <a-form-item allow-search field="charge_package_id" :label="$t('account.create.5um3f9vbb3s0')">
                    <a-select allow-clear v-model="form.data.charge_package_id" :placeholder="$t('account.create.5um3f9vbb5k0')">
                        <a-option v-for="item in chargePackageList" :value="item.id">
                            {{ item.name }}
                        </a-option> 
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="formRef?.resetFields()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('account.create.5um3f9vbb7k0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('account.create.5um3f9vbb9s0')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
const route = useRoute()
const router = useRouter()
const formRef = ref()
const local = useLocal()
const { t } = useI18n();
const chargePackageList = ref()
const countryCodeList = ref()
const viteItemName = import.meta.env.VITE_ITEM_NAME || ""
const form:any = reactive({
    show: false,
    loading: false,
    bankList: [],
    data: {
        account: '',
        charge_package_id: '',
        real_name: '',
        english_name: '',
        country_code: '',
        id_card:"",
        detail_address:"",
        extra:{
            bank_card:{
                bank_region:"",
                bank_code:"",
                bank_account:"",
                currency_list:[],
                from:1
            }
        },
        mobile: "" as any,
        email: ''
    },
    rules:{
        account:[{required:true,message:t('account.create.5um3f9vb9jg0')}],
        charge_package_id:[{required:true,message:t('account.create.5um3f9vbbco0')}],
        real_name: [{required:true,message:t('account.create.5um3f9vb9ow0')}],
        english_name: [{required:true,message:t('account.create.5um3f9vb9t00')}],
        mobile: [{required:true,message:t('account.create.5um3f9vba1c0')}],
        country_code: [{required:true,message:t('account.create.5um3f9vbbe80')}],
        'extra.bank_card.bank_region': [{required:true,message:t('account.create.5um3f9vba600')}],
        'extra.bank_card.bank_code': [{required:true,message:t('account.create.5um3f9vba980')}],
        'extra.bank_card.bank_account': [{required:true,message:t('account.create.5um3f9vbafw0')}],
        'extra.bank_card.currency_list': [{required:true,message:t('account.create.5um3f9vbalg0')}],
        id_card: [{required:true,message:t('account.create.5um3f9vbar40')}],
        detail_address: [{required:true,message:t('account.create.5um3f9vbaxk0')}],
        email: [{required:true,message: t('account.create.5um3f9vbb240') },{type:'email',message: t('account.create.5um3gcmt8nk0') }]
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code,msg } = await apiOtc.accountCreate({
        data:{
            ...form.data
        }
    })
    form.loading = false
    if(code != 1) return;
    Message.success({content:msg})
    router.back()
}
const getChargePackage = async () => {
    const { code,data } = await apiOtc.chargePackageAll(useFilter({
        status:1
    }))
    if(code != 1) return;
    chargePackageList.value = data
}
const getCountryCode = async () => {
    const { code,data } = await apiSystem.countryCodeList()
    if(code != 1) return;
    countryCodeList.value = data.map((item:any)=>{
        item.country_code = `+${item.country_code}`
        return item
    })
}
const getbankRegion = () =>{
    getBankList('')
    form.data.extra.bank_card.bank_code = ""
}
const getBankList = async (value: string) => {
    const { code, data } = await apiSystem.bankList({
        bankName: value,
        bankRegion:form.data.extra.bank_card.bank_region,
    })
    if (code != 1) return;
    form.bankList = data?.list
}
onMounted(()=>{
    form.data.mobile =  route.query?.mobile || ""
})

{
    getChargePackage()
    getCountryCode()
}
</script>
<style scoped>
:deep(.arco-select-view-disabled) {
  color: var(--color-text-1);
  background-color: var(--color-fill-2);
}
:deep(.arco-input-wrapper.arco-input-disabled) {
  color: var(--color-text-1);
  background-color: var(--color-fill-2);
}
</style>