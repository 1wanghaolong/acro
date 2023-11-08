<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.go(-1)" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-menu mode="horizontal" :selected-keys="[route.name]" @menu-item-click="changeRouter($event,route.query)">
                <a-menu-item key="wealthAccountDetailIndex">{{$t('detail.detail.5umygqlc3pw0')}}</a-menu-item>
                <a-menu-item key="wealthAccountDetailOrder" v-permission="['wealthAccountDetailOrder']">{{$t('detail.detail.5umygqlc4z40')}}</a-menu-item>
                <a-menu-item key="wealthAccountDetailPosition" v-permission="['wealthAccountDetailPosition']">{{$t('detail.detail.5umygqlc58g0')}}</a-menu-item>
            </a-menu>
            <div style="flex: 1;overflow: auto;">
                <router-view @update:AccountUser="AccountUser" v-model:account="account"></router-view>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const account = ref()
const changeRouter = (name: string,query?:any) => {
  router.push({
    name,
    query
  })
}
const AccountUser = (val:any) =>{
   if (!val) {
    return
   }
   account.value = val
}
</script>
<style lang="less" scoped>
:deep(.arco-menu-horizontal .arco-menu-inner){
    padding: 0 0 17px;
    .arco-menu-selected-label{
        bottom: -4px;
    }
}
</style>