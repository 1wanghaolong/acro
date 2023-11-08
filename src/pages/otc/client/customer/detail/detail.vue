<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="back" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-menu mode="horizontal" :selected-keys="[route.name]" @menu-item-click="changeRouter($event,route.query)">
                <a-menu-item key="otcCustomerDetailIndex"  v-permission="['otcCustomerDetailIndex']">{{$t('detail.detail.5umyuxu4ij40')}}</a-menu-item>
                <a-menu-item key="otcCustomerDetailAccount"  v-permission="['otcCustomerDetailAccount']">{{$t('detail.detail.5umyuxu4j7w0')}}</a-menu-item>
            </a-menu>
            <div style="flex: 1;overflow: auto;">
                <router-view></router-view>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const back = () =>{
    router.push({name:"otcClientCustomer"})
}
const changeRouter = (name: string,query?:any) => {
  router.push({
    name,
    query
  })
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