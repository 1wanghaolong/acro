<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('apply.apply.5um8hcxvbrg0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('apply.apply.5um8hcxvcss0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('apply.apply.5um8hcxvcvs0')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('apply.apply.5um8hcxvcss0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('apply.apply.5um8hcxvcxs0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('apply.apply.5um8hcxvd1k0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="interest_accrual_type" :label="$t('apply.apply.5um8hcxvd400')">
                                <a-select allow-clear v-model="searchInfo.data.interest_accrual_type" :placeholder="$t('apply.apply.5um8hcxvd1k0')">
                                    <a-option v-for="item in useEnums('trs.account.interest_accrual_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('apply.apply.5um8hcxvd5s0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('apply.apply.5um8hcxvd1k0')">
                                    <a-option v-for="item in useEnums('trs.account.apply.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('apply.apply.5um8hcxvd7k0')">
                                <a-range-picker v-model="searchInfo.data.create_time" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="check_time" :label="$t('apply.apply.5um8hcxvd9w0')">
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
                        {{ searchInfo.show ? $t('apply.apply.5um8hcxvdbw0') : $t('apply.apply.5um8hcxvddo0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('apply.apply.5um8hcxvdgo0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('apply.apply.5um8hcxvdis0')}}
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
                        <a-table-column :title="$t('apply.apply.5um8hcxvcvs0')" :width="150">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('apply.apply.5um8hcxvbrg0')" data-index="asset_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('apply.apply.5um8hcxvcxs0')" data-index="currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('apply.apply.5um8hcxvdlo0')" :width="180">
                            <template #cell="{ record }">
                                <div>{{$t('apply.apply.5um8hxisac80')}}：{{ record.total_cash }}</div>
                                <div>{{$t('apply.apply.5um8hxisbcc0')}}：{{ record.multiple }}{{$t('apply.apply.5um8hxisbg00')}}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('apply.apply.5um8hcxvdng0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ record.time_limit }}{{$t('apply.apply.5um8hxisbik0')}}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('apply.apply.5um8hcxvd400')" :width="local.lang =='en'?200:100">
                            <template #cell="{ record }">
                                <a-tag>{{ useEnumsFormat('trs.account.interest_accrual_type', record.interest_accrual_type)
                                }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('apply.apply.5um8hcxvdp40')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ record.annual_interest_rate }}%</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('apply.apply.5um8hcxvd5s0')" :width="local.lang =='en'?120:100">
                            <template #cell="{ record }">
                                <a-tag size="small"
                                    :color="record.status == 1 ? '#00b42a' : record.status == 0 ? '#ff7d00' : '#f53f3f'">
                                    {{ useEnumsFormat('trs.account.apply.status', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('apply.apply.5um8hcxvd7k0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('apply.apply.5um8hcxvd9w0')" :width="120">
                            <template #cell="{ record }">
                                <div v-if="!record.check_time">-</div>
                                <div v-else>
                                    <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('apply.apply.5um8hcxvdr00')" :width="80" v-if="$permission(['trsAccountApplyDetail'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'trsAccountApplyDetail', params: { id: record.id } })">{{$t('apply.apply.5um8hcxvdu40')}}</a-link>
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
const route = useRoute()
const searchInfo:any = reactive({
    show: false,
    data: {
        asset_account: '',
        real_name: '',
        currency: '',
        status: '',
        interest_accrual_type: '',
        create_time: [],
        check_time: [],
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
    const { code, data } = await apiTrs.accountApplyList({
        ...useFilter(searchInfo.data),
        ...useFilter({
            status: searchInfo.data.status !== '' ? searchInfo.data.status : null,
            interest_accrual_type: searchInfo.data.interest_accrual_type !== '' ? searchInfo.data.interest_accrual_type : null,
        })
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
{
    if (''+route.query?.status) {
        searchInfo.data.status = Number(route.query.status)
    }  
    getData()
}
</script>