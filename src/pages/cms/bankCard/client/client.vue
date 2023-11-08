<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('client.client.5ukmd143b400')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('client.client.5ukmd143ck80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="nickname" :label="$t('client.client.5ukmd143cuo0')">
                                <a-input v-model="searchInfo.data.nickname" :placeholder="$t('client.client.5ukmd143ck80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="realName" :label="$t('client.client.5ukmd143d0g0')">
                                <a-input v-model="searchInfo.data.realName" :placeholder="$t('client.client.5ukmd143ck80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="bankName" :label="$t('client.client.5ukmd143d580')">
                                <a-input v-model="searchInfo.data.bankName" :placeholder="$t('client.client.5ukmd143ck80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="bankCode" :label="$t('client.client.5ukmd143d9w0')">
                                <a-input v-model="searchInfo.data.bankCode" :placeholder="$t('client.client.5ukmd143ck80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="bankAccount" :label="$t('client.client.5ukmd143dek0')">
                                <a-input v-model="searchInfo.data.bankAccount" :placeholder="$t('client.client.5ukmd143ck80')" />
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
                            <a-form-item field="bindTime" :label="$t('client.client.5ukmd143dxs0')">
                                <a-range-picker v-model="searchInfo.data.bindTime" format="YYYY-MM-DD" />
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
                        <a-table-column data-index="id" title="ID" :width="60" :ellipsis="true" :tooltip="true">
                        </a-table-column>
                        <a-table-column data-index="country_code" :title="$t('client.client.5ukmd143eso0')" :width="80" >
                        </a-table-column>
                        <a-table-column data-index="mobile" :title="$t('client.client.5ukmd143b400')" :width="140" :ellipsis="true"
                            :tooltip="true">
                        </a-table-column>
                        <a-table-column data-index="nickname" :title="$t('client.client.5ukmd143cuo0')" :width="140" >
                        </a-table-column>
                        <a-table-column data-index="real_name" :title="$t('client.client.5ukmd143d0g0')" :width="100" :ellipsis="true"
                            :tooltip="true">
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukmd143exw0')" :width="200">
                            <template #cell="{ record }">
                                <div>{{ record.bank_full_name }} {{ record.bank_code ? `(${record.bank_code})` : '' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukmd143dek0')" :width="200">
                            <template #cell="{ record }">
                                <div>{{ record?.bank_account }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukmd143dlw0')" :width="160">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag v-for="item in record.currency_list" size="small">{{ item.currency }}</a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukmd143f5w0')" :width="local.lang=='en'?120:100">
                            <template #cell="{ record }">
                                <a-tag size="small"
                                    :color="record.status == 1 ? '#00b42a' : record.status == 0 ? '#ff7d00' : '#f53f3f'">
                                    {{ useEnumsFormat('otc.bankCard.status', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('client.client.5ukmd143fe80')" :width="120">
                            <template #cell="{ record }">
                                <div v-if="!record.create_time">-</div>
                                <div v-else>
                                    <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                                </div>
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
                        <a-table-column :title="$t('client.client.5ukmd143flw0')" :width="local.lang=='en'?150:100" fixed="right"
                            v-if="$permission(['cmsOrderUserBankCardUnBind','cmsBankCardClientDetail'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsBankCardClientDetail'])"
                                        @click="router.push({ name: 'cmsBankCardClientDetail', params: { id: record.id } })">{{$t('client.client.5ukmd143fus0')}}</a-link>
                                    <a-popconfirm position="left" @ok="unBind(record)" :content="$t('client.client.5ukmgqdgsmw0')">
                                        <a-link v-if="$permission(['cmsOrderUserBankCardUnBind'])" status="danger">{{$t('client.client.5ukmd143g2g0')}}</a-link>
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
const router = useRouter()
const local = useLocal()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        mobile: '',
        nickname: '',
        realName: '',
        bankName: '',
        bankAccount: '',
        bankCode: '',
        currency: '',
        bindTime: [],
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
    const { code, msg } = await apiCms.cmsOrderUserBankCardUnBind({
        cardId: record.id
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    tableData.loading = true
    const { code, data } = await apiCms.cmsOrderUserBankCardList({
        ...useFilter(param)
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