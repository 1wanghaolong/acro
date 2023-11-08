<template>
  <div v-if="$permission(['cmsUserRetention'])">
    <a-card class="general-card">
      <a-spin
        :loading="loading"
        style="width: 100%; display: flex; flex-direction: column"
      >
        <div
          style="
            width: 95%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items:center;
            padding-top: 15px;
          "
        >
          <div style="display: flex; align-items: center">
            <div style="font-size: 1.2rem;padding-bottom:4px;">
              {{ $t('CMScomponents.user-retention.5un2f49awq80') }}
            </div>
            <a-select
              style="width: 120px"
              v-model="moneyFrom.moneyType"
              @change="moneyTypeSelect"
              :placeholder="$t('CMScomponents.user-retention.5un2f49axfw0')"
            >
              <a-option :value="1">Android</a-option>
              <a-option :value="2">iOS</a-option>
            </a-select>
            <a-range-picker
              style="width: 250px"
              shortcuts-position="right"
              :shortcuts="rangeShortcuts"
              v-model="rangeValue"
              :allow-clear='false'
              :disabledDate="(current) => dayjs(current).isAfter(dayjs())"
              @select-shortcut="selectShortcut"
              @change="changeRangePicker"
            />
          </div>
          <div>
            <a-radio-group v-model="moneyFrom.type" type="button" @change='radioGroupChange'>
              <a-radio value="daily">{{ $t('CMScomponents.user-retention.5un2f49axjc0') }}</a-radio>
              <a-radio value="weekly">{{ $t('CMScomponents.user-retention.5un2f49axlk0') }}</a-radio>
              <a-radio value="monthly">{{ $t('CMScomponents.user-retention.5un2f49axn80') }}</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="tableStyle">
          <a-table
            style="width: 100%; height: 100%"
            :scroll="scroll"
            :columns="columns"
            :bordered="{cell:true}"
            column-resizable
            :data="datalist"
            :pagination="false"
            :border='true'
          >
        </a-table>
        </div>
      </a-spin>
    </a-card>
  </div>
  <div v-else>
    <a-card
      class="general-card"
      style="
        height: 579px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
      "
    >
      {{ !$permission(["cmsUserRetention"]) ? $t('CMScomponents.user-retention.5un2f49axq00') : "" }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
const loading = ref(false);
const { t } = useI18n();
const rangeValue = ref([
  dayjs().subtract(7, "day").format("YYYY-MM-DD"),
  dayjs().format("YYYY-MM-DD"),
]);
const moneyFrom: any = ref({
  moneyType: 1,
  type: "daily",
});
const scroll = {
  x: 1000,
  y: 500,
};
const rangeShortcuts = ref([
  {
    label: t('CMScomponents.user-retention.5un2f49axro0'),
    value: () => [
      dayjs().subtract(7, "day").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ],
  },
  {
    label: t('CMScomponents.user-retention.5un2f49axts0'),
    value: () => [
      dayjs().subtract(1, "month").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ],
  },
  {
    label: t('CMScomponents.user-retention.5un2f49axw00'),
    value: () => [
      dayjs().subtract(3, "month").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ],
  },
]);

const dayColumns: any = ref([
  {
    title: t('CMScomponents.user-retention.5un2f49axyw0'),
    dataIndex: "time",
    fixed: "left",
    width:150
  },
  {
    title: t('CMScomponents.user-retention.5un2f49ay1c0'),
    dataIndex: "AddUserNum",
    width:100
  },
  {
    title: '1'+t('CMScomponents.user-retention.5un2hguoisw0'),
    dataIndex: "rate[0]",
    width:100
  },
  {
    title: '2'+t('CMScomponents.user-retention.5un2hguoisw0'),
    dataIndex: "rate[1]",
    width:100
  },
  {
    title: '3'+t('CMScomponents.user-retention.5un2hguoisw0'),
    dataIndex: "rate[2]",
    width:100
  },
  {
    title: '4'+t('CMScomponents.user-retention.5un2hguoisw0'),
    dataIndex: "rate[3]",
    width:100
  },
  {
    title: '5'+t('CMScomponents.user-retention.5un2hguoisw0'),
    dataIndex: "rate[4]",
    width:100
  },
  {
    title: '6'+t('CMScomponents.user-retention.5un2hguoisw0'),
    dataIndex: "rate[5]",
    width:100
  },
  {
    title: '7'+t('CMScomponents.user-retention.5un2hguoisw0'),
    dataIndex: "rate[6]",
    width:100
  },
  {
    title: '14'+t('CMScomponents.user-retention.5un2hguoisw0'),
    dataIndex: "rate[7]",
    width:100
  },
  {
    title: '30'+t('CMScomponents.user-retention.5un2hguoisw0'),
    dataIndex: "rate[8]",
    width:100
  },
]);
const weekColumns: any = ref([
  {
    title: t('CMScomponents.user-retention.5un2f49axyw0'),
    dataIndex: "time",
    fixed: "left",
    width:200
  },
  {
    title: t('CMScomponents.user-retention.5un2f49ay1c0'),
    dataIndex: "AddUserNum",
    width:100
  },
  {
    title: '1'+t('CMScomponents.user-retention.5un2hguojgc0'),
    dataIndex: "rate[0]",
    width:100
  },
  {
    title: '2'+t('CMScomponents.user-retention.5un2hguojgc0'),
    dataIndex: "rate[1]",
    width:100
  },
  {
    title: '3'+t('CMScomponents.user-retention.5un2hguojgc0'),
    dataIndex: "rate[2]",
    width:100
  },
  {
    title: '4'+t('CMScomponents.user-retention.5un2hguojgc0'),
    dataIndex: "rate[3]",
    width:100
  },
  {
    title: '5'+t('CMScomponents.user-retention.5un2hguojgc0'),
    dataIndex: "rate[4]",
    width:100
  },
  {
    title: '6'+t('CMScomponents.user-retention.5un2hguojgc0'),
    dataIndex: "rate[5]",
    width:100
  },
  {
    title: '7'+t('CMScomponents.user-retention.5un2hguojgc0'),
    dataIndex: "rate[6]",
    width:100
  },
  {
    title: '8'+t('CMScomponents.user-retention.5un2hguojgc0'),
    dataIndex: "rate[7]",
    width:100
  },
  {
    title: '9'+t('CMScomponents.user-retention.5un2hguojgc0'),
    dataIndex: "rate[8]",
    width:100
  },
]);
const monthColumns: any = ref([
 {
    title: t('CMScomponents.user-retention.5un2f49axyw0'),
    dataIndex: "time",
    fixed: "left",
    width:200
  },
  {
    title: t('CMScomponents.user-retention.5un2f49ay1c0'),
    dataIndex: "AddUserNum",
    width:100
  },
  {
    title: '1'+t('CMScomponents.user-retention.5un2hguojjs0'),
    dataIndex: "rate[0]",
    width:100
  },
  {
    title: '2'+t('CMScomponents.user-retention.5un2hguojjs0'),
    dataIndex: "rate[1]",
    width:100
  },
  {
    title: '3'+t('CMScomponents.user-retention.5un2hguojjs0'),
    dataIndex: "rate[2]",
    width:100
  },
  {
    title: '4'+t('CMScomponents.user-retention.5un2hguojjs0'),
    dataIndex: "rate[3]",
    width:100
  },
  {
    title: '5'+t('CMScomponents.user-retention.5un2hguojjs0'),
    dataIndex: "rate[4]",
    width:100
  },
  {
    title: '6'+t('CMScomponents.user-retention.5un2hguojjs0'),
    dataIndex: "rate[5]",
    width:100
  },
  {
    title: '7'+t('CMScomponents.user-retention.5un2hguojjs0'),
    dataIndex: "rate[6]",
    width:100
  },
  {
    title: '8'+t('CMScomponents.user-retention.5un2hguojjs0'),
    dataIndex: "rate[7]",
    width:100
  },
  {
    title: '9'+t('CMScomponents.user-retention.5un2hguojjs0'),
    dataIndex: "rate[8]",
    width:100
  },
]);
const columns:any = ref(dayColumns.value)
const datalist:any = ref([]);
const radioGroupChange = (value:any) =>{
  if (value == 'daily') {
    columns.value = dayColumns.value
  }
  if (value == 'weekly') {
    columns.value = weekColumns.value
  }
  if (value == 'monthly') {
    columns.value = monthColumns.value
  }
  userChart()
}
const moneyTypeSelect = () =>{
  userChart()
}
const changeRangePicker = () =>{
  userChart()
}
const selectShortcut = () => {
  userChart()
};
const userChart = async () => {
  datalist.value = []
  loading.value = true;
  let parms = {
    'filter[device]':moneyFrom.value.moneyType,
    'filter[start_date]':rangeValue.value[0],
    'filter[end_date]':rangeValue.value[1],
    'filter[period_type]':moneyFrom.value.type
  }
  const { code, data } = await apiCms.cmsStatisticsUserTodayRetentions(parms);
  loading.value = false;
  if (code != 1) return;
  if (data.length) {
    data.forEach((item:any) => {
      datalist.value.push({
        time:item.date,
        AddUserNum:item.num,
        rate:item.rate.map((item:any)=> item + '%')
      })
    });
  }
};
nextTick(() => {
  usePermission(["cmsUserRetention"]) && userChart()
});
</script>

<style scoped lang="less">
.panel {
  margin-bottom: 0;
  padding: 3px 0px;
}

.panel-col {
  padding-left: 43px;
  border-right: 1px solid rgb(var(--gray-2));
}
.col-avatar {
  margin-right: 12px;
  background-color: var(--color-bg-1);
}

.up-icon {
  color: rgb(var(--red-6));
}

.unit {
  margin-left: 8px;
  color: rgb(var(--gray-8));
  font-size: 12px;
}

:deep(.panel-border) {
  margin: 4px 0 0 0;
}

:deep(.arco-select-view-single) {
  background-color: var(--color-fill-0);
}
:deep(.arco-card-size-medium .arco-card-header) {
  height: 50px;
  padding: 0px 0px 0px;
}
.title {
  display: flex;
  width: 200px;
  align-items: center;
}
.typographyTitle {
  display: flex;
  align-items: center;
  height: 51px;
  margin-left: 20px;
  margin-bottom: 0px;
}
:deep(.arco-card-size-medium .arco-card-body) {
  padding: 16px 0px;
}
:deep(.arco-card-bordered) {
  border: 0px;
}
:deep(.arco-statistic) {
  display: flex;
  align-items: center;
}
:deep(.arco-statistic-content .arco-statistic-value) {
  font-size: 1.2rem;
  padding-left: 10px;
}
:deep(.arco-statistic-title) {
  margin-bottom: 0px;
  cursor: pointer;
}
.rate {
  :deep(.arco-statistic-title) {
    color: var(--color-neutral-4);
  }
  :deep(.arco-statistic-content .arco-statistic-value) {
    font-size: 14px;
    color: var(--color-neutral-6);
  }
}
.tableStyle {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height:500px;
  padding: 20px 10px;
}
</style>
