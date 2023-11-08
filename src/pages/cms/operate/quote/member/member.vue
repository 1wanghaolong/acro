
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('member.member.5ukfye02fy80')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('member.member.5ukfye02h5c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="marketType" :label="$t('member.member.5ukfye02hgc0')">
                                <a-select allow-clear v-model="searchInfo.data.marketType" :placeholder="$t('member.member.5ukfye02hk80')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.marketType')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="quoteLevel" :label="$t('member.member.5ukfye02hms0')">
                                <a-select allow-clear v-model="searchInfo.data.quoteLevel" :placeholder="$t('member.member.5ukfye02hk80')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.quoteLevel')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="level" :label="$t('member.member.5ukfye02hs00')">
                                <a-select allow-clear v-model="searchInfo.data.level" :placeholder="$t('member.member.5ukfye02hk80')">
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
                        {{ searchInfo.show ? $t('member.member.5ukfye02hug0') : $t('member.member.5ukfye02hx00') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('member.member.5ukfye02hzc0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('member.member.5ukfye02i200')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['cmsQuoteMemberCreate']" @click="showVisibleCreate = true" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('member.member.5ukfye02i400')}}
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

                        <a-table-column :title="$t('member.member.5ukfye02hgc0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.marketType', record.market_type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('member.member.5ukfye02i6k0')" data-index="real_name" :width="130" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('member.member.5ukfye02fy80')" data-index="mobile" :width="130" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('member.member.5ukfye02hms0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.quoteLevel', record.quote_level) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('member.member.5ukfye02hs00')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.level', record.level) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('member.member.5ukfye02i980')" data-index="remain_day" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('member.member.5ukfye02ibs0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
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
                {{ $t('member.member.5ukfye02i400') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="user_id" :label="$t('member.member.5ukfye02ids0')">
                                <a-select v-model:model-value="form.data.user_id" allow-search :placeholder="$t('member.member.5ukfye02ids0')"
                                    @search="getUserList">
                                    <a-option v-for="item in (userList as any)" :value="item.id">
                                        {{ item.title }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="market_type" :label="$t('member.member.5ukfye02hgc0')">
                                <a-select v-model="form.data.market_type" :placeholder="$t('member.member.5ukfye02hk80')">
                                    <a-option @click="optionBtn(item)"
                                        v-for="item in useEnums('cms.operate.quote.market.marketType')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="quote_level" :label="$t('member.member.5ukfye02hms0')">
                                <a-select disabled allow-clear v-model="form.data.quote_level" :placeholder="$t('member.member.5ukfye02hk80')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.quoteLevel')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="day" :label="$t('member.member.5ukfye02iis0')">
                                <a-input-number :style="{ width: '100%' }" :placeholder="$t('member.member.5ukfye02imo0')" v-model="form.data.day"
                                    mode="button" class="input-demo" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="level" :label="$t('member.member.5ukfye02hs00')">
                                <a-select v-if="form.data.market_type == 'US'" allow-clear v-model="form.data.level"
                                    :placeholder="$t('member.member.5ukfye02hk80')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.levelUS')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                                <a-select v-else allow-clear v-model="form.data.level" :placeholder="$t('member.member.5ukfye02hk80')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.level')"
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
// const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        marketType: '',
        mobile: '',
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
    const { code, data } = await apiCms.cmsQuoteMemberList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}


const formRef = ref()
const form: any = reactive({
    data: {
        user_id: '',
        market_type: 'HK',
        level: '',
        quote_level: 2,
        day: 30,
    },
    rules: {
        user_id: [{ required: true, message: t('member.member.5ukfye02ip40') }],
        market_type: [{ required: true, message: t('member.member.5ukfye02irk0') }],
        level: [{ required: true, message: t('member.member.5ukfye02its0') }],
        day: [{ required: true, message: t('member.member.5ukfye02imo0') }],
    }
})
const onClose = async () => {
    form.data = {
        user_id: '',
        market_type: 'HK',
        level: '',
        quote_level: 2,
        day: 30,
    }
    formRef.value.resetFields()
}


// 新增
const showVisibleCreate = ref(false)
const handleCreateSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    const { code, msg } = await apiCms.cmsQuoteMemberCreate({
        data: form.data
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData();
    return true

}
const optionBtn = (val: any) => {
    if (val.value == 'US') {
        form.data.quote_level = 1
        form.data.level = form.data.level == '3' ? form.data.level : ''
    } else {
        form.data.quote_level = 2
    }

}
const userList = ref([])
const getUserList = async (value: string) => {
    const { code, data } = await apiCms.cmsUserDestroySearch({ keyword: value })
    if (code != 1) return;
    userList.value = data.list.map((item: any) => {
        item.title = `(${item.country_code}) ${item.mobile}`
        return item
    })
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
</style>