<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
        <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="symbol" :label="$t('symbol.symbol.5ukehej7pco0')">
                <a-input
                  v-model="searchInfo.data.symbol"
                  :placeholder="$t('symbol.symbol.5ukehej7sro0')"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="name" :label="$t('symbol.symbol.5ukehej7tno0')">
                <a-input v-model="searchInfo.data.name" :placeholder="$t('symbol.symbol.5ukehej7sro0')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="cashEndTime" :label="$t('symbol.symbol.5ukehej7zoo0')">
                <a-range-picker
                  v-model="searchInfo.data.cashEndTime"
                  format="YYYY-MM-DD"
                  :placeholder="[$t('symbol.symbol.5ukehej80jc0'),$t('symbol.symbol.5ukehej80jc0')]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="listingTime" :label="$t('symbol.symbol.5ukehej810g0')">
                <a-range-picker
                  v-model="searchInfo.data.listingTime"
                  format="YYYY-MM-DD"
                  :placeholder="[$t('symbol.symbol.5ukehej87vg0'),$t('symbol.symbol.5ukehej87vg0')]"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="publishTime" :label="$t('symbol.symbol.5ukehej88ec0')">
                <a-range-picker
                  v-model="searchInfo.data.publishTime"
                  format="YYYY-MM-DD"
                  :placeholder="[$t('symbol.symbol.5ukehej88w80'),$t('symbol.symbol.5ukehej88w80')]"
                />
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
            {{ searchInfo.show ? $t('symbol.symbol.5ukehej8doc0') : $t('symbol.symbol.5ukehej8ebg0') }}
          </a-button>
          <a-button @click="searchFormRef?.resetFields(), getData()">
            <template #icon>
              <icon-refresh />
            </template>
            {{$t('symbol.symbol.5ukehej8eok0')}}
          </a-button>
          <a-button @click="getData" type="primary">
            <template #icon>
              <icon-search />
            </template>
            {{$t('symbol.symbol.5ukehej8f3s0')}}
          </a-button>
        </a-space>
      </div>
      <div class="tableBox">
        <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading" :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined
          " size="small" :data="tableData.list" class="table">
          <template #columns>
            <a-table-column title="ID" :width="50">
              <template #cell="{ record }">
                {{ record.id }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('symbol.symbol.5ukehej7pco0')" :width="90">
              <template #cell="{ record }">
                {{ record.symbol }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('symbol.symbol.5ukehej7tno0')" :width="300">
              <template #cell="{ record }">
                {{ record.name }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('symbol.symbol.5ukehej8fq40')" :width="90">
              <template #cell="{ record }">
                {{ useEnumsFormat("market.market", record.market) }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('symbol.symbol.5ukehej8fzk0')" :width="90">
              <template #cell="{ record }">
                <div>{{ record.min_amount }}</div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('symbol.symbol.5ukehej8gb40')" :width="120">
              <template #cell="{ record }">
                <div>
                  {{ record.publish_quantity / 10000
                  }}{{ record.publish_quantity ? $t('symbol.symbol.5ukehej8jyk0') : "" }}
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('symbol.symbol.5ukehej8kkg0')" :width="120">
              <template #cell="{ record }">
                <div>
                  {{
                    Number(record.max_finance_multiple)
                    ? record.max_finance_multiple
                    : "--"
                  }}
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('symbol.symbol.5ukehej8l180')" :width="120">
              <template #cell="{ record }">
                <div>
                  {{ Number(record.max_market_value) / 100000000
                  }}{{ Number(record.max_market_value) ? $t('symbol.symbol.5ukehej8ldo0') : "" }}
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('symbol.symbol.5ukehej8nh80')" :width="120">
              <template #cell="{ record }">
                <div>
                  {{ Number(record.min_market_value) / 100000000
                  }}{{ Number(record.min_market_value) ? $t('symbol.symbol.5ukehej8ldo0') : "" }}
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('symbol.symbol.5ukehej8o280')" :width="120">
              <template #cell="{ record }">
                <div v-if="!record.cash_begin_time">-</div>
                <div v-else>
                  <div>
                    {{
                      dayjs.unix(record.cash_begin_time).format("YYYY-MM-DD")
                    }}
                  </div>
                  <div>
                    {{ dayjs.unix(record.cash_begin_time).format("HH:mm:ss") }}
                  </div>
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('symbol.symbol.5ukehej7zoo0')" :width="120">
              <template #cell="{ record }">
                <div v-if="!record.cash_end_time">-</div>
                <div v-else>
                  <div>
                    {{ dayjs.unix(record.cash_end_time).format("YYYY-MM-DD") }}
                  </div>
                  <div>
                    {{ dayjs.unix(record.cash_end_time).format("HH:mm:ss") }}
                  </div>
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('symbol.symbol.5ukehej88ec0')" :width="120">
              <template #cell="{ record }">
                <div v-if="!record.publish_time">-</div>
                <div v-else>
                  <div>
                    {{ dayjs.unix(record.publish_time).format("YYYY-MM-DD") }}
                  </div>
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('symbol.symbol.5ukehej810g0')" :width="120">
              <template #cell="{ record }">
                <div v-if="!record.listing_time">-</div>
                <div v-else>
                  <div>
                    {{ dayjs.unix(record.listing_time).format("YYYY-MM-DD") }}
                  </div>
                </div>
              </template>
            </a-table-column>
            <a-table-column fixed="right" :title="$t('symbol.symbol.5ukehej8vgk0')" :width="local.lang=='en'?250:200" v-if="$permission(['marketIPOSymbolDetail','marketIPOSymbolEdit','marketIPOSymbolDelete'])">
              <template #cell="{ record }">
                <a-space>
                  <a-link v-permission="['marketIPOSymbolDetail']" @click="router.push({ name: 'marketIPOSymbolDetail', params: { id: record.id } })">{{$t('symbol.symbol.5ukehej8w1s0')}}</a-link>
                  <a-link v-permission="['marketIPOSymbolEdit']" @click="router.push({ name: 'marketIPOSymbolEdit', params: { id: record.id },query:{setup:1} })">{{$t('symbol.symbol.5ukehej8w6o0')}}</a-link>
                  <a-popconfirm
                    position="left"
                    @ok="del(record)"
                    :content="$t('problem.problem.5ukdvvdbjrg0') "
                  >
                    <a-link status="danger" v-permission="['marketIPOSymbolDelete']">{{$t('symbol.symbol.5ukehej8wb00')}}</a-link>
                  </a-popconfirm>
                  <a-link v-permission="['marketIPOSymbolLink']" @click="open(record)">{{$t('symbol.symbol.5ukehej8xn80')}}</a-link>
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
import { useEnumsFormat } from "@/hooks/enums";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import dayjs from "dayjs";
const local = useLocal();
const router = useRouter()
const searchFormRef = ref();
const searchInfo = reactive({
  show: false,
  loading: false,
  setup: false,
  data: {
    symbol: "",
    name: "",
    cashEndTime: [],
    listingTime: [],
    publishTime: [],
    page: 1,
    per_page: 20,
  },
});
const tableData = reactive({
  list: [],
  count: 0,
  message: [],
  loading: false,
});
const del = async (record: any) => {
  const { code } = await apiCms.cmsIpoDel({ 'IPOIds': [record.id] })
  if (code != 1) return;
  getData();
}
const getData = async () => {
  tableData.loading = true;
  const { code, data } = await apiCms.cmsIpoList({
    ...useFilter(searchInfo.data),
  });
  tableData.loading = false;
  if (code != 1) return;
  tableData.list = data?.list || [];
  tableData.count = data?.count;
};
const open = (item: any) => {
  if (!item.prospectus_link) {
    Message.info(t('symbol.symbol.5ukehej8xy40'))
    return
  }
  window.open(item.prospectus_link)
}
{
  getData();
}
</script>
