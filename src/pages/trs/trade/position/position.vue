<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('position.position.5ukft4xh7z00')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('position.position.5ukft4xh5zw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('position.position.5umcewo4cw80')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('position.position.5umcewo4dd80')">
                                    <a-option v-for="item in useEnums('market.market')" :value="item.value">
                                        {{ item.trans[local.lang] }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="`TRS${ $t('position.position.5um88odnxn80') }`">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('position.position.5ukft4xh5zw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="counter_channel_account_id" :label="$t('position.position.5um88odnxz40')">
                                <a-select allow-clear v-model="searchInfo.data.counter_channel_account_id"
                                    :placeholder="$t('position.position.5umcewo4dh80')">
                                    <a-option v-for="item in (tableData.counterChannelAccount as any)" :value="item.id">{{
                                        item.name }}</a-option>
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
                        {{ searchInfo.show ? $t('position.position.5ukft4xh6uk0') : $t('position.position.5ukft4xh74o0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('position.position.5ukft4xh7h80')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('position.position.5ukft4xh7o00')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table" :expandable="{ title: '', width: 50 }" row-key="id">
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
                        <a-table-column :title="$t('position.position.5um88odnxks0')" data-index="real_name" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record?.security_info?.name }}</div>
                                <div style="font-size: 12px;color: #b8c2cc;">{{ record?.market }} {{ record?.symbol }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="`TRS${ $t('position.position.5um88odnxn80') }`" data-index="trs_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('position.position.5um88odnxps0')" data-index="trs_account_info.currency" :width="90">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.trs_account_info?.currency || $t('position.position.5um88odnxw80') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('position.position.5um88odnxsk0')" data-index="currency" :width="90">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency || $t('position.position.5um88odnxw80') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('position.position.5um88odnxz40')" :width="150">
                            <template #cell="{ record }">
                                <div v-if="record.position_item_list?.length > 1">{{$t('position.position.5umcewo4dk80')}}</div>
                                <div v-else>
                                    <div>{{ record.position_item_list?.[0]?.counter_channel_account_info?.name }}</div>
                                    <div>{{ record.position_item_list?.[0]?.counter_channel_info?.name }} {{
                                        useEnumsFormat('market.order.counter_channel_scene',
                                            record.position_item_list?.[0]?.counter_channel_scene)
                                    }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('position.position.5um88odny1k0')" data-index="total_num" :width="90"></a-table-column>
                        <a-table-column :title="$t('position.position.5um88odny4k0')" data-index="enable_num" :width="90"></a-table-column>
                        <a-table-column :title="$t('position.position.5um88odny7c0')" data-index="security_info.latest_price" :width="90"></a-table-column>
                        <a-table-column :title="$t('position.position.5ukft4xh8ao0')" data-index="cost_price" :width="90"></a-table-column>
                        <a-table-column :title="$t('position.position.5um88odnya00')" data-index="market_value" :width="90"></a-table-column>
                        <a-table-column :title="$t('position.position.5um88odnycg0')" data-index="profit" :width="90"></a-table-column>
                        <a-table-column :title="$t('position.position.5um88odnyew0')" data-index="profit_rate" :width="90">
                            <template #cell="{ record }">
                                {{ (record.profit_rate * 100).toFixed(2) }}%
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('position.position.5um88odnyig0')" :width="local.lang == 'en'?140:80" v-if="$permission(['trsTradePositonClose'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-popconfirm position="left" @ok="closePosition(record)"
                                        :content="!record?.enable_num ? $t('position.position.5um88odnyl80') : $t('position.position.5um88odnyo80')">
                                        <a-link>{{$t('position.position.5um88odnyqw0')}}</a-link>
                                    </a-popconfirm>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                    <template #expand-row="{ record }">
                        <a-table :bordered="false" :pagination="false" size="small" :data="record.position_item_list"
                            class="table">
                            <template #columns>
                                <a-table-column title="ID">
                                    <template #cell="{ record }">
                                        <div>{{ record?.id }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('position.position.5um88odnxz40')">
                                    <template #cell="{ record }">
                                        <div>{{ record?.counter_channel_account_info?.name }}</div>
                                        <div>{{ record?.counter_channel_info?.name }} {{
                                            useEnumsFormat('market.order.counter_channel_scene',
                                                record?.counter_channel_scene)
                                        }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('position.position.5um88odny1k0')" data-index="total_num">
                                    <template #cell="{ record }">
                                        <div>{{ record?.disable_num + record?.enable_num }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('position.position.5um88odny4k0')" data-index="enable_num"></a-table-column>
                                <a-table-column fixed="right" :title="$t('position.position.5um88odnyig0')" :width="local.lang == 'en'? 140 : 80"
                                    v-if="$permission(['trsTradePositonClose'])">
                                    <template #cell="{ record }">
                                        <a-space>
                                            <a-popconfirm position="left" @ok="closeItemPosition(record)"
                                                :content="!record?.enable_num ? $t('position.position.5um88odnyl80') : $t('position.position.5um88odnyo80')">
                                                <a-link>{{$t('position.position.5um88odnyqw0')}}</a-link>
                                            </a-popconfirm>
                                        </a-space>
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
const local = useLocal()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        symbol: '',
        market: '',
        trs_account: '',
        counter_channel_account_id: '',
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
    const { code, data } = await apiTrs.positionList({
        ...useFilter(searchInfo.data)
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
const closePosition = async (record: any) => {
    const { code, msg } = await apiTrs.orderClosePosition({
        trs_account_id: record.trs_account_id,
        position_id: record.id
    })
    if (code != 1) return;
    Message.success(msg)
    getData()
}
const closeItemPosition = async (record: any) => {
    const { code, msg } = await apiTrs.orderClosePosition({
        trs_account_id: record.trs_account_id,
        position_id: record.position_id,
        position_item_id: record.id
    })
    if (code != 1) return;
    Message.success(msg)
    getData()
}
{
    getData()
    getCounterChannelAccountAll()
}
</script>