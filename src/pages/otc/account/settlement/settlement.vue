<template>
  <a-tabs v-model:active-key="active" @change="changegetData" justify>
    <a-tab-pane key="1" title="账户日结单" :disabled="tableData.loading">
      <div class="searchBox" :style="{ maxHeight: !searchInfoDay.show ? 0 : '500px' }">
        <a-form auto-label-width layout="vertical" :model="searchInfoDay.data" ref="searchFormRefDay">
          <a-row :gutter="16">>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="asset_account" label="资金账户号">
                <a-input v-model="searchInfoDay.data.asset_account" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="statement_month" label="结单月份">
                <!-- <a-range-picker v-model="searchInfo.data.statement_month" format="YYYY-MM-DD" /> -->
                <a-month-picker v-model="searchInfoDay.data.statement_month" style="width: 100%;" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="real_name" label="客户姓名">
                <a-input v-model="searchInfoDay.data.real_name" placeholder="请输入中文名或英文名" />
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
            {{ searchInfoDay.show ? '收起筛选' : '展开筛选' }}
          </a-button>
          <a-button @click="searchFormRefDay?.resetFields(), getData()">
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
          <a-button @click="getData" type="primary">
            <template #icon>
              <icon-search />
            </template>
            查询
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
            <a-table-column title="资金账户号" data-index="asset_account_info.account"></a-table-column>
            <a-table-column title="结单周期">
              <template #cell="{ record }">
                <div>{{ record.start_time ? dayjs.unix(record.start_time).format('YYYY-MM-DD') : '--' }}/{{
                  record.end_time ? dayjs.unix(record.end_time).format('YYYY-MM-DD') : '--' }}</div>
              </template>
            </a-table-column>
            <a-table-column title="客户姓名" data-index="net_profit">
              <template #cell="{ record }">
                <span><a-tag style="margin-bottom:5px;margin-right:5px" color="red">CN</a-tag>
                  <span>{{ record.asset_account_info.real_name }}</span></span>
                <br>
                <span><a-tag style="margin-right:5px" color="arcoblue">EN</a-tag>
                  <span>{{ record.asset_account_info.english_name }}</span></span>
              </template>
            </a-table-column>

            <a-table-column title="生成时间">
              <template #cell="{ record }">
                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}</div>
                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}</div>
              </template>
            </a-table-column>
            <a-table-column v-if="$permission(['wealthSettlementOrderDetails', 'wealthSettlementOrderDownload'])"
              fixed="right" title="操作" :width="150">
              <template #cell="{ record }">
                <a-space>
                  <a-link v-permission="['wealthSettlementOrderDetails']" @click="toPath(record)">详情</a-link>
                  <a-link v-permission="['wealthSettlementOrderDownload']" @click="toPath(record, 1)">下载</a-link>
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
    <a-tab-pane key="2" title="账户月结单" :disabled="tableData.loading">
      <div class="searchBox" :style="{ maxHeight: !searchInfoMound.show ? 0 : '100%' }">
        <a-form auto-label-width layout="vertical" :model="searchInfoMound.data" ref="searchFormRefMound">
          <a-row :gutter="16">>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="asset_account" label="资金账户号">
                <a-input v-model="searchInfoMound.data.asset_account" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="statement_month" label="结单日期">
                <!-- <a-range-picker v-model="searchInfo.data.statement_month" format="YYYY-MM-DD" /> -->
                <a-date-picker v-model="searchInfoMound.data.statement_month" style="width: 100%;" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="real_name" label="客户姓名">
                <a-input v-model="searchInfoMound.data.real_name" placeholder="请输入中文名或英文名" />
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
            {{ searchInfoMound.show ? '收起筛选' : '展开筛选' }}
          </a-button>
          <a-button @click="searchFormRefMound?.resetFields(), getData()">
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
          <a-button @click="getData" type="primary">
            <template #icon>
              <icon-search />
            </template>
            查询
          </a-button>
        </a-space>
        <!-- <a-space :size="18">
                    <a-button type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        生成月结单
                    </a-button>
                    
                </a-space> -->
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
            <a-table-column title="资金账户号" data-index="asset_account_info.account"></a-table-column>
            <a-table-column title="结单周期">
              <template #cell="{ record }">
                <div>{{ record.start_time ? dayjs.unix(record.start_time).format('YYYY-MM-DD') : '--' }}/{{
                  record.end_time ? dayjs.unix(record.end_time).format('YYYY-MM-DD') : '--' }}</div>
              </template>
            </a-table-column>
            <a-table-column title="客户姓名" data-index="net_profit">
              <template #cell="{ record }">
                <span><a-tag style="margin-bottom:5px;margin-right:5px" color="red">CN</a-tag>
                  <span>{{ record.asset_account_info.real_name }}</span></span>
                <br>
                <span><a-tag style="margin-right:5px" color="arcoblue">EN</a-tag>
                  <span>{{ record.asset_account_info.english_name }}</span></span>
              </template>
            </a-table-column>

            <a-table-column title="生成时间">
              <template #cell="{ record }">
                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}</div>
                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}</div>
              </template>
            </a-table-column>
            <a-table-column v-if="$permission(['wealthSettlementOrderDayDetails', 'wealthSettlementOrderDayDownload'])"
              fixed="right" title="操作" :width="150">
              <template #cell="{ record }">
                <a-space>
                  <a-link v-permission="['wealthSettlementOrderDayDetails']" @click="toPath(record)">详情</a-link>
                  <!-- <a :href="record.file_path" target="_bank" >下载</a> -->
                  <a-link v-permission="['wealthSettlementOrderDayDownload']" @click="toPath(record, 1)">下载</a-link>
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
// const local = useLocal()
// const router = useRouter()
const searchFormRefDay = ref()
const searchFormRefMound = ref()
const searchInfoDay = reactive({
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
const searchInfoMound = reactive({
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