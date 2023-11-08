<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="`TRS${ $t('account.account.5um39l9uv3w0') }`">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('account.account.5ukfohnhcvs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('account.account.5um7v6mv6sc0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('account.account.5ukfohnhcvs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('account.account.5um39l9uvo00')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('account.account.5ukfohnhcvs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('account.account.5ukfohnhdvw0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('account.account.5um39l9uw240')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="interest_accrual_type" :label="$t('account.account.5um7v6mv78w0')">
                                <a-select allow-clear v-model="searchInfo.data.interest_accrual_type" :placeholder="$t('account.account.5um39l9uw240')">
                                    <a-option v-for="item in useEnums('trs.account.interest_accrual_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="risk_control_calculate_type" :label="$t('account.account.5um7v6mv7c40')">
                                <a-select allow-clear v-model="searchInfo.data.risk_control_calculate_type"
                                    :placeholder="$t('account.account.5um39l9uw240')">
                                    <a-option v-for="item in useEnums('trs.account.risk_control_calculate_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="use_status" :label="$t('account.account.5um7v6mv7fs0')">
                                <a-select allow-clear v-model="searchInfo.data.use_status" :placeholder="$t('account.account.5um39l9uw240')">
                                    <a-option v-for="item in useEnums('trs.account.use_status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trade_status" :label="$t('account.account.5um7v6mv7ho0')">
                                <a-select allow-clear v-model="searchInfo.data.trade_status" :placeholder="$t('account.account.5um39l9uw240')">
                                    <a-option v-for="item in useEnums('trs.account.trade_status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="open_time" :label="$t('account.account.5um39l9uwcc0')">
                                <a-range-picker v-model="searchInfo.data.open_time" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="expire_time" :label="$t('account.account.5um7v6mv7k80')">
                                <a-range-picker v-model="searchInfo.data.expire_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('account.account.5ukfohnhdbk0') : $t('account.account.5ukfohnhdfs0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('account.account.5ukfohnhdjs0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('account.account.5ukfohnhdo40')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['trsAccountCreate']">
                    <a-button @click="router.push({ name: 'trsAccountCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('account.account.5um39l9uwf80')}}
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
                        <a-table-column :title="`TRS${ $t('account.account.5um39l9uv3w0') }`" data-index="account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('account.account.5um39l9uvo00')" data-index="real_name" :width="130">
                            <template #cell="{ record }">
                                <div>CN:{{ record?.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record?.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um7v6mv6sc0')" data-index="asset_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('account.account.5ukfohnhdvw0')" data-index="currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record.currency || $t('account.account.5um7v6mv7mc0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um7v6mv7o40')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record?.total_finance }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um7v6mv7q80')" :width="220">
                            <template #cell="{ record }">
                                <div>{{$t('account.account.5um7wod9k7c0')}}：{{ record?.summary_cash }}</div>
                                <div>{{$t('account.account.5um7wod9ky00')}}：{{ record?.interest_accrual_amount }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um7v6mv7s80')" :width="local.lang =='en'?270:200">
                            <template #cell="{ record }">
                                <div>{{$t('account.account.5um7wod9l1c0')}}：{{
                                    useEnumsFormat('trs.account.interest_accrual_type', record?.interest_accrual_type) }}
                                </div>
                                <div>{{$t('account.account.5um7wod9l3w0')}}：{{ record?.annual_interest_rate }}%</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um7v6mv7c40')" :width="local.lang=='en'?170:120">
                            <template #cell="{ record }">
                                <a-tag>{{ useEnumsFormat('trs.account.risk_control_calculate_type',
                                    record.risk_control_calculate_type) }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um7v6mv7u80')" :ellipsis="true" :tooltip="true" :width="local.lang=='en'?170:150">
                            <template #cell="{ record }">
                                <div>{{ record?.charge_package_info?.name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um7v6mv7w80')" :width="local.lang=='en'?220:200">
                            <template #cell="{ record }">
                                <div>{{$t('account.account.5um39l9uwcc0')}}：{{ dayjs.unix(record.open_time).format('YYYY-MM-DD') }}</div>
                                <div>{{$t('account.account.5um7v6mv7k80')}}：{{ dayjs.unix(record.expire_time).format('YYYY-MM-DD') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um7v6mv7fs0')" :width="100">
                            <template #cell="{ record }">
                                <a-tag size="small" :color="record.use_status == 1 ? '#00b42a' : '#f53f3f'">
                                    {{ useEnumsFormat('trs.account.use_status', record.use_status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um7v6mv7ho0')" :width="local.lang=='en'?140:100">
                            <template #cell="{ record }">
                                <a-tag size="small"
                                    v-if='record.trade_status'
                                    :color="record.trade_status == 1 ? '#00b42a' : record.trade_status == 3 ? '#ff7d00' : '#f53f3f'">
                                    {{ useEnumsFormat('trs.account.trade_status', record.trade_status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('account.account.5ukfohnhf4o0')" :width="local.lang == 'en'?200:150">
                            <template #cell="{ record }"
                                v-if="$permission(['trsAccountDetail', 'trsAccountResetPassword'])">
                                <a-space>
                                    <a-link v-permission="['trsAccountDetail']"
                                        @click="router.push({ name: 'trsAccountDetail', params: { id: record.id } })">{{$t('account.account.5um39l9ux2g0')}}</a-link>
                                    <a-popconfirm position="left" @ok="resetPassword(record)"
                                        :content="`${ $t('account.account.5um3b3g0ax40') }?${$t('account.account.5um39l9ux5c0')}`">
                                        <a-link v-permission="['trsAccountResetPassword']">{{$t('account.account.5um39l9ux8g0')}}</a-link>
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
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        trs_account: '',
        asset_account: '',
        real_name: '',
        currency: '',
        use_status: '',
        trade_status: '',
        interest_accrual_type: '',
        risk_control_calculate_type: '',
        open_time: [],
        expire_time: [],
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
// 重置密码
const resetPassword = async (record: any) => {
    const { code, msg } = await apiTrs.accountResetPassword({
        id: record.id
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
}
const getData = async () => {
    tableData.loading = true
    let formData = cloneDeep(searchInfo.data)
    formData.trade_status === '' && delete formData.trade_status
    formData.use_status === '' && delete formData.use_status
    formData.interest_accrual_type === '' && delete formData.interest_accrual_type
    formData.risk_control_calculate_type === '' && delete formData.risk_control_calculate_type
    const { code, data } = await apiTrs.accountList({
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