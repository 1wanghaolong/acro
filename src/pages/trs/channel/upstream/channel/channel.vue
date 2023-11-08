<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('channel.channel.5umxtwwc3mk0')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('channel.channel.5ukm1zdyxj00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('channel.channel.5umxtwwc42o0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('channel.channel.5umxtwwc46o0')">
                                    <a-option v-for="item in useEnums('trs.channel.status')" :value="item.value">{{
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
                        {{ searchInfo.show ? $t('channel.channel.5ukm1zdyyto0') : $t('channel.channel.5ukm1zdyyys0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('channel.channel.5ukm1zdyz400')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('channel.channel.5ukm1zdyz980')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['trsChannelUpstreamChannelCreate']">
                    <a-button @click="router.push({ name: 'trsChannelUpstreamChannelCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('channel.channel.5uklxhia8cs0')}}
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
                        <a-table-column :title="$t('channel.channel.5umxtwwc3mk0')" data-index="name" :width="150"></a-table-column>
                        <a-table-column :title="$t('channel.channel.5umxtwwc4as0')" :width="100">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag size="small"> {{ record.channel }}</a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('channel.channel.5umxtwwc4cs0')" :width="180">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag v-for="item in record?.scene_list" size="small">
                                        {{ useEnumsFormat('market.order.counter_channel_scene', item) }}
                                    </a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('channel.channel.5umxtwwc4f40')" data-index="trs_account_info.currency" :width="80">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag size="small"> {{ record.version }}</a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column title="API" :width="150">
                            <template #cell="{ record }">
                                <a-link @click="useCopy(record.path)">{{ record.path }}</a-link>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('channel.channel.5umxtwwc4hs0')" :width="120">
                            <template #cell="{ record }">
                                <a-badge :status="record.health_status == 1 ? 'success' : 'warning'"
                                    :text="useEnumsFormat('trs.channel.health_status', record.health_status)" />
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('channel.channel.5umxtwwc42o0')" :width="90">
                            <template #cell="{ record }">
                                <a-switch @change="changeStatus(record)" size="small" :checked-value="1"
                                    :unchecked-value="0" v-model="record.status" />
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('channel.channel.5umxtwwc4k00')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.report_time ? dayjs.unix(record.report_time).format('YYYY-MM-DD HH:mm:ss') : '-'
                                }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('channel.channel.5ukm1zdz06o0')" :width="80"
                            v-if="$permission(['trsChannelUpstreamChannelUpdate'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'trsChannelUpstreamChannelUpdate', params: { id: record.id } })">{{$t('channel.channel.5ukm1zdz0aw0')}}</a-link>
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
import { useCopy } from '@/hooks/copy'
import dayjs from 'dayjs'
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        status: '',
        name: '',
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    counterChannelAccount: [],
    count: 0,
    message: [],
    loading: false
})
const changeStatus = async (record: any) => {
    const { code, msg } = await apiTrs.counterChannelUpdate({
        data: {
            id: record.id,
            status: record.status
        }
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
}
const getData = async () => {
    tableData.loading = true
    const formData = cloneDeep(searchInfo.data)
    !formData.status && delete formData.status
    const { code, data } = await apiTrs.counterChannelList({
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
<style>.arco-badge .arco-badge-status-text {
    font-size: 14px;
}</style>