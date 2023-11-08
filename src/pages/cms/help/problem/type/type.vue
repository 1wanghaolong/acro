<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('type.type.5ukdx6qwh000')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('type.type.5ukdx6qwpyg0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('type.type.5ukdx6qwq5o0')">
                                <a-select allow-clear v-model="searchInfo.data.type"
                                    :placeholder="$t('type.type.5ukdx6qwq8k0')">
                                    <a-option v-for="item in useEnums('cms.help.problem.type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('type.type.5ukdx6qwqb80')">
                                <a-select allow-clear v-model="searchInfo.data.status"
                                    :placeholder="$t('type.type.5ukdx6qwq8k0')">
                                    <a-option v-for="item in useEnums('cms.help.problem.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div class="buttonBox">
                <a-space :size="18">
                    <a-button @click="searchInfo.show = !searchInfo.show">
                        <template #icon>
                            <icon-filter />
                        </template>
                        {{ searchInfo.show ? $t('type.type.5ukdx6qwqe40') : $t('type.type.5ukdx6qwqv80') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{ $t('type.type.5ukdx6qwyxk0') }}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{ $t('type.type.5ukdx6qwz4s0') }}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['cmsHelpQuestionTypeCreate']">
                    <a-button @click="showVisible = true, statusVisible = 1" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{ $t('type.type.5ukdx6qwzoo0') }}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column title="ID" data-index="id" :width="80"></a-table-column>
                        <a-table-column :title="$t('type.type.5ukdx6qwh000')" data-index="name"></a-table-column>
                        <a-table-column :title="$t('type.type.5ukdx6qwq5o0')" data-index="type">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.help.problem.type', record.type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('type.type.5ukdx6qwqb80')" data-index="status" :ellipsis="true"
                            :tooltip="true">
                            <template #cell="{ record }">
                                <a-tag color="#00b42a" v-if="record.status == 1">{{
                                    useEnumsFormat('cms.help.problem.status', record.status) }}</a-tag>
                                <a-tag color="#f53f3f" v-else>{{ useEnumsFormat('cms.help.problem.status', record.status)
                                }}</a-tag>
                            </template>
                        </a-table-column>

                        <a-table-column
                            v-if="$permission(['cmsHelpProblemTypeDetail', 'cmsHelpQuestionTypeUpdate', 'cmsHelpQuestionTypeDelete'])"
                            fixed="right" :title="$t('type.type.5ukdx6qwzss0')" :width="local.lang=='en'?170:150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsHelpProblemTypeDetail'])"
                                        @click="router.push({ name: 'cmsHelpProblemTypeDetail', params: { id: record.id } })">{{ $t('type.type.5ukdx6qwzvk0') }}</a-link>
                                    <a-link v-if="$permission(['cmsHelpQuestionTypeUpdate'])"
                                        @click="updateBtn(record)">{{ $t('type.type.5ukdx6qwzxo0') }}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0') ">
                                        <a-link v-if="$permission(['cmsHelpQuestionTypeDelete'])"
                                            status="danger">{{ $t('type.type.5ukdx6qx0000') }}</a-link>
                                    </a-popconfirm>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </div>
            <div class="pagination">
                <a-pagination size="small" @change="getData" @page-size-change="getData"
                    v-model:current="searchInfo.data.page" v-model:page-size="searchInfo.data.per_page"
                    :total="tableData.count" show-total show-jumper show-page-size />
            </div>
        </a-card>
        <a-modal :mask-closable=false v-model:visible="showVisible" :on-before-ok="handleSubmit" @close="onCloseEdit">
            <template #title>
                {{ statusVisible == 1 ? $t('type.type.5ukdx6qx0240') : $t('type.type.5ukdx6qx0hg0') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-form-item field="type" :label="$t('type.type.5ukdx6qwq5o0')">
                        <a-select allow-clear v-model="form.data.type" :placeholder="$t('type.type.5ukdx6qwq8k0')">
                            <a-option v-for="item in useEnums('cms.help.problem.type')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="name.zh-CN" :label="$t('type.type.5ukdx6qx0kc0')">
                        <a-input v-model="form.data.name['zh-CN']" :placeholder="$t('type.type.5ukdx6qx0yk0')">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="name.en" :label="$t('type.type.5ukdx6qx1ds0')">
                        <a-input v-model="form.data.name['en']" :placeholder="$t('type.type.5ukdx6qx1g80')">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="name.tc" :label="$t('type.type.5ukdx6qx1jw0')">
                        <a-input v-model="form.data.name['tc']" :placeholder="$t('type.type.5ukdx6qx1nc0')">
                        </a-input>
                    </a-form-item>
                    <a-form-item :label="$t('type.type.5ukdx6qx1ps0')">
                        <a-switch :checked-value="1" :unchecked-value="0" v-model="form.data.status" />
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnums, useEnumsFormat } from '@/hooks/enums'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        name: '',
        type: '',
        status: '',
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
const getData = async () => {
    tableData.loading = true
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    const { code, data } = await apiCms.cmsHelpQuestionTypeList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
// 删除
const deleteBtn = async (val: any) => {
    const { code, msg } = await apiCms.cmsHelpQuestionTypeDelete({ 'typeIds': [val.id] })
    if (code != 1) return;
    Message.success({ content: msg })
    getData();
}
const formRef = ref()
const statusVisible = ref(1)
const showVisible = ref(false)
const form: any = reactive({
    data: {
        name: {
            'zh-CN': '',
            'en': '',
            'tc': ''
        },
        type: 0,
        status: 1,
        id: ''
    },
    rules: {
        'name.zh-CN': [{ required: true, message: t('type.type.5ukdx6qx1rk0') }],
        'name.en': [{ required: true, message: t('type.type.5ukdx6qx1tg0') }],
        'name.tc': [{ required: true, message: t('type.type.5ukdx6qx1v40') }],
        'type': [{ required: true, message: t('type.type.5ukdx6qx1ws0') }],
    }
})
const updateBtn = async (val: any) => {
    let obj: any = await getCmsHelpQuestionTypeInfo(val.id)
    for (let key in form.data) {
        form.data[key] = obj[key]
    }
    statusVisible.value = 2
    showVisible.value = true
}
const getCmsHelpQuestionTypeInfo = async (id: any) => {
    const { code, data } = await apiCms.cmsHelpQuestionTypeInfo({ typeId: id });
    if (code != 1) return;
    return data
}
const handleSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    if (form.data.id) {
        const { code, msg } = await apiCms.cmsHelpQuestionTypeUpdate({
            typeId: form.data.id,
            data: form.data
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    } else {
        const { code, msg } = await apiCms.cmsHelpQuestionTypeCreate({
            data: form.data
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    }

}
const onCloseEdit = () => {
    form.data = {
        name: {
            'zh-CN': '',
            'en': '',
            'tc': ''
        },
        type: 0,
        status: 1,
        id: ''
    }
    formRef.value.resetFields()
}

{
    getData()
}
</script>