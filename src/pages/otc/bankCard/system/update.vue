<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" layout="vertical" :style="{ maxWidth: '800px', margin: 'auto' }"
                @submit="submit">
                <a-row :gutter="16" style="max-height: 700px;overflow: auto;">
                    <a-col :xs="24" :sm="12">
                        <a-form-item :label="$t('system.update.5ukkfp5v4a80')">
                            {{ form.detail?.bank_full_name }}({{ form.detail?.bank_code }})
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12">
                        <a-form-item field="currency_list" :label="$t('system.update.5ukkfp5v8s00')"
                            :rules="[{ required: true, type: 'array', message: $t('system.update.5ukkfp5v9u80') }]">
                            <a-select allow-search allow-clear multiple v-model="form.data.currency_list"
                                :placeholder="$t('system.update.5ukkfp5v9u80')">
                                <a-option v-for="item in useEnums('currency')" :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24">
                        <a-form-item field="payment_type_list" :label="$t('system.update.5ukkfp5va340')"
                            :rules="[{ required: true, type: 'array', message: $t('system.update.5ukkfp5vaas0') }]">
                            <a-select allow-search allow-clear multiple v-model="form.data.payment_type_list"
                                :placeholder="$t('system.update.5ukkfp5vaas0')">
                                <a-option
                                    v-for="item in useEnums('otc.bankCard.system_bank_card_payment_type')?.filter((item: any) => item.value < 5)"
                                    :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <template v-if="form.data.payment_type_list.includes(2)">
                    <a-divider orientation="left">{{$t('system.update.5ukkfp5vajw0')}}</a-divider>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="owner_name.zh-CN" :label="$t('system.update.5ukkfp5vaww0')"
                            :rules="[{ required: true, message: $t('system.update.5ukkfp5vb780') }]">
                            <a-input v-model="form.data.owner_name['zh-CN']" :placeholder="$t('system.update.5ukkfp5vblo0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="owner_name.en" :label="$t('system.update.5ukkfp5vbwo0')"
                            :rules="[{ required: true, message: $t('system.update.5ukkfp5vc3k0') }]">
                            <a-input v-model="form.data.owner_name.en" :placeholder="$t('system.update.5ukkfp5vcbc0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="owner_name.tc" :label="$t('system.update.5ukkfp5vctg0')"
                            :rules="[{ required: true, message: $t('system.update.5ukkfp5vd6g0') }]">
                            <a-input v-model="form.data.owner_name.tc" :placeholder="$t('system.update.5ukkfp5vde00')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="owner_region.zh-CN" :label="$t('system.update.5ukkfp5vdlc0')"
                            :rules="[{ required: true, message: $t('system.update.5ukkfp5vdsg0') }]">
                            <a-input v-model="form.data.owner_region['zh-CN']" :placeholder="$t('system.update.5ukkfp5vdsg0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="owner_region.en" :label="$t('system.update.5ukkfp5ve400')"
                        :rules="[{ required: true, message: $t('system.update.5ukkfp5veck0') }]">
                            <a-input v-model="form.data.owner_region.en" :placeholder="$t('system.update.5ukkfp5veck0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="owner_region.tc" :label="$t('system.update.5ukkfp5vemc0')"
                            :rules="[{ required: true, message: $t('system.update.5ukkfp5vk8o0') }]">
                            <a-input v-model="form.data.owner_region.tc" :placeholder="$t('system.update.5ukkfp5vk8o0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="bank_address.zh-CN" :label="$t('system.update.5ukkfp5vko00')"
                            :rules="[{ required: true, message: $t('system.update.5ukkfp5vl2k0') }]">
                            <a-input v-model="form.data.bank_address['zh-CN']" :placeholder="$t('system.update.5ukkfp5vl2k0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="bank_address.en" :label="$t('system.update.5ukkfp5vl9k0')"
                        :rules="[{ required: true, message: $t('system.update.5ukkfp5vlf00') }]">
                            <a-input v-model="form.data.bank_address.en" :placeholder="$t('system.update.5ukkfp5vlf00')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="bank_address.tc" :label="$t('system.update.5ukkfp5vli00')"
                            :rules="[{ required: true, message: $t('system.update.5ukkfp5vlok0') }]">
                            <a-input v-model="form.data.bank_address.tc" :placeholder="$t('system.update.5ukkfp5vlok0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="payment_note.zh-CN" :label="$t('system.update.5ukkfp5vltc0')"
                            :rules="[{ required: true, message: $t('system.update.5ukkfp5vlww0') }]">
                            <a-input v-model="form.data.payment_note['zh-CN']" :placeholder="$t('system.update.5ukkfp5vlww0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="payment_note.en" :label="$t('system.update.5ukkfp5vm100')"
                        :rules="[{ required: true, message: $t('system.update.5ukkfp5vm4o0') }]">
                            <a-input v-model="form.data.payment_note.en" :placeholder="$t('system.update.5ukkfp5vm4o0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="payment_note.tc" :label="$t('system.update.5ukkfp5vm9s0')"
                            :rules="[{ required: true, message: $t('system.update.5ukkfp5vmfc0') }]">
                            <a-input v-model="form.data.payment_note.tc" :placeholder="$t('system.update.5ukkfp5vmfc0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="bank_account" :label="$t('system.update.5ukkfp5vmnw0')" :rules="[{ required: true, message: $t('system.update.5ukkfp5vmsw0') }]">
                            <a-input v-model="form.data.bank_account" :placeholder="$t('system.update.5ukkfp5vmsw0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item field="swift_code" :label="$t('system.update.5ukkfp5vn1k0')" :rules="[{ required: true, message: $t('system.update.5ukkfp5vngk0') }]">
                            <a-input v-model="form.data.swift_code" :placeholder="$t('system.update.5ukkfp5vngk0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item :label="$t('system.update.5ukkfp5vnmc0')">
                            {{ useEnumsFormat('system.bank_region',form.data.bank_region) || '-' }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="6">
                        <a-form-item :label="$t('system.update.5ukkfp5vnrc0')">
                            {{ form.detail?.bank_full_name }}
                        </a-form-item>
                    </a-col>
                    </template>
                    <template v-if="form.data.payment_type_list.includes(3)">
                        <a-divider orientation="left">FPS转数快信息</a-divider>
                        <a-col :xs="24" :sm="12" :md="8">
                            <a-form-item field="fps_code" label="FPS ID"
                                :rules="[{ required: true, message: $t('system.update.5umbnsvri4o0')+'FPS ID' }]">
                                <a-input v-model="form.data.fps_code" :placeholder="`${ $t('system.update.5umbnsvri4o0') }FPS ID`" />
                            </a-form-item>
                        </a-col>
                    </template>
                </a-row>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="getData">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('system.update.5ukkfp5vnw00')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('system.update.5ukkfp5vo540')}}
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
    detail:{},
    data: {
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
    const { code, msg } = await apiOtc.systemBankCardUpdate({
        card_id: route.params?.id,
        data: {
            ...form.data,
            bank_region: String(form.data.bank_region)
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const getData = async () => {
    form.loading = true
    const { code, data } = await apiOtc.systemBankCardInfo({
        card_id: route.params?.id
    })
    form.loading = false
    if (code != 1) return;
    form.detail = data
    let formData:any = {}
    for(let key in form.data){
        formData[key] = data[key]

    }
    formData.currency_list = data?.currency_list?.map((item:any)=>item.currency)
    formData.payment_type_list = data?.payment_type_list?.map((item:any)=>Number(item.type))
    form.data = formData
}
{
    getData()
}
</script>