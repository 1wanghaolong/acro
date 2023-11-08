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
                            <a-form-item field="title.zh-CN" :label="$t('match.detail.5ukjnezji400')">
                                <a-input disabled v-model="form.data.title['zh-CN']" :placeholder="$t('match.detail.5ukjnezjje80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="title.en" :label="$t('match.detail.5ukjnezjjok0')">
                                <a-input disabled v-model="form.data.title.en" :placeholder="$t('match.detail.5ukjnezjjuc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="title.tc" :label="$t('match.detail.5ukjnezjjzg0')">
                                <a-input disabled v-model="form.data.title.tc" :placeholder="$t('match.detail.5ukjnezjk4w0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="type" :label="$t('match.detail.5ukjnezjka00')">
                                <a-select disabled v-model="form.data.type" :placeholder="$t('match.detail.5ukjnezjkyk0')">
                                    <a-option v-for="item in useEnums('market.market_type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="period" :label="$t('match.detail.5ukjnezjl5o0')">
                                <a-select disabled v-model="form.data.period" :placeholder="$t('match.detail.5ukjnezjkyk0')">
                                    <a-option v-for="item in useEnums('cms.operate.symbol.match.period')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="is_cycle" :label="$t('match.detail.5ukjnezjlas0')">
                                <a-select disabled v-model="form.data.is_cycle" :placeholder="$t('match.detail.5ukjnezjkyk0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="start_time" :label="$t('match.detail.5ukjnezjlio0')">
                                <a-input disabled v-model="form.data.start_time" :placeholder="$t('match.detail.5ukjnezjlio0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="end_time" :label="$t('match.detail.5ukjnezjlo00')">
                                <a-input disabled v-model="form.data.end_time" :placeholder="$t('match.detail.5ukjnezjlo00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="banner" :label="$t('match.detail.5ukjnezjlso0')">
                                <a-image height="100" :src="form.data.banner" v-if="form.data.banner">
                                    <template #loader>
                                        <img :src="form.data.banner" style="filter: blur(5px)" />
                                    </template>
                                </a-image>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="background" :label="$t('match.detail.5ukjnezjmg80')">
                                <a-image height="100" :src="form.data.background" v-if="form.data.background">
                                    <template #loader>
                                        <img :src="form.data.background" style="filter: blur(5px)" />
                                    </template>
                                </a-image>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="status" :label="$t('match.detail.5ukjnezjmno0')">
                                <a-select disabled v-model="form.data.status" :placeholder="$t('match.detail.5ukjnezjkyk0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
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
    }
})
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsMatchInfo({
        matchId: route.params?.id
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
}</style>