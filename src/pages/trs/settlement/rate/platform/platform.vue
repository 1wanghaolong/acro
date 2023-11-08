<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="report_time" :label="$t('platform.platform.5umx0x73qw00')">
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
                        {{ searchInfo.show ? $t('platform.platform.5umx0x73ruk0') : $t('platform.platform.5umx0x73ryk0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('platform.platform.5umx0x73s180')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('platform.platform.5umx0x73s340')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['trsSettlementRatePlatformCreate']"
                        @click="router.push({ name: 'trsSettlementRatePlatformCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('platform.platform.5umx0x73s5s0')}}
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
                        <a-table-column :title="$t('platform.platform.5umx0x73qw00')">
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
                        <a-table-column :title="$t('platform.platform.5umx0x73s8k0')">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.update_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('platform.platform.5umx0x73sbg0')" :width="120"
                            v-if="$permission(['trsSettlementRatePlatformUpdate', 'trsSettlementRatePlatformDelete'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['trsSettlementRatePlatformUpdate']"
                                        @click="router.push({ name: 'trsSettlementRatePlatformUpdate', params: { date: dayjs.unix(record.report_time).format('YYYY-MM-DD') } })">{{$t('platform.platform.5umx0x73sds0')}}</a-link>
                                    <a-popconfirm position="left" @ok="del(record)" :content="`${ $t('platform.platform.5umx2b1l6os0') }?` ">
                                        <a-link v-permission="['trsSettlementRatePlatformDelete']"
                                            status="danger">{{$t('platform.platform.5umx0x73sfk0')}}</a-link>
                                    </a-popconfirm>
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
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
const del = async (record: any) => {
    const { code, msg } = await apiOtc.exchangeRateDelete({
        report_date: dayjs.unix(record?.report_time).format('YYYY-MM-DD')
    })
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    tableData.loading = true
    const formData = cloneDeep(searchInfo.data)
    !formData.risk_control_status && delete formData.risk_control_status
    const { code, data } = await apiOtc.exchangeRateList({
        ...useFilter(formData),
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