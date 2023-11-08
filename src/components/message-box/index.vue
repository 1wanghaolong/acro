<template>
  <a-spin style="display: block">
    <a-card :loading="loading" :bordered="false" style="width:320px;display:flex;flex-direction: column;">
      <template #extra>
        <a-link @click="MessageReadAll" v-if="$permission(['adminMessageReadAll'])">{{'全部已读'}}</a-link>
      </template>
      <template #title>
        <span>{{ '消息通知' }}</span>
      </template>
      <div style="overflow-y: auto;height:200px" v-if="list.length && $permission(['statisticsAccountInfo'])">
        <div v-for="item in list">
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
          {{ !$permission(['statisticsAccountInfo'])?'暂无权限':'暂无数据' }}
        </div>
      </div>
      <a-divider v-if="$permission(['trsNoticeMessagesList'])" />
      <div style="display:flex;justify-content:center;align-items:center" v-if="$permission(['trsNoticeMessagesList'])">
        <a-link @click="router.push({name:'trsNoticeMessages'}),emit('close')">查看全部消息</a-link>
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
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
  Message.success('已全部已读')
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
