<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="name.zh-CN" :label="$t('channel.create.5umxu5gvvhk0')">
                    <a-input v-model="form.data.name['zh-CN']" :placeholder="$t('channel.create.5umxu5gvvys0')" />
                </a-form-item>
                <a-form-item field="name.en" :label="$t('channel.create.5umxu5gvw2s0')">
                    <a-input v-model="form.data.name.en" :placeholder="$t('channel.create.5umxu5gvw600')" />
                </a-form-item>
                <a-form-item field="name.tc" :label="$t('channel.create.5umxu5gvw8w0')">
                    <a-input v-model="form.data.name.tc" :placeholder="$t('channel.create.5umxu5gvwco0')" />
                </a-form-item>
                <a-form-item field="channel" :label="$t('channel.create.5umxu5gvwfg0')">
                    <a-select allow-clear v-model="form.data.channel" :placeholder="$t('channel.create.5umxu5gvwhs0')">
                        <a-option v-for="item in useEnums('trs.channel.channel')"
                            :value="item.value">{{ item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="scene_list" :label="$t('channel.create.5umxu5gvwkk0')">
                    <a-select multiple allow-clear v-model="form.data.scene_list" :placeholder="$t('channel.create.5umxu5gvwn00')">
                        <a-option v-for="item in useEnums('market.order.counter_channel_scene')"
                            :value="item.value">{{ item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="version" :label="$t('channel.create.5umxu5gvwpg0')">
                    <a-select allow-clear v-model="form.data.version" :placeholder="$t('channel.create.5umxu5gvws80')">
                        <a-option v-for="item in useEnums('trs.channel.version')"
                            :value="item.value">{{ item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="path" :label="`API${$t('channel.create.5unxd82aupw0')}`">
                    <a-input v-model="form.data.path" :placeholder="$t('channel.create.5umxu5gvwus0')" />
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="formRef?.resetFields()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('channel.create.5umwz1309440')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('channel.create.5umwz13096k0')}}
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
const { t } = useI18n();
const formRef = ref()
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
        path: [{ required: true, message: t('channel.create.5umxu5gvwus0') }],
        version: [{ required: true, message: t('channel.create.5umxu5gvwxw0') }],
        channel:[{ required: true, message: t('channel.create.5umwz1309900') }],
        scene_list:[{ required: true,type:'array', message: t('channel.create.5umxu5gvwn00') }],
        'name.zh-CN':[{ required: true, message: t('channel.create.5umxu5gvvys0') }],
        'name.en':[{ required: true, message: t('channel.create.5umxu5gvw600') }],
        'name.tc':[{ required: true, message: t('channel.create.5umxu5gvwco0') }]
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiTrs.counterChannelCreate({
        data: {
            ...form.data
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
</script>