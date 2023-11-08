<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <!-- <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="title" :label="$t('message.message.5ukfkl8a80g0')">
                                <a-input v-model="searchInfo.data.title" :placeholder="$t('message.message.5ukfkl8a95w0')" />
                            </a-form-item>
                        </a-col> -->
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="push_time" :label="$t('message.message.5ukfkl8a9bw0')">
                                <a-range-picker v-model="searchInfo.data.push_time" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('message.message.5ukfkl8a9gw0')">
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
                        {{ searchInfo.show ? $t('message.message.5ukfkl8a9jo0') : $t('message.message.5ukfkl8a9mc0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('message.message.5ukfkl8a9pk0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('message.message.5ukfkl8aais0')}}
                    </a-button>
                </a-space>
                <a-space :size="18" >
                    <a-button @click="download" >
                        {{$t('message.message.5ukfkl8ackw0')}}
                    </a-button>
                    <a-button v-permission="['cmsMessageCreate']" @click="router.push({ name: 'cmsMessageCreate' })"
                        type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('message.message.5ukfkl8acpc0')}}
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
                        <a-table-column :title="$t('message.message.5ukfkl8acsk0')" data-index="message_type" :width="100" >
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.message.message.messageType', record.message_type) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('message.message.5ukfkl8a80g0')" data-index="title" :width="200" >
                            <template #cell="{ record }">
                                <p v-html="record.title"></p>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('message.message.5ukfkl8adb80')" data-index="content"  :width="300" >
                            <template #cell="{ record }">
                                <ContentEllipsis :content="record.content" > </ContentEllipsis>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('message.message.5ukfkl8ade80')" data-index="is_need_push" :width="100" >
                            <template #cell="{ record }">
                                {{
                                    useEnumsFormat('cms.message.message.noticeType', record.is_need_push) }}
                            </template>
                        </a-table-column>
                            <a-table-column :title="$t('message.message.5ukfkl8a9bw0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.push_time ? dayjs.unix(record.push_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.push_time ? dayjs.unix(record.push_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('message.message.5ukfkl8adh40')" data-index="push_status" :width="100" >
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.message.message.pushType', record.push_status) }}
                            </template>
                        </a-table-column>
                            <a-table-column :title="$t('message.message.5ukfkl8a9gw0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        
                        <a-table-column v-if="$permission(['cmsSystemMessageDelete'])" fixed="right" :title="$t('message.message.5ukfkl8admo0')" :width="80">
                            <template #cell="{ record }">
                                <a-space v-if="record.status!=1">
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0') ">
                                        <a-link v-if="$permission(['cmsSystemMessageDelete'])" status="danger">{{$t('message.message.5ukfkl8adr80')}}</a-link>
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
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
import * as XLSX from 'xlsx';
// @ts-ignore
import { saveAs } from 'file-saver';
// const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        title: '',
        push_time: [],
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
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    const { code, data } = await apiCms.cmsSystemMessageList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}

// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiCms.cmsSystemMessageDelete({ 'pushIds': [val.id] })
    if (code != 1) return;
    getData();
}
const download = () => {
    const data = [
        { 'ID': '1', '区号/Country Code': '86', '账号/Mobile' : '13866668888' },
    ];
    // 将数据转转换为工作表
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 创建一个新的工作簿
    const workbook = XLSX.utils.book_new();

    // 将工作表添加到工作簿中
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 将工作簿写出为一个Blob对象
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // 保存文件
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'user-template.xlsx');
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