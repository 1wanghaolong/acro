<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('comment.comment.5ukfdek3x440')">
                                <a-input v-model="searchInfo.data.mobile"
                                    :placeholder="$t('comment.comment.5ukfdek42tw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('comment.comment.5ukfdek43qw0')">
                                <a-select allow-clear v-model="searchInfo.data.status"
                                    :placeholder="$t('comment.comment.5ukfdek442s0')">
                                    <a-option v-for="item in useEnums('cms.message.comment.status')" :value="item.value">{{
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
                        {{ searchInfo.show ? $t('comment.comment.5ukfdek449s0') : $t('comment.comment.5ukfdek44ig0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{ $t('comment.comment.5ukfdek44s40') }}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{ $t('comment.comment.5ukfdek45080') }}
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
                        <a-table-column :title="$t('comment.comment.5ukfdek459o0')" data-index="username" :ellipsis="true"
                            :tooltip="true" :width="140"></a-table-column>
                        <a-table-column :title="$t('comment.comment.5ukfdek3x440')" data-index="mobile" :ellipsis="true"
                            :tooltip="true" :width="130"></a-table-column>
                        <a-table-column :title="$t('comment.comment.5ukfdek45io0')" data-index="market" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('market.market', record.market) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('comment.comment.5ukfdek45ro0')" data-index="symbol"
                            :width="100"></a-table-column>
                        <a-table-column :title="$t('comment.comment.5ukfdek461w0')" data-index="content" :width="220">
                            <template #cell="{ record }">
                                <ContentEllipsis :content="record.content" > </ContentEllipsis>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('comment.comment.5ukfdek47cg0')" :width="180">
                            <template #cell="{ record }">
                                <div v-if="record.image?.length">
                                    <template v-for="item in record.image">
                                        <a-image style="margin:2px" width="40" height="40" :src="item">
                                            <template #loader>
                                                <img width="40" :src="item" style="filter: blur(5px)" />
                                            </template>
                                        </a-image>
                                    </template>
                                </div>
                                <div v-else>{{ '' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('comment.comment.5ukfdek47ps0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('comment.comment.5ukfdek47y00')" :width="100">
                            <template #cell="{ record }">
                                <span>
                                    {{ useEnumsFormat('cms.message.comment.status', record.status) }}
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column
                            v-if="$permission(['cmsMessageCommentDetail', 'cmsMessageCommentUpdate', 'cmsUserCommentDelete'])"
                            fixed="right" :title="$t('comment.comment.5ukfdek48a40')" :width="local.lang == 'en' ? 180 : 150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsMessageCommentUpdate'])"
                                        @click="router.push({ name: 'cmsMessageCommentUpdate', params: { id: record.id } })">{{ $t('comment.comment.5ukfdek48ng0') }}</a-link>
                                    <a-link v-if="$permission(['cmsMessageCommentDetail'])"
                                        @click="router.push({ name: 'cmsMessageCommentDetail', params: { id: record.id } })">{{ $t('comment.comment.5ukfdek48xs0') }}</a-link>

                                    <a-popconfirm position="left" @ok="deleteBtn(record)"
                                        :content="$t('problem.problem.5ukdvvdbjrg0')">
                                        <a-link v-if="$permission(['cmsUserCommentDelete'])"
                                            status="danger">{{ $t('comment.comment.5ukfdek49dg0') }}</a-link>
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
    const { code, data } = await apiCms.cmsUserCommentList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}

// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiCms.cmsUserCommentDelete({ 'commentIds': [val.id] })
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