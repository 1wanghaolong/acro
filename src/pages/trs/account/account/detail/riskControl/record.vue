<template>
    <div>
        <a-card>
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('riskControl.record.5um897389ic0')}}
                    </a-space>
                </div>
            </template>
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <!-- <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="risk_control_status" :label="$t('riskControl.record.5um89738adg0')">
                                <a-select allow-clear v-model="searchInfo.data.risk_control_status" :placeholder="$t('riskControl.record.5um89738ahg0')">
                                    <a-option v-for="item in useEnums('trs.risk_control.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col> -->
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trigger_time" :label="$t('riskControl.record.5um89738ak80')">
                                <a-range-picker v-model="searchInfo.data.trigger_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('riskControl.record.5um89738amc0') : $t('riskControl.record.5um89738aoo0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('riskControl.record.5um89738ar00')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('riskControl.record.5um89738ass0')}}
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
                        <a-table-column :title="`TRS${ $t('riskControl.record.5um89738auw0') }`" data-index="trs_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('riskControl.record.5um89738ax40')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('riskControl.record.5um89738ays0')" data-index="asset_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('riskControl.record.5um89738b0w0')" data-index="currency" :width="90">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency || $t('riskControl.record.5um89738b2o0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <!-- <a-table-column title="风控状态" :width="110">
                            <template #cell="{ record }">
                                <a-tag size="small" :color="record.risk_control_status == 1?'#00b42a':record.risk_control_status == 2?'#ff7d00':'#f53f3f'">
                                    {{ useEnumsFormat('trs.risk_control.status',record.risk_control_status) }}
                                </a-tag>
                            </template>
                        </a-table-column> -->
                        <a-table-column :title="$t('riskControl.record.5um89738ak80')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.trigger_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.trigger_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('riskControl.record.5um89738b580')" :width="300">
                            <template #cell="{ record }">
                                <div>
                                    {{$t('riskControl.record.5um89738b700')}}
                                    {{ (Number(record.total_power) - Number(record.total_asset)).toFixed(4) }},
                                    {{$t('riskControl.record.5um89jyfn0s0')}}{{ record.risk_control_info?.name }}，{{$t('riskControl.record.5um89jyfnm00')}}
                                </div>
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
import dayjs from 'dayjs'
// import { useEnumsFormat, useEnums } from '@/hooks/enums'
// const local = useLocal()
const route = useRoute()
const searchFormRef = ref()
const loading = ref(false)
const searchInfo = reactive({
    show: false,
    data: {
        risk_control_status: '',
        trigger_time: [],
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    loading: false
})
const getData = async () => {
    loading.value = true
    const { code, data } = await apiTrs.riskControlRecordList({
        ...useFilter(searchInfo.data),
        ...useFilter({
            trs_account_id: route.params?.id,
            status: searchInfo.data.risk_control_status ? searchInfo.data.risk_control_status : null,
        })
    })
    loading.value = false
    if (code != 1) return;
    tableData.count = data.count
    tableData.list = data.list

}
{
    getData()
}
</script>