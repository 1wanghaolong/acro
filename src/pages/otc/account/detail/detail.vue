<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="back" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-menu mode="horizontal" :selected-keys="[route.name]" @menu-item-click="changeRouter($event)">
                <a-menu-item key="otcAccountDetailIndex" v-permission="['otcAccountDetailIndex']">{{$t('detail.detail.5um3haqk3tc0')}}</a-menu-item>
                <a-menu-item key="otcAccountDetailCharge" v-permission="['otcAccountDetailCharge']">{{$t('detail.detail.5um3haqk4ck0')}}</a-menu-item>
                <a-menu-item key="otcAccountDetailPayment" v-permission="['otcAccountDetailPayment']">{{$t('detail.detail.5um3haqk4fg0')}}</a-menu-item>
                <a-menu-item key="otcAccountDetailWithdraw" v-permission="['otcAccountDetailWithdraw']">{{$t('detail.detail.5um3haqk4hg0')}}</a-menu-item>
                <a-menu-item key="otcAccountDetailTransfer" v-permission="['otcAccountDetailTransfer']">{{$t('detail.detail.5um3haqk4jg0')}}</a-menu-item>
                <a-menu-item key="otcAccountDetailExchange" v-permission="['otcAccountDetailExchange']">{{$t('detail.detail.5um3haqk4mg0')}}</a-menu-item>
                <a-menu-item key="otcAccountDetailAssure" v-permission="['otcAccountDetailAssure']">{{$t('detail.detail.5um3haqk4og0')}}</a-menu-item>
                <a-menu-item key="otcAccountDetailRecord" v-permission="['otcAccountDetailRecord']">{{$t('detail.detail.5um3haqk4t00')}}</a-menu-item>
                <a-menu-item key="wealthAccountDetailRecord" v-permission="['wealthAccountDetailRecord']">{{$t('detail.detail.5um3haqk4t00')}}</a-menu-item>
                <a-menu-item key="wealthAccountSettlement" v-permission="['wealthAccountSettlement']">{{$t('detail.detail.5um3haqk4vg0')}}</a-menu-item>
                <a-menu-item key="OTCAccountSettlement" v-permission="['OTCAccountSettlement']">{{$t('detail.detail.5um3haqk4vg0')}}</a-menu-item>
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
const mobile = ref(route.query.mobile || "")
const customid = ref(route.query.customid || "")
const back = () =>{
    if (mobile.value && customid.value) {
        router.push({name:'otcCustomerDetailIndex',params:{customid:''+customid.value},query: { mobile: mobile.value,customid:customid.value}})
        return
    }
    router.push({name:'otcAccount'})
}
const changeRouter = (name: string) => {
    if (mobile.value && customid.value) {
        router.push({name,query: { mobile: mobile.value,customid:customid.value}})
        return
    }
    router.push({
        name
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