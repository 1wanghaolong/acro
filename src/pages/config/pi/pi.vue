<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-tabs v-model:active-key="active" justify>
                <a-tab-pane style="overflow: auto;"  key="license_number" :title="$t('pi.pi.5um4n0qa8cs0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="license_number" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="license_number.zh-CN" :label="$t('pi.pi.5um4n0qaiec0')">
                                <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }"
                                    v-model="form.data.license_number['zh-CN']" :placeholder="$t('pi.pi.5um4n0qaj980')" />
                            </a-form-item>
                            <a-form-item field="license_number.en" :label="$t('pi.pi.5um4n0qajdo0')">
                                <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.license_number['en']"
                                    :placeholder="$t('pi.pi.5um4n0qajg40')" />
                            </a-form-item>
                            <a-form-item field="license_number.tc" :label="$t('pi.pi.5um4n0qajig0')">
                                <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.license_number['tc']"
                                    :placeholder="$t('pi.pi.5um4n0qajko0')" />
                            </a-form-item>
                            <a-form-item v-permission="['configPiUpdate']">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('pi.pi.5um4n0qajt80')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('pi.pi.5um4n0qajwo0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="licensed_representative" :title="$t('pi.pi.5um4n0qajyo0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="licensed_representative" :model="form.data" :rules="(form.rules as any)"
                            layout="vertical" :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="licensed_representative.zh-CN" :label="$t('pi.pi.5um4n0qamnw0')">
                                <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }"
                                    v-model="form.data.licensed_representative['zh-CN']" :placeholder="$t('pi.pi.5um4n0qams40')" />
                            </a-form-item>
                            <a-form-item field="licensed_representative.en" :label="$t('pi.pi.5um4n0qamvk0')">
                                <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }"
                                    v-model="form.data.licensed_representative['en']" :placeholder="$t('pi.pi.5um4n0qan3o0')" />
                            </a-form-item>
                            <a-form-item field="licensed_representative.tc" :label="$t('pi.pi.5um4n0qask40')">
                                <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }"
                                    v-model="form.data.licensed_representative['tc']" :placeholder="$t('pi.pi.5um4n0qastg0')" />
                            </a-form-item>
                            <a-form-item v-permission="['configPiUpdate']">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('pi.pi.5um4n0qajt80')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('pi.pi.5um4n0qajwo0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="recording_file" :title="$t('pi.pi.5um4n0qau8w0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="recording_file" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="recording_file.zh-CN" :label="$t('pi.pi.5um4n0qaudg0')">
                                <a-upload accept=".mp3,.mp4,.wav,.ogg,.aac,.flac,.m4a,.webm,.wma,.aiff,.au,.midi" :on-before-upload="beforeUpload" :limit="1" draggable
                                    :auto-upload="true" v-model:file-list="form.data.recording_file['zh-CN']"
                                    :custom-request="(upload as any)">
                                </a-upload>
                            </a-form-item>
                            <a-form-item field="recording_file.en" :label="$t('pi.pi.5um4n0qausk0')">
                                <a-upload accept=".mp3,.mp4,.wav,.ogg,.aac,.flac,.m4a,.webm,.wma,.aiff,.au,.midi" :on-before-upload="beforeUpload" :limit="1" draggable
                                    :auto-upload="true" v-model:file-list="form.data.recording_file['en']"
                                    :custom-request="(upload as any)">
                                </a-upload>
                            </a-form-item>
                            <a-form-item field="recording_file.tc" :label="$t('pi.pi.5um4n0qauvc0')">
                                <a-upload accept=".mp3,.mp4,.wav,.ogg,.aac,.flac,.m4a,.webm,.wma,.aiff,.au,.midi" :on-before-upload="beforeUpload" :limit="1" draggable
                                    :auto-upload="true" v-model:file-list="form.data.recording_file['tc']"
                                    :custom-request="(upload as any)">
                                </a-upload>
                            </a-form-item>
                            <a-form-item v-permission="['configPiUpdate']">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('pi.pi.5um4n0qajt80')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('pi.pi.5um4n0qajwo0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="licensed_representative_avatar" :title="$t('pi.pi.5um4n0qav200')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="licensed_representative_avatar" :model="form.data" :rules="(form.rules as any)"
                            layout="vertical" :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-row :gutter="16">
                                <a-col :xs="24" :sm="12">
                                    <a-form-item field="licensed_representative_avatar.zh-CN" :label="$t('pi.pi.5um4n0qav4w0')">
                                        <a-card style="width: 300px;">
                                            <a-upload accept=".png,.jpg,.jpeg" :on-before-upload="beforeUploadImage"
                                                list-type="picture-card" :show-preview-button="false" :limit="1" draggable
                                                :auto-upload="true"
                                                v-model:file-list="form.data.licensed_representative_avatar['zh-CN']"
                                                :custom-request="(upload as any)">
                                            </a-upload>
                                        </a-card>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12">
                                    <a-form-item field="licensed_representative_avatar.en" :label="$t('pi.pi.5um4n0qav700')">
                                        <a-card style="width: 300px;">
                                            <a-upload accept=".png,.jpg,.jpeg" :on-before-upload="beforeUploadImage"
                                                list-type="picture-card" :show-preview-button="false" :limit="1" draggable
                                                :auto-upload="true"
                                                v-model:file-list="form.data.licensed_representative_avatar['en']"
                                                :custom-request="(upload as any)">
                                            </a-upload>
                                        </a-card>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12">
                                    <a-form-item field="licensed_representative_avatar.tc" :label="$t('pi.pi.5um4n0qav9g0')">
                                        <a-card style="width: 300px;">
                                            <a-upload accept=".png,.jpg,.jpeg" :on-before-upload="beforeUploadImage"
                                                list-type="picture-card" :show-preview-button="false" :limit="1" draggable
                                                :auto-upload="true"
                                                v-model:file-list="form.data.licensed_representative_avatar['tc']"
                                                :custom-request="(upload as any)">
                                            </a-upload>
                                        </a-card>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-form-item v-permission="['configPiUpdate']">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('pi.pi.5um4n0qajt80')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('pi.pi.5um4n0qajwo0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="assets_proof_file" :title="$t('pi.pi.5um4n0qavl40')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="assets_proof_file" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-row :gutter="16">
                                <a-col :xs="24" :sm="12">
                                    <a-form-item field="assets_proof_file[0].value" :label="$t('pi.pi.5um4n0qavng0')">
                                        <a-card style="width: 300px;">
                                            <a-upload accept=".png,.jpg,.jpeg" :on-before-upload="beforeUploadImage"
                                                list-type="picture-card" :show-preview-button="false" :limit="1" draggable
                                                :auto-upload="true" v-model:file-list="form.data.assets_proof_file[0].value"
                                                :custom-request="(upload as any)">
                                            </a-upload>
                                        </a-card>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12">
                                    <a-form-item field="assets_proof_file[1].value" :label="$t('pi.pi.5um4n0qavqo0')">
                                        <a-card style="width: 300px;">
                                            <a-upload accept=".png,.jpg,.jpeg" :on-before-upload="beforeUploadImage"
                                                list-type="picture-card" :show-preview-button="false" :limit="1" draggable
                                                :auto-upload="true" v-model:file-list="form.data.assets_proof_file[1].value"
                                                :custom-request="(upload as any)">
                                            </a-upload>
                                        </a-card>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12">
                                    <a-form-item field="assets_proof_file[2].value" :label="$t('pi.pi.5um4n0qavsw0')">
                                        <a-card style="width: 300px;">
                                            <a-upload accept=".png,.jpg,.jpeg" :on-before-upload="beforeUploadImage"
                                                list-type="picture-card" :show-preview-button="false" :limit="1" draggable
                                                :auto-upload="true" v-model:file-list="form.data.assets_proof_file[2].value"
                                                :custom-request="(upload as any)">
                                            </a-upload>
                                        </a-card>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12">
                                    <a-form-item field="assets_proof_file[3].value" :label="$t('pi.pi.5um4n0qavl40')">
                                        <a-card style="width: 300px;">
                                            <a-upload accept=".png,.jpg,.jpeg" :on-before-upload="beforeUploadImage"
                                                list-type="picture-card" :show-preview-button="false" :limit="1" draggable
                                                :auto-upload="true" v-model:file-list="form.data.assets_proof_file[3].value"
                                                :custom-request="(upload as any)">
                                            </a-upload>
                                        </a-card>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-form-item v-permission="['configPiUpdate']">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('pi.pi.5um4n0qajt80')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('pi.pi.5um4n0qajwo0')}}
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
const license_number = ref()
const licensed_representative = ref()
const recording_file = ref()
const licensed_representative_avatar = ref()
const assets_proof_file = ref()
const active = ref('license_number')
const form: any = reactive({
    show: false,
    loading: false,
    detail: {},
    data: {
        license_number: {
            "zh-CN": "",
            "tc": "",
            "en": ""
        },
        licensed_representative: {
            "zh-CN": "",
            "tc": "",
            "en": ""
        },
        recording_file: {
            "zh-CN": [],
            "tc": [],
            "en": []
        },
        licensed_representative_avatar: {
            "zh-CN": [],
            "tc": [],
            "en": []
        },
        assets_proof_file: [
            {
                "type": "bank_statement",
                "value": []
            },
            {
                "type": "security_statement",
                "value": []
            },
            {
                "type": "trust_certificate",
                "value": []
            },
            {
                "type": "proof_of_assets",
                "value": []
            }
        ]
    },
    rules: {
        'license_number.zh-CN': [{ required: true, message: t('pi.pi.5um4n0qaj980') }],
        'license_number.en': [{ required: true, message: t('pi.pi.5um4n0qajg40') }],
        'license_number.tc': [{ required: true, message: t('pi.pi.5um4n0qajko0') }],
        'licensed_representative.zh-CN': [{ required: true, message: t('pi.pi.5um4n0qams40') }],
        'licensed_representative.en': [{ required: true, message: t('pi.pi.5um4n0qan3o0') }],
        'licensed_representative.tc': [{ required: true, message: t('pi.pi.5um4n0qavuk0') }],
        'recording_file.zh-CN': [{ required: true, message: t('pi.pi.5um4n0qavwc0') }],
        'recording_file.en': [{ required: true, message: t('pi.pi.5um4n0qavy00') }],
        'recording_file.tc': [{ required: true, message: t('pi.pi.5um4n0qawko0') }],
        'licensed_representative_avatar.zh-CN': [{ required: true, message: t('pi.pi.5um4n0qb4xo0') }],
        'licensed_representative_avatar.en': [{ required: true, message: t('pi.pi.5um4n0qb54k0') }],
        'licensed_representative_avatar.tc': [{ required: true, message: t('pi.pi.5um4n0qb58s0') }],
        'assets_proof_file[0].value': [{ required: true, message: t('pi.pi.5um4n0qb5ps0') }],
        'assets_proof_file[1].value': [{ required: true, message: t('pi.pi.5um4n0qb5u80') }],
        'assets_proof_file[2].value': [{ required: true, message: t('pi.pi.5um4n0qb5w40') }],
        'assets_proof_file[3].value': [{ required: true, message: t('pi.pi.5um4n0qb6a80') }],
    }
})

const submit = async () => {
    // if(active.value == 'license_number'){
    //     const validate = await license_number.value?.validate()
    //     if (validate) return;
    // }
    // if(active.value == 'licensed_representative'){
    //     const validate = await licensed_representative.value?.validate()
    //     if (validate) return;
    // }
    // if(active.value == 'recording_file'){
    //     const validate = await recording_file.value?.validate()
    //     if (validate) return;
    // }
    // if(active.value == 'licensed_representative_avatar'){
    //     const validate = await licensed_representative_avatar.value?.validate()
    //     if (validate) return;
    // }
    // if(active.value == 'assets_proof_file'){
    //     const validate = await assets_proof_file.value?.validate()
    //     if (validate) return;
    // }
    const validate1 = await license_number.value?.validate()
    if (validate1) return Message.warning(t('pi.pi.5um4n0qb6c40'));
    const validate2 = await licensed_representative.value?.validate()
    if (validate2) return Message.warning(t('pi.pi.5um4n0qb6eo0'));
    const validate3 = await recording_file.value?.validate()
    if (validate3) return Message.warning(t('pi.pi.5um4n0qb6gc0'));
    const validate4 = await licensed_representative_avatar.value?.validate()
    if (validate4) return Message.warning(t('pi.pi.5um4n0qb77o0'));
    const validate5 = await assets_proof_file.value?.validate()
    if (validate5) return Message.warning(t('pi.pi.5um4n0qb7e40'));
    form.loading = true
    let detail = cloneDeep(form.data)
    detail.assets_proof_file = detail.assets_proof_file?.map((item: any) => {
        item.value = item.value[0]?.response?.url || item.value[0].url
        return item
    })
    for (let key in detail.licensed_representative_avatar) {
        detail.licensed_representative_avatar[key] = detail.licensed_representative_avatar[key][0]?.response?.url || detail.licensed_representative_avatar[key][0].url
    }
    for (let key in detail.recording_file) {
        detail.recording_file[key] = detail.recording_file[key][0]?.response?.url ||  detail.recording_file[key][0].url
    }
    const { code, msg } = await apiAdmin.configUpdate({
        group: 'otc',
        data: {
            pi_authentication_page: {
                ...detail
            }
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const beforeUpload = (file: any): any => {
    let arr = file.name.split('.')
    let ext = arr?.[arr?.length - 1]
    let format = ['mp3', 'mp4','wav','ogg','aac','flac','m4a','webm','wma','aiff','au','midi']
    return new Promise((resolve) => {
        if (format.includes(ext)) {
            resolve(true)
        } else {
            Message.info(t('pi.pi.5um4n0qb7hc0'))
        }
    });
};
const beforeUploadImage = (file: any): any => {
    let arr = file.name.split('.')
    let ext = arr?.[arr?.length - 1]
    return new Promise((resolve) => {
        if (['jpeg', 'png', 'jpg'].includes(ext)) {
            resolve(true)
        } else {
            Message.info(t('pi.pi.5um4n0qb7j40'))
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
const reset = () => {
    form.data = cloneDeep(form.detail)
}
const getData = async () => {
    form.loading = true
    const { code, data } = await apiAdmin.configList({
        group: 'otc'
    })
    form.loading = false
    if (code != 1) return;
    let detail = data.pi_authentication_page
    detail.assets_proof_file = detail.assets_proof_file?.map((item: any) => {
        item.value = [{
            url: item.value
        }]
        return item
    })
    for (let key in detail.licensed_representative_avatar) {
        detail.licensed_representative_avatar[key] = [{
            url: detail.licensed_representative_avatar[key]
        }]
    }
    for (let key in detail.recording_file) {
        detail.recording_file[key] = [{
            name: detail.recording_file[key],
            url: detail.recording_file[key]
        }]
    }
    form.data = cloneDeep(detail)
    form.detail = cloneDeep(detail)
}
{
    getData()
}
</script>