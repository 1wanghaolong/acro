<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div class="steps" :style="{'width':local.lang == 'en'?'870px':'800px'}">
                <a-steps :current="current">
                    <a-step>{{$t('type.create.5umxxmnvtq40')}}</a-step>
                    <a-step>{{$t('type.create.5umxxmnvv1s0')}}</a-step>
                    <a-step>{{$t('type.create.5umxxmnvvak0')}}</a-step>
                    <a-step>{{$t('type.create.5umxxmnvvg80')}}</a-step>
                </a-steps>
            </div>
            <info v-model:data="form.data" v-model:current="current" v-if="current == 1"></info>
            <trade v-model:data="form.data" v-model:current="current" v-if="current == 2"></trade>
            <risk v-model:data="form.data" v-model:current="current" v-if="current == 3"></risk>
            <success v-model:data="form.data" v-model:current="current" v-show="current == 4"></success>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import info from './info.vue'
import trade from './trade.vue'
import risk from './risk.vue'
import success from './success.vue'
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const current = ref(1)
const form = reactive({
    show: false,
    loading: false,
    data: {
        "product_name": {
            "zh-CN": "",
            "en": "",
            "tc": ""
        },
        "status": 1,
        "period": "",
        "nominal_principal_min": '0',
        "nominal_principal_step": '0',
        "currency_list": [],
        "framework_params": [],
        "quote_params": [{
            "params_name": {
                "zh-CN": t('type.create.5umxxmnvvw40'),
                "en": t('type.create.5umxxmnvvw40'),
                "tc": t('type.create.5umxxmnvvw40')
            },
            "type": '2',
            "params_type": "percent",
            "key": 'options_fee',
            "config": {
                "step": "0",
                "max": "100",
                "min": "0",
                "precision": "2",
                "required": true,
                "value": "0"
            }
        }]
    }
})
</script>
<style lang="less" scoped>
.steps {
    width: 800px;
    margin: 20px auto 0;
}
</style>