<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="account" :label="$t('account.account.5umycjz5fao0')">
                                <a-input v-model="searchInfo.data.account" :placeholder="$t('account.account.5umycjz5hlo0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('account.account.5umycjz5hxs0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('account.account.5umycjz5hlo0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('account.account.5umycjz5i5k0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('account.account.5umycjz5ico0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('account.account.5umycjz5iko0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('account.account.5umycjz5ico0')">
                                    <a-option v-for="item in useEnums('wealth.account.account.status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('account.account.5umycjz5is00')">
                                <a-range-picker v-model="searchInfo.data.create_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('account.account.5umycjz5j600') : $t('account.account.5umycjz5jn40') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('account.account.5umycjz5k1k0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('account.account.5umycjz5ke80')}}
                    </a-button>
                </a-space>
                <!-- <a-space :size="18">
                    <a-button @click="router.push({ name: 'assetAccountAdd' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('account.account.5umycjz5klo0')}}
                    </a-button>
                </a-space> -->
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
                        <a-table-column :title="$t('account.account.5umycjz5krk0')" data-index="account" :width="100" ></a-table-column>
                        <a-table-column :title="$t('account.account.5umycjz5hxs0')" data-index="asset_account_info.account" :width="local.lang=='en'?120:100"></a-table-column>
                        <a-table-column :title="$t('account.account.5umycjz5kww0')" :width="120">
                            <template #cell="{ record }">
                                <div><span>{{ 'CN:' }}</span><span style="padding-left: 5px;">{{
                                    record.asset_account_info.real_name }}</span></div>
                                <div><span>{{ 'EN:' }}</span><span style="padding-left: 5px;">{{
                                    record.asset_account_info.english_name }}</span></div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5umycjz5i5k0')" data-index="currency" :width="100">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency || $t('account.account.5umycjz5l2k0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5umycjz5l7o0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ $numberFormat(record.continuing_amount) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5umycjz5mfs0')" :width="local.lang=='en'?120:100">
                            <template #cell="{ record }">
                                <div v-if="record.history_profit > 0">{{ '+' + $numberFormat(record.history_profit) }}</div>
                                <div v-if="record.history_profit <= 0">{{ $numberFormat(record.history_profit) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5umycjz5iko0')" :width="100">
                            <template #cell="{ record }">
                                {{ record.status ? $t('account.account.5umycjz5moo0') : $t('account.account.5umycjz5muw0') }}
                                <!-- <a-switch @change="changeStatus(record)" size="small" :checked-value="1"
                                    :unchecked-value="0" v-model="record.status" /> -->
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5umycjz5is00')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('account.account.5umycjz5o180')" :width="80" v-if="$permission(['wealthAccountDetail'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link @click="toPath(record)">{{$t('account.account.5umycjz5onk0')}}</a-link>
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
import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        account: '',
        asset_account: "",
        currency: '',
        status: -1,
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
// 编辑状态
// const changeStatus = async (record: any) => {
//     const { code, msg } = await apiWealth.wealthAccountUpdateStatus({
//         id: record.id,
//         status: record.status
//     })
//     if (code != 1) return getData();
//     Message.success({ content: msg })
//     getData()
// }
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiWealth.wealthAccountList({
        ...useFilter(searchInfo.data)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const toPath = (record: any) => {
    sessionStorage.setItem('account', record.asset_account_info.account)
    router.push({ name: 'wealthAccountDetail', params: { accountid: record.id }, query: { mobile: record.mobile } })
}
{
    getData()
}
</script>