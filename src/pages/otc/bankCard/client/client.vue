<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('client.client.5umbj5zcu6o0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('client.client.5ukmd143ck80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('client.client.5umbj5zcveg0')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('client.client.5ukmd143ck80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('client.client.5ukmd143dlw0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('client.client.5ukmd143dqw0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="bank_name" :label="$t('client.client.5ukmd143d580')">
                                <a-input v-model="searchInfo.data.bank_name" :placeholder="$t('client.client.5ukmd143ck80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="bank_code" :label="$t('client.client.5ukmd143d9w0')">
                                <a-input v-model="searchInfo.data.bank_code" :placeholder="$t('client.client.5ukmd143ck80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="bank_account" :label="$t('client.client.5ukmd143dek0')">
                                <a-input v-model="searchInfo.data.bank_account" :placeholder="$t('client.client.5ukmd143ck80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="bind_time" :label="$t('client.client.5ukmd143dxs0')">
                                <a-range-picker v-model="searchInfo.data.bind_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('client.client.5ukmd143e7s0') : $t('client.client.5ukmd143eek0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('client.client.5ukmd143ejg0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('client.client.5ukmd143eo40')}}
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
                        <a-table-column data-index="asset_account_info.account" :title="$t('client.client.5umbj5zcu6o0')" :width="local.lang=='en'?120:100" >
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5umbj5zcveg0')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukmd143dlw0')" :width="160">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag v-for="item in record.currency_list" size="small">{{ item.currency }}</a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukmd143exw0')" :width="180">
                            <template #cell="{ record }">
                                <div>{{$t('client.client.5ukmd143d580')}}:{{ record.bank_full_name }}</div>
                                <div>{{$t('client.client.5ukmd143d9w0')}}:{{ record.bank_code }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukmd143dek0')" :width="180">
                            <template #cell="{ record }">
                                <div>{{ record?.bank_account }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5umbj5zcvj00')" :width="180" v-if='viteItemName == "hx"'>
                            <template #cell="{ record }">
                                <a-tag size="small" :color="record.from == 1?'#00b42a':''">
                                    {{ record.from == '1' ? $t('client.client.5umbj5zcvlw0') : $t('client.client.5umbj5zcvoc0') }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukmd143f5w0')" :width="100">
                            <template #cell="{ record }">
                                <a-tag size="small"
                                    :color="record.status == 1 ? '#00b42a' : record.status == 0 ? '#ff7d00' : '#f53f3f'">
                                    {{ useEnumsFormat('otc.bankCard.status', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukmd143dxs0')" :width="120">
                            <template #cell="{ record }">
                                <div v-if="!record.bind_time">-</div>
                                <div v-else>
                                    <div>{{ dayjs.unix(record.bind_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.bind_time).format('HH:mm:ss') }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukmd143flw0')" :width="90" fixed="right" v-if="$permission(['otcBankCardClientUnBind'])">
                                <template #cell="{ record }">
                                    <a-space>
                                        <a-popconfirm v-if='record.from != 1' position="left" @ok="unBind(record)" :content="`${$t('client.client.5ukmgqdgsmw0')}`">
                                            <a-link status="danger">{{$t('client.client.5ukmd143g2g0')}}</a-link>
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
import { useEnums, useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const searchFormRef = ref()
const viteItemName = import.meta.env.VITE_ITEM_NAME || ""
const searchInfo = reactive({
    show: false,
    data: {
        asset_account: '',
        currency: '',
        bank_name: '',
        bank_account: '',
        bank_code: '',
        real_name: '',
        bind_time: [],
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
const unBind = async (record: any) => {
    const { code, msg } = await apiOtc.clientBankCardUnBind({
        card_id: record.id
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiOtc.clientBankCardList({
        ...useFilter(searchInfo.data)
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