<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-card :loading="loading">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('withdraw.detail.5um3vz80nak0')}}
                        </a-space>
                        <a-space :size="18" v-permission="['otcAccountWithdrawAudit']">
                            <a-button v-if="form.data?.status == 0" @click="audit.show = true;audit.data.status = 2" type="primary" :loading="form.loading" :disabled="form.loading">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('withdraw.detail.5um3vz80nv80')}}
                            </a-button>
                            <a-button v-if="form.data?.status == 0" @click="audit.show = true;audit.data.status = 3" type="primary" status="danger">
                                <template #icon>
                                    <icon-close />
                                </template>
                                {{$t('withdraw.detail.5um3vz80nyo0')}}
                            </a-button>
                        </a-space>
                    </div>
                </template>
                <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80o0o0')">
                                {{ form.data?.asset_account }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80o2k0')">
                                <div>{{ form.data?.real_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80o4g0')">
                                <div>{{ form.data?.english_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80o6g0')">
                                <a-tag>{{ form.data?.charge_currency }}</a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80o8s0')">
                                <div>{{ form.data?.charge_amount }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80oaw0')">
                                {{ dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data.status != 0">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80od40')">
                                {{ form.data.check_time?dayjs.unix(form.data.check_time).format('YYYY-MM-DD HH:mm:ss'):'-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80oj40')">
                                <a-tag size="small" :color="form.data?.status == 2?'#00b42a':form.data?.status == 0?'#ff7d00':'#f53f3f'">
                                    {{ useEnumsFormat('otc.account.withdraw.status',form.data?.status) }}
                                </a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80okw0')">
                                {{ form.data.charge_bank_full_name }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80omo0')">
                                {{ form.data.charge_bank_code }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80ooo0')">
                                {{ form.data.charge_bank_account }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.status == 2">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80oqs0')">
                                {{ form.data.charge_fee }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.status == 2">
                            <a-form-item :label="$t('withdraw.detail.5um3vz80osw0')">
                                {{ (form.data.charge_amount - form.data.charge_fee).toFixed(2) }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['zh-CN']">
                            <a-form-item :label="$t('withdraw.detail.5ukjwre6yg40')">
                                {{ form.data?.reasons?.['zh-CN'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['en']">
                            <a-form-item :label="$t('withdraw.detail.5ukjwre6yto0')">
                                {{ form.data?.reasons?.['en'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['tc']">
                            <a-form-item :label="$t('withdraw.detail.5ukjwre6z8w0')">
                                {{ form.data?.reasons?.['tc'] || '-' }}
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-card>
        <!-- 审核 -->
        <a-modal v-model:visible="audit.show" :title="audit.data.status == 2? $t('withdraw.detail.5um3vz80nv80') : $t('withdraw.detail.5um3vz80nyo0') " @cancel="audit.show = false" @before-ok="submit">
            <a-form ref="auditFormRef" :model="audit.data" auto-label-width>
                <!-- 审核通过 -->
                <template v-if="audit.data.status == 2">
                    <a-form-item :label="$t('withdraw.detail.5um3vz80o6g0')">
                        {{ form.data?.charge_currency }}
                    </a-form-item>
                    <a-form-item :label="$t('withdraw.detail.5um3vz80o8s0')">
                        {{ form.data?.charge_amount }}
                    </a-form-item>
                    <a-form-item :label="$t('withdraw.detail.5um3vz80ouo0')">
                        <a-select v-model="audit.data.is_auto_calculate_fee" :placeholder="$t('withdraw.detail.5ukjwre6ybs0')">
                            <a-option v-for="item in useEnums('otc.account.transfer.is_auto_calculate_fee')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="$t('withdraw.detail.5um3vz80oqs0')" v-if="audit.data.is_auto_calculate_fee == 1">
                        <div >{{ form.data?.charge_fee }}</div>
                    </a-form-item>
                    <a-form-item v-else  :label="$t('withdraw.detail.5um3vz80oqs0')" field="fee" :rules="[{required:true,message:$t('withdraw.detail.5um3vz80owo0')}]">
                        <a-input-number v-model="audit.data.fee" :placeholder="$t('withdraw.detail.5um3vz80owo0')" />
                    </a-form-item>
                </template>
                <!-- 驳回 -->
                <template v-else>
                    <a-form-item field="reasons['zh-CN']" :label="$t('withdraw.detail.5um3vz80oyg0')">
                        <a-input v-model="audit.data.reasons['zh-CN']" :placeholder="$t('withdraw.detail.5um3vz80p0o0')" />
                    </a-form-item>
                    <a-form-item field="reasons['en']" :label="$t('withdraw.detail.5um3vz80p3s0')">
                        <a-input v-model="audit.data.reasons['en']" :placeholder="$t('withdraw.detail.5um3vz80p580')"  />
                    </a-form-item>
                    <a-form-item field="reasons['tc']" :label="$t('withdraw.detail.5um3vz80p780')">
                        <a-input v-model="audit.data.reasons['tc']" :placeholder="$t('withdraw.detail.5um3vz80p8s0')"  />
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
const { t } = useI18n();
const loading = ref(false)
const local = useLocal()
const form:any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {},
    rules: {
        real_name: [{ required: true, message: t('withdraw.detail.5um3vz80pa40') }],
        english_name: [{ required: true, message: t('withdraw.detail.5um3vz80pbg0') }],
        email: [{ required: true, message: t('withdraw.detail.5um3vz80pcs0') }, { type: 'email', message: t('withdraw.detail.5um3vz80pe80') }]
    }
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
    const { code, msg } = await apiOtc.accountChargeWithdrawAudit({
        withdraw_id:form.data.id,
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
    const { code, data } = await apiOtc.accountChargeWithdrawInfo({
        withdraw_id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
    audit.data.fee = Number(data.charge_fee)
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