<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-tabs v-model:active-key="active" justify>
                <a-tab-pane style="overflow: auto;" key="license_number0" title="App">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="app_name.zh-CN" :label="$t('system.system.5um22n30vlg0')">
                                <a-input v-model="form.data.app_name['zh-CN']" :placeholder="$t('system.system.5um22n30wp40')" />
                            </a-form-item>
                            <a-form-item field="app_name.en" :label="$t('system.system.5um22n30wvg0')">
                                <a-input v-model="form.data.app_name['en']" :placeholder="$t('system.system.5um22n30wzw0')" />
                            </a-form-item>
                            <a-form-item field="app_name.tc" :label="$t('system.system.5um22n30x440')">
                                <a-input v-model="form.data.app_name['tc']" :placeholder="$t('system.system.5um22n30x8w0')" />
                            </a-form-item>
                            <a-form-item field="app_domain" :label="$t('system.system.5um25frv7sc0')">
                                <a-input v-model="form.data.app_domain" :placeholder="$t('system.system.5um22n30xd40')" />
                            </a-form-item>
                            <a-form-item field="static_domain" :label="$t('system.system.5um25fruy280')">
                                <a-input v-model="form.data.static_domain" :placeholder="$t('system.system.5um22n30xi80')" />
                            </a-form-item>
                            <a-form-item field="app_logo" label="App Logo">
                                <div style="width: 100%">
                                    <a-card class="appLogo" style="width: 100%;">
                                        <a-upload :show-preview-button="false" accept=".png,.jpg,.jpeg,.gif"
                                            :on-before-upload="beforeUploadImageLimitation" list-type="picture-card"
                                            :limit="1" draggable :auto-upload="true" v-model:file-list="form.data.app_logo"
                                            :custom-request="(upload as any)">
                                            <template #upload-item="imgs">
                                                <div style="height: 100px;">
                                                    <a-image :src="imgs['fileItem']?.response?.url" height="75"
                                                        style="vertical-align: top;" :preview-visible="visible1"
                                                        footer-position="outer"
                                                        @preview-visible-change="() => { visible1 = false }">
                                                        <template #extra>
                                                            <div class="actions actions-outer">
                                                                <span class="action"
                                                                    @click="() => { visible1 = true }"><icon-eye /></span>
                                                                <span class="action"
                                                                    @click="form.data.app_logo = []"><icon-delete /></span>
                                                            </div>
                                                        </template>
                                                    </a-image>
                                                </div>
                                            </template>
                                        </a-upload>
                                    </a-card>
                                    <p style="margin-top:10px">{{$t('system.system.5um22n30xn40')}}</p>
                                </div>
                            </a-form-item>
                            <a-form-item>
                                <div v-if="$permission(['configSystemUpdate'])"
                                    style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('system.system.5um22n30xrg0')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('system.system.5um22n30xvo0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="license_number1" title="RAS">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="ras_name.zh-CN" :label="$t('system.system.5um22n30xzw0')">
                                <a-input v-model="form.data.ras_name['zh-CN']" :placeholder="$t('system.system.5um22n30y3k0')" />
                            </a-form-item>
                            <a-form-item field="ras_name.en" :label="$t('system.system.5um22n30y7c0')">
                                <a-input v-model="form.data.ras_name['en']" :placeholder="$t('system.system.5um22n30yc00')" />
                            </a-form-item>
                            <a-form-item field="ras_name.tc" :label="$t('system.system.5um22n30ygk0')">
                                <a-input v-model="form.data.ras_name['tc']" :placeholder="$t('system.system.5um22n30yks0')" />
                            </a-form-item>
                            <a-form-item field="ras_domain" :label="$t('system.system.5um25frv81s0')">
                                <a-input v-model="form.data.ras_domain" :placeholder="$t('system.system.5um22n30yp40')" />
                            </a-form-item>
                            <a-form-item field="ras_logo" :label="$t('system.system.5um22n30yt40')">
                                <div style="width: 100%">
                                    <a-card class="appLogo" style="width: 100%;">
                                        <a-upload :show-preview-button="false" accept=".png,.jpg,.jpeg,.gif"
                                            :on-before-upload="beforeUploadImageLimitation" list-type="picture-card"
                                            :limit="1" draggable :auto-upload="true" v-model:file-list="form.data.ras_logo"
                                            :custom-request="(upload as any)">
                                            <template #upload-item="imgs">
                                                <div style="height: 100px;">
                                                    <a-image :src="imgs['fileItem']?.response?.url" height="75"
                                                        style="vertical-align: top;" :preview-visible="visible2"
                                                        footer-position="outer"
                                                        @preview-visible-change="() => { visible2 = false }">
                                                        <template #extra>
                                                            <div class="actions actions-outer">
                                                                <span class="action"
                                                                    @click="() => { visible2 = true }"><icon-eye /></span>
                                                                <span class="action"
                                                                    @click="form.data.ras_logo = []"><icon-delete /></span>
                                                            </div>
                                                        </template>
                                                    </a-image>
                                                </div>
                                            </template>
                                        </a-upload>
                                    </a-card>
                                    <p style="margin-top:10px">{{$t('system.system.5um22n30xn40')}}</p>
                                </div>
                            </a-form-item>
                            <a-form-item>
                                <div v-if="$permission(['configSystemUpdate'])"
                                    style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('system.system.5um22n30xrg0')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('system.system.5um22n30xvo0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="license_number2" :title="$t('system.system.5um22n30z280')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="client_name.zh-CN" :label="$t('system.system.5um22n30vlg0')">
                                <a-input v-model="form.data.client_name['zh-CN']" :placeholder="$t('system.system.5um22n30wp40')" />
                            </a-form-item>
                            <a-form-item field="client_name.en" :label="$t('system.system.5um22n30wvg0')">
                                <a-input v-model="form.data.client_name['en']" :placeholder="$t('system.system.5um22n30wzw0')" />
                            </a-form-item>
                            <a-form-item field="client_name.tc" :label="$t('system.system.5um22n30x440')">
                                <a-input v-model="form.data.client_name['tc']" :placeholder="$t('system.system.5um22n30x8w0')" />
                            </a-form-item>
                            <a-form-item field="client_logo" :label="$t('system.system.5um22n30z7o0')">
                                <div style="width: 100%">
                                    <a-card class="appLogo" style="width: 100%;">
                                        <a-upload :show-preview-button="false" accept=".png,.jpg,.jpeg,.gif"
                                            :on-before-upload="beforeUploadImage" list-type="picture-card" :limit="1"
                                            draggable :auto-upload="true" v-model:file-list="form.data.client_logo"
                                            :custom-request="(upload as any)">
                                            <template #upload-item="imgs">
                                                <div style="height: 100px;">
                                                    <a-image :src="imgs['fileItem']?.response?.url" height="75"
                                                        style="vertical-align: top;" :preview-visible="visible3"
                                                        footer-position="outer"
                                                        @preview-visible-change="() => { visible3 = false }">
                                                        <template #extra>
                                                            <div class="actions actions-outer">
                                                                <span class="action"
                                                                    @click="() => { visible3 = true }"><icon-eye /></span>
                                                                <span class="action"
                                                                    @click="form.data.client_logo = []"><icon-delete /></span>
                                                            </div>
                                                        </template>
                                                    </a-image>
                                                </div>
                                            </template>
                                        </a-upload>
                                    </a-card>
                                    <p style="margin-top:10px">{{$t('system.system.5um22n30zbk0')}}</p>
                                </div>
                            </a-form-item>
                            <a-form-item>
                                <div v-if="$permission(['configSystemUpdate'])"
                                    style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('system.system.5um22n30xrg0')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('system.system.5um22n30xvo0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="license_number3" :title="$t('system.system.5um22n30zgs0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="admin_website_name" :label="$t('system.system.5um22n30zko0')">
                                <a-input v-model="form.data.admin_website_name" :placeholder="$t('system.system.5um22n30znw0')" />
                            </a-form-item>
                            <a-form-item field="open_admin_url" :label="$t('system.system.5um22n30zrc0')">
                                <a-input v-model="form.data.open_admin_url" :placeholder="$t('system.system.5um22n30zv00')" />
                            </a-form-item>
                            <a-form-item>
                                <div v-if="$permission(['configSystemUpdate'])"
                                    style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('system.system.5um22n30xrg0')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('system.system.5um22n30xvo0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="license_number4" :title="$t('system.system.5um22n30zyg0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="download_background" :label="$t('system.system.5um22n3101o0')">
                                <div style="width: 100%">
                                    <a-card class="downloadBackground" style="width: 100%;">
                                        <a-upload :show-preview-button="false" accept=".png,.jpg,.jpeg,.gif"
                                            :on-before-upload="beforeUploadImage" list-type="picture-card" :limit="1"
                                            draggable :auto-upload="true" v-model:file-list="form.data.download_background"
                                            :custom-request="(upload as any)">
                                            <template #upload-item="imgs">
                                                <div style="height: 165px;">
                                                    <a-image :src="imgs['fileItem']?.response?.url" height="90%"
                                                        style="margin-right: 67px; vertical-align: top;"
                                                        :preview-visible="visible4" footer-position="outer"
                                                        @preview-visible-change="() => { visible4 = false }">
                                                        <template #extra>
                                                            <div class="actions actions-outer">
                                                                <span class="action"
                                                                    @click="() => { visible4 = true }"><icon-eye /></span>
                                                                <span class="action"
                                                                    @click="form.data.download_background = []"><icon-delete /></span>
                                                            </div>
                                                        </template>
                                                    </a-image>
                                                </div>
                                            </template>
                                        </a-upload>
                                    </a-card>
                                    <p style="margin-top:10px">{{$t('system.system.5um22n30zbk0')}}</p>
                                </div>
                            </a-form-item>
                            <a-form-item>
                                <div v-if="$permission(['configSystemUpdate'])"
                                    style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('system.system.5um22n30xrg0')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('system.system.5um22n30xvo0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="license_number5" :title="$t('system.system.5um22n310500')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="consumer_hotline" :label="$t('system.system.5um22n3108o0')">
                                <a-input v-model="form.data.consumer_hotline" :placeholder="$t('system.system.5um22n310c40')" />
                            </a-form-item>
                            <a-form-item>
                                <div v-if="$permission(['configSystemUpdate'])"
                                    style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('system.system.5um22n30xrg0')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('system.system.5um22n30xvo0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </a-card>
    </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const active = ref('license_number0')
const formRef = ref()
const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        app_name: {
            "zh-CN": "",
            "tc": "",
            "en": ""
        },
        app_logo: [],
        static_domain: '',
        app_domain: '',
        ras_name: {
            "zh-CN": "",
            "tc": "",
            "en": ""
        },
        ras_logo: [],
        ras_domain: '',
        client_name: {
            "zh-CN": "",
            "tc": "",
            "en": ""
        },
        client_logo: [],
        download_background: [],
        open_admin_url: '',
        admin_website_name: '',
        consumer_hotline: '',
    },
    rules: {
        // 'app_name.zh-CN': [{ required: true, message: '请输入应用简体名称' }],
        // 'app_name.en': [{ required: true, message: '请输入应用英文名称' }],
        // 'app_name.tc': [{ required: true, message: '请输入应用繁体名称' }],
        // 'static_domain': [{ required: true, message: '请输入App应用静态域名' }],
        // 'app_domain': [{ required: true, message: '请输入App应用域名' }],
        'app_logo': [{ required: true, message: '请上传App Logo' }],
        // 'ras_name.zh-CN': [{ required: true, message: '请输入简体名称' }],
        // 'ras_name.en': [{ required: true, message: '请输入英文名称' }],
        // 'ras_name.tc': [{ required: true, message: '请输入繁体名称' }],
        // 'ras_domain': [{ required: true, message: '请输入RAS应用域名' }],
        'ras_logo': [{ required: true, message: t('system.system.5um22n310fk0') }],
        // 'client_name.zh-CN': [{ required: true, message: '请输入应用简体名称' }],
        // 'client_name.en': [{ required: true, message: '请输入应用英文名称' }],
        // 'client_name.tc': [{ required: true, message: '请输入应用繁体名称' }],
        'client_logo': [{ required: true, message: t('system.system.5um22n310j40') }],
        'download_background': [{ required: true, message: t('system.system.5um22n310m40') }],
        // 'open_admin_url': [{ required: true, message: '请输入开户后台地址' }],
        // 'admin_website_name': [{ required: true, message: '请输入总后台名称' }],
        'consumer_hotline': [{ required: true, message: t('system.system.5um22n310c40') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return
    let param = { ...form.data }
    if (!form.data.client_logo[0]?.response?.url) return Message.info(t('system.system.5um22n310j40'))
    if (!form.data.download_background[0]?.response?.url) return Message.info(t('system.system.5um22n310m40'))
    if (!form.data.ras_logo[0]?.response?.url) return Message.info(t('system.system.5um22n310fk0'))
    if (!form.data.app_logo[0]?.response?.url) return Message.info('请上传App Logo')
    if (!form.data.consumer_hotline) return Message.info(t('system.system.5um22n310c40'))
    param.client_logo = form.data.client_logo[0]?.response?.url
    param.download_background = form.data.download_background[0]?.response?.url
    param.ras_logo = form.data.ras_logo[0]?.response?.url
    param.app_logo = form.data.app_logo[0]?.response?.url
    const { code, msg } = await apiAdmin.configUpdate({
        group: 'system',
        data: param
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()


}
const reset = () => {
    getData()
    formRef.value.resetFields()
    // form.data = cloneDeep(form.detail)
}
const getData = async () => {
    form.loading = true
    const { code, data } = await apiAdmin.configList({
        group: 'system'
    })
    form.loading = false
    if (code != 1) return;
    for (let key in form.data) {
        form.data[key] = data[key]
    }
    form.data.app_logo = [{
        uid: '1',
        name: data.app_logo,
        url: data.app_logo,
        response: {
            url: data.app_logo,
        }
    }]
    form.data.ras_logo = [{
        uid: '1',
        name: data.ras_logo,
        url: data.ras_logo,
        response: {
            url: data.ras_logo,
        }
    }]
    form.data.client_logo = [{
        uid: '1',
        name: data.client_logo,
        url: data.client_logo,
        response: {
            url: data.client_logo,
        }
    }]
    form.data.download_background = [{
        uid: '1',
        name: data.download_background,
        url: data.download_background,
        response: {
            url: data.download_background,
        }
    }]
    console.log(data);

}
const beforeUploadImage = (file: any): any => {
    let arr = file.name.split('.')
    let ext = arr?.[arr?.length - 1]
    return new Promise((resolve) => {
        if (['jpeg', 'png', 'jpg', 'gif'].includes(ext)) {
            resolve(true)
        } else {
            Message.info(t('system.system.5um22n310pc0'))
        }
    });
};
const beforeUploadImageLimitation = (file: any): any => {
    let arr = file.name.split('.')
    let ext = arr?.[arr?.length - 1]
    return new Promise((resolve) => {
        //判断尺寸大小
        const isSize = new Promise(function (resolve, reject) {
            let width = 485;
            let height = 75;
            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            img.onload = function () {
                let valid = img.width == width && img.height == height;
                valid ? resolve(true) : reject();
            };
            img.src = _URL.createObjectURL(file);
        }).then(
            () => {
                if (['jpeg', 'png', 'jpg', 'gif'].includes(ext)) {
                    resolve(true)
                } else {
                    Message.info(t('system.system.5um22n310tw0'))
                }
                return file;
            },
            () => {
                Message.error(t('system.system.5um22n310xc0'));
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
    console.log(data);

    onSuccess(data);
}
getData()
</script>
<style scoped lang="less">
.appLogo {
    :deep(.arco-upload-list-picture) {
        width: 200px;
    }
}

.downloadBackground {
    :deep(.arco-upload-list-picture) {
        height: 120px;
    }
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
}</style>