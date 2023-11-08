<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">

            </div>
            <div class="buttonBox">
                <a-space :size="18">
                    <a-space :size="18">
                        <a-button @click="getData()">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            {{$t('open.open.5ukf3d5jzxc0')}}
                        </a-button>
                    </a-space>
                </a-space>
                <a-space :size="18" v-permission="['cmsScreenAdvSave']">
                    <a-button @click="showVisible = true, statusVisible = 1" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('open.open.5ukf3d5k0sg0')}}
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
                        <a-table-column :title="$t('open.open.5ukf3d5k0wc0')">
                            <template #cell="{ record }">
                                <a-image width="40" height="40" :src="record.image" v-if="record.image">
                                    <template #loader>
                                        <img width="40" :src="record.image" style="filter: blur(5px)" />
                                    </template>
                                </a-image>
                                <div v-else>{{ '' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('open.open.5ukf3d5k0z40')">
                            <template #cell="{ record }">
                                <div>{{ record.start_time ? dayjs.unix(record.start_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.start_time ? dayjs.unix(record.start_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('open.open.5ukf3d5k1180')">
                            <template #cell="{ record }">
                                <div>{{ record.end_time ? dayjs.unix(record.end_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.end_time ? dayjs.unix(record.end_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('open.open.5ukf3d5k13g0')">
                            <template #cell="{ record }">
                                <span v-if="$permission(['cmsScreenAdvUpdateStatus'])">
                                    <a-switch v-permission="['cmsScreenAdvUpdateStatus']" size="small"
                                        @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                                        :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('cms.adv.adv.status', record.status) }}
                                </span>
                            </template>

                        </a-table-column>
                        <a-table-column v-if="$permission(['cmsAdvOpenDetail', 'cmsScreenAdvUpdate', 'cmsScreenAdvDelete'])"
                            fixed="right" :title="$t('open.open.5ukf3d5k15o0')" :width="local.lang=='en'?170:150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsAdvOpenDetail'])"
                                        @click="router.push({ name: 'cmsAdvOpenDetail', params: { id: record.id } })">{{$t('open.open.5ukf3d5k17o0')}}</a-link>
                                    <a-link v-if="$permission(['cmsScreenAdvUpdate'])"
                                        @click="updateBtn(record)">{{$t('open.open.5ukf3d5k19w0')}}</a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0') ">
                                        <a-link v-if="$permission(['cmsScreenAdvDelete'])" status="danger">{{$t('open.open.5ukf3d5k1h40')}}</a-link>
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
                {{ statusVisible == 1 ? $t('open.open.5ukf3d5k1nk0') : $t('open.open.5ukf3d5k1tw0') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="image.zh-CN" :label="$t('open.open.5ukf3d5k1yc0')">
                                <div v-if="showVisible" style="width: 100%">
                                    <a-upload list-type="picture" :limit="1" :on-before-upload="beforeUpload"
                                        accept=".png,.jpg,.jpeg,.gif" draggable image-preview :auto-upload="true"
                                        v-model:file-list="form.data.image['zh-CN']" :custom-request="(upload as any)">
                                        <template #upload-item="imgs">
                                            <div style="height: 165px;">
                                                <a-image :src="imgs['fileItem']?.response?.url" style="vertical-align: top;"
                                                    :preview-visible="visible1" height="90%" footer-position="outer"
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
                                    <p>{{$t('open.open.5ukf3d5k2200')}}</p>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="image.en" :label="$t('open.open.5ukf3d5k2680')">
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
                                    <p>{{$t('open.open.5ukf3d5k2200')}}</p>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="image.tc" :label="$t('open.open.5ukf3d5k2b40')">
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
                                    <p>{{$t('open.open.5ukf3d5k2200')}}</p>
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="link_url" :label="$t('open.open.5ukf3d5k2f00')">
                                <a-input v-model="form.data.link_url" :placeholder="$t('open.open.5ukf3d5k2iw0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="start_time" :label="$t('open.open.5ukf3d5k0z40')">
                                <a-date-picker value-format="x" style="width:100%" show-time v-model="form.data.start_time"
                                    :placeholder="$t('open.open.5ukf3d5k0z40')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="end_time" :label="$t('open.open.5ukf3d5k1180')">
                                <a-date-picker value-format="x" style="width:100%" show-time v-model="form.data.end_time"
                                    :placeholder="$t('open.open.5ukf3d5k1180')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('open.open.5ukf3d5k2u80')">
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
import { useEnumsFormat } from '@/hooks/enums'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import dayjs from 'dayjs'
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
    const { code, data } = await apiCms.cmsScreenAdvList({
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
        cb(t('open.open.5ukf3d5k2yk0'))
    } else if (value <= new Date().getTime()) {
        cb(t('open.open.5ukf3d5k3480'))
    } else {
        return true
    }
}
const form: any = reactive({
    data: {
        image: {
            'zh-CN': '',
            'en': '',
            'tc': ''
        },
        link_url: '',
        start_time: '',
        end_time: '',
        status: 1,
        id: ''
    },
    rules: {
        'image.zh-CN': [{ required: true, message: t('open.open.5ukf3d5k3800') }],
        'image.en': [{ required: true, message: t('open.open.5ukf3d5k3c80') }],
        'image.tc': [{ required: true, message: t('open.open.5ukf3d5k3f80') }],
        'type': [{ required: true, message: t('open.open.5ukf3d5k3gw0') }],
        'start_time': [{ required: true, message: t('open.open.5ukf3d5k3ig0') }],
        'link_url': [{ required: true, message: t('open.open.5ukf3d5k2iw0') }],
        'end_time': [{ required: true, message: t('open.open.5ukf3d5k3ko0') }, { validator: validatorTime }],
        'need_login': [{ required: true, message: t('open.open.5ukf3d5k3mc0') }],
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
        const { code, msg } = await apiCms.cmsScreenAdvUpdate({
            advId: param.id,
            data: param
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    } else {
        const { code, msg } = await apiCms.cmsScreenAdvSave({
            data: param
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    }

}
const onCloseEdit = () => {
    form.data = {
        image: {
            'zh-CN': '',
            'en': '',
            'tc': ''
        },
        link_url: '',
        start_time: '',
        end_time: '',
        status: 1,
        id: ''
    }
    formRef.value.resetFields()
}

// 删除
const deleteBtn = async (val: any) => {
    const { code } = await apiCms.cmsScreenAdvDelete({ 'advIds': [val.id] })
    if (code != 1) return;
    getData();
}
const handleChangeIntercept = async (val: any) => {
    let obj: any = await getCmsInfoAdvDetail(val.id)
    obj.status = val.status
    const { code, msg } = await apiCms.cmsScreenAdvUpdate({
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
        //判断尺寸大小
        const isSize = new Promise(function (resolve, reject) {
            let width = 750;
            let height = 1400;
            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            img.onload = function () {
                let valid = img.width == width && img.height == height;
                valid ? resolve(true) : reject();
            };
            img.src = _URL.createObjectURL(file);
        }).then(
            () => {
                if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                    resolve(true)
                } else {
                    Message.info(t('open.open.5ukf3d5k3oo0'))
                }
                return file;
            },
            () => {
                Message.error(t('open.open.5ukf3d5k3ro0'));
                return Promise.reject();
            }
        );
        console.log(isSize);


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