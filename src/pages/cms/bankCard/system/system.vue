<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="bankName" :label="$t('system.system.5ukkawfyai40')">
                                <a-input v-model="searchInfo.data.bankName" :placeholder="$t('system.system.5ukkawfydas0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="bankCode" :label="$t('system.system.5ukkawfydos0')">
                                <a-input v-model="searchInfo.data.bankCode" :placeholder="$t('system.system.5ukkawfydas0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="paymentType" :label="$t('system.system.5ukkawfyf040')">
                                <a-select allow-clear v-model="searchInfo.data.paymentType" :placeholder="$t('system.system.5ukkawfyfaw0')">
                                    <a-option v-for="item in useEnums('cms.bankCard.system.payment_type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('system.system.5ukkawfyfgw0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('system.system.5ukkawfyfaw0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="createTime" :label="$t('system.system.5ukkawfyfp00')">
                                <a-range-picker v-model="searchInfo.data.createTime" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('system.system.5ukkawfyfsw0') : $t('system.system.5ukkawfyfx00') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('system.system.5ukkawfyg200')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('system.system.5ukkawfyg9g0')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['cmsBankCardSystemCreate']">
                    <a-button @click="router.push({ name: 'cmsBankCardSystemCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('system.system.5ukkawfygdg0')}}
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
                        <a-table-column data-index="id" title="ID" :width="60" :ellipsis="true" :tooltip="true">
                        </a-table-column>
                        <a-table-column :title="$t('system.system.5ukkawfygh80')">
                            <template #cell="{ record }">
                                <div>{{ record.bank_full_name }} {{ record.bank_code ? `(${record.bank_code})` : '' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('system.system.5ukkawfygrc0')" :width="120">
                            <template #cell="{ record }">
                                <a-image :src="record.bank_icon" :width="40"></a-image>
                            </template>
                        </a-table-column>

                        <a-table-column :title="$t('system.system.5ukkawfyfgw0')">
                            <template #cell="{ record }">
                                <a-space wrap>
                                    <a-tag v-for="item in record.currency_list" size="small">{{
                                        item.currency }}</a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('system.system.5ukkawfyf040')">
                            <template #cell="{ record }">
                                <a-space wrap>
                                    <a-tag v-for="item in record.payment_type_list" size="small">
                                        {{ useEnumsFormat('cms.bankCard.system.payment_type', item.type) }}
                                    </a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('system.system.5ukkawfyfp00')" :width="local.lang=='en'?130:120">
                            <template #cell="{ record }">
                                <div v-if="!record.create_time">-</div>
                                <div v-else>
                                    <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('system.system.5ukkawfygv80')" :width="local.lang=='en'?170:150" fixed="right"
                            v-if="$permission(['cmsBankCardSystemDetail', 'cmsBankCardSystemUpdate', 'cmsOrderSystemBankCardDelete'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['cmsBankCardSystemDetail']"
                                        @click="router.push({ name: 'cmsBankCardSystemDetail', params: { id: record.id } })">{{$t('system.system.5ukkawfygys0')}}</a-link>
                                    <a-link v-permission="['cmsBankCardSystemUpdate']"
                                        @click="router.push({ name: 'cmsBankCardSystemUpdate', params: { id: record.id } })">{{$t('system.system.5ukkawfyh2w0')}}</a-link>
                                    <a-popconfirm position="left" @ok="del(record)" :content="$t('problem.problem.5ukdvvdbjrg0') ">
                                        <a-link v-permission="['cmsOrderSystemBankCardDelete']" status="danger">{{$t('system.system.5ukkawfyh6s0')}}</a-link>
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
        currency: '',
        bankName: '',
        bankCode: '',
        createTime: [],
        paymentType: "",
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
    const { code, msg } = await apiCms.cmsOrderSystemBankCardDelete({
        cardIds: [record.id]
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiCms.cmsOrderSystemBankCardList({
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