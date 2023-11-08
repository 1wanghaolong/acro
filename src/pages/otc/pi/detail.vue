<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-card :loading="loading">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('pi.detail.5um7pe3m5og0')}}
                        </a-space>
                        <a-space :size="18" v-permission="['otcPiAudit']">
                            <a-button v-if="form.data?.status == 1" @click="audit.show = true;audit.data.status = 2" type="primary" :loading="form.loading" :disabled="form.loading">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('pi.detail.5um7pe3m78s0')}}
                            </a-button>
                            <a-button v-if="form.data?.status == 1" @click="audit.show = true;audit.data.status = 3" type="primary" status="danger">
                                <template #icon>
                                    <icon-close />
                                </template>
                                {{$t('pi.detail.5um7pe3m7dg0')}}
                            </a-button>
                        </a-space>
                    </div>
                </template>
                <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('pi.detail.5um7pe3m7gg0')">
                                {{ form.data?.asset_account_info?.account }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('pi.detail.5um7pe3m7j40')">
                                <div>{{ form.data?.asset_account_info?.real_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('pi.detail.5um7pe3m7mo0')">
                                <div>{{ form.data?.asset_account_info?.english_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('pi.detail.5um7pe3m7po0')">
                                <a-tag>
                                    {{ useEnumsFormat('otc.pi.from_type', form.data?.from_type) }}
                                </a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('pi.detail.5um7pe3m7u80')">
                                <a-tag size="small" :color="form.data.status == 2?'#00b42a':form.data.status == 1?'#ff7d00':'#f53f3f'">
                                    {{ useEnumsFormat('otc.pi.status', form.data.status) }}
                                </a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('pi.detail.5um7pe3m8140')">
                                {{ dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data.status != 1">
                            <a-form-item :label="$t('pi.detail.5um7pe3m8900')">
                                {{ form.data.audit_time?dayjs.unix(form.data.audit_time).format('YYYY-MM-DD HH:mm:ss'):'-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['zh-CN']">
                            <a-form-item :label="$t('pi.detail.5um7pe3m8dg0')">
                                {{ form.data?.reasons?.['zh-CN'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['en']">
                            <a-form-item :label="$t('pi.detail.5um7pe3m8gw0')">
                                {{ form.data?.reasons?.['en'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['tc']">
                            <a-form-item :label="$t('pi.detail.5um7pe3m8k80')">
                                {{ form.data?.reasons?.['tc'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" v-if="form.data?.voucher">
                            <a-form-item :label="$t('pi.detail.5um7pe3m8og0')">
                                <a-image-preview-group infinite>
                                    <a-space wrap>
                                        <a-image v-for="item in form.data?.voucher?.split(',')" :src="item" width="200" />
                                    </a-space>
                                </a-image-preview-group>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-card>
        <!-- 审核 -->
        <a-modal v-model:visible="audit.show" :title="audit.data.status == 2? $t('pi.detail.5um7pe3m78s0') : $t('pi.detail.5um7pe3m7dg0') " @cancel="audit.show = false" @before-ok="submit">
            <a-form ref="auditFormRef" :model="audit.data" auto-label-width>
                <!-- 审核通过 -->
                <template v-if="audit.data.status == 2">
                    {{$t('pi.detail.5um7pe3m8r00')}}
                </template>
                <!-- 驳回 -->
                <template v-else>
                    <a-form-item field="reasons['zh-CN']" :label="$t('pi.detail.5um7pe3m8sw0')">
                        <a-input v-model="audit.data.reasons['zh-CN']" :placeholder="$t('pi.detail.5um7pe3m8v40')" />
                    </a-form-item>
                    <a-form-item field="reasons['en']" :label="$t('pi.detail.5um7pe3m8xc0')">
                        <a-input v-model="audit.data.reasons['en']" :placeholder="$t('pi.detail.5um7pe3mao80')"  />
                    </a-form-item>
                    <a-form-item field="reasons['tc']" :label="$t('pi.detail.5um7pe3masg0')">
                        <a-input v-model="audit.data.reasons['tc']" :placeholder="$t('pi.detail.5um7pe3mavg0')"  />
                    </a-form-item>
                </template>
            </a-form>
        </a-modal>
    </div>
    
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const { t } = useI18n();
const router = useRouter()
const formRef = ref()
const auditFormRef = ref()
const loading = ref(false)
const form:any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {},
    rules: {
        real_name: [{ required: true, message: t('pi.detail.5um7pe3maxg0') }],
        english_name: [{ required: true, message: t('pi.detail.5um7pe3mb000') }],
        email: [{ required: true, message: t('pi.detail.5um7pe3mb1k0') }, { type: 'email', message: t('pi.detail.5um7pe3mb3g0') }]
    }
})
const audit = reactive({
    loading:false,
    show:false,
    data:{
        status:2,
        reasons:{
            'zh-CN':'',
            en:'',
            tc:''
        }
    }
})
const submit = async () => {
    const validate = await auditFormRef.value?.validate()
    if (validate) return false;
    audit.loading = true
    const { code, msg } = await apiOtc.piAuthenticationUpdate({
        id:form.data.id,
        data:{
            operator_id:local.userInfo?.id || 1,
            ...audit.data
        }
    })
    audit.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiOtc.piAuthenticationInfo({
        id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
}
{
    getData()
}

</script>

<style lang="less" scoped>
:deep(.arco-form-item-label-col > .arco-form-item-label) {
    color: var(--color-text-3);
}
</style>