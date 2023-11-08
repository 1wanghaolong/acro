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
                         
                    <a-form-item :label="$t('client.detail.5ukkt3od6e80')">
                        <a-input disabled v-model="form.data.country_code">
                        </a-input>
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item :label="$t('client.detail.5ukkt3od7nw0')">
                        <a-input disabled v-model="form.data.mobile">
                        </a-input>
                    </a-form-item>
                    </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item :label="$t('client.detail.5ukkt3od7w00')">
                        <a-input disabled v-model="form.data.nickname">
                        </a-input>
                    </a-form-item>
                    </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item :label="$t('client.detail.5ukkt3od80g0')">
                        <a-input disabled v-model="form.data.real_name">
                        </a-input>
                    </a-form-item>
                    </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item field="image.zh-CN" :label="$t('client.detail.5ukkt3od83k0')">
                        <div v-if="form.data.avatar">
                            <a-image style="margin:2px" height="100" :src="form.data.avatar">
                                <template #loader>
                                    <img :src="form.data.avatar" style="filter: blur(5px)" />
                                </template>
                            </a-image>
                        </div>
                        <div v-else>{{ '--' }}</div>
                    </a-form-item>
                    </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item field="sex" :label="$t('client.detail.5ukkt3od89s0')">
                        <a-select disabled allow-clear v-model="form.data.sex" :placeholder="$t('client.detail.5ukkt3od8gw0')">
                            <a-option v-for="item in useEnums('otc.customer.otc.sex')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item :label="$t('client.detail.5ukkt3od8l40')">
                        <a-input disabled v-model="form.data.score">
                        </a-input>
                    </a-form-item>
                    </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item :label="$t('client.detail.5ukkt3od8p00')">
                        <a-input v-if="form.data.is_open" disabled v-model="form.data.is_open_name">
                        </a-input>
                        <a-input v-else disabled v-model="form.data.is_open_name">
                        </a-input>
                    </a-form-item>
                    </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item field="status" :label="$t('client.detail.5ukkt3od8sw0')">
                        <a-select disabled allow-clear v-model="form.data.status" :placeholder="$t('client.detail.5ukkt3od8gw0')">
                            <a-option v-for="item in useEnums('cms.client.client.status')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item field="create_time" :label="$t('client.detail.5ukkt3od8xs0')">
                        <a-input disabled v-model="form.data.create_time">
                        </a-input>
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
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {},
    rules: {

    }
})
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsUserDetail({
        userId: route.params?.id
    })
    if (code != 1) return;
    data.is_open_name = data.is_open ? t('client.detail.5ukkt3od91o0') : t('client.detail.5ukkt3od94w0')
    form.data = data
    form.data['create_time'] = dayjs.unix(form.data['create_time']).format('YYYY-MM-DD HH:mm:ss')
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