
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('cdkey.cdkey.5ukg418j9ys0')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('cdkey.cdkey.5ukg418jjm00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('cdkey.cdkey.5ukg418jjv40')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('cdkey.cdkey.5ukg418jk280')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="time" :label="$t('cdkey.cdkey.5ukg418jk9o0')">
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
                        {{ searchInfo.show ? $t('cdkey.cdkey.5ukg418jkf80') : $t('cdkey.cdkey.5ukg418jkjo0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('cdkey.cdkey.5ukg418jkoc0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('cdkey.cdkey.5ukg418jkr40')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['cmsOperateQuoteCdkeyCreate']"
                        @click="router.push({ name: 'cmsOperateQuoteCdkeyCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('cdkey.cdkey.5ukg418jktg0')}}
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

                        <a-table-column :title="$t('cdkey.cdkey.5ukg418j9ys0')" data-index="name" :width="260" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                            <a-table-column :title="$t('cdkey.cdkey.5ukg418jkwg0')" data-index="grant_num" :width="100" ></a-table-column>
                            <a-table-column :title="$t('cdkey.cdkey.5ukg418jl0k0')" data-index="activate_num" :width="local.lang=='en'?120:100" ></a-table-column>
                        <a-table-column :title="$t('cdkey.cdkey.5ukg418jl500')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.marketType', record.market_type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('cdkey.cdkey.5ukg418jl840')" data-index="day" :width="local.lang=='en'?160:120" ></a-table-column>
                        <a-table-column :title="$t('cdkey.cdkey.5ukg418jla80')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.quoteLevel', record.quote_level) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('cdkey.cdkey.5ukg418jlc40')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.level', record.level) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('cdkey.cdkey.5ukg418jjv40')" :width="100">
                            <template #cell="{ record }">
                                <span v-if="$permission(['cmsQuoteCdkeyActiveUpdate'])">
                                    <a-switch size="small" v-permission="['cmsQuoteCdkeyActiveUpdate']"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('cms.operate.quote.market.status', record.status) }}
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('cdkey.cdkey.5ukg418jlec0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column
                            v-if="$permission(['cmsOperateQuoteCdkeyDetail', 'cmsOperateQuoteCdkeyNo', 'cmsQuoteCdkeyActiveDelete'])"
                            fixed="right" :title="$t('cdkey.cdkey.5ukg418jlgk0')" :width="local.lang=='en'?240:170">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsOperateQuoteCdkeyNo'])"
                                    @click="router.push({ name: 'cmsOperateQuoteCdkeyNo', params: { id: record.id } })" >{{$t('cdkey.cdkey.5ukg418jlik0')}}</a-link>
                                    <a-link v-if="$permission(['cmsOperateQuoteCdkeyDetail'])"
                                        @click="router.push({ name: 'cmsOperateQuoteCdkeyDetail', params: { id: record.id } })">{{$t('cdkey.cdkey.5ukg418jlm40')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0') ">
                                        <a-link v-if="$permission(['cmsQuoteCdkeyActiveDelete'])" status="danger">{{$t('cdkey.cdkey.5ukg418jlpk0')}}</a-link>
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
        name: '',
        status: '',
        time: [],
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
    const { code, data } = await apiCms.cmsQuoteCdkeyActiveList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}

// 修改状态
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiCms.cmsQuoteCdkeyActiveUpdate({
        activeId: val.id,
        data: {
            status: val.status
        }
    })
    if (code != 1) {
        val.status = val.status == 0 ? 1 : 0
        return
    };
    Message.success({
        content: t('cdkey.cdkey.5ukg418jlrk0'),
    })
    getData();
}
// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiCms.cmsQuoteCdkeyActiveDelete({ 'activeIds': [val.id] })
    if (code != 1) return;
    getData();
}
{
    getData()
}
</script>
<style scoped>:deep(.arco-typography) {
    margin-bottom: 0;
}</style>