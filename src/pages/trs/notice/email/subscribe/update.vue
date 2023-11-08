<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="name" :label="$t('subscribe.update.5umyewuqfnw0')">
                    <a-input v-model="form.data.name" :placeholder="$t('subscribe.update.5umyewuqgc00')" />
                </a-form-item>
                <a-form-item field="email" :label="$t('subscribe.update.5umyewuqghg0')">
                    <a-input v-model="form.data.email" :placeholder="$t('subscribe.update.5umyewuqgko0')" />
                </a-form-item>
                <a-form-item field="type" :label="$t('subscribe.update.5umyewuqgng0')">
                    <a-select multiple allow-clear v-model="form.data.type" :placeholder="$t('subscribe.update.5umyewuqgq80')">
                        <a-option v-for="item in useEnums('trs.notice.subscribeMessage.type')" :value="item.value">{{
                            item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="getData()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('subscribe.update.5umyewuqgtc0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('subscribe.update.5umyewuqgvo0')}}
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
const form:any = reactive({
    show: false,
    loading: false,
    data: {
        email: '',
        name: '',
        type: []
    },
    rules: {
        email: [{ required: true, message: t('subscribe.update.5umyewuqgko0') },{ type: 'email', message: t('subscribe.update.5umyewuqgz00') }],
        name: [{ required: true, message: t('subscribe.update.5umyewuqh2o0') }],
        type: [{ required: true, type: 'array', message: t('subscribe.update.5umyewuqgq80') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiTrs.messageSubscribeUpdate({
        id:route.params?.id,
        data: {
            ...form.data,
            type:form.data.type?.join()
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const getData = async () => {
    const { code, data } = await apiTrs.messageSubscribeInfo({
        id:route.params?.id,
    })
    if (code != 1) return;
    form.data = data
    form.data.type = data.type?.split(',')
    let subscribeMessage = []
    if (data.type.indexOf('risk_control_notice') != -1) {
        subscribeMessage.push('risk_control_notice')
    }
    if (data.type.indexOf('not_upload_create_odd_lot_order') != -1) {
        subscribeMessage.push('not_upload_create_odd_lot_order')
    }
    form.data.type = subscribeMessage
}
{
    getData()
}
</script>