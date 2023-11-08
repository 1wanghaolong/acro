<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-card :loading="loading">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('payment.detail.5um3n8crhuk0')}}
                        </a-space>
                        <a-space :size="18" v-permission="['otcAccountPaymentAudit']">
                            <a-button v-if="form.data?.status == 0" @click="audit.show = true;audit.data.status = 4" type="primary" :loading="form.loading" :disabled="form.loading">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('payment.detail.5um3n8crifc0')}}
                            </a-button>
                            <a-button v-if="form.data?.status == 0" @click="audit.show = true;audit.data.status = 6" type="primary" status="danger">
                                <template #icon>
                                    <icon-close />
                                </template>
                                {{$t('payment.detail.5um3n8crilw0')}}
                            </a-button>
                        </a-space>
                    </div>
                </template>
                <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('payment.detail.5um3n8criqs0')">
                                {{ form.data?.asset_account_info?.account || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('payment.detail.5ukjt61qv2o0')">
                                <div>{{ form.data?.asset_account_info?.real_name || '-' }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('payment.detail.5ukjt61r5e80')">
                                <div>{{ form.data?.asset_account_info?.english_name || '-' }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('payment.detail.5ukjt61r6os0')">
                                <div>{{ form.data?.charge_currency || '-' }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('payment.detail.5ukjt61r6fw0')">
                                <div>{{ form.data?.charge_amount || '-' }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('payment.detail.5ukjt61r67k0')">
                                <a-tag>{{ useEnumsFormat('otc.account.payment.type',form.data?.type) || '-' }}</a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('payment.detail.5um3n8criv40')">
                                {{ dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data.status != 0">
                            <a-form-item :label="$t('payment.detail.5um3n8crizo0')">
                                {{ form.data.check_time?dayjs.unix(form.data.check_time).format('YYYY-MM-DD HH:mm:ss'):'-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('payment.detail.5um3n8crj680')">
                                <a-tag size="small" :color="form.data?.status == 4?'#00b42a':form.data?.status == 0?'#ff7d00':'#f53f3f'">
                                    {{ useEnumsFormat('otc.account.payment.status',form.data?.status) || '-' }}
                                </a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data.charge_bank_full_name">
                            <a-form-item :label="$t('payment.detail.5um3n8crjb40')">
                                {{ form.data.charge_bank_full_name || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data.charge_bank_code">
                            <a-form-item :label="$t('payment.detail.5um3n8crjfw0')">
                                {{ form.data.charge_bank_code || '-'}}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data.charge_bank_account">
                            <a-form-item :label="$t('payment.detail.5um3n8crjkk0')">
                                {{ form.data.charge_bank_account || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.system_bank_card_info?.charge_bank_full_name">
                            <a-form-item :label="$t('payment.detail.5um3n8crjp00')">
                                {{ form.data?.system_bank_card_info?.charge_bank_full_name || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.system_bank_card_info?.bank_code">
                            <a-form-item :label="$t('payment.detail.5um3n8crjtk0')">
                                {{ form.data?.system_bank_card_info?.bank_code || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.system_bank_card_info?.bank_account">
                            <a-form-item :label="$t('payment.detail.5um3n8crjyc0')">
                                {{ form.data?.system_bank_card_info?.bank_account || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['zh-CN']">
                            <a-form-item :label="$t('payment.detail.5um3n8crk2s0')">
                                {{ form.data?.reasons?.['zh-CN'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['en']">
                            <a-form-item :label="$t('payment.detail.5um3n8crk740')">
                                {{ form.data?.reasons?.['en'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['tc']">
                            <a-form-item :label="$t('payment.detail.5um3n8crkbw0')">
                                {{ form.data?.reasons?.['tc'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.charge_desc">
                            <a-form-item :label="$t('payment.detail.5um3n8crkgs0')">
                                {{ form.data?.charge_desc || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" v-if="form.data?.charge_voucher?.length && form.data?.charge_voucher[0]">
                            <a-form-item :label="$t('payment.detail.5um3n8crklk0')">
                                <a-image-preview-group infinite>
                                    <a-space wrap>
                                        <a-image v-for="item in form.data?.charge_voucher" :src="item" width="200" />
                                    </a-space>
                                </a-image-preview-group>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-card>
        <!-- 审核 -->
        <a-modal v-model:visible="audit.show" :title="audit.data.status == 4? $t('payment.detail.5um3n8crifc0') : $t('payment.detail.5um3n8crilw0') " @cancel="audit.show = false" @before-ok="submit">
            <a-form ref="auditFormRef" :model="audit.data" auto-label-width>
                <!-- 审核通过 -->
                <template v-if="audit.data.status == 4">
                    <a-form-item :label="$t('payment.detail.5ukjt61r6os0')">
                        {{ form.data?.charge_currency }}
                    </a-form-item>
                    <a-form-item :label="$t('payment.detail.5ukjt61r6fw0')">
                        {{ form.data?.charge_amount }}
                    </a-form-item>
                    <a-form-item :label="$t('payment.detail.5um3n8crkq80')">
                        <a-select v-model="audit.data.is_auto_calculate_fee" :placeholder="$t('payment.detail.5ukjt61r6b80')">
                            <a-option v-for="item in useEnums('otc.account.transfer.is_auto_calculate_fee')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="$t('payment.detail.5um3n8crkz40')" v-if="audit.data.is_auto_calculate_fee == 1">
                        <div >{{ form.data?.charge_fee }}</div>
                    </a-form-item>
                    <a-form-item v-else  :label="$t('payment.detail.5um3n8crkz40')" field="fee" :rules="[{required:true,message:$t('payment.detail.5um3n8crl4w0')}]">
                        <a-input-number v-model="audit.data.fee" :placeholder="$t('payment.detail.5um3n8crl4w0')" />
                    </a-form-item>
                </template>
                <!-- 驳回 -->
                <template v-else>
                    <a-form-item field="reasons['zh-CN']" :label="$t('payment.detail.5um3n8crl8k0')">
                        <a-input v-model="audit.data.reasons['zh-CN']" :placeholder="$t('payment.detail.5um3n8crlcs0')" />
                    </a-form-item>
                    <a-form-item field="reasons['en']" :label="$t('payment.detail.5um3n8crlg40')">
                        <a-input v-model="audit.data.reasons['en']" :placeholder="$t('payment.detail.5um3n8crljc0')"  />
                    </a-form-item>
                    <a-form-item field="reasons['tc']" :label="$t('payment.detail.5um3n8crlmg0')">
                        <a-input v-model="audit.data.reasons['tc']" :placeholder="$t('payment.detail.5um3n8crlps0')"  />
                    </a-form-item>
                </template>
            </a-form>
        </a-modal>

    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat,useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const route = useRoute()
const router = useRouter()
const formRef = ref()
const auditFormRef = ref()
const loading = ref(false)
const local = useLocal()
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
        status:2,
        is_auto_calculate_fee:1,
        fee:0,
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
    const { code, msg } = await apiOtc.accountChargePaymentAudit({
        payment_id:form.data.id,
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
    const { code, data } = await apiOtc.accountChargePaymentInfo({
        payment_id: route.params?.id
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