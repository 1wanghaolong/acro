<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;padding-bottom: 20px;">
                <a-card :loading="loading">
                    <template #title>
                        <div style="display: flex;justify-content: space-between;">
                            <a-space :size="18">
                                {{$t('channelOrder.detail.5umckd6ug0k0')}}
                            </a-space>
                        </div>
                    </template>
                    <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ui080')">
                                    {{ form.data?.symbol }}
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ui9w0')">
                                    <div>{{ form.data?.security_info?.name }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6uigs0')">
                                    <a-tag>{{ useEnumsFormat('market.order.direction', form.data?.direction) }}</a-tag>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6uim00')">
                                    <a-tag>{{ useEnumsFormat('market.order.price_type', form.data?.price_type) }}</a-tag>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6uits0')">
                                    <div>{{ form.data?.trade_price }} {{ form.data?.trade_currency }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6uiyo0')">
                                    <div>{{ form.data?.trade_num }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6uj4o0')">
                                    {{ dayjs.unix(form.data.trade_time).format('YYYY-MM-DD HH:mm:ss') }}
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ujbw0')">
                                    <a-tag>{{ useEnumsFormat('market.order.expire_type', form.data?.expire_type) }}</a-tag>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ujg40')">
                                    <div>{{ form.data?.deal_price }} {{ form.data?.trade_currency }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ujkg0')">
                                    <div>{{ form.data?.deal_num }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ujpk0')">
                                    {{ form.data?.deal_time ? dayjs.unix(form.data?.deal_time).format('YYYY-MM-DD HH:mm:ss')
                                        : '-' }}
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6uju80')">
                                    <div>{{ (Number(form.data?.deal_num)*Number(form.data?.deal_price)).toFixed(4) }} {{ form.data?.trade_currency }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ujz00')">
                                    <a-tag>{{ useEnumsFormat('market.order.status', form.data?.status) }}</a-tag>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reason">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6uk3s0')">
                                    <div>{{ form.data?.reason }}</div>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-card>
                <a-card :loading="loading" style="margin-top: 20px;">
                    <template #title>
                        <div style="display: flex;justify-content: space-between;">
                            <a-space :size="18">
                                {{$t('channelOrder.detail.5umckd6uk8g0')}}
                            </a-space>
                        </div>
                    </template>
                    <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ukgc0')">
                                    {{ form.data?.up_order_no || '--' }}
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ukqk0')">
                                    <div v-if="form.data?.counter_channel_account_info?.account">{{ form.data?.counter_channel_account_info?.name }}({{ form.data?.counter_channel_account_info?.account }})</div>
                                    <div v-else>-</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ukw40')">
                                    <div>{{ form.data?.counter_channel_info?.name || '-' }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ul0w0')">
                                    <a-tag>{{ useEnumsFormat('market.order.counter_channel_scene',form.data?.counter_channel_scene) || '-' }}</a-tag>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-card>
                <a-card :loading="loading" style="margin-top: 20px;">
                    <template #title>
                        <div style="display: flex;justify-content: space-between;">
                            <a-space :size="18">
                                {{$t('channelOrder.detail.5umckd6ul6o0')}}
                            </a-space>
                        </div>
                    </template>
                    <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="`TRS${ $t('channelOrder.detail.5umckd6ulbc0') }`">
                                    {{ form.data?.trs_account_info?.account }}
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ulgw0')">
                                    <div>{{ form.data?.asset_account_info?.account }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ulo00')">
                                    <div>{{ form.data?.asset_account_info?.real_name }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ulvg0')">
                                    <div>{{ form.data?.asset_account_info?.english_name }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6um0g0')">
                                    <a-tag>{{ form.data?.trs_account_info?.currency }}</a-tag>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-card>
                <a-card :loading="loading" style="margin-top: 20px;" v-if="form.data?.settlement_status != 2">
                    <template #title>
                        <div style="display: flex;justify-content: space-between;">
                            <a-space :size="18">
                                {{$t('channelOrder.detail.5umckd6um400')}}
                            </a-space>
                        </div>
                    </template>
                    <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6um7g0')">
                                    <div style="display: flex;align-items: center;">
                                        <a-tag>{{ form.data?.trade_currency }}</a-tag>
                                        <icon-arrow-right />
                                        <a-tag style="margin-right: 10px;">{{ form.data?.settlement_currency }}</a-tag> {{ form.data?.trade_exchange_rate }}
                                    </div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.direction == 2">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6umak0')">
                                    <div v-if="[0,1,3,5].includes(form.data?.status)">{{ (((Number(form.data?.trade_num || 0)*Number(form.data?.trade_price || 0))-Number(form.data?.trade_fare || 0))*Number(form.data?.trade_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                    <div v-else>{{ (((Number(form.data?.deal_num || 0)*Number(form.data?.deal_price || 0))-Number(form.data?.deal_fare || 0))*Number(form.data?.trade_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-else>
                                <a-form-item :label="$t('channelOrder.detail.5umckd6ume80')">
                                    <div v-if="[0,1,3,5].includes(form.data?.status)">{{ ((Number(form.data?.trade_num || 0)*Number(form.data?.trade_price || 0)+Number(form.data?.trade_fare || 0))*Number(form.data?.trade_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                    <div v-else>{{ ((Number(form.data?.deal_num || 0)*Number(form.data?.deal_price || 0)+Number(form.data?.deal_fare || 0))*Number(form.data?.trade_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6umhs0')">
                                    <div v-if="form.data?.settlement_status == 1" style="display: flex;align-items: center;">
                                        <a-tag>{{ form.data?.trade_currency  }}</a-tag>
                                        <icon-arrow-right />
                                        <a-tag style="margin-right: 10px;">{{ form.data?.settlement_currency }}</a-tag>
                                         {{ form.data?.settlement_exchange_rate }}
                                    </div>
                                    <div v-else>--</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6"  v-if="form.data?.direction == 2">
                                <a-form-item :label="$t('channelOrder.detail.5umckd6umm80')">
                                    <div v-if="form.data?.settlement_status == 1">
                                        <div v-if="[0,1,3,5].includes(form.data?.status)">{{ ((Number(form.data?.trade_num || 0)*Number(form.data?.trade_price || 0)-Number(form.data?.trade_fare || 0))*Number(form.data?.settlement_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                        <div v-else>{{ ((Number(form.data?.deal_num || 0)*Number(form.data?.deal_price || 0)-Number(form.data?.deal_fare || 0))*Number(form.data?.settlement_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                    </div>
                                    <div v-else>--</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-else>
                                <a-form-item :label="$t('channelOrder.detail.5umckd6umpw0')">
                                    <div v-if="form.data?.settlement_status == 1">
                                        <div v-if="[0,1,3,5].includes(form.data?.status)">{{ ((Number(form.data?.trade_num || 0)*Number(form.data?.trade_price || 0)+Number(form.data?.trade_fare || 0))*Number(form.data?.settlement_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                        <div v-else>{{ ((Number(form.data?.deal_num || 0)*Number(form.data?.deal_price || 0)+Number(form.data?.deal_fare || 0))*Number(form.data?.settlement_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                    </div>
                                    <div v-else>--</div>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-card>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const route = useRoute()
const router = useRouter()
const formRef = ref()
const loading = ref(false)
const form: any = reactive({
    show: false,
    loading: false,
    type:'',
    data: {},
    orderChargeList:[]
})
const getData = async () => {
    loading.value = true
    const { code, data } = await apiTrs.orderItemInfo({
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

<style lang="less" scoped>:deep(.arco-form-item-label-col > .arco-form-item-label) {
    color: var(--color-text-3);
}</style>