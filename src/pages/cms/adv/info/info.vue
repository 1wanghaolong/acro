<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="title" :label="$t('info.info.5ukmlcds1ak0')">
                                <a-input v-model="searchInfo.data.title" :placeholder="$t('info.info.5ukmlcds2c40')" />
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
                        {{ searchInfo.show ? $t('info.info.5ukmlcds2iw0') : $t('info.info.5ukmlcds2n00') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('info.info.5ukmlcds2pk0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('info.info.5ukmlcds2t00')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['cmsAdvInfoCreate']">
                    <a-button @click="router.push({ name: 'cmsAdvInfoCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('info.info.5ukmlcds2vk0')}}
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
                        <a-table-column :title="$t('info.info.5ukmlcds1ak0')" :width="450" data-index="title">
                            <template #cell="{ record }">
                                <span>{{ record.title }}</span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('info.info.5ukmlcds32k0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.update_time ? dayjs.unix(record.update_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.update_time ? dayjs.unix(record.update_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('info.info.5ukmlcds34o0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <!-- v-if="$permission(['cmsAdvInfoUpdate', 'cmsAdvPageDelete'])" -->
                        <a-table-column fixed="right" title="操作" :width="200">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link @click="previewBtn(record)">{{$t('info.info.5ukmlcds3a80')}}</a-link>
                                    <a-link @click="useCopy(record.link)">{{$t('info.info.5ukmlcds3ck0')}}</a-link>
                                    <a-link v-if="$permission(['cmsAdvInfoUpdate'])"
                                        @click="router.push({ name: 'cmsAdvInfoUpdate', params: { id: record.id } })">{{$t('info.info.5ukmlcds3fk0')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0')">
                                        <a-link v-if="$permission(['cmsAdvPageDelete'])" status="danger">{{$t('info.info.5ukmlcds3i80')}}</a-link>
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
        <a-modal :footer="false" v-model:visible="visible" @ok="visible = false" @cancel="visible = false">
            <template #title>
                {{$t('info.info.5ukmlcds3a80')}}
            </template>
            <div style="text-align: center;">
                <canvas ref="qrcodeCanvas"></canvas>
            </div>
            <p style="text-align: center;">{{$t('info.info.5ukmlcds3kk0')}}</p>
          
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
// import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
// @ts-ignore
import QRCode from 'qrcode';
// const local = useLocal()
import { useCopy } from '@/hooks/copy'
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        title: '',
        typeId: '',
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
    const { code, data } = await apiCms.cmsAdvPageList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiCms.cmsAdvPageDelete({ 'pageIds': [val.id] })
    if (code != 1) return;
    getData();
}
const visible = ref(false)
const qrcodeCanvas = ref()
const previewBtn = (val: any) => {
    const url = val.link; // 替换为您要生成二维码的链接
    QRCode.toCanvas(qrcodeCanvas.value, url, function (error: any) {
        if (error) {
            console.error(error);
        }
    });
    visible.value = true

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