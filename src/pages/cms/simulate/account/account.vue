<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('account.account.5ukfohnhbjg0')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('account.account.5ukfohnhcvs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('account.account.5ukfohnhd4g0')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('account.account.5ukfohnhcvs0')" />
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
                        {{ searchInfo.show ? $t('account.account.5ukfohnhdbk0') : $t('account.account.5ukfohnhdfs0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('account.account.5ukfohnhdjs0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('account.account.5ukfohnhdo40')}}
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
                       
                        <a-table-column :title="$t('account.account.5ukfohnhbjg0')" data-index="mobile" :ellipsis="true" :tooltip="true"
                            :width="130"></a-table-column>
                            <a-table-column :title="$t('account.account.5ukfohnhd4g0')" data-index="real_name" :ellipsis="true" :tooltip="true"
                            :width="100"></a-table-column>
                        <a-table-column :title="$t('account.account.5ukfohnhdro0')" data-index="type" :width="80">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('market.market_type', record.type) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5ukfohnhdvw0')" data-index="currency"
                            :width="80"></a-table-column>
                        <a-table-column :title="$t('account.account.5ukfohnhdzo0')" data-index="total_asset" :width="160">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.total_asset, 2, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5ukfohnhe300')" data-index="market_value" :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.market_value) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5ukfohnhe7c0')" data-index="balance" :width="160">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.balance, 2, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5ukfohnhecc0')" data-index="total_profit" :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.total_profit) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5ukfohnhejg0')" data-index="total_profit_rate" :width="local.lang=='en'?160:120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.total_profit_rate * 100, 2, 1) }}%
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5ukfohnheq40')" data-index="positions_profit" :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.positions_profit) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5ukfohnhetk0')" data-index="today_profit" :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.today_profit) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5ukfohnhex80')" data-index="today_profit_rate" :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.today_profit_rate * 100, 2, 1) }}%
                            </template>
                        </a-table-column>
                            <a-table-column :title="$t('account.account.5ukfohnhf140')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column
                            v-if="$permission(['cmsSimulatePosition', 'cmsSimulateEntrust'])"
                            fixed="right" :title="$t('account.account.5ukfohnhf4o0')" :width="local.lang=='en'?150:100">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsSimulateEntrust'])"
                                    @click="router.push({ name: 'cmsSimulateEntrust', query: { mobile: record.mobile,market: record.type } })">{{$t('account.account.5ukfohnhf8w0')}}</a-link>
                                    <a-link v-if="$permission(['cmsSimulatePosition'])"
                                    @click="router.push({ name: 'cmsSimulatePosition', query: { mobile: record.mobile,market: record.type } })">{{$t('account.account.5ukfohnhfdc0')}}</a-link>
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
import dayjs from 'dayjs'
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        mobile: '',
        real_name: '',

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
    const { code, data } = await apiCms.cmsSimulateAccountList({
        ...useFilter(param)
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
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}
</style>