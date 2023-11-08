<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('payment.apply.5um3l8vkseo0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('payment.apply.5um3l8vkt1s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('payment.apply.5um3l8vkt9c0')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('payment.apply.5um3l8vkt1s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="charge_currency" :label="$t('payment.apply.5um3l8vkteo0')">
                                <a-select allow-clear v-model="searchInfo.data.charge_currency" :placeholder="$t('payment.apply.5um3l8vktk80')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('payment.apply.5um3l8vktp00')">
                                <a-select allow-clear v-model="searchInfo.data.type" :placeholder="$t('payment.apply.5um3l8vktk80')">
                                    <a-option v-for="item in useEnums('otc.account.payment.type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('payment.apply.5um3l8vktto0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('payment.apply.5um3l8vktk80')">
                                    <a-option
                                        v-for="item in useEnums('otc.account.payment.status').filter((item: any) => [0, 4, 6].includes(item.value))"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('payment.apply.5um3l8vktyc0')">
                                <a-range-picker v-model="searchInfo.data.create_time" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="check_time" :label="$t('payment.apply.5um3l8vku340')">
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
                        {{ searchInfo.show ? $t('payment.apply.5um3l8vku7o0') : $t('payment.apply.5um3l8vkuc40') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('payment.apply.5um3l8vkugg0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('payment.apply.5um3l8vkum80')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['otcAccountPaymentCreate']">
                    <a-button @click="router.push({ name: 'otcAccountPaymentCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('payment.apply.5um3l8vkuqo0')}}
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
                        <a-table-column :title="$t('payment.apply.5um3l8vkseo0')" data-index="asset_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true">

                        </a-table-column>
                        <a-table-column :title="$t('payment.apply.5um3l8vkt9c0')" :width="130">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.apply.5um3l8vkteo0')" data-index="charge_currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record.charge_currency || $t('payment.apply.5um3l8vkuv80') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.apply.5um3l8vkuz40')" data-index="charge_amount" :width="160"></a-table-column>
                        <a-table-column :title="$t('payment.apply.5um3l8vktp00')" data-index="type" :width="local.lang =='en'?160:120">
                            <template #cell="{ record }">
                                <a-tag>
                                    {{ useEnumsFormat('otc.account.payment.type', record.type) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.apply.5um3l8vkv3w0')" :width="local.lang =='en'?200:180">
                            <template #cell="{ record }">
                                <div v-if="!record.system_bank_card_info?.bank_account">-</div>
                                <div v-else>
                                    <div>{{$t('payment.apply.5um3lqjwkjo0')}}:{{ record.system_bank_card_info?.charge_bank_full_name }}</div>
                                    <div>{{$t('payment.apply.5um3lqjwl640')}}:{{ record.system_bank_card_info?.bank_account }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.apply.5um3l8vkv8g0')" :width="local.lang =='en'?200:180">
                            <template #cell="{ record }">
                                <div v-if="!record.charge_bank_code">-</div>
                                <div v-else>
                                    <div>{{$t('payment.apply.5um3lqjwkjo0')}}:{{ record.charge_bank_full_name }}</div>
                                    <div>{{$t('payment.apply.5um3lqjwlcc0')}}:{{ record.charge_bank_code }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.apply.5um3l8vkvdc0')" :width="180" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                {{ record.charge_bank_account || '-' }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.apply.5um3l8vktto0')" :width="local.lang =='en'?150:100">
                            <template #cell="{ record }">
                                <a-tag size="small"
                                    :color="record.status == 4 ? '#00b42a' : record.status == 0 ? '#ff7d00' : '#f53f3f'">
                                    {{ useEnumsFormat('otc.account.payment.status', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.apply.5um3l8vktyc0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.apply.5um3l8vku340')" :width="120">
                            <template #cell="{ record }">
                                <div v-if="record.check_time">
                                    <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
                                </div>
                                <div v-else>-</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('payment.apply.5um3l8vkvjk0')" :width="80"
                            v-if="$permission(['otcAccountPaymentDetail'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'otcAccountPaymentDetail', params: { id: record.id } })">{{$t('payment.apply.5um3l8vkvwo0')}}</a-link>
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
    const { code, data } = await apiOtc.accountChargePaymentList({
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