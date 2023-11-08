<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-card :loading="loading">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('apply.detail.5um8i5iqpow0')}}
                        </a-space>
                        <a-space :size="18" v-permission="['trsAccountApplyAudit']">
                            <a-button v-if="form.data?.status == 0" @click="audit.show = true;audit.data.status = 1" type="primary" :loading="form.loading" :disabled="form.loading">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('apply.detail.5um8i5iqqcc0')}}
                            </a-button>
                            <a-button v-if="form.data?.status == 0" @click="audit.show = true;audit.data.status = 2" type="primary" status="danger">
                                <template #icon>
                                    <icon-close />
                                </template>
                                {{$t('apply.detail.5um8i5iqqjk0')}}
                            </a-button>
                        </a-space>
                    </div>
                </template>
                <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqqq80')">
                                {{ form.data?.asset_account_info?.account }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqqvw0')">
                                <div>{{ form.data?.asset_account_info?.real_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqr180')">
                                <div>{{ form.data?.asset_account_info?.english_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqr7w0')">
                                <a-tag>
                                    {{ useEnumsFormat('market.market_type',form.data?.market_type) }}
                                </a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqrcs0')">
                                <a-tag>{{ form.data?.currency }}</a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqrhk0')">
                                <div>{{ form.data?.total_cash }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqrm40')">
                                <div>{{ form.data?.multiple }}{{$t('apply.detail.5um8ik6glvs0')}}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqrt40')">
                                <div>{{ form.data?.time_limit }}{{$t('apply.detail.5um8ik6gn5k0')}}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqrzg0')">
                                <a-tag>{{ useEnumsFormat('trs.account.interest_accrual_type',form.data?.interest_accrual_type) }}</a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqs4k0')">
                                <div>{{ form.data?.annual_interest_rate }}%</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqs9c0')">
                                <div>{{ form.data?.warn_value }}% {{$t('apply.detail.5um8i5iqse80')}}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqsis0')">
                                <div>{{ form.data?.close_value }}% {{$t('apply.detail.5um8i5iqse80')}}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqso40')">
                                <div>{{ form.investmentScopeTemplate?.find((item:any)=>item.id == form.data?.investment_scope_temp_id)?.name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqsu40')">
                                {{ dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data.status != 0">
                            <a-form-item :label="$t('apply.detail.5um8i5iqsz40')">
                                {{ form.data.check_time?dayjs.unix(form.data.check_time).format('YYYY-MM-DD HH:mm:ss'):'-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqt3w0')">
                                <a-tag size="small" :color="form.data?.status == 1?'#00b42a':form.data?.status == 0?'#ff7d00':'#f53f3f'">
                                    {{ useEnumsFormat('trs.account.apply.status',form.data?.status) }}
                                </a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['zh-CN']">
                            <a-form-item :label="$t('apply.detail.5um8i5iqt9o0')">
                                {{ form.data?.reasons?.['zh-CN'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['en']">
                            <a-form-item :label="$t('apply.detail.5um8i5iqtdo0')">
                                {{ form.data?.reasons?.['en'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['tc']">
                            <a-form-item :label="$t('apply.detail.5um8i5iqthk0')">
                                {{ form.data?.reasons?.['tc'] || '-' }}
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-card>
        <!-- 审核 -->
        <a-modal v-model:visible="audit.show" :title="audit.data.status == 1? $t('apply.detail.5um8i5iqqcc0') : $t('apply.detail.5um8i5iqqjk0') " @cancel="audit.show = false" @before-ok="submit">
            <a-form ref="auditFormRef" :model="audit.data" auto-label-width>
                <!-- 审核通过 -->
                <template v-if="audit.data.status == 1">
                    {{$t('apply.detail.5um8i5iqtlc0')}}
                </template>
                <!-- 驳回 -->
                <template v-else>
                    <a-form-item field="reasons['zh-CN']" :label="$t('apply.detail.5um8i5iqtog0')">
                        <a-input v-model="audit.data.reasons['zh-CN']" :placeholder="$t('apply.detail.5um8i5iqtw00')" />
                    </a-form-item>
                    <a-form-item field="reasons['en']" :label="$t('apply.detail.5um8i5iqtzk0')">
                        <a-input v-model="audit.data.reasons['en']" :placeholder="$t('apply.detail.5um8i5iqu380')"  />
                    </a-form-item>
                    <a-form-item field="reasons['tc']" :label="$t('apply.detail.5um8i5iqu6g0')">
                        <a-input v-model="audit.data.reasons['tc']" :placeholder="$t('apply.detail.5um8i5iqua40')"  />
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
const router = useRouter()
const formRef = ref()
const auditFormRef = ref()
const loading = ref(false)
const form:any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {},
    investmentScopeTemplate:[]
})
const audit = reactive({
    loading:false,
    show:false,
    data:{
        status:1,
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
    if(audit.data.status == 1) {
        router.push({name:'trsAccountCreate',query:{apply_id:route.params?.id}})
        return;
    }
    audit.loading = true
    const { code, msg } = await apiTrs.accountApplyCheck({
        apply_id:route.params?.id,
        operator_id:local.userInfo?.id || 1,
        ...audit.data
    })
    audit.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const getInvestmentScopeTemplate = async () => {
    const { code, data } = await apiTrs.investmentScopeTemplateAll({
        ...useFilter({ status: 1 })
    })
    if (code != 1) return;
    form.investmentScopeTemplate = data?.length?data:[]
}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiTrs.accountApplyInfo({
        apply_id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
}
{
    getData()
    getInvestmentScopeTemplate()
}

</script>

<style lang="less" scoped>
:deep(.arco-form-item-label-col > .arco-form-item-label) {
    color: var(--color-text-3);
}
</style>