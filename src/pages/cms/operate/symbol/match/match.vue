
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="period" :label="$t('match.match.5ukj0haz9fk0')">
                                <a-select allow-clear v-model="searchInfo.data.period" :placeholder="$t('match.match.5ukj0hazac00')">
                                    <a-option v-for="item in useEnums('cms.operate.symbol.match.period')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('match.match.5ukj0hazajc0')">
                                <a-select allow-clear v-model="searchInfo.data.type" :placeholder="$t('match.match.5ukj0hazac00')">
                                    <a-option v-for="item in useEnums('market.market_type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="time" :label="$t('match.match.5ukj0hazanw0')">
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
                        {{ searchInfo.show ? $t('match.match.5ukj0hazats0') : $t('match.match.5ukj0hazb0s0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('match.match.5ukj0hazb5k0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('match.match.5ukj0hazb9w0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['cmsOperateMatchCreate']"
                        @click="router.push({ name: 'cmsOperateMatchCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('match.match.5ukj0hazbe00')}}
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
                        <a-table-column :title="$t('match.match.5ukj0hazbig0')" data-index="title" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('match.match.5ukj0haz9fk0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.symbol.match.period', record.period) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.match.5ukj0hazajc0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('market.market_type', record.type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.match.5ukj0hazbm40')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.start_time ? dayjs.unix(record.start_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.start_time ? dayjs.unix(record.start_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.match.5ukj0hazbqo0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.end_time ? dayjs.unix(record.end_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.end_time ? dayjs.unix(record.end_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.match.5ukj0hazbv40')" :width="100">
                            <template #cell="{ record }">
                                <span v-if="$permission(['cmsOperateMatchUpdatePolling'])">
                                    <a-switch size="small" v-permission="['cmsOperateMatchUpdatePolling']"
                                        @change="handleChangeIntercept(record)" v-model="record.is_cycle" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('cms.operate.quote.market.status', record.is_cycle) }}
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.match.5ukj0hazbz40')" :width="100">
                            <template #cell="{ record }">
                                <span v-if="$permission(['cmsOperateMatchUpdateStatus'])">
                                    <a-switch size="small" v-permission="['cmsOperateMatchUpdateStatus']"
                                        @change="handleChangeInterceptStatus(record)" v-model="record.status"
                                        :checked-value="1" :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('cms.operate.quote.market.status', record.status) }}
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column
                            v-if="$permission(['cmsOperateMatchDetail', 'cmsOperateQuoteMatchAccount', 'cmsOperateQuoteMatchRanking', 'cmsOperateMatchUpdate', 'cmsMatchDelete'])"
                            fixed="right" :title="$t('match.match.5ukj0hazc340')" :width="local.lang=='en'?440:240">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsOperateQuoteMatchAccount'])"
                                        @click="toPath(record)">{{$t('match.match.5ukj0hazc780')}}</a-link>
                                    <a-link v-if="$permission(['cmsOperateQuoteMatchRanking'])"
                                        @click="router.push({ name: 'cmsOperateQuoteMatchRanking', params: { id: record.id } })">{{$t('match.match.5ukj0hazcbo0')}}</a-link>
                                    <a-link v-if="$permission(['cmsOperateMatchDetail'])"
                                        @click="router.push({ name: 'cmsOperateMatchDetail', params: { id: record.id } })">{{$t('match.match.5ukj0hazcfg0')}}</a-link>
                                    <a-link v-if="$permission(['cmsOperateMatchUpdate'])"
                                        @click="router.push({ name: 'cmsOperateMatchUpdate', params: { id: record.id } })">{{$t('match.match.5ukj0hazcj40')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0') ">
                                        <a-link v-if="$permission(['cmsMatchDelete'])" status="danger">{{$t('match.match.5ukj0hazcnk0')}}</a-link>
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
        period: '',
        type: '',
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
    const { code, data } = await apiCms.cmsMatchList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}

// 修改轮询状态
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiCms.cmsMatchUpdate({
        matchId: val.id,
        data: {
            is_cycle: val.is_cycle
        }
    })
    if (code != 1) {
        val.is_cycle = val.is_cycle == 0 ? 1 : 0
        return
    };
    Message.success({
        content: t('match.match.5ukj0hazcsk0'),
    })
    getData();
}
// 修改状态
const handleChangeInterceptStatus = async (val: any) => {
    const { code } = await apiCms.cmsMatchUpdate({
        matchId: val.id,
        data: {
            status: val.status
        }
    })
    if (code != 1) {
        val.status = val.status == 0 ? 1 : 0
        return
    };
    Message.success({
        content: t('match.match.5ukj0hazcsk0'),
    })
    getData();
}
// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiCms.cmsMatchDelete({ 'matchIds': [val.id] })
    if (code != 1) return;
    getData();
}
const toPath = (val: any) => {
    sessionStorage.setItem('title', val.title)
    router.push({ name: 'cmsOperateQuoteMatchAccount', params: { id: val.id } })
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