<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('stock.stock.5uke4t98h540')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('stock.stock.5uke4t98hac0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('stock.stock.5umctqzu3fg0')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('stock.stock.5umctqzu3zc0')">
                                    <a-option v-for="item in useEnums('market.market')" :value="item.value">
                                        {{ item.trans[local.lang] }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="`TRS${ $t('stock.stock.5umctqzu42s0') }`">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('stock.stock.5uke4t98hac0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="counter_channel_account_id" :label="$t('stock.stock.5umctqzu44k0')">
                                <a-select allow-clear v-model="searchInfo.data.counter_channel_account_id"
                                    :placeholder="$t('stock.stock.5umctqzu4700')">
                                    <a-option v-for="item in (tableData.counterChannelAccount as any)" :value="item.id">{{
                                        item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="payment_date" :label="$t('stock.stock.5umctqzu4940')">
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
                        {{ searchInfo.show ? $t('stock.stock.5uke4t98hjs0') : $t('stock.stock.5uke4t98how0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('stock.stock.5uke4t98ht80')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('stock.stock.5uke4t98hxw0')}}
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
                        <a-table-column :title="`TRS${ $t('stock.stock.5umctqzu42s0') }`" data-index="position_info.trs_account_info.account"
                            :width="120"></a-table-column>
                        <a-table-column :title="$t('stock.stock.5umctqzu4aw0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record?.position_info?.security_info?.name }}</div>
                                <div style="font-size: 12px;">{{ record?.market }} {{ record?.symbol }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5umctqzu44k0')" :width="180">
                            <template #cell="{ record }">
                                <div v-if="record?.position_info.position_item_list?.length > 1">
                                    {{$t('stock.stock.5umctqzu4cw0')}}
                                    <!-- <a-popover position="bottom">
                                        <a-link>{{$t('stock.stock.5umctqzu4cw0')}}</a-link>
                                        <template #content>
                                            <div v-for="(item, index) in record?.position_info.position_item_list">
                                                <div>{{ item?.counter_channel_account_info?.name }}</div>
                                                <div>{{ item?.counter_channel_info?.name }} {{
                                                    useEnumsFormat('market.order.counter_channel_scene', item?.counter_channel_scene)
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
                        <a-table-column :title="$t('stock.stock.5umctqzu4fg0')" data-index="trs_account_info.currency" :width="90">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.position_info?.trs_account_info?.currency }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5umctqzu4io0')" :width="100">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.position_info?.position_item_list[0]?.currency }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5umctqzu4ko0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record?.from_num }}{{ record?.type == 1 ? $t('stock.stock.5umctqzu4mo0') : $t('stock.stock.5umctqzu4ok0') }}{{ record.to_num }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5umctqzu4qc0')" :width="110">
                            <template #cell="{ record }">
                                <div>{{ record?.register_num }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5umctqzu4sg0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record?.payment_num }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5umctqzu4u80')" :width="local.lang == 'en' ? 140:110">
                            <template #cell="{ record }">
                                <div>{{ Number(record?.payment_num) - Number(record?.register_num) > 0 ? '+' : '' }}{{
                                    Number(record?.payment_num) - Number(record?.register_num) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5umctqzu4wg0')" :width="local.lang == 'en'?210:180">
                            <template #cell="{ record }">
                                <div><a-tag size="small">{{$t('stock.stock.5umctqzu4yg0')}}</a-tag> {{ record.register_price }} {{
                                    record?.position_info?.position_item_list[0]?.currency }}</div>
                                <div><a-tag size="small">{{$t('stock.stock.5umctqzu5040')}}</a-tag> {{ record.payment_price }} {{
                                    record?.position_info?.position_item_list[0]?.currency }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5umctqzu4940')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs(record.payment_date).format('YYYY-MM-DD') }}</div>
                            </template>
                        </a-table-column>
                    </template>
                    <template #expand-row="{ record: subRecord }">
                        <a-table :bordered="false" :pagination="false" size="small"
                            :data="subRecord.position_info.position_item_list" class="table">
                            <template #columns>
                                <a-table-column :title="`TRS${ $t('stock.stock.5umctqzu42s0') }`" :width="120">
                                    <template #cell>
                                        <div>{{ subRecord?.position_info.trs_account_info.account }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('stock.stock.5umctqzu4aw0')" :width="120">
                                    <template #cell>
                                        <div>{{ subRecord?.position_info?.security_info?.name }}</div>
                                        <div style="font-size: 12px;">{{ subRecord?.market }} {{ subRecord?.symbol }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('stock.stock.5umctqzu44k0')" :width="160">
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
                                <a-table-column :title="$t('stock.stock.5umctqzu4fg0')" data-index="trs_account_info.currency" :width="90">
                                    <template #cell>
                                        <a-tag>{{ subRecord?.position_info?.trs_account_info?.currency }}</a-tag>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('stock.stock.5umctqzu4io0')" :width="100">
                                    <template #cell="{ record }">
                                        <a-tag>{{ record?.currency }}</a-tag>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('stock.stock.5umctqzu4ko0')" :width="120">
                                    <template #cell>
                                        <div>{{ subRecord?.from_num }}{{ subRecord?.type == 1 ? $t('stock.stock.5umctqzu4mo0') : $t('stock.stock.5umctqzu4ok0') }}{{
                                            subRecord.to_num }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('stock.stock.5umctqzu4qc0')" :width="110">
                                    <template #cell="{ record }">
                                        <div>{{ record?.split_record_info?.register_num }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('stock.stock.5umctqzu4sg0')" :width="120">
                                    <template #cell="{ record }">
                                        <div>{{ record?.split_record_info?.payment_num }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('stock.stock.5umctqzu4u80')" :width="110">
                                    <template #cell="{ record }">
                                        <div>{{ Number(record?.split_record_info?.payment_num) -
                                            Number(record?.split_record_info?.register_num) > 0 ? '+' : '' }}{{
        Number(record?.split_record_info?.payment_num) -
        Number(record?.split_record_info?.register_num) }}</div>
                                    </template>
                                </a-table-column>
                                <!-- <a-table-column title="成本价" :width="180">
                                    <template #cell="{ record }">
                                        <div><a-tag size="small">{{$t('stock.stock.5umctqzu4yg0')}}</a-tag>{{ record?.split_record_info?.register_price }} {{
                                            record?.currency }}</div>
                                        <div><a-tag size="small">{{$t('stock.stock.5umctqzu5040')}}</a-tag>{{ record?.split_record_info?.payment_price }} {{
                                            record?.currency }}</div>
                                    </template>
                                </a-table-column> -->
                                <a-table-column :title="$t('stock.stock.5umctqzu4940')" :width="120">
                                    <template #cell="{ record }">
                                        <div>{{ dayjs(record?.split_record_info?.payment_date).format('YYYY-MM-DD') }}</div>
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
    const { code, data } = await apiTrs.trsSymbolSplitRecordList({
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