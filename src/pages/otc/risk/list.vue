<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('risk.list.5um7srrhv7o0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('risk.list.5um7srrhvw00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('risk.list.5um7srrhw0c0')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('risk.list.5um7srrhvw00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('risk.list.5um7srrhw300')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('risk.list.5um7srrhvw00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="email" :label="$t('risk.list.5um7srrhw5k0')">
                                <a-input v-model="searchInfo.data.email" :placeholder="$t('risk.list.5um7srrhvw00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('risk.list.5um7srrhw800')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('risk.list.5um7srrhwao0')">
                                    <a-option v-for="item in useEnums('otc.risk.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('risk.list.5um7srrhwcw0')">
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
                        {{ searchInfo.show ? $t('risk.list.5um7srrhwfk0') : $t('risk.list.5um7srrhwhw0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('risk.list.5um7srrhwkc0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('risk.list.5um7srrhwnc0')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['otcRiskCreate']">
                    <a-button @click="router.push({ name: 'otcRiskCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('risk.list.5um7srrhwpo0')}}
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
                        <a-table-column :title="$t('risk.list.5um7srrhv7o0')" data-index="asset_account_info.account" :width="100" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('risk.list.5um7srrhw0c0')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('risk.list.5um7srrhws00')" :width="230">
                            <template #cell="{ record }">
                                <div>{{$t('risk.list.5um7t3v9oh00')}}：{{ record?.asset_account_info?.mobile }}</div>
                                <div>{{$t('risk.list.5um7t3v9p8w0')}}：{{ record?.asset_account_info?.email }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('risk.list.5um7srrhwuo0')" :width="100">
                            <template #cell="{ record }">
                                <a-tag size="small" :color="temp.riskLevelColor[record.risk_level]"
                                    v-if="record.risk_level">
                                    <span>{{ useEnumsFormat('otc.risk.risk_level', record.risk_level) }}</span>
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('risk.list.5um7srrhwws0')" :width="local.lang=='en'?120:100">
                            <template #cell="{ record }">
                                <a-tag>{{ useEnumsFormat('otc.risk.from_type', record.from_type) }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('risk.list.5um7srrhw800')" :width="100">
                            <template #cell="{ record }">
                                <a-tag size="small"
                                    :color="record.status == 2 ? '#00b42a' : record.status == 1 ? '#ff7d00' : '#f53f3f'">
                                    {{ useEnumsFormat('otc.risk.status', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('risk.list.5um7srrhwcw0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('risk.list.5um7srrhwz40')" :width="80" v-if="$permission(['otcRiskDetail'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'otcRiskDetail', params: { id: record.id } })">{{$t('risk.list.5um7srrhx1c0')}}</a-link>
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
        asset_account: '',
        name: '',
        mobile: '',
        status: '',
        email: '',
        audit_time: [],
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
    const { code, data } = await apiOtc.riskAssessmenList({
        ...useFilter(searchInfo.data),
        ...useFilter({
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