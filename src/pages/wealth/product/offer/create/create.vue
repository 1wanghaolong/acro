<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div class="steps">
                <a-steps :current="current">
                    <a-step>{{$t('offer.create.5umx66c72lo0')}}</a-step>
                    <a-step>{{$t('offer.create.5umx66c73q40')}}</a-step>
                    <a-step>{{$t('offer.create.5umx66c73ws0')}}</a-step>
                </a-steps>
            </div>
            <info v-model:data="form.data" v-model:current="current" v-if="current == 1"></info>
            <quotation v-model:data="form.data" v-model:current="current" v-if="current == 2"></quotation>
            <success v-model:data="form.data" v-model:current="current" v-show="current == 3"></success>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import info from './info.vue'
import quotation from './quotation.vue'
import success from './success.vue'
const route = useRoute()
const router = useRouter()
const current = ref(1)
const form = reactive({
    show: false,
    loading: false,
    data: {
        "options_product_id":'',
        "currency":"",
        "period":"",
        "market":"",
        "security_type":"1",
        "symbol":"",
        "nominal_principal":'',
        "status":'',
        "start_time":"",
        "end_time":"",
        periodEnum:[],
        "params_list":[],
        framework_params:[],
        quote_params:[]
    },
})
</script>
<style lang="less" scoped>
.steps{
    width: 800px;
    margin: 20px auto 0;
}
</style>