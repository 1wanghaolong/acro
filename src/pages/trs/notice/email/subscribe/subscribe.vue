<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('subscribe.subscribe.5umye8g1z7g0')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('subscribe.subscribe.5umye8g208s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="email" :label="$t('subscribe.subscribe.5umye8g20jc0')">
                                <a-input v-model="searchInfo.data.email" :placeholder="$t('subscribe.subscribe.5umye8g20tk0')" />
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
                        {{ searchInfo.show ? $t('subscribe.subscribe.5umye8g20xo0') : $t('subscribe.subscribe.5umye8g215c0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('subscribe.subscribe.5umye8g218k0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('subscribe.subscribe.5umye8g21bs0')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['trsNoticeEmailSubscribeCreate']">
                    <a-button @click="router.push({ name: 'trsNoticeEmailSubscribeCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('subscribe.subscribe.5umye8g21mo0')}}
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
                        <a-table-column :title="$t('subscribe.subscribe.5umye8g1z7g0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('subscribe.subscribe.5umye8g20jc0')" :width="200">
                            <template #cell="{ record }">
                                <div>{{ record.email }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('subscribe.subscribe.5umye8g21ps0')" :width="200">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag size="small" v-if="record.type.indexOf('risk_control_notice') != -1">
                                        {{ useEnumsFormat('trs.notice.subscribeMessage.type', 'risk_control_notice') }}
                                    </a-tag>
                                    <a-tag size="small" v-if="record.type.indexOf('not_upload_create_odd_lot_order') != -1">
                                        {{
                                            useEnumsFormat('trs.notice.subscribeMessage.type', 'not_upload_create_odd_lot_order')
                                        }}
                                    </a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('subscribe.subscribe.5umye8g21tg0')" :width="120"
                            v-if="$permission(['trsNoticeEmailSubscribeUpdate', 'trsNoticeEmailSubscribeDelete'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['trsNoticeEmailSubscribeUpdate']"
                                        @click="router.push({ name: 'trsNoticeEmailSubscribeUpdate', params: { id: record.id } })">{{$t('subscribe.subscribe.5umye8g21ws0')}}</a-link>
                                    <a-popconfirm position="left" @ok="del(record)" :content="`${ $t('subscribe.subscribe.5umyepm896g0') }?` ">
                                        <a-link v-permission="['trsNoticeEmailSubscribeDelete']" status="danger">{{$t('subscribe.subscribe.5umye8g22000')}}</a-link>
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
import { useEnumsFormat } from '@/hooks/enums'
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        name: '',
        email: '',
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
const del = async (record: any) => {
    const { code, msg } = await apiTrs.messageSubscribeDelete({
        id: String(record.id)
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    tableData.loading = true
    const formData = cloneDeep(searchInfo.data)
    !formData.status && delete formData.status
    const { code, data } = await apiTrs.messageSubscribeList({
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
}</style>