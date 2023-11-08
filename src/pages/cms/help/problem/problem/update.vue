<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">
                <a-form-item field="type_id" :label="$t('problem.update.5ukdr7qzg9g0')">
                    <a-select allow-clear v-model="form.data.type_id" :placeholder="$t('problem.update.5ukdr7qzhik0')">
                        <a-option v-for="item in helpQuestionTypeList" :value="item.id">{{
                            item.name }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="sort" :label="$t('problem.update.5ukdr7qzhsc0')">
                    <a-input-number  :style="{width:'220px'}" :placeholder="$t('problem.update.5ukdr7qzhyo0')" v-model="form.data.sort"  mode="button" class="input-demo" />
                </a-form-item>
                <a-form-item field="title.zh-CN" :label="$t('problem.update.5ukdr7qzi3w0')">
                    <a-input  v-model="form.data.title['zh-CN']" :placeholder="$t('problem.update.5ukdr7qzj0k0')" />
                </a-form-item>
                <a-form-item field="title.en" :label="$t('problem.update.5ukdr7qzj840')">
                    <a-input  v-model="form.data.title.en" :placeholder="$t('problem.update.5ukdr7qzjdc0')"  />
                </a-form-item>
                <a-form-item field="title.tc" :label="$t('problem.update.5ukdr7qzjl80')">
                    <a-input  v-model="form.data.title.tc" :placeholder="$t('problem.update.5ukdr7qzjqc0')"  />
                </a-form-item>
                <a-form-item field="content.zh-CN" :label="$t('problem.update.5ukdr7qzjvc0')">
                    <editor v-model:html="form.data.content['zh-CN']"></editor>
                </a-form-item>
                <a-form-item field="content.en" :label="$t('problem.update.5ukdr7qzk180')">
                    <editor v-model:html="form.data.content.en"></editor>
                </a-form-item>
                <a-form-item field="content.tc" :label="$t('problem.update.5ukdr7qzk6g0')">
                    <editor v-model:html="form.data.content.tc"></editor>
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="resetBtn">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('problem.update.5ukdr7qzkvw0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('problem.update.5ukdr7qzlm80')}}
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
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form:any = reactive({
    show: false,
    loading: false,
    data: {
        type_id: '',
        sort: 0,
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
        'title.zh-CN': [{ required: true, message: t('problem.update.5ukdr7qzj0k0') }],
        'title.en': [{ required: true, message: t('problem.update.5ukdr7qzjdc0') }],
        'title.tc': [{ required: true, message: t('problem.update.5ukdr7qzjqc0') }],
        'content.zh-CN': [{ required: true, message: t('problem.update.5ukdr7qzltc0') }],
        'content.en': [{ required: true, message: t('problem.update.5ukdr7qzlz00') }],
        'content.tc': [{ required: true, message: t('problem.update.5ukdr7qzm400') }],
        name: [{ required: true, message: t('problem.update.5ukdr7qzm8k0') }],
        type_id: [{ required: true, type: 'array', message: t('problem.update.5ukdr7qzmfs0') }],
        sort:[{ required: true, type: 'array', message: t('problem.update.5ukdr7qzmmo0') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiCms.cmsHelpQuestionUpdate({
        questionId:route.params?.id,
        data: {
            ...form.data,
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
// 所有问题类型列表
const helpQuestionTypeList:any = ref([])
const getCmsHelpQuestionTypeList = async () => {
    const { code, data } = await apiCms.cmsHelpQuestionTypeList({})
    if (code != 1) return;
    helpQuestionTypeList.value = data.list
}
getCmsHelpQuestionTypeList()
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsHelpQuestionInfo({
        questionId:route.params?.id
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