<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subname="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="type" :label="$t('preferred.detail.5ukeagnd25s0')">
                                <a-select disabled v-model="form.data.type" :placeholder="$t('preferred.detail.5ukeagnd3dc0')">
                                    <a-option @click="optionBtn(item)" v-for="item in useEnums('market.market_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="code" :label="$t('preferred.detail.5ukeagnd3l80')">
                            <a-select disabled v-model:model-value="form.data.code" allow-search :placeholder="$t('preferred.detail.5ukeagnd3po0')">
                                <a-option @click="symbolBtn(item)" v-for="item in (symbolList as any)" :value="item.code">
                                    {{ item.name }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="source.zh-CN" :label="$t('preferred.detail.5ukeagnd3to0')">
                            <a-input disabled v-model="form.data.source['zh-CN']" :placeholder="$t('preferred.detail.5ukeagnd4100')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="source.en" :label="$t('preferred.detail.5ukeagnd44w0')">
                            <a-input disabled v-model="form.data.source.en" :placeholder="$t('preferred.detail.5ukeagnd48k0')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="source.tc" :label="$t('preferred.detail.5ukeagnd4cw0')">
                            <a-input disabled v-model="form.data.source.tc" :placeholder="$t('preferred.detail.5ukeagnd4h80')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="title.zh-CN" :label="$t('preferred.detail.5ukeagnd4lw0')">
                            <a-input disabled v-model="form.data.title['zh-CN']" :placeholder="$t('preferred.detail.5ukeagnd4r40')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="title.en" :label="$t('preferred.detail.5ukeagnd4vk0')">
                            <a-input disabled v-model="form.data.title.en" :placeholder="$t('preferred.detail.5ukeagnd50k0')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="title.tc" :label="$t('preferred.detail.5ukeagnd54s0')">
                            <a-input disabled v-model="form.data.title.tc" :placeholder="$t('preferred.detail.5ukeagnd5940')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="content.zh-CN" :label="$t('preferred.detail.5ukeagnd5h40')">
                            <a-textarea disabled :auto-size="{ minRows: 5, maxRows: 5 }"
                                v-model="form.data.content['zh-CN']" :placeholder="$t('preferred.detail.5ukeagnd5ls0')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="content.en" :label="$t('preferred.detail.5ukeagnd5q80')">
                            <a-textarea disabled :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content.en"
                                :placeholder="$t('preferred.detail.5ukeagnd5uo0')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="content.tc" :label="$t('preferred.detail.5ukeagnd6040')">
                            <a-textarea disabled :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content.tc"
                                :placeholder="$t('preferred.detail.5ukeagnd6400')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="background" :label="$t('preferred.detail.5ukeagnd6800')">
                            <a-image height="100" :src="form.data.background" v-if="form.data.background">
                                <template #loader>
                                    <img :src="form.data.background" style="filter: blur(5px)" />
                                </template>
                            </a-image>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="status" :label="$t('preferred.detail.5ukeagnd6bg0')">
                            <a-select disabled v-model="form.data.status" :placeholder="$t('preferred.detail.5ukeagnd3dc0')">
                                <a-option v-for="item in useEnums('cms.operate.quote.market.status')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
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
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        type: '',
        code: '',
        source: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        content: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        title: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        background: [],
        status: ''
    },
    rules: {}
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    let param = { ...form.data }
    param.background = form.data.background[0]?.response?.url
    form.loading = true
    const { code, msg } = await apiMarket.symbolPreferredPlateUpdate({
        plateId: route.params?.id,
        data: param
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const optionBtn = (val: any) => {
    form.data.code = ''
    getSymbolList(val.value)

}
const symbolData = ref()
const symbolBtn = (val: any) => {
    symbolData.value = val
}
const symbolList = ref([])
const getSymbolList = async (value: string) => {
    const { code, data } = await apiMarket.symbolConceptPlateList({ 'filter[market]': value })
    if (code != 1) return;
    symbolList.value = data
}
// 详情
const getData = async () => {
    const { code, data } = await apiMarket.symbolPreferredPlateInfo({
        plateId: route.params?.id
    })
    if (code != 1) return;
    for (let key in form.data) {
        form.data[key] = data[key]
    }
    form.data.background = form.data.background



}
getData()
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