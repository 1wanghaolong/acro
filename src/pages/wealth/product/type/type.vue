<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="product_name" :label="$t('type.type.5umxe2owfjk0')">
                                <a-input v-model="searchInfo.data.product_name" :placeholder="$t('type.type.5umxe2owh6k0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('type.type.5umxe2owhds0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('type.type.5umxe2owhic0')">
                                    <a-option v-for="item in useEnums('wealth.product.type.status')" :value="item.value">{{
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
                        {{ searchInfo.show ? $t('type.type.5umxe2owhm00') : $t('type.type.5umxe2owhr40') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('type.type.5umxe2owhv40')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('type.type.5umxe2owhyo0')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['wealthProductTypeCreate']">
                    <a-button @click="router.push({ name: 'wealthProductTypeCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('type.type.5umxe2owi2w0')}}
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
                        <!-- <a-table-column title="ID" data-index="id" :width="100"></a-table-column> -->
                        <a-table-column :title="$t('type.type.5umxe2owfjk0')">
                            <template #cell="{ record }">
                                <div>CN:{{ record?.product_name['zh-CN'] }}</div>
                                <div>EN:{{ record?.product_name['en'] }}</div>
                            </template>
                        </a-table-column>
                        <!-- <a-table-column title="类型名称" data-index="product_name"></a-table-column> -->
                        <a-table-column :title="$t('type.type.5umxe2owhds0')" v-if="$permission(['wealthProductTypeStates'])">
                            <template #cell="{ record }">
                                <a-typography-text>
                                    <a-tag v-if="record.status" size="small" :color="'#00b42a'">
                                        {{ $t('type.type.5umxe2owi6o0') }}
                                    </a-tag>
                                    <a-tag v-else size="small" :color="'#ff7d00'">
                                        {{ $t('type.type.5umxe2owiaw0') }}
                                    </a-tag>
                                </a-typography-text>
                                <a-switch style="margin-left:10px" @change="changeStatus(record)" size="small"
                                    :checked-value="1" :unchecked-value="0" v-model="record.status" />
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :width="local.lang=='en'?170:150" :title="$t('type.type.5umxe2owiew0')"
                            v-if="$permission(['wealthproductTypeDetailIndex', 'wealthProductTypeCopy', 'wealthProductTypeDelete'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['wealthproductTypeDetailIndex']"
                                        @click="router.push({ name: 'wealthproductTypeDetail', params: { productid: record.id } })">{{$t('type.type.5umxe2owiik0')}}</a-link>
                                    <a-popconfirm position="top" @ok="copy(record)" :content="$t('type.type.5umxe2owimk0')">
                                        <a-link v-permission="['wealthProductTypeCopy']">{{$t('type.type.5umxe2owirk0')}}</a-link>
                                    </a-popconfirm>
                                    <a-popconfirm position="left" @ok="resetPassword(record)" :content="$t('type.type.5umxe2owivk0')">
                                        <a-link v-permission="['wealthProductTypeDelete']" status="danger">{{$t('type.type.5umxe2owj080')}}</a-link>
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
import { useEnums } from '@/hooks/enums'
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        product_name: '',
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
const copy = async (record: any) => {
    const { code, msg } = await apiWealth.wealthOptionsProductCopy({
        id: record.id,
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
    getData()
}
// 编辑状态
const changeStatus = async (record: any) => {
    const { code, msg } = await apiWealth.wealthOptionsProductUpdateStatus({
        id: record.id,
        status: record.status
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
    getData()
}
// 删除操作
const resetPassword = async (record: any) => {
    const { code, msg } = await apiWealth.wealthOptionsProductDelete({
        id: record.id
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiWealth.wealthOptionsProductList({
        ...useFilter(searchInfo.data),
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