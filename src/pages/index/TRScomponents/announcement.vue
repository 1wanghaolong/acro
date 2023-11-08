<template>
  <a-card v-if="list.length  && $permission(['statisticsFinanceMessage'])" class="general-card" :title="$t('TRScomponents.announcement.5ulhhurj6n80')" :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '15px 20px 13px 20px',height: '750px' }">
    <template #title>
      <div style='padding-left: 10px;'>{{$t('TRScomponents.announcement.5ulhhurj6n80')}}</div>
    </template>
    <template #extra>
      <a-link style='margin-right: 10px;' v-if="$permission(['trsNoticeMessagesList'])" @click="router.push({name:'trsNoticeMessages'})">{{ $t('TRScomponents.announcement.5ulhhurj7580') }}</a-link>
    </template>
    <div>
      <div v-for="(item, idx) in list" :key="idx" class="item">
        <a-tag  size="small">{{ useEnumsFormat('trs.notice.message.type',item.type) }}</a-tag>
        <span class="item-content" :title="item.content">
          {{ item.content }}
        </span>
      </div>
    </div>
  </a-card>
  <a-card v-else class="general-card" :title="$t('TRScomponents.announcement.5ulhhurj6n80')" :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '15px 20px 13px 20px' }">
    <template #title>
      <div style='padding-left: 10px;'>{{$t('TRScomponents.announcement.5ulhhurj6n80')}}</div>
    </template>
    <template #extra>
      <a-link style='margin-right: 10px;' v-if="$permission(['trsNoticeMessagesList'])" @click="router.push({name:'trsNoticeMessages'})">{{ $t('TRScomponents.announcement.5ulhhurj7580') }}</a-link>
    </template>
    <div>
      <div>
        <span style="display: flex;justify-content: center;align-items: center;height: 750px;">
          {{ !$permission(['statisticsFinanceMessage'])? $t('TRScomponents.announcement.5um31j4fdig0') : $t('TRScomponents.announcement.5um31j4feg40') }}
        </span>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
const router = useRouter()
const temp:any = useTemp()
const dataList = ref({
  type:"",
  create_time:[],
  page: 1,
  per_page: 20
})
const list:any = ref([]);
const getData = async () => {  //消息列表
  const { code, data } = await apiTrs.adminMessageList({...useFilter(dataList.value)})
  if (code != 1) return;
  if (data.list.length) {
    list.value = data.list
  }
}
nextTick(() => {
  if (usePermission(['statisticsFinanceMessage'])) {
    getData()
    temp.setIntervalName = setInterval(()=>{getData()},300000)
  }
});
</script>

<style scoped lang="less">
.item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-bottom: 4px;

  .item-content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 4px;
    color: var(--color-text-2);
    text-decoration: none;
    font-size: 13px;
    cursor: pointer;
  }
}
:deep(.arco-card-header){
  height: 46px;
  padding:0px;
  align-items: center;
}
</style>
