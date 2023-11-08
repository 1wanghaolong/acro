<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subname="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">
                    <a-form-item field="name.zh-CN" :label="$t('cdkey.create.5ukg5z7w52g0')">
                        <a-input v-model="form.data.name['zh-CN']" :placeholder="$t('cdkey.create.5ukg5z7wobw0')" />
                    </a-form-item>
                    <a-form-item field="name.en" :label="$t('cdkey.create.5ukg5z7wpuc0')">
                        <a-input v-model="form.data.name.en" :placeholder="$t('cdkey.create.5ukg5z7wq1g0')" />
                    </a-form-item>
                    <a-form-item field="name.tc" :label="$t('cdkey.create.5ukg5z7wqmo0')">
                        <a-input v-model="form.data.name.tc" :placeholder="$t('cdkey.create.5ukg5z7wqro0')" />
                    </a-form-item>
                    <a-form-item field="grant_num" :label="$t('cdkey.create.5ukg5z7wr0g0')">
                        <a-input-number hide-button v-model="form.data.grant_num" :placeholder="$t('cdkey.create.5ukg5z7wr500')">
                        </a-input-number>
                    </a-form-item>
                    <a-form-item field="market_type" :label="$t('cdkey.create.5ukg5z7wz0w0')">
                        <a-select v-model="form.data.market_type" :placeholder="$t('cdkey.create.5ukg5z7wzdo0')">
                            <a-option @click="optionBtn(item)"
                                v-for="item in useEnums('cms.operate.quote.market.marketType')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                   <template v-if="form.data.market_type">
                    <a-form-item field="quote_level" :label="$t('cdkey.create.5ukg5z7wzh40')">
                        <a-select disabled allow-clear v-model="form.data.quote_level" :placeholder="$t('cdkey.create.5ukg5z7wzdo0')">
                            <a-option v-for="item in useEnums('cms.operate.quote.market.quoteLevel')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="level" :label="$t('cdkey.create.5ukg5z7wzk80')">
                        <a-select v-if="form.data.market_type == 'US'" allow-clear
                            v-model="form.data.level" :placeholder="$t('cdkey.create.5ukg5z7wzdo0')">
                            <a-option v-for="item in useEnums('cms.operate.quote.market.levelUS')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                        <a-select v-else allow-clear v-model="form.data.level" :placeholder="$t('cdkey.create.5ukg5z7wzdo0')">
                            <a-option v-for="item in useEnums('cms.operate.quote.market.level')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                   </template>
                    <a-form-item field="day" :label="$t('cdkey.create.5ukg5z7wzoo0')">
                        <a-input-number :style="{ width: '220px' }" :placeholder="$t('cdkey.create.5ukg5z7wzr40')" v-model="form.data.day"
                            mode="button" class="input-demo" />
                    </a-form-item>
                    <a-form-item field="notice.zh-CN" :label="$t('cdkey.create.5ukg5z7wztc0')">
                        <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.notice['zh-CN']"
                            :placeholder="$t('cdkey.create.5ukg5z7wzy00')" />
                    </a-form-item>
                    <a-form-item field="notice.en" :label="$t('cdkey.create.5ukg5z7x00g0')">
                        <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.notice.en"
                            :placeholder="$t('cdkey.create.5ukg5z7x0340') "/>
                    </a-form-item>
                    <a-form-item field="notice.tc" :label="$t('cdkey.create.5ukg5z7x07g0')">
                        <a-textarea :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.notice.tc"
                            :placeholder="$t('cdkey.create.5ukg5z7x0oc0')" />
                    </a-form-item>
                    <a-form-item>
                        <div style="line-height: 22px;">
                            {{$t('cdkey.create.5ukg5z7x0vc0')}}
                            <br>
                            1、{{$t('cdkey.create.5ukg7kof9oc0')}}
                            <br>
                            2、{{$t('cdkey.create.5ukg7koff9w0')}}
                            <br>
                            3、{{$t('cdkey.create.5ukg7kofg0g0')}}
                        </div>
                    </a-form-item>
                    <a-form-item>
                        <div style="display: flex;justify-content: flex-end;width: 100%;">
                            <a-space :size="18">
                                <a-button @click="resetBtn">
                                    <template #icon>
                                        <icon-refresh />
                                    </template>
                                    {{$t('cdkey.create.5ukg5z7x0xc0')}}
                                </a-button>
                                <a-button type="primary" :loading="form.loading" :disabled="form.loading"
                                    html-type="submit">
                                    <template #icon>
                                        <icon-check />
                                    </template>
                                    {{$t('cdkey.create.5ukg5z7x0zk0')}}
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
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        market_type: '',
        grant_num: 0,
        day: 30,
        name: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        notice: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        level:'',
        quote_level: 1,
    },
    rules: {
        'name.zh-CN': [{ required: true, message: t('cdkey.create.5ukg5z7wobw0') }],
        'name.en': [{ required: true, message: t('cdkey.create.5ukg5z7wq1g0') }],
        'name.tc': [{ required: true, message: t('cdkey.create.5ukg5z7wqro0') }],
        'notice.zh-CN': [{ required: true, message: t('cdkey.create.5ukg5z7wzy00') }],
        'notice.en': [{ required: true, message: t('cdkey.create.5ukg5z7x0340') }],
        'notice.tc': [{ required: true, message: t('cdkey.create.5ukg5z7x0oc0') }],
        market_type: [{ required: true, message: t('cdkey.create.5ukg5z7x13s0') }],
        grant_num: [{ required: true, message: t('cdkey.create.5ukg5z7wr500') }],
        day: [{ required: true, message: t('cdkey.create.5ukg5z7wzoo0') }],
        level: [{ required: true, message: t('cdkey.create.5ukg5z7x20k0') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiCms.cmsQuoteCdkeyActiveCreate({
        data: {
            ...form.data,
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const optionBtn = (val: any) => {
    if (val.value == 'US') {
        form.data.quote_level = 1
        form.data.currency = 'USD'
        form.data.level = form.data.level == '3' ? form.data.level : ''
    } else {
        form.data.quote_level = 2
        form.data.currency = 'HKD'
    }

}
const resetBtn = () => {
    form.data = {
        market_type: '',
        grant_num: 0,
        day: 30,
        name: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        notice: {
            'zh-CN': '',
            en: '',
            tc: ''
        },
        level:'',
        quote_level: 1,
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
</style>