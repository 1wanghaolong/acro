<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="asset_account_id" :label="$t('payment.create.5um3mdo8j3w0')" :rules="[{ required: true, message: $t('payment.create.5um3mok7jd40') }]">
                    <a-select @change="getClientBankCardList" v-model:model-value="form.data.asset_account_id" allow-search :placeholder="$t('payment.create.5um3mdo8juw0')"
                        :options="form.accountList" :field-names="{ value: 'id', label: 'account' }" @search="getAccountList"
                        :filter-option="true" :show-extra-options="false" />
                </a-form-item>
                <a-form-item field="currency" :label="$t('payment.create.5um3mdo8k280')">
                    <a-select @change="form.data.type = 1;getSystemBankCardList();getClientBankCardList()" v-model="form.data.currency" :placeholder="$t('payment.create.5um3mdo8k7k0')">
                        <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                            item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="amount" :label="$t('payment.create.5um3mdo8kd00')" :rules="[{ required: true, message: $t('payment.create.5um3mdo8ki00') }]">
                    <a-input-number v-model="form.data.amount" :placeholder="$t('payment.create.5um3mdo8ki00')" />
                </a-form-item>
                <a-form-item field="type" :label="$t('payment.create.5um3mdo8kmw0')">
                    <a-select @change="getSystemBankCardList()" v-model="form.data.type" :placeholder="$t('payment.create.5um3mdo8k7k0')">
                        <a-option v-for="item in useEnums('otc.account.payment.type')?.filter((item:any)=>form.data.currency == 'HKD'?true:item.value<3)" :value="item.value">{{
                            item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="attr" :label="$t('payment.create.5um3mdo8ks00')" v-if="form.data.type == 1">
                    <a-textarea v-model="form.data.attr" :placeholder="$t('payment.create.5um3mdo8kx40')" allow-clear/>
                </a-form-item>
                <a-form-item field="asset_account_bank_card_id" :label="$t('payment.create.5um3mdo8l2c0')" v-if="form.data.type != 1" :rules="[{ required: true, message: $t('payment.create.5um3mok7juo0') }]">
                    <a-select v-model="form.data.asset_account_bank_card_id" :placeholder="$t('payment.create.5um3mdo8k7k0')">
                        <a-option v-for="item in form.clientBankCardList" :value="item.id">{{ item.bank_account }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="system_bank_card_id" :label="$t('payment.create.5um3mdo8l700')" v-if="form.data.type != 1" :rules="[{ required: true, message: $t('payment.create.5um3mok7juo0') }]">
                    <a-select v-model="form.data.system_bank_card_id" :placeholder="$t('payment.create.5um3mdo8k7k0')">
                        <a-option v-for="item in form.systemBankCardList" :value="item.id">{{ item.bank_full_name }}({{ item.bank_code }})</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="voucher" :label="$t('payment.create.5um3mdo8lbs0')" v-if="form.data.type != 1" :rules="[{ required: form.data.type != 4, message: $t('payment.create.5um3mok7juo0') }]">
                    <a-upload draggable image-preview :auto-upload="true" v-model:file-list="form.data.voucher"
                        :custom-request="(upload as any)">
                    </a-upload>
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="formRef?.resetFields()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('payment.create.5um3mdo8lyk0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('payment.create.5um3mdo8maw0')}}
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
const local = useLocal()
const route = useRoute()
const { t } = useI18n();
const router = useRouter()
const formRef = ref()
const form:any = reactive({
    show: false,
    loading: false,
    accountList: [],
    systemBankCardList:[],
    clientBankCardList:[],
    data: {
        asset_account_id: '' as any,
        currency: '',
        amount:0,
        type:1,
        attr:'',
        voucher:[],
        system_bank_card_id:'',
        asset_account_bank_card_id:''
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    if (!form.data.amount) {
        Message.info({ content: t('payment.create.5um3mdo8me80') })
        return
    }
    form.loading = true
    const { code, msg } = await apiOtc.accountChargePaymentApply({
        // data: {
            ...form.data,
            voucher:form.data.voucher?.map((item:any)=>item.response?.url)?.join(),
            system_bank_card_id:Number(form.data.system_bank_card_id),
            asset_account_bank_card_id:Number(form.data.asset_account_bank_card_id)
        // }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const getAccountList = async (value: string) => {
    const { code, data } = await apiOtc.accountList(useFilter({
        account: value,
        status: 1
    }))
    if (code != 1) return;
    form.accountList = data.list
    if (route.query?.account) {
        form.data.asset_account_id = form.accountList[0].id
    }
}
const getSystemBankCardList = async () => {
    const { code, data } = await apiOtc.systemBankCardList(useFilter({
        currency:form.data.currency,
        payment_type:form.data.type
    }))
    if (code != 1) return;
    form.systemBankCardList = data.list
    form.data.type == 1?form.data.system_bank_card_id = '':form.data.system_bank_card_id = data.list?.[0]?.id || ''
}
const getClientBankCardList = async () => {
    const { code, data } = await apiOtc.clientBankCardAllList(useFilter({
        currency:form.data.currency,
        asset_account_id:form.data.asset_account_id
    }))
    if (code != 1) return;
    form.clientBankCardList = data?.length?data:[]
    form.data.type == 1?form.data.asset_account_bank_card_id = '':form.data.asset_account_bank_card_id = data?.[0]?.id || ''
}

const upload = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const formData = new FormData()
    formData.append('file', fileItem.file)
    const { code, data } = await apiSystem.upload(formData)
    if (code != 1) return onError();
    onSuccess(data);
}
onMounted(()=>{ 
    route.query?.account ? getAccountList(''+route.query?.account) : ""
})
{
    getSystemBankCardList()
    getClientBankCardList()
}
</script>