
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('version.version.5uljmt94c0s0')">
                                <a-select allow-clear v-model="searchInfo.data.type" :placeholder="$t('version.version.5uljmt94flw0')">
                                    <a-option v-for="item in useEnums('system.version.type')" :value="item.value">{{
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
                        {{ searchInfo.show ? $t('version.version.5uljmt94ge00') : $t('version.version.5uljmt94gks0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('version.version.5uljmt94hys0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('version.version.5uljmt94i8g0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['systemVersionCreate']" @click="showVisibleCreate = true" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('version.version.5uljmt94igk0')}}
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
                        <a-table-column :title="$t('version.version.5uljmt94c0s0')" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('system.version.type', record.type) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('version.version.5uljmt94ipc0')" data-index="version" :width="100" ></a-table-column>
                        <a-table-column :title="$t('version.version.5uljmt94ivc0')" :width="260" data-index="content">
                            <template #cell="{ record }">
                                <p v-html="record.content"></p>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('version.version.5uljmt94j740')" :width="100">
                            <template #cell="{ record }">
                                <a-link v-if="record.download_type == 1" @click="toPath(record)">{{$t('version.version.5uljmt94jdo0')}}</a-link>
                                <a-link v-if="record.download_type == 2" @click="toPath(record)">{{$t('version.version.5uljmt94j740')}}</a-link>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('version.version.5uljmt94jmk0')" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('system.version.enforce', record.enforce) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('version.version.5uljmt94jss0')" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('system.version.status', record.status) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('version.version.5uljmt94jyo0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('version.version.5uljmt94k7o0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.update_time ? dayjs.unix(record.update_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.update_time ? dayjs.unix(record.update_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['systemVersionUpdate', 'systemVersionDelete'])" fixed="right"
                            :title="$t('version.version.5uljmt94kd40')" :width="100">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['systemVersionUpdate'])"
                                        @click="updateBtn(record)">{{$t('version.version.5uljmt94kis0')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0')">
                                        <a-link v-if="$permission(['systemVersionDelete'])" status="danger">{{$t('version.version.5uljmt94kr80')}}</a-link>
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
        <a-modal width="600px" :mask-closable=false v-model:visible="showVisibleCreate" :on-before-ok="handleCreateSubmit"
            @close="onClose">
            <template #title>
                {{ form.data.id ? $t('version.version.5uljmt94kis0') : $t('version.version.5uljmt94igk0') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="type" :label="$t('version.version.5uljmt94c0s0')">
                                <a-radio-group @change="changeBtn" v-model="form.data.type"
                                    :options="useEnums('system.version.type')">
                                    <template #label="{ data }">
                                        <p>{{ data.trans[local.lang] }}</p>
                                    </template>
                                </a-radio-group>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="version" :label="$t('version.version.5uljmt94ipc0')">
                                <a-input :placeholder="$t('version.version.5uljmt94kwo0')" v-model="form.data.version" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="download_type" :label="$t('version.version.5uljmt94l8o0')">
                                <a-select v-model="form.data.download_type" :placeholder="$t('version.version.5uljmt94flw0')">
                                    <a-option v-for="item in useEnums('system.version.download_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.download_type == 1" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="package" :label="$t('version.version.5uljmt94jdo0')">
                                <div style="width: 100%">
                                    <a-upload accept=".apk,.ipa" :limit="1" :on-before-upload="beforeUpload" draggable
                                        image-preview :auto-upload="true" v-model:file-list="form.data.package"
                                        :custom-request="(upload as any)">
                                    </a-upload>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.download_type == 2" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="link" :label="$t('version.version.5uljmt94j740')">
                                <a-input :placeholder="$t('version.version.5uljmt94lgw0')" v-model="form.data.link" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.zh-CN" :label="$t('version.version.5uljmt94ll00')">
                                <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content['zh-CN']"
                                    :placeholder="$t('version.version.5uljmt94lpc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.en" :label="$t('version.version.5uljmt94lsg0')">
                                <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content.en"
                                    :placeholder="$t('version.version.5uljmt94lv40')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="content.tc" :label="$t('version.version.5uljmt94lxs0')">
                                <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content.tc"
                                    :placeholder="$t('version.version.5uljmt94m0c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="enforce" :label="$t('version.version.5uljmt94jmk0')">
                                <a-select v-model="form.data.enforce" :placeholder="$t('version.version.5uljmt94flw0')">
                                    <a-option v-for="item in useEnums('system.version.enforce')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="status" :label="$t('version.version.5uljmt94jss0')">
                                <a-select v-model="form.data.status" :placeholder="$t('version.version.5uljmt94flw0')">
                                    <a-option v-for="item in useEnums('system.version.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>

                    </a-row>

                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        type: '',
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
    const { code, data } = await apiSystem.systemVersionList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}


const formRef = ref()
const form: any = reactive({
    data: {
        version: '',
        type: 1,
        content: {
            'zh-CN': '',
            'en': '',
            'tc': '',
        },
        enforce: '',
        status: '',
        link: '',
        download_type: '',
        package: [],
    },
    rules: {
        type: [{ required: true, message: t('version.version.5uljmt94m300') }],
        version: [{ required: true, message: t('version.version.5uljmt94kwo0') }],
        enforce: [{ required: true, message: t('version.version.5uljmt94flw0') }],
        download_type: [{ required: true, message: t('version.version.5uljmt94m5g0') }],
        status: [{ required: true, message: t('version.version.5uljmt94mbk0') }],
        link: [{ required: true, message: t('version.version.5uljmt94lgw0') }],
        package: [{ required: true, message: t('version.version.5uljmt94me40') }],
        'content.zh-CN': [{ required: true, message: t('version.version.5uljmt94lpc0') }],
        'content.en': [{ required: true, message: t('version.version.5uljmt94lv40') }],
        'content.tc': [{ required: true, message: t('version.version.5uljmt94m0c0') }],
    }
})
const onClose = async () => {
    form.data = {
        version: '',
        type: 1,
        content: {
            'zh-CN': '',
            'en': '',
            'tc': '',
        },
        enforce: '',
        status: '',
        link: [],
        download_type: '',
        package: [],
    }
    formRef.value.resetFields()
}
const updateBtn = async (val: any) => {
    let obj: any = await getDetail(val.id)
    for (let key in form.data) {
        form.data[key] = obj[key]
    }
    if (obj.download_type == 1) {
        form.data.package = [{
            uid: '1',
            name: obj.link,
            url: obj.link,
            response: {
                url: obj.link,
            }
        }]
        form.data.link = ''
    } else if (obj.download_type == 2) {
        form.data.link = obj.link
        form.data.package = []
    }

    form.data.id = val.id
    showVisibleCreate.value = true
}
const getDetail = async (id: any) => {
    const { code, data } = await apiSystem.systemVersionInfo({ versionId: id });
    if (code != 1) return;
    return data
}
// 新增
const showVisibleCreate = ref(false)
const handleCreateSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    let params = { ...form.data }
    if (params.download_type == 1) {
        if (!form.data.package[0]?.response?.url) {
            formRef.value.setFields({
                package: {
                    status: 'error',
                    message: t('version.version.5uljmt94mhc0')
                }
            })
            return false
        }
        params.link = form.data.package[0]?.response?.url
    } else if (params.download_type == 2) {
        form.data.link = form.data.link
    }
    delete params.package
    if (form.data.id) {
        const { code, msg } = await apiSystem.systemVersionUpdate({
            versionId: form.data.id,
            data: params
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    } else {
        const { code, msg } = await apiSystem.systemVersionCreate({
            data: params
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    }

}
const toPath = (val: any) => {
    // ​https://app.distribute.dev.linknet.ltd/app.php/63fd54e5bb7d1
    // https://app.distribute.dev.linknet.ltd/app.php/63fd54e5bb7d1
    window.open(val.link, '_blank');
}

// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiSystem.systemVersionDeletel({ 'versionIds': [val.id] })
    if (code != 1) return;
    getData();
}
const beforeUpload = (file: any): any => {
    return new Promise((resolve) => {
        if (file.name.includes('.apk') || file.name.includes('.ipa')) {
            resolve(true)
        } else {
            Message.info(t('version.version.5uljmt94mk80'))
        }
    });
};
const upload = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const formData = new FormData()
    formData.append('file', fileItem.file)
    const { code, data } = await apiSystem.upload(formData)
    if (code != 1) return onError();
    onSuccess(data);
}
const changeBtn = (val: any) => {
    console.log(val);

    // if (val == 1) {
    //     form.data.link = []
    // } else if (val == 2) {
    //     form.data.link = ''
    // }

}


{
    getData()
}
</script>
<style scoped lang="less">
:deep(.arco-typography) {
    margin-bottom: 0;
}

:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>