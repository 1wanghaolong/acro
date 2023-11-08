<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">

                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="agentName" :label="$t('withdraw.withdraw.5uklo2hw70w0')">
                                <a-input v-model="searchInfo.data.agentName"
                                    :placeholder="$t('withdraw.withdraw.5uklo2hw8a00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="userName" :label="$t('withdraw.withdraw.5uklo2hw8ls0')">
                                <a-input v-model="searchInfo.data.userName"
                                    :placeholder="$t('withdraw.withdraw.5uklo2hw8a00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('withdraw.withdraw.5uklo2hw8u80')">
                                <a-select allow-clear v-model="searchInfo.data.status"
                                    :placeholder="$t('withdraw.withdraw.5uklo2hw8z40')">
                                    <a-option v-for="item in useEnums('cms.agent.withdraw.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="createTime" :label="$t('withdraw.withdraw.5uklo2hw96w0')">
                                <a-range-picker v-model="searchInfo.data.createTime" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="completeTime" :label="$t('withdraw.withdraw.5uklo2hw9cc0')">
                                <a-range-picker v-model="searchInfo.data.completeTime" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('withdraw.withdraw.5uklo2hw9hs0') : $t('withdraw.withdraw.5uklo2hw9n40') }}
                    </a-button>
                    <a-button @click="resetBtn">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{ $t('withdraw.withdraw.5uklo2hw9sg0') }}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{ $t('withdraw.withdraw.5uklo2hw9xk0') }}
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
                        <a-table-column title="ID" data-index="id" :width="60"></a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5uklo2hwaz00')" data-index="agent_name" :width="200"
                            :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                <span v-if="record.user_name">
                                    <a-tooltip :content="$t('withdraw.withdraw.5uklo2hwbd80')" position="right">
                                        <template #content>
                                            <p>{{ $t('withdraw.withdraw.5uklo2hw70w0') }}:{{ record.agent_name }}</p>
                                            <p>{{ $t('withdraw.withdraw.5uklo2hw8ls0') }}:{{ record.user_name }}</p>
                                            <p>{{ $t('withdraw.withdraw.5uklo2hwbnk0') }}:{{ record.mobile }}</p>
                                            <p>{{ $t('withdraw.withdraw.5uklo2hwbu80') }}:{{ record.email }}</p>
                                        </template>
                                        <span> {{ record.agent_name }}({{ record.user_name }})</span>
                                    </a-tooltip>

                                </span>
                                <span v-else>
                                    -
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5uklo2hwc0g0')" data-index="currency" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('currency', record.currency) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5uklo2hwc5w0')" data-index="money" :ellipsis="true"
                            :tooltip="true" :width="140">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.money, 2, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5uklo2hw96w0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5uklo2hw8u80')" data-index="status" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.agent.withdraw.status', record.status) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5uklo2hw9cc0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.complete_time ? dayjs.unix(record.complete_time).format('YYYY-MM-DD') : '--'
                                }}
                                </div>
                                <div>{{ record.complete_time ? dayjs.unix(record.complete_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['cmsAgentWithdrawComplete'])" fixed="right"
                            :title="$t('withdraw.withdraw.5uklo2hwccg0')" :width="80">
                            <template #cell="{ record }">
                                <a-space>
                                    <span v-if="record.status == 1">
                                        <a-popconfirm position="left" @ok="savaBtn(record)"
                                            :content="$t('withdraw.withdraw.5uklo2hwcno0')">
                                            <a-link
                                                v-if="$permission(['cmsAgentWithdrawComplete'])">{{ $t('withdraw.withdraw.5uklo2hwcto0') }}</a-link>
                                        </a-popconfirm>
                                    </span>
                                    <span v-else>
                                    </span>
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
        status: '',
        createTime: [],
        completeTime: [],
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
    const { code, data } = await apiCms.cmsAgentWithdrawList({
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
// 完成
const savaBtn = async (val: any) => {
    const { code } = await apiCms.cmsAgentWithdrawComplete({ 'withdrawId': val.id })
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

:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}</style>