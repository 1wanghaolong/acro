<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="name" :label="$t('subscribe.create.5umydt2apzc0')">
                    <a-input v-model="form.data.name" :placeholder="$t('subscribe.create.5umydt2ar6w0')" />
                </a-form-item>
                <a-form-item field="email" :label="$t('subscribe.create.5umydt2arg80')">
                    <a-input v-model="form.data.email" :placeholder="$t('subscribe.create.5umydt2aro00')" />
                </a-form-item>
                <a-form-item field="type" :label="$t('subscribe.create.5umydt2aru80')">
                    <a-select multiple allow-clear v-model="form.data.type" :placeholder="$t('subscribe.create.5umydt2as0k0')">
                        <a-option v-for="item in useEnums('trs.notice.subscribeMessage.type')" :value="item.value">{{
                            item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="formRef?.resetFields()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('subscribe.create.5umydt2as7k0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('subscribe.create.5umydt2ase00')}}
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
        email: '',
        name: '',
        type: []
    },
    rules: {
        email: [{ required: true, message: t('subscribe.create.5umydt2aro00') },{ type: 'email', message: t('subscribe.create.5umydt2asko0') }],
        name: [{ required: true, message: t('subscribe.create.5umydt2at1s0') }],
        type: [{ required: true, type: 'array', message: t('subscribe.create.5umydt2as0k0') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiTrs.messageSubscribeCreate({
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
</script>