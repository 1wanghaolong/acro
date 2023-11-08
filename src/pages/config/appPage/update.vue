<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">
                <a-form-item field="type" :label="$t('appPage.update.5ukey5ajhig0')">
                    <a-select disabled allow-clear v-model="form.data.type" :placeholder="$t('appPage.update.5ukey5ajj0g0')">
                        <a-option v-for="item in useEnums('info.page.type')" :value="item.value">{{
                            item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="platform" :label="$t('appPage.update.5ukey5ajj900')">
                    <a-select disabled allow-clear v-model="form.data.platform" :placeholder="$t('appPage.update.5ukey5ajj0g0')">
                        <a-option v-for="item in useEnums('info.platform')" :value="item.value">{{
                            item.trans[local.lang] }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="title.zh-CN" :label="$t('appPage.update.5ukey5ajjes0')">
                    <a-input disabled v-model="form.data.title['zh-CN']" :placeholder="$t('appPage.update.5ukey5ajjk40')" />
                </a-form-item>
                <a-form-item field="title.en" :label="$t('appPage.update.5ukey5ajjq40')">
                    <a-input disabled v-model="form.data.title.en" :placeholder="$t('appPage.update.5ukey5ajjuw0')"  />
                </a-form-item>
                <a-form-item field="title.tc" :label="$t('appPage.update.5ukey5ajk2o0')">
                    <a-input disabled v-model="form.data.title.tc" :placeholder="$t('appPage.update.5ukey5ajk8c0')"  />
                </a-form-item>
                <a-form-item field="content.zh-CN" :label="$t('appPage.update.5ukey5ajkdo0')">
                    <editor v-model:html="form.data.content['zh-CN']"></editor>
                </a-form-item>
                <a-form-item field="content.en" :label="$t('appPage.update.5ukey5ajkiw0')">
                    <editor v-model:html="form.data.content.en"></editor>
                </a-form-item>
                <a-form-item field="content.tc" :label="$t('appPage.update.5ukey5ajknw0')">
                    <editor v-model:html="form.data.content.tc"></editor>
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="getData">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('appPage.update.5ukey5ajksw0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('appPage.update.5ukey5ajkyk0')}}
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
import { useEnums } from '@/hooks/enums'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form:any = reactive({
    show: false,
    loading: false,
    data: {
        type: '',
        platform: '',
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
        'title.zh-CN': [{ required: true, message: t('appPage.update.5ukey5ajjk40') }],
        'title.en': [{ required: true, message: t('appPage.update.5ukey5ajjuw0') }],
        'title.tc': [{ required: true, message: t('appPage.update.5ukey5ajk8c0') }],
        'content.zh-CN': [{ required: true, message: t('appPage.update.5ukey5ajl3c0') }],
        'content.en': [{ required: true, message: t('appPage.update.5ukey5ajl8c0') }],
        'content.tc': [{ required: true, message: t('appPage.update.5ukey5ajle80') }],
        name: [{ required: true, message: t('appPage.update.5ukey5ajlj00') }],
        type: [{ required: true, type: 'array', message: t('appPage.update.5ukey5ajlo80') }],
        platform:[{ required: true, type: 'array', message: t('appPage.update.5ukey5ajlss0') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiSystem.infoPagesUpdate({
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
const getData = async () => {
    const { code, data } = await apiSystem.infoPagesDetail({
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