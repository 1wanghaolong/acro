
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('hot.hot.5ukix5eqonk0')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('hot.hot.5ukix5eqpog0')">
                                    <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('hot.hot.5ukix5eqpt80')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('hot.hot.5ukix5eqpw00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('hot.hot.5ukix5eqpyo0')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('hot.hot.5ukix5eqpw00')" />
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
                        {{ searchInfo.show ? $t('hot.hot.5ukix5eqq180') : $t('hot.hot.5ukix5eqq3k0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('hot.hot.5ukix5eqq600')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('hot.hot.5ukix5eqq8g0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['cmsSymbolHotCreate']" @click="showVisibleCreate = true" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('hot.hot.5ukix5eqqb40')}}
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
                        <a-table-column :title="$t('hot.hot.5ukix5eqonk0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('market.market', record.market) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('hot.hot.5ukix5eqqe00')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('market.security_type', record.security_type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('hot.hot.5ukix5eqpt80')" data-index="symbol" :width="100" ></a-table-column>
                        <a-table-column :title="$t('hot.hot.5ukix5eqpyo0')" data-index="name" :width="100" ></a-table-column>
                        <a-table-column :title="$t('hot.hot.5ukix5eqqgg0')" data-index="content">
                            <template #cell="{ record }">
                                <ContentEllipsis :content="record.desc" > </ContentEllipsis>
                            </template>
                        </a-table-column>

                        <a-table-column :title="$t('hot.hot.5ukix5eqqqg0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.update_time ? dayjs.unix(record.update_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.update_time ? dayjs.unix(record.update_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>

                        <a-table-column
                            v-if="$permission(['cmsOperateSymbolHotDetail', 'cmsSymbolHotUpdate', 'cmsSymbolHotDelete'])"
                            fixed="right" :title="$t('hot.hot.5ukix5eqqu00')" :width="local.lang=='en'?170:150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsOperateSymbolHotDetail'])"
                                        @click="router.push({ name: 'cmsOperateSymbolHotDetail', params: { id: record.id } })">{{$t('hot.hot.5ukix5eqqxg0')}}</a-link>
                                    <a-link v-if="$permission(['cmsSymbolHotUpdate'])"
                                        @click="updateBtn(record)">{{$t('hot.hot.5ukix5eqr1c0')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0') ">
                                        <a-link v-if="$permission(['cmsSymbolHotDelete'])" status="danger">{{$t('hot.hot.5ukix5eqr3s0')}}</a-link>
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
                {{ form.data.id ? $t('hot.hot.5ukix5eqr1c0') : $t('hot.hot.5ukix5eqqb40') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="symbol" :label="$t('hot.hot.5ukix5eqpt80')">
                                <a-select v-model:model-value="form.data.symbol" allow-search :placeholder="$t('hot.hot.5ukix5eqr680')"
                                    @search="getSymbolList">
                                    <a-option @click="symbolBtn(item)" v-for="item in (symbolList as any)"
                                        :value="item.symbol">
                                        {{ item.title }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('hot.hot.5ukix5eqonk0')">
                                <a-input disabled v-model="symbolData.marketName" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('hot.hot.5ukix5eqqe00')">
                                <a-input disabled v-model="symbolData.securityTypeName" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('hot.hot.5ukix5eqpyo0')">
                                <a-input disabled v-model="symbolData.symbolName" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="title.zh-CN" :label="$t('hot.hot.5ukix5eqr9o0')">
                                <a-input v-model="form.data.title['zh-CN']" :placeholder="$t('hot.hot.5ukix5eqrc40')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="title.en" :label="$t('hot.hot.5ukix5eqrek0')">
                                <a-input v-model="form.data.title.en" :placeholder="$t('hot.hot.5ukix5eqrh00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="title.tc" :label="$t('hot.hot.5ukix5eqrj00')">
                                <a-input v-model="form.data.title.tc" :placeholder="$t('hot.hot.5ukix5eqrks0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="desc.zh-CN" :label="$t('hot.hot.5ukix5eqrmo0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 3, maxRows: 3 }"
                                    v-model="form.data.desc['zh-CN']" :placeholder="$t('hot.hot.5ukix5eqrog0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="desc.en" :label="$t('hot.hot.5ukix5eqrr40')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 3, maxRows: 3 }"
                                    v-model="form.data.desc.en" :placeholder="$t('hot.hot.5ukix5eqruc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="desc.tc" :label="$t('hot.hot.5ukix5eqry00')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 3, maxRows: 3 }"
                                    v-model="form.data.desc.tc" :placeholder="$t('hot.hot.5ukix5eqs0o0')" />
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.id" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('hot.hot.5ukix5eqs3c0')">
                                <a-input-number :style="{ width: '100%' }" :placeholder="$t('hot.hot.5ukix5eqpw00')" v-model="form.data.sort"
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
        name: '',
        symbol: '',
        market: '',
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
    const { code, data } = await apiCms.cmsSymbolHotList({
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
        // sort: 0
    },
    rules: {
        symbol: [{ required: true, message:t('hot.hot.5ukix5eqs7c0') }],
        'title.zh-CN': [{ required: true, message:t('hot.hot.5ukix5eqrc40') }],
        'title.en': [{ required: true, message:t('hot.hot.5ukix5eqrh00') }],
        'title.tc': [{ required: true, message:t('hot.hot.5ukix5eqrks0') }],
        'desc.zh-CN': [{ required: true, message:t('hot.hot.5ukix5eqrog0') }],
        'desc.en': [{ required: true, message:t('hot.hot.5ukix5eqruc0') }],
        'desc.tc': [{ required: true, message:t('hot.hot.5ukix5eqs0o0') }],
    }
})
const onClose = async () => {
    form.data = {
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
        // sort: 0
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
    console.log(obj);

    symbolData.value.symbolName = obj.name[local.lang]
    form.data.symbol = obj.symbol + '.' + obj.market
    form.data.id = val.id
    form.data.sort = obj.sort
    showVisibleCreate.value = true
}
// 详情
const getDetail = async (id: any) => {
    const { code, data } = await apiCms.cmsSymbolHotInfo({
        hotId: id
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
        const { code, msg } = await apiCms.cmsSymbolHotUpdate({
            hotId: form.data.id,
            data: params
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    } else {
        const { code, msg } = await apiCms.cmsSymbolHotCreate({
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
    const { code } = await apiCms.cmsSymbolHotDelete({ 'hotIds': [val.id] })
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