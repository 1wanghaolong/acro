<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('bonus.bonus.5umcsjs01tc0')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('bonus.bonus.5umcsjs02q00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('bonus.bonus.5umcsjs02t40')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('bonus.bonus.5umcsjs02v80')">
                                    <a-option v-for="item in useEnums('market.market')" :value="item.value">
                                        {{ item.trans[local.lang] }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="`TRS${ $t('bonus.bonus.5umcsjs02xo0') }`">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('bonus.bonus.5umcsjs02q00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="counter_channel_account_id" :label="$t('bonus.bonus.5umcsjs02zw0')">
                                <a-select allow-clear v-model="searchInfo.data.counter_channel_account_id"
                                    :placeholder="$t('bonus.bonus.5umcsjs03200')">
                                    <a-option v-for="item in (tableData.counterChannelAccount as any)" :value="item.id">{{
                                        item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="payment_date" :label="$t('bonus.bonus.5umcsjs03480')">
                                <a-range-picker v-model="searchInfo.data.payment_date" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('bonus.bonus.5umcsjs036o0') : $t('bonus.bonus.5umcsjs039k0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('bonus.bonus.5umcsjs03bk0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('bonus.bonus.5umcsjs03ec0')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table" row-key="id" :expandable="{ title: '', width: 50 }">
                    <template #expand-icon="{ expanded }">
                        <IconUp v-if="expanded" />
                        <IconDown v-else />
                    </template>
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="`TRS${ $t('bonus.bonus.5umcsjs02xo0') }`" data-index="position_info.trs_account_info.account"
                            :width="120"></a-table-column>
                        <a-table-column :title="$t('bonus.bonus.5umcsjs03gk0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record?.position_info?.security_info?.name }}</div>
                                <div style="font-size: 12px;">{{ record?.market }} {{ record?.symbol }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('bonus.bonus.5umcsjs02zw0')" :width="160">
                            <template #cell="{ record }">
                                <div v-if="record?.position_info.position_item_list?.length > 1">
                                    {{$t('bonus.bonus.5umcsjs03ik0')}}
                                    <!-- <a-popover position="bottom">
                                        <a-link>{{$t('bonus.bonus.5umcsjs03ik0')}}</a-link>
                                        <template #content>
                                            <div v-for="(item, index) in record?.position_info.position_item_list">
                                                <div>{{ item?.counter_channel_account_info?.name }}</div>
                                                <div>{{ item?.counter_channel_info?.name }} {{
                                                    useEnumsFormat('market.order.counter_channel_scene',
                                                        item?.counter_channel_scene)
                                                }}</div>
                                                <a-divider
                                                    v-if="index < record?.position_info.position_item_list?.length - 1" />
                                            </div>
                                        </template>
                                    </a-popover> -->
                                </div>
                                <div v-else>
                                    <div>{{
                                        record?.position_info.position_item_list?.[0]?.counter_channel_account_info?.name }}
                                    </div>
                                    <div>{{ record?.position_info.position_item_list?.[0]?.counter_channel_info?.name }} {{
                                        useEnumsFormat('market.order.counter_channel_scene',
                                            record?.position_info.position_item_list?.[0]?.counter_channel_scene)
                                    }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('bonus.bonus.5umcsjs03kg0')" data-index="trs_account_info.currency" :width="90">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.position_info?.trs_account_info?.currency }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('bonus.bonus.5umcsjs03mc0')" :width="100">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('bonus.bonus.5umcsjs03ok0')" :width="120">
                            <template #cell="{ record }">
                                {{ record?.volume }}派{{ Number(record?.amount) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('bonus.bonus.5umcsjs03qs0')" :width="110">
                            <template #cell="{ record }">
                                <div>{{ record?.register_num }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('bonus.bonus.5umcsjs03sg0')" :width="local.lang == 'en'?200:180">
                            <template #cell="{ record }">
                                <div><a-tag size="small">{{$t('bonus.bonus.5umcsjs040c0')}}</a-tag> {{ record.dividend_amount }}</div>
                                <div><a-tag size="small">{{$t('bonus.bonus.5umcsjs043c0')}}</a-tag> {{ record.exchange_dividend_amount }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('bonus.bonus.5umcsjs045g0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs(record.payment_date).format('YYYY-MM-DD') }}</div>
                            </template>
                        </a-table-column>
                    </template>
                    <template #expand-row="{ record: subRecord }">
                        <a-table :bordered="false" :pagination="false" size="small"
                            :data="subRecord.position_info.position_item_list" class="table">
                            <template #columns>
                                <a-table-column :title="`TRS${ $t('bonus.bonus.5umcsjs02xo0') }`" :width="120">
                                    <template #cell>
                                        <div>{{ subRecord?.position_info.trs_account_info.account }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('bonus.bonus.5umcsjs03gk0')" :width="120">
                                    <template #cell>
                                        <div>{{ subRecord?.position_info?.security_info?.name }}</div>
                                        <div style="font-size: 12px;">{{ subRecord?.market }} {{ subRecord?.symbol }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('bonus.bonus.5umcsjs02zw0')" :width="180">
                                    <template #cell="{ record }">
                                        <div>
                                            <div>{{
                                                record?.counter_channel_account_info?.name
                                            }}</div>
                                            <div>{{
                                                record?.counter_channel_info?.name }}
                                                {{
                                                    useEnumsFormat('market.order.counter_channel_scene',
                                                        record?.counter_channel_scene)
                                                }}</div>
                                        </div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('bonus.bonus.5umcsjs03kg0')" data-index="trs_account_info.currency" :width="90">
                                    <template #cell>
                                        <a-tag>{{ subRecord?.position_info?.trs_account_info?.currency }}</a-tag>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('bonus.bonus.5umcsjs03mc0')" :width="100">
                                    <template #cell="{ record }">
                                        <a-tag>{{ record?.currency }}</a-tag>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('bonus.bonus.5umcsjs03ok0')" :width="120">
                                    <template #cell>
                                        {{ subRecord?.volume }}派{{ Number(subRecord?.amount) }}
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('bonus.bonus.5umcsjs03qs0')" :width="110">
                                    <template #cell="{ record }">
                                        <div>{{ record?.dividend_record_info?.register_num }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('bonus.bonus.5umcsjs03sg0')" :width="180">
                                    <template #cell="{ record }">
                                        <div><a-tag size="small">{{$t('bonus.bonus.5umcsjs040c0')}}</a-tag> {{
                                            record?.dividend_record_info?.dividend_amount }}</div>
                                        <div><a-tag size="small">{{$t('bonus.bonus.5umcsjs043c0')}}</a-tag> {{
                                            record?.dividend_record_info?.exchange_dividend_amount }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('bonus.bonus.5umcsjs045g0')" :width="120">
                                    <template #cell="{ record }">
                                        <div>{{ dayjs(record?.dividend_record_info?.payment_date).format('YYYY-MM-DD') }}
                                        </div>
                                    </template>
                                </a-table-column>
                            </template>
                        </a-table>
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
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        symbol: '',
        market: '',
        trs_account: '',
        status: 1,
        counter_channel_account_id: '',
        payment_date: [],
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
    const { code, data } = await apiTrs.trsSymbolDividendRecordList({
        ...useFilter(searchInfo.data),
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const getCounterChannelAccountAll = async () => {
    const { code, data } = await apiTrs.counterChannelAccountAll()
    if (code != 1) return;
    tableData.counterChannelAccount = data?.length ? data : []
}
{
    getData()
    getCounterChannelAccountAll()
}
</script>