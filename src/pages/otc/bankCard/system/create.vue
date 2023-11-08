<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" layout="vertical" :style="{ maxWidth: '800px', margin: 'auto' }"
                @submit="submit">
                <a-row :gutter="16" style="max-height: 700px;overflow: auto;">
                    <a-col :xs="24" :sm="12">
                        <a-form-item field="bankId" :label="$t('system.create.5ukkc1psweo0')" :rules="[{ required: true, message: $t('system.create.5ukkc1pt4xs0') }]">
                            <a-select v-model:model-value="form.data.bankId" allow-search :placeholder="$t('system.create.5ukkc1psx4c0')"
                                :field-names="{ value: 'id', label: 'account' }" @search="getBankList" :filter-option="true"
                                :show-extra-options="false">
                                <a-option v-for="item in form.bankList" :value="item.id">
                                    {{ item.bankFullName }}({{ item.bankCode }})
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12">
                        <a-form-item field="currency_list" :label="$t('system.create.5ukkc1psxbk0')"
                            :rules="[{ required: true, type: 'array', message: $t('system.create.5ukkc1psxgk0') }]">
                            <a-select allow-search allow-clear multiple v-model="form.data.currency_list"
                                :placeholder="$t('system.create.5ukkc1psxgk0')">
                                <a-option v-for="item in useEnums('currency')" :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24">
                        <a-form-item field="payment_type_list" :label="$t('system.create.5ukkc1psxl80')"
                            :rules="[{ required: true, type: 'array', message: $t('system.create.5ukkc1psy8s0') }]">
                            <a-select allow-search allow-clear multiple v-model="form.data.payment_type_list"
                                :placeholder="$t('system.create.5ukkc1psy8s0')">
                                <a-option
                                    v-for="item in useEnums('otc.bankCard.system_bank_card_payment_type')?.filter((item: any) => item.value < 5)"
                                    :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <template v-if="form.data.payment_type_list.includes(2)">
                    <a-divider orientation="left">{{$t('system.create.5ukkc1psyh00')}}</a-divider>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="owner_name.zh-CN" :label="$t('system.create.5ukkc1psyoo0')"
                            :rules="[{ required: true, message: $t('system.create.5ukkc1psyus0') }]">
                            <a-input v-model="form.data.owner_name['zh-CN']" :placeholder="$t('system.create.5ukkc1pszg00')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="owner_name.en" :label="$t('system.create.5ukkc1pszlw0')"
                            :rules="[{ required: true, message: $t('system.create.5ukkc1pszr80') }]">
                            <a-input v-model="form.data.owner_name.en" :placeholder="$t('system.create.5ukkc1pszws0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="owner_name.tc" :label="$t('system.create.5ukkc1pt0340')"
                            :rules="[{ required: true, message: $t('system.create.5ukkc1pt08c0') }]">
                            <a-input v-model="form.data.owner_name.tc" :placeholder="$t('system.create.5ukkc1pt0d00')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="owner_region.zh-CN" :label="$t('system.create.5ukkc1pt1400')"
                            :rules="[{ required: true, message: $t('system.create.5ukkc1pt1bo0') }]">
                            <a-input v-model="form.data.owner_region['zh-CN']" :placeholder="$t('system.create.5ukkc1pt1bo0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="owner_region.en" :label="$t('system.create.5ukkc1pt1gw0')"
                        :rules="[{ required: true, message: $t('system.create.5ukkc1pt1m00') }]">
                            <a-input v-model="form.data.owner_region.en" :placeholder="$t('system.create.5ukkc1pt1m00')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="owner_region.tc" :label="$t('system.create.5ukkc1pt25g0')"
                            :rules="[{ required: true, message: $t('system.create.5ukkc1pt2a00') }]">
                            <a-input v-model="form.data.owner_region.tc" :placeholder="$t('system.create.5ukkc1pt2a00')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="bank_address.zh-CN" :label="$t('system.create.5ukkc1pt2xg0')"
                            :rules="[{ required: true, message: $t('system.create.5ukkc1pt3480') }]">
                            <a-input v-model="form.data.bank_address['zh-CN']" :placeholder="$t('system.create.5ukkc1pt3480')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="bank_address.en" :label="$t('system.create.5ukkc1pt3880')"
                        :rules="[{ required: true, message: $t('system.create.5ukkc1pt3bw0') }]">
                            <a-input v-model="form.data.bank_address.en" :placeholder="$t('system.create.5ukkc1pt3bw0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="bank_address.tc" :label="$t('system.create.5ukkc1pt3fk0')"
                            :rules="[{ required: true, message: $t('system.create.5ukkc1pt3j40') }]">
                            <a-input v-model="form.data.bank_address.tc" :placeholder="$t('system.create.5ukkc1pt3j40')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="payment_note.zh-CN" :label="$t('system.create.5ukkc1pt3n40')"
                            :rules="[{ required: true, message: $t('system.create.5ukkc1pt3qg0') }]">
                            <a-input v-model="form.data.payment_note['zh-CN']" :placeholder="$t('system.create.5ukkc1pt3qg0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="payment_note.en" :label="$t('system.create.5ukkc1pt3u00')"
                        :rules="[{ required: true, message: $t('system.create.5ukkc1pt3xg0') }]">
                            <a-input v-model="form.data.payment_note.en" :placeholder="$t('system.create.5ukkc1pt3xg0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="payment_note.tc" :label="$t('system.create.5ukkc1pt40w0')"
                            :rules="[{ required: true, message: $t('system.create.5ukkc1pt48w0') }]">
                            <a-input v-model="form.data.payment_note.tc" :placeholder="$t('system.create.5ukkc1pt48w0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="bank_account" :label="$t('system.create.5ukkc1pt4cs0')" :rules="[{ required: true, message: $t('system.create.5ukkc1pt4gg0') }]">
                            <a-input v-model="form.data.bank_account" :placeholder="$t('system.create.5ukkc1pt4gg0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="swift_code" :label="$t('system.create.5ukkc1pt4ks0')" :rules="[{ required: true, message: $t('system.create.5ukkc1pt4oc0') }]">
                            <a-input v-model="form.data.swift_code" :placeholder="$t('system.create.5ukkc1pt4oc0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item :label="$t('system.create.5ukkc1pt4tk0')">
                            {{ useEnumsFormat('system.bank_region',form.bankList?.find((item:any)=>item.id == form.data.bankId)?.bankRegion) || $t('system.create.5ukkc1pt4xs0') }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item :label="$t('system.create.5ukkc1pt5180')">
                            {{ form.bankList?.find((item:any)=>item.id == form.data.bankId)?.bankFullName || $t('system.create.5ukkc1pt4xs0') }}
                        </a-form-item>
                    </a-col>
                    </template>
                    <template v-if="form.data.payment_type_list.includes(3)">
                        <a-divider orientation="left">FPS转数快信息</a-divider>
                        <a-col :xs="24" :sm="12" :md="8">
                            <a-form-item field="fps_code" label="FPS ID"
                                :rules="[{ required: true, message: $t('system.create.5umbm30n15c0')+'FPS ID' }]">
                                <a-input v-model="form.data.fps_code" :placeholder="`${$t('system.create.5umbm30n2os0')}FPS ID`" />
                            </a-form-item>
                        </a-col>
                    </template>
                </a-row>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="formRef?.resetFields()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('system.create.5ukkc1pt54g0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('system.create.5ukkc1pt5800')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums,useEnumsFormat } from '@/hooks/enums'
const route = useRoute()
const router = useRouter()
const local = useLocal()
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    bankList: [],
    data: {
        bankId: '',
        bank_code: '',
        bank_region: '',
        currency_list: [],
        payment_type_list: [],
        bank_account: '',
        swift_code: '',
        fps_code: '',
        owner_name: {
            'zh-CN': '',
            en: '',
            tc: '',
        },
        owner_region: {
            'zh-CN': '',
            en: '',
            tc: '',
        },
        bank_address: {
            'zh-CN': '',
            en: '',
            tc: '',
        },
        payment_note: {
            'zh-CN': '',
            en: '',
            tc: '',
        }
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const data = cloneDeep(form.data)
    delete data.bankId
    const { code, msg } = await apiOtc.systemBankCardCreate({
        data: {
            ...data,
            bank_code: form.bankList?.find((item:any)=>item.id == form.data.bankId)?.bankCode,
            bank_region: String(form.bankList?.find((item:any)=>item.id == form.data.bankId)?.bankRegion)
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const getBankList = async (value: string) => {
    const { code, data } = await apiSystem.bankList({
        bankName: value,
    })
    if (code != 1) return;
    form.bankList = data?.list
}
</script>