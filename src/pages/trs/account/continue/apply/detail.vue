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
                        <a-space :size="18" v-permission="['trsAccountContinueApplyAudit']">
                            <a-button v-if="form.data?.status == 1" @click="audit.show = true;audit.data.status = 2" type="primary" :loading="form.loading" :disabled="form.loading">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('apply.detail.5um8i5iqqcc0')}}
                            </a-button>
                            <a-button v-if="form.data?.status == 1" @click="audit.show = true;audit.data.status = 3" type="primary" status="danger">
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
                            <a-form-item :label="`TRS${ $t('apply.detail.5um8lff2geo0') }`">
                                {{ form.data?.trs_account_info?.account }}
                            </a-form-item>
                        </a-col>
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
                            <a-form-item :label="$t('apply.detail.5um8lff2gvw0')">
                                <a-tag>{{ form.data?.trs_account_info.currency }}</a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.status == 1">
                            <a-form-item :label="$t('apply.detail.5um8i5iqrhk0')">
                                <div>{{ form.data?.trs_account_info?.total_cash }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.status == 1">
                            <a-form-item :label="$t('apply.detail.5um8lff2gzg0')">
                                <div>{{ form.data?.trs_account_info?.total_finance }}</div>
                            </a-form-item>
                        </a-col>
                        <!-- <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8yj0a9m80')">
                                {{ dayjs.unix(form.data?.before_expire_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col> -->
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8xaktge40')">
                                {{ dayjs.unix(form.data?.after_expire_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8yj0aa5s0')">
                                {{ form.data?.update_time_limit }}{{$t('apply.detail.5um8ik6gn5k0')}}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqsu40')">
                                {{ dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqt3w0')">
                                <a-tag size="small" :color="form.data?.status == 2?'#00b42a':form.data?.status == 1?'#ff7d00':'#f53f3f'">
                                    {{ useEnumsFormat('trs.account.terminate.apply.status',form.data?.status) }}
                                </a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('apply.detail.5um8i5iqsz40')">
                                {{ form.data.check_time?dayjs.unix(form.data.check_time).format('YYYY-MM-DD HH:mm:ss'):'-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.status == 1">
                            <a-form-item :label="$t('apply.detail.5um8lff2h800')">
                                {{ form.data?.trs_account_info?.total_asset }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.status == 1">
                            <a-form-item :label="$t('apply.detail.5um8lff2h9w0')">
                                {{ form.data?.trs_account_info?.market_value }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.status == 1">
                            <a-form-item :label="$t('apply.detail.5um8lff2hc80')">
                                {{ form.data?.trs_account_info?.usable_power }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.status == 1">
                            <a-form-item :label="$t('apply.detail.5um8lff2he80')">
                                {{ form.data?.trs_account_info?.freeze_power ? form.data?.trs_account_info.freeze_power :'-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.status == 1">
                            <a-form-item :label="$t('apply.detail.5um8lff2hg00')">
                                {{ form.data?.trs_account_info?.receivable_interest }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if='viteItemName =="hx" && form.data?.status == 1'>
                            <a-form-item :label="$t('apply.detail.5um8lff2hhs0')">
                                <div>{{ Number(form.data?.trs_account_info?.wait_deduct_interest) || 0 }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.status == 1">
                            <a-form-item :label="$t('apply.detail.5um8lff2hjk0')">
                                {{ form.data?.trs_account_info?.max_withdraw_amount }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.status == 1">
                            <a-form-item :label="$t('apply.detail.5um8lff2hlo0')">
                                <div>{{ Number(form.data?.trs_account_info?.total_profit) > 0 ?`+${form.data?.trs_account_info?.total_profit}` : form.data?.trs_account_info?.total_profit }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.status == 1">
                            <a-form-item :label="$t('apply.detail.5um8lff2hng0')">
                                {{  (form.data?.trs_account_info?.loss_amount_rate*100).toFixed(2) }}%
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
        <a-modal v-model:visible="audit.show" :title="audit.data.status == 2? $t('apply.detail.5um8i5iqqcc0') : $t('apply.detail.5um8i5iqqjk0') " @cancel="audit.show = false" @before-ok="submit">
            <a-form ref="auditFormRef" :model="audit.data" auto-label-width>
                <!-- 审核通过 -->
                <template v-if="audit.data.status == 2">
                    <a-form-item field="expire_date" :label="$t('apply.detail.5um8yj0aa9c0')" :rules="[{ required: true, message: $t('apply.detail.5um8zaryd240') }]">
                        <a-date-picker :disabledDate="(current) => dayjs(current).isBefore(dayjs(form.data?.after_expire_time * 1000))" style="width: 100%;" v-model="audit.data.expire_date" />
                    </a-form-item>
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
const viteItemName = import.meta.env.VITE_ITEM_NAME || ""
const form:any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {}
})
const audit = reactive({
    loading:false,
    show:false,
    data:{
        expire_date:'',
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
    const { code, msg } = await apiTrs.accountTimeApplyCheck({
        apply_id:route.params?.id,
        operator_id:local.userInfo?.id || 1,
        ...audit.data
    })
    audit.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiTrs.accountTimeApplyInfo({
        apply_id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
    audit.data.expire_date = dayjs.unix(data.after_expire_time).format('YYYY-MM-DD')
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