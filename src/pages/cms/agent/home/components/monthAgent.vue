<template>
  <div v-if="$permission(['cmsAgentUserRank'])">
    <a-card class="general-card">
      <a-spin style="width: 100%">
        <a-grid :cols="24" :row-gap="16" class="panel">
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 8 }"
          >
            <a-space style="width: 100%; height: 100%">
              <div style="width: 100%; height: 100%">
                <div
                  style="
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid rgb(var(--gray-3));
                    color: var(--color-text-2);
                    border-bottom: 0px;
                    padding-left: 10px;
                  "
                >
                  {{ $t('components.monthAgent.5um3bvbg5440') }}
                </div>
                <a-table
                  :loading="loading"
                  style="width: 100%; height: 100%"
                  :columns="columns"
                  :bordered="{ cell: true }"
                  :data="list.month_invite_list"
                  :pagination="false"
                  :border="true"
                >
                  <template #index="{ rowIndex }">
                    {{ rowIndex + 1 }}
                  </template>
                  <template #agent="{ record }">
                    {{ record.agent_name }}{{ `(${record.user_name})` }}
                  </template>
                  <template #inviteNum="{ record }">
                    <span v-if="'' + record.invite_num">{{
                      record.invite_num
                    }}</span>
                    <span v-if="'' + record.open_num">{{
                      record.open_num
                    }}</span>
                    <span v-if="'' + record.payment_num">{{
                      record.payment_num
                    }}</span>
                  </template>
                </a-table>
              </div>
            </a-space>
          </a-grid-item>
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 8 }"
          >
            <a-space style="width: 100%; height: 100%">
              <div style="width: 100%; height: 100%">
                <div
                  style="
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid rgb(var(--gray-3));
                    color: var(--color-text-2);
                    border-bottom: 0px;
                    padding-left: 10px;
                  "
                >
                  {{ $t('components.monthAgent.5um3bvbg67k0') }}
                </div>
                <a-table
                  :loading="loading"
                  style="width: 100%; height: 100%"
                  :columns="columns"
                  :bordered="{ cell: true }"
                  :data="list.month_invite_open_list"
                  :pagination="false"
                  :border="true"
                >
                  <template #index="{ rowIndex }">
                    {{ rowIndex + 1 }}
                  </template>
                  <template #agent="{ record }">
                    {{ record.agent_name }}{{ `(${record.user_name})` }}
                  </template>
                  <template #inviteNum="{ record }">
                    <span v-if="'' + record.invite_num">{{
                      record.invite_num
                    }}</span>
                    <span v-if="'' + record.open_num">{{
                      record.open_num
                    }}</span>
                    <span v-if="'' + record.payment_num">{{
                      record.payment_num
                    }}</span>
                  </template>
                </a-table>
              </div>
            </a-space>
          </a-grid-item>
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 8 }"
          >
            <a-space style="width: 100%; height: 100%">
              <div style="width: 100%; height: 100%">
                <div
                  style="
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid rgb(var(--gray-3));
                    color: var(--color-text-2);
                    border-bottom: 0px;
                    padding-left: 10px;
                  "
                >
                  {{ $t('components.monthAgent.5um3bvbg6m40') }}
                </div>
                <a-table
                  :loading="loading"
                  style="width: 100%; height: 100%"
                  :columns="columns"
                  :bordered="{ cell: true }"
                  :data="list.month_invite_payment_list"
                  :pagination="false"
                  :border="true"
                >
                  <template #index="{ rowIndex }">
                    {{ rowIndex + 1 }}
                  </template>
                  <template #agent="{ record }">
                    {{ record.agent_name }}{{ `(${record.user_name})` }}
                  </template>
                  <template #inviteNum="{ record }">
                    <span v-if="'' + record.invite_num">{{
                      record.invite_num
                    }}</span>
                    <span v-if="'' + record.open_num">{{
                      record.open_num
                    }}</span>
                    <span v-if="'' + record.payment_num">{{
                      record.payment_num
                    }}</span>
                  </template>
                </a-table>
              </div>
            </a-space>
          </a-grid-item>
        </a-grid>
      </a-spin>
    </a-card>
  </div>
  <div v-else>
    <a-card
      class="general-card"
      style="
        height: 530px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        border-bottom: 1px solid rgb(var(--gray-2));
      "
    >
      {{ !$permission(["cmsAgentUserRank"]) ? $t('components.monthAgent.5um3bvbg6u80') : $t('components.monthAgent.5um3bvbg6zk0') }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const loading = ref(false);
const columns = ref([
  {
    title: "#",
    dataIndex: "index",
    slotName: "index",
    width:70
  },
  {
    title: t('components.monthAgent.5um3bvbg74g0'),
    dataIndex: "agent",
    slotName: "agent",
  },
  {
    title: t('components.monthAgent.5um3bvbg7940'),
    dataIndex: "inviteNum",
    slotName: "inviteNum",
  },
]);
const list = reactive({
  month_invite_list: [],
  month_invite_open_list: [],
  month_invite_payment_list: [],
  last_month_clear_list: {},
});

const fetchData = async () => {
  loading.value = true;
  const { code, data } = await apiCms.cmsAgentUserRank();
  loading.value = false;
  if (code != 1) return;
  list.month_invite_list = data.this_month_invite_list;
  list.month_invite_open_list = data.this_month_invite_open_list;
  list.month_invite_payment_list = data.this_month_invite_payment_list;
  list.last_month_clear_list = data.last_month_clear_list;
};
nextTick(() => {
  usePermission(["cmsAgentUserRank"]) && fetchData();
});
</script>

<style scoped lang="less">
.panel {
  margin-bottom: 0;
  padding: 3px 0px;
}

.panel-col {
  padding: 0 20px;
  // border-right: 1px solid rgb(var(--gray-2));
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
  flex-direction: column;
}
:deep(.arco-statistic-content .arco-statistic-value) {
  font-size: 20px;
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
:deep(.arco-space-horizontal .arco-space-item) {
  width: 100%;
}
</style>
