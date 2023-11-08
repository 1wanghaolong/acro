<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div class="steps">
                <a-steps :current="current">
                    <a-step>{{$t('create.create.5um5fobmaos0')}}</a-step>
                    <a-step>{{$t('create.create.5umyy6dxb900')}}</a-step>
                    <a-step>{{$t('create.create.5um8eulhgh00')}}</a-step>
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
        "name": {
            "zh-CN": "",
            "en": "",
            "tc": ""
        },
        "desc": {
            "zh-CN": "",
            "en": "",
            "tc": ""
        },
        "status": 1,
        "item_list": [],
        listDate:[
            // {
            //     id:"1",
            //     account: "1234560",
            //     accountName: "张三",
            //     accountstatus: 0,
            //     passName: "LINK-TRS通道cn2",
            //     scene_list: ""
            // }
        ]
    },
})
</script>
<style lang="less" scoped>
.steps{
    width: 800px;
    margin: 20px auto 0;
}
</style>