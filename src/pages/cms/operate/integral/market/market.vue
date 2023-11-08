
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('market.market.5ukmt8bntxg0')">
                                <a-select allow-clear v-model="searchInfo.data.type" :placeholder="$t('market.market.5ukmt8bnvoo0')">
                                    <a-option v-for="item in useEnums('cms.operate.integral.market.type')"
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
                        {{ searchInfo.show ? $t('market.market.5ukmt8bnvy40') : $t('market.market.5ukmt8bnw400') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('market.market.5ukmt8bnwbs0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('market.market.5ukmt8bnwik0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['cmsQuoteGoodsCreate']" @click="showVisibleCreate = true" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('market.market.5ukmt8bnwok0')}}
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
                        <a-table-column :title="$t('market.market.5ukmt8bntxg0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.integral.market.type', record.type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('market.market.5ukmt8bnwto0')" data-index="name" :ellipsis="true" :tooltip="true" :width="160"></a-table-column>
                        <a-table-column :title="$t('market.market.5ukmt8bnx0c0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.marketType', record.content.market_type) }}
                                </div>
                            </template>
                        </a-table-column>

                        <a-table-column :title="$t('market.market.5ukmt8bnx680')" data-index="cost" :width="130" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('market.market.5ukmt8bnxbk0')" :width="100">
                            <template #cell="{ record }">
                                <span v-if="$permission(['cmsIntegralGoodsUpdateStatus'])">
                                    <a-switch size="small" v-permission="['cmsIntegralGoodsUpdateStatus']"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('cms.operate.quote.market.status', record.status) }}
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('market.market.5ukmt8bnxgw0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column
                            v-if="$permission(['cmsOperateIntegralMarketDetail', 'cmsIntegralGoodsUpdate', 'cmsIntegralGoodsDelete'])"
                            fixed="right" :title="$t('market.market.5ukmt8bnxlg0')" :width="150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsOperateIntegralMarketDetail'])"
                                        @click="router.push({ name: 'cmsOperateIntegralMarketDetail', params: { id: record.id } })">{{$t('market.market.5ukmt8bnxr40')}}</a-link>
                                    <a-link v-if="$permission(['cmsIntegralGoodsUpdate'])"
                                        @click="updateBtn(record)">{{$t('market.market.5ukmt8bnxwc0')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0')">
                                        <a-link v-if="$permission(['cmsIntegralGoodsDelete'])" status="danger">{{$t('market.market.5ukmt8bny200')}}</a-link>
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
                {{ form.data.id ? $t('market.market.5ukmt8bnxwc0') : $t('market.market.5ukmt8bnwok0') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="type" :label="$t('market.market.5ukmt8bntxg0')">
                                <a-select :disabled="form.data.id" v-model="form.data.type" :placeholder="$t('market.market.5ukmt8bnvoo0')">
                                    <a-option @click="optionBtn(item)"
                                        v-for="item in useEnums('cms.operate.integral.market.type')" :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="name.zh-CN" :label="$t('market.market.5ukmt8bny740')">
                                <a-input v-model="form.data.name['zh-CN']" :placeholder="$t('market.market.5ukmt8bnyc80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="name.en" :label="$t('market.market.5ukmt8bnyhk0')">
                                <a-input v-model="form.data.name.en" :placeholder="$t('market.market.5ukmt8bnyro0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="name.tc" :label="$t('market.market.5ukmt8bnz440')">
                                <a-input v-model="form.data.name.tc" :placeholder="$t('market.market.5ukmt8bnzb00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item  :label="$t('market.market.5ukmt8bnzg00')">
                                <a-input v-model="form.data.desc['zh-CN']" :placeholder="$t('market.market.5ukmt8bnzkk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item  :label="$t('market.market.5ukmt8bnzro0')">
                                <a-input v-model="form.data.desc.en" :placeholder="$t('market.market.5ukmt8bnzwk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('market.market.5ukmt8bo0100')">
                                <a-input v-model="form.data.desc.tc" :placeholder="$t('market.market.5ukmt8bo0540')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.market_type" :label="$t('market.market.5ukmt8bo0940')">
                                <a-select :disabled="form.data.id" v-model="form.data.content.market_type"
                                    :placeholder="$t('market.market.5ukmt8bnvoo0')">
                                    <a-option @click="optionBtn(item)"
                                        v-for="item in useEnums('cms.operate.quote.market.marketType')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.day" :label="$t('market.market.5ukmt8bo0cs0')">
                                <a-input-number :disabled="form.data.id" :style="{ width: '100%' }" :placeholder="$t('market.market.5ukmt8bo0gg0')"
                                    v-model="form.data.content.day" mode="button" class="input-demo" />
                            </a-form-item>
                        </a-col>
                        
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.quote_level" :label="$t('market.market.5ukmt8bo0kg0')">
                                <a-select disabled allow-clear v-model="form.data.content.quote_level" :placeholder="$t('market.market.5ukmt8bnvoo0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.quoteLevel')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.level" :label="$t('market.market.5ukmt8bntxg0')">
                                <a-select :disabled="form.data.id" v-if="form.data.content.market_type == 'US'" allow-clear
                                    v-model="form.data.content.level" :placeholder="$t('market.market.5ukmt8bnvoo0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.levelUS')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                                <a-select :disabled="form.data.id" v-else allow-clear v-model="form.data.content.level"
                                    :placeholder="$t('market.market.5ukmt8bnvoo0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.level')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="cost" :label="$t('market.market.5ukmt8bnx680')">
                                <a-input-number hide-button v-model="form.data.cost" :placeholder="$t('market.market.5ukmt8bo0ok0')">
                                </a-input-number>
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
        type: '',
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
    const { code, data } = await apiCms.cmsIntegralGoodsList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    if (data?.list?.length > 0) {
        data?.list.forEach((item: any) => {
            item.content = JSON.parse(item.content)
        })
    }
    tableData.list = data?.list || []
    tableData.count = data?.count
}


const formRef = ref()
const form: any = reactive({
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
    rules: {
        'name.zh-CN': [{ required: true, message: t('market.market.5ukmt8bnyc80') }],
        'name.en': [{ required: true, message: t('market.market.5ukmt8bnyro0') }],
        'name.tc': [{ required: true, message: t('market.market.5ukmt8bnzb00') }],
        'desc.zh-CN': [{ required: true, message: t('market.market.5ukmt8bnzkk0') }],
        'desc.en': [{ required: true, message: t('market.market.5ukmt8bnzwk0') }],
        'desc.tc': [{ required: true, message: t('market.market.5ukmt8bo0540') }],
        'content.market_type': [{ required: true, message: t('market.market.5ukmt8bo0sk0') }],
        'content.level': [{ required: true, message: t('market.market.5ukmt8bo0wg0') }],
        'content.day': [{ required: true, message: t('market.market.5ukmt8bo0gg0') }],
        type: [{ required: true, message: t('market.market.5ukmt8bo0wg0') }],
        cost: [{ required: true, message: t('market.market.5ukmt8bo0ok0') }],
    }
})
const onClose = async () => {
    form.data = {
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
        formRef.value.resetFields()
}

// const showVisibleUpdate = ref(false)
const updateBtn = async(val: any) => {
    const obj = await getDetail(val.id)
    for (let key in form.data) {
        form.data[key] = obj[key]
    }
    form.data.cost = Number(val.cost)
    form.data.id = val.id
    form.data.content = JSON.parse(obj.content)
    form.data.content.day = Number(form.data.content.day)
    form.data.content.level = Number(form.data.content.level)
    form.data.content.quote_level = Number(form.data.content.quote_level)
    console.log(form.data);
    console.log(form.data.content.day);
    
    showVisibleCreate.value = true
}
// 详情
const getDetail = async (id: any) => {
    const { code, data } = await apiCms.cmsIntegralGoodsInfo({
        goodsId: id
    })
    if (code != 1) return;
    return data
}

// 新增
const showVisibleCreate = ref(false)
const handleCreateSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    if (form.data.id) {
        let param = {...form.data}
        param.content =JSON.stringify(param.content)
        const { code, msg } = await apiCms.cmsIntegralGoodsUpdate({
            goodsId: form.data.id,
            data: param
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    } else {
        let param = {...form.data}
        param.content =JSON.stringify(param.content)
        const { code, msg } = await apiCms.cmsIntegralGoodsCreate({
            data: param
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    }

}
const optionBtn = (val: any) => {
    if (val.value == 'US') {
        form.data.content.quote_level = 1
        form.data.content.currency = 'USD'
        form.data.content.level = form.data.content.level == '3' ? form.data.content.level : ''
    } else {
        form.data.content.quote_level = 2
        form.data.content.currency = 'HKD'
    }

}

// 修改状态
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiCms.cmsIntegralGoodsUpdate({
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
        content: t('market.market.5ukmt8bo10w0'),
    })
    getData();
}
// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiCms.cmsIntegralGoodsDelete({ 'goodsIds': [val.id] })
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
