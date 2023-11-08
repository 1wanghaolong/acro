<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="country_code" :label="$t('client.detail.5ukk6zrzwh80')">
                                <a-input disabled v-model="form.data.country_code" :placeholder="$t('client.detail.5ukk6zrzx840')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="mobile" :label="$t('client.detail.5ukk6zrzxe40')">
                            <a-input disabled v-model="form.data.mobile" :placeholder="$t('client.detail.5ukk6zrzxi80')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="nickname" :label="$t('client.detail.5ukk6zrzxlw0')">
                            <a-input disabled v-model="form.data.nickname" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="real_name" :label="$t('client.detail.5ukk6zrzxq00')">
                            <a-input disabled v-model="form.data.real_name" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="bank_name" :label="$t('client.detail.5ukk6zrzxvk0')">
                            <a-input disabled v-model="form.data.bank_name" :placeholder="$t('client.detail.5ukk6zrzxz80')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="bank_code" :label="$t('client.detail.5ukk6zrzy2s0')">
                            <a-input disabled v-model="form.data.bank_code" :placeholder="$t('client.detail.5ukk6zrzy6s0')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="bank_account" :label="$t('client.detail.5ukk6zrzyb80')">
                            <a-input disabled v-model="form.data.bank_account" :placeholder="$t('client.detail.5ukk6zrzyfg0')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="status" :label="$t('client.detail.5ukk6zrzyj40')">
                            <a-select disabled v-model="form.data.status" :placeholder="$t('client.detail.5ukk6zrzyn80')">
                                <a-option v-for="item in useEnums('otc.bankCard.status')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="bank_name" :label="$t('client.detail.5ukk6zrzyrc0')">
                            <a-tag style="margin-right: 15px;" v-for="item in form.data.currency_list" size="small">{{
                                item.currency }}</a-tag>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="voucher" :label="$t('client.detail.5ukk6zrzyx80')">
                            <a-image height="100" :src="form.data.voucher" v-if="form.data.voucher">
                                <template #loader>
                                    <img :src="form.data.voucher" style="filter: blur(5px)" />
                                </template>
                            </a-image>
                            <span v-else>
                                -
                            </span>
                        </a-form-item>
                        </a-col>
                       
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="create_time" :label="$t('client.detail.5ukk6zrzz1w0')">
                            <a-input disabled v-model="form.data.create_time" :placeholder="$t('client.detail.5ukk6zrzz740')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="bind_time" :label="$t('client.detail.5ukk6zrzzbk0')">
                            <a-input disabled v-model="form.data.bind_time" :placeholder="$t('client.detail.5ukk6zrzzfw0')" />
                        </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>

            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        name: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        desc: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        cost: 0,
        content: {
            market_type: 'HK',
            level: '',
            quote_level: 2,
            day: 30
        },

        type: '',
    },
    rules: {}
})
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsOrderUserBankCardInfo({
        cardId: route.params?.id
    })
    if (code != 1) return;
    form.data = data
    form.data.create_time = dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss')
    form.data.bind_time = dayjs.unix(form.data.bind_time).format('YYYY-MM-DD HH:mm:ss')

}
{
    getData()
}
</script>
<style lang="less" scoped>
:deep(.arco-select-view-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper.arco-input-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper .arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>