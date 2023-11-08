<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">
                <a-form-item field="title.zh-CN" :label="$t('info.update.5ukfc62vi380')">
                    <a-input  v-model="form.data.title['zh-CN']" :placeholder="$t('info.update.5ukfc62vjtc0')" />
                </a-form-item>
                <a-form-item field="title.en" :label="$t('info.update.5ukfc62vk5c0')">
                    <a-input  v-model="form.data.title.en" :placeholder="$t('info.update.5ukfc62vkds0')"  />
                </a-form-item>
                <a-form-item field="title.tc" :label="$t('info.update.5ukfc62vkk00')">
                    <a-input  v-model="form.data.title.tc" :placeholder="$t('info.update.5ukfc62vku00')"  />
                </a-form-item>
                <a-form-item field="content.zh-CN" :label="$t('info.update.5ukfc62vl0c0')">
                    <editor v-model:html="form.data.content['zh-CN']"></editor>
                </a-form-item>
                <a-form-item field="content.en" :label="$t('info.update.5ukfc62vl680')">
                    <editor v-model:html="form.data.content.en"></editor>
                </a-form-item>
                <a-form-item field="content.tc" :label="$t('info.update.5ukfc62vlic0')">
                    <editor v-model:html="form.data.content.tc"></editor>
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="resetBtn">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('info.update.5ukfc62vlo80')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('info.update.5ukfc62vlsg0')}}
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
        'title.zh-CN': [{ required: true, message: t('info.update.5ukfc62vjtc0') }],
        'title.en': [{ required: true, message: t('info.update.5ukfc62vkds0') }],
        'title.tc': [{ required: true, message: t('info.update.5ukfc62vku00') }],
        'content.zh-CN': [{ required: true, message: t('info.update.5ukfc62vlz00') }],
        'content.en': [{ required: true, message: t('info.update.5ukfc62vm5k0') }],
        'content.tc': [{ required: true, message: t('info.update.5ukfc62vme40') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiCms.cmsAdvPageUpdate({
        pageId:route.params?.id,
        data: {
            ...form.data,
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsAdvPageDetail({
        pageId:route.params?.id
    })
    if (code != 1) return;
    for (let key in form.data){
        form.data[key] = data[key]
    }
}
{
    getData()
}
const resetBtn = ()=>{
    getData()
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