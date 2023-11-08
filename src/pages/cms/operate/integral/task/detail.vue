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
                            <a-form-item field="type" :label="$t('task.detail.5ukioic8gpg0')">
                                <a-select disabled v-model="form.data.type" :placeholder="$t('task.detail.5ukioic8j100')">
                                    <a-option v-for="item in useEnums('cms.operate.integral.task.type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <template v-if="form.data.type == 'add_optional'">
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item field="rule.symbol" :label="$t('task.detail.5ukioic8jk80')">
                                    <a-select disabled v-model:model-value="form.data.rule.symbol" allow-search
                                        :placeholder="$t('task.detail.5ukioic8jq80')" @search="getSymbolList">
                                        <a-option @click="symbolBtn(item)" v-for="item in (symbolList as any)"
                                            :value="item.symbol">
                                            {{ item.title }}
                                        </a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item field="rule.market" :label="$t('task.detail.5ukioic8jv00')">
                                    <a-select disabled v-model="form.data.rule.market" :placeholder="$t('task.detail.5ukioic8j100')">
                                        <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </template>
                        <template v-if="form.data.type == 'trade_security'">
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('task.detail.5ukioic8jk80')">
                                    <a-select disabled v-model:model-value="form.data.rule.symbol" allow-search
                                        :placeholder="$t('task.detail.5ukioic8jq80')" @search="getSymbolList">
                                        <a-option @click="symbolBtn(item)" v-for="item in (symbolList as any)"
                                            :value="item.symbol">
                                            {{ item.title }}
                                        </a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item field="rule.market" :label="$t('task.detail.5ukioic8jv00')">
                                    <a-select disabled v-model="form.data.rule.market" :placeholder="$t('task.detail.5ukioic8j100')">
                                        <a-option v-for="item in marketAll"
                                            :value="item.value">{{
                                                item.trans[local.lang] }}</a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item field="rule.times" :label="$t('task.detail.5ukioic8k0g0')">
                                    <a-input-number disabled hide-button v-model="form.data.rule.times"
                                        :placeholder="$t('task.detail.5ukioic8k4w0')">
                                    </a-input-number>
                                </a-form-item>
                            </a-col>
                        </template>
                        <template v-if="form.data.type == 'total_cash_in'">
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item field="rule.currency" :label="$t('task.detail.5ukioic8k940')">
                                    <a-select disabled v-model="form.data.rule.currency" :placeholder="$t('task.detail.5ukioic8j100')">
                                        <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item field="rule.amount" :label="$t('task.detail.5ukioic8kdc0')">
                                    <a-input-number disabled hide-button v-model="form.data.rule.amount"
                                        :placeholder="$t('task.detail.5ukioic8kqg0')">
                                    </a-input-number>
                                </a-form-item>
                            </a-col>
                        </template>
                        <template v-if="form.data.type == 'first_cash_in'">
                            <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item field="rule.currency" :label="$t('task.detail.5ukioic8k940')">
                                    <a-select disabled v-model="form.data.rule.currency" :placeholder="$t('task.detail.5ukioic8j100')">
                                        <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </template>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item field="name.zh-CN" :label="$t('task.detail.5ukioic8kxo0')">
                                <a-input disabled v-model="form.data.name['zh-CN']" :placeholder="$t('task.detail.5ukioic8l1s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="name.en" :label="$t('task.detail.5ukioic8l680')">
                                <a-input disabled v-model="form.data.name.en" :placeholder="$t('task.detail.5ukioic8l9s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="name.tc" :label="$t('task.detail.5ukioic8leg0')">
                                <a-input disabled v-model="form.data.name.tc" :placeholder="$t('task.detail.5ukioic8lio0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="score" :label="$t('task.detail.5ukioic8lmc0')">
                                <a-input-number disabled hide-button v-model="form.data.score" :placeholder="$t('task.detail.5ukioic8lw00')">
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('task.detail.5ukioic8m2k0')">
                                <a-input disabled hide-button v-model="form.data.expire_day" :placeholder="$t('task.detail.5ukioic8m880')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="status" :label="$t('task.detail.5ukioic8mdk0')">
                                <a-select disabled allow-clear v-model="form.data.status" :placeholder="$t('task.detail.5ukioic8j100')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="icon" :label="$t('task.detail.5ukioic8mi40')">
                                <a-image height="62" :src="form.data.icon" v-if="form.data.icon">
                                    <template #loader>
                                        <img :src="form.data.icon" style="filter: blur(5px)" />
                                    </template>
                                </a-image>
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
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
let marketAll = [...useEnums('market.market'),{"value": 'ALL',"trans": {"zh-CN": "不限", "tc": "不限","en": "ALL"}}]
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        type: '',
        score: 0,
        expire_type: '',
        expire_day: '',
        is_auto_receive: '',
        icon: [],
        status: '',
        rule: {
            market: '',
            security_type: '',
            symbol: '',
            times: '',
            currency: '',
            amount: '',
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
    const { code, data } = await apiCms.cmsIntegralTaskInfo({
        taskId: route.params?.id
    })
    if (code != 1) return;
    form.data = data
    form.data.expire_day = form.data.expire_day + t('task.detail.5ukioic8mww0')
    if (form.data.rule.times) {
        form.data.rule.times = Number(form.data.rule.times)
    }
    if (form.data.rule.amount) {
        form.data.rule.amount = Number(form.data.rule.amount)
    }

}
const symbolData = ref()
const symbolBtn = (val: any) => {
    symbolData.value = val
}
const symbolList = ref([])
const getSymbolList = async (value: string) => {
    const { code, data } = await apiMarket.symbolSearch({ keyword: value })
    if (code != 1) return;
    symbolList.value = data.list.map((item: any) => {
        item.symbol = item.symbol + ',' + item.market
        item.title = item.text
        return item
    })
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