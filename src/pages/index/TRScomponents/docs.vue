<template>
  <a-card
    class="general-card"
    :title="$t('TRScomponents.docs.5uli2q1a00c0')"
    :header-style="{ paddingBottom: 0 }"
    :body-style="{ paddingTop: '20px' }"
  >
    <template #extra>
      <!-- <a-typography-paragraph class="text">{{ '查看更多' }}</a-typography-paragraph class="text"> -->
    </template>
    <a-row style="margin-top: 3px;height:186px" v-if="$permission(['systemDownloadInfo'])">
      <a-col :span="12" class='generalCount wrapper' v-if='from?.app_download_url'>
        <div class="icon">
          <img src="@/assets/img/app.png" :alt="'APP'+$t('TRScomponents.docs.5uli394zag00')" />
        </div>
        <a-typography-paragraph class="text" @click="download('1')" >
          {{ 'APP'+$t('TRScomponents.docs.5uli394zag00') }}
        </a-typography-paragraph>
      </a-col>
      <a-col :span="12" class='generalCount wrapper' v-if='from?.pc_download_url'>
        <div class="icon">
          <img src="@/assets/img/pc.png" :alt="'PC'+$t('TRScomponents.docs.5uli394zag00')" />
        </div>
        <a-typography-paragraph class="text" @click="download('2')" >
          {{ 'PC'+$t('TRScomponents.docs.5uli394zag00') }}
        </a-typography-paragraph>
      </a-col>
      <a-col :span="12" class='generalCount wrapper' v-if='from?.ISDA_template_download_url'>
        <div class="icon">
          <img src="@/assets/img/ISDA.png" :alt="'ISDA'+$t('TRScomponents.docs.5uli394zb1w0')" />
        </div>
        <a-typography-paragraph class="text" @click="download('3')" >
          {{ 'ISDA'+$t('TRScomponents.docs.5uli394zb1w0') }}
        </a-typography-paragraph>
      </a-col>
      <a-col :span="12" class='generalCount wrapper' v-if='from?.risk_questionnaire_template_download_url'>
        <div class="icon">
          <img src="@/assets/img/riskdown.png" :alt="$t('TRScomponents.docs.5uli2q1a0iw0')" />
        </div>
        <a-typography-paragraph class="text" @click="download('4')" >
          {{ $t('TRScomponents.docs.5uli2q1a0iw0') }}
        </a-typography-paragraph>
      </a-col>
    </a-row>
    <div v-else style="height: 190px;display: flex;justify-content: center;align-items: center;font-size: 17px;">
        {{ !$permission(['systemDownloadInfo'])? $t('TRScomponents.docs.5um34ba5dgo0') : $t('TRScomponents.docs.5um34ba5dv00') }}
    </div>
  </a-card>
</template>
<script lang="ts" setup>
const from: any = ref({})
const getData = async () => {  //统计账户情况
  const { code, data } = await apiTrs.systemDownloadInfo()
  if (code != 1) return;
  from.value = data
}
const download = (type:any) =>{
  if (type == '1') {
    if (from.value.app_download_url) {
      window.open(from.value.app_download_url)   
    }
  }
  if (type == '2') {
    if (from.value.pc_download_url) {
      window.open(from.value.pc_download_url)   
    }
  }
  if (type == '3') {
    if (from.value.ISDA_template_download_url) {
      window.open(from.value.ISDA_template_download_url)   
    }
  }
  if (type == '4') {
    if (from.value.risk_questionnaire_template_download_url) {
      window.open(from.value.risk_questionnaire_template_download_url)   
    }
  }
}
nextTick(()=>{
  usePermission(['systemDownloadInfo']) && getData()
})
</script>
<style lang="less" scoped>
  .arco-card-body .arco-link {
    margin: 10px 0;
    color: rgb(var(--gray-8));
  }
  :deep(.arco-card-header){
  height: 46px;
  padding:0px;
  align-items: center;
  padding-left: 10px;
}
.icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-bottom: 4px;
    color: rgb(var(--dark-gray-1));
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    border-radius: 4px;
}
.generalCount{
  display:flex;
  flex-direction: column;
  align-items: center;
}
:deep(.wrapper) {
    margin-bottom: 8px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      .text {
        margin-bottom: 0;
      }
    }

    &:hover {
      .icon {
        color: rgb(var(--arcoblue-6));
        // background-color: #e8f3ff;
      }

      .text {
        color: rgb(var(--arcoblue-6));
      }
    }
  }

  :deep(.icon) {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-bottom: 4px;
    color: rgb(var(--dark-gray-1));
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    // background-color: rgb(var(--gray-1));
    border-radius: 4px;
  }
</style>
