
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">

                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('options.options.5uked5iu6ec0')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('options.options.5uked5iu7ds0')" />
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
                        {{ searchInfo.show ? $t('options.options.5uked5iu7hw0') : $t('options.options.5uked5iu7ks0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('options.options.5uked5iu7oo0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('options.options.5uked5iu7rg0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['symbolUserOptionsCreate']" @click="showVisibleCreate = true" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('options.options.5uked5iu7u40')}}
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
                        <a-table-column :title="$t('options.options.5uked5iu7w00')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('market.market', record.market) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('options.options.5uked5iu7yc0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('market.security_type', record.security_type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('options.options.5uked5iu6ec0')" data-index="symbol" :width="100" ></a-table-column>
                        <a-table-column :title="$t('options.options.5uked5iu80w0')" data-index="name" :width="120" ></a-table-column>
                        <a-table-column :title="$t('options.options.5uked5iu85k0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('options.options.5uked5iu8800')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.update_time ? dayjs.unix(record.update_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.update_time ? dayjs.unix(record.update_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>

                        <a-table-column
                            v-if="$permission(['marketStockOptionsDetail', 'symbolUserOptionsUpdate', 'symbolUserOptionsDelete'])"
                            fixed="right" :title="$t('options.options.5uked5iu8a00')" :width="local.lang=='en'?120:100">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['marketStockOptionsDetail'])"
                                        @click="router.push({ name: 'marketStockOptionsDetail', params: { id: record.id } })">{{$t('options.options.5uked5iu8cc0')}}</a-link>
                                    <a-link v-if="$permission(['symbolUserOptionsUpdate'])"
                                        @click="updateBtn(record)">{{$t('options.options.5uked5iu8eo0')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0') ">
                                        <a-link v-if="$permission(['symbolUserOptionsDelete'])" status="danger">{{$t('options.options.5uked5iu8gw0')}}</a-link>
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
                {{ form.data.id ? $t('options.options.5uked5iu8eo0') : $t('options.options.5uked5iu7u40') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="symbol" :label="$t('options.options.5uked5iu8kg0')">
                                <a-select v-model:model-value="form.data.symbol" allow-search :placeholder="$t('options.options.5uked5iu8ms0')"
                                    @search="getSymbolList">
                                    <a-option @click="symbolBtn(item)" v-for="item in (symbolList as any)"
                                        :value="item.symbol">
                                        {{ item.title }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('options.options.5uked5iu7w00')">
                                <a-input disabled v-model="symbolData.marketName" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('options.options.5uked5iu7yc0')">
                                <a-input disabled v-model="symbolData.securityTypeName" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('options.options.5uked5iu80w0')">
                                <a-input disabled v-model="symbolData.symbolName" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="sort" :label="$t('options.options.5uked5iu8ow0')">
                                <a-input-number :style="{ width: '100%' }" :placeholder="$t('options.options.5uked5iu7ds0')" v-model="form.data.sort"
                                    mode="button" class="input-demo" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </a-modal>

    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        symbol: '',
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
    const { code, data } = await apiMarket.symbolUserOptionsList({
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
        symbol: '',
        security_type: '',
        market: '',
        sort: 0
    },
    rules: {
        symbol: [{ required: true, message: t('options.options.5uked5iu8r40') }],
        sort: [{ required: true, message: t('options.options.5uked5iu8u80') }],

    }
})
const onClose = async () => {
    form.data = {
        symbol: '',
        security_type: '',
        market: '',
        sort: 0
    }
    symbolData.value = {}
    formRef.value.resetFields()
}
const updateBtn = async (val: any) => {
    const obj = await getDetail(val.id)
    for (let key in form.data) {
        form.data[key] = obj[key]
    }
    symbolData.value.marketName = useEnumsFormat('market.market', obj.market)
    symbolData.value.securityTypeName = useEnumsFormat('market.security_type', obj.security_type)
    symbolData.value.symbolName = obj.name
    form.data.symbol = obj.symbol + '.' + obj.market
    form.data.id = val.id
    form.data.sort = obj.sort
    showVisibleCreate.value = true
}
// 详情
const getDetail = async (id: any) => {
    const { code, data } = await apiMarket.symbolUserOptionsInfo({
        optionId: id
    })
    if (code != 1) return;
    return data
}
// 新增
const showVisibleCreate = ref(false)
const handleCreateSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    let params = { ...form.data }
    if (symbolData.value.market) {
        params.market = symbolData.value.market
        params.security_type = symbolData.value.security_type
        params.symbol = symbolData.value.symbol.split('.')[0] + ''
    }
    params.symbol = form.data.symbol.split('.')[0] + ''
    if (form.data.id) {
        const { code, msg } = await apiMarket.symbolUserOptionsUpdate({
            optionId: form.data.id,
            data: params
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    } else {
        const { code, msg } = await apiMarket.symbolUserOptionsCreate({
            data: params
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    }

}

const symbolData: any = ref({})
const symbolBtn = (val: any) => {
    symbolData.value = val
    symbolData.value.marketName = useEnumsFormat('market.market', val.market)
    symbolData.value.securityTypeName = useEnumsFormat('market.security_type', val.security_type)
    symbolData.value.symbolName = val.name[local.lang]
}
const symbolList = ref([])
const getSymbolList = async (value: string) => {
    const { code, data } = await apiMarket.symbolSearch({ keyword: value })
    if (code != 1) return;
    symbolList.value = data.list.map((item: any) => {
        item.symbol = item.symbol + '.' + item.market
        item.title = item.text
        return item
    })
}

// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiMarket.symbolUserOptionsDelete({ 'optionIds': [val.id] })
    if (code != 1) return;
    getData();
}
{
    getData()
}
</script>
<style scoped lang="less">
:deep(.arco-typography) {
    margin-bottom: 0;
}

:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>