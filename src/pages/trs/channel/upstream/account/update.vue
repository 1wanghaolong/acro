<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="name.zh-CN" :label="$t('account.update.5umxuovpz0k0')">
                    <a-input v-model="form.data.name['zh-CN']" :placeholder="$t('account.update.5umxuovpzn40')" />
                </a-form-item>
                <a-form-item field="name.en" :label="$t('account.update.5umxuovpzq80')">
                    <a-input v-model="form.data.name.en" :placeholder="$t('account.update.5umxuovpzsg0')" />
                </a-form-item>
                <a-form-item field="name.tc" :label="$t('account.update.5umxuovpzu80')">
                    <a-input v-model="form.data.name.tc" :placeholder="$t('account.update.5umxuovpzx00')" />
                </a-form-item>
                <a-form-item field="account" :label="$t('account.update.5umxuovq00s0')">
                    <a-input v-model="form.data.account" :placeholder="$t('account.update.5umxuovq02s0')" />
                </a-form-item>
                <a-form-item allow-search field="counter_channel_id" :label="$t('account.update.5umxuovq0540')">
                    <a-select @change="form.data.scene_list = []" allow-clear v-model="form.data.counter_channel_id" :placeholder="$t('account.update.5umxuovq07c0')">
                        <a-option v-for="item in (form.counterChannelList as any)" :value="item.id">{{
                            item.name }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="scene_list" :label="$t('account.update.5umxuovq0d00')">
                    <a-select multiple allow-clear v-model="form.data.scene_list" :placeholder="!form.data.counter_channel_id? $t('account.update.5unxacn8b0g0') : $t('account.update.5umxuovq0is0') ">
                        <a-option v-for="item in (form.counterChannelList as any)?.find((i:any)=>i.id == form.data.counter_channel_id)?.scene_list"  :value="item">
                        {{ useEnumsFormat('market.order.counter_channel_scene',item) }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="getData()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('account.update.5umxuovq0f00')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('account.update.5umxuovq0gs0')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n();
const form:any = reactive({
    show: false,
    loading: false,
    counterChannelList:[],
    data: {
        id:'',
        account:'',
        counter_channel_id:'',
        name:{
            'zh-CN':'',
            en:'',
            tc:''
        },
        scene_list:[]
    },
    rules: {
        counter_channel_id:[{ required: true, message: t('account.update.5umxuovq07c0') }],
        account:[{ required: true, message: t('account.update.5umxuovq02s0') }],
        scene_list:[{ required: true,type:'array', message: t('account.update.5umxuovq0is0') }],
        'name.zh-CN':[{ required: true, message: t('account.update.5umxuovpzn40') }],
        'name.en':[{ required: true, message: t('account.update.5umxuovpzsg0') }],
        'name.tc':[{ required: true, message: t('account.update.5umxuovpzx00') }]
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiTrs.channelAccountUpdate({
        data: {
            ...form.data
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const getData = async () => {
    const { code, data } = await apiTrs.channelAccountInfo({
        id:route.params?.id,
    })
    if (code != 1) return;
    for (let key in form.data){
        if(key == 'scene_list'){
            form.data.scene_list = data.scene_list?.map((item:any)=>item.counter_channel_scene)
        }else{
            form.data[key] = data[key]
        }
    }
}
const getCounterChannelList = async () => {
    const { code, data } = await apiTrs.counterChannelList()
    if (code != 1) return;
    form.counterChannelList = data?.list
}
{
    getData()
    getCounterChannelList()
}
</script>