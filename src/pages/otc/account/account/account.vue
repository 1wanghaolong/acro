<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="account" :label="$t('account.account.5um39l9uv3w0')">
                                <a-input v-model="searchInfo.data.account" :placeholder="$t('account.account.5ukfohnhcvs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('account.account.5um39l9uvo00')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('account.account.5ukfohnhcvs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('account.account.5um39l9uvro0')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('account.account.5ukfohnhcvs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="email" :label="$t('account.account.5um39l9uvvw0')">
                                <a-input v-model="searchInfo.data.email" :placeholder="$t('account.account.5ukfohnhcvs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('account.account.5um39l9uvyw0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('account.account.5um39l9uw240')">
                                    <a-option v-for="item in useEnums('otc.account.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="pi_status" :label="`PI${$t('account.account.5un5o0igl8s0')}`">
                                <a-select allow-clear v-model="searchInfo.data.pi_status" :placeholder="$t('account.account.5um39l9uw240')">
                                    <a-option v-for="item in useEnums('otc.account.pi_status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="risk_assessment_status" :label="$t('account.account.5um39l9uw580')">
                                <a-select allow-clear v-model="searchInfo.data.risk_assessment_status" :placeholder="$t('account.account.5um39l9uw240')">
                                    <a-option v-for="item in useEnums('otc.account.risk_assessment_status')"
                                        :value="item.value">{{ item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('account.account.5um39l9uwcc0')">
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
                <a-space :size="18" v-permission="['otcAccountCreate']">
                    <a-button @click="router.push({ name: 'otcAccountCreate' })" type="primary">
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
                        <a-table-column :title="$t('account.account.5um39l9uv3w0')" data-index="account" :width="100" :ellipsis="true" :tooltip="true">
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um39l9uvo00')" data-index="real_name" :width="150" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                <div>CN:{{ record?.real_name }}</div>
                                <div>EN:{{ record?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um39l9uwic0')" :width="230">
                            <template #cell="{ record }">
                                <div>{{$t('account.account.5um3dxk2kb40')}}：{{ record.mobile }}</div>
                                <div>{{$t('account.account.5um3dxk2lbs0')}}：{{ record.email }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um39l9uwmo0')" :width="200"
                            v-if="useEnums('currency').find((item: any) => item.value == 'HKD')">
                            <template #cell="{ record }">
                                <div>{{$t('account.account.5um3dxk2lgc0')}}：{{ record.asset_account_asset_list?.find((item: any) => item.currency ==
                                    'HKD')?.usable_cash }}</div>
                                <div>{{$t('account.account.5um3dxk2liw0')}}：{{ record.asset_account_asset_list?.find((item: any) => item.currency ==
                                    'HKD')?.freeze_cash }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um39l9uwpo0')" :width="200"
                            v-if="useEnums('currency').find((item: any) => item.value == 'USD')">
                            <template #cell="{ record }">
                                <div>{{$t('account.account.5um3dxk2lgc0')}}：{{ record.asset_account_asset_list?.find((item: any) => item.currency ==
                                    'USD')?.usable_cash }}</div>
                                <div>{{$t('account.account.5um3dxk2liw0')}}：{{ record.asset_account_asset_list?.find((item: any) => item.currency ==
                                    'USD')?.freeze_cash }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um39l9uwt80')" :width="200"
                            v-if="useEnums('currency').find((item: any) => item.value == 'CNY')">
                            <template #cell="{ record }">
                                <div>{{$t('account.account.5um3dxk2lgc0')}}：{{ record.asset_account_asset_list?.find((item: any) => item.currency ==
                                    'CNY')?.usable_cash }}</div>
                                <div>{{$t('account.account.5um3dxk2liw0')}}：{{ record.asset_account_asset_list?.find((item: any) => item.currency ==
                                    'CNY')?.freeze_cash }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um39l9uww80')" data-index="charge_package_info.name" :width="160"></a-table-column>
                        <a-table-column :title="`PI ${ $t('account.account.5um3dxk2lpo0') }`" :width="local.lang=='en'?160:110">
                            <template #cell="{ record }">
                                <a-tag size="small"
                                    :color="record.pi_status == 1 ? '#00b42a' : record.pi_status == 0 ? '#ff7d00' : '#f53f3f'">
                                    {{ useEnumsFormat('otc.account.pi_status', record.pi_status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um39l9uwzo0')" :width="local.lang=='en'?160:120">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag size="small"
                                        :color="record.risk_assessment_status == 1 ? '#00b42a' : record.risk_assessment_status == 0 ? '#ff7d00' : '#f53f3f'">
                                        {{ useEnumsFormat('otc.account.risk_assessment_status',
                                            record.risk_assessment_status) }}
                                    </a-tag>
                                    <a-tag size="small" :color="temp.riskLevelColor[record.risk_level]"
                                        v-if="record.risk_level">
                                        <span>{{ useEnumsFormat('otc.risk.risk_level', record.risk_level) }}</span>
                                    </a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um39l9uvyw0')" :width="70">
                            <template #cell="{ record }">
                                <a-switch @change="changeStatus(record)" size="small" :checked-value="1"
                                    :unchecked-value="0" v-model="record.status" />
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um39l9uwcc0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('account.account.5ukfohnhf4o0')" :width="local.lang == 'en'? 200:150"
                            v-if="$permission(['otcAccountDetail', 'otcAccountResetPassword'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['otcAccountDetail']"
                                        @click="router.push({ name: 'otcAccountDetail', params: { id: record.id } })">{{$t('account.account.5um39l9ux2g0')}}</a-link>
                                    <a-popconfirm position="left" @ok="resetPassword(record)"
                                        :content="`${ $t('account.account.5um3b3g0ax40') }?${$t('account.account.5um39l9ux5c0')}`">
                                        <a-link v-permission="['otcAccountResetPassword']">{{$t('account.account.5um39l9ux8g0')}}</a-link>
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
const temp = useTemp()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        account: '',
        real_name: '',
        mobile: '',
        email: '',
        status: '',
        pi_status: '',
        risk_assessment_status: '',
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
const changeStatus = async (record: any) => {
    const { code, msg } = await apiOtc.accountUpdate({
        id: record.id,
        data: {
            status: record.status
        }
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
}
// 重置密码
const resetPassword = async (record: any) => {
    const { code, msg } = await apiOtc.accountResetPassword({
        id: record.id
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
}
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiOtc.accountList({
        ...useFilter(searchInfo.data),
        ...useFilter({
            pi_status: searchInfo.data.pi_status !== '' ? searchInfo.data.pi_status : null,
            risk_assessment_status: searchInfo.data.risk_assessment_status !== '' ? searchInfo.data.risk_assessment_status : null,
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