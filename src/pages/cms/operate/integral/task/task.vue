
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('task.task.5ukiidom5zk0')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('task.task.5ukiidomni40')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('task.task.5ukiidomo780')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('task.task.5ukiidomogs0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="time" :label="$t('task.task.5ukiidomosg0')">
                                <a-range-picker v-model="searchInfo.data.time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('task.task.5ukiidompq80') : $t('task.task.5ukiidompzk0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('task.task.5ukiidomq580')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('task.task.5ukiidomqb40')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['cmsOperateIntegralTaskCreate']"
                        @click="router.push({ name: 'cmsOperateIntegralTaskCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('task.task.5ukiidomqgo0')}}
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
                        <a-table-column :title="$t('task.task.5ukiidomqmk0')">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.integral.task.type', record.type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('task.task.5ukiidom5zk0')" :width="160" data-index="name" :ellipsis="true" :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('task.task.5ukiidomr940')" data-index="score" :ellipsis="true" :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('task.task.5ukiidomrfs0')" data-index="total_receive_num" ></a-table-column>
                        <a-table-column :title="$t('task.task.5ukiidoms6o0')">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.integral.task.expire_type', record.expire_type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('task.task.5ukiidomscw0')">
                            <template #cell="{ record }">
                                <div>{{ record.expire_day?record.expire_day:$t('task.task.5ukiidomt0g0') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('task.task.5ukiidomo780')" :width="100">
                            <template #cell="{ record }">
                                <span v-if="$permission(['cmsOperateIntegralTaskUpdateStatus'])">
                                    <a-switch size="small" v-permission="['cmsOperateIntegralTaskUpdateStatus']"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('cms.operate.quote.market.status', record.status) }}
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('task.task.5ukiidomt6c0')">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column
                            v-if="$permission(['cmsOperateIntegralTaskDetail', 'cmsOperateIntegralTaskUpdate', 'cmsIntegralTaskDelete'])"
                            fixed="right" :title="$t('task.task.5ukiidomtc00')" :width="local.lang=='en'?170:150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsOperateIntegralTaskDetail'])"
                                        @click="router.push({ name: 'cmsOperateIntegralTaskDetail', params: { id: record.id } })">{{$t('task.task.5ukiidomtgw0')}}</a-link>
                                    <a-link v-if="$permission(['cmsOperateIntegralTaskUpdate'])"
                                    @click="router.push({ name: 'cmsOperateIntegralTaskUpdate', params: { id: record.id } })">{{$t('task.task.5ukiidomtos0')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0') ">
                                        <a-link v-if="$permission(['cmsIntegralTaskDelete'])" status="danger">{{$t('task.task.5ukiidomtts0')}}</a-link>
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
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        status: '',
        time: [],
        name: '',
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
    const { code, data } = await apiCms.cmsIntegralTaskList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}

// 修改状态
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiCms.cmsIntegralTaskUpdate({
        taskId: val.id,
        data: {
            status: val.status
        }
    })
    if (code != 1) {
        val.status = val.status == 0 ? 1 : 0
        return
    };
    Message.success({
        content: t('task.task.5ukiidomud40'),
    })
    getData();
}
// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiCms.cmsIntegralTaskDelete({ 'taskIds': [val.id] })
    if (code != 1) return;
    getData();
}
{
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}
</style>