
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="event_id" :label="$t('event.event.5uljjr14ssg0')">
                                <a-input v-model="searchInfo.data.event_id" :placeholder="$t('event.event.5uljjr14vbw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="exchange" :label="$t('event.event.5uljjr14vuk0')">
                                <a-input v-model="searchInfo.data.exchange" :placeholder="$t('event.event.5uljjr14vbw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="queue" :label="$t('event.event.5uljjr14w5g0')">
                                <a-input v-model="searchInfo.data.queue" :placeholder="$t('event.event.5uljjr14vbw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('event.event.5uljjr14weo0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('event.event.5uljjr14woc0')">
                                    <a-option v-for="item in useEnums('system.event.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
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
                        {{ searchInfo.show ? $t('event.event.5uljjr14ww00') : $t('event.event.5uljjr14x440') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('event.event.5uljjr14xe00')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('event.event.5uljjr14y1c0')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table">
                    <template #columns>
                        <!-- <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column title="ID" data-index="id" :width="80"></a-table-column> -->
                        <a-table-column :title="$t('event.event.5uljjr14ssg0')" data-index="event_id" :width="270" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('event.event.5uljjr14vuk0')" data-index="exchange" :width="220" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('event.event.5uljjr14zaw0')" data-index="topic" :width="60" ></a-table-column>
                        <a-table-column :title="$t('event.event.5uljjr14w5g0')" data-index="queue" :width="130" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('event.event.5uljjr14znc0')" data-index="send_data" :width="200">
                            <template #cell="{ record }">
                                <ContentEllipsis :content="record.send_data" > </ContentEllipsis>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('event.event.5uljjr14weo0')" data-index="status" :width="local.lang=='en'?140:120" >
                            <template #cell="{ record }">
                                {{ useEnumsFormat('system.event.status', record.status) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('event.event.5uljjr14zuo0')" data-index="retry_num" :width="local.lang == 'en' ? 160 :120" >
                            <template #cell="{ record }">
                                {{ record.retry_num }}{{ $t('event.event.5uljjr1504k0') }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('event.event.5uljjr150ao0')" :width="local.lang == 'en' ? 140 :120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('event.event.5uljjr150k80')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.update_time ? dayjs.unix(record.update_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.update_time ? dayjs.unix(record.update_time).format('HH:mm:ss') : '--' }}
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
import { useEnums, useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        queue: '',
        exchange: '',
        event_id: '',
        status: '',
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
    const { code, data } = await apiSystem.systemEventList({
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