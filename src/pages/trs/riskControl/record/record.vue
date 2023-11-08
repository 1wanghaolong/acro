<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="`TRS${ $t('record.record.5um9hmpyumo0') }`">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('record.record.5ukg0t2vj8w0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('record.record.5um3rgwh61o0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('record.record.5ukg0t2vj8w0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('record.record.5um9hmpyu3o0')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('record.record.5ukg0t2vj8w0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('record.record.5um3rgwh65k0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('record.record.5umwvvel61g0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">
                                        {{ item.trans[local.lang] }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <!-- <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="risk_control_status" :label="$t('record.record.5umwvvel6jw0')">
                                <a-select allow-clear v-model="searchInfo.data.risk_control_status" :placeholder="$t('record.record.5umwvvel6mo0')">
                                    <a-option v-for="item in useEnums('trs.risk_control.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col> -->
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trigger_time" :label="$t('record.record.5umwvvel6os0')">
                                <a-range-picker v-model="searchInfo.data.trigger_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('record.record.5ukg0t2vk6o0') : $t('record.record.5ukg0t2vk9c0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('record.record.5ukg0t2vkbw0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('record.record.5ukg0t2vkek0')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table" row-key="id">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="`TRS${ $t('record.record.5um9hmpyumo0') }`" data-index="trs_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('record.record.5um9hmpyu3o0')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5um3rgwh61o0')" data-index="asset_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('record.record.5um3rgwh65k0')" data-index="currency" :width="90">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency || $t('record.record.5ukg0t2vljw0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5umwvvel6s80')" :width="local.lang =='en'?130:110">
                            <template #cell="{ record }">
                                <a-tag>
                                    <!-- {{ useEnumsFormat('trs.risk_control.status', record.risk_control_status) }} -->
                                    {{$t('record.record.5umww81bafw0')}}{{ record.risk_control_info?.name }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5umwvvel6os0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.trigger_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.trigger_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5umwvvel6ug0')" :width="300">
                            <template #cell="{ record }">
                                <div>
                                    {{$t('record.record.5umwvvel6wg0')}}
                                    {{ (Number(record.total_power) - Number(record.total_asset)).toFixed(4) }},
                                    {{$t('record.record.5umww81bbcg0')}}{{ record.risk_control_info?.name }}，{{$t('record.record.5umww81bbg80')}}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('record.record.5umwvvel6yk0')" :width="local.lang =='en'?130:100">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'trsAccountDetail', params: { id: record.trs_account_id } })">{{$t('record.record.5umwvvel70g0')}}</a-link>
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
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const searchFormRef = ref()
const searchInfo:any = reactive({
    show: false,
    data: {
        trs_account: '',
        asset_account: '',
        real_name: '',
        currency: '',
        // risk_control_status: '',
        trigger_time: [],
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    counterChannelAccount: [],
    count: 0,
    message: [],
    loading: false
})
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiTrs.riskControlRecordList({
        ...useFilter(searchInfo.data),
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
onMounted(() => {
    // 直接在searchInfo.data内赋值会导致无法重置
    searchInfo.data.trs_account = String(route.query?.trs_account || '')
    if (route.query?.time) {
        searchInfo.data.trigger_time = [dayjs().format('YYYY-MM-DD'),dayjs().format('YYYY-MM-DD')]
    }
    getData()
})
</script>