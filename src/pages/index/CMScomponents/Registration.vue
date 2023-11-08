<template>
  <div>
    <a-card class="general-card">
      <a-spin style="width: 100%">
        <a-grid
          v-if="
            $permission(['cmsUserSummary']) && JSON.stringify(from.info) != '{}'
          "
          :loading="loading"
          :cols="24"
          :row-gap="16"
          class="panel"
        >
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
          >
            <a-space class='tz' @click="router.push({name:'cmsClient'})" v-if="$permission(['cmsClient'])">
              <a-avatar :size="40" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/member.png" :alt="$t('CMScomponents.Registration.5un2dzm9pgc0')" />
              </a-avatar>
              <div style="display: flex; flex-direction: column">
                <a-statistic
                  :title="$t('CMScomponents.Registration.5un2dzm9pgc0')"
                  :value="from.info.total_count"
                  :value-from="0"
                  animation
                  show-group-separator
                >
                  <!-- <template #suffix>
                    <span class="unit">{{ $t('CMScomponents.Registration.5un2dzm9q3c0') }}</span>
                  </template> -->
                </a-statistic>
                <a-statistic
                  class="rate"
                  :title="$t('CMScomponents.Registration.5un2dzm9q6o0')"
                  :value="from.info.total_count_rate.value"
                  :value-from="0"
                  animation
                  show-group-separator
                  :value-style="{
                    color:
                      Number(from.info.total_count_rate.value) <= 0
                        ? '#0fbf60'
                        : 'rgb(255 108 108)',
                  }"
                >
                  <template #suffix>
                    <span class="unit" :style="{'color':Number(from.info.total_count_rate.value) <= 0? '#0fbf60': 'rgb(255 108 108)'}" v-if='from.info.total_count_rate.ishsowPercentage'>{{ "%" }}</span>
                  </template>
                  <template #prefix>
                    <icon-arrow-rise
                      v-if="Number(from.info.total_count_rate.value) > 0"
                    />
                    <icon-arrow-fall
                      v-if="Number(from.info.total_count_rate.value) <= 0"
                    />
                  </template>
                </a-statistic>
              </div>
            </a-space>
            <a-space v-else>
              <a-avatar :size="40" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/member.png" :alt="$t('CMScomponents.Registration.5un2dzm9pgc0')" />
              </a-avatar>
              <div style="display: flex; flex-direction: column">
                <a-statistic
                  :title="$t('CMScomponents.Registration.5un2dzm9pgc0')"
                  :value="from.info.total_count"
                  :value-from="0"
                  animation
                  show-group-separator
                >
                  <!-- <template #suffix>
                    <span class="unit">{{ $t('CMScomponents.Registration.5un2dzm9q3c0') }}</span>
                  </template> -->
                </a-statistic>
                <a-statistic
                  class="rate"
                  :title="$t('CMScomponents.Registration.5un2dzm9q6o0')"
                  :value="from.info.total_count_rate.value"
                  :value-from="0"
                  animation
                  show-group-separator
                  :value-style="{
                    color:
                      Number(from.info.total_count_rate.value) <= 0
                        ? '#0fbf60'
                        : 'rgb(255 108 108)',
                  }"
                >
                  <template #suffix>
                    <span class="unit" :style="{'color':Number(from.info.total_count_rate.value) <= 0? '#0fbf60': 'rgb(255 108 108)'}" v-if='from.info.total_count_rate.ishsowPercentage'>{{ "%" }}</span>
                  </template>
                  <template #prefix>
                    <icon-arrow-rise
                      v-if="Number(from.info.total_count_rate.value) > 0"
                    />
                    <icon-arrow-fall
                      v-if="Number(from.info.total_count_rate.value) <= 0"
                    />
                  </template>
                </a-statistic>
              </div>
            </a-space>
          </a-grid-item>
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
          >
            <a-space class='tz' @click="router.push({name:'cmsClient'})" v-if="$permission(['cmsClient'])">
              <a-avatar :size="40" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/moon.png" :alt="$t('CMScomponents.Registration.5un2dzm9q9c0')" />
              </a-avatar>
              <div style="display: flex; flex-direction: column">
                <a-statistic
                  :title="$t('CMScomponents.Registration.5un2dzm9q9c0')"
                  :value="from.info.month_count"
                  :value-from="0"
                  animation
                  show-group-separator
                >
                  <!-- <template #suffix>
                    <span class="unit">{{ $t('CMScomponents.Registration.5un2dzm9q3c0') }}</span>
                  </template> -->
                </a-statistic>
                <a-statistic
                  class="rate"
                  :title="$t('CMScomponents.Registration.5un2dzm9qbc0')"
                  :value="from.info.month_count_rate.value"
                  :value-from="0"
                  animation
                  show-group-separator
                  :value-style="{
                    color:
                      Number(from.info.month_count_rate.value) <= 0
                        ? '#0fbf60'
                        : 'rgb(255 108 108)',
                  }"
                >
                  <template #suffix>
                    <span class="unit" :style="{'color':Number(from.info.month_count_rate.value) <= 0? '#0fbf60': 'rgb(255 108 108)'}" v-if='from.info.month_count_rate.ishsowPercentage'>{{ "%" }}</span>
                  </template>
                  <template #prefix>
                    <icon-arrow-rise
                      v-if="Number(from.info.month_count_rate.value) > 0"
                    />
                    <icon-arrow-fall
                      v-if="Number(from.info.month_count_rate.value) <= 0"
                    />
                  </template>
                </a-statistic>
              </div>
            </a-space>
            <a-space v-else>
              <a-avatar :size="40" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/moon.png" :alt="$t('CMScomponents.Registration.5un2dzm9q9c0')" />
              </a-avatar>
              <div style="display: flex; flex-direction: column">
                <a-statistic
                  :title="$t('CMScomponents.Registration.5un2dzm9q9c0')"
                  :value="from.info.month_count"
                  :value-from="0"
                  animation
                  show-group-separator
                >
                  <!-- <template #suffix>
                    <span class="unit">{{ $t('CMScomponents.Registration.5un2dzm9q3c0') }}</span>
                  </template> -->
                </a-statistic>
                <a-statistic
                  class="rate"
                  :title="$t('CMScomponents.Registration.5un2dzm9qbc0')"
                  :value="from.info.month_count_rate.value"
                  :value-from="0"
                  animation
                  show-group-separator
                  :value-style="{
                    color:
                      Number(from.info.month_count_rate.value) <= 0
                        ? '#0fbf60'
                        : 'rgb(255 108 108)',
                  }"
                >
                  <template #suffix>
                    <span class="unit" :style="{'color':Number(from.info.month_count_rate.value) <= 0? '#0fbf60': 'rgb(255 108 108)'}" v-if='from.info.month_count_rate.ishsowPercentage'>{{ "%" }}</span>
                  </template>
                  <template #prefix>
                    <icon-arrow-rise
                      v-if="Number(from.info.month_count_rate.value) > 0"
                    />
                    <icon-arrow-fall
                      v-if="Number(from.info.month_count_rate.value) <= 0"
                    />
                  </template>
                </a-statistic>
              </div>
            </a-space>
          </a-grid-item>
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
          >
            <a-space class='tz' @click="router.push({name:'cmsClient'})" v-if="$permission(['cmsClient'])">
              <a-avatar :size="40" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/week.png" :alt="$t('CMScomponents.Registration.5un2dzm9qds0')" />
              </a-avatar>
              <div style="display: flex; flex-direction: column">
                <a-statistic
                  :title="$t('CMScomponents.Registration.5un2dzm9qds0')"
                  :value="from.info.week_count"
                  :value-from="0"
                  animation
                  show-group-separator
                >
                  <!-- <template #suffix>
                    <span class="unit">{{ $t('CMScomponents.Registration.5un2dzm9q3c0') }}</span>
                  </template> -->
                </a-statistic>
                <a-statistic
                  class="rate"
                  :title="$t('CMScomponents.Registration.5un2dzm9q6o0')"
                  :value="from.info.week_count_rate.value"
                  :value-from="0"
                  animation
                  show-group-separator
                  :value-style="{
                    color:
                      Number(from.info.week_count_rate.value) <= 0
                        ? '#0fbf60'
                        : 'rgb(255 108 108)',
                  }"
                >
                  <template #suffix>
                    <span class="unit" :style="{'color':Number(from.info.week_count_rate.value) <= 0? '#0fbf60': 'rgb(255 108 108)'}" v-if='from.info.week_count_rate.ishsowPercentage'>{{ "%" }}</span>
                  </template>
                  <template #prefix>
                    <icon-arrow-rise
                      v-if="Number(from.info.week_count_rate.value) > 0"
                    />
                    <icon-arrow-fall
                      v-if="Number(from.info.week_count_rate.value) <= 0"
                    />
                  </template>
                </a-statistic>
              </div>
            </a-space>
            <a-space v-else>
              <a-avatar :size="40" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/week.png" :alt="$t('CMScomponents.Registration.5un2dzm9qds0')" />
              </a-avatar>
              <div style="display: flex; flex-direction: column">
                <a-statistic
                  :title="$t('CMScomponents.Registration.5un2dzm9qds0')"
                  :value="from.info.week_count"
                  :value-from="0"
                  animation
                  show-group-separator
                >
                  <!-- <template #suffix>
                    <span class="unit">{{ $t('CMScomponents.Registration.5un2dzm9q3c0') }}</span>
                  </template> -->
                </a-statistic>
                <a-statistic
                  class="rate"
                  :title="$t('CMScomponents.Registration.5un2dzm9q6o0')"
                  :value="from.info.week_count_rate.value"
                  :value-from="0"
                  animation
                  show-group-separator
                  :value-style="{
                    color:
                      Number(from.info.week_count_rate.value) <= 0
                        ? '#0fbf60'
                        : 'rgb(255 108 108)',
                  }"
                >
                  <template #suffix>
                    <span class="unit" :style="{'color':Number(from.info.week_count_rate.value) <= 0? '#0fbf60': 'rgb(255 108 108)'}" v-if='from.info.week_count_rate.ishsowPercentage'>{{ "%" }}</span>
                  </template>
                  <template #prefix>
                    <icon-arrow-rise
                      v-if="Number(from.info.week_count_rate.value) > 0"
                    />
                    <icon-arrow-fall
                      v-if="Number(from.info.week_count_rate.value) <= 0"
                    />
                  </template>
                </a-statistic>
              </div>
            </a-space>
          </a-grid-item>
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
            style="border-right: none"
          >
            <a-space class='tz' @click="router.push({name:'cmsClient'})" v-if="$permission(['cmsClient'])">
              <a-avatar :size="40" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/Day.png" :alt="$t('CMScomponents.Registration.5un2dzm9qfo0')" />
              </a-avatar>
              <div style="display: flex; flex-direction: column">
                <a-statistic
                  :title="$t('CMScomponents.Registration.5un2dzm9qfo0')"
                  :value="from.info.day_count"
                  :value-from="0"
                  animation
                  show-group-separator
                >
                  <!-- <template #suffix>
                    <span class="unit">{{ $t('CMScomponents.Registration.5un2dzm9q3c0') }}</span>
                  </template> -->
                </a-statistic>
                <a-statistic
                  class="rate"
                  :title="$t('CMScomponents.Registration.5un2dzm9qio0')"
                  :value="from.info.day_count_rate?.value"
                  :value-from="0"
                  animation
                  show-group-separator
                  :value-style="{
                    color:
                      Number(from.info.day_count_rate.value) <= 0
                        ? '#0fbf60'
                        : 'rgb(255 108 108)',
                  }"
                >
                  <template #suffix>
                    <span class="unit" :style="{'color':Number(from.info.day_count_rate.value) <= 0? '#0fbf60': 'rgb(255 108 108)'}" v-if='from.info.day_count_rate.ishsowPercentage'>{{ "%" }}</span>
                  </template>
                  <template #prefix>
                    <icon-arrow-rise
                      v-if="Number(from.info.day_count_rate.value) > 0"
                    />
                    <icon-arrow-fall
                      v-if="Number(from.info.day_count_rate.value) <= 0"
                    />
                  </template>
                </a-statistic>
              </div>
            </a-space>
            <a-space v-else>
              <a-avatar :size="40" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/Day.png" :alt="$t('CMScomponents.Registration.5un2dzm9qfo0')" />
              </a-avatar>
              <div style="display: flex; flex-direction: column">
                <a-statistic
                  :title="$t('CMScomponents.Registration.5un2dzm9qfo0')"
                  :value="from.info.day_count"
                  :value-from="0"
                  animation
                  show-group-separator
                >
                  <!-- <template #suffix>
                    <span class="unit">{{ $t('CMScomponents.Registration.5un2dzm9q3c0') }}</span>
                  </template> -->
                </a-statistic>
                <a-statistic
                  class="rate"
                  :title="$t('CMScomponents.Registration.5un2dzm9qio0')"
                  :value="from.info.day_count_rate?.value"
                  :value-from="0"
                  animation
                  show-group-separator
                  :value-style="{
                    color:
                      Number(from.info.day_count_rate.value) <= 0
                        ? '#0fbf60'
                        : 'rgb(255 108 108)',
                  }"
                >
                  <template #suffix>
                    <span class="unit" :style="{'color':Number(from.info.day_count_rate.value) <= 0? '#0fbf60': 'rgb(255 108 108)'}" v-if='from.info.day_count_rate.ishsowPercentage'>{{ "%" }}</span>
                  </template>
                  <template #prefix>
                    <icon-arrow-rise
                      v-if="Number(from.info.day_count_rate.value) > 0"
                    />
                    <icon-arrow-fall
                      v-if="Number(from.info.day_count_rate.value) <= 0"
                    />
                  </template>
                </a-statistic>
              </div>
            </a-space>
          </a-grid-item>
          <a-grid-item :span="24">
            <a-divider class="panel-border" />
          </a-grid-item>
        </a-grid>
        <div v-else>
          <a-card
            class="general-card"
            style="
              height: 80px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 17px;
              border-bottom: 1px solid rgb(var(--gray-2));
            "
          >
            {{ !$permission(["cmsUserSummary"]) ? $t('CMScomponents.Registration.5un2dzm9ql80') : $t('CMScomponents.Registration.5un2dzm9qn40') }}
          </a-card>
        </div>
        <div v-if="$permission(['cmsUserTrend'])">
          <div
            style="
              width: 100%;
              display: flex;
              justify-content: flex-end;
              padding-top: 15px;
              padding-right: 39px;
            "
          >
            <a-range-picker
              shortcuts-position="right"
              :shortcuts="rangeShortcuts"
              v-model="rangeValue"
              :allow-clear='false'
              :disabledDate="(current) => dayjs(current).isAfter(dayjs())"
              @select-shortcut="selectShortcut"
              @change="changeRangePicker"
            />
          </div>
          <VCharts
            :loading="Chartloading"
            ref="Charts"
            :option="options"
            :autoresize="true"
            style="width: 100%; height: 320px"
          />
        </div>
        <div v-else>
          <a-card
            class="general-card"
            style="
              height: 367px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 17px;
            "
          >
            {{ !$permission(["cmsUserTrend"]) ? $t('CMScomponents.Registration.5un2dzm9ql80') : $t('CMScomponents.Registration.5un2dzm9qn40') }}
          </a-card>
        </div>
      </a-spin>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import VCharts from "vue-echarts";
import { graphic } from "echarts";
import { ref } from "vue";
import dayjs from "dayjs";
const loading = ref(false);
const local = useLocal();
const { t } = useI18n();
const router = useRouter()
const Chartloading = ref(false);
const dataType: any = ref("1");
const from: any = reactive({
  info: {
    // total_count:0,
    // total_count_rate:{
    //   value:0,
    //   ishsowPercentage:false
    // },
    // month_count:0,
    // month_count_rate:{
    //   value:0,
    //   ishsowPercentage:false
    // },
    // week_count:0,
    // week_count_rate:{
    //   value:0,
    //   ishsowPercentage:false
    // },
    // day_count:0,
    // day_count_rate:{
    //   value:0,
    //   ishsowPercentage:false
    // },
  },
});
const Charts = ref();
const rangeValue = ref([
  dayjs().subtract(7, "day").format("YYYY-MM-DD"),
  dayjs().format("YYYY-MM-DD"),
]);
// // 获取最近七天日期
// const getRecentSevenDaysDates = () => {
//   const dates = [];
//   const currentDate = dayjs(); // 当前日期
//   for (let i = 6; i >= 0; i--) {
//     const date = currentDate.subtract(i, "day").format("MM-DD");
//     dates.push(date);
//   }
//   return dates;
// };
// // 获取最近三十天日期
// const getPreviousThreeMonthsDate = () => {
//   const dates = [];
//   const currentDate = dayjs(); // 当前日期
//   const startDate = currentDate.subtract(1, "month"); // 三个月前的日期
//   const endDate = currentDate; // 当前日期

//   let currentDatePointer = startDate;
//   while (
//     currentDatePointer.isBefore(endDate) ||
//     currentDatePointer.isSame(endDate, "day")
//   ) {
//     dates.push(currentDatePointer.format("MM-DD"));
//     currentDatePointer = currentDatePointer.add(1, "day");
//   }

//   return dates;
// };
// // 获取最近三个月日期
// const getPreviousThreeMonthsDates = () => {
//   const dates = [];
//   const currentDate = dayjs(); // 当前日期
//   const startDate = currentDate.subtract(3, "month"); // 三个月前的日期
//   const endDate = currentDate; // 当前日期

//   let currentDatePointer = startDate;
//   while (
//     currentDatePointer.isBefore(endDate) ||
//     currentDatePointer.isSame(endDate, "day")
//   ) {
//     dates.push(currentDatePointer.format("MM-DD"));
//     currentDatePointer = currentDatePointer.add(1, "day");
//   }

//   return dates;
// };
// const recentSevenDays: any = ref(getRecentSevenDaysDates()); //获取最近七天日期
// const recentThreeMonth: any = ref(getPreviousThreeMonthsDate()); // 获取最近一个月日期
// const recentThreeMonths: any = ref(getPreviousThreeMonthsDates()); // 获取最近三个月日期
// console.log('recentSevenDays',recentSevenDays.value);
// console.log('recentThreeMonth',recentThreeMonth.value);
// console.log('recentThreeMonths',recentThreeMonths.value);
const rangeShortcuts = ref([
  {
    label: t('CMScomponents.Registration.5un2dzm9qow0'),
    value: () => [
      dayjs().subtract(7, "day").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ],
    dataType: "1",
  },
  {
    label: t('CMScomponents.Registration.5un2dzm9qr00'),
    value: () => [
      dayjs().subtract(1, "month").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ],
    dataType: "2",
  },
  {
    label: t('CMScomponents.Registration.5un2dzm9qu40'),
    value: () => [
      dayjs().subtract(3, "month").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ],
    dataType: "3",
  },
]);
const graphicFactory = (side: any) => {
  return {
    type: "text",
    bottom: "8",
    ...side,
    style: {
      text: "",
      textAlign: "center",
      fill: "#4E5969",
      fontSize: 12,
    },
  };
};
const graphicElements = ref([
  graphicFactory({ left: "0%" }),
  graphicFactory({ right: 0 }),
]);
const options = ref({
  grid: {
    left: "3%",
    right: "40",
    top: "70",
    bottom: "30",
  },
  legend: {
    data: [t('CMScomponents.Registration.5un2dzm9qw80')],
    left: "2%",
    top: "4%",
    textStyle: {
      color: "#4E5969",
    },
  },
  xAxis: {
    type: "category",
    offset: 2,
    data: [],
    boundaryGap: false,
    axisLabel: {
      color: "#4E5969",
      formatter(value: number) {
        return `${value}`;
      },
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      interval: (idx: number) => {
        if (idx === 0) return false;
        // if (idx === from.value.xAxisList.length - 1) return false;
        return true;
      },
      lineStyle: {
        color: "#E5E8EF",
      },
    },
    axisPointer: {
      show: true,
      lineStyle: {
        color: "#23ADFF",
        width: 2,
      },
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
    },
    axisLabel: {
      formatter(value: any, idx: number) {
        if (idx === 0) return value;
        return `${value}`;
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "#E5E8EF",
      },
    },
  },
  tooltip: {
    trigger: "axis",
  },
  graphic: {
    elements: graphicElements.value,
  },
  series: [
    {
      data: [],
      name: t('CMScomponents.Registration.5un2dzm9qw80'),
      type: "line",
      smooth: true,
      symbolSize: 12,
      emphasis: {
        focus: "series",
        itemStyle: {
          borderWidth: 2,
        },
      },
      lineStyle: {
        width: 3,
        color: new graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "rgba(30, 231, 255, 1)",
          },
          {
            offset: 0.5,
            color: "rgba(36, 154, 255, 1)",
          },
          {
            offset: 1,
            color: "rgba(111, 66, 251, 1)",
          },
        ]),
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(17, 126, 255, 0.16)",
          },
          {
            offset: 1,
            color: "rgba(17, 128, 255, 0)",
          },
        ]),
      },
    },
  ],
});
const selectShortcut = (shortcut: any) => {
  if (!shortcut) {
    return;
  }
  dataType.value = shortcut.dataType;
  userChart();
};
const changeRangePicker = () =>{
  userChart();
}
const fetchData = async () => {
  loading.value = true;
  const { code, data } = await apiCms.cmsUserSummary();
  loading.value = false;
  if (code != 1) return;
  from.info.total_count = data.total_count
  from.info.month_count = data.month_count
  from.info.week_count = data.week_count
  from.info.day_count = data.day_count
  from.info.total_count_rate = valuePercentage(data.total_count_rate)
  from.info.month_count_rate = valuePercentage(data.month_count_rate)
  from.info.week_count_rate = valuePercentage(data.week_count_rate)
  from.info.day_count_rate = valuePercentage(data.day_count_rate) 
};
const valuePercentage = (valName:any) =>{
  let a:any = { value:0,ishsowPercentage:false }
  if (typeof valName == 'string') {
    let val = valName.split('%')
    if (val[0].indexOf('-') != -1) {
      let numVal = val[0].split('-')
      a.value = Number('-'+numVal[1])
      a.ishsowPercentage = true
    }
  }else{
    a.value = Number(valName)
  }
  
  return a
}
const dataTimeListClick = (startDate:any, endDate:any) => {
  const allDates = [];
  let currentDate = dayjs(startDate).startOf('day');

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    allDates.push(currentDate.format('MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return allDates;
};
const userChart = async () => {
  let parms = {
    createTime: [
      dayjs(rangeValue.value[0]).toDate().getTime() / 1000,
      dayjs(rangeValue.value[1]).toDate().getTime() / 1000,
    ],
    "_fields.fields":
      "count(*) as count,FROM_UNIXTIME(create_time, '%m-%d') as time",
    "_sort.column": "create_time",
    "_sort.type": "asc",
    "_group.group": "time",
  };
  Chartloading.value = true;
  const { code, data } = await apiCms.cmsUserTrend({
    ...useFilter(parms),
  });
  Chartloading.value = false;
  if (code != 1) return;
  let xAxisList: any;
  const chartsData: number[] = [];
  const dataTimeList: { time: string; count: number }[] = [];
  xAxisList = dataTimeListClick(rangeValue.value[0],rangeValue.value[1])
  xAxisList.forEach((item: any) => {
    dataTimeList.push({
      time: item,
      count: 0,
    });
  });

  if (data.length) {
    data.forEach((item: any) => {
      const dataTimeItem = dataTimeList.find(
        (item2: any) => item.time === item2.time
      );
      if (dataTimeItem) {
        dataTimeItem.count = item.count;
      }
    });
  }

  chartsData.push(...dataTimeList.map((item: any) => item.count));
  if (Charts.value) {
    Charts.value.setOption({
      xAxis: {
        data: xAxisList,
      },
      series: [
        {
          data: chartsData,
        },
      ],
    });
    Charts.value.resize();
  }
};
const graphColour = (newval:any) => {
  if (Charts.value) {
    Charts.value.setOption({
      legend: {
        textStyle: {
          color: newval == "dark" ? "rgba(255, 255, 255, 0.9)" : "#4E5969",
        },
      },
      xAxis: {
        axisLabel: {
          color: newval == "dark" ? "rgba(255, 255, 255, 0.9)" : "#4E5969",
        },
      },
      yAxis: {
        axisLabel: {
          color: newval == "dark" ? "rgba(255, 255, 255, 0.9)" : "#4E5969",
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: newval == "dark" ? "rgba(255, 255, 255, 0.9)" : "#E5E8EF",
          },
        },
      },
    });
    Charts.value.resize();
  }
};
watch(
  () => local.theme,
  (newval:any) => {
    graphColour(newval)
  }
);
nextTick(async () => {
  await usePermission(["cmsUserSummary"]) && fetchData();
  await usePermission(["cmsUserTrend"]) && userChart();
  await graphColour(local.theme)
});
</script>

<style scoped lang="less">
.panel {
  margin-bottom: 0;
  padding: 3px 0px;
}

.panel-col {
  padding-left: 43px;
  padding-right:40px;
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
  margin-left: 0px;
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
  font-size: 20px;
  padding-left: 10px;
}
:deep(.tz .arco-statistic-title) {
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
</style>
