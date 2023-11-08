<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
        <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="symbol" :label="$t('brokenStock.brokenStock.5umcq2cwfnk0')">
                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('brokenStock.brokenStock.5umcq2cwgm00')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="market" :label="$t('brokenStock.brokenStock.5umcq2cwgpw0')">
                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('brokenStock.brokenStock.5umcq2cwgss0')">
                  <a-option v-for="item in useEnums('market.market')" :value="item.value">
                    {{ item.trans[local.lang] }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="direction" :label="$t('brokenStock.brokenStock.5umcq2cwgus0')">
                <a-select allow-clear v-model="searchInfo.data.direction" :placeholder="$t('brokenStock.brokenStock.5umcq2cwgxc0')">
                  <a-option v-for="item in useEnums('market.order.direction')" :value="item.value">
                    {{ item.trans[local.lang] }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="price_type" :label="$t('brokenStock.brokenStock.5umcq2cwgz80')">
                                <a-select allow-clear v-model="searchInfo.data.price_type" :placeholder="$t('brokenStock.brokenStock.5umcq2cwh1k0')">
                                    <a-option v-for="item in useEnums('market.order.price_type')" :value="item.value">
                                        {{ item.trans[local.lang] }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col> -->
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="status" :label="$t('brokenStock.brokenStock.5umcq2cwh3k0')">
                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('brokenStock.brokenStock.5umcq2cwh5k0')">
                  <a-option v-for="item in useEnums('market.order.status')" :value="item.value">{{ item.trans[local.lang]
                  }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="status" :label="$t('brokenStock.brokenStock.5umcq2cwh800')">
                <a-select allow-clear v-model="searchInfo.data.counter_channel_account_id" :placeholder="$t('brokenStock.brokenStock.5umcq2cwha00')">
                  <a-option v-for="item in (tableData.counterChannelAccount as any)" :value="item.id">{{ item.name
                  }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="counter_channel_scene" :label="$t('brokenStock.brokenStock.5umcq2cwhbw0')">
                <a-select allow-clear v-model="searchInfo.data.counter_channel_scene" :placeholder="$t('brokenStock.brokenStock.5umcq2cwhes0')">
                  <a-option v-for="item in useEnums(
                    'market.order.counter_channel_scene'
                  )" :value="item.value">
                    {{ item.trans[local.lang] }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="up_order_no" :label="$t('brokenStock.brokenStock.5umcq2cwhgw0')">
                <a-input v-model="searchInfo.data.up_order_no" :placeholder="$t('brokenStock.brokenStock.5umcq2cwgm00')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="trade_time" :label="$t('brokenStock.brokenStock.5umcq2cwhio0')">
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
            {{ searchInfo.show ? $t('brokenStock.brokenStock.5umcq2cwhkw0') : $t('brokenStock.brokenStock.5umcq2cwhmw0') }}
          </a-button>
          <a-button @click="searchFormRef?.resetFields(), getData()">
            <template #icon>
              <icon-refresh />
            </template>
            {{$t('brokenStock.brokenStock.5umcq2cwhoo0')}}
          </a-button>
          <a-button @click="getData" type="primary">
            <template #icon>
              <icon-search />
            </template>
            {{$t('brokenStock.brokenStock.5umcq2cwhqk0')}}
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
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwhto0')" data-index="real_name" :width="120">
              <template #cell="{ record }">
                <div>{{ record?.security_info?.name }}</div>
                <div style="font-size: 12px; color: #b8c2cc">
                  {{ record?.market }} {{ record?.symbol }}
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwh800')" :width="200">
              <template #cell="{ record }">
                <div>
                  {{$t('brokenStock.brokenStock.5umcrasbwic0')}}：{{ record?.counter_channel_account_info?.account }}
                </div>
                <div>
                  {{$t('brokenStock.brokenStock.5umcrasbx0w0')}}：{{ record?.counter_channel_account_info?.name }}
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwhvg0')" :width="150">
              <template #cell="{ record }">
                <div>{{ record?.counter_channel_info?.name }}</div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwhbw0')" :width="100">
              <template #cell="{ record }">
                <a-tag>{{
                  useEnumsFormat(
                    "market.order.counter_channel_scene",
                    record?.counter_channel_scene
                  )
                }}</a-tag>
              </template>
            </a-table-column>
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwhys0')" data-index="trade_currency" :width="90">
              <template #cell="{ record }">
                <a-tag>{{ record?.trade_currency }}</a-tag>
              </template>
            </a-table-column>
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwgus0')" :width="90">
              <template #cell="{ record }">
                <a-tag>{{
                  useEnumsFormat("market.order.direction", record.direction)
                }}</a-tag>
              </template>
            </a-table-column>
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwi0g0')" :width="local.lang == 'en'?230:150">
              <template #cell="{ record }">
                <div>{{$t('brokenStock.brokenStock.5umcrasbx3w0')}}：{{ record?.trade_price }}</div>
                <div>{{$t('brokenStock.brokenStock.5umcrasbx680')}}：{{ record?.trade_num }}</div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwi1w0')" :width="local.lang == 'en'?200:150">
              <template #cell="{ record }">
                <div>{{$t('brokenStock.brokenStock.5umcrasbx800')}}：{{ record?.deal_price }}</div>
                <div>{{$t('brokenStock.brokenStock.5umcrasbxac0')}}：{{ record?.deal_num }}</div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwgz80')" :width="local.lang =='en'?120:100">
              <template #cell="{ record }">
                <a-tag>{{
                  useEnumsFormat("market.order.price_type", record.price_type)
                }}</a-tag>
              </template>
            </a-table-column>
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwh3k0')" :width="local.lang =='en'?150:100">
              <template #cell="{ record }">
                <a-tag>{{
                  useEnumsFormat("market.order.status", record.status)
                }}</a-tag>
              </template>
            </a-table-column>
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwhgw0')" :width="120">
              <template #cell="{ record }">
                <div>{{ record?.up_order_no }}</div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwhio0')" :width="120">
              <template #cell="{ record }">
                <div>
                  {{ dayjs.unix(record.trade_time).format("YYYY-MM-DD") }}
                </div>
                <div>
                  {{ dayjs.unix(record.trade_time).format("HH:mm:ss") }}
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('brokenStock.brokenStock.5umcq2cwi380')" :width="120">
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
            <a-table-column fixed="right" :title="$t('brokenStock.brokenStock.5umcq2cwi4w0')" :width="local.lang == 'en'?150:100" v-if="$permission([
              'trsTradeChannelOrderDetail',
              'trsOrderItemNotify',
            ])
              ">
              <template #cell="{ record }">
                <a-space>
                  <a-link v-permission="['trsOrderItemNotify']" :disabled="record.status != '0'"
                    @click="transaction(record)">{{$t('brokenStock.brokenStock.5umcq2cwi6o0')}}</a-link>
                  <a-link v-permission="['trsTradeChannelOrderDetail']" @click="
                    router.push({
                      name: 'trsTradeChannelOrderDetail',
                      params: { id: record.id },
                    })
                    ">{{$t('brokenStock.brokenStock.5umcq2cwi8c0')}}</a-link>
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

    <!-- 碎股单交易 -->
    <a-modal width="700px" :mask-closable="false" v-model:visible="formVisible" :on-before-ok="handleForm"
      @close="onCloseForm">
      <template #title>
        {{ $t('brokenStock.brokenStock.5umcq2cwia40') }}
      </template>
      <div style="margin-bottom: 10px">
        <a-card :style="{ width: '100%' }">
          <div style="display: flex; align-items: center">
            <div style="flex: 1">
              <a-alert :show-icon="false">
                <!-- <template #title> 警告 </template> -->
                <div>
                  <a-form auto-label-width layout="vertical" :model="form">
                    <a-row :gutter="16">
                      <a-col :xs="24" :sm="12" :md="8" :xl="8">
                        <a-form-item :label="$t('brokenStock.brokenStock.5umcq2cwhto0')">
                          <div>
                            <div>{{ form?.security_info?.name }}</div>
                            <div style="font-size: 12px; color: #b8c2cc">
                              {{ form?.market }} {{ form?.symbol }}
                            </div>
                          </div>
                        </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="8">
                        <a-form-item :label="$t('brokenStock.brokenStock.5umcq2cwh800')">
                          <div>
                            <div>
                              {{$t('brokenStock.brokenStock.5umcrasbwic0')}}：{{
                                form?.counter_channel_account_info?.account
                              }}
                            </div>
                            <div>
                              {{$t('brokenStock.brokenStock.5umcrasbx0w0')}}：{{
                                form?.counter_channel_account_info?.name
                              }}
                            </div>
                          </div>
                        </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="8">
                        <a-form-item :label="$t('brokenStock.brokenStock.5umcq2cwi0g0')">
                          <div>
                            <div>{{$t('brokenStock.brokenStock.5umcrasbx3w0')}}：{{ form?.trade_price }}</div>
                            <div>{{$t('brokenStock.brokenStock.5umcrasbx680')}}：{{ form?.trade_num }}</div>
                          </div>
                        </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="8">
                        <a-form-item :label="`TRS${ $t('brokenStock.brokenStock.5umcq2cwibw0') }`">
                          <div>
                            <div>{{ form?.trs_account_info?.account }}</div>
                          </div>
                        </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="8">
                        <a-form-item :label="$t('brokenStock.brokenStock.5umcq2cwhys0')">
                          <div>
                            <div>{{ form?.trade_currency }}</div>
                          </div>
                        </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="8">
                        <a-form-item :label="$t('brokenStock.brokenStock.5umcq2cwidc0')">
                          <div>
                            <div>
                              {{
                                useEnumsFormat(
                                  "market.order.status",
                                  form.status
                                )
                              }}
                            </div>
                          </div>
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>
                </div>
              </a-alert>
            </div>
          </div>
        </a-card>
      </div>
      <div style="display: flex">
        <a-form ref="OrderInfoRef" :rules="(OrderInfoRules as any)" :model="OrderInfo" layout="vertical">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="24" :md="24" :xl="24">
              <a-form-item field="status" :label="$t('brokenStock.brokenStock.5umcq2cwigg0')">
                <a-select allow-clear v-model="OrderInfo.status" :placeholder="$t('brokenStock.brokenStock.5umcq2cwh5k0')" @change="selectChange">
                  <a-option v-for="item in useEnums('market.order.brokenStockStatus')" :value="item.value">{{
                    item.trans[local.lang] }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="24" :xl="24" v-if="OrderInfo.status == '6' || OrderInfo.status == '10'">
              <a-form-item field="deal_num" :label="$t('brokenStock.brokenStock.5umcq2cwii80')">
                <a-input :disabled="OrderInfo.status == '6'" v-model="OrderInfo.deal_num" style="flex: 1"
                  :placeholder="$t('brokenStock.brokenStock.5umcq2cwii80')" allow-clear @change="changeInput($event, 'deal_num')">
                </a-input>
              </a-form-item>
              <a-form-item field="deal_price" :label="$t('brokenStock.brokenStock.5umcq2cwijk0')">
                <a-input v-model="OrderInfo.deal_price" style="flex: 1" :placeholder="$t('brokenStock.brokenStock.5umcq2cwijk0')" allow-clear
                  @change="changeInput($event, 'deal_price')">
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { useEnums, useEnumsFormat } from "@/hooks/enums";
import dayjs from "dayjs";
const local = useLocal();
const router = useRouter();
const searchFormRef = ref();
const { t } = useI18n();
const formVisible = ref(false);
const OrderInfoRef = ref();
const searchInfo = reactive({
  show: false,
  data: {
    symbol: "",
    market: "",
    direction: "",
    trade_type: "",
    price_type: 7,
    status: "",
    trade_time: [],
    counter_channel_account_id: "",
    counter_channel_scene: "",
    up_order_no: "",
    page: 1,
    per_page: 20,
  },
});
const form: any = ref({});
const OrderInfoRules = ref({
  status: [{ required: true, message: t('brokenStock.brokenStock.5umcq2cwink0') }],
  deal_num: [{ required: true, message: t('brokenStock.brokenStock.5umcq2cwgm00') }],
  deal_price: [{ required: true, message: t('brokenStock.brokenStock.5umcq2cwgm00') }],
});
const OrderInfo: any = ref({
  id: "",
  up_order_no: "",
  status: "",
  deal_num: "",
  deal_price: "",
});
const tableData = reactive({
  list: [],
  counterChannelAccount: [],
  count: 0,
  message: [],
  loading: false,
});
const changeInput = (value: any, name: any) => {
  const chineseRegex = /[\u4e00-\u9fa5]/;
  const zmchineseRegex = /[a-zA-Z]/;
  const ze = /^\d+$/g;
  if (chineseRegex.test(value)) {
    Message.info({ content: t('brokenStock.brokenStock.5umcq2cwiow0') });
    OrderInfo.value[name] = "";
    return;
  }
  if (zmchineseRegex.test(value)) {
    Message.info({ content: t('brokenStock.brokenStock.5umcq2cwiqc0') });
    OrderInfo.value[name] = "";
    return;
  }
  if (Number(value) < 0) {
    Message.info({ content: t('brokenStock.brokenStock.5umcq2cwis00') });
    OrderInfo.value[name] = "";
    return;
  }
  if (name == "deal_num" && !ze.test(value)) {
    Message.info({ content: t('brokenStock.brokenStock.5umcq2cwitk0') });
    OrderInfo.value[name] = "";
    return;
  }
};
const transaction = (item: any) => {
  if (!item) {
    return;
  }
  formVisible.value = true;
  form.value = item;
  OrderInfo.value.id = item.id;
  OrderInfo.value.up_order_no = item.up_order_no;
};
const selectChange = (val: any) => {
  if (val == "6") {
    OrderInfo.value.deal_num = "" + form.value.trade_num;
  } else {
    OrderInfo.value.deal_num = "";
    OrderInfo.value.deal_price = "";
  }
};
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
const handleForm = async () => {
  const res = await OrderInfoRef.value?.validate();
  if (res) return false;
  let { id, up_order_no, status, deal_num, deal_price } = OrderInfo.value;
  if (status == "10") {
    if (Number(deal_num) >= Number(form.value.trade_num)) {
      Message.info({ content: t('brokenStock.brokenStock.5umcq2cwiws0') });
      return false;
    }
  }
  const { code } = await apiTrs.trsOrderItemNotify({
    id,
    up_order_no,
    status,
    deal_num: deal_num ? Number(deal_num) : undefined,
    deal_price: deal_price ? Number(deal_price) : undefined,
  });
  if (code != 1) return false;
  getData();
  return true;
};
const onCloseForm = () => {
  form.value = {};
  OrderInfo.value = ref({
    id: "",
    up_order_no: "",
    status: "",
    deal_num: "",
    deal_price: "",
  });
  OrderInfoRef.value.resetFields();
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
<style lang="less" scoped>
:deep(.arco-input-wrapper .arco-input[disabled]) {
  -webkit-text-fill-color: var(--color-text-1);
}
</style>
