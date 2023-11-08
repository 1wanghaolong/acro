<template>
    <a-tabs v-model:active-key="active" @change="getData" justify>
        <a-tab-pane key="" :title="$t('payment.payment.5um3nkmkr8s0')" :disabled="tableData.loading">
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
                            <a-table-column :title="$t('payment.payment.5um3nkmkrt80')" :width="120" :ellipsis="true" :tooltip="true">
                                <template #cell="{ record }">
                                    <div>{{ record.asset_account_info?.account }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5um3nkmkrw80')" :width="120">
                                <template #cell="{ record }">
                                    <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                    <div>EN:{{ record.asset_account_info?.english_name }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5ukjpgd8n9w0')" data-index="charge_currency" :width="80">
                                <template #cell="{ record }">
                                    <a-tag>{{ record.charge_currency||$t('payment.payment.5ukjpgd8nec0') }}</a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5ukjpgd8n580')" data-index="charge_amount" :width="160" :ellipsis="true" :tooltip="true"></a-table-column>
                            <a-table-column :title="$t('payment.payment.5ukjpgd8i7s0')" data-index="type" :width="120">
                                <template #cell="{ record }">
                                    {{ useEnumsFormat('otc.account.payment.type', record.type) }}
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5um3nkmkry80')" :width="180">
                                <template #cell="{ record }">
                                    <div v-if="!record.system_bank_card_info?.bank_account">-</div>
                                    <div v-else>
                                        <div>{{$t('payment.payment.5um3o2jbsrk0')}}:{{ record.system_bank_card_info?.charge_bank_full_name }}</div>
                                        <div>{{$t('payment.payment.5um3o2jbths0')}}:{{ record.system_bank_card_info?.bank_account }}</div>
                                    </div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5um3nkmks1c0')" :width="180">
                                <template #cell="{ record }">
                                    <div v-if="!record.charge_bank_code">-</div>
                                    <div v-else>
                                        <div>{{$t('payment.payment.5um3o2jbsrk0')}}:{{ record.charge_bank_full_name }}</div>
                                        <div>{{$t('payment.payment.5um3o2jbtmc0')}}:{{ record.charge_bank_code }}</div>
                                    </div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5um3nkmks3g0')" data-index="charge_bank_account"  :width="180" :ellipsis="true" :tooltip="true"></a-table-column>
                            <a-table-column :title="$t('payment.payment.5ukjpgd8ii00')" :width="100">
                                <template #cell="{ record }">
                                    {{ useEnumsFormat('otc.account.payment.status', record.status) }}
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5um3nkmks5o0')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5ukjpgd8npc0')" :width="120">
                                <template #cell="{ record }">
                                    <div v-if="!record.check_time">-</div>
                                    <div v-else>
                                        <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                        <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
                                    </div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5ukjpgd8nu80')" :width="80" v-if="$permission(['otcAccountPaymentDetail'])">
                                <template #cell="{ record }">
                                    <a-space>
                                        <a-link
                                            @click="router.push({ name: 'otcAccountPaymentDetail', params: { id: record.id } })">{{$t('payment.payment.5ukjpgd8o080')}}</a-link>
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
        <a-tab-pane key="4" :title="$t('payment.payment.5um3nkmks7k0')" :disabled="tableData.loading">
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
                            <a-table-column :title="$t('payment.payment.5um3nkmkrt80')" :width="120" :ellipsis="true" :tooltip="true">
                                <template #cell="{ record }">
                                    <div>{{ record.asset_account_info?.account }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5um3nkmkrw80')" :width="120">
                                <template #cell="{ record }">
                                    <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                    <div>EN:{{ record.asset_account_info?.english_name }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5ukjpgd8n9w0')" data-index="charge_currency" :width="80">
                                <template #cell="{ record }">
                                    <a-tag>{{ record.charge_currency||$t('payment.payment.5ukjpgd8nec0') }}</a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5um3nkmks9g0')" data-index="charge_fee" :width="120"></a-table-column>
                            <a-table-column :title="$t('payment.payment.5ukjpgd8n580')" data-index="charge_amount" :width="160" :ellipsis="true" :tooltip="true"></a-table-column>
                            <a-table-column :title="$t('payment.payment.5ukjpgd8i7s0')" data-index="type" :width="120">
                                <template #cell="{ record }">
                                    {{ useEnumsFormat('otc.account.payment.type', record.type) }}
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5um3nkmkry80')" :width="180">
                                <template #cell="{ record }">
                                    <div v-if="!record.system_bank_card_info?.bank_account">-</div>
                                    <div v-else>
                                        <div>{{$t('payment.payment.5um3o2jbsrk0')}}:{{ record.system_bank_card_info?.charge_bank_full_name }}</div>
                                        <div>{{$t('payment.payment.5um3o2jbths0')}}:{{ record.system_bank_card_info?.bank_account }}</div>
                                    </div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5um3nkmks1c0')" :width="180">
                                <template #cell="{ record }">
                                    <div>{{$t('payment.payment.5um3o2jbsrk0')}}:{{ record.charge_bank_full_name }}</div>
                                    <div>{{$t('payment.payment.5um3o2jbtmc0')}}:{{ record.charge_bank_code }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5um3nkmks3g0')" data-index="charge_bank_account"  :width="180" :ellipsis="true" :tooltip="true"></a-table-column>
                            <a-table-column :title="$t('payment.payment.5um3nkmksbc0')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ record?.operator_info?.nickname }}</div>
                                    <div style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('payment.payment.5um3nkmkseo0')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
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
    const { code, data } = await apiOtc.accountChargePaymentList(useFilter({
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