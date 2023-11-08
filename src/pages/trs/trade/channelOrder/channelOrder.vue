<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
        <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="symbol" :label="$t('channelOrder.channelOrder.5umchd36t740')">
                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('channelOrder.channelOrder.5umchd36ua40')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="market" :label="$t('channelOrder.channelOrder.5umchd36ujo0')">
                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('channelOrder.channelOrder.5umchd36up80')">
                  <a-option v-for="item in useEnums('market.market')" :value="item.value">
                    {{ item.trans[local.lang] }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="direction" :label="$t('channelOrder.channelOrder.5umchd36uug0')">
                <a-select allow-clear v-model="searchInfo.data.direction" :placeholder="$t('channelOrder.channelOrder.5umchd36uzk0')">
                  <a-option v-for="item in useEnums('market.order.direction')" :value="item.value">
                    {{ item.trans[local.lang] }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="price_type" :label="$t('channelOrder.channelOrder.5umchd36v4c0')">
                <a-select allow-clear v-model="searchInfo.data.price_type" :placeholder="$t('channelOrder.channelOrder.5umchd36v8w0')">
                  <a-option v-for="item in useEnums('market.order.price_type')" :value="item.value">
                    {{ item.trans[local.lang] }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="status" :label="$t('channelOrder.channelOrder.5umchd36vdk0')">
                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('channelOrder.channelOrder.5umchd36vkc0')">
                  <a-option v-for="item in useEnums('market.order.status')" :value="item.value">{{ item.trans[local.lang]
                  }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="status" :label="$t('channelOrder.channelOrder.5umchd36vow0')">
                <a-select allow-clear v-model="searchInfo.data.counter_channel_account_id" :placeholder="$t('channelOrder.channelOrder.5umchd36vts0')">
                  <a-option v-for="item in (tableData.counterChannelAccount as any)" :value="item.id">{{ item.name
                  }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="counter_channel_scene" :label="$t('channelOrder.channelOrder.5umchd36vy00')">
                <a-select allow-clear v-model="searchInfo.data.counter_channel_scene" :placeholder="$t('channelOrder.channelOrder.5umchd36w2s0')">
                  <a-option v-for="item in useEnums(
                    'market.order.counter_channel_scene'
                  )" :value="item.value">
                    {{ item.trans[local.lang] }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="up_order_no" :label="$t('channelOrder.channelOrder.5umchd36w7c0')">
                <a-input v-model="searchInfo.data.up_order_no" :placeholder="$t('channelOrder.channelOrder.5umchd36ua40')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="trade_time" :label="$t('channelOrder.channelOrder.5umchd36wbw0')">
                <a-range-picker v-model="searchInfo.data.trade_time" format="YYYY-MM-DD" />
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
            {{ searchInfo.show ? $t('channelOrder.channelOrder.5umchd36wh40') : $t('channelOrder.channelOrder.5umchd36wlg0') }}
          </a-button>
          <a-button @click="searchFormRef?.resetFields(), getData()">
            <template #icon>
              <icon-refresh />
            </template>
            {{$t('channelOrder.channelOrder.5umchd36wq80')}}
          </a-button>
          <a-button @click="getData" type="primary">
            <template #icon>
              <icon-search />
            </template>
            {{$t('channelOrder.channelOrder.5umchd36ww80')}}
          </a-button>
        </a-space>
      </div>
      <div class="tableBox">
        <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading" :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined
          " size="small" :data="tableData.list" class="table" row-key="id">
          <template #columns>
            <a-table-column title="#" :width="50">
              <template #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36x380')" data-index="real_name" :width="120">
              <template #cell="{ record }">
                <div>{{ record?.security_info?.name }}</div>
                <div style="font-size: 12px; color: #b8c2cc">
                  {{ record?.market }} {{ record?.symbol }}
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36vow0')" :width="200">
              <template #cell="{ record }">
                <div>
                  {{$t('channelOrder.channelOrder.5umchzg8ocw0')}}：{{ record?.counter_channel_account_info?.account }}
                </div>
                <div>
                  {{$t('channelOrder.channelOrder.5umchzg8p9o0')}}：{{ record?.counter_channel_account_info?.name }}
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36x740')" :width="150">
              <template #cell="{ record }">
                <div>{{ record?.counter_channel_info?.name }}</div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36vy00')" :width="100">
              <template #cell="{ record }">
                <a-tag>{{
                  useEnumsFormat(
                    "market.order.counter_channel_scene",
                    record?.counter_channel_scene
                  )
                }}</a-tag>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36xbo0')" data-index="trade_currency" :width="90">
              <template #cell="{ record }">
                <a-tag>{{ record?.trade_currency }}</a-tag>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36uug0')" :width="90">
              <template #cell="{ record }">
                <a-tag>{{
                  useEnumsFormat("market.order.direction", record.direction)
                }}</a-tag>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36xfw0')" :width="local.lang == 'en'?230:150">
              <template #cell="{ record }">
                <div>{{$t('channelOrder.channelOrder.5umchzg8pck0')}}：{{ record?.trade_price }}</div>
                <div>{{$t('channelOrder.channelOrder.5umchzg8pf40')}}：{{ record?.trade_num }}</div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36xjo0')" :width="local.lang == 'en'?200:150">
              <template #cell="{ record }">
                <div>{{$t('channelOrder.channelOrder.5umchzg8pgw0')}}：{{ record?.deal_price }}</div>
                <div>{{$t('channelOrder.channelOrder.5umchzg8pjo0')}}：{{ record?.deal_num }}</div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36v4c0')" :width="local.lang =='en'?120:100">
              <template #cell="{ record }">
                <a-tag>{{
                  useEnumsFormat("market.order.price_type", record.price_type)
                }}</a-tag>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36vdk0')" :width="local.lang =='en'?150:100">
              <template #cell="{ record }">
                <a-tag>{{
                  useEnumsFormat("market.order.status", record.status)
                }}</a-tag>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36xn00')" :width="100">
              <template #cell="{ record }">
                <div>{{ record?.up_order_no }}</div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36wbw0')" :width="120">
              <template #cell="{ record }">
                <div>
                  {{ dayjs.unix(record.trade_time).format("YYYY-MM-DD") }}
                </div>
                <div>
                  {{ dayjs.unix(record.trade_time).format("HH:mm:ss") }}
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channelOrder.channelOrder.5umchd36xqo0')" :width="120">
              <template #cell="{ record }">
                <div v-if="!record.deal_time">-</div>
                <div>
                  <div>
                    {{ dayjs.unix(record.deal_time).format("YYYY-MM-DD") }}
                  </div>
                  <div>
                    {{ dayjs.unix(record.deal_time).format("HH:mm:ss") }}
                  </div>
                </div>
              </template>
            </a-table-column>
            <a-table-column fixed="right" :title="$t('channelOrder.channelOrder.5umchd36xuc0')" :width="80" v-if="$permission(['trsTradeChannelOrderDetail'])">
              <template #cell="{ record }">
                <a-space>
                  <a-link @click="
                    router.push({
                      name: 'trsTradeChannelOrderDetail',
                      params: { id: record.id },
                    })
                    ">{{$t('channelOrder.channelOrder.5umchd36xxw0')}}</a-link>
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
import { useEnums, useEnumsFormat } from "@/hooks/enums";
import dayjs from "dayjs";
const local = useLocal();
const router = useRouter();
const searchFormRef = ref();
const searchInfo = reactive({
  show: false,
  data: {
    symbol: "",
    market: "",
    direction: "",
    trade_type: "",
    price_type: "",
    status: "",
    trade_time: [],
    counter_channel_account_id: "",
    counter_channel_scene: "",
    up_order_no: "",
    page: 1,
    per_page: 20,
  },
});
const tableData = reactive({
  list: [],
  counterChannelAccount: [],
  count: 0,
  message: [],
  loading: false,
});
const getData = async () => {
  tableData.loading = true;
  const { code, data } = await apiTrs.orderItemList({
    ...useFilter(searchInfo.data),
    ...useFilter({
      status: searchInfo.data.status !== "" ? searchInfo.data.status : null,
    }),
  });
  tableData.loading = false;
  if (code != 1) return;
  tableData.list = data?.list || [];
  tableData.count = data?.count;
};
const getCounterChannelAccountAll = async () => {
  const { code, data } = await apiTrs.counterChannelAccountAll();
  if (code != 1) return;
  tableData.counterChannelAccount = data?.length ? data : [];
};
{
  getData();
  getCounterChannelAccountAll();
}
</script>
