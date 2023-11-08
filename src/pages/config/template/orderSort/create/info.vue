<template>
    <a-form style="padding-top: 20px;" ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
        :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
        <a-form-item field="name.zh-CN" :label="$t('create.info.5umyyd7ewi80')">
            <a-input v-model="form.data.name['zh-CN']" :placeholder="$t('create.info.5umyyd7ex440')">
            </a-input>
        </a-form-item>
        <a-form-item field="name.en" :label="$t('create.info.5umyyd7ex8o0')">
            <a-input v-model="form.data.name['en']" :placeholder="$t('create.info.5umyyd7exbs0')">
            </a-input>
        </a-form-item>
        <a-form-item field="name.tc" :label="$t('create.info.5umyyd7exes0')">
            <a-input v-model="form.data.name['tc']" :placeholder="$t('create.info.5umyyd7exhw0')">
            </a-input>
        </a-form-item>
        <a-form-item field="desc.zh-CN" :label="$t('create.info.5umyyd7exl00')">
            <a-textarea v-model="form.data.desc['zh-CN']" :placeholder="$t('create.info.5umyyd7exok0')">
            </a-textarea>
        </a-form-item>
        <a-form-item field="desc.en" :label="$t('create.info.5umyyd7exrk0')">
            <a-textarea v-model="form.data.desc['en']" :placeholder="$t('create.info.5umyyd7exug0')">
            </a-textarea>
        </a-form-item>
        <a-form-item field="desc.tc" :label="$t('create.info.5umyyd7exy00')">
            <a-textarea v-model="form.data.desc['tc']" :placeholder="$t('create.info.5umyyd7ey0w0')">
            </a-textarea>
        </a-form-item>
        <a-form-item field="status" :label="$t('create.info.5umyyd7ey400')">
            <a-switch v-model="form.data.status" :checked-value="1" :unchecked-value="0" />
        </a-form-item>
        <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
                <a-space :size="18">
                    <a-button type="primary" html-type="submit">
                        {{$t('create.info.5um7xwky7sc0')}}
                    </a-button>
                </a-space>
            </div>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
const props = defineProps({
    data: Object,
    current: Number
})
const { t } = useI18n();
const formRef: any = ref(null)
const form:any = ref({
    show: false,
    loading: false,
    accountList: [],
    data: {
        "name": {
            "zh-CN": "",
            "en": "",
            "tc": ""
        },
        "desc": {
            "zh-CN": "",
            "en": "",
            "tc": ""
        },
        status:0
    },
    rules: {
        'name.zh-CN': [{ required: true, message: t('create.info.5umyyd7ey6s0') }],
        'name.en': [{ required: true, message: t('create.info.5umyyd7eya80') }],
        'name.tc': [{ required: true, message: t('create.info.5umyyd7eydk0') }],
        // 'desc.zh-CN': [{ required: true, message: '请输入备注中' }],
        // 'desc.en': [{ required: true, message: '请输入备注英' }],
        // 'desc.tc': [{ required: true, message: '请输入备注繁' }],
        'status': [{ required: true, message: t('create.info.5umyyd7eygk0') }],
    }
})
const emit = defineEmits(['update:current', 'update:data']);
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    emit('update:current', Number(props.current) + 1)
}
const watchData = watch(() => form.value.data, (data) => {
    emit('update:data', { ...props.data, ...data })
}, {
    deep: true
})
onBeforeUnmount(() => {
    watchData && watchData()
})
onMounted(() => {
    form.value.data = { ...form.value.data, ...props.data }
})

</script>