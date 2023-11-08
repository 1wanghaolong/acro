<template>
  <a-spin style="display: block">
    <a-card :loading="loading" :bordered="false" style="width:320px;display:flex;flex-direction: column;">
      <template #extra>
        <a-link @click="MessageReadAll" v-if="$permission(['adminMessageReadAll'])">{{$t('TRSmessageBox.index.5um47cgm0ew0')}}</a-link>
      </template>
      <template #title>
        <span>{{ $t('TRSmessageBox.index.5um47cgmnqk0') }}</span>
      </template>
      <div style="overflow-y: auto;height:200px" v-if="list.length && $permission(['statisticsAccountInfo'])">
        <div v-for="item in list" style="cursor: pointer">
          <div style="display:flex;justify-content:space-between">
            <span style="width:150px">{{ item.title }}</span>
            <span>{{ dayjs(item.create_time * 1000).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </div>
          <div style="margin-top:5px">
            {{ item.content }}
          </div>
          <a-divider />
        </div>
      </div>
      <div style="overflow-y: auto;height:200px;display:flex;align-items:center;justify-content:center" v-else>
        <div style="font-size:17px">
          {{ !$permission(['statisticsAccountInfo'])?$t('TRSmessageBox.index.5um48i3t8k80'):$t('TRSmessageBox.index.5um48i3tisg0') }}
        </div>
      </div>
      <a-divider v-if="$permission(['trsNoticeMessagesList'])" />
      <div style="display:flex;justify-content:center;align-items:center" v-if="$permission(['trsNoticeMessagesList'])">
        <a-link @click="router.push({name:'trsNoticeMessages'}),emit('close')">{{$t('TRSmessageBox.index.5um47cgmtkc0')}}</a-link>
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter()
const loading = ref(false)
const emit = defineEmits(['close']);
const dataList = ref({
  type:"",
  create_time:[],
  page: 1,
  per_page: 20
})
const list:any = ref([]);
const getData = async () => {  //消息列表
  loading.value = true
  const { code, data } = await apiTrs.adminMessageList({...useFilter(dataList.value)})
  loading.value = false
  if (code != 1) return;
  if (data.list.length) {
    list.value = data.list
  }
}
const MessageReadAll = async () => {  //消息列表
  loading.value = true
  const { code } = await apiTrs.adminMessageReadAll()
  loading.value = false
  if (code != 1) return;
  Message.success(t('TRSmessageBox.index.5um47cgmupg0'))
  emit('close')
}
{
  usePermission(['statisticsAccountInfo']) && getData()
}
</script>

<style scoped lang="less">
:deep(.arco-divider-horizontal){
  margin: 10px 0;
}
:deep(.arco-card-size-medium .arco-card-body){
  padding: 16px 0px 0px;
}
:deep(.arco-card-size-medium .arco-card-header){
  padding: 16px 0px 10px;
}
</style>
