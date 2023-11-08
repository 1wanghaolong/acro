<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="`TRS${ $t('status.status.5umwskv5beg0') }`">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('status.status.5um8j75ruc00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('status.status.5um8j75rufw0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('status.status.5um8j75ruc00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('status.status.5umwskv5cu80')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('status.status.5um8j75ruc00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('status.status.5um8j75rujc0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('status.status.5umwskv5cyk0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">
                                        {{ item.trans[local.lang] }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="risk_control_status" :label="$t('status.status.5umwskv5d1g0')">
                                <a-select allow-clear v-model="searchInfo.data.risk_control_status" :placeholder="$t('status.status.5umwskv5d400')">
                                    <a-option v-for="item in useEnums('trs.account.risk_control_status')"
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
                        {{ searchInfo.show ? $t('status.status.5um8j75ruq80') : $t('status.status.5um8j75ruso0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('status.status.5um8j75ruuo0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('status.status.5um8j75ruwo0')}}
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
                        <a-table-column :title="`TRS${ $t('status.status.5umwskv5beg0') }`" data-index="account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('status.status.5umwskv5cu80')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('status.status.5um8j75rufw0')" data-index="asset_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('status.status.5um8j75rujc0')" data-index="currency" :width="90">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency || $t('status.status.5umwskv5d6k0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('status.status.5umwskv5d9c0')" :width="local.lang == 'en'?200:150">
                            <template #cell="{ record }">
                                <div>{{$t('status.status.5umwthx82ms0')}}：{{ (Number(record.total_power) - Number(record.loss_amount)).toFixed(4) }}</div>
                                <div>{{$t('status.status.5umwthx835c0')}}：{{ Number(record.total_finance) }}</div>
                            </template>
                        </a-table-column>
                        <!-- <a-table-column title="风控线" :width="120">
                            <template #cell="{ record }">
                                <div>预警线：{{ Number(record.warn_value || 0) }}%</div>
                                <div>平仓线：{{ Number(record.close_value || 0) }}%</div>
                            </template>
                        </a-table-column> -->
                        <a-table-column :title="$t('status.status.5umwskv5dbo0')" :width="150">
                            <template #cell="{ record }">
                                <div>
                                    {{$t('status.status.5umwthx838w0')}}：{{ record.loss_amount }}
                                </div>
                                <div>
                                    {{$t('status.status.5umwthx83as0')}}：{{ Number(record?.total_cash) + Number(record?.total_assure_cash) }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('status.status.5umwskv5d1g0')" :width="local.lang =='en'?160:110">
                            <template #cell="{ record }">
                                <div v-if="useEnumsFormat('trs.account.risk_control_status', record.risk_control_status)">
                                    <a-tag size="small" :color="record.risk_control_status == 1 ? '#00b42a' : '#f53f3f'">
                                        {{ useEnumsFormat('trs.account.risk_control_status', record.risk_control_status) }}
                                    </a-tag>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('status.status.5umwskv5dew0')" :width="120">
                            <template #cell="{ record }">
                                <template v-if="record.risk_control_list?.length > 0">
                                    <a-popover :trigger="['hover']" position="bottom" :content-style="{ padding: '5px 10px' }">
                                        <div class="progressBox">
                                            <template v-for="item in record.risk_control_list">
                                                <div class="risk" :style="{ left: `${Number(item.loss_value || 0)}%` }">
                                                </div>
                                            </template>
                                            <div class="progress" :style="{
                                                width: `${(record.loss_amount_rate * 100).toFixed(2)}%`,
                                                backgroundColor: record.risk_control_status == 2 ? '#f53f3f' : '#00b42a'
                                            }"></div>
                                        </div>
                                        <div style="text-align: center;font-size: 12px;line-height: 12px;">
                                            {{ (record.loss_amount_rate * 100).toFixed(2) }}%
                                        </div>
                                        <template #content>
                                            <p v-if="record.risk_control_status == 2">{{$t('status.status.5umwskv5dhs0')}}</p>
                                            <p v-else>{{$t('status.status.5umwskv5dk80')}}</p>
                                            <div v-if="getNowLine(record).item">
                                                <a-divider />
                                                <div>
                                                    <p>{{ getNowLine(record).item?.name }}</p>
                                                    <p>{{$t('status.status.5umwthx83ck0')}}{{ (Number(getNowLine(record).item?.loss_value) ||
                                                        0).toFixed(2) }}%</p>
                                                    <p>{{$t('status.status.5umwthx83ek0')}}：{{ getNowLine(record).item?.trade_status == 1 ? '-' :
                                                        getNowLine(record).item?.trade_status == 2 ? $t('status.status.5umwskv5dn80') : $t('status.status.5umwskv5dro0') }}</p>
                                                    <p>{{$t('status.status.5umwthx83gk0')}}：{{ getNowLine(record).item?.is_cancel_order ? $t('status.status.5umwthx83ig0') : '-' }}
                                                    </p>
                                                    <p>{{$t('status.status.5umwthx83kc0')}}：{{ getNowLine(record).item?.is_close_position ? $t('status.status.5umwthx83ms0') : '-'
                                                    }}</p>
                                                </div>
                                            </div>
                                            <div v-if="getNextLine(record).item">
                                                <a-divider />
                                                <div>
                                                    <p>{{$t('status.status.5umwskv5dxw0')}}</p>
                                                    <p>·{{$t('status.status.5umwthx83ck0')}}{{ ((Number(getNextLine(record).item?.loss_value) || 0) -
                                                        Number(record.loss_amount_rate * 100)).toFixed(2) }}%</p>
                                                    <p>·{{$t('status.status.5umwthx83ow0')}}{{ ((Number(getNextLine(record).item?.loss_value / 100 ||
                                                        0) * Number(Number(record?.total_cash
                                                        ) + Number(record?.total_assure_cash))) -
                                                        Number(record.loss_amount)).toFixed(2) }}{{ record.currency }}</p>
                                                </div>
                                            </div>
                                            <div v-if="getNowLine(record).item && !getNextLine(record).item">
                                                <a-divider />
                                                <p>{{$t('status.status.5umwskv5e0s0')}}</p>
                                            </div>
                                        </template>
                                    </a-popover>
                                </template>
                                <div v-else>-</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('status.status.5um8j75rv5k0')" :width="local.lang == 'en'?280:180"
                            v-if="$permission(['trsAccountDetail', 'trsRiskControlRecord'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['trsAccountDetail']"
                                        @click="router.push({ name: 'trsAccountDetail', params: { id: record.id } })">{{$t('status.status.5umwskv5e340')}}</a-link>
                                    <a-link v-permission="['trsRiskControlRecord']"
                                        @click="router.push({ name: 'trsRiskControlRecord', query: { trs_account: record.account } })">{{$t('status.status.5umwskv5e5c0')}}</a-link>
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
const local = useLocal()
const router = useRouter()
const route = useRoute()
const searchFormRef = ref()
const searchInfo:any = reactive({
    show: false,
    data: {
        trs_account: '',
        asset_account: '',
        real_name: '',
        currency: '',
        risk_control_status: '',
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
const getNowLine = (record: any) => {
    let item, index = null
    if (!record?.risk_control_list?.length) return {
        item,
        index
    }

    for (let i = 0; i < record?.risk_control_list?.length; i++) {
        if (Number(record?.risk_control_list[i].loss_value) < (record?.loss_amount_rate * 100)) {
            item = record.risk_control_list[i]
            index = i
        }
    }
    return {
        item,
        index
    }
}
const getNextLine = (record: any) => {
    let item, index = null
    if (!record?.risk_control_list?.length) return {
        item,
        index
    }
    for (let i = 0; i < record?.risk_control_list?.length; i++) {
        if (Number(record?.risk_control_list[i].loss_value) > (record?.loss_amount_rate * 100)) {
            item = record.risk_control_list[i]
            index = i
            break
        }
    }
    return {
        item,
        index
    }
}
const getData = async () => {
    tableData.loading = true
    const formData = cloneDeep(searchInfo.data)
    !formData.risk_control_status && delete formData.risk_control_status
    const { code, data } = await apiTrs.accountList({
        ...useFilter(formData),
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
{
    if (route.query?.risk_control_status) {
        searchInfo.data.risk_control_status = Number(route.query.risk_control_status)
    }
    getData()
}
</script>
<style lang="less" scoped>
.progressBox {
    background-color: var(--color-fill-3);
    border-radius: 50px;
    width: 100%;
    height: 8px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    z-index: 1;

    .risk {
        position: absolute;
        left: 0;
        height: 100%;
        width: 1px;
        background-color: var(--color-bg-1);
        z-index: 2;
    }

    .progress {
        position: absolute;
        left: 0;
        height: 100%;
        z-index: 3;
    }
}

.arco-divider-horizontal {
    margin: 5px 0;
}</style>