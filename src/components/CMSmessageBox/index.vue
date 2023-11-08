<template>
  <a-spin style="display: block">
    <a-card
      :loading="loading"
      :bordered="false"
      style="display: flex; flex-direction: column;width:400px"
    >
      <!-- <template #extra>
        <a-link
          @click="MessageReadAll"
          v-if="$permission(['cmsAdminMessageReadAll'])"
          >{{ $t('CMSmessageBox.index.5um49p5mu3w0') }}</a-link
        >
      </template> -->
      <template #title>
        <div v-if='count' style='text-align: center;padding:0px 10 0 0px;font-size:24px;'>{{ count }}{{ $t('CMSmessageBox.index.5um49p5mumc0') }}</div>
        <div v-if='count' style='text-align: center;padding:0px 0 0 10px'>{{ $t('CMSmessageBox.index.5um49p5muqk0') }}</div>
      </template>
      <div
        style="overflow-y: auto; height: 300px"
        class='Message'
        v-if="list.length && $permission(['cmsMessageAffairList'])"
      >
        <!-- <div v-if="$permission(['cmsMessageAffair'])" v-for="item in list" style="cursor: pointer" :class='item.status == "0"?"unreadStyle":""' @click="router.push({ name: 'cmsMessageAffair' }), emit('close')">
          <div style="display: flex; justify-content: space-between" >
            <span style="width:150px">{{ `您有一条【${typeName(item)}】申请待处理` }}</span>
            <span>{{
              dayjs(item.create_time * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </div>
          <div style="margin-top: 5px">
            {{ item.describe }}
          </div>
          <a-divider />
        </div> -->
        <!-- v-else -->
        <div  v-if="$permission(['cmsMessageAffair'])" v-for="(item,index) in list" style="cursor: pointer" :class='item.status == "0"?"unreadStyle":""' @click="router.push({ name: 'cmsMessageAffair',query:{id:item.id} }), emit('close')">
          <div style="display: flex; justify-content: space-between" >
            <div style='flex:1'><icon-message /><span style="margin-left:5px;font-size:13px">{{ `您有一条【${typeName(item)}】申请待处理` }}</span></div>
            <div style='color: #626262;font-size:12px'>{{
              dayjs(item.create_time * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}</div>
          </div>
          <div style="margin-top: 5px;margin-left:18px;color: #4c60a3;font-size:12px">
            {{ item.describe }}
          </div>
          <a-divider v-if='list.length != index+1' />
        </div>
        <div v-else v-for="(item,index) in list" :class='item.status == "0"?"unreadStyle":""'>
          <div style="display: flex; justify-content: space-between" >
            <div style='flex:1'><icon-message /><span style="margin-left:5px;font-size:13px">{{ `您有一条【${typeName(item)}】申请待处理` }}</span></div>
            <div style='color: #626262;font-size:12px'>{{
              dayjs(item.create_time * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}</div>
          </div>
          <div style="margin-top: 5px;margin-left:18px;color: #4c60a3;font-size:12px">
            {{ item.describe }}
          </div>
          <a-divider v-if='list.length != index+1' />
        </div>
      </div>
      <div
        style="
          overflow-y: auto;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
        v-else
      >
        <div style="font-size: 17px">
          {{ !$permission(["cmsMessageAffairList"]) ? $t('CMSmessageBox.index.5um49p5mut80') : $t('CMSmessageBox.index.5um49p5muvk0') }}
        </div>
      </div>
      <a-divider v-if="$permission(['cmsMessageAffairList'])" />
      <div
        style="display: flex; justify-content: center; align-items: center"
        v-if="$permission(['cmsMessageAffair'])"
      >
        <a-link @click="router.push({ name: 'cmsMessageAffair' }), emit('close')"
          >{{$t('CMSmessageBox.index.5um49p5muxs0')}}</a-link
        >
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const loading = ref(false);
const emit = defineEmits(["close"]);
const dataList = ref({
  status:'0',
  page: 1,
  per_page: 20,
});
const list: any = ref([]);
const count: any = ref();
const getData = async () => {
  //消息列表
  loading.value = true;
  const { code, data } = await apiCms.cmsSystemAffairList({
    ...useFilter(dataList.value),
  });
  loading.value = false;
  if (code != 1) return;
  if (data.list.length) {
    list.value = data.list;
    count.value = data.count;
  }
};
const typeName = (val: any) => {
  if (!val) {
    return;
  }
  if (val.type == "1") {
    return t('CMSmessageBox.index.5um49p5mv040')
  }
  if (val.type == "2") {
    return t('CMSmessageBox.index.5um49p5mv2o0')
  }
  if (val.type == "3") {
    return t('CMSmessageBox.index.5um49p5mv2o0')
  }
  if (val.type == "4") {
    return t('CMSmessageBox.index.5um49p5mv2o0')
  }
  if (val.type == "5") {
    return t('CMSmessageBox.index.5um49p5mv6s0')
  }
  if (val.type == "6") {
    return t('CMSmessageBox.index.5um49p5mv9c0')
  }
};
// const MessageReadAll = async () => {
//   //消息列表
//   loading.value = true;
//   const { code } = await apiCms.cmsSystemaffAirReadAll();
//   loading.value = false;
//   if (code != 1) return;
//   Message.success("已全部已读");
//   emit("close");
// };
{
  usePermission(["cmsMessageAffairList"]) && getData();
}
</script>

<style scoped lang="less">
:deep(.arco-divider-horizontal) {
  margin: 10px 0;
}
:deep(.arco-card-size-medium .arco-card-body) {
  padding: 16px 0px 0px;
}
:deep(.arco-card-size-medium .arco-card-header) {
  padding: 16px 0px 10px;
}
.unreadStyle{
  // color:rgb(var(--red-4))
}
:deep(.arco-card-size-medium .arco-card-header){
  height:auto;
}
</style>
