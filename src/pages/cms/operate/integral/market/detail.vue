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
                            <a-form-item field="type" :label="$t('market.detail.5ukmvmizvh80')">
                                <a-select disabled v-model="form.data.type" :placeholder="$t('market.detail.5ukmvmizwj40')">
                                    <a-option v-for="item in useEnums('cms.operate.integral.market.type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="name.zh-CN" :label="$t('market.detail.5ukmvmizwrw0')">
                                <a-input disabled v-model="form.data.name['zh-CN']" :placeholder="$t('market.detail.5ukmvmizwxc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item field="name.en" :label="$t('market.detail.5ukmvmizx6g0')">
                                <a-input disabled v-model="form.data.name.en" :placeholder="$t('market.detail.5ukmvmizxlo0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item field="name.tc" :label="$t('market.detail.5ukmvmizxso0')">
                                <a-input disabled v-model="form.data.name.tc" :placeholder="$t('market.detail.5ukmvmizxyc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item :label="$t('market.detail.5ukmvmizy5o0')">
                                <a-input disabled v-model="form.data.desc['zh-CN']" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item :label="$t('market.detail.5ukmvmizybk0')">
                                <a-input disabled v-model="form.data.desc.en" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item :label="$t('market.detail.5ukmvmizyhc0')">
                                <a-input disabled v-model="form.data.desc.tc" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="cost" :label="$t('market.detail.5ukmvmizyn00')">
                                <a-input-number disabled hide-button v-model="form.data.cost" :placeholder="$t('market.detail.5ukmvmizysc0')">
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.market_type" :label="$t('market.detail.5ukmvmizyxg0')">
                                <a-select disabled v-model="form.data.content.market_type" :placeholder="$t('market.detail.5ukmvmizwj40')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.marketType')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.quote_level" :label="$t('market.detail.5ukmvmizz3k0')">
                                <a-select disabled allow-clear v-model="form.data.content.quote_level" :placeholder="$t('market.detail.5ukmvmizwj40')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.quoteLevel')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.day" :label="$t('market.detail.5ukmvmizz9o0')">
                                <a-input disabled v-model="form.data.content.day" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item field="content.level" :label="$t('market.detail.5ukmvmizvh80')">
                                <a-select disabled v-if="form.data.content.market_type == 'US'" allow-clear
                                    v-model="form.data.content.level" :placeholder="$t('market.detail.5ukmvmizwj40')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.levelUS')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                                <a-select disabled v-else allow-clear v-model="form.data.content.level" :placeholder="$t('market.detail.5ukmvmizwj40')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.level')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item field="status" :label="$t('market.detail.5ukmvmizzfc0')">
                                <a-select disabled v-model="form.data.status" :placeholder="$t('market.detail.5ukmvmizwj40')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.status')"
                                        :value="item.value">{{
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
// import dayjs from 'dayjs'
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
    const { code, data } = await apiCms.cmsIntegralGoodsInfo({
        goodsId: route.params?.id
    })
    if (code != 1) return;
    form.data = data
    form.data.content = JSON.parse(form.data.content)
    form.data.content.quote_level = Number(form.data.content.quote_level)
    form.data.content.level = Number(form.data.content.level)
    console.log(form.data);

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