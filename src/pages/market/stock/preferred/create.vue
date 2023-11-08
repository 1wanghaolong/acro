<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subname="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">

                    <a-form-item field="type" :label="$t('preferred.create.5uke8d0xrq80')">
                        <a-select v-model="form.data.type" :placeholder="$t('preferred.create.5uke8d0xszk0')">
                            <a-option @click="optionBtn(item)" v-for="item in useEnums('market.market_type')"
                                :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="code" :label="$t('preferred.create.5uke8d0xt7k0')">
                        <a-select v-model:model-value="form.data.code" allow-search :placeholder="$t('preferred.create.5uke8d0xtd80')">
                            <a-option @click="symbolBtn(item)" v-for="item in (symbolList as any)" :value="item.code">
                                {{ item.name }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="source.zh-CN" :label="$t('preferred.create.5uke8d0xtjs0')">
                        <a-input v-model="form.data.source['zh-CN']" :placeholder="$t('preferred.create.5uke8d0xtpc0')" />
                    </a-form-item>
                    <a-form-item field="source.en" :label="$t('preferred.create.5uke8d0xtw80')">
                        <a-input v-model="form.data.source.en" :placeholder="$t('preferred.create.5uke8d0xu3g0')" />
                    </a-form-item>
                    <a-form-item field="source.tc" :label="$t('preferred.create.5uke8d0xu8k0')">
                        <a-input v-model="form.data.source.tc" :placeholder="$t('preferred.create.5uke8d0xue80')" />
                    </a-form-item>
                    <a-form-item field="title.zh-CN" :label="$t('preferred.create.5uke8d0xulc0')">
                        <a-input v-model="form.data.title['zh-CN']" :placeholder="$t('preferred.create.5uke8d0xuro0')" />
                    </a-form-item>
                    <a-form-item field="title.en" :label="$t('preferred.create.5uke8d0xuy00')">
                        <a-input v-model="form.data.title.en" :placeholder="$t('preferred.create.5uke8d0xv4k0')" />
                    </a-form-item>
                    <a-form-item field="title.tc" :label="$t('preferred.create.5uke8d0xvao0')">
                        <a-input v-model="form.data.title.tc" :placeholder="$t('preferred.create.5uke8d0xvfo0')" />
                    </a-form-item>
                    <a-form-item field="content.zh-CN" :label="$t('preferred.create.5uke8d0xvqo0')">
                        <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content['zh-CN']"
                            :placeholder="$t('preferred.create.5uke8d0xvxs0')" />
                    </a-form-item>
                    <a-form-item field="content.en" :label="$t('preferred.create.5uke8d0xw4s0')">
                        <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content.en"
                            :placeholder="$t('preferred.create.5uke8d0xwck0')" />
                    </a-form-item>
                    <a-form-item field="content.tc" :label="$t('preferred.create.5uke8d0xwkc0')">
                        <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content.tc"
                            :placeholder="$t('preferred.create.5uke8d0xwpw0')" />
                    </a-form-item>
                    <a-form-item field="background" :label="$t('preferred.create.5uke8d0xwv40')">
                        <div style="width: 100%">
                            <a-upload list-type="picture" :limit="1" :on-before-upload="beforeUpload"
                                accept=".png,.jpg,.jpeg,.gif" draggable image-preview :auto-upload="true"
                                v-model:file-list="form.data.background" :custom-request="(upload as any)">
                                <template #upload-item="imgs">
                                    <div style="height: 165px;">
                                    <a-image :src="imgs['fileItem']?.response?.url" height="90%"
                                        style="margin-right: 67px; vertical-align: top;" :preview-visible="visible1"
                                        footer-position="outer" @preview-visible-change="() => { visible1 = false }">
                                        <template #extra>
                                            <div class="actions actions-outer">
                                                <span class="action" @click="() => { visible1 = true }"><icon-eye /></span>
                                                <span class="action" @click="form.data.background=[]"><icon-delete /></span>
                                            </div>
                                        </template>
                                    </a-image>
                                </div>
                                </template>
                            </a-upload>
                            <p style="margin-top: 10px;">{{$t('preferred.create.5uke8d0xx1g0')}}</p>
                        </div>
                    </a-form-item>
                    <a-form-item>
                        <div style="display: flex;justify-content: flex-end;width: 100%;">
                            <a-space :size="18">
                                <a-button @click="resetBtn">
                                    <template #icon>
                                        <icon-refresh />
                                    </template>
                                    {{$t('preferred.create.5uke8d0xx5w0')}}
                                </a-button>
                                <a-button type="primary" :loading="form.loading" :disabled="form.loading"
                                    html-type="submit">
                                    <template #icon>
                                        <icon-check />
                                    </template>
                                    {{$t('preferred.create.5uke8d0xxcg0')}}
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
import { useEnums } from '@/hooks/enums'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const visible1 = ref(false);
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        type: '',
        code: '',
        source: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        content: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        title: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        background: [],
    },
    rules: {
        'source.zh-CN': [{ required: true, message: t('preferred.create.5uke8d0xtpc0') }],
        'source.en': [{ required: true, message: t('preferred.create.5uke8d0xu3g0') }],
        'source.tc': [{ required: true, message: t('preferred.create.5uke8d0xue80') }],
        'title.zh-CN': [{ required: true, message: t('preferred.create.5uke8d0xuro0') }],
        'title.en': [{ required: true, message: t('preferred.create.5uke8d0xv4k0') }],
        'title.tc': [{ required: true, message: t('preferred.create.5uke8d0xvfo0') }],
        'content.zh-CN': [{ required: true, message: t('preferred.create.5uke8d0xvxs0') }],
        'content.en': [{ required: true, message: t('preferred.create.5uke8d0xwck0') }],
        'content.tc': [{ required: true, message: t('preferred.create.5uke8d0xwpw0') }],
        type: [{ required: true, message: t('preferred.create.5uke8d0xxgc0') }],
        code: [{ required: true, message: t('preferred.create.5uke8d0xxlk0') }],
        background: [{ required: true, message: t('preferred.create.5uke8d0xxr80') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    let param = { ...form.data }
    param.background = form.data.background[0]?.response?.url
    form.loading = true
    const { code, msg } = await apiMarket.symbolPreferredPlateCreate({
        data: param
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const optionBtn = (val: any) => {
    form.data.code = ''
    getSymbolList(val.value)

}
const resetBtn = () => {
    form.data = {
        type: '',
        code: '',
        source: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        content: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        title: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        background: [],
    }
    formRef.value.resetFields()
}
const symbolData = ref()
const symbolBtn = (val: any) => {
    symbolData.value = val
}
const symbolList = ref([])
const getSymbolList = async (value: string) => {
    const { code, data } = await apiMarket.symbolConceptPlateList({ 'filter[market]': value })
    if (code != 1) return;
    symbolList.value = data
}
const beforeUpload = (file: any): any => {
    return new Promise((resolve) => {
        if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            resolve(true)
        } else {
            Message.info(t('preferred.create.5uke8d0xxwk0'))
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
:deep(.arco-image-img){
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