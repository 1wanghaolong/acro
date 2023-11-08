<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="id" label="ID">
                                <a-input v-model="searchInfo.data.id" :placeholder="$t('affair.affair.5ukfizjotus0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('affair.affair.5ukfizjov7w0')">
                                <a-select v-if="$permission(['cmsProOnlyAffair'])" allow-clear v-model="searchInfo.data.type"
                                    :placeholder="$t('affair.affair.5ukfizjovjk0')">
                                    <a-option v-for="item in useEnums('cms.message.affair.type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                                <a-select v-else allow-clear v-model="searchInfo.data.type" :placeholder="$t('affair.affair.5ukfizjovjk0')">
                                    <a-option v-for="item in useEnums('cms.message.affair.type2')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('affair.affair.5ukfizjovus0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('affair.affair.5ukfizjovjk0')">
                                    <a-option v-for="item in useEnums('cms.message.affair.status')" :value="item.value">{{
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
                        {{ searchInfo.show ? $t('affair.affair.5ukfizjow240') : $t('affair.affair.5ukfizjow7g0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('affair.affair.5ukfizjowdk0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('affair.affair.5ukfizjowk00')}}
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
                        <a-table-column :title="$t('affair.affair.5ukfizjov7w0')" data-index="type" :width="150" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                {{
                                    useEnumsFormat('cms.message.affair.type1', record.type) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('affair.affair.5ukfizjowog0')" :width="450" data-index="content">
                            <template #cell="{ record }">
                                <p :style="{ color: record.type != 1 ? '#165dff' : '' }">{{ record.describe }}</p>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('affair.affair.5ukfizjox000')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('affair.affair.5ukfizjovus0')" data-index="status" :width="100" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.message.affair.status', record.status) }}
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['cmsSystemAffairUpdate'])" fixed="right" :title="$t('affair.affair.5ukfizjox4o0')" :width="local.lang=='en'?100:80">
                            <template #cell="{ record }">
                                <a-space v-if="record.status != 1">
                                    <a-link @click="updateBtn(record)">{{$t('affair.affair.5ukfizjox980')}}</a-link>
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
    </div>
</template>

<script lang="ts" setup>
import { useEnums, useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const router = useRouter()
const route = useRoute()
const searchFormRef = ref()
const searchInfo: any = reactive({
    show: false,
    data: {
        id: '',
        status: '',
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
    const { code, data } = await apiCms.cmsSystemAffairList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}

// 已读
const updateBtn = async (val: any) => {
    const { code } = await apiCms.cmsSystemAffairUpdate({ 'messageIdList': [val.id] })
    if (code != 1) return;
    getData();
    router.go(0)
}
{
    if (route.query?.id) {
        searchInfo.data.id = route.query.id
    }
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}
</style>