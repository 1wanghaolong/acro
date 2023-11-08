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

                            <a-form-item field="symbol" :label="$t('hot.detail.5ukizh7xuuw0')">
                                <a-input v-model="form.data.symbol" :placeholder="$t('hot.detail.5ukizh7xvto0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item :label="$t('hot.detail.5ukizh7xvy00')">
                                <a-input disabled v-model="form.data.name['zh-CN']" :placeholder="$t('hot.detail.5ukizh7xw0g0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('hot.detail.5ukizh7xw2g0')">
                                <a-input disabled v-model="form.data.name['tc']" :placeholder="$t('hot.detail.5ukizh7xw640')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('hot.detail.5ukizh7xwa40')">
                                <a-input disabled v-model="form.data.name['en']" :placeholder="$t('hot.detail.5ukizh7xwe80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('hot.detail.5ukizh7xwgo0')">
                                <a-input disabled v-model="symbolData.marketName" :placeholder="$t('hot.detail.5ukizh7xwiw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item :label="$t('hot.detail.5ukizh7xwkw0')">
                                <a-input disabled v-model="symbolData.securityTypeName" :placeholder="$t('hot.detail.5ukizh7xwog0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">



                            <a-form-item disabled field="title.zh-CN" :label="$t('hot.detail.5ukizh7xwr80')">
                                <a-input v-model="form.data.title['zh-CN']" :placeholder="$t('hot.detail.5ukizh7xwtk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item disabled field="title.en" :label="$t('hot.detail.5ukizh7xwvw0')">
                                <a-input v-model="form.data.title.en" :placeholder="$t('hot.detail.5ukizh7xwy80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item disabled field="title.tc" :label="$t('hot.detail.5ukizh7xx0g0')">
                                <a-input v-model="form.data.title.tc" :placeholder="$t('hot.detail.5ukizh7xx2s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item disabled field="desc.zh-CN" :label="$t('hot.detail.5ukizh7xx5c0')">
                                <a-textarea disabled style="flex:1;" :auto-size="{ minRows: 3, maxRows: 3 }"
                                    v-model="form.data.desc['zh-CN']" :placeholder="$t('hot.detail.5ukizh7xx8w0') "/>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item disabled field="desc.en" :label="$t('hot.detail.5ukizh7xxc40')">
                                <a-textarea disabled style="flex:1;" :auto-size="{ minRows: 3, maxRows: 3 }"
                                    v-model="form.data.desc.en" :placeholder="$t('hot.detail.5ukizh7xxe00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item disabled field="desc.tc" :label="$t('hot.detail.5ukizh7xxgo0')">
                                <a-textarea disabled style="flex:1;" :auto-size="{ minRows: 3, maxRows: 3 }"
                                    v-model="form.data.desc.tc" :placeholder="$t('hot.detail.5ukizh7xxis0')" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
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
        name: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
    },
    rules: {}
})
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsSymbolHotInfo({
        hotId: route.params?.id
    })
    if (code != 1) return;
    form.data = data
    symbolData.value.marketName = useEnumsFormat('market.market', data.market)
    symbolData.value.securityTypeName = useEnumsFormat('market.security_type', data.security_type)
    symbolData.value.symbolName = data.name[local.lang]
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