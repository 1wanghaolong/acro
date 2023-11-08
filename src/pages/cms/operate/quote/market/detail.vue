<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }">

                    <a-form-item field="market_type" :label="$t('market.detail.5ukmoumb5yg0')">
                        <a-select disabled allow-clear v-model="form.data.market_type"
                            :placeholder="$t('market.detail.5ukmoumb6ms0')">
                            <a-option v-for="item in useEnums('cms.operate.quote.market.marketType')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="quoteLevel" :label="$t('market.detail.5ukmoumb6uo0')">
                        <a-select disabled allow-clear v-model="form.data.quote_level"
                            :placeholder="$t('market.detail.5ukmoumb6ms0')">
                            <a-option v-for="item in useEnums('cms.operate.quote.market.quoteLevel')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="$t('market.detail.5ukmoumb7140')">
                        <a-input disabled v-model="form.data.day">
                        </a-input>
                    </a-form-item>
                    <a-form-item :label="$t('market.detail.5ukmoumb7700')">
                        <a-input disabled v-model="form.data.price">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="level" :label="$t('market.detail.5ukmoumb7ck0')">
                        <a-select disabled allow-clear v-model="form.data.level"
                            :placeholder="$t('market.detail.5ukmoumb6ms0')">
                            <a-option v-for="item in useEnums('cms.operate.quote.market.level')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="status" :label="$t('market.detail.5ukmoumb7hk0')">
                        <a-select disabled allow-clear v-model="form.data.status"
                            :placeholder="$t('market.detail.5ukmoumb6ms0')">
                            <a-option v-for="item in useEnums('cms.operate.quote.market.status')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>

                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
import { dataFormat } from '@/hooks/permission'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {},
    rules: {}
})
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsQuoteGoodsInfo({
        goodsId: route.params?.id
    })
    if (code != 1) return;
    form.data = data
    form.data.price = dataFormat(form.data.price, 2, 1)
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
}</style>