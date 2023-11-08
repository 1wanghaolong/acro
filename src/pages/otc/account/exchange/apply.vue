<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('exchange.apply.5um3p7hadh80')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('exchange.apply.5um3p7hadxk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('exchange.apply.5um3p7hae100')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('exchange.apply.5um3p7hadxk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="from_currency" :label="$t('exchange.apply.5um3p7hae400')">
                                <a-select allow-clear v-model="searchInfo.data.from_currency" :placeholder="$t('exchange.apply.5um3p7hae6c0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="to_currency" :label="$t('exchange.apply.5um3p7hae8w0')">
                                <a-select allow-clear v-model="searchInfo.data.to_currency" :placeholder="$t('exchange.apply.5um3p7hae6c0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>

                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('exchange.apply.5um3p7haeb80')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('exchange.apply.5um3p7hae6c0')">
                                    <a-option v-for="item in useEnums('otc.account.exchange.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('exchange.apply.5um3p7haeds0')">
                                <a-range-picker v-model="searchInfo.data.create_time" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="check_time" :label="$t('exchange.apply.5um3p7haeg00')">
                                <a-range-picker v-model="searchInfo.data.check_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('exchange.apply.5um3p7haei80') : $t('exchange.apply.5um3p7haemw0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('exchange.apply.5um3p7haep80')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('exchange.apply.5um3p7haerg0')}}
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
                        <a-table-column data-index="asset_account_info.account" :title="$t('exchange.apply.5um3p7hadh80')" :width="100" :ellipsis="true"
                            :tooltip="true">

                        </a-table-column>
                        <a-table-column :title="$t('exchange.apply.5um3p7hae100')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.apply.5um3p7haetw0')" data-index="charge_currency" :width="80">
                            <template #cell="{ record }">
                                <div>{{ record?.from_currency }}<icon-arrow-right />{{ record?.to_currency }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.apply.5um3p7haewg0')" data-index="charge_currency" :width="160">
                            <template #cell="{ record }">
                                <div>{{$t('exchange.apply.5um3pgvrdqw0')}}:{{ record.from_amount }}</div>
                                <div>{{$t('exchange.apply.5um3pgvre4w0')}}:{{ record.to_amount }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.apply.5um3p7haeb80')" :width="local.lang =='en'?110:80">
                            <template #cell="{ record }">
                                <a-tag size="small"
                                    :color="record.status == 2 ? '#00b42a' : record.status == 1 ? '#ff7d00' : '#f53f3f'">
                                    {{ useEnumsFormat('otc.account.transfer.status', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.apply.5um3p7haeds0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.apply.5um3p7haeg00')" :width="120">
                            <template #cell="{ record }">
                                <div v-if="record.check_time">
                                    <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
                                </div>
                                <div v-else>-</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('exchange.apply.5um3p7haez40')" :width="80"
                            v-if="$permission(['otcAccountExchangeDetail'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'otcAccountExchangeDetail', params: { id: record.id } })">{{$t('exchange.apply.5um3p7haf280')}}</a-link>
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
const searchInfo = reactive({
    show: false,
    data: {
        asset_account: '',
        real_name: '',
        status: '',
        from_currency: '',
        to_currency: '',
        check_time: [],
        create_time: [],
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
    const { code, data } = await apiOtc.accountChargeExchangeList({
        ...useFilter(searchInfo.data),
        ...useFilter({
            status: searchInfo.data.status !== '' ? searchInfo.data.status : null,
        })
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