<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-card :loading="loading">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('transfer.detail.5um3u026k8c0')}}
                        </a-space>
                        <a-space :size="18" v-permission="['otcAccountTransferAudit']">
                            <a-button v-if="form.data?.status == 1" @click="audit.show = true;audit.data.status = 2" type="primary" :loading="form.loading" :disabled="form.loading">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('transfer.detail.5um3u026kmo0')}}
                            </a-button>
                            <a-button v-if="form.data?.status == 1" @click="audit.show = true;audit.data.status = 3" type="primary" status="danger">
                                <template #icon>
                                    <icon-close />
                                </template>
                                {{$t('transfer.detail.5um3u026kpc0')}}
                            </a-button>
                        </a-space>
                    </div>
                </template>
                <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('transfer.detail.5um3u026kr80')">
                                {{ form.data?.asset_account_info?.account }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('transfer.detail.5um3u026kto0')">
                                <div>{{ form.data?.asset_account_info?.real_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('transfer.detail.5um3u026kwk0')">
                                <div>{{ form.data?.asset_account_info?.english_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :abel="`TRS${ $t('transfer.detail.5um4ex1v3cg0') }`">
                                {{ form.data?.trs_account_info?.account }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('transfer.detail.5um3u026kz40')">
                                <a-tag>{{ form.data?.charge_currency }}</a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('transfer.detail.5um3u026l100')">
                                <div>{{ form.data?.charge_amount }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('transfer.detail.5um3u026l340')">
                                {{ dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data.status != 1">
                            <a-form-item :label="$t('transfer.detail.5um3u026l540')">
                                {{ form.data.check_time?dayjs.unix(form.data.check_time).format('YYYY-MM-DD HH:mm:ss'):'-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('transfer.detail.5um3u026l7g0')">
                                <a-tag size="small" :color="form.data?.status == 2?'#00b42a':form.data?.status == 1?'#ff7d00':'#f53f3f'">
                                    {{ useEnumsFormat('otc.account.transfer.status',form.data?.status) }}
                                </a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['zh-CN']">
                            <a-form-item :label="$t('transfer.detail.5um3u026l9g0')">
                                {{ form.data?.reasons?.['zh-CN'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['en']">
                            <a-form-item :label="$t('transfer.detail.5um3u026lb80')">
                                {{ form.data?.reasons?.['en'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['tc']">
                            <a-form-item :label="$t('transfer.detail.5um3u026ldc0')">
                                {{ form.data?.reasons?.['tc'] || '-' }}
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-card>
        <!-- 审核 -->
        <a-modal v-model:visible="audit.show" :title="audit.data.status == 2? $t('transfer.detail.5um4ex1v4ng0') : $t('transfer.detail.5um3u026kpc0') " @Close='Close'>
            <a-form ref="auditFormRef" :model="audit.data" auto-label-width v-if='step == "1"'>
                <!-- 审核通过 -->
                <template v-if="audit.data.status == 2">
                    <a-form-item :label="$t('transfer.detail.5um3u026lfk0')">
                        {{ form.data?.trs_account_info?.account }}
                    </a-form-item>
                    <a-form-item :label="$t('transfer.detail.5um3u026lhc0')">
                        {{ form.data?.charge_currency }}
                    </a-form-item>
                    <a-form-item :label="$t('transfer.detail.5um3u026lj80')">
                        {{ form.data?.charge_amount }}
                    </a-form-item>
                    <a-form-item :label="$t('transfer.detail.5um3u026llc0')">
                        <a-select v-model="audit.data.is_auto_calculate_fee" :placeholder="$t('transfer.detail.5um3u026lng0')">
                            <a-option v-for="item in useEnums('otc.account.transfer.is_auto_calculate_fee')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="$t('transfer.detail.5um3u026lps0')" v-if="audit.data.is_auto_calculate_fee == 1">
                        <div >{{ form.data?.charge_fee }}</div>
                    </a-form-item>
                    <a-form-item v-else  :label="$t('transfer.detail.5um3u026lps0')" field="fee" :rules="[{required:true,message:$t('transfer.detail.5um3u026ltc0')}]">
                        <a-input-number v-model="audit.data.fee" :placeholder="$t('transfer.detail.5um3u026ltc0')" />
                    </a-form-item>
                </template>
                <!-- 驳回 -->
                <template v-else>
                    <a-form-item field="reasons['zh-CN']" :label="$t('transfer.detail.5um3u026lv00')">
                        <a-input v-model="audit.data.reasons['zh-CN']" :placeholder="$t('transfer.detail.5um3u026lww0')" />
                    </a-form-item>
                    <a-form-item field="reasons['en']" :label="$t('transfer.detail.5um3u026lyo0')">
                        <a-input v-model="audit.data.reasons['en']" :placeholder="$t('transfer.detail.5um3u026m080')"  />
                    </a-form-item>
                    <a-form-item field="reasons['tc']" :label="$t('transfer.detail.5um3u026m2c0')">
                        <a-input v-model="audit.data.reasons['tc']" :placeholder="$t('transfer.detail.5um3u026m3w0')"  />
                    </a-form-item>
                </template>
            </a-form>
            <template #footer>
                <a-button v-if='step == "1"' @click='audit.show = false'>{{$t('transfer.detail.5um3u026m5k0')}}</a-button>
                <a-button v-if='step == "2" && audit.data.status == 2' @click='step = 1'>{{$t('transfer.detail.5um3u026m740')}}</a-button>
                <a-button v-if='step == "1" && audit.data.status == 2' type="primary" @click='step = 2'>{{$t('transfer.detail.5um3u026m8w0')}}</a-button>
                <a-button v-if='step == "2" || audit.data.status != 2' type="primary" @click='submit'>{{$t('transfer.detail.5um3u026mak0')}}</a-button>
            </template>
            <a-form ref="auditFormRef" :model="audit.data" auto-label-width v-if='step == "2" && audit.data.status == 2'>
                <!-- 审核通过 -->
                <a-alert type="warning" :show-icon="false" style='margin-bottom:20px'>
                    {{$t('transfer.detail.5um3u026mds0')}}
                </a-alert>
                <template v-if="audit.data.status == 2" >
                    <a-form-item :label="$t('transfer.detail.5um3u026lfk0')">
                        {{ form.data?.trs_account_info?.account }}
                    </a-form-item>
                    <a-form-item :label="$t('transfer.detail.5um3u026lhc0')">
                        {{ form.data?.charge_currency }}
                    </a-form-item>
                    <a-form-item :label="$t('transfer.detail.5um3u026lj80')">
                        {{ form.data?.charge_amount }}
                    </a-form-item>
                    <a-form-item :label="$t('transfer.detail.5um3u026lps0')" v-if="audit.data.is_auto_calculate_fee == 1">
                        <div >{{ form.data?.charge_fee }}</div>
                    </a-form-item>
                    <a-form-item v-else  :label="$t('transfer.detail.5um3u026lps0')" field="fee">
                        <div >{{ audit.data.fee }}</div>
                    </a-form-item>
                    <a-form-item :label="$t('transfer.detail.5um3u026mf80')" field="fee">
                        <div v-if="audit.data.is_auto_calculate_fee == 1">{{ (Number(form.data?.charge_amount) - Number(form.data?.charge_fee)).toFixed(4) }}</div>
                        <div v-else>{{ (Number(form.data?.charge_amount) - Number(audit.data.fee)).toFixed(4) }}</div>
                    </a-form-item>
                </template>
            </a-form>
        </a-modal>
    </div>
    
</template>

<script lang="ts" setup>
import { useEnumsFormat,useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n();
const auditFormRef = ref()
const step:any = ref(1)
const loading = ref(false)
const form:any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {},
    rules: {
        real_name: [{ required: true, message: t('transfer.detail.5um3u026mgw0') }],
        english_name: [{ required: true, message: t('transfer.detail.5um3u026mi80') }],
        email: [{ required: true, message: t('transfer.detail.5um3u026mk00') }, { type: 'email', message: t('transfer.detail.5um3u026mms0') }]
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
    if (step.value == "1" && audit.data.status == 2) {
        step.value = '2'
        audit.show = true
        return
    }
    const validate = await auditFormRef.value?.validate()
    if (validate) return false;
    audit.loading = true
    const { code, msg } = await apiTrs.accountChargeTransferAudit({
        payment_id:form.data.id,
        operator_id:local.userInfo?.id || 1,
        ...audit.data
    })
    audit.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    step.value = 1
    audit.show = false
    getData()
}
const Close = () =>{
    step.value = 1
    audit.show = false
}

const getData = async () => {
    loading.value = true
    const { code, data } = await apiTrs.accountChargeTransferInfo({
        payment_id: route.params?.id
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