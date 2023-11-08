<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('withdraw.apply.5um3vjktitc0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('withdraw.apply.5um3vjktjiw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('withdraw.apply.5um3vjktjqs0')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('withdraw.apply.5um3vjktjiw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="charge_currency" :label="$t('withdraw.apply.5um3vjktjyg0')">
                                <a-select allow-clear v-model="searchInfo.data.charge_currency" :placeholder="$t('withdraw.apply.5um3vjktk3k0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('withdraw.apply.5um3vjktk8k0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('withdraw.apply.5um3vjktk3k0')">
                                    <a-option v-for="item in useEnums('otc.account.withdraw.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('withdraw.apply.5um3vjktkdc0')">
                                <a-range-picker v-model="searchInfo.data.create_time" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="check_time" :label="$t('withdraw.apply.5um3vjktknk0')">
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
                        {{ searchInfo.show ? $t('withdraw.apply.5um3vjktkts0') : $t('withdraw.apply.5um3vjktkz80') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('withdraw.apply.5um3vjktl3w0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('withdraw.apply.5um3vjktl8k0')}}
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
                        <a-table-column :title="$t('withdraw.apply.5um3vjktitc0')" data-index="asset_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('withdraw.apply.5um3vjktjqs0')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.apply.5um3vjktjyg0')" data-index="charge_currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record.charge_currency || $t('withdraw.apply.5um3vjktleg0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.apply.5um3vjktlm80')" data-index="charge_amount" :width="160"></a-table-column>
                        <a-table-column :title="$t('withdraw.apply.5um3vjktlqs0')" :width="180">
                            <template #cell="{ record }">
                                <div v-if="!record.charge_bank_code">-</div>
                                <div v-else>
                                    <div>{{$t('withdraw.apply.5um3vtbo7v40')}}:{{ record.charge_bank_full_name }}</div>
                                    <div>{{$t('withdraw.apply.5um3vtbo89s0')}}:{{ record.charge_bank_code }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.apply.5um3vjktlvs0')" data-index="charge_bank_account" :width="180" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('withdraw.apply.5um3vjktk8k0')" :width="local.lang =='en'?150:100">
                            <template #cell="{ record }">
                                <a-tag size="small"
                                    v-if="useEnumsFormat('otc.account.withdraw.status', record.status)"
                                    :color="record.status == 2 ? '#00b42a' : record.status == 0 ? '#ff7d00' : '#f53f3f'">
                                    {{ useEnumsFormat('otc.account.withdraw.status', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.apply.5um3vjktkdc0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.apply.5um3vjktknk0')" :width="120">
                            <template #cell="{ record }">
                                <div v-if="record.check_time">
                                    <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
                                </div>
                                <div v-else>-</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('withdraw.apply.5um3vjktm0g0')" :width="80"
                            v-if="$permission(['otcAccountWithdrawDetail'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'otcAccountWithdrawDetail', params: { id: record.id } })">{{$t('withdraw.apply.5um3vjktm5k0')}}</a-link>
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
        charge_currency: '',
        real_name: '',
        status: '',
        type: '',
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
    const { code, data } = await apiOtc.accountChargeWithdrawList({
        ...useFilter(searchInfo.data),
        ...useFilter({
            status: searchInfo.data.status !== '' ? searchInfo.data.status : null,
            type: searchInfo.data.type !== '' ? searchInfo.data.type : null,
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