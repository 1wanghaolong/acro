<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">
                <a-form-item field="title.zh-CN" :label="$t('info.create.5ukfavmcu340')">
                    <a-input  v-model="form.data.title['zh-CN']" :placeholder="$t('info.create.5ukfavmcv940')" />
                </a-form-item>
                <a-form-item field="title.en" :label="$t('info.create.5ukfavmcvek0')">
                    <a-input  v-model="form.data.title.en" :placeholder="$t('info.create.5ukfavmcvio0')"  />
                </a-form-item>
                <a-form-item field="title.tc" :label="$t('info.create.5ukfavmcvmw0')">
                    <a-input  v-model="form.data.title.tc" :placeholder="$t('info.create.5ukfavmcvpw0')"  />
                </a-form-item>
                <a-form-item field="content.zh-CN" :label="$t('info.create.5ukfavmcvs80')">
                    <editor v-model:html="form.data.content['zh-CN']"></editor>
                </a-form-item>
                <a-form-item field="content.en" :label="$t('info.create.5ukfavmcvuo0')">
                    <editor v-model:html="form.data.content.en"></editor>
                </a-form-item>
                <a-form-item field="content.tc" :label="$t('info.create.5ukfavmcvyw0')">
                    <editor v-model:html="form.data.content.tc"></editor>
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="resetBtn">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('info.create.5ukfavmcw3k0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('info.create.5ukfavmcw5s0')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-form>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
// import { useEnums } from '@/hooks/enums'
// const local = useLocal()
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form:any = reactive({
    show: false,
    loading: false,
    data: {
        title: {
            'zh-CN':'',
            en:'',
            tc:''
        },
        content:{
            'zh-CN':'',
            en:'',
            tc:''
        }
    },
    rules: {
        'title.zh-CN': [{ required: true, message: t('info.create.5ukfavmcv940') }],
        'title.en': [{ required: true, message: t('info.create.5ukfavmcvio0') }],
        'title.tc': [{ required: true, message: t('info.create.5ukfavmcvpw0') }],
        'content.zh-CN': [{ required: true, message: t('info.create.5ukfavmcw9o0') }],
        'content.en': [{ required: true, message: t('info.create.5ukfavmcwco0') }],
        'content.tc': [{ required: true, message: t('info.create.5ukfavmcwjk0') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiCms.cmsAdvPageSave({
        data: {
            ...form.data,
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const resetBtn = ()=>{
    form.data ={
        title: {
            'zh-CN':'',
            en:'',
            tc:''
        },
        content:{
            'zh-CN':'',
            en:'',
            tc:''
        }
    }
    formRef.value.resetFields()
}
</script>
<style lang="less" scoped>
:deep(.arco-select-view-disabled){
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}
:deep(.arco-input-wrapper.arco-input-disabled){
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}
:deep(.arco-input-wrapper .arco-input[disabled]){
    -webkit-text-fill-color: var(--color-text-1);
}
</style>