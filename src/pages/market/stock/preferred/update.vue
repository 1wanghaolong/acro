<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subname="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">

                    <a-form-item field="type" :label="$t('preferred.update.5ukebjgta9k0')">
                        <a-select v-model="form.data.type" :placeholder="$t('preferred.update.5ukebjgtaw40')">
                            <a-option @click="optionBtn(item)" v-for="item in useEnums('market.market_type')"
                                :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="code" :label="$t('preferred.update.5ukebjgtazw0')">
                        <a-select v-model:model-value="form.data.code" allow-search :placeholder="$t('preferred.update.5ukebjgtb3k0')">
                            <a-option @click="symbolBtn(item)" v-for="item in (symbolList as any)" :value="item.code">
                                {{ item.name }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="source.zh-CN" :label="$t('preferred.update.5ukebjgtb600')">
                        <a-input v-model="form.data.source['zh-CN']" :placeholder="$t('preferred.update.5ukebjgtb8c0')" />
                    </a-form-item>
                    <a-form-item field="source.en" :label="$t('preferred.update.5ukebjgtbao0')">
                        <a-input v-model="form.data.source.en" :placeholder="$t('preferred.update.5ukebjgtbd00')" />
                    </a-form-item>
                    <a-form-item field="source.tc" :label="$t('preferred.update.5ukebjgtbg00')">
                        <a-input v-model="form.data.source.tc" :placeholder="$t('preferred.update.5ukebjgtbic0')" />
                    </a-form-item>
                    <a-form-item field="title.zh-CN" :label="$t('preferred.update.5ukebjgtbks0')">
                        <a-input v-model="form.data.title['zh-CN']" :placeholder="$t('preferred.update.5ukebjgtbn40')" />
                    </a-form-item>
                    <a-form-item field="title.en" :label="$t('preferred.update.5ukebjgtbs80')">
                        <a-input v-model="form.data.title.en" :placeholder="$t('preferred.update.5ukebjgtbvw0')" />
                    </a-form-item>
                    <a-form-item field="title.tc" :label="$t('preferred.update.5ukebjgtby80')">
                        <a-input v-model="form.data.title.tc" :placeholder="$t('preferred.update.5ukebjgtc0k0')" />
                    </a-form-item>
                    <a-form-item field="content.zh-CN" :label="$t('preferred.update.5ukebjgtc4s0')">
                        <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content['zh-CN']"
                            :placeholder="$t('preferred.update.5ukebjgtc8c0')" />
                    </a-form-item>
                    <a-form-item field="content.en" :label="$t('preferred.update.5ukebjgtcag0')">
                        <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content.en"
                            :placeholder="$t('preferred.update.5ukebjgtcfk0')" />
                    </a-form-item>
                    <a-form-item field="content.tc" :label="$t('preferred.update.5ukebjgtcis0')">
                        <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content.tc"
                            :placeholder="$t('preferred.update.5ukebjgtcks0')" />
                    </a-form-item>
                    <a-form-item field="background" :label="$t('preferred.update.5ukebjgtcmw0')">
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
                            <p style="margin-top: 10px;">{{$t('preferred.update.5ukebjgtcoo0')}}</p>
                        </div>
                    </a-form-item>
                    <a-form-item>
                        <div style="display: flex;justify-content: flex-end;width: 100%;">
                            <a-space :size="18">
                                <a-button @click="resetBtn">
                                    <template #icon>
                                        <icon-refresh />
                                    </template>
                                    {{$t('preferred.update.5ukebjgtcqg0')}}
                                </a-button>
                                <a-button type="primary" :loading="form.loading" :disabled="form.loading"
                                    html-type="submit">
                                    <template #icon>
                                        <icon-check />
                                    </template>
                                    {{$t('preferred.update.5ukebjgtcso0')}}
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
        'source.zh-CN': [{ required: true, message: t('preferred.update.5ukebjgtb8c0') }],
        'source.en': [{ required: true, message: t('preferred.update.5ukebjgtbd00') }],
        'source.tc': [{ required: true, message: t('preferred.update.5ukebjgtbic0') }],
        'title.zh-CN': [{ required: true, message: t('preferred.update.5ukebjgtbn40') }],
        'title.en': [{ required: true, message: t('preferred.update.5ukebjgtbvw0') }],
        'title.tc': [{ required: true, message: t('preferred.update.5ukebjgtc0k0') }],
        'content.zh-CN': [{ required: true, message: t('preferred.update.5ukebjgtc8c0') }],
        'content.en': [{ required: true, message: t('preferred.update.5ukebjgtcfk0') }],
        'content.tc': [{ required: true, message: t('preferred.update.5ukebjgtcks0') }],
        type: [{ required: true, message: t('preferred.update.5ukebjgtcug0') }],
        code: [{ required: true, message: t('preferred.update.5ukebjgtcwc0') }],
        background: [{ required: true, message: t('preferred.update.5ukebjgtcy80') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    let param = { ...form.data }
    param.background = form.data.background[0]?.response?.url
    form.loading = true
    const { code, msg } = await apiMarket.symbolPreferredPlateUpdate({
        plateId: route.params?.id,
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
    getData()
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
            Message.info(t('preferred.update.5ukebjgtd0g0'))
        }
    });
};
// 详情
const getData = async () => {
    const { code, data } = await apiMarket.symbolPreferredPlateInfo({
        plateId: route.params?.id
    })
    if (code != 1) return;
    for (let key in form.data) {
        form.data[key] = data[key]
    }
    form.data.background = [{
        uid: '1',
        name: form.data.background,
        url: form.data.background,
        response: {
            url: form.data.background,
        }
    }]



}
getData()
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