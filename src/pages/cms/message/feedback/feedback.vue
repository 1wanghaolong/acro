<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('feedback.feedback.5ukn82skob40')">
                                <a-input v-model="searchInfo.data.mobile"
                                    :placeholder="$t('feedback.feedback.5ukn82skpro0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('feedback.feedback.5ukn82skq280')">
                                <a-select allow-clear v-model="searchInfo.data.status"
                                    :placeholder="$t('feedback.feedback.5ukn82skq7s0')">
                                    <a-option v-for="item in useEnums('cms.message.feedback.status')" :value="item.value">{{
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
                        {{ searchInfo.show ? $t('feedback.feedback.5ukn82skqd00') : $t('feedback.feedback.5ukn82skqhc0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{ $t('feedback.feedback.5ukn82skqjs0') }}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{ $t('feedback.feedback.5ukn82skqm00') }}
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
                        <a-table-column :title="$t('feedback.feedback.5ukn82skqow0')" data-index="username" :ellipsis="true"
                            :tooltip="true" :width="140"></a-table-column>
                        <a-table-column :title="$t('feedback.feedback.5ukn82skob40')" data-index="mobile" :width="130"
                            :ellipsis="true" :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('feedback.feedback.5ukn82skqss0')" data-index="content" :width="260">
                            <template #cell="{ record }">
                                <ContentEllipsis :content="record.content" > </ContentEllipsis>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('feedback.feedback.5ukn82skrag0')" data-index="reply" :width="260"
                            :ellipsis="true" :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('feedback.feedback.5ukn82skq280')" data-index="status" :width="100"
                            :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                {{
                                    useEnumsFormat('cms.message.feedback.status', record.status) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('feedback.feedback.5ukn82skrfc0')" :width="local.lang == 'en' ? 140 : 120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['cmsMessageFeedbackDetail', 'cmsUserFeedbackDelete'])"
                            fixed="right" :title="$t('feedback.feedback.5ukn82skrjk0')" :width="local.lang == 'en' ? 140 : 120">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsMessageFeedbackDetail'])"
                                        @click="router.push({ name: 'cmsMessageFeedbackDetail', params: { id: record.id } })">{{ $t('feedback.feedback.5ukn82skro00') }}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)"
                                        :content="$t('problem.problem.5ukdvvdbjrg0')">
                                        <a-link v-if="$permission(['cmsUserFeedbackDelete'])"
                                            status="danger">{{ $t('feedback.feedback.5ukn82skrso0') }}</a-link>
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
    </div>
</template>

<script lang="ts" setup>
import { useEnums, useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        mobile: '',
        status: '',
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
    const { code, data } = await apiCms.cmsUserFeedbackList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}

// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiCms.cmsUserFeedbackDelete({ 'feedbackIds': [val.id] })
    if (code != 1) return;
    getData();
}
{
    getData()
}
</script>
<style scoped>:deep(.arco-typography) {
    margin-bottom: 0;
}</style>