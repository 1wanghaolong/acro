
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="marketType" :label="$t('market.market.5ukna40r8i40')">
                                <a-select allow-clear v-model="searchInfo.data.marketType" :placeholder="$t('market.market.5ukna40r99o0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.marketType')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="quoteLevel" :label="$t('market.market.5ukna40r9hk0')">
                                <a-select allow-clear v-model="searchInfo.data.quoteLevel" :placeholder="$t('market.market.5ukna40r99o0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.quoteLevel')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('market.market.5ukna40r9m80')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('market.market.5ukna40r99o0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="level" :label="$t('market.market.5ukna40r9qc0')">
                                <a-select allow-clear v-model="searchInfo.data.level" :placeholder="$t('market.market.5ukna40r99o0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.level')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div class="buttonBox">
                <a-space :size="18">
                    <a-button @click="searchInfo.show = !searchInfo.show">
                        <template #icon>
                            <icon-filter />
                        </template>
                        {{ searchInfo.show ? $t('market.market.5ukna40r9uw0') : $t('market.market.5ukna40r9z80') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('market.market.5ukna40ra4c0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('market.market.5ukna40ra9o0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['cmsQuoteGoodsCreate']" @click="showVisibleCreate = true" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('market.market.5ukna40raeo0')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column title="ID" data-index="id" :width="80"></a-table-column>

                        <a-table-column :title="$t('market.market.5ukna40r8i40')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.marketType', record.market_type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('market.market.5ukna40r9hk0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.quoteLevel', record.quote_level) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('market.market.5ukna40rak00')" data-index="price" :width="130" :ellipsis="true"
                            :tooltip="true">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.price, 2, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('market.market.5ukna40ratk0')" data-index="day" :width="100" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('market.market.5ukna40rb100')" data-index="currency" :width="100" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('market.market.5ukna40r9qc0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.level', record.level) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('market.market.5ukna40r9m80')" :width="100">
                            <template #cell="{ record }">
                                <span v-if="$permission(['cmsQuoteGoodsUpdateStatus'])">
                                    <a-switch size="small" v-permission="['cmsQuoteGoodsUpdateStatus']"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('cms.operate.quote.market.status', record.status) }}
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('market.market.5ukna40rb6w0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>

                        <a-table-column
                            v-if="$permission(['cmsOperateQuoteMarketDetail', 'cmsQuoteGoodsUpdate', 'cmsQuoteGoodsDelete'])"
                            fixed="right" :title="$t('market.market.5ukna40rbcg0')" :width="150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsOperateQuoteMarketDetail'])"
                                        @click="router.push({ name: 'cmsOperateQuoteMarketDetail', params: { id: record.id } })">{{$t('market.market.5ukna40rbhw0')}}</a-link>
                                    <a-link v-if="$permission(['cmsQuoteGoodsUpdate'])"
                                        @click="updateBtn(record)">{{$t('market.market.5ukna40rbqo0')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0')">
                                        <a-link v-if="$permission(['cmsQuoteGoodsDelete'])" status="danger">{{$t('market.market.5ukna40rbwc0')}}</a-link>
                                    </a-popconfirm>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </div>
            <div class="pagination">
                <a-pagination size="small" @change="getData" @page-size-change="getData"
                    v-model:current="searchInfo.data.page" v-model:page-size="searchInfo.data.per_page"
                    :total="tableData.count" show-total show-jumper show-page-size />
            </div>
        </a-card>
        <a-modal width="600px" :mask-closable=false v-model:visible="showVisibleCreate" :on-before-ok="handleCreateSubmit"
            @close="onClose">
            <template #title>
                {{ form.data.id ? $t('market.market.5ukna40rbqo0') : $t('market.market.5ukna40raeo0') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="market_type" :label="$t('market.market.5ukna40r8i40')">
                                <a-select :disabled="form.data.id" v-model="form.data.market_type" :placeholder="$t('market.market.5ukna40r99o0')">
                                    <a-option @click="optionBtn(item)"
                                        v-for="item in useEnums('cms.operate.quote.market.marketType')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" v-if="form.data.market_type" :sm="12" :md="8" :xl="12">
                            <a-form-item field="quote_level" :label="$t('market.market.5ukna40r9hk0')">
                                <a-select disabled allow-clear v-model="form.data.quote_level" :placeholder="$t('market.market.5ukna40r99o0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.quoteLevel')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" v-if="form.data.market_type" :sm="12" :md="8" :xl="12">
                            <a-form-item field="day" :label="$t('market.market.5ukna40ratk0')">
                                <a-input-number :disabled="form.data.id" :style="{ width: '100%' }" :placeholder="$t('market.market.5ukna40rc2o0')"
                                    v-model="form.data.day" mode="button" class="input-demo" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" v-if="form.data.market_type" :sm="12" :md="8" :xl="12">
                            <a-form-item field="price" :label="$t('market.market.5ukna40rak00')">
                                <a-input-number hide-button v-model="form.data.price" :placeholder="$t('market.market.5ukna40rc800')">
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" v-if="form.data.market_type" :sm="12" :md="8" :xl="12">
                            <a-form-item field="currency" :label="$t('market.market.5ukna40rb100')">
                                <a-select :disabled="form.data.id" allow-clear v-model="form.data.currency"
                                    :placeholder="$t('market.market.5ukna40r99o0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" v-if="form.data.market_type" :sm="12" :md="8" :xl="12">
                            <a-form-item field="level" :label="$t('market.market.5ukna40r9qc0')">
                                <a-select :disabled="form.data.id" v-if="form.data.market_type == 'US'" allow-clear
                                    v-model="form.data.level" :placeholder="$t('market.market.5ukna40r99o0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.levelUS')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                                <a-select :disabled="form.data.id" v-else allow-clear v-model="form.data.level"
                                    :placeholder="$t('market.market.5ukna40r99o0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.level')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" v-if="form.data.market_type" :sm="12" :md="8" :xl="12">
                            <a-form-item field="status" :label="$t('market.market.5ukna40r9m80')">
                                <a-select :disabled="form.data.id" allow-clear v-model="form.data.status" :placeholder="$t('market.market.5ukna40r99o0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </a-modal>

    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        marketType: '',
        status: '',
        level: '',
        quoteLevel: '',
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
const getData = async () => {
    tableData.loading = true
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    const { code, data } = await apiCms.cmsQuoteGoodsList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}


const formRef = ref()
const form: any = reactive({
    dataScore: {
        score: 0
    },
    data: {
        market_type: '',
        level: '',
        quote_level: 1,
        price: 0,
        day: 30,
        currency: '',
        status: 1,
    },
    rules: {
        market_type: [{ required: true, message: t('market.market.5ukna40rcec0') }],
        level: [{ required: true, message: t('market.market.5ukna40rcj40') }],
        price: [{ required: true, message: t('market.market.5ukna40rc800') }],
        day: [{ required: true, message: t('market.market.5ukna40rc2o0') }],
        currency: [{ required: true, message: t('market.market.5ukna40rcr40') }],
        status: [{ required: true, message: t('market.market.5ukna40rcvk0') }],
    }
})
const onClose = async () => {
    form.data = {
        market_type: '',
        level: '',
        quote_level: 1,
        price: 0,
        day: 30,
        currency: '',
        status: 1,
    },
        formRef.value.resetFields()
}

// const showVisibleUpdate = ref(false)
const updateBtn = (val: any) => {
    for (let key in form.data) {
        form.data[key] = val[key]
    }
    form.data.price = Number(val.price)
    form.data.id = val.id
    showVisibleCreate.value = true
}

// 新增
const showVisibleCreate = ref(false)
const handleCreateSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    if (form.data.id) {
        const { code, msg } = await apiCms.cmsQuoteGoodsUpdate({
            goodsId: form.data.id,
            data: form.data
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    } else {
        const { code, msg } = await apiCms.cmsQuoteGoodsCreate({
            data: form.data
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    }

}
const optionBtn = (val: any) => {
    if (val.value == 'US') {
        form.data.quote_level = 1
        form.data.currency = 'USD'
        form.data.level = form.data.level == '3' ? form.data.level : ''
    } else {
        form.data.quote_level = 2
        form.data.currency = 'HKD'
    }

}

// 修改状态
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiCms.cmsQuoteGoodsUpdate({
        goodsId: val.id,
        data: {
            status: val.status
        }
    })
    if (code != 1) {
        val.status = val.status == 0 ? 1 : 0
        return
    };
    Message.success({
        content: t('market.market.5ukna40rczk0'),
    })
    getData();
}
// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiCms.cmsQuoteGoodsDelete({ 'goodsIds': [val.id] })
    if (code != 1) return;
    getData();
}
{
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}

:deep(.arco-select-view-disabled) {
    -webkit-text-fill-color: var(--color-text-1);
}

:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>