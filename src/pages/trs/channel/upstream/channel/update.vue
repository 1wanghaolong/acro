<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="name.zh-CN" :label="$t('channel.update.5umxufip3og0')">
                    <a-input v-model="form.data.name['zh-CN']" :placeholder="$t('channel.update.5umxufip4b40')" />
                </a-form-item>
                <a-form-item field="name.en" :label="$t('channel.update.5umxufip4j40')">
                    <a-input v-model="form.data.name.en" :placeholder="$t('channel.update.5umxufip4og0')" />
                </a-form-item>
                <a-form-item field="name.tc" :label="$t('channel.update.5umxufip4t80')">
                    <a-input v-model="form.data.name.tc" :placeholder="$t('channel.update.5umxufip4y40')" />
                </a-form-item>
                <a-form-item field="channel" :label="$t('channel.update.5umxufip5300')">
                    <a-select allow-clear v-model="form.data.channel" :placeholder="$t('channel.update.5umxufip57c0')">
                        <a-option v-for="item in useEnums('trs.channel.channel')"
                            :value="item.value">{{ item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="scene_list" :label="$t('channel.update.5umxufip5bs0')">
                    <a-select multiple allow-clear v-model="form.data.scene_list" :placeholder="$t('channel.update.5umxufip5gw0')">
                        <a-option v-for="item in useEnums('market.order.counter_channel_scene')"
                            :value="item.value">{{ item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="version" :label="$t('channel.update.5umxufip5ls0')">
                    <a-select allow-clear v-model="form.data.version" :placeholder="$t('channel.update.5umxufip5qc0')">
                        <a-option v-for="item in useEnums('trs.channel.version')"
                            :value="item.value">{{ item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="path" :label="`API${$t('channel.update.5unxdtizihc0')}`">
                    <a-input v-model="form.data.path" :placeholder="$t('channel.update.5umxufip5v80')" />
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="getData()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('channel.update.5umwzg9ozf40')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('channel.update.5umwzg9ozh00')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n();
const form = reactive({
    show: false,
    loading: false,
    data: {
        channel:'',
        version:'',
        path:'',
        name:{
            'zh-CN':'',
            en:'',
            tc:''
        },
        scene_list:[]
    },
    rules: {
        path: [{ required: true, message: t('channel.update.5umxufip5v80') }],
        version: [{ required: true, message: t('channel.update.5umxufip60g0') }],
        channel:[{ required: true, message: t('channel.update.5umwzg9ozjo0') }],
        scene_list:[{ required: true,type:'array', message: t('channel.update.5umxufip5gw0') }],
        'name.zh-CN':[{ required: true, message: t('channel.update.5umxufip4b40') }],
        'name.en':[{ required: true, message: t('channel.update.5umxufip4og0') }],
        'name.tc':[{ required: true, message: t('channel.update.5umxufip4y40') }]
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiTrs.counterChannelUpdate({
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
    const { code, data } = await apiTrs.counterChannelInfo({
        id:route.params?.id,
    })
    if (code != 1) return;
    form.data = data
}
{
    getData()
}
</script>