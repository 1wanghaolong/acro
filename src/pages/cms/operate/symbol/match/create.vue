<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subname="$t(`router.${String(route.name)}`)" />
            <div :style="{ display: 'flex' }">
                <div style="flex: 1;overflow: auto;">
                    <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                        :style="{ maxWidth: '420px', margin: 'auto' }" @submit="submit">
                        <a-form-item field="title.zh-CN" :label="$t('match.create.5ukj48fb4yw0')">
                            <a-input v-model="form.data.title['zh-CN']" :placeholder="$t('match.create.5ukj48fb5rk0')" />
                        </a-form-item>
                        <a-form-item field="title.en" :label="$t('match.create.5ukj48fb6ik0')">
                            <a-input v-model="form.data.title.en" :placeholder="$t('match.create.5ukj48fb6mo0')" />
                        </a-form-item>
                        <a-form-item field="title.tc" :label="$t('match.create.5ukj48fb6qs0')">
                            <a-input v-model="form.data.title.tc" :placeholder="$t('match.create.5ukj48fb76g0')" />
                        </a-form-item>
                        <a-form-item field="type" :label="$t('match.create.5ukj48fb7a80')">
                            <a-select v-model="form.data.type" :placeholder="$t('match.create.5ukj48fb7qg0')">
                                <a-option v-for="item in useEnums('market.market_type')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item field="period" :label="$t('match.create.5ukj48fb7uk0')">
                            <a-select v-model="form.data.period" :placeholder="$t('match.create.5ukj48fb7qg0')">
                                <a-option v-for="item in useEnums('cms.operate.symbol.match.period')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item field="is_cycle" :label="$t('match.create.5ukj48fb7yg0')">
                            <a-select v-model="form.data.is_cycle" :placeholder="$t('match.create.5ukj48fb7qg0')">
                                <a-option v-for="item in useEnums('cms.operate.quote.market.status')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item field="start_time" :label="$t('match.create.5ukj48fb8200')">
                            <a-date-picker value-format="x" style="width:100%" show-time v-model="form.data.start_time"
                                :placeholder="$t('match.create.5ukj48fb8200')" />
                        </a-form-item>
                        <a-form-item field="end_time" :label="$t('match.create.5ukj48fb85s0')">
                            <a-date-picker value-format="x" style="width:100%" show-time v-model="form.data.end_time"
                                :placeholder="$t('match.create.5ukj48fb85s0')" />
                        </a-form-item>
                        <a-form-item field="banner" :label="$t('match.create.5ukj48fb89s0')">
                            <div style="width: 100%">
                                <a-upload list-type="picture" :limit="1" :on-before-upload="beforeUpload"
                                    accept=".png,.jpg,.jpeg,.gif" draggable image-preview :auto-upload="true"
                                    v-model:file-list="form.data.banner" :custom-request="(upload as any)">
                                    <template #upload-item="imgs">
                                        <div style="height: 165px;">
                                            <a-image :src="imgs['fileItem']?.response?.url" height="90%"
                                                style="margin-right: 67px; vertical-align: top;" :preview-visible="visible1"
                                                footer-position="outer"
                                                @preview-visible-change="() => { visible1 = false }">
                                                <template #extra>
                                                    <div class="actions actions-outer">
                                                        <span class="action"
                                                            @click="() => { visible1 = true }"><icon-eye /></span>
                                                        <span class="action"
                                                            @click="form.data.banner = []"><icon-delete /></span>
                                                    </div>
                                                </template>
                                            </a-image>
                                        </div>
                                    </template>
                                </a-upload>
                                <p style="margin-top:15px">{{$t('match.create.5ukj48fb8ds0')}}</p>
                            </div>
                        </a-form-item>
                        <a-form-item field="background" :label="$t('match.create.5ukj48fb8i00')">
                            <div style="width: 100%">
                                <a-upload list-type="picture" :limit="1" :on-before-upload="beforeUploadBg"
                                    accept=".png,.jpg,.jpeg,.gif" draggable image-preview :auto-upload="true"
                                    v-model:file-list="form.data.background" :custom-request="(uploadBg as any)">
                                    <template #upload-item="imgs">
                                        <div style="height: 165px;">
                                            <a-image :src="imgs['fileItem']?.response?.url" height="90%"
                                                style="margin-right: 67px; vertical-align: top;" :preview-visible="visible2"
                                                footer-position="outer"
                                                @preview-visible-change="() => { visible2 = false }">
                                                <template #extra>
                                                    <div class="actions actions-outer">
                                                        <span class="action"
                                                            @click="() => { visible2 = true }"><icon-eye /></span>
                                                        <span class="action"
                                                            @click="form.data.background = []"><icon-delete /></span>
                                                    </div>
                                                </template>
                                            </a-image>
                                        </div>
                                    </template>
                                </a-upload>
                                <p style="margin-top:15px">{{$t('match.create.5ukj48fb8lo0')}}</p>
                            </div>
                        </a-form-item>
                        <a-form-item field="status" :label="$t('match.create.5ukj48fb9080')">
                            <a-select v-model="form.data.status" :placeholder="$t('match.create.5ukj48fb7qg0')">
                                <a-option v-for="item in useEnums('cms.operate.quote.market.status')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                    </a-form>
                </div>
                <div style="flex: 1;overflow: auto;">
                    <a-card :style="{ width: '100%' }" :title="$t('match.create.5ukj48fb94g0')">
                        <a-card style="margin-bottom: 15px;" v-for="(item, index) in form.data.prize">
                            <a-form :model="form.data" layout="vertical" :style="{ maxWidth: '100%', margin: 'auto' }">
                                <a-form-item :label="$t('match.create.5ukj48fb9880')">
                                    <a-input-number hide-button v-model="item.from" :placeholder="$t('match.create.5ukj48fb9c80')" />
                                </a-form-item>
                                <a-form-item :label="$t('match.create.5ukj48fb9gs0')">
                                    <a-input-number hide-button v-model="item.to" :placeholder="$t('match.create.5ukj48fb9jg0')" />
                                </a-form-item>
                                <a-form-item :label="$t('match.create.5ukj48fb9mc0')">
                                    <a-select v-model="item.type" :placeholder="$t('match.create.5ukj48fb7qg0')">
                                        <a-option v-for="item in useEnums('cms.operate.symbol.match.rewardType')"
                                            :value="item.value">{{
                                                item.trans[local.lang] }}</a-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item :label="$t('match.create.5ukj48fb9tc0')">
                                    <a-input v-model="item.text" :placeholder="$t('match.create.5ukj48fb9vk0')" />
                                </a-form-item>
                                <a-form-item :label="$t('match.create.5ukj48fb9y00')">
                                    <div style="width: 100%">
                                        <a-upload list-type="picture" :limit="1" :on-before-upload="beforeUploadReward"
                                            accept=".png,.jpg,.jpeg,.gif" draggable image-preview :auto-upload="true"
                                            v-model:file-list="item.images" :custom-request="(uploadReward as any)">
                                            <template #upload-item="imgs">
                                                <div style="height: 165px;">
                                                    <a-image :src="imgs['fileItem']?.response?.url" height="90%"
                                                        style="margin-right: 67px; vertical-align: top;"
                                                        :preview-visible="visibleList['visible' + index]"
                                                        footer-position="outer"
                                                        @preview-visible-change="() => { visibleList['visible' + index] = false }">
                                                        <template #extra>
                                                            <div class="actions actions-outer">
                                                                <span class="action"
                                                                    @click="() => { visibleList['visible' + index] = true }"><icon-eye /></span>
                                                                <span class="action"
                                                                    @click="item.images = []"><icon-delete /></span>
                                                            </div>
                                                        </template>
                                                    </a-image>
                                                </div>
                                            </template>
                                        </a-upload>
                                        <p style="margin-top:15px">{{$t('match.create.5ukj48fba0g0')}}</p>
                                    </div>
                                </a-form-item>
                                <a-form-item>
                                    <a-button @click="deleteBtn(index)">
                                        <template #icon>
                                            <icon-delete />
                                        </template>
                                        {{$t('match.create.5ukj48fba2w0')}}
                                    </a-button>
                                </a-form-item>
                            </a-form>
                        </a-card>
                        <a-button type="primary" @click="addBtn">
                            <template #icon>
                                <icon-plus />
                            </template>
                            {{$t('match.create.5ukj48fba680')}}
                        </a-button>
                    </a-card>
                </div>
            </div>
            <a-divider />
            <div style="display: flex;justify-content: flex-end;width: 100%;margin-bottom: 15px;">
                <a-space :size="18">
                    <a-button type="primary" :loading="form.loading" :disabled="form.loading" @click="submit">
                        <template #icon>
                            <icon-check />
                        </template>
                        {{$t('match.create.5ukj48fba9c0')}}
                    </a-button>
                </a-space>
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
const visible1 = ref(false);
const visible2 = ref(false);
const visibleList: any = ref({})
const validatorTime = (value: any, cb: any) => {
    if (form.data.start_time > value) {
        cb(t('match.create.5ukj48fbabw0'))
    } else if (value <= new Date().getTime()) {
        cb(t('match.create.5ukj48fbb0s0'))
    } else {
        return true
    }
}
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        title: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        type: '',
        period: '',
        is_cycle: '',
        start_time: '',
        end_time: '',
        banner: [],
        background: [],
        prize: [],
        status: 1,
    },
    rules: {
        'title.zh-CN': [{ required: true, message: t('match.create.5ukj48fb5rk0') }],
        'title.en': [{ required: true, message: t('match.create.5ukj48fb6mo0') }],
        'title.tc': [{ required: true, message: t('match.create.5ukj48fb76g0') }],
        type: [{ required: true, message: t('match.create.5ukj48fbbv80') }],
        period: [{ required: true, message: t('match.create.5ukj48fbc100') }],
        is_cycle: [{ required: true, message: t('match.create.5ukj48fbc6o0') }],
        status: [{ required: true, message: t('match.create.5ukj48fbca40') }],
        banner: [{ required: true, message: t('match.create.5ukj48fbcdc0') }],
        background: [{ required: true, message: t('match.create.5ukj48fbcgs0') }],
        'start_time': [{ required: true, message: t('match.create.5ukj48fbck40') }],
        'end_time': [{ required: true, message: t('match.create.5ukj48fbcng0') }, { validator: validatorTime }],
    }
})
const convertToUnicodeEscape = (text: any) => {
    return text.replace(/[\u007F-\uFFFF]/g, function (match: any) {
        return "\\u" + match.charCodeAt(0).toString(16).padStart(4, "0");
    });
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    let param = { ...form.data }
    param.banner = form.data.banner[0]?.response?.url
    param.background = form.data.background[0]?.response?.url
    param['end_time'] = param['end_time'] / 1000
    param['start_time'] = param['start_time'] / 1000
    if (param.prize?.length > 0) {
        param.prize.forEach((item: any) => {
            if (item.images[0]?.response?.url) {
                item.image = item.images[0]?.response?.url
            }
            item.text = convertToUnicodeEscape(item.text)
        })
        param.prize = JSON.stringify(param.prize)
    } else {
        delete param.prize
    }
    form.loading = true
    const { code, msg } = await apiCms.cmsMatchCreate({
        data: {
            ...param,
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const deleteBtn = (index: any) => {
    form.data.prize.splice(index, 1)
}

const addBtn = () => {
    form.data.prize.push({
        from: '', to: '', type: '', text: '', images: []
    })
    visibleList.value['visible' + form.data.prize?.length] = false
    console.log(form.data.prize?.length);
    console.log(visibleList.value);


}

const beforeUpload = (file: any): any => {
    return new Promise((resolve) => {
        //判断尺寸大小
        const isSize = new Promise(function (resolve, reject) {
            let width = 690;
            let height = 340;
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
                    Message.info(t('match.create.5ukj48fbcqw0'))
                }
                return file;
            },
            () => {
                Message.error(t('match.create.5ukj48fbcw40'));
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
const beforeUploadBg = (file: any): any => {
    return new Promise((resolve) => {
        //判断尺寸大小
        const isSize = new Promise(function (resolve, reject) {
            let width = 750;
            let height = 2379;
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
                    Message.info(t('match.create.5ukj48fbcqw0'))
                }
                return file;
            },
            () => {
                Message.error(t('match.create.5ukj48fbcw40'));
                return Promise.reject();
            }
        );
        console.log(isSize);


    });
};
const uploadBg = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const formData = new FormData()
    formData.append('file', fileItem.file)
    const { code, data } = await apiSystem.upload(formData)
    if (code != 1) return onError();
    onSuccess(data);
}
const beforeUploadReward = (file: any): any => {
    return new Promise((resolve) => {
        //判断尺寸大小
        const isSize = new Promise(function (resolve, reject) {
            let width = 120;
            let height = 120;
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
                    Message.info(t('match.create.5ukj48fbcqw0'))
                }
                return file;
            },
            () => {
                Message.error(t('match.create.5ukj48fbcw40'));
                return Promise.reject();
            }
        );
        console.log(isSize);


    });
};
const uploadReward = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const formData = new FormData()
    formData.append('file', fileItem.file)
    const { code, data } = await apiSystem.upload(formData)
    if (code != 1) return onError();
    onSuccess(data);
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