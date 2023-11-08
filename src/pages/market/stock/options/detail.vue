<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }">

                    <a-form-item field="symbol" :label="$t('options.detail.5ukeftk66vw0')">
                        <a-input v-model="form.data.symbol" :placeholder="$t('options.detail.5ukeftk67uc0')" />
                    </a-form-item>
                    <a-form-item field="name" :label="$t('options.detail.5ukeftk68140')">
                        <a-input v-model="form.data.name" :placeholder="$t('options.detail.5ukeftk685w0')" />
                    </a-form-item>
                    <a-form-item :label="$t('options.detail.5ukeftk68ao0')">
                        <a-input disabled v-model="symbolData.marketName" :placeholder="$t('options.detail.5ukeftk68hk0')" />
                    </a-form-item>
                    <a-form-item :label="$t('options.detail.5ukeftk68mg0')">
                        <a-input disabled v-model="symbolData.securityTypeName" :placeholder="$t('options.detail.5ukeftk68r40')" />
                    </a-form-item>
                    <a-form-item :label="$t('options.detail.5ukeftk68vw0')">
                        <a-input disabled v-model="form.data.sort" :placeholder="$t('options.detail.5ukeftk68r40')" />
                    </a-form-item>
                    <a-form-item field="create_time" :label="$t('options.detail.5ukeftk691c0')">
                        <a-input v-model="form.data.create_time" :placeholder="$t('options.detail.5ukeftk695o0')" />
                    </a-form-item>
                    <a-form-item field="update_time" :label="$t('options.detail.5ukeftk69ac0')">
                        <a-input v-model="form.data.update_time" :placeholder="$t('options.detail.5ukeftk69eo0')" />
                    </a-form-item>


                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        symbol: '',
        security_type: '',
        market: '',
        title: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        desc: {
            'zh-CN': '',
            en: '',
            tc: ''
        },

    },
    rules: {}
})
// 详情
const getData = async () => {
    const { code, data } = await apiMarket.symbolUserOptionsInfo({
        optionId: route.params?.id
    })
    if (code != 1) return;
    form.data = data
    symbolData.value.marketName = useEnumsFormat('market.market', data.market)
    symbolData.value.securityTypeName = useEnumsFormat('market.security_type', data.security_type)
    symbolData.value.symbolName = data.name[local.lang]
    form.data['create_time'] = dayjs.unix(form.data['create_time']).format('YYYY-MM-DD HH:mm:ss')
    form.data['update_time'] = dayjs.unix(form.data['update_time']).format('YYYY-MM-DD HH:mm:ss')
}
const symbolData: any = ref({})

{
    getData()
}
</script>
<style lang="less" scoped>
:deep(.arco-select-view-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-textarea[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}

:deep(.arco-input-wrapper.arco-input-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper .arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>