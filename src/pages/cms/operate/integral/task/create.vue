<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">
                    <a-form-item field="type" :label="$t('task.create.5ukimbf86jc0')">
                        <a-select v-model="form.data.type" :placeholder="$t('task.create.5ukimbf8msc0')">
                            <a-option @click="optionBtn(item)" v-for="item in useEnums('cms.operate.integral.task.type')"
                                :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <template v-if="form.data.type == 'add_optional'">
                        <h3>{{$t('task.create.5ukimbf8rcg0')}}</h3>
                        <a-divider />
                        <a-form-item field="rule.market" :label="$t('task.create.5ukimbf8rfw0')">
                            <a-select v-model="form.data.rule.market" :placeholder="$t('task.create.5ukimbf8msc0')">
                                <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item field="rule.symbol" :label="$t('task.create.5ukimbf94t40')">
                            <a-select v-model:model-value="form.data.rule.symbol" allow-search :placeholder="$t('task.create.5ukimbf954o0')"
                                @search="getSymbolList">
                                <a-option @click="symbolBtn(item)" v-for="item in (symbolList as any)" :value="item.symbol">
                                    {{ item.title }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                        <a-divider style="margin-top:0" />
                    </template>
                    <template v-if="form.data.type == 'trade_security'">
                        <h3>{{$t('task.create.5ukimbf8rcg0')}}</h3>
                        <a-divider />
                        <a-form-item field="rule.market" :label="$t('task.create.5ukimbf8rfw0')">
                            <a-select v-model="form.data.rule.market" :placeholder="$t('task.create.5ukimbf8msc0')">
                                <a-option v-for="item in marketAll"
                                    :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item :label="$t('task.create.5ukimbf94t40')">
                            <a-select allow-clear v-model:model-value="form.data.rule.symbol" allow-search
                                :placeholder="$t('task.create.5ukimbf954o0')" @search="getSymbolList">
                                <a-option @click="symbolBtn(item)" v-for="item in (symbolList as any)" :value="item.symbol">
                                    {{ item.title }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item field="rule.times" :label="$t('task.create.5ukimbf95980')">
                            <a-input-number hide-button v-model="form.data.rule.times" :placeholder="$t('task.create.5ukimbf95d80')">
                            </a-input-number>
                        </a-form-item>
                        <a-divider style="margin-top:0" />
                    </template>
                    <template v-if="form.data.type == 'total_cash_in'">
                        <h3>{{$t('task.create.5ukimbf8rcg0')}}</h3>
                        <a-divider />
                        <a-form-item field="rule.currency" :label="$t('task.create.5ukimbf95h00')">
                            <a-select v-model="form.data.rule.currency" :placeholder="$t('task.create.5ukimbf8msc0')">
                                <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item field="rule.amount" :label="$t('task.create.5ukimbf9dpk0')">
                            <a-input-number hide-button v-model="form.data.rule.amount" :placeholder="$t('task.create.5ukimbf9e4o0')">
                            </a-input-number>
                        </a-form-item>
                        <a-divider style="margin-top:0" />
                    </template>
                    <template v-if="form.data.type == 'first_cash_in'">
                        <h3>{{$t('task.create.5ukimbf8rcg0')}}</h3>
                        <a-divider />
                        <a-form-item field="rule.currency" :label="$t('task.create.5ukimbf95h00')">
                            <a-select v-model="form.data.rule.currency" :placeholder="$t('task.create.5ukimbf8msc0')">
                                <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                        <a-divider style="margin-top:0" />
                    </template>
                    <a-form-item field="score" :label="$t('task.create.5ukimbf9e9w0')">
                        <a-input-number hide-button v-model="form.data.score" :placeholder="$t('task.create.5ukimbf9eds0')">
                        </a-input-number>
                    </a-form-item>
                    <a-form-item field="name.zh-CN" :label="$t('task.create.5ukimbf9ei00')">
                        <a-input v-model="form.data.name['zh-CN']" :placeholder="$t('task.create.5ukimbf9em80')" />
                    </a-form-item>
                    <a-form-item field="name.en" :label="$t('task.create.5ukimbf9g400')">
                        <a-input v-model="form.data.name.en" :placeholder="$t('task.create.5ukimbf9gdg0')" />
                    </a-form-item>
                    <a-form-item field="name.tc" :label="$t('task.create.5ukimbf9gic0')">
                        <a-input v-model="form.data.name.tc" :placeholder="$t('task.create.5ukimbf9gmk0')" />
                    </a-form-item>
                    <a-form-item field="expire_type" :label="$t('task.create.5ukimbf9guw0')">
                        <a-select v-model="form.data.expire_type" :placeholder="$t('task.create.5ukimbf8msc0')">
                            <a-option v-for="item in useEnums('cms.operate.integral.task.expire_type')"
                                :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item v-if="form.data.expire_type == 1" field="is_auto_receive" :label="$t('task.create.5ukimbf9h380')">
                        <a-select v-model="form.data.is_auto_receive" :placeholder="$t('task.create.5ukimbf8msc0')">
                            <a-option v-for="item in useEnums('cms.operate.integral.task.is_auto_receive')"
                                :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item v-if="form.data.expire_type == 1" :label="$t('task.create.5ukimbf9h700')">
                        <a-input-number hide-button v-model="form.data.expire_day" :placeholder="$t('task.create.5ukimbf9hb80')">
                        </a-input-number>
                    </a-form-item>
                    <a-form-item field="icon" :label="$t('task.create.5ukimbf9hxs0')">
                        <div style="width: 100%">
                            <a-upload list-type="picture" :limit="1" :on-before-upload="beforeUpload"
                                accept=".png,.jpg,.jpeg,.gif" draggable image-preview :auto-upload="true"
                                v-model:file-list="form.data.icon" :custom-request="(upload as any)">
                                <template #upload-item="imgs">
                                    <div style="height: 165px;">
                                        <a-image :src="imgs['fileItem']?.response?.url" height="90%"
                                            style="margin-right: 67px; vertical-align: top;" :preview-visible="visible1"
                                            footer-position="outer" @preview-visible-change="() => { visible1 = false }">
                                            <template #extra>
                                                <div class="actions actions-outer">
                                                    <span class="action"
                                                        @click="() => { visible1 = true }"><icon-eye /></span>
                                                    <span class="action" @click="form.data.icon = []"><icon-delete /></span>
                                                </div>
                                            </template>
                                        </a-image>
                                    </div>
                                </template>
                            </a-upload>
                            <p style="margin-top:15px">{{$t('task.create.5ukimbf9i0s0')}}</p>
                        </div>
                    </a-form-item>
                    <a-form-item>
                        <div style="display: flex;justify-content: flex-end;width: 100%;">
                            <a-space :size="18">
                                <a-button @click="resetBtn">
                                    <template #icon>
                                        <icon-refresh />
                                    </template>
                                    {{$t('task.create.5ukimbf9i3s0')}}
                                </a-button>
                                <a-button type="primary" :loading="form.loading" :disabled="form.loading"
                                    html-type="submit">
                                    <template #icon>
                                        <icon-check />
                                    </template>
                                    {{$t('task.create.5ukimbf9i8c0')}}
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
let marketAll = [...useEnums('market.market'),{"value": 'ALL',"trans": {"zh-CN": "不限", "tc": "不限","en": "ALL"}}]
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        type: '',
        score: 0,
        expire_type: '',
        expire_day: '',
        is_auto_receive: '',
        icon: [],
        rule: {
            market: '',
            security_type: '',
            symbol: '',
            times: '',
            currency: '',
            amount: '',
        },
        name: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
    },
    rules: {
        'name.zh-CN': [{ required: true, message: t('task.create.5ukimbf9em80') }],
        'name.en': [{ required: true, message: t('task.create.5ukimbf9gdg0') }],
        'name.tc': [{ required: true, message: t('task.create.5ukimbf9gmk0') }],
        'rule.symbol': [{ required: true, message: t('task.create.5ukimbf9ijc0') }],
        'rule.market': [{ required: true, message: t('task.create.5ukimbf9imk0') }],
        'rule.times': [{ required: true, message: t('task.create.5ukimbf95d80') }],
        'rule.currency': [{ required: true, message: t('task.create.5ukimbf9iq40') }],
        'rule.amount': [{ required: true, message: t('task.create.5ukimbf9e4o0') }],
        type: [{ required: true, message: t('task.create.5ukimbf9it40') }],
        expire_type: [{ required: true, message: t('task.create.5ukimbf9iz80') }],
        is_auto_receive: [{ required: true, message: t('task.create.5ukimbf9j2o0') }],
        score: [{ required: true, message: t('task.create.5ukimbf9eds0') }],
        icon: [{ required: true, message: t('task.create.5ukimbf9j6c0') }],
        type_id: [{ required: true, type: 'array', message: t('task.create.5ukimbf9j9c0') }],
        sort: [{ required: true, type: 'array', message: t('task.create.5ukimbf9jc00') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    let param = { ...form.data }
    param.icon = form.data.icon[0]?.response?.url
    if (param.type == 'add_optional' || param.type == 'trade_security') {
        param.rule.market = param.rule.market
        if (symbolData.value?.symbol && form.data.rule.symbol) {
            param.rule.security_type = symbolData.value?.security_type
            param.rule.symbol = symbolData.value?.symbol.split(',')[0] + ''
        }

    }
    form.loading = true
    const { code, msg } = await apiCms.cmsIntegralTaskCreate({
        data: {
            ...param,
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}

const optionBtn = (val: any) => {
    console.log(val);

    form.data.rule = {
        market: '',
        security_type: '',
        symbol: '',
        times: '',
        currency: '',
        amount: '',
    }
}
const symbolData = ref()
const symbolBtn = (val: any) => {
    symbolData.value = val
}
const symbolList = ref([])
const getSymbolList = async (value: string) => {
    const { code, data } = await apiMarket.symbolSearch({ keyword: value })
    if (code != 1) return;
    symbolList.value = data.list.map((item: any) => {
        item.symbol = item.symbol + ',' + item.market
        item.title = item.text
        return item
    })
}
const beforeUpload = (file: any): any => {
    return new Promise((resolve) => {
        //判断尺寸大小
        const isSize = new Promise(function (resolve, reject) {
            let width = 60;
            let height = 42;
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
                    Message.info(t('task.create.5ukimbf9jf40'))
                }
                return file;
            },
            () => {
                Message.error(t('task.create.5ukimbf9ji80'));
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

const resetBtn = () => {
    form.data = {
        type: '',
        score: 0,
        expire_type: '',
        expire_day: '',
        is_auto_receive: '',
        icon: [],
        rule: {
            market: '',
            security_type: '',
            symbol: '',
            times: '',
            currency: '',
            amount: '',
        },
        name: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
    }
    formRef.value.resetFields()
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