<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="`TRS${ $t('contract.contract.5umx2tcimnw0') }`">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('contract.contract.5um850qvmvc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('contract.contract.5um850qvn9w0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('contract.contract.5um850qvmvc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('contract.contract.5umx2tcinb00')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('contract.contract.5um850qvmvc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="settlement_status" :label="$t('contract.contract.5umx2tcinhk0')">
                                <a-select allow-clear v-model="searchInfo.data.settlement_status" :placeholder="$t('contract.contract.5umx2tcinmk0')">
                                    <a-option v-for="item in useEnums('trs.account.settlement_status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="settlement_time" :label="$t('contract.contract.5um850qvnmk0')">
                                <a-range-picker v-model="searchInfo.data.settlement_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('contract.contract.5um850qvnp00') : $t('contract.contract.5um850qvntg0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('contract.contract.5um850qvny80')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('contract.contract.5um850qvo300')}}
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
                        <a-table-column :title="`TRS${ $t('contract.contract.5umx2tcimnw0') }`" data-index="trs_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('contract.contract.5umx2tcinb00')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('contract.contract.5um850qvn9w0')" data-index="asset_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('contract.contract.5um850qvn240')" data-index="trs_account_info.currency" :width="90">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.trs_account_info?.currency || $t('contract.contract.5um850qvoak0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('contract.contract.5umx2tcinhk0')" :width="120">
                            <template #cell="{ record }">
                                <a-tag size="small"
                                    :color="record.settlement_status == 2 ? '#00b42a' : record.settlement_status == 1 ? '#ff7d00' : '#f53f3f'">
                                    {{ useEnumsFormat('trs.account.settlement_status', record.settlement_status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('contract.contract.5umx2tcinrk0')" :width="140">
                            <template #cell="{ record }">
                                <div>{{
                                    record.trs_account_info?.expire_time ?
                                    dayjs.unix(record.trs_account_info?.expire_time).format('YYYY-MM-DD HH: mm: ss') : ' - '
                                }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('contract.contract.5um850qvnmk0')" :width="140">
                            <template #cell="{ record }">
                                <div>{{ record.settlement_time ? dayjs.unix(record.settlement_time).format('YYYY-MM-DD HH:mm:ss'):' - ' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('contract.contract.5um850qvp8g0')" :width="80"
                            v-if="$permission(['trsSettlementContractDetail'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'trsSettlementContractDetail', params: { id: record.id } })">{{$t('contract.contract.5um850qvpao0')}}</a-link>
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
const route = useRoute()
const searchInfo:any = reactive({
    show: false,
    data: {
        trs_account: '',
        asset_account: '',
        real_name: '',
        settlement_status: '',
        settlement_time: [],
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
const getData = async () => {
    tableData.loading = true
    const formData = cloneDeep(searchInfo.data)
    formData.settlement_status === '' && delete formData.settlement_status
    const { code, data } = await apiTrs.settlementList({
        ...useFilter(formData)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
{
    if (route.query?.settlement_status) {
        searchInfo.data.settlement_status = Number(route.query.settlement_status)
    }
    getData()
}
</script>