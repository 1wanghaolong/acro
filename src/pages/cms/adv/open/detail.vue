<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('open.detail.5ukf99ycpng0')">
                                <a-input disabled v-model="form.data.link_url">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="status" :label="$t('open.detail.5ukf99ycqog0')">
                                <a-select disabled allow-clear v-model="form.data.status" :placeholder="$t('open.detail.5ukf99ycqtc0')">
                                    <a-option v-for="item in useEnums('cms.adv.adv.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="start_time" :label="$t('open.detail.5ukf99ycqwk0')">
                                <a-input disabled v-model="form.data.start_time">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="end_time" :label="$t('open.detail.5ukf99ycqzc0')">
                                <a-input disabled v-model="form.data.end_time">
                                </a-input>
                            </a-form-item>
                        </a-col>

                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item field="image.zh-CN" :label="$t('open.detail.5ukf99ycr200')">
                                <a-image height="100" :src="form.data.image['zh-CN']" v-if="form.data.image['zh-CN']">
                                    <template #loader>
                                        <img :src="form.data.image['zh-CN']" style="filter: blur(5px)" />
                                    </template>
                                </a-image>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="image.en" :label="$t('open.detail.5ukf99ycr4o0')">
                                <a-image height="100" :src="form.data.image['en']" v-if="form.data.image['en']">
                                    <template #loader>
                                        <img :src="form.data.image['en']" style="filter: blur(5px)" />
                                    </template>
                                </a-image>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="image.tc" :label="$t('open.detail.5ukf99ycr7g0')">
                                <a-image height="100" :src="form.data.image['tc']" v-if="form.data.image['tc']">
                                    <template #loader>
                                        <img :src="form.data.image['tc']" style="filter: blur(5px)" />
                                    </template>
                                </a-image>
                            </a-form-item>
                        </a-col>
                    </a-row>
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

    }
})
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsScreenAdvDetail({
        advId: route.params?.id
    })
    if (code != 1) return;
    for (let key in form.data) {
        form.data[key] = data[key]
    }
    form.data['end_time'] = dayjs.unix(form.data['end_time']).format('YYYY-MM-DD HH:mm:ss')
    form.data['start_time'] = dayjs.unix(form.data['start_time']).format('YYYY-MM-DD HH:mm:ss')

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