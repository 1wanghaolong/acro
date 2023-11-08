<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="counter_channel_id" :label="$t('channel.channel.5umwycfyq8s0')">
                                <a-select allow-clear v-model="searchInfo.data.counter_channel_id" :placeholder="$t('channel.channel.5umwycfyqq80')">
                                    <a-option v-for="item in (tableData.counterChannelList as any)" :value="item.id">{{
                                        item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="report_time" :label="$t('channel.channel.5umwycfyqtw0')">
                                <a-range-picker v-model="searchInfo.data.report_time" format="YYYY-MM-DD" />
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
                <a-space :size="18" v-permission="['trsSettlementRateChannelCreate']">
                    <a-button @click="router.push({ name: 'trsSettlementRateChannelCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('channel.channel.5uklxhia8cs0')}}
                    </a-button>
                </a-space>
            </div>
            <a-space wrap v-if="lastExchangeRate">
                {{$t('channel.channel.5umwyr8ue3c0')}}:
                <a-tooltip :content="$t('channel.channel.5umwycfyqw80')">
                    <icon-exclamation-circle-fill />
                </a-tooltip>
                <a-tooltip :content="$t('channel.channel.5ukm1zdz0aw0')">
                    <icon-edit v-permission="['trsSettlementRatePlatformUpdate']"
                        @click="router.push({ name: 'trsSettlementRatePlatformUpdate', params: { date: dayjs.unix(lastExchangeRate.report_time).format('YYYY-MM-DD') } })"
                        style="color: rgb(var(--arcoblue-6));cursor: pointer;" />
                </a-tooltip>
                <a-tag>HKD<icon-arrow-right />CNY: {{
                    lastExchangeRate?.exchange_rate_list?.find((item: any) => item.from_currency == 'HKD' && item.to_currency
                        == 'CNY')?.exchange_rate }}</a-tag>
                <a-tag>CNY<icon-arrow-right />HKD: {{
                    lastExchangeRate?.exchange_rate_list?.find((item: any) => item.from_currency == 'CNY' && item.to_currency
                        == 'HKD')?.exchange_rate }}</a-tag>
                <a-tag>USD<icon-arrow-right />CNY: {{
                    lastExchangeRate?.exchange_rate_list?.find((item: any) => item.from_currency == 'USD' && item.to_currency
                        == 'CNY')?.exchange_rate }}</a-tag>
                <a-tag>CNY<icon-arrow-right />USD: {{
                    lastExchangeRate?.exchange_rate_list?.find((item: any) => item.from_currency == 'CNY' && item.to_currency
                        == 'USD')?.exchange_rate }}</a-tag>
                <a-tag>USD<icon-arrow-right />HKD: {{
                    lastExchangeRate?.exchange_rate_list?.find((item: any) => item.from_currency == 'USD' && item.to_currency
                        == 'HKD')?.exchange_rate }}</a-tag>
                <a-tag>HKD<icon-arrow-right />USD: {{
                    lastExchangeRate?.exchange_rate_list?.find((item: any) => item.from_currency == 'HKD' && item.to_currency
                        == 'USD')?.exchange_rate }}</a-tag>
                <a-tag>{{$t('channel.channel.5umwycfyqy40')}}</a-tag>
            </a-space>
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
                        <a-table-column :title="$t('channel.channel.5umwycfyqtw0')">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.report_time).format('YYYY-MM-DD') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column title="HKD/CNY">
                            <template #cell="{ record }">
                                <div><icon-arrow-right /> {{ record.exchange_rate_list?.find((item: any) => item.from_currency
                                    == 'HKD' && item.to_currency == 'CNY')?.exchange_rate }}</div>
                                <div><icon-arrow-left /> {{ record.exchange_rate_list?.find((item: any) => item.from_currency
                                    == 'CNY' && item.to_currency == 'HKD')?.exchange_rate }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column title="USD/CNY">
                            <template #cell="{ record }">
                                <div><icon-arrow-right /> {{ record.exchange_rate_list?.find((item: any) => item.from_currency
                                    == 'USD' && item.to_currency == 'CNY')?.exchange_rate }}</div>
                                <div><icon-arrow-left /> {{ record.exchange_rate_list?.find((item: any) => item.from_currency
                                    == 'CNY' && item.to_currency == 'USD')?.exchange_rate }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column title="USD/HKD">
                            <template #cell="{ record }">
                                <div><icon-arrow-right /> {{ record.exchange_rate_list?.find((item: any) => item.from_currency
                                    == 'USD' && item.to_currency == 'HKD')?.exchange_rate }}</div>
                                <div><icon-arrow-left /> {{ record.exchange_rate_list?.find((item: any) => item.from_currency
                                    == 'HKD' && item.to_currency == 'USD')?.exchange_rate }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('channel.channel.5umwycfyq8s0')" data-index="counter_channel_info.name"></a-table-column>
                        <a-table-column :title="$t('channel.channel.5umwycfyr0g0')">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.update_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('channel.channel.5ukm1zdz06o0')" :width="80"
                            v-if="$permission(['trsSettlementRateChannelUpdate'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'trsSettlementRateChannelUpdate', params: { id: record.counter_channel_id, date: dayjs.unix(record.report_time).format('YYYY-MM-DD') } })">{{$t('channel.channel.5ukm1zdz0aw0')}}</a-link>
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
import dayjs from 'dayjs'
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        counter_channel_id: '',
        report_time: [],
        page: 1,
        per_page: 20
    }
})
const lastExchangeRate = ref()
const tableData = reactive({
    list: [],
    counterChannelList: [],
    count: 0,
    message: [],
    loading: false
})
const getData = async () => {
    tableData.loading = true
    const formData = cloneDeep(searchInfo.data)
    !formData.risk_control_status && delete formData.risk_control_status
    const { code, data } = await apiTrs.counterChannelExchangeRateList({
        ...useFilter(formData),
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const getCounterChannelList = async () => {
    const { code, data } = await apiTrs.counterChannelList()
    if (code != 1) return;
    tableData.counterChannelList = data?.list
}
const getLastExchangeRate = async () => {
    const { code, data } = await apiOtc.exchangeRateList({
        ...useFilter({
            is_latest: 1
        }),
    })
    if (code != 1) return;
    lastExchangeRate.value = data.list?.[0]
}
{
    getData()
    getCounterChannelList()
    getLastExchangeRate()
}
</script>
<style lang="less" scoped>
.progressBox {
    background-color: var(--color-fill-3);
    border-radius: 100px;
    width: 100%;
    height: 6px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    z-index: 1;

    .risk {
        position: absolute;
        right: 0;
        height: 100%;
        width: 1px;
        background-color: var(--color-bg-1);
        z-index: 3;
    }

    .progress {
        position: absolute;
        left: 0;
        height: 100%;
        z-index: 2;
    }
}</style>