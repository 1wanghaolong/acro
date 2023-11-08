<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('orderSort.orderSort.5umyxx4b75w0')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('orderSort.orderSort.5umyxx4b7lc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('orderSort.orderSort.5umyxx4b7oc0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('orderSort.orderSort.5umyxx4b7qs0')">
                                    <a-option v-for="item in useEnums('config.template.orderSort.status')"
                                        :value="item.value">{{
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
                        {{ searchInfo.show ? $t('orderSort.orderSort.5umyxx4b7tk0') : $t('orderSort.orderSort.5umyxx4b7vo0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('orderSort.orderSort.5umyxx4b7zg0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('orderSort.orderSort.5umyxx4b81k0')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['configTemplateOrderSortCreate']">
                    <a-button @click="router.push({ name: 'configTemplateOrderSortCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('orderSort.orderSort.5umyxx4b83s0')}}
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
                        <a-table-column :title="$t('orderSort.orderSort.5umyxx4b75w0')">
                            <template #cell="{ record }">
                                <div>{{ record.name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('orderSort.orderSort.5umyxx4b87k0')">
                            <template #cell="{ record }">
                                <div>{{ record.desc }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('orderSort.orderSort.5umyxx4b7oc0')" v-if="$permission(['configTemplateOrderSortUpdate'])">
                            <template #cell="{ record }">
                                <a-switch @change="changeStatus(record)" size="small" :checked-value="1"
                                    :unchecked-value="0" v-model="record.status" />
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('orderSort.orderSort.5umyxx4b89o0')" :width="80"
                            v-if="$permission(['configTemplateOrderSortDetail'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'configTemplateOrderSortDetail', params: { sortid: record.id } })">{{$t('orderSort.orderSort.5umyxx4b8bo0')}}</a-link>
                                    <!-- <a-popconfirm position="left" @ok="resetDel(record)" content="您确认要删除改模板吗?">
                                        <a-link status="danger">{{$t('orderSort.orderSort.5umyxx4b8ds0')}}</a-link>
                                    </a-popconfirm> -->
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
import { useEnums } from '@/hooks/enums'
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        name: '',
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
// 编辑状态
const changeStatus = async (record: any) => {
    const { code, msg } = await apiTrs.counterChannelAccountSceneTempUpdate({
        data: {
            id: record.id,
            status: record.status
        }
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
}
// 删除模板
// const resetDel = async (record:any) => {
//     const { code,msg } = await apiTrs.counterChannelAccountSceneTempDelete({
//         id:[record.id]
//     })
//     if(code != 1) return getData();
//     Message.success({content:msg})
//     getData()
// }
const getData = async () => {
    tableData.loading = true
    const formData = cloneDeep(searchInfo.data)
    !formData.status && delete formData.status
    const { code, data } = await apiTrs.counterChannelAccountSceneTempList({
        ...useFilter(formData)
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