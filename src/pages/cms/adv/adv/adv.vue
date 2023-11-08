<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">

            </div>
            <div class="buttonBox">
                <a-space :size="18">
                    <a-button @click="getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('adv.adv.5ukezopqrr80')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['cmsHelpProblemCreate']">
                    <a-button @click="showVisible = true, statusVisible = 1" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('adv.adv.5ukezopqszw0')}}
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
                        <a-table-column :title="$t('adv.adv.5ukezopqt7g0')" data-index="title">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.adv.adv.type', record.type) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('adv.adv.5ukezopqtcs0')">
                            <template #cell="{ record }">
                                <a-image width="40" height="40" :src="record.image" v-if="record.image">
                                    <template #loader>
                                        <img width="40" :src="record.image" style="filter: blur(5px)" />
                                    </template>
                                </a-image>
                                <div v-else>{{ '' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('adv.adv.5ukezopqti80')">
                            <template #cell="{ record }">
                                <div>{{ record.start_time ? dayjs.unix(record.start_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.start_time ? dayjs.unix(record.start_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('adv.adv.5ukezopqtms0')">
                            <template #cell="{ record }">
                                <div>{{ record.end_time ? dayjs.unix(record.end_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.end_time ? dayjs.unix(record.end_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('adv.adv.5ukezopqtro0')">
                            <template #cell="{ record }">
                                <span v-if="$permission(['cmsInfoAdvUpdateStatus'])">
                                    <a-switch v-permission="['cmsInfoAdvUpdateStatus']" size="small"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('cms.adv.adv.status', record.status) }}
                                </span>
                            </template>

                        </a-table-column>
                        <a-table-column v-if="$permission(['cmsAdvDetail', 'cmsInfoAdvUpdate', 'cmsInfoAdvDelete'])"
                            fixed="right" :title="$t('adv.adv.5ukezopqtys0')" :width="local.lang=='en'?170:150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsAdvDetail'])"
                                        @click="router.push({ name: 'cmsAdvDetail', params: { id: record.id } })">{{$t('adv.adv.5ukezopqu4g0')}}</a-link>
                                    <a-link v-if="$permission(['cmsInfoAdvUpdate'])" @click="updateBtn(record)">{{$t('adv.adv.5ukezopqu9w0')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0') ">
                                        <a-link v-if="$permission(['cmsInfoAdvDelete'])" status="danger">{{$t('adv.adv.5ukezopque80')}}</a-link>
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
        <a-modal width="600px" :mask-closable=false v-model:visible="showVisible" :on-before-ok="handleSubmit"
            @close="onCloseEdit">
            <template #title>
                {{ statusVisible == 1 ? $t('adv.adv.5ukezopquj80') : $t('adv.adv.5ukezopquq40') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="type" :label="$t('adv.adv.5ukezopqt7g0')">
                                <a-select allow-clear v-model="form.data.type" :placeholder="$t('adv.adv.5ukezopqvvo0')">
                                    <a-option v-for="item in useEnums('cms.adv.adv.type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="image.zh-CN" :label="$t('adv.adv.5ukezopqw6o0')">
                                <div v-if="showVisible" style="width: 100%">
                                    <a-upload list-type="picture" :limit="1" :on-before-upload="beforeUpload"
                                        accept=".png,.jpg,.jpeg,.gif" draggable image-preview :auto-upload="true"
                                        v-model:file-list="form.data.image['zh-CN']" :custom-request="(upload as any)">
                                        <template #upload-item="imgs">
                                            <div style="height: 165px;">
                                                <a-image :src="imgs['fileItem']?.response?.url" height="90%"
                                                    style="vertical-align: top;" :preview-visible="visible1"
                                                    footer-position="outer"
                                                    @preview-visible-change="() => { visible1 = false }">
                                                    <template #extra>
                                                        <div class="actions actions-outer">
                                                            <span class="action"
                                                                @click="() => { visible1 = true }"><icon-eye /></span>
                                                            <span class="action"
                                                                @click="form.data.image['zh-CN'] = []"><icon-delete /></span>
                                                        </div>
                                                    </template>
                                                </a-image>
                                            </div>
                                        </template>
                                    </a-upload>
                                    <p>{{$t('adv.adv.5ukezopqwbk0')}}</p>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="image.en" :label="$t('adv.adv.5ukezopqwig0')">
                                <div v-if="showVisible" style="width: 100%">
                                    <a-upload list-type="picture" :limit="1" :on-before-upload="beforeUpload"
                                        accept=".png,.jpg,.jpeg,.gif" draggable image-preview :auto-upload="true"
                                        v-model:file-list="form.data.image['en']" :custom-request="(upload as any)">
                                        <template #upload-item="imgs">
                                            <div style="height: 165px;">
                                                <a-image :src="imgs['fileItem']?.response?.url" height="90%"
                                                    style="vertical-align: top;" :preview-visible="visible2"
                                                    footer-position="outer"
                                                    @preview-visible-change="() => { visible2 = false }">
                                                    <template #extra>
                                                        <div class="actions actions-outer">
                                                            <span class="action"
                                                                @click="() => { visible2 = true }"><icon-eye /></span>
                                                            <span class="action"
                                                                @click="form.data.image['en'] = []"><icon-delete /></span>
                                                        </div>
                                                    </template>
                                                </a-image>
                                            </div>
                                        </template>
                                    </a-upload>
                                    <p>{{$t('adv.adv.5ukezopqwbk0')}}</p>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="image.tc" :label="$t('adv.adv.5ukezopqwo80')">
                                <div v-if="showVisible" style="width: 100%">
                                    <a-upload list-type="picture" :limit="1" :on-before-upload="beforeUpload"
                                        accept=".png,.jpg,.jpeg,.gif" draggable image-preview :auto-upload="true"
                                        v-model:file-list="form.data.image['tc']" :custom-request="(upload as any)">
                                        <template #upload-item="imgs">
                                            <div style="height: 165px;">
                                                <a-image :src="imgs['fileItem']?.response?.url" height="90%"
                                                    style="vertical-align: top;" :preview-visible="visible3"
                                                    footer-position="outer"
                                                    @preview-visible-change="() => { visible3 = false }">
                                                    <template #extra>
                                                        <div class="actions actions-outer">
                                                            <span class="action"
                                                                @click="() => { visible3 = true }"><icon-eye /></span>
                                                            <span class="action"
                                                                @click="form.data.image['tc'] = []"><icon-delete /></span>
                                                        </div>
                                                    </template>
                                                </a-image>
                                            </div>
                                        </template>
                                    </a-upload>
                                    <p>{{$t('adv.adv.5ukezopqwbk0')}}</p>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="need_login" :label="$t('adv.adv.5ukezopqwuk0')">
                                <a-select allow-clear v-model="form.data.need_login" :placeholder="$t('adv.adv.5ukezopqvvo0')">
                                    <a-option v-for="item in useEnums('cms.adv.adv.need')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item v-if="form.data.need_login" field="link_url" :label="$t('adv.adv.5ukezopqx0k0')">
                                <a-input v-model="form.data.link_url" :placeholder="$t('adv.adv.5ukezopqx640')">
                                </a-input>
                            </a-form-item>
                            <a-form-item v-else :label="$t('adv.adv.5ukezopqx0k0')">
                                <a-input v-model="form.data.link_url" :placeholder="$t('adv.adv.5ukezopqx640')">
                                </a-input>
                            </a-form-item>
                        </a-col>

                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="start_time" :label="$t('adv.adv.5ukezopqti80')">
                                <a-date-picker value-format="x" style="width:100%" show-time v-model="form.data.start_time"
                                    :placeholder="$t('adv.adv.5ukezopqti80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="end_time" :label="$t('adv.adv.5ukezopqtms0')">
                                <a-date-picker value-format="x" style="width:100%" show-time v-model="form.data.end_time"
                                    :placeholder="$t('adv.adv.5ukezopqtms0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('adv.adv.5ukezopqxag0')">
                                <a-switch :checked-value="1" :unchecked-value="0" v-model="form.data.status" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnums, useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const router = useRouter()
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const searchInfo = reactive({
    show: false,
    data: {
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
    const { code, data } = await apiCms.cmsInfoAdvList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const formRef = ref()
const statusVisible = ref(1)
const showVisible = ref(false)
const validatorTime = (value: any, cb: any) => {
    // let time = Number(Number(+new Date()).toString().substr(0, 10))
    if (form.data.start_time > value) {
        cb(t('adv.adv.5ukezopqxg80'))
    } else if (value <= new Date().getTime()) {
        cb(t('adv.adv.5ukezopqxks0'))
    } else {
        return true
    }
}
const form: any = reactive({
    data: {
        type: 1,
        image: {
            'zh-CN': '',
            'en': '',
            'tc': ''
        },
        link_url: '',
        start_time: '',
        end_time: '',
        need_login: 0,
        status: 1,
        id: ''
    },
    rules: {
        'image.zh-CN': [{ required: true, message: t('adv.adv.5ukezopqxp00') }],
        'image.en': [{ required: true, message: t('adv.adv.5ukezopqxuw0') }],
        'image.tc': [{ required: true, message: t('adv.adv.5ukezopqxz40') }],
        'type': [{ required: true, message: t('adv.adv.5ukezopqy280') }],
        'link_url': [{ required: true, message: t('adv.adv.5ukezopqx640') }],
        'start_time': [{ required: true, message: t('adv.adv.5ukezopqy5s0') }],
        'end_time': [{ required: true, message: t('adv.adv.5ukezopqy940') }, { validator: validatorTime }],
        'need_login': [{ required: true, message: t('adv.adv.5ukezopqyeg0') }],
    }
})
const updateBtn = async (val: any) => {
    let obj: any = await getCmsInfoAdvDetail(val.id)
    for (let key in form.data) {
        form.data[key] = obj[key]
    }
    form.data.image['zh-CN'] = [{
        uid: '1',
        name: obj.image['zh-CN'],
        url: obj.image['zh-CN'],
        response: {
            url: obj.image['zh-CN'],
        }
    }]
    form.data.image['en'] = [{
        uid: '1',
        name: obj.image['en'],
        url: obj.image['en'],
        response: {
            url: obj.image['en'],
        }
    }]
    form.data.image['tc'] = [{
        uid: '1',
        name: obj.image['tc'],
        url: obj.image['tc'],
        response: {
            url: obj.image['tc'],
        }
    }]
    form.data['end_time'] = form.data['end_time'] * 1000
    form.data['start_time'] = form.data['start_time'] * 1000
    statusVisible.value = 2
    showVisible.value = true
}
const getCmsInfoAdvDetail = async (id: any) => {
    const { code, data } = await apiCms.cmsInfoAdvDetail({ advId: id });
    if (code != 1) return;
    return data
}
const handleSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    let param = JSON.parse(JSON.stringify(form.data))
    if (form.data.image['zh-CN'][0]?.response?.url) {
        param.image['zh-CN'] = form.data.image['zh-CN'][0]?.response?.url
    } else if (form.data.image['zh-CN'][0]?.url) {
        param.image['zh-CN'] = form.data.image['zh-CN'][0]?.url
    }
    if (form.data.image['en'][0]?.response?.url) {
        param.image['en'] = form.data.image['en'][0]?.response?.url
    } else if (form.data.image['en'][0]?.url) {
        param.image['en'] = form.data.image['en'][0]?.url
    }
    if (form.data.image['tc'][0]?.response?.url) {
        param.image['tc'] = form.data.image['tc'][0]?.response?.url
    } else if (form.data.image['tc'][0]?.url) {
        param.image['tc'] = form.data.image['tc'][0]?.url
    }
    param['end_time'] = param['end_time'] / 1000
    param['start_time'] = param['start_time'] / 1000
    if (param.id) {
        const { code, msg } = await apiCms.cmsInfoAdvUpdate({
            advId: param.id,
            data: param
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    } else {
        const { code, msg } = await apiCms.cmsInfoAdvSave({
            data: param
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    }

}
const onCloseEdit = () => {
    form.data.image['zh-CN'] = ''
    form.data.image['en'] = ''
    form.data.image['tc'] = ''
    form.data = {
        type: 1,
        image: {
            'zh-CN': '',
            'en': '',
            'tc': ''
        },
        link_url: '',
        start_time: '',
        end_time: '',
        need_login: 0,
        status: 1,
        id: ''
    }

    formRef.value.resetFields()
}

// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiCms.cmsInfoAdvDelete({ 'advIds': [val.id] })
    if (code != 1) return;
    getData();
}
const handleChangeIntercept = async (val: any) => {
    let obj: any = await getCmsInfoAdvDetail(val.id)
    obj.status = val.status
    const { code, msg } = await apiCms.cmsInfoAdvUpdate({
        advId: obj.id,
        data: obj
    })
    if (code != 1) {
        val.status = val.status == 0 ? 1 : 0
        return
    }
    Message.success({ content: msg })
    getData();
}
const beforeUpload = (file: any): any => {
    return new Promise((resolve) => {
        console.log(file.type);

        if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            resolve(true)
        } else {
            Message.info(t('adv.adv.5ukezopqyiw0'))
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
// // 枚举列表
// const getSystemEnum = async () => {
//     const { code,data } = await apiSystem.systemEnum()
//     if (code != 1) return;
//     console.log(data);
// }
// getSystemEnum()

{
    getData()
}
</script>
<style lang="less" scoped>
.actions {
    display: flex;
    align-items: center;
}

.action {
    padding: 5px 4px;
    font-size: 14px;
    border-radius: 2px;
    line-height: 1;
    cursor: pointer;
}

.action:first-child {
    margin-left: 0;
}

.action:hover {
    background: rgba(0, 0, 0, .5);
}

:deep(.arco-image-footer-extra) {
    padding-left: 0;
}

:deep(.arco-image-img) {
    width: 100%;
}

.actions-outer {
    .action {
        &:hover {
            color: #ffffff;
        }
    }
}
</style>