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
                        <a-form-item :label="$t('withdraw.detail.5ukjwre6fvs0')">
                            <a-input disabled v-model="form.data.mobile" :placeholder="$t('withdraw.detail.5ukjwre6m8g0')">
                            </a-input>
                        </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                        <a-form-item :label="$t('withdraw.detail.5ukjwre6oe80')">
                            <a-input disabled v-model="form.data.account_id" :placeholder="$t('withdraw.detail.5ukjwre6pzs0')">
                            </a-input>
                        </a-form-item>
                         </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                        <a-form-item :label="$t('withdraw.detail.5ukjwre6rm00')">
                            <a-input disabled v-model="form.data.charge_bank" :placeholder="$t('withdraw.detail.5ukjwre6sbg0')">
                            </a-input>
                        </a-form-item>
                         </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                        <a-form-item :label="$t('withdraw.detail.5ukjwre6ugo0')">
                            <a-input disabled v-model="form.data.charge_bank_code" :placeholder="$t('withdraw.detail.5ukjwre6vto0')">
                            </a-input>
                        </a-form-item>
                         </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                        <a-form-item :label="$t('withdraw.detail.5ukjwre6w0w0')">
                            <a-input disabled v-model="form.data.charge_amount" :placeholder="$t('withdraw.detail.5ukjwre6w7s0')">
                            </a-input>
                        </a-form-item>
                         </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                        <a-form-item :label="$t('withdraw.detail.5ukjwre6we40')">
                            <a-input disabled v-model="form.data.charge_fee" :placeholder="$t('withdraw.detail.5ukjwre6x0g0')">
                            </a-input>
                        </a-form-item>
                         </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                        <a-form-item :label="$t('withdraw.detail.5ukjwre6x8g0')">
                            <a-input disabled v-model="form.data.charge_currency" :placeholder="$t('withdraw.detail.5ukjwre6xhk0')">
                            </a-input>
                        </a-form-item>
                         </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                        <a-form-item :label="$t('withdraw.detail.5ukjwre6xn00')">
                            <a-input disabled v-model="form.data.create_time" :placeholder="$t('withdraw.detail.5ukjwre6xt00')">
                            </a-input>
                        </a-form-item>
                         </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('withdraw.detail.5ukjwre6xxk0')">
                            <a-select disabled allow-clear v-model="form.data.status" :placeholder="$t('withdraw.detail.5ukjwre6ybs0')">
                                <a-option v-for="item in useEnums('cms.asset.withdraw.status')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                         </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item v-if="form.data.status == 3" field="reasons.zh-CN" :label="$t('withdraw.detail.5ukjwre6yg40')">
                            <a-input v-model="form.data.reasons['zh-CN']" :placeholder="$t('withdraw.detail.5ukjwre6yl00')">
                            </a-input>
                        </a-form-item>
                         </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                        <a-form-item v-if="form.data.status == 3" field="reasons.en" :label="$t('withdraw.detail.5ukjwre6yto0')">
                            <a-input v-model="form.data.reasons['en']" :placeholder="$t('withdraw.detail.5ukjwre6z040')">
                            </a-input>
                        </a-form-item>
                         </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                        <a-form-item v-if="form.data.status == 3" field="reasons.tc" :label="$t('withdraw.detail.5ukjwre6z8w0')">
                            <a-input v-model="form.data.reasons['tc']" :placeholder="$t('withdraw.detail.5ukjwre70lg0')">
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

import dayjs from 'dayjs'
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
    const { code, data } = await apiCms.cmsChargeWithdrawInfo({
        withdrawId: route.params?.id
    })
    if (code != 1) return;
    form.data = { ...data }
    form.data['create_time'] = dayjs.unix(form.data['create_time']).format('YYYY-MM-DD HH:mm:ss')
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