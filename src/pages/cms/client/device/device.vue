<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('device.device.5ukl7ounh6g0')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('device.device.5ukl7ouni5s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="device" :label="$t('device.device.5ukl7ounids0')">
                                <a-select allow-clear v-model="searchInfo.data.device"
                                    :placeholder="$t('device.device.5ukl7ounij40')">
                                    <a-option v-for="item in useEnums('cms.client.device.device')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="lastLoginTime" :label="$t('device.device.5ukl7ounink0')">
                                <a-range-picker v-model="searchInfo.data.lastLoginTime" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('device.device.5ukl7ounisg0') : $t('device.device.5ukl7ouniwo0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{ $t('device.device.5ukl7ounj1k0') }}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{ $t('device.device.5ukl7ounj680') }}
                    </a-button>
                </a-space>
                <a-space :size="18">
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
                        <a-table-column title="ID" data-index="id" :width="60"></a-table-column>
                        <a-table-column :title="$t('device.device.5ukl7ounjag0')" data-index="nickname" :width="140"
                            :ellipsis="true" :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('device.device.5ukl7ounh6g0')" data-index="mobile" :width="130"
                            :ellipsis="true" :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('device.device.5ukl7ounids0')" data-index="device_system" :width="110"
                            :ellipsis="true" :tooltip="true">
                            <!-- <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.client.device.device', record.device) }}</div>
                            </template> -->
                        </a-table-column>
                        <a-table-column :title="$t('device.device.5ukl7ounjeg0')" data-index="device_name" :width="130"
                            :ellipsis="true" :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('device.device.5ukl7ounjj40')" data-index="device_model"
                            :width="210"></a-table-column>
                        <a-table-column :title="$t('device.device.5ukl7ounjo00')" data-index="last_login_ip"
                            :width="140"></a-table-column>
                        <a-table-column :title="$t('device.device.5ukl8czav2g0')" data-index="last_login_region"
                            :width="130"></a-table-column>
                        <a-table-column :title="$t('device.device.5ukl8czaw2s0')" :width="local.lang == 'en' ? 140 : 120">
                            <template #cell="{ record }">
                                <div>{{ record.last_login_time ? dayjs.unix(record.last_login_time).format('YYYY-MM-DD') :
                                    '--' }}
                                </div>
                                <div>{{ record.last_login_time ? dayjs.unix(record.last_login_time).format('HH:mm:ss') :
                                    '--' }}
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
import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
// @ts-ignore
import { saveAs } from 'file-saver';
const local = useLocal()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        mobile: '',
        device: '',
        lastLoginTime: [],
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
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    const { code, data } = await apiCms.cmsUserDeviceList({
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
<style scoped>:deep(.arco-typography) {
    margin-bottom: 0;
}</style>