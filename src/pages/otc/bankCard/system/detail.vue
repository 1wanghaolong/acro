<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-card :loading="loading">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('system.detail.5ukkhgzxn9w0')}}
                        </a-space>
                    </div>
                </template>
                <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('system.detail.5ukkhgzxp600')">
                                {{ form.data?.bank_full_name }}({{ form.data?.bank_code }})
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('system.detail.5ukkhgzxphs0')">
                                <a-space>
                                    <a-tag v-for="item in form.data?.currency_list">
                                        {{ item.currency }}</a-tag>
                                </a-space>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('system.detail.5ukkhgzxpn80')">
                                <a-space wrap>
                                    <a-tag v-for="item in form.data?.payment_type_list">
                                        {{ useEnumsFormat('otc.bankCard.system_bank_card_payment_type', item.type) }}
                                    </a-tag>
                                </a-space>
                            </a-form-item>
                        </a-col>
                        <template v-if="form.data?.payment_type_list?.find((item: any) => item.type == 2)">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxpr40')">
                                    <div>{{ form.data?.owner_name['zh-CN'] }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxpxg0')">
                                    <div>{{ form.data?.owner_name['en'] }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxq0w0')">
                                    <div>{{ form.data?.owner_name['tc'] }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxq4g0')">
                                    <div>{{ form.data?.owner_region['zh-CN'] }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxq7o0')">
                                    <div>{{ form.data?.owner_region['en'] }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxqbo0')">
                                    <div>{{ form.data?.owner_region['tc'] }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxqfg0')">
                                    <div>{{ form.data?.bank_address['zh-CN'] }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxqj40')">
                                    <div>{{ form.data?.bank_address['en'] }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxqmw0')">
                                    <div>{{ form.data?.bank_address['tc'] }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxqqw0')">
                                    <div>{{ form.data?.bank_account }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxqvc0')">
                                    <div>{{ useEnumsFormat('system.bank_region', form.data?.bank_region) || '-' }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxr000')">
                                    <div>{{ form.data?.bank_full_name }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxr4k0')">
                                    <div>{{ form.data?.swift_code }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxr880')">
                                    <div>{{ form.data?.payment_note['zh-CN'] }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxrco0')">
                                    <div>{{ form.data?.payment_note['en'] }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('system.detail.5ukkhgzxrgk0')">
                                    <div>{{ form.data?.payment_note['tc'] }}</div>
                                </a-form-item>
                            </a-col>
                        </template>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6"
                            v-if="form.data?.payment_type_list?.find((item: any) => item.type == 3)">
                            <a-form-item label="FPS ID">
                                <div>{{ form.data?.fps_code }}</div>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n();
const loading = ref(false)
const form: any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {},
    rules: {
        real_name: [{ required: true, message: t('system.detail.5ukkh4g7mzs0') }],
        english_name: [{ required: true, message: t('system.detail.5ukkh4g7n2o0') }],
        email: [{ required: true, message: t('system.detail.5ukkh4g7n5s0') }, { type: 'email', message: t('system.detail.5ukkh4g7n8w0') }]
    }
})
const getData = async () => {
    loading.value = true
    const { code, data } = await apiOtc.systemBankCardInfo({
        card_id: route.params?.id
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
:deep(.arco-form-item-label-col > .arco-form-item-label) {
    color: var(--color-text-3);
}
</style>