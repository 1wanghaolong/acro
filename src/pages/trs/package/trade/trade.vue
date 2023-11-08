<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
        <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="name" :label="$t('trade.trade.5umyj46qbzs0')">
                <a-input v-model="searchInfo.data.name" :placeholder="$t('trade.trade.5ukfrkcg4180')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="status" :label="$t('trade.trade.5umyj46qcgo0')">
                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('trade.trade.5ukfrkcg4hg0')">
                  <a-option v-for="item in useEnums('otc.package.charge.status')" :value="item.value">{{
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
            {{ searchInfo.show ? $t('trade.trade.5ukfrkcg4uw0') : $t('trade.trade.5ukfrkcg4zs0') }}
          </a-button>
          <a-button @click="searchFormRef?.resetFields(), getData()">
            <template #icon>
              <icon-refresh />
            </template>
            {{$t('trade.trade.5um2bq7ffl40')}}
          </a-button>
          <a-button @click="getData" type="primary">
            <template #icon>
              <icon-search />
            </template>
            {{$t('trade.trade.5ukfrkcg5cg0')}}
          </a-button>
        </a-space>
        <a-space :size="18">
          <a-button v-permission="['trsPackageTradeCreate']" @click="router.push({ name: 'trsPackageTradeCreate' })"
            type="primary">
            <template #icon>
              <icon-plus />
            </template>
            {{$t('trade.trade.5umyj46qck00')}}
          </a-button>
        </a-space>
      </div>
      <div class="tableBox">
        <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
          :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small" :data="tableData.list"
          class="table">
          <template #columns>
            <a-table-column title="#" :width="50">
              <template #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('trade.trade.5umyj46qbzs0')" data-index="name"></a-table-column>
            <a-table-column :title="$t('trade.trade.5umyj46qcmc0')" data-index="desc"></a-table-column>
            <a-table-column :title="$t('trade.trade.5umyj46qcgo0')">
              <template #cell="{ record }">
                <span v-if="$permission(['trsChargePackageUpdateStatus'])">
                  <a-switch v-permission="['trsChargePackageUpdateStatus']" size="small"
                    @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                    :unchecked-value="0">
                  </a-switch>
                </span>
                <span v-else>
                  {{ useEnumsFormat('otc.package.charge.status', record.status) }}
                </span>
              </template>
            </a-table-column>
            <a-table-column v-if="$permission(['trsPackageTradeDetail'])" fixed="right" :title="$t('trade.trade.5umyj46qcos0')" :width="80">
              <template #cell="{ record }">
                <a-space>
                  <a-link v-permission="['trsPackageTradeDetail']" style="padding-left: 0;" type="text"
                    @click="router.push({ name: 'trsPackageTradeDetail', params: { id: record.id } })">
                    {{ $t('trade.trade.5umyj46qcr80') }}
                  </a-link>
                  <!-- <a-popconfirm position="left" @ok="deleteBtn(record)" content="您确认要删除吗? ">
                      <a-button type="text" status="danger" size="small">
                        {{ $t('trade.trade.5umyj46qcuk0') }}
                      </a-button>
                    </a-popconfirm> -->
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
      <div class="pagination">
        <a-pagination size="small" @change="getData" @page-size-change="getData" v-model:current="searchInfo.data.page"
          v-model:page-size="searchInfo.data.per_page" :total="tableData.count" show-total show-jumper show-page-size />
      </div>
    </a-card>
  </div>
</template>
  
<script lang="ts" setup>
// import { apiWealthCounterpartiesList, apiWealthCounterpartiesCreate,apiWealthCounterpartiesInfo,apiWealthCounterpartiesUpdate } from '@/api'
import { useEnums, useEnumsFormat } from '@/hooks/enums'
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
const getData = async () => {
  tableData.loading = true
  let param: any = { ...searchInfo.data }
  Object.keys(param).forEach((item: any) => {
    if (!param[item] && param[item] != '0') {
      delete param[item];
    }
  })
  const { code, data } = await apiTrs.accountChargePackageList({
    ...useFilter(param)
  })
  tableData.loading = false
  if (code != 1) return;
  tableData.list = data?.list || []
  tableData.count = data?.count
}
const handleChangeIntercept = async (val: any) => {
  const { code } = await apiTrs.accountChargePackageUpdate({
    data: {
      id: val.id,
      status: val.status
    }
  })
  if (code != 1) return;
  Message.success({
    content: t('trade.trade.5umyj46qcwo0'),
  })
  getData();
}
// // 删除
// const deleteBtn = async (val: any) => {
//   const res: any = await apiWealth.apiWealthInquiryCounterpartiesQuoteDelete({
//     id: val.id,
//   });
//   if (res.code != 1) return
//   getData()
// }

{
  getData()
}
</script>