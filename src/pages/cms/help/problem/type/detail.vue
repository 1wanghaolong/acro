<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div >
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }">
                    <a-form-item field="type" :label="$t('type.detail.5ukdzzzq4a00')">
                        <a-select disabled allow-clear v-model="form.data.type" :placeholder="$t('type.detail.5ukdzzzqefc0')">
                            <a-option v-for="item in useEnums('cms.help.problem.type')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="name.zh-CN" :label="$t('type.detail.5ukdzzzqenk0')">
                        <a-input disabled v-model="form.data.name['zh-CN']" :placeholder="$t('type.detail.5ukdzzzqes00')">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="name.en" :label="$t('type.detail.5ukdzzzqevg0')">
                        <a-input disabled v-model="form.data.name['en']" :placeholder="$t('type.detail.5ukdzzzqezw0')">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="name.tc" :label="$t('type.detail.5ukdzzzqf480')">
                        <a-input disabled v-model="form.data.name['tc']" :placeholder="$t('type.detail.5ukdzzzqf800')">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="name.tc" :label="$t('type.detail.5ukdzzzqfc00')">
                        <a-input disabled v-model="form.data.create_time" :placeholder="$t('type.detail.5ukdzzzqf800')">
                        </a-input>
                    </a-form-item>
                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        name: {
            'zh-CN': '',
            'en': '',
            'tc': ''
        },
        type: 0,
        status: 1,
        id: '',
        create_time: ''
    },
    rules: {}
})
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsHelpQuestionTypeInfo({ typeId: route.params?.id });
    if (code != 1) return;
    for (let key in form.data) {
        if (key == 'create_time') {
            form.data[key] = dayjs.unix(data[key]).format('YYYY-MM-DD HH:mm:ss')
        } else {
            form.data[key] = data[key]
        }
    }
}
{
    getData()
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