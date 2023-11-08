<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-card :loading="loading">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('exchange.detail.5um3pn8v8hc0')}}
                        </a-space>
                        <a-space :size="18" v-permission="['otcAccountExchangeAudit']">
                            <a-button v-if="form.data?.status == 1" @click="audit.show = true;audit.data.status = 2" type="primary" :loading="form.loading" :disabled="form.loading">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('exchange.detail.5um3pn8v8yk0')}}
                            </a-button>
                            <a-button v-if="form.data?.status == 1" @click="audit.show = true;audit.data.status = 3" type="primary" status="danger">
                                <template #icon>
                                    <icon-close />
                                </template>
                                {{$t('exchange.detail.5um3pn8v9140')}}
                            </a-button>
                        </a-space>
                    </div>
                </template>
                <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('exchange.detail.5um3pn8v9340')">
                                {{ form.data?.asset_account }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('exchange.detail.5um3pn8v95w0')">
                                <div>{{ form.data?.real_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('exchange.detail.5um3pn8v98g0')">
                                <div>{{ form.data?.english_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('exchange.detail.5um3pn8v9ak0')">
                                <div><a-tag>{{ form.data?.from_currency }}</a-tag><icon-arrow-right /><a-tag>{{ form.data?.to_currency }}</a-tag></div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('exchange.detail.5um3pn8v9ck0')">
                                <div>{{ form.data?.from_amount }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('exchange.detail.5um3pn8v9g00')">
                                {{ dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data.status != 1">
                            <a-form-item :label="$t('exchange.detail.5um3pn8v9ic0')">
                                {{ form.data.check_time?dayjs.unix(form.data.check_time).format('YYYY-MM-DD HH:mm:ss'):'-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('exchange.detail.5ukk3vxob9g0')">
                                <a-tag size="small" :color="form.data?.status == 2?'#00b42a':form.data?.status == 1?'#ff7d00':'#f53f3f'">
                                    {{ useEnumsFormat('otc.account.exchange.status',form.data?.status) }}
                                </a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['zh-CN']">
                            <a-form-item :label="$t('exchange.detail.5um3pn8v9kg0')">
                                {{ form.data?.reasons?.['zh-CN'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['en']">
                            <a-form-item :label="$t('exchange.detail.5ukk3vxobvc0')">
                                {{ form.data?.reasons?.['en'] || '-' }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reasons?.['tc']">
                            <a-form-item :label="$t('exchange.detail.5ukk3vxoc780')">
                                {{ form.data?.reasons?.['tc'] || '-' }}
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-card>
        <!-- 审核 -->
        <a-modal v-model:visible="audit.show" :title="audit.data.status == 2? $t('exchange.detail.5um3pn8v8yk0') : $t('exchange.detail.5um3pn8v9140') " @cancel="audit.show = false" @before-ok="submit">
            <a-form ref="auditFormRef" :model="audit.data" auto-label-width>
                <!-- 审核通过 -->
                <template v-if="audit.data.status == 2">
                    <a-form-item :label="$t('exchange.detail.5um3pn8v9ak0')">
                        <div>{{ form.data?.from_currency }}<icon-arrow-right />{{ form.data?.to_currency }}</div>
                    </a-form-item>
                    <a-form-item :label="$t('exchange.detail.5um3pn8v9ck0')">
                        {{ form.data?.from_amount }}
                    </a-form-item>
                    <a-form-item :label="$t('exchange.detail.5um3pn8v9n00')" :rules="[{required:true,message:$t('exchange.detail.5um3pn8v9so0')}]">
                        <a-input-number v-model="audit.data.to_amount" :placeholder="$t('exchange.detail.5um3pn8v9so0')" />
                    </a-form-item>
                    <a-form-item :label="$t('exchange.detail.5um3pn8v9uo0')">
                        <a-select v-model="audit.data.is_auto_calculate_fee" :placeholder="$t('exchange.detail.5ukk3vxobfg0')">
                            <a-option v-for="item in useEnums('otc.account.transfer.is_auto_calculate_fee')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="$t('exchange.detail.5ukk3vxoav00')" v-if="audit.data.is_auto_calculate_fee == 1">
                        <div >{{ form.data?.fee }}</div>
                    </a-form-item>
                    <a-form-item v-else  :label="$t('exchange.detail.5ukk3vxoav00')" field="fee" :rules="[{required:true,message:'请输入手续费'}]">
                        <a-input-number v-model="audit.data.fee" :placeholder="$t('exchange.detail.5ukk3vxob4g0')" />
                    </a-form-item>
                </template>
                <!-- 驳回 -->
                <template v-else>
                    <a-form-item field="reasons['zh-CN']" :label="$t('exchange.detail.5um3pn8v9ww0')">
                        <a-input v-model="audit.data.reasons['zh-CN']" :placeholder="$t('exchange.detail.5um3pn8va240')" />
                    </a-form-item>
                    <a-form-item field="reasons['en']" :label="$t('exchange.detail.5um3pn8va4o0')">
                        <a-input v-model="audit.data.reasons['en']" :placeholder="$t('exchange.detail.5um3pn8va7o0')"  />
                    </a-form-item>
                    <a-form-item field="reasons['tc']" :label="$t('exchange.detail.5um3pn8va9s0')">
                        <a-input v-model="audit.data.reasons['tc']" :placeholder="$t('exchange.detail.5um3pn8vabs0')"  />
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
const loading = ref(false)
const form:any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {},
    rules: {
        real_name: [{ required: true, message: t('exchange.detail.5um3pn8vafk0') }],
        english_name: [{ required: true, message: t('exchange.detail.5um3pn8vahk0') }],
        email: [{ required: true, message: t('exchange.detail.5um3pn8vajs0') }, { type: 'email', message: t('exchange.detail.5um3pn8valk0') }]
    }
})
const audit = reactive({
    loading:false,
    show:false,
    data:{
        status:2,
        is_auto_calculate_fee:1,
        fee:0,
        to_amount:0,
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
    const { code, msg } = await apiOtc.accountChargeExchangeAudit({
        exchange_id:form.data.id,
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
    const { code, data } = await apiOtc.accountChargeExchangeInfo({
        exchange_id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
    audit.data.fee = Number(data.fee)
    audit.data.to_amount = Number(data.to_amount)
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