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
                    <a-form-item :label="$t('payment.detail.5ukjt61qv2o0')">
                        <a-input disabled v-model="form.data.real_name" >
                        </a-input>
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item :label="$t('payment.detail.5ukjt61r5e80')">
                        <a-input disabled v-model="form.data.english_name">
                        </a-input>
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item :label="$t('payment.detail.5ukjt61r5ok0')">
                        <a-input disabled v-model="form.data.account_id" :placeholder="$t('payment.detail.5ukjt61r5t40')">
                        </a-input>
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">

                    <a-form-item :label="$t('payment.detail.5ukjt61r5y80')">
                        <a-input disabled v-model="form.data.charge_bank_code" :placeholder="$t('payment.detail.5ukjt61r62w0')">
                        </a-input>
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">

                    <a-form-item :label="$t('payment.detail.5ukjt61r67k0')">
                        <a-select disabled allow-clear v-model="form.data.type" :placeholder="$t('payment.detail.5ukjt61r6b80')">
                            <a-option v-for="item in useEnums('cms.asset.payment.type')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">

                    <a-form-item :label="$t('payment.detail.5ukjt61r6fw0')">
                        <a-input disabled v-model="form.data.charge_amount" :placeholder="$t('payment.detail.5ukjt61r6ko0')">
                        </a-input>
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item :label="$t('payment.detail.5ukjt61r6os0')">
                        <a-input disabled v-model="form.data.charge_currency" :placeholder="$t('payment.detail.5ukjt61r6ts0')">
                        </a-input>
                    </a-form-item>
                    </a-col>
                   
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item :label="$t('payment.detail.5ukjt61r6xk0')">
                        <a-select disabled allow-clear v-model="form.data.status" :placeholder="$t('payment.detail.5ukjt61r6b80')">
                            <a-option v-for="item in useEnums('cms.asset.payment.status1')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item :label="$t('payment.detail.5ukjt61r71o0')">
                        <a-image-preview-group infinite>
                            <a-space wrap>
                                <a-image v-for="item in form.data?.charge_voucher" :src="item" height="200" />
                            </a-space>
                        </a-image-preview-group>
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item v-if="form.data.status==6" field="reasons.zh-CN" :label="$t('payment.detail.5ukjt61r7540')">
                        <a-input disabled v-model="form.data.reasons['zh-CN']" :placeholder="$t('payment.detail.5ukjt61r7900')">
                        </a-input>
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item v-if="form.data.status==6" field="reasons.en" :label="$t('payment.detail.5ukjt61r7cw0')">
                        <a-input disabled v-model="form.data.reasons['en']" :placeholder="$t('payment.detail.5ukjt61r7gg0')">
                        </a-input>
                    </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                    <a-form-item v-if="form.data.status==6" field="reasons.tc" :label="$t('payment.detail.5ukjt61r7kc0')">
                        <a-input disabled v-model="form.data.reasons['tc']" :placeholder="$t('payment.detail.5ukjt61r7s80')">
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
import {dataFormat} from '@/hooks/permission'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        reasons: {
            'zh-CN': '',
            'en': '',
            'tc': ''
        },
    },
    rules: {

    }
})
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsChargePaymentInfo({
        paymentId: route.params?.id
    })
    if (code != 1) return;
    form.data = { ...data }
    form.data.charge_amount = dataFormat(form.data.charge_amount, 2, 1)

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