<template>
    <a-tabs v-model:active-key="active" @change="getData" justify>
        <a-tab-pane key="" :title="$t('exchange.exchange.5um3q2kznwc0')" :disabled="tableData.loading">
            <div class="tabBox">
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
                            <a-table-column :title="$t('exchange.exchange.5um3q2kzob40')" :width="100" :ellipsis="true" :tooltip="true"> 
                                <template #cell="{ record }">
                                    <div>{{ record.asset_account_info?.account }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5um3q2kzodw0')" :width="120">
                                <template #cell="{ record }">
                                    <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                    <div>EN:{{ record.asset_account_info?.english_name }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5ukk1fm4a200')" data-index="charge_currency" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ record.from_currency }}<icon-arrow-right />{{ record.to_currency }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5um3q2kzohk0')" data-index="charge_currency" :width="160">
                                <template #cell="{ record }">
                                    <div>{{$t('exchange.exchange.5um3qfcp1g00')}}:{{ record.from_amount }}</div>
                                    <div>{{$t('exchange.exchange.5um3qfcp2180')}}:{{ record.to_amount }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5ukk1fm488s0')" :width="80">
                                <template #cell="{ record }">
                                    {{ useEnumsFormat('otc.account.exchange.status', record.status) }}
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5um3q2kzoko0')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5um3q2kzon00')" :width="120">
                                <template #cell="{ record }">
                                    <div v-if="!record.check_time">-</div>
                                    <div v-else>
                                        <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                        <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
                                    </div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5um3q2kzop40')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ record?.operator_info?.nickname }}</div>
                                    <div style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5ukk1fm4b0s0')" :width="80" v-if="$permission(['otcAccountDetailExchangeDetail'])">
                                <template #cell="{ record }">
                                    <a-space>
                                        <a-link
                                            @click="router.push({ name: 'otcAccountExchangeDetail', params: { id: record.id } })">{{$t('exchange.exchange.5ukk1fm4b8s0')}}</a-link>
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
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" :title="$t('exchange.exchange.5um3q2kzorg0')" :disabled="tableData.loading">
            <div class="tabBox">
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
                            <a-table-column :title="$t('exchange.exchange.5um3q2kzob40')" :width="100" :ellipsis="true" :tooltip="true">
                                <template #cell="{ record }">
                                    <div>{{ record.asset_account_info?.account }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5um3q2kzodw0')" :width="120">
                                <template #cell="{ record }">
                                    <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                    <div>EN:{{ record.asset_account_info?.english_name }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5ukk1fm4a200')" data-index="charge_currency" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ record.from_currency }}<icon-arrow-right />{{ record.to_currency }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5um3q2kzohk0')" data-index="charge_currency" :width="160">
                                <template #cell="{ record }">
                                    <div>{{$t('exchange.exchange.5um3qfcp1g00')}}:{{ record.from_amount }}</div>
                                    <div>{{$t('exchange.exchange.5um3qfcp2180')}}:{{ record.to_amount }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5ukk1fm4crk0')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ record.fee }} {{ record.from_currency }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5um3q2kzop40')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ record?.operator_info?.nickname }}</div>
                                    <div style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('exchange.exchange.5um3q2kzotk0')" :width="120">
                                <template #cell="{ record }">
                                    <div v-if="!record.check_time">-</div>
                                    <div v-else>
                                        <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                        <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
                                    </div>
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
            </div>
        </a-tab-pane>

    </a-tabs>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const active = ref('')
const route = useRoute()
const router = useRouter()
const searchInfo = reactive({
    data: {
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    show: false,
    loading: false,
    list: [],
    count: 0
})
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiOtc.accountChargeExchangeList(useFilter({
        ...searchInfo.data,
        status: active.value ? active.value : null,
        asset_account_id: route.params?.id
    }))
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data.list
    tableData.count = data.count
}

{
    getData()
}
</script>