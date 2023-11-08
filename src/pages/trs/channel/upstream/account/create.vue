<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="name.zh-CN" :label="$t('account.create.5umxuzozaow0')">
                    <a-input v-model="form.data.name['zh-CN']" :placeholder="$t('account.create.5umxuzozb780')" />
                </a-form-item>
                <a-form-item field="name.en" :label="$t('account.create.5umxuzozbao0')">
                    <a-input v-model="form.data.name.en" :placeholder="$t('account.create.5umxuzozbco0')" />
                </a-form-item>
                <a-form-item field="name.tc" :label="$t('account.create.5umxuzozbf40')">
                    <a-input v-model="form.data.name.tc" :placeholder="$t('account.create.5umxuzozbgw0')" />
                </a-form-item>
                <a-form-item field="account" :label="$t('account.create.5um3f9vb91s0')">
                    <a-input v-model="form.data.account" :placeholder="$t('account.create.5um3f9vb9jg0')" />
                </a-form-item>
                <a-form-item allow-search field="counter_channel_id" :label="$t('account.create.5umxuzozbis0')">
                    <a-select @change="form.data.scene_list = []" allow-clear v-model="form.data.counter_channel_id" :placeholder="$t('account.create.5umxuzozbl00')">
                        <a-option v-for="item in (form.counterChannelList as any)" :value="item.id">{{
                            item.name }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="scene_list" :label="$t('account.create.5umxuzozbn00')">
                    <a-select multiple allow-clear v-model="form.data.scene_list" :placeholder="!form.data.counter_channel_id? $t('account.create.5unxasrnums0') : $t('account.create.5umxuzozbp00') ">
                        <a-option v-for="item in (form.counterChannelList as any)?.find((i:any)=>i.id == form.data.counter_channel_id)?.scene_list"  :value="item">
                        {{ useEnumsFormat('market.order.counter_channel_scene',item) }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="formRef?.resetFields()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('account.create.5um3f9vbb7k0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('account.create.5um3f9vbb9s0')}}
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
const form = reactive({
    show: false,
    loading: false,
    counterChannelList:[],
    data: {
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
        counter_channel_id:[{ required: true, message: t('account.create.5umxuzozbl00') }],
        account:[{ required: true, message: t('account.create.5um3f9vb9jg0') }],
        scene_list:[{ required: true,type:'array', message: t('account.create.5umxuzozbp00') }],
        'name.zh-CN':[{ required: true, message: t('account.create.5umxuzozb780') }],
        'name.en':[{ required: true, message: t('account.create.5umxuzozbco0') }],
        'name.tc':[{ required: true, message: t('account.create.5umxuzozbgw0') }]
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiTrs.channelAccountCreate({
        data: {
            ...form.data
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const getCounterChannelList = async () => {
    const { code, data } = await apiTrs.counterChannelList()
    if (code != 1) return;
    form.counterChannelList = data?.list
}
{
    getCounterChannelList()
}
</script>