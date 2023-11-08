<template>
    <div>
        <a-card :loading="tableData.loading" style="margin-top: 20px;">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="account" :label="$t('detail.account.5umyvr495900')">
                                <a-input v-model="searchInfo.data.account" :placeholder="$t('detail.account.5umyvr4961k0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('detail.account.5umyvr496940')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('detail.account.5umyvr4961k0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('detail.account.5umyvr496eo0')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('detail.account.5umyvr4961k0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="email" :label="$t('detail.account.5umyvr496k00')">
                                <a-input v-model="searchInfo.data.email" :placeholder="$t('detail.account.5umyvr4961k0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('detail.account.5umyvr496pk0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('detail.account.5umyvr496v40')">
                                    <a-option v-for="item in useEnums('otc.account.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="pi_status" :label="$t('detail.account.5umyw0rptio0')">
                                <a-select allow-clear v-model="searchInfo.data.pi_status" :placeholder="$t('detail.account.5umyvr496v40')">
                                    <a-option v-for="item in useEnums('otc.account.pi_status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="risk_assessment_status" :label="$t('detail.account.5umyvr4970w0')">
                                <a-select allow-clear v-model="searchInfo.data.risk_assessment_status" :placeholder="$t('detail.account.5umyvr496v40')">
                                    <a-option v-for="item in useEnums('otc.account.risk_assessment_status')"
                                        :value="item.value">{{ item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('detail.account.5umyvr4976c0')">
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
                        {{ searchInfo.show ? $t('detail.account.5umyvr497b40') : $t('detail.account.5umyvr497ic0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), reset(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('detail.account.5umyvr497o40')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('detail.account.5umyvr497tg0')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['otcAccountCreate']">
                    <a-button @click="router.push({ name: 'otcAccountCreate', query: { mobile: route.query.mobile } })"
                        type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('detail.account.5umyvr4980s0')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small" :data="tableData.list"
                    class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.account.5umyvr495900')" data-index="account" :width="local.lang=='en'?140:120"></a-table-column>
                        <a-table-column :title="$t('detail.account.5umyvr496940')" data-index="real_name" :width="100"></a-table-column>
                        <a-table-column :title="$t('detail.account.5umyvr4985w0')" :width="230">
                            <template #cell="{ record }">
                                <div>{{$t('detail.account.5umyxiphnt40')}}：{{ record.mobile }}</div>
                                <div>{{$t('detail.account.5umyxiphnvg0')}}：{{ record.email }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.account.5umyvr498ak0')" :width="200"
                            v-if="useEnums('currency').find((item: any) => item.value == 'HKD')">
                            <template #cell="{ record }">
                                <div>{{$t('detail.account.5umyxiphmvo0')}}：{{ record.asset_account_asset_list?.find((item: any) => item.currency ==
                                    'HKD')?.usable_cash }}</div>
                                <div>{{$t('detail.account.5umyxiphnpk0')}}：{{ record.asset_account_asset_list?.find((item: any) => item.currency ==
                                    'HKD')?.freeze_cash }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.account.5umyvr498fc0')" :width="200"
                            v-if="useEnums('currency').find((item: any) => item.value == 'USD')">
                            <template #cell="{ record }">
                                <div>{{$t('detail.account.5umyxiphmvo0')}}：{{ record.asset_account_asset_list?.find((item: any) => item.currency ==
                                    'USD')?.usable_cash }}</div>
                                <div>{{$t('detail.account.5umyxiphnpk0')}}：{{ record.asset_account_asset_list?.find((item: any) => item.currency ==
                                    'USD')?.freeze_cash }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.account.5umyvr498mc0')" :width="200"
                            v-if="useEnums('currency').find((item: any) => item.value == 'CNY')">
                            <template #cell="{ record }">
                                <div>{{$t('detail.account.5umyxiphmvo0')}}：{{ record.asset_account_asset_list?.find((item: any) => item.currency ==
                                    'CNY')?.usable_cash }}</div>
                                <div>{{$t('detail.account.5umyxiphnpk0')}}：{{ record.asset_account_asset_list?.find((item: any) => item.currency ==
                                    'CNY')?.freeze_cash }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.account.5umyvr498xg0')" data-index="charge_package_info.name" :width="120" ></a-table-column>
                        <a-table-column :title="$t('detail.account.5umyzf654580')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('otc.account.pi_status', record.pi_status) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.account.5umyvr4992k0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('otc.account.risk_assessment_status', record.pi_status) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.account.5umyvr496pk0')" :width="70">
                            <template #cell="{ record }">
                                <a-switch @change="changeStatus(record)" size="small" :checked-value="1"
                                    :unchecked-value="0" v-model="record.status" />
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.account.5umyvr4976c0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('detail.account.5umyvr499a00')" :width="local.lang=='en'?200:150"
                            v-if="$permission(['otcAccountDetail', 'otcAccountResetPassword'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['otcAccountDetail']"
                                        @click="router.push({ name: 'otcAccountDetail', params: { id: record.id }, query: { mobile: route.query.mobile, customid: route.params.customid } })">{{$t('detail.account.5umyvr499jc0')}}</a-link>
                                    <a-popconfirm position="left" @ok="resetPassword(record)"
                                        :content="$t('detail.account.5umyvr499oo0')">
                                        <a-link v-permission="['otcAccountResetPassword']">{{$t('detail.account.5umyvr499v80')}}</a-link>
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
const route = useRoute()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        account: '',
        real_name: '',
        mobile: '' + route.query?.mobile || "",
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
const reset = () => {
    searchInfo.data = {
        account: '',
        real_name: '',
        mobile: '' + route.query?.mobile || "",
        email: '',
        status: '',
        pi_status: '',
        risk_assessment_status: '',
        create_time: [],
        page: 1,
        per_page: 20
    }
}
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