<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">
                <a-form-item field="type_id" :label="$t('problem.create.5ukdlgtwjus0')">
                    <a-select allow-clear v-model="form.data.type_id" :placeholder="$t('problem.create.5ukdlgu05iw0')">
                        <a-option v-for="item in helpQuestionTypeList" :value="item.id">{{
                            item.name }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="sort" :label="$t('problem.create.5ukdlgu05sw0')">
                    <a-input-number  :style="{width:'220px'}" :placeholder="$t('problem.create.5ukdlgu05x80')" v-model="form.data.sort"  mode="button" class="input-demo" />
                </a-form-item>
                <a-form-item field="title.zh-CN" :label="$t('problem.create.5ukdlgu061k0')">
                    <a-input  v-model="form.data.title['zh-CN']" :placeholder="$t('problem.create.5ukdlgu06700')" />
                </a-form-item>
                <a-form-item field="title.en" :label="$t('problem.create.5ukdlgu06b80')">
                    <a-input  v-model="form.data.title.en" :placeholder="$t('problem.create.5ukdlgu06fk0')"  />
                </a-form-item>
                <a-form-item field="title.tc" :label="$t('problem.create.5ukdlgu06jw0')">
                    <a-input  v-model="form.data.title.tc" :placeholder="$t('problem.create.5ukdlgu06og0')"  />
                </a-form-item>
                <a-form-item field="content.zh-CN" :label="$t('problem.create.5ukdlgu06ss0')">
                    <editor v-model:html="form.data.content['zh-CN']"></editor>
                </a-form-item>
                <a-form-item field="content.en" :label="$t('problem.create.5ukdlgu06xc0')">
                    <editor v-model:html="form.data.content.en"></editor>
                </a-form-item>
                <a-form-item field="content.tc" :label="$t('problem.create.5ukdlgu071c0')">
                    <editor v-model:html="form.data.content.tc"></editor>
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="resetBtn">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('problem.create.5ukdlgu075g0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('problem.create.5ukdlgu079o0')}}
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
        'title.zh-CN': [{ required: true, message: t('problem.create.5ukdlgu06700') }],
        'title.en': [{ required: true, message: t('problem.create.5ukdlgu06fk0') }],
        'title.tc': [{ required: true, message: t('problem.create.5ukdlgu06og0') }],
        'content.zh-CN': [{ required: true, message: t('problem.create.5ukdlgu07dk0') }],
        'content.en': [{ required: true, message: t('problem.create.5ukdlgu07hs0') }],
        'content.tc': [{ required: true, message: t('problem.create.5ukdlgu07lk0') }],
        name: [{ required: true, message: t('problem.create.5ukdlgu07pg0') }],
        type_id: [{ required: true, type: 'array', message: t('problem.create.5ukdlgu07u40') }],
        sort:[{ required: true, type: 'array', message: t('problem.create.5ukdlgu08000') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiCms.cmsHelpQuestionCreate({
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
const resetBtn = ()=>{
    form.data ={
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