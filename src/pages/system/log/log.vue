
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('log.log.5uljlowr9a80')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('log.log.5uljlowrb080')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="userDevice" :label="$t('log.log.5uljlowrb9w0')">
                                <a-select allow-clear v-model="searchInfo.data.userDevice" :placeholder="$t('log.log.5uljlowrbek0')">
                                    <a-option v-for="item in useEnums('system.log.userDevice')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="logTime" :label="$t('log.log.5uljlowrbio0')">
                                <a-range-picker v-model="searchInfo.data.logTime" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="createTime" :label="$t('log.log.5uljlowrbpo0')">
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
                        {{ searchInfo.show ? $t('log.log.5uljlowrbtk0') : $t('log.log.5uljlowrbxk0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('log.log.5uljlowrc1g0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('log.log.5uljlowrc5k0')}}
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
                        <a-table-column title="ID" data-index="id" :width="80"></a-table-column>
                        <a-table-column :title="$t('log.log.5uljlowrb9w0')" data-index="user_device" :width="120" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('system.log.userDevice', record.user_device) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('log.log.5uljlowrbio0')" data-index="log_time" :width="120" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                <div>{{ record.log_time ? dayjs.unix(record.log_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('log.log.5uljlowrca00')" data-index="user_id" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('log.log.5uljlowr9a80')" data-index="mobile" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('log.log.5uljlowrbpo0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('log.log.5uljlowrcds0')" :width="100">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link @click="useCopy(record.link)">{{$t('log.log.5uljlowrchk0')}}</a-link>
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
import { useCopy } from '@/hooks/copy'
const local = useLocal()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        mobile: '',
        userDevice: '',
        createTime: [],
        logTime: [],
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
    const { code, data } = await apiSystem.systemLogList({
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
<style scoped lang="less">
:deep(.arco-typography) {
    margin-bottom: 0;
}

:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>