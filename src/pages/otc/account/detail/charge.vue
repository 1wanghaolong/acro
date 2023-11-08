<template>
    <div>
        <a-card :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('detail.charge.5um3jy771ak0')}}
                    </a-space>
                    <a-space :size="18">
                        <a-button v-if="form.setup" @click="form.setup = false;getData()">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            {{$t('detail.charge.5um3jy771rs0')}}
                        </a-button>
                        <a-button v-if="form.setup" @click="submit" type="primary" :loading="form.loading" :disabled="form.loading">
                            <template #icon>
                                <icon-save />
                            </template>
                            {{$t('detail.charge.5um3jy771uw0')}}
                        </a-button>
                        <a-button v-permission="['otcAccountDetailChargeUpdate']" v-if="!form.setup" @click="form.setup = true" type="primary">
                            <template #icon>
                                <icon-edit />
                            </template>
                            {{$t('detail.charge.5um3jy771x40')}}
                        </a-button>
                    </a-space>
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical"
                @submit="submit">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="email" :label="$t('detail.charge.5um3jy771z80')">
                            <a-select v-if="form.setup" allow-clear v-model="form.data.charge_package_id" :placeholder="$t('detail.charge.5um3jy7721o0')">
                                <a-option v-for="item in chargePackageList" :value="item.id">
                                    {{ item.name }}
                                </a-option> 
                            </a-select>
                            <div v-else>{{ form.data.charge_package_info?.name }}</div>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
        <a-card :loading="loading" style="margin-top: 20px;">
            <template #title v-if="useEnums('currency')?.length>1">
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        <a-radio-group type="button" v-model="charge.currency">
                            <a-radio v-for="item in useEnums('currency')" :value="item.value">{{ item.trans[local.lang] }}</a-radio>
                        </a-radio-group>
                    </a-space>
                </div>
            </template>
            <a-table :bordered="false" column-resizable :pagination="false" :loading="charge.loading"
                    :scroll="{ x: '100%', y: '100%' }" size="small" :data="charge.list?.filter((item:any)=>(item.currency == charge.currency))" class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.charge.5um3jy7723s0')">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('otc.account.type',record.type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.charge.5um3jy7725o0')">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('otc.account.calculate_type',record.calculate_type) }}</div>
                                <div>{{Number(record.calculate_value)}}{{ record.calculate_type == 1 ? $t('detail.charge.5umz6ud64ck0'): record.calculate_type == 2 ? $t('detail.charge.5umz6mo9dlw0') : $t('detail.charge.5umz6mo9or40')}}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.charge.5um3jy7727w0')">
                            <template #cell="{ record }">
                                <div>{{$t('detail.charge.5um3ka99bgw0')}}:{{ Number(record.max) }}</div>
                                <div>{{$t('detail.charge.5um3ka99bz00')}}:{{ Number(record.min) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.charge.5um3jy772a40')">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('otc.account.round_type',record.round_type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.charge.5um3jy772bw0')" data-index="round_precision"></a-table-column>
                    </template>
                </a-table>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat,useEnums } from '@/hooks/enums'
const chargePackageList = ref()
const local = useLocal()
const route = useRoute()
const formRef = ref()
const { t } = useI18n();
const loading = ref(false)
const charge = reactive({
    list:[],
    loading:false,
    currency:useEnums('currency')?.[0].value
})
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
        create_time: 0,
        status: 1,
        charge_package_info:{
            name:''
        },
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
        real_name: [{ required: true, message: t('detail.charge.5um3jy772ec0') }],
        english_name: [{ required: true, message: t('detail.charge.5um3jy772gk0') }],
        email: [{ required: true, message: t('detail.charge.5um3jy772io0') }, { type: 'email', message: t('detail.charge.5um3jy772ko0') }]
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiOtc.accountUpdate({
        id:form.data.id,
        data:{
            charge_package_id:form.data.charge_package_id
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
    getChargeAll()
}
const getChargePackage = async () => {
    const { code,data } = await apiOtc.chargePackageAll(useFilter({
        status:1
    }))
    if(code != 1) return;
    chargePackageList.value = data?.length?data:[]
}
const getChargeAll = async () => {
    charge.loading = true
    const { code,data } = await apiOtc.accountChargeAll(useFilter({
        "charge_package_id":form.data.charge_package_id
    }))
    charge.loading = false
    if(code != 1) return;
    charge.list = data?.length?data || form.data.charge_package_id:[]
}

{
    getData()
    getChargePackage()
}
</script>