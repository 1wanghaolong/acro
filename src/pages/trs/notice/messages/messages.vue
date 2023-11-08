<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('messages.messages.5umyf8gj09g0')">
                                <a-select allow-clear v-model="searchInfo.data.type" :placeholder="$t('messages.messages.5umyf8gj0pc0')">
                                    <a-option v-for="item in useEnums('trs.notice.message.type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('messages.messages.5umyf8gj0sw0')">
                                <a-range-picker v-model="searchInfo.data.create_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('messages.messages.5umyf8gj0vg0') : $t('messages.messages.5umyf8gj0xg0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('messages.messages.5umyf8gj0zk0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('messages.messages.5umyf8gj11o0')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table" row-key="id">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column title="ID" :width="80">
                            <template #cell="{ record }">
                                <div>{{ record.id }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('messages.messages.5umyf8gj09g0')" :width="local.lang =='en'?300:200">
                            <template #cell="{ record }">
                                <a-tag size="small" v-if="useEnumsFormat('trs.notice.message.type', record.type)">
                                    {{ useEnumsFormat('trs.notice.message.type', record.type) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('messages.messages.5umyf8gj13s0')" data-index="content"></a-table-column>
                        <a-table-column :title="$t('messages.messages.5umyf8gj0sw0')" :width="180">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
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
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        type: '',
        create_time: [],
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
    const formData = cloneDeep(searchInfo.data)
    !formData.status && delete formData.status
    const { code, data } = await apiTrs.messageList({
        ...useFilter(formData)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
{
    getData()
}
</script>
<style>
.arco-badge .arco-badge-status-text {
    font-size: 14px;
}
</style>