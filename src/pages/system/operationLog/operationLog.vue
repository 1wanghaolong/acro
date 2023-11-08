
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">

                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="operate_method" :label="$t('operationLog.operationLog.5um1zopmcng0')">
                                <a-select allow-clear v-model="searchInfo.data.operate_method" :placeholder="$t('operationLog.operationLog.5um1zopmut80')">
                                    <a-option v-for="item in useEnums('system.operationLog.operate_method')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="operator_id" :label="$t('operationLog.operationLog.5um1zopmybo0')">
                                <a-input v-model="searchInfo.data.operator_id" :placeholder="$t('operationLog.operationLog.5um1zopmz3c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="operator_name" :label="$t('operationLog.operationLog.5um1zopnd440')">
                                <a-input v-model="searchInfo.data.operator_name" :placeholder="$t('operationLog.operationLog.5um1zopmz3c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="operator_url" :label="$t('operationLog.operationLog.5um1zopneg40')">
                                <a-input v-model="searchInfo.data.operator_url" :placeholder="$t('operationLog.operationLog.5um1zopmz3c0')" />
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
                        {{ searchInfo.show ? $t('operationLog.operationLog.5um1zopnfr80') : $t('operationLog.operationLog.5um1zopni8g0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('operationLog.operationLog.5um1zopnwnc0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('operationLog.operationLog.5um1zopnyv80')}}
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
                        <a-table-column :title="$t('operationLog.operationLog.5um1zopmcng0')" data-index="operate_method" :width="100" >
                            <template #cell="{ record }">
                                {{ useEnumsFormat('system.operationLog.operate_method', record.operate_method) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('operationLog.operationLog.5um1zopmybo0')" data-index="operator_id" :width="100" ></a-table-column>
                        <a-table-column :title="$t('operationLog.operationLog.5um1zopnd440')" data-index="operator_name" :width="120" ></a-table-column>
                        <a-table-column :title="$t('operationLog.operationLog.5um1zopneg40')" data-index="operate_url" :width="240" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('operationLog.operationLog.5um1zopo1d80')" data-index="operate_data">
                            <template #cell="{ record }">
                                <ContentEllipsis :content="record.operate_data" > </ContentEllipsis>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('operationLog.operationLog.5um1zopo1yg0')" data-index="operate_time" :width="120" :ellipsis="true"
                            :tooltip="true">
                            <template #cell="{ record }">
                                <div>{{ record.operate_time ? dayjs.unix(record.operate_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div v-if="record.operate_time">{{ record.operate_time ?
                                    dayjs.unix(record.operate_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['systemUserLogDeletel'])" fixed="right" :title="$t('operationLog.operationLog.5um1zopo4800')" :width="80">
                            <template #cell="{ record }">
                                <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0')">
                                    <a-link v-if="$permission(['systemUserLogDeletel'])" status="danger">{{$t('operationLog.operationLog.5um1zopo5740')}}</a-link>
                                </a-popconfirm>
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
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        operator_url: '',
        operator_name: '',
        operator_id: '',
        operate_method: '',
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

    const { code, data } = await apiSystem.systemUserLogList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiSystem.systemUserLogDeletel({ 'id': [val.id] })
    if (code != 1) return;
    getData();
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