<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">

                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="agentName" :label="$t('settlement.settlement.5uklre6mobo0')">
                                <a-input v-model="searchInfo.data.agentName" :placeholder="$t('settlement.settlement.5uklre6mpw00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="userName" :label="$t('settlement.settlement.5uklre6mq2k0')">
                                <a-input v-model="searchInfo.data.userName" :placeholder="$t('settlement.settlement.5uklre6mpw00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('settlement.settlement.5uklre6mq500')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('settlement.settlement.5uklre6mq9c0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="clearDate" :label="$t('settlement.settlement.5uklre6mqd00')">
                                <a-month-picker v-model="searchInfo.data.clearDate" style="width: 100%;" />
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
                        {{ searchInfo.show ? $t('settlement.settlement.5uklre6mqhc0') : $t('settlement.settlement.5uklre6mqmc0') }}
                    </a-button>
                    <a-button @click="resetBtn">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('settlement.settlement.5uklre6mqq40')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('settlement.settlement.5uklre6mqt40')}}
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
                        <a-table-column :title="$t('settlement.settlement.5uklre6mqxk0')" :width="160" data-index="agent_name" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                <span v-if="record.user_name">
                                    {{ record.agent_name }}({{ record.user_name }})
                                </span>
                                <span v-else>
                                    -
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.settlement.5uklre6mr2w0')" data-index="currency" :width="100">
                            <template #cell="{ record }">
                                {{ record.pid ? $t('settlement.settlement.5uklre6mr600') : $t('settlement.settlement.5uklre6mr880') }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.settlement.5uklre6mqd00')" data-index="clear_date" 
                            :width="100"></a-table-column>
                        <a-table-column :title="$t('settlement.settlement.5uklre6mq500')" data-index="currency" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('currency', record.currency) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.settlement.5uklre6mrac0')" data-index="total_commission" 
                            :width="120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.total_commission, 2, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.settlement.5uklre6mrdc0')" data-index="sub_commission" 
                            :width="120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.sub_commission, 2, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.settlement.5uklre6mrk40')" data-index="draw_commission" 
                            :width="120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.draw_commission, 2, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.settlement.5uklre6mroo0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['cmsAgentSettlementDetail'])" fixed="right" :title="$t('settlement.settlement.5uklre6mrs00')"
                            :width="80">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsAgentSettlementDetail'])"
                                        @click="router.push({ name: 'cmsAgentSettlementDetail', query: { id: record.agent_id } })">{{$t('settlement.settlement.5uklre6mrw40')}}</a-link>
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
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const searchFormRef = ref()
const searchInfo: any = reactive({
    show: false,
    data: {
        agentName: '',
        userName: '',
        currency: '',
        clearDate: '',
        market: route.query?.market || '',
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
    const { code, data } = await apiCms.cmsAgentClearClearList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const resetBtn = () => {
    searchFormRef.value?.resetFields()
    searchInfo.data.market = ''
    searchInfo.data.mobile = ''
    if (route.query?.mobile || route.query?.market) {
        router.push({ name: 'cmsSimulatePosition' })
    }
    getData()
}


{
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}

:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>