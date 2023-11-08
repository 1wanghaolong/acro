<template>
  <a-tabs v-model:active-key="active" @change="changegetData" justify>
    <a-tab-pane key="1" :title="$t('settlement.wealthsettlement.5um3sw4u6cs0')" :disabled="tableData.loading">
      <div class="searchBox" :style="{ height: !searchInfoDay.show ? 0 : '100px' }">
        <a-form auto-label-width layout="vertical" :model="searchInfoDay.data" ref="searchFormRefDay">
          <a-row :gutter="16">>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="asset_account" :label="$t('settlement.wealthsettlement.5um3sw4u6s80')">
                <a-input v-model="searchInfoDay.data.asset_account" :placeholder="$t('settlement.wealthsettlement.5um3sw4u6uw0')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="statement_month" :label="$t('settlement.wealthsettlement.5um3sw4u6x40')">
                <!-- <a-range-picker v-model="searchInfo.data.statement_month" format="YYYY-MM-DD" /> -->
                <a-month-picker v-model="searchInfoDay.data.statement_month" style="width: 100%;" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="real_name" :label="$t('settlement.wealthsettlement.5um3sw4u6z00')">
                <a-input v-model="searchInfoDay.data.real_name" :placeholder="$t('settlement.wealthsettlement.5um3sw4u7200')" />
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
            {{ searchInfoDay.show ? $t('settlement.wealthsettlement.5um3sw4u7440') : $t('settlement.wealthsettlement.5um3sw4u76k0') }}
          </a-button>
          <a-button @click="searchFormRefDay?.resetFields(), getData()">
            <template #icon>
              <icon-refresh />
            </template>
            {{$t('settlement.wealthsettlement.5um3sw4u79s0')}}
          </a-button>
          <a-button @click="getData" type="primary">
            <template #icon>
              <icon-search />
            </template>
            {{$t('settlement.wealthsettlement.5um3sw4u7cw0')}}
          </a-button>
        </a-space>
      </div>
      <div class="tableBox">
        <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
          :scroll="tableData.list?.length ? { x: '100%', y: !searchInfoDay.show ? '100%':'420px' } : undefined" size="small" :data="tableData.list"
          class="table">
          <template #columns>
            <a-table-column title="#" :width="50">
              <template #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('settlement.wealthsettlement.5um3sw4u6s80')" data-index="asset_account_info.account"></a-table-column>
            <a-table-column :title="$t('settlement.wealthsettlement.5um3sw4u7fw0')">
              <template #cell="{ record }">
                <div>{{ record.start_time ? dayjs.unix(record.start_time).format('YYYY-MM-DD') : '--' }}/{{
                  record.end_time ? dayjs.unix(record.end_time).format('YYYY-MM-DD') : '--' }}</div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('settlement.wealthsettlement.5um3sw4u6z00')" data-index="net_profit">
              <template #cell="{ record }">
                <span><a-tag style="margin-bottom:5px;margin-right:5px" color="red">CN</a-tag>
                  <span>{{ record.asset_account_info.real_name }}</span></span>
                <br>
                <span><a-tag style="margin-right:5px" color="arcoblue">EN</a-tag>
                  <span>{{ record.asset_account_info.english_name }}</span></span>
              </template>
            </a-table-column>

            <a-table-column :title="$t('settlement.wealthsettlement.5um3sw4u7io0')">
              <template #cell="{ record }">
                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}</div>
                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}</div>
              </template>
            </a-table-column>
            <a-table-column v-if="$permission(['wealthSettlementOrderDetails', 'wealthSettlementOrderDownload'])"
              fixed="right" :title="$t('settlement.wealthsettlement.5um3sw4u7lk0')" :width="local.lang =='en'?200:150">
              <template #cell="{ record }">
                <a-space>
                  <a-link v-permission="['wealthSettlementOrderDetails']" @click="toPath(record)">{{$t('settlement.wealthsettlement.5um3sw4u7os0')}}</a-link>
                  <a-link v-permission="['wealthSettlementOrderDownload']" @click="toPath(record, 1)">{{$t('settlement.wealthsettlement.5um3sw4u7r80')}}</a-link>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
      <div class="pagination">
        <a-pagination size="small" @change="getData" @page-size-change="getData" v-model:current="searchInfoDay.data.page"
          v-model:page-size="searchInfoDay.data.per_page" :total="tableData.count" show-total show-jumper
          show-page-size />
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" :title="$t('settlement.wealthsettlement.5um3sw4u7tc0')" :disabled="tableData.loading">
      <div class="searchBox" :style="{ height: !searchInfoMound.show ? 0 : '100px' }">
        <a-form auto-label-width layout="vertical" :model="searchInfoMound.data" ref="searchFormRefMound">
          <a-row :gutter="16">>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="asset_account" :label="$t('settlement.wealthsettlement.5um3sw4u6s80')">
                <a-input v-model="searchInfoMound.data.asset_account" :placeholder="$t('settlement.wealthsettlement.5um3sw4u6uw0')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="statement_month" :label="$t('settlement.wealthsettlement.5um3sw4u7v80')">
                <!-- <a-range-picker v-model="searchInfo.data.statement_month" format="YYYY-MM-DD" /> -->
                <a-date-picker v-model="searchInfoMound.data.statement_month" style="width: 100%;" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="real_name" :label="$t('settlement.wealthsettlement.5um3sw4u6z00')">
                <a-input v-model="searchInfoMound.data.real_name" :placeholder="$t('settlement.wealthsettlement.5um3sw4u7200')" />
              </a-form-item>
            </a-col>

          </a-row>
        </a-form>
      </div>
      <div class="buttonBox">
        <a-space :size="18">
          <a-button @click="searchInfoMound.show = !searchInfoMound.show">
            <template #icon>
              <icon-filter />
            </template>
            {{ searchInfoMound.show ? $t('settlement.wealthsettlement.5um3sw4u7440') : $t('settlement.wealthsettlement.5um3sw4u76k0') }}
          </a-button>
          <a-button @click="searchFormRefMound?.resetFields(), getData()">
            <template #icon>
              <icon-refresh />
            </template>
            {{$t('settlement.wealthsettlement.5um3sw4u79s0')}}
          </a-button>
          <a-button @click="getData" type="primary">
            <template #icon>
              <icon-search />
            </template>
            {{$t('settlement.wealthsettlement.5um3sw4u7cw0')}}
          </a-button>
        </a-space>
        <!-- <a-space :size="18">
                    <a-button type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('settlement.wealthsettlement.5um3sw4u7xg0')}}
                    </a-button>
                    
                </a-space> -->
      </div>
      <div class="tableBox">
        <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
          :scroll="tableData.list?.length ? { x: '100%', y: !searchInfoMound.show ? '500px':'420px' } : undefined" size="small" :data="tableData.list"
          class="table">
          <template #columns>
            <a-table-column title="#" :width="50">
              <template #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('settlement.wealthsettlement.5um3sw4u6s80')" data-index="asset_account_info.account"></a-table-column>
            <a-table-column :title="$t('settlement.wealthsettlement.5um3sw4u7fw0')">
              <template #cell="{ record }">
                <div>{{ record.start_time ? dayjs.unix(record.start_time).format('YYYY-MM-DD') : '--' }}/{{
                  record.end_time ? dayjs.unix(record.end_time).format('YYYY-MM-DD') : '--' }}</div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('settlement.wealthsettlement.5um3sw4u6z00')" data-index="net_profit">
              <template #cell="{ record }">
                <span><a-tag style="margin-bottom:5px;margin-right:5px" color="red">CN</a-tag>
                  <span>{{ record.asset_account_info.real_name }}</span></span>
                <br>
                <span><a-tag style="margin-right:5px" color="arcoblue">EN</a-tag>
                  <span>{{ record.asset_account_info.english_name }}</span></span>
              </template>
            </a-table-column>

            <a-table-column :title="$t('settlement.wealthsettlement.5um3sw4u7io0')">
              <template #cell="{ record }">
                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}</div>
                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}</div>
              </template>
            </a-table-column>
            <a-table-column v-if="$permission(['wealthSettlementOrderDayDetails', 'wealthSettlementOrderDayDownload'])"
              fixed="right" :title="$t('settlement.wealthsettlement.5um3sw4u7lk0')" :width="150">
              <template #cell="{ record }">
                <a-space>
                  <a-link v-permission="['wealthSettlementOrderDayDetails']" @click="toPath(record)">{{$t('settlement.wealthsettlement.5um3sw4u7os0')}}</a-link>
                  <!-- <a :href="record.file_path" target="_bank" >下载</a> -->
                  <a-link v-permission="['wealthSettlementOrderDayDownload']" @click="toPath(record, 1)">{{$t('settlement.wealthsettlement.5um3sw4u7r80')}}</a-link>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
      <div class="pagination">
        <a-pagination size="small" @change="getData" @page-size-change="getData"
          v-model:current="searchInfoMound.data.page" v-model:page-size="searchInfoMound.data.per_page"
          :total="tableData.count" show-total show-jumper show-page-size />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
const active = ref("1")
// import { apiWealthPositionList, apiWealthOptionsProductAll } from '@/api'
// import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
// const router = useRouter()
const searchFormRefDay = ref()
const searchFormRefMound = ref()
const searchInfoDay:any = reactive({
  show: false,
  data: {
    asset_account: '',
    statement_month: '',
    real_name: '',
    type: 1,
    page: 1,
    per_page: 20
  }
})
const searchInfoMound:any = reactive({
  show: false,
  data: {
    asset_account: '',
    statement_month: '',
    real_name: '',
    type: 2,
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
  let param: any
  if (active.value == '1') {
    param = { ...searchInfoDay.data }
  }
  if (active.value == '2') {
    param = { ...searchInfoMound.data }
  }
  Object.keys(param).forEach((item: any) => {
    if (!param[item] && param[item] != '0') {
      delete param[item];
    }
  })
  const { code, data } = await apiWealth.apiWealthAccountStatementList({
    ...useFilter(param)
  })
  tableData.loading = false
  if (code != 1) return;
  tableData.list = data?.list || []
  tableData.count = data?.count
}

{
  getData()
}
const changegetData = (val: any) => {
  active.value = val
  getData()
}
const toPath = async (record: any, num?: any) => {
  if (!num) {
    const fileURL = record.file_path; // PDF文件的URL
    const link = document.createElement('a');
    link.href = fileURL;
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    const fileURL = record.file_path; // PDF文件的URL
    const regex = /\/([^/]+)\.pdf$/
    const match = record.file_path.match(regex);
    const fileName = match[1] || '月结单'//record.file_name // 下载的文件名
    const response = await fetch(fileURL);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
</script>