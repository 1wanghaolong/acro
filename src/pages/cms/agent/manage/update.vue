<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ margin: 'auto' }" @submit="submit">
                    <a-form-item>
                        <h3>{{$t('manage.update.5uli8ryem9k0')}}</h3>
                    </a-form-item>
                    <a-form-item field="agent_name" :label="$t('manage.update.5uli8ryeysw0')">
                        <a-input v-model="form.data.agent_name" :placeholder="$t('manage.update.5uli8ryez2g0')" />
                    </a-form-item>
                    <a-form-item field="country_code" :label="$t('manage.update.5uli8ryez7c0')">
                        <a-select allow-search allow-clear v-model="form.data.country_code" :placeholder="$t('manage.update.5uli8ryezcc0')">
                            <a-option v-for="item in countryCodeList" :value="item.country_code">
                                {{ item.country_code }} {{ item.name }} {{ item.country_label }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="mobile" :label="$t('manage.update.5uli8ryezh80')">
                        <a-input v-model="form.data.mobile" :placeholder="$t('manage.update.5uli8ryezm80')" />
                    </a-form-item>
                    <a-form-item field="email" :label="$t('manage.update.5uli8ryezq00')">
                        <a-input v-model="form.data.email" :placeholder="$t('manage.update.5uli8ryezuw0')" />
                    </a-form-item>
                    <a-form-item field="status" :label="$t('manage.update.5uli8ryezyw0')">
                        <a-radio v-model="form.data.status">{{$t('manage.update.5uli8ryf0300')}}</a-radio>
                    </a-form-item>
                    <a-divider />
                    <!-- 港股 -->
                    <a-form-item style="margin-top:0">
                        <div>
                            <h3>{{$t('manage.update.5uli8ryf0700')}}</h3>
                            <p style="margin-top:10px">{{$t('manage.update.5uli8ryf0g40')}}</p>
                        </div>
                    </a-form-item>
                    <a-form-item field="configCommissionHK.charge_value" :label="$t('manage.update.5uli8ryf0mw0')">
                        <div>
                            <a-input-number v-model="form.data.configCommissionHK.charge_value" hide-button
                                :style="{ width: '256px' }" allow-clear>
                                <template #suffix>
                                    % × {{$t('manage.update.5uli8ryf0r80')}}
                                </template>
                            </a-input-number>
                            <a-input-number v-model="form.data.configCommissionHK.limit_max" hide-button
                                :style="{ width: '256px', 'margin': '0 15px' }" allow-clear>
                                <template #prefix>
                                    {{$t('manage.update.5uli8ryf0vc0')}}
                                </template>
                                <template #suffix>
                                    HKD/{{ $t('manage.create.5ulhxb0ib9o0') }}
                                </template>
                            </a-input-number>
                            <a-input-number v-model="form.data.configCommissionHK.limit_min" hide-button
                                :style="{ width: '256px' }" allow-clear>
                                <template #prefix>
                                    {{$t('manage.update.5uli8ryf0zo0')}}
                                </template>
                                <template #suffix>
                                    HKD/{{ $t('manage.create.5ulhxb0ib9o0') }}
                                </template>
                            </a-input-number>
                        </div>
                    </a-form-item>
                    <a-form-item field="configPlatformHK.charge_value" :label="$t('manage.update.5uli8ryf13k0')">
                        <div>
                            <a-input-number v-model="form.data.configPlatformHK.charge_value" hide-button
                                :style="{ width: '256px' }" allow-clear>
                                <template #suffix>
                                    HKD/{{ $t('manage.create.5ulhxb0isb80') }}
                                </template>
                            </a-input-number>
                        </div>
                    </a-form-item>
                    <a-form-item>
                        <div>
                            <h3>{{$t('manage.update.5uli8ryf1800')}}</h3>
                            <p style="margin-top:10px">{{$t('manage.update.5uli8ryf1c80')}}</p>
                        </div>
                    </a-form-item>
                    <a-form-item field="configCommissionHK.commission_rate" :label="$t('manage.update.5uli8ryf1hk0')">
                        <a-input-number placeholder="0" v-model="form.data.configCommissionHK.commission_rate" hide-button
                            allow-clear>
                            <template #prefix>
                                %
                            </template>
                        </a-input-number>
                    </a-form-item>
                    <a-form-item field="configPlatformHK.commission_rate" :label="$t('manage.update.5uli8ryf1m40')">
                        <a-input-number placeholder="0" v-model="form.data.configPlatformHK.commission_rate" hide-button
                            allow-clear>
                            <template #prefix>
                                %
                            </template>
                        </a-input-number>
                    </a-form-item>
                    <a-divider />
                    <!-- 美股 -->
                    <a-form-item style="margin-top:0">
                        <div>
                            <h3>{{$t('manage.update.5uli8ryf1po0')}}</h3>
                            <p style="margin-top:10px">{{$t('manage.update.5uli8ryf0g40')}}</p>
                        </div>
                    </a-form-item>
                    <a-form-item field="configCommissionUS.charge_value" :label="$t('manage.update.5uli8ryf0mw0')">
                        <div>
                            <a-input-number v-model="form.data.configCommissionUS.charge_value" hide-button
                                :style="{ width: '256px' }" allow-clear>
                                <template #suffix>
                                    USD/{{ $t('manage.create.5ulhxb0isp80') }}
                                </template>
                            </a-input-number>
                            <a-input-number v-model="form.data.configCommissionUS.limit_max" hide-button
                                :style="{ width: '256px', 'margin': '0 15px' }" allow-clear>
                                <template #prefix>
                                    {{$t('manage.update.5uli8ryf0vc0')}}
                                </template>
                                <template #suffix>
                                    USD/{{ $t('manage.create.5ulhxb0ib9o0') }}
                                </template>
                            </a-input-number>
                            <a-input-number v-model="form.data.configCommissionUS.limit_min" hide-button
                                :style="{ width: '256px' }" allow-clear>
                                <template #prefix>
                                    {{$t('manage.update.5uli8ryf0zo0')}}
                                </template>
                                <template #suffix>
                                    USD/{{ $t('manage.create.5ulhxb0ib9o0') }}
                                </template>
                            </a-input-number>
                        </div>
                    </a-form-item>
                    <a-form-item field="configPlatformUS.charge_value" :label="$t('manage.update.5uli8ryf13k0')">
                        <div>
                            <a-input-number v-model="form.data.configPlatformUS.charge_value" hide-button
                                :style="{ width: '256px' }" allow-clear>
                                <template #suffix>
                                    USD/{{ $t('manage.create.5ulhxb0isp80') }}
                                </template>
                            </a-input-number>
                            <a-input-number v-model="form.data.configPlatformUS.limit_max" hide-button
                                :style="{ width: '256px', 'margin': '0 15px' }" allow-clear>
                                <template #prefix>
                                    {{$t('manage.update.5uli8ryf0vc0')}}
                                </template>
                                <template #suffix>
                                    USD/{{ $t('manage.create.5ulhxb0ib9o0') }}
                                </template>
                            </a-input-number>
                            <a-input-number v-model="form.data.configPlatformUS.limit_min" hide-button
                                :style="{ width: '256px' }" allow-clear>
                                <template #prefix>
                                    {{$t('manage.update.5uli8ryf0zo0')}}
                                </template>
                                <template #suffix>
                                    USD/{{ $t('manage.create.5ulhxb0ib9o0') }}
                                </template>
                            </a-input-number>
                        </div>
                    </a-form-item>
                    <a-form-item>
                        <div>
                            <h3>{{$t('manage.update.5uli8ryf1sk0')}}</h3>
                            <p style="margin-top:10px">{{$t('manage.update.5uli8ryf1c80')}}</p>
                        </div>
                    </a-form-item>
                    <a-form-item field="configCommissionUS.commission_rate" :label="$t('manage.update.5uli8ryf1hk0')">
                        <a-input-number placeholder="0" v-model="form.data.configCommissionUS.commission_rate" hide-button
                            allow-clear>
                            <template #prefix>
                                %
                            </template>
                        </a-input-number>
                    </a-form-item>
                    <a-form-item field="configPlatformUS.commission_rate" :label="$t('manage.update.5uli8ryf1m40')">
                        <a-input-number placeholder="0" v-model="form.data.configPlatformUS.commission_rate" hide-button
                            allow-clear>
                            <template #prefix>
                                %
                            </template>
                        </a-input-number>
                    </a-form-item>
                    <a-divider />
                    <!-- A股 -->
                    <a-form-item style="margin-top:0">
                        <div>
                            <h3>{{$t('manage.update.5uli8ryf1vc0')}}</h3>
                            <p style="margin-top:10px">{{$t('manage.update.5uli8ryf0g40')}}</p>
                        </div>
                    </a-form-item>
                    <a-form-item field="configCommissionCN.charge_value" :label="$t('manage.update.5uli8ryf0mw0')">
                        <div>
                            <a-input-number v-model="form.data.configCommissionCN.charge_value" hide-button
                                :style="{ width: '256px' }" allow-clear>
                                <template #suffix>
                                    % × {{$t('manage.update.5uli8ryf0r80')}}
                                </template>
                            </a-input-number>
                            <a-input-number v-model="form.data.configCommissionCN.limit_max" hide-button
                                :style="{ width: '256px', 'margin': '0 15px' }" allow-clear>
                                <template #prefix>
                                    {{$t('manage.update.5uli8ryf0vc0')}}
                                </template>
                                <template #suffix>
                                    CNY/{{ $t('manage.create.5ulhxb0ib9o0') }}
                                </template>
                            </a-input-number>
                            <a-input-number v-model="form.data.configCommissionCN.limit_min" hide-button
                                :style="{ width: '256px' }" allow-clear>
                                <template #prefix>
                                    {{$t('manage.update.5uli8ryf0zo0')}}
                                </template>
                                <template #suffix>
                                    CNY/{{ $t('manage.create.5ulhxb0ib9o0') }}
                                </template>
                            </a-input-number>
                        </div>
                    </a-form-item>
                    <a-form-item field="configPlatformCN.charge_value" :label="$t('manage.update.5uli8ryf13k0')">
                        <div>
                            <a-input-number v-model="form.data.configPlatformCN.charge_value" hide-button
                                :style="{ width: '256px' }" allow-clear>
                                <template #suffix>
                                    CNY/{{ $t('manage.create.5ulhxb0isb80') }}
                                </template>
                            </a-input-number>
                        </div>
                    </a-form-item>
                    <a-form-item>
                        <div>
                            <h3>{{ $t('manage.create.5ulhxb0isvk0') }}</h3>
                            <p style="margin-top:10px">{{$t('manage.update.5uli8ryf1c80')}}</p>
                        </div>
                    </a-form-item>
                    <a-form-item field="configCommissionCN.commission_rate" :label="$t('manage.update.5uli8ryf1hk0')">
                        <a-input-number placeholder="0" v-model="form.data.configCommissionCN.commission_rate" hide-button
                            allow-clear>
                            <template #prefix>
                                %
                            </template>
                        </a-input-number>
                    </a-form-item>
                    <a-form-item field="configPlatformCN.commission_rate" :label="$t('manage.update.5uli8ryf1m40')">
                        <a-input-number placeholder="0" v-model="form.data.configPlatformCN.commission_rate" hide-button
                            allow-clear>
                            <template #prefix>
                                %
                            </template>
                        </a-input-number>
                    </a-form-item>
                    <a-form-item v-if='local.config?.agent?.is_show_trs_interest'>
                        <div>
                            <h3>{{$t('manage.update.5uli8ryf1zo0')}}</h3>
                            <p style="margin-top:10px">{{$t('manage.update.5uli8ryf1c80')}}</p>
                        </div>
                    </a-form-item>
                    <a-form-item field="trs_interest_rate" :label="$t('manage.update.5uli8ryf2300')"
                        v-if='local.config?.agent?.is_show_trs_interest'>
                        <a-input-number placeholder="0" v-model="form.data.trs_interest_rate" hide-button allow-clear>
                            <template #prefix>
                                %
                            </template>
                        </a-input-number>
                    </a-form-item>
                    <a-divider />
                    <a-form-item>
                        <div style="display: flex;justify-content: flex-end;width: 100%;">
                            <a-space :size="18">
                                <a-button @click="resetBtn">
                                    <template #icon>
                                        <icon-refresh />
                                    </template>
                                    {{$t('manage.update.5uli8ryf2600')}}
                                </a-button>
                                <a-button type="primary" :loading="form.loading" :disabled="form.loading"
                                    html-type="submit">
                                    <template #icon>
                                        <icon-check />
                                    </template>
                                    {{$t('manage.update.5uli8ryf29g0')}}
                                </a-button>
                            </a-space>
                        </div>
                    </a-form-item>
                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
// import { useEnums } from '@/hooks/enums'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const validatorData = (value: any, cb: any) => {
    const number = parseFloat(value);
    const decimalStr = number.toString().split('.')[1];
    const num = decimalStr ? decimalStr.length : 0;
    if (value > 100) {
        cb(t('manage.update.5uli8ryf2cw0'))
    } else if (value < 0) {
        cb(t('manage.update.5uli8ryf2g40'))
    } else if (num > 2) {
        cb(t('manage.update.5uli8ryf2j40'))
    } else {
        return true
    }
}
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        mobile: '',
        country_code: '',
        agent_name: '',
        email: '',
        status: true,
        trs_interest_rate: "",
        configCommissionHK: {
            commission_from_type: 1,
            type: 1,
            market_type: "HK",
            charge_type: 1,
            charge_value: '',
            commission_rate: '',
            limit_type: 1,
            limit_min: '',
            limit_max: '',
        },
        configPlatformHK: {
            commission_from_type: 1,
            type: 2,
            market_type: "HK",
            charge_type: 2,
            charge_value: '',
            commission_rate: '',
            limit_type: 1,
            limit_min: 0,
            limit_max: 0,
        },
        configCommissionUS: {
            commission_from_type: 1,
            type: 1,
            market_type: "US",
            charge_type: 3,
            charge_value: '',
            commission_rate: '',
            limit_type: 1,
            limit_min: '',
            limit_max: '',
        },
        configPlatformUS: {
            commission_from_type: 1,
            type: 2,
            market_type: "US",
            charge_type: 3,
            charge_value: '',
            commission_rate: '',
            limit_type: 1,
            limit_min: '',
            limit_max: '',
        },
        configCommissionCN: {
            commission_from_type: 1,
            type: 1,
            market_type: "CN",
            charge_type: 1,
            charge_value: '',
            commission_rate: '',
            limit_type: 1,
            limit_min: '',
            limit_max: '',
        },
        configPlatformCN: {
            commission_from_type: 1,
            type: 2,
            market_type: "CN",
            charge_type: 2,
            charge_value: '',
            commission_rate: '',
            limit_type: 1,
            limit_min: 0,
            limit_max: 0,
        },
    },
    rules: {
        mobile: [{ required: true, message: t('manage.update.5uli8ryezm80') }],
        agent_name: [{ required: true, message: t('manage.update.5uli8ryez2g0') }],
        email: [{ required: true, message: t('manage.update.5uli8ryezuw0') }, { type: 'email', message: t('manage.update.5uli8ryf2sw0') }],
        country_code: [{ required: true, message: t('manage.update.5uli8ryezcc0') }],
        status: [{ required: true, message: t('manage.update.5uli8ryf2wc0') }],
        'configCommissionHK.commission_rate': [{ required: true, message: t('manage.update.5uli8ryf33o0') }, { validator: validatorData }],
        'configPlatformHK.commission_rate': [{ required: true, message: t('manage.update.5uli8ryf3700') }, { validator: validatorData }],
        'configCommissionHK.charge_value': [{ required: true, message: t('manage.update.5uli8ryf3bk0') }],
        'configPlatformHK.charge_value': [{ required: true, message: t('manage.update.5uli8ryf3eo0') }],
        'configCommissionUS.commission_rate': [{ required: true, message: t('manage.update.5uli8ryf33o0') }, { validator: validatorData }],
        'configPlatformUS.commission_rate': [{ required: true, message: t('manage.update.5uli8ryf3700') }, { validator: validatorData }],
        'configCommissionUS.charge_value': [{ required: true, message: t('manage.update.5uli8ryf3bk0') }],
        'configPlatformUS.charge_value': [{ required: true, message: t('manage.update.5uli8ryf3eo0') }],
        'configCommissionCN.commission_rate': [{ required: true, message: t('manage.update.5uli8ryf33o0') }, { validator: validatorData }],
        'configPlatformCN.commission_rate': [{ required: true, message: t('manage.update.5uli8ryf3700') }, { validator: validatorData }],
        'configCommissionCN.charge_value': [{ required: true, message: t('manage.update.5uli8ryf3bk0') }],
        'configPlatformCN.charge_value': [{ required: true, message: t('manage.update.5uli8ryf3eo0') }],
        'trs_interest_rate': [{ required: true, message: t('manage.update.5uli8ryf3ic0') }, { validator: validatorData }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    // let bool = false
    let obj = JSON.parse(JSON.stringify(form.data))
    if (typeof obj.configCommissionHK.limit_min !== 'number') {
        obj.configCommissionHK.limit_min = 0
        // formRef.value.setFields({
        //     'configCommissionHK.charge_value': {
        //         status: 'error',
        //         message: '请输入最低值'
        //     }
        // })
        // bool =true
    }
    if (typeof obj.configCommissionHK.limit_max !== 'number') {
        obj.configCommissionHK.limit_max = 0
        // formRef.value.setFields({
        //     'configCommissionHK.charge_value': {
        //         status: 'error',
        //         message: '请输入最高值'
        //     }
        // })
        // bool =true
    }

    if (typeof obj.configCommissionCN.limit_min !== 'number') {
        obj.configCommissionCN.limit_min = 0
        // formRef.value.setFields({
        //     'configCommissionCN.charge_value': {
        //         status: 'error',
        //         message: '请输入最低值'
        //     }
        // })
        // bool =true
    }
    if (typeof obj.configCommissionCN.limit_max !== 'number') {
        obj.configCommissionCN.limit_max = 0
        // formRef.value.setFields({
        //     'configCommissionCN.charge_value': {
        //         status: 'error',
        //         message: '请输入最高值'
        //     }
        // })
        // bool =true
    }

    if (typeof obj.configCommissionUS.limit_min !== 'number') {
        obj.configCommissionUS.limit_min = 0
        // formRef.value.setFields({
        //     'configCommissionUS.charge_value': {
        //         status: 'error',
        //         message: '请输入最低值'
        //     }
        // })
        // bool =true
    }
    if (typeof obj.configCommissionUS.limit_max !== 'number') {
        obj.configCommissionUS.limit_max = 0
        // formRef.value.setFields({
        //     'configCommissionUS.charge_value': {
        //         status: 'error',
        //         message: '请输入最高值'
        //     }
        // })
        // bool =true
    }

    if (typeof obj.configPlatformUS.limit_min !== 'number') {
        obj.configPlatformUS.limit_min = 0
        // formRef.value.setFields({
        //     'configPlatformUS.charge_value': {
        //         status: 'error',
        //         message: '请输入最低值'
        //     }
        // })
        // bool =true
    }
    if (typeof obj.configPlatformUS.limit_max !== 'number') {
        obj.configPlatformUS.limit_max = 0
        // formRef.value.setFields({
        //     'configPlatformUS.charge_value': {
        //         status: 'error',
        //         message: '请输入最高值'
        //     }
        // })
        // bool =true
    }
    // if(bool) return
    let param = {
        mobile: obj.mobile,
        country_code: obj.country_code,
        agent_name: obj.agent_name,
        email: obj.email,
        trs_interest_rate: '' + obj.trs_interest_rate || "",
        commission_config: [{
            commission_from_type: 1,
            config: [obj.configCommissionHK, obj.configPlatformHK, obj.configCommissionUS, obj.configPlatformUS, obj.configCommissionCN, obj.configPlatformCN,]
        }]
    }
    form.loading = true
    const { code, msg } = await apiCms.cmsAgentUserTopUpdate({
        agentId: route.params.id,
        data: param
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const countryCodeList = ref()
const getCountryCode = async () => {
    const { code, data } = await apiSystem.countryCodeList()
    if (code != 1) return;
    countryCodeList.value = data.map((item: any) => {
        item.country_code = `+${item.country_code}`
        return item
    })
}
getCountryCode()

const resetBtn = () => {

    getData()
    formRef.value.resetFields()
}
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsAgentUserTopInfo({
        agentId: route.params.id
    })
    if (code != 1) return;
    for (let key in form.data) {
        form.data[key] = data[key]
    }
    data.commission_config[0].config.forEach((item: any) => {
        if (item.type == 1 && item.market_type == 'HK') {
            form.data.configCommissionHK = item
            form.data.configCommissionHK.charge_value = Number(item.charge_value)
            form.data.configCommissionHK.commission_rate = Number(item.commission_rate)
            form.data.configCommissionHK.limit_max = Number(item.limit_max)
            form.data.configCommissionHK.limit_min = Number(item.limit_min)
        }
        if (item.type == 2 && item.market_type == 'HK') {
            form.data.configPlatformHK = item
            form.data.configPlatformHK.charge_value = Number(item.charge_value)
            form.data.configPlatformHK.commission_rate = Number(item.commission_rate)
            form.data.configPlatformHK.limit_max = Number(item.limit_max)
            form.data.configPlatformHK.limit_min = Number(item.limit_min)
        }
        if (item.type == 1 && item.market_type == 'US') {
            form.data.configCommissionUS = item
            form.data.configCommissionUS.charge_value = Number(item.charge_value)
            form.data.configCommissionUS.commission_rate = Number(item.commission_rate)
            form.data.configCommissionUS.limit_max = Number(item.limit_max)
            form.data.configCommissionUS.limit_min = Number(item.limit_min)
        }
        if (item.type == 2 && item.market_type == 'US') {
            form.data.configPlatformUS = item
            form.data.configPlatformUS.charge_value = Number(item.charge_value)
            form.data.configPlatformUS.commission_rate = Number(item.commission_rate)
            form.data.configPlatformUS.limit_max = Number(item.limit_max)
            form.data.configPlatformUS.limit_min = Number(item.limit_min)
        }
        if (item.type == 1 && item.market_type == 'CN') {
            form.data.configCommissionCN = item
            form.data.configCommissionCN.charge_value = Number(item.charge_value)
            form.data.configCommissionCN.commission_rate = Number(item.commission_rate)
            form.data.configCommissionCN.limit_max = Number(item.limit_max)
            form.data.configCommissionCN.limit_min = Number(item.limit_min)
        }
        if (item.type == 2 && item.market_type == 'CN') {
            form.data.configPlatformCN = item
            form.data.configPlatformCN.charge_value = Number(item.charge_value)
            form.data.configPlatformCN.commission_rate = Number(item.commission_rate)
            form.data.configPlatformCN.limit_max = Number(item.limit_max)
            form.data.configPlatformCN.limit_min = Number(item.limit_min)
        }
    })
    form.data.trs_interest_rate = Number(data.trs_interest_rate)
    form.data.status = true
}
getData()

</script>
<style lang="less" scoped>
:deep(.arco-select-view-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-form-item) {
    max-width: 800px;
    margin: 10px auto;
}

:deep(.arco-input-wrapper.arco-input-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper .arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>