<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="back" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-menu mode="horizontal" :selected-keys="[route.name]" @menu-item-click="changeRouter">
                <a-menu-item key="trsAccountDetailIndex" v-permission="['trsAccountDetailIndex']">{{$t('detail.detail.5um3haqk3tc0')}}</a-menu-item>
                <a-menu-item key="trsAccountDetailPosition" v-permission="['trsAccountDetailPosition']">{{$t('detail.detail.5um81rovum00')}}</a-menu-item>
                <a-menu-item key="trsAccountDetailRiskControl" v-permission="['trsAccountDetailRiskControl']">{{$t('detail.detail.5um81rovvhs0')}}</a-menu-item>
                <a-menu-item key="trsAccountDetailRiskControlLine" v-permission="['trsAccountDetailRiskControlLine']">{{$t('detail.detail.5um81rovvm00')}}</a-menu-item>
                <!-- <a-menu-item key="trsAccountDetailRiskControlLine">投资范围</a-menu-item> -->
                <a-menu-item key="trsAccountDetailInterest" v-permission="['trsAccountDetailInterest']">{{$t('detail.detail.5um81rovvoo0')}}</a-menu-item>
                <a-menu-item key="trsAccountDetailCharge" v-permission="['trsAccountDetailCharge']">{{$t('detail.detail.5um3haqk4ck0')}}</a-menu-item>
                <a-menu-item key="trsAccountDetailFinance" v-permission="['trsAccountDetailFinance']">{{$t('detail.detail.5um81rovvqo0')}}</a-menu-item>
                <a-menu-item key="trsAccountDetailWithdraw" v-permission="['trsAccountDetailWithdraw']">{{$t('detail.detail.5um81rovvtc0')}}</a-menu-item>
                <a-menu-item key="trsAccountDetailTransfer" v-permission="['trsAccountDetailTransfer']">{{$t('detail.detail.5um3haqk4jg0')}}</a-menu-item>
                <a-menu-item key="trsAccountDetailAssure" v-permission="['trsAccountDetailAssure']">{{$t('detail.detail.5um81rovvz40')}}</a-menu-item>
                <a-menu-item key="trsAccountDetailAgreement" v-permission="['trsAccountDetailAgreement']">{{$t('detail.detail.5um81rovw2g0')}}</a-menu-item>
                <a-menu-item key="trsAccountDetailRiskControlRecord" v-permission="['trsAccountDetailRiskControlRecord']">{{$t('detail.detail.5um81rovw600')}}</a-menu-item>
                <a-menu-item key="TRSAccountSettlement" v-permission="['TRSAccountSettlement']">{{$t('detail.detail.5um3haqk4vg0')}}</a-menu-item>
            </a-menu>
            <div ref="box" style="flex: 1;overflow: auto;">
                <router-view></router-view>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const box = ref()
const back = () =>{
    router.push({name:'trsAccount'})
}
const changeRouter = (name: string) => {
  router.push({
    name
  })
}
const routerWatch = watch(()=>route.name,()=>{//快捷操作跳转的时候回到顶部
    box.value?.scrollTop && box.value?.scrollTo(0, 0)
})
onBeforeUnmount(()=>{
  routerWatch && routerWatch()
})
</script>
<style lang="less" scoped>
:deep(.arco-menu-horizontal .arco-menu-inner){
    padding: 0 0 17px;
    .arco-menu-selected-label{
        bottom: -4px;
    }
}
</style>