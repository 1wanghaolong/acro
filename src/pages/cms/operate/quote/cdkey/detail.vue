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
                        <a-form-item disabled field="name.zh-CN" :label="$t('cdkey.detail.5ukg99swuqg0')">
                            <a-input v-model="form.data.name['zh-CN']" :placeholder="$t('cdkey.detail.5ukg99swyt80')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item disabled field="name.en" :label="$t('cdkey.detail.5ukg99swza40')">
                            <a-input v-model="form.data.name.en" :placeholder="$t('cdkey.detail.5ukg99swzgo0')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item disabled field="name.tc" :label="$t('cdkey.detail.5ukg99swzm80')">
                            <a-input v-model="form.data.name.tc" :placeholder="$t('cdkey.detail.5ukg99swzs00')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item disabled field="grant_num" :label="$t('cdkey.detail.5ukg99sx0340')">
                            <a-input-number hide-button v-model="form.data.grant_num" :placeholder="$t('cdkey.detail.5ukg99sx09o0')">
                            </a-input-number>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item disabled field="activate_num" :label="$t('cdkey.detail.5ukg99sx0f00')">
                            <a-input-number hide-button v-model="form.data.activate_num" :placeholder="$t('cdkey.detail.5ukg99sx09o0')">
                            </a-input-number>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="market_type" :label="$t('cdkey.detail.5ukg99sx0jw0')">
                            <a-select disabled v-model="form.data.market_type" :placeholder="$t('cdkey.detail.5ukg99sx0q80')">
                                <a-option v-for="item in useEnums('cms.operate.quote.market.marketType')"
                                    :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                        </a-col>
                        <template v-if="form.data.market_type">
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="quote_level" :label="$t('cdkey.detail.5ukg99sx0uk0')">
                                <a-select disabled allow-clear v-model="form.data.quote_level" :placeholder="$t('cdkey.detail.5ukg99sx0q80')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.quoteLevel')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                            </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="level" :label="$t('cdkey.detail.5ukg99sx0yk0')">
                                <a-select disabled v-if="form.data.market_type == 'US'" allow-clear
                                    v-model="form.data.level" :placeholder="$t('cdkey.detail.5ukg99sx0q80')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.levelUS')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                                <a-select disabled v-else allow-clear v-model="form.data.level" :placeholder="$t('cdkey.detail.5ukg99sx0q80')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.level')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                            </a-col>
                        </template>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="day" :label="$t('cdkey.detail.5ukg99sx13k0')">
                            <a-input-number disabled :style="{ width: '100%' }" :placeholder="$t('cdkey.detail.5ukg99sx18c0')"
                                v-model="form.data.day" mode="button" class="input-demo" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="notice.zh-CN" :label="$t('cdkey.detail.5ukg99sx1dg0')">
                            <a-textarea disabled :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.notice['zh-CN']"
                                :placeholder="$t('cdkey.detail.5ukg99sx1io0')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="notice.en" :label="$t('cdkey.detail.5ukg99sx1ng0')">
                            <a-textarea disabled :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.notice.en"
                                :placeholder="$t('cdkey.detail.5ukg99sx1sg0')" />
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="notice.tc" :label="$t('cdkey.detail.5ukg99sx2nk0')">
                            <a-textarea disabled :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.notice.tc"
                                :placeholder="$t('cdkey.detail.5ukg99sx2wo0')" />
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
        market_type: '',
        grant_num: 0,
        day: 30,
        name: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        notice: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        level: '',
        quote_level: 1,
        activate_num: '',
    },
    rules: {}
})
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsQuoteCdkeyActiveInfo({
        activeId: route.params?.id
    })
    if (code != 1) return;
    for (let key in form.data) {
        form.data[key] = data[key]
    }
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

:deep(.arco-textarea[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}

:deep(.arco-input-wrapper.arco-input-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper .arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}</style>