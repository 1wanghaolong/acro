<template>
  <a-tabs v-model:active-key="active" @change="changegetData" justify>
    <a-tab-pane key="1" :title="$t('settlement.trssettlement.5um8bqff9yk0')" :disabled="tableData.loading">
      <div
        class="searchBox"
        :style="{ height: !searchInfoDay.show ? 0 : '100px' }"
      >
        <a-form
          auto-label-width
          layout="vertical"
          :model="searchInfoDay.data"
          ref="searchFormRefDay"
        >
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="trs_account" :label="`TRS${ $t('settlement.trssettlement.5um8cadtbl80') }`">
                <a-input
                  v-model="searchInfoDay.data.trs_account"
                  :placeholder="$t('settlement.trssettlement.5um8bqffah40')"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="asset_account" :label="$t('settlement.trssettlement.5um8bqffalc0')">
                <a-input
                  v-model="searchInfoDay.data.asset_account"
                  :placeholder="$t('settlement.trssettlement.5um8bqffah40')"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="real_name" :label="$t('settlement.trssettlement.5um8bqffan80')">
                <a-input
                  v-model="searchInfoDay.data.real_name"
                  :placeholder="$t('settlement.trssettlement.5um8bqffah40')"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="currency" :label="$t('settlement.trssettlement.5um8bqffapo0')">
                <a-select
                  allow-clear
                  v-model="searchInfoDay.data.currency"
                  :placeholder="$t('settlement.trssettlement.5um8bqffars0')"
                >
                  <a-option
                    v-for="item in useEnums('currency')"
                    :value="item.value"
                    >{{ item.trans[local.lang] }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="time" :label="$t('settlement.trssettlement.5um8bqffav00')">
                <a-range-picker
                  v-model="searchInfoDay.data.time"
                  format="YYYY-MM-DD"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="buttonBox">
        <a-space :size="18">
          <a-button @click="searchInfoDay.show = !searchInfoDay.show">
            <template #icon>
              <icon-filter />
            </template>
            {{ searchInfoDay.show ? $t('settlement.trssettlement.5um8bqffax00') : $t('settlement.trssettlement.5um8bqffaz40') }}
          </a-button>
          <a-button @click="searchFormRefDay?.resetFields(), getData()">
            <template #icon>
              <icon-refresh />
            </template>
            {{$t('settlement.trssettlement.5um8bqffb0w0')}}
          </a-button>
          <a-button @click="getData" type="primary">
            <template #icon>
              <icon-search />
            </template>
            {{$t('settlement.trssettlement.5um8bqffb2s0')}}
          </a-button>
        </a-space>
      </div>
      <div class="tableBox">
        <a-table
          :bordered="false"
          column-resizable
          :pagination="false"
          :loading="tableData.loading"
          :scroll="
            tableData.list?.length ? { x: '100%', y: !searchInfoDay.show ?'500px' : '400px' } : undefined
          "
          size="small"
          :data="tableData.list"
          class="table"
        >
          <template #columns>
            <a-table-column title="#" :width="50">
              <template #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('settlement.trssettlement.5um8bqffav00')">
              <template #cell="{ record }">
                <div>
                  {{
                    record.end_time
                      ? dayjs.unix(record.end_time).format("YYYY-MM-DD")
                      : "--"
                  }}
                </div>
                <!-- <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div> -->
              </template>
            </a-table-column>
            <a-table-column
              :title="`TRS${ $t('settlement.trssettlement.5um8bqffb4w0') }`"
              data-index="trs_account_info.account"
              :ellipsis="true"
              :tooltip="true"
            >
              <template #cell="{ record }">
                {{ record.trs_account_info.account || "--" }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('settlement.trssettlement.5um8bqffan80')" data-index="net_profit">
              <template #cell="{ record }">
                <span
                  >CN:
                  <span>{{ record.asset_account_info.real_name }}</span></span
                >
                <br />
                <span
                  >EN:
                  <span>{{
                    record.asset_account_info.english_name
                  }}</span></span
                >
              </template>
            </a-table-column>
            <a-table-column
              :title="$t('settlement.trssettlement.5um8bqffalc0')"
              data-index="asset_account_info.account"
              :ellipsis="true"
              :tooltip="true"
            ></a-table-column>
            <a-table-column :title="$t('settlement.trssettlement.5um8bqffb6s0')" data-index="currency">
              <template #cell="{ record }">
                {{ record.trs_account_info.currency || "--" }}
              </template>
            </a-table-column>
            <a-table-column
              v-if="
                $permission([
                  'TRSSettlementOrderDayDetails',
                  'TRSSettlementOrderDayDownload',
                ])
              "
              fixed="right"
              :title="$t('settlement.trssettlement.5um8bqffb9c0')"
              :width="local.lang == 'en'?200:120"
            >
              <template #cell="{ record }">
                <a-space>
                  <a-link
                    v-permission="['TRSSettlementOrderDayDetails']"
                    @click="toPath(record)"
                    >{{$t('settlement.trssettlement.5um8bqffbbs0')}}</a-link
                  >
                  <!-- <a :href="record.file_path" target="_bank" >下载</a> -->
                  <a-link
                    v-permission="['TRSSettlementOrderDayDownload']"
                    @click="toPath(record, 1)"
                    >{{$t('settlement.trssettlement.5um8bqffbdk0')}}</a-link
                  >
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
      <div class="pagination">
        <a-pagination
          size="small"
          @change="getData"
          @page-size-change="getData"
          v-model:current="searchInfoDay.data.page"
          v-model:page-size="searchInfoDay.data.per_page"
          :total="tableData.count"
          show-total
          show-jumper
          show-page-size
        />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
const active = ref("1");
// import { apiWealthPositionList, apiWealthOptionsProductAll } from '@/api'
import { useEnums } from "@/hooks/enums";
import dayjs from "dayjs";
const local = useLocal();
// const router = useRouter()
const route = useRoute()
const searchFormRefDay = ref();
const searchInfoDay:any = reactive({
  show: false,
  data: {
    trs_account: "",
    asset_account: "",
    trs_account_id:"",
    real_name: "",
    currency: "",
    time: [],
    type: "1",
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
const getData = async () => {
  tableData.loading = true;
  let param: any = { ...searchInfoDay.data };
  Object.keys(param).forEach((item: any) => {
    if ((!param[item] && param[item] != "0") || item == "time") {
      delete param[item];
    }
  });
  const { code, data } = await apiTrs.trsAccountStatementList({
    ...useFilter(param),
    ...{
      "filter[start_time]": searchInfoDay.data?.time[0],
      "filter[end_time]": searchInfoDay.data?.time[1],
    },
  });
  tableData.loading = false;
  if (code != 1) return;
  tableData.list = data?.list || [];
  tableData.count = data?.count;
};

{
  route.params?.id ? searchInfoDay.data.trs_account_id = route.params.id : "";
  getData();
}
const changegetData = (val: any) => {
  active.value = val;
  getData();
};
const toPath = async (record: any, num?: any) => {
  if (!num) {
    const fileURL = record.file_path; // PDF文件的URL
    const link = document.createElement("a");
    link.href = fileURL;
    link.target = "_blank";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    const fileURL = record.file_path; // PDF文件的URL
    const regex = /\/([^/]+)\.pdf$/;
    const match = record.file_path.match(regex);
    const fileName = match[1] || "月结单"; //record.file_name // 下载的文件名
    const response = await fetch(fileURL);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
</script>
