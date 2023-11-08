<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="platform" :label="$t('appPage.appPage.5ukexh68qx40')">
                                <a-select allow-clear v-model="searchInfo.data.platform" :placeholder="$t('appPage.appPage.5ukexh68sts0')">
                                    <a-option v-for="item in useEnums('info.platform')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="title" :label="$t('appPage.appPage.5ukexh68t0s0')">
                                <a-input v-model="searchInfo.data.title" :placeholder="$t('appPage.appPage.5ukexh68t4s0')" />
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
                        {{ searchInfo.show ? $t('appPage.appPage.5ukexh68t940') : $t('appPage.appPage.5ukexh68tdo0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('appPage.appPage.5ukexh68tk00')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('appPage.appPage.5ukexh68to00')}}
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
                        <a-table-column title="ID" :width="200">
                            <template #cell="{ record }">
                                <div>{{ record.id }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('appPage.appPage.5ukexh68tss0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('info.page.type', record.type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('appPage.appPage.5ukexh68qx40')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('info.platform', record.platform) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('appPage.appPage.5ukexh68t0s0')" :width="200">
                            <template #cell="{ record }">
                                <div>{{ record?.title }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('appPage.appPage.5ukexh68txk0')" :width="180">
                            <template #cell="{ record }">
                                <div v-if="!record.update_time">-</div>
                                <div v-else>
                                    <div>{{ dayjs.unix(record.update_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('appPage.appPage.5ukexh68u1c0')" :width="180">
                            <template #cell="{ record }">
                                <div v-if="!record.update_time">-</div>
                                <div v-else>
                                    <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('appPage.appPage.5ukexh68u5k0')" :width="120">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link @click="useCopy(record.link)">{{$t('appPage.appPage.5ukexh68u9c0')}}</a-link>
                                    <a-link v-permission="['configAppPageUpdate']" @click="router.push({name:'configAppPageUpdate',params:{id:record.id}})">{{$t('appPage.appPage.5ukexh68udc0')}}</a-link>
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
import { useCopy } from '@/hooks/copy'
import dayjs from 'dayjs'
const viteName = import.meta.env.VITE_NAME

const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        scene: 'normal',
        platform: '',
        title: '',
        page: 1,
        per_page: 20
    }
})
if (viteName == 'cmsPro') {
    searchInfo.data.scene = 'normal'
} else {
    searchInfo.data.scene = 'trs'
}
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiSystem.infoPages({
        ...useFilter(searchInfo.data)
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