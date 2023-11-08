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
                            <a-form-item :label="$t('exchange.detail.5ukk3vxo7wc0')">
                                <a-input disabled v-model="form.data.account" :placeholder="$t('exchange.detail.5ukk3vxo9n80')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">

                            <a-form-item :label="$t('exchange.detail.5ukk3vxo9wg0')">
                                <a-input disabled v-model="form.data.real_name">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('exchange.detail.5ukk3vxoa2s0')">
                                <a-input disabled v-model="form.data.from_amount">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('exchange.detail.5ukk3vxoa8k0')">
                                <a-input disabled v-model="form.data.from" :placeholder="$t('exchange.detail.5ukk3vxoaew0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('exchange.detail.5ukk3vxoak80')">
                                <a-input disabled v-model="form.data.to" :placeholder="$t('exchange.detail.5ukk3vxoapw0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('exchange.detail.5ukk3vxoav00')">
                                <a-input disabled v-model="form.data.fee" :placeholder="$t('exchange.detail.5ukk3vxob4g0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('exchange.detail.5ukk3vxob9g0')">
                                <a-select disabled allow-clear v-model="form.data.status" :placeholder="$t('exchange.detail.5ukk3vxobfg0')">
                                    <a-option v-for="item in useEnums('cms.asset.exchange.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('exchange.detail.5ukk3vxobk40')">
                                <a-input disabled v-model="form.data.to_amount">
                                </a-input>
                            </a-form-item>
                        </a-col>


                            <!-- <a-form-item v-if="form.data.status == 3" field="reasons.zh-CN" :label="'驳回原因(中)'">
                            <a-input v-model="form.data.reasons['zh-CN']" :placeholder="$t('exchange.detail.5ukk3vxobow0')">
                            </a-input>
                        </a-form-item>

                        <a-form-item v-if="form.data.status == 3" field="reasons.en" :label="$t('exchange.detail.5ukk3vxobvc0')">
                            <a-input v-model="form.data.reasons['en']" :placeholder="$t('exchange.detail.5ukk3vxoc100')">
                            </a-input>
                        </a-form-item>

                        <a-form-item v-if="form.data.status == 3" field="reasons.tc" :label="$t('exchange.detail.5ukk3vxoc780')">
                            <a-input v-model="form.data.reasons['tc']" :placeholder="$t('exchange.detail.5ukk3vxocck0')">
                            </a-input>
                        </a-form-item> -->

                    </a-row>
                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
import { dataFormat } from '@/hooks/permission'
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
    const { code, data } = await apiCms.cmsChargeExchangeInfo({
        exchangeId: route.params?.id
    })
    if (code != 1) return;
    form.data = { ...data }
    form.data.from_amount = dataFormat(form.data.from_amount, 2, 1)
    form.data.to_amount = dataFormat(form.data.to_amount, 2, 1)

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