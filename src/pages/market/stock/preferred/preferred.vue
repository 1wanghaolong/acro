
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('preferred.preferred.5uke6cvjaqo0')">
                                <a-select allow-clear v-model="searchInfo.data.type" :placeholder="$t('preferred.preferred.5uke6cvji3k0')">
                                    <a-option v-for="item in useEnums('market.market_type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="code" :label="$t('preferred.preferred.5uke6cvjir40')">
                                <a-input v-model="searchInfo.data.code" :placeholder="$t('preferred.preferred.5uke6cvjj7s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="title" :label="$t('preferred.preferred.5uke6cvjjls0')">
                                <a-input v-model="searchInfo.data.title" :placeholder="$t('preferred.preferred.5uke6cvjj7s0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('preferred.preferred.5uke6cvjjyo0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('preferred.preferred.5uke6cvji3k0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.status')"
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
                        {{ searchInfo.show ? $t('preferred.preferred.5uke6cvjk9g0') : $t('preferred.preferred.5uke6cvjkik0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('preferred.preferred.5uke6cvjkw40')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('preferred.preferred.5uke6cvjl780')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['marketStockPreferredCreate']"
                        @click="router.push({ name: 'marketStockPreferredCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('preferred.preferred.5uke6cvjlew0')}}
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
                        <a-table-column :title="$t('preferred.preferred.5uke6cvjaqo0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('market.market_type', record.type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('preferred.preferred.5uke6cvjir40')" data-index="code" :width="100" ></a-table-column>
                        <a-table-column :title="$t('preferred.preferred.5uke6cvjll40')" data-index="name" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('preferred.preferred.5uke6cvjls80')" data-index="content">
                            <template #cell="{ record }">
                                <ContentEllipsis :content="record.content" > </ContentEllipsis>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('preferred.preferred.5uke6cvjne40')" :width="100">
                            <template #cell="{ record }">
                                <a-image width="40" height="40" :src="record.background" v-if="record.background">
                                    <template #loader>
                                        <img width="40" :src="record.background" style="filter: blur(5px)" />
                                    </template>
                                </a-image>
                                <div v-else>{{ '' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('preferred.preferred.5uke6cvjjyo0')" :width="100">
                            <template #cell="{ record }">
                                <span v-if="$permission(['marketStockPreferredUpdateStatus'])">
                                    <a-switch size="small" v-permission="['marketStockPreferredUpdateStatus']"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('cms.operate.quote.market.status', record.status) }}
                                </span>
                            </template>
                        </a-table-column>

                        <a-table-column
                            v-if="$permission(['marketStockPreferredDetail', 'marketStockPreferredUpdate', 'symbolPreferredPlateDelete'])"
                            fixed="right" :title="$t('preferred.preferred.5uke6cvjnp00')" :width="local.lang=='en'?170:150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['marketStockPreferredDetail'])"
                                        @click="router.push({ name: 'marketStockPreferredDetail', params: { id: record.id } })">{{$t('preferred.preferred.5uke6cvjo2g0')}}</a-link>
                                    <a-link v-if="$permission(['marketStockPreferredUpdate'])"
                                        @click="router.push({ name: 'marketStockPreferredUpdate', params: { id: record.id } })">{{$t('preferred.preferred.5uke6cvjoc40')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0') ">
                                        <a-link v-if="$permission(['symbolPreferredPlateDelete'])"
                                            status="danger">{{$t('preferred.preferred.5uke6cvjoqc0')}}</a-link>
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
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        title: '',
        code: '',
        type: '',
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
    const { code, data } = await apiMarket.symbolPreferredPlateList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}

// 修改状态
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiMarket.symbolPreferredPlateUpdate({
        plateId: val.id,
        data: {
            status: val.status
        }
    })
    if (code != 1) {
        val.status = val.status == 0 ? 1 : 0
        return
    };
    Message.success({
        content: t('preferred.preferred.5uke6cvjp780'),
    })
    getData();
}
// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiMarket.symbolPreferredPlateDelete({ 'plateIds': [val.id] })
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