<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('investmentScope.investmentScope.5umz58n4lmg0')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('investmentScope.investmentScope.5umz58n4m1s0')" />
                            </a-form-item>
                        </a-col>
                        <!-- <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('investmentScope.investmentScope.5umz58n4m540')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('investmentScope.investmentScope.5umz58n4m7c0')">
                                    <a-option v-for="item in useEnums('otc.package.charge.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col> -->
                    </a-row>
                </a-form>
            </div>
            <div class="buttonBox">
                <a-space :size="18">
                    <a-button @click="searchInfo.show = !searchInfo.show">
                        <template #icon>
                            <icon-filter />
                        </template>
                        {{ searchInfo.show ? $t('investmentScope.investmentScope.5umz58n4mfg0') : $t('investmentScope.investmentScope.5umz58n4mhg0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('investmentScope.investmentScope.5umz58n4mk80')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('investmentScope.investmentScope.5umz58n4mm80')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['configTemplateInvestmentScopeCreate']" type="primary"
                        @click="router.push({ name: 'configTemplateInvestmentScopeCreate' })">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('investmentScope.investmentScope.5umz58n4mqo0')}}
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
                        <a-table-column :title="$t('investmentScope.investmentScope.5umz58n4lmg0')" data-index="name"></a-table-column>
                        <a-table-column :title="$t('investmentScope.investmentScope.5umz58n4mvo0')" data-index="market_type">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('market.market_type', record.market_type) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('investmentScope.investmentScope.5umz58n4mxs0')" data-index="multiple">
                            <template #cell="{ record }">
                                {{ record.finance_multiple_info?.multiple }}{{ record.finance_multiple_info?.multiple ? $t('investmentScope.investmentScope.5umz58n4n080')
                                    : ''
                                }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('investmentScope.investmentScope.5umz58n4n200')" data-index="desc"></a-table-column>
                        <a-table-column :title="$t('investmentScope.investmentScope.5umz58n4m540')">
                            <template #cell="{ record }">
                                <span v-if="$permission(['configTemplateInvestmentScopeUpdateStatus'])">
                                    <a-switch size="small" v-permission="['configTemplateInvestmentScopeUpdateStatus']"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('otc.package.charge.status', record.status) }}
                                </span>
                            </template>

                        </a-table-column>
                        <a-table-column v-if="$permission(['configTemplateInvestmentScopeDetail'])" fixed="right" :title="$t('investmentScope.investmentScope.5umz58n4n440')"
                            :width="80">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-button v-permission="['configTemplateInvestmentScopeDetail']"
                                        @click="router.push({ name: 'configTemplateInvestmentScopeDetail', params: { id: record.id } })"
                                        style="padding-left: 0;" type="text" size="small">
                                        {{ $t('investmentScope.investmentScope.5umz58n4n6k0') }}
                                    </a-button>
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
// import dayjs from 'dayjs'
// const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const { t } = useI18n();
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
const getData = async () => {
    tableData.loading = true
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    const { code, data } = await apiTrs.investmentScopeTemplateList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiTrs.investmentScopeTemplateUpdate({
        data: {
            id: val.id,
            status: val.status
        }
    })
    if (code != 1) {
        val.status = val.status == 0 ? 1 : 0
        return
    };
    Message.success({
        content: t('investmentScope.investmentScope.5umz58n4n8g0'),
    })
    getData();
}

{
    getData()
}

</script>