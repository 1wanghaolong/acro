<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="type_id" :label="$t('problem.detail.5ukdqbk8kgw0')">
                                <a-select disabled allow-clear v-model="form.data.type_id" :placeholder="$t('problem.detail.5ukdqbk8too0')">
                                    <a-option v-for="item in helpQuestionTypeList" :value="item.id">{{
                                        item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="sort" :label="$t('problem.detail.5ukdqbk8tx00')">
                                <a-input-number disabled :style="{ width: '100%' }" :placeholder="$t('problem.detail.5ukdqbk8u1s0')"
                                    v-model="form.data.sort" mode="button" class="input-demo" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="title.zh-CN" :label="$t('problem.detail.5ukdqbk8u6g0')">
                                <a-input disabled v-model="form.data.title['zh-CN']" :placeholder="$t('problem.detail.5ukdqbk8uao0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="title.en" :label="$t('problem.detail.5ukdqbk8ufk0')">
                                <a-input disabled v-model="form.data.title.en" :placeholder="$t('problem.detail.5ukdqbk8uk00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="title.tc" :label="$t('problem.detail.5ukdqbk8uos0')">
                                <a-input disabled v-model="form.data.title.tc" :placeholder="$t('problem.detail.5ukdqbk8utk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="create_time" :label="$t('problem.detail.5ukdqbk8vds0')">
                                <a-input disabled v-model="form.data.create_time" :placeholder="$t('problem.detail.5ukdqbk8wdw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.zh-CN" :label="$t('problem.detail.5ukdqbk8wmw0')">
                                <div class="editorDis">
                                    <div v-html="form.data.content['zh-CN']"></div>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.en" :label="$t('problem.detail.5ukdqbk8x580')">
                                <div class="editorDis">
                                    <div v-html="form.data.content.en"></div>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.tc" :label="$t('problem.detail.5ukdqbk8x9s0')">
                                <div class="editorDis">
                                    <div v-html="form.data.content.tc"></div>
                                </div>
                            </a-form-item>
                        </a-col>
                        
                    </a-row>
                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        type_id: '',
        sort: 0,
        title: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        content: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        create_time: ''
    },
    rules: {}
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiCms.cmsHelpQuestionUpdate({
        questionId: route.params?.id,
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
const helpQuestionTypeList: any = ref([])
const getCmsHelpQuestionTypeList = async () => {
    const { code, data } = await apiCms.cmsHelpQuestionTypeList({})
    if (code != 1) return;
    helpQuestionTypeList.value = data.list
}
getCmsHelpQuestionTypeList()
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsHelpQuestionInfo({
        questionId: route.params?.id
    })
    if (code != 1) return;
    for (let key in form.data) {
        form.data[key] = data[key]
    }
    form.data['create_time'] = dayjs.unix(form.data['create_time']).format('YYYY-MM-DD HH:mm:ss')
}
{
    getData()
}
</script>
<style lang="less" scoped>
:deep(.arco-select-view-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper.arco-input-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper .arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}

.editorDis {
    padding: 4px 12px;
    width: 100%;
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
    border-radius: var(--border-radius-small);
    line-height: 1.5715;
}
</style>