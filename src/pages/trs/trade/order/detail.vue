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
                                {{$t('order.detail.5umc45u23sw0')}}
                            </a-space>
                        </div>
                    </template>
                    <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u24v00')">
                                    {{ form.data?.symbol }}
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u252o0')">
                                    <div>{{ form.data?.security_info?.name }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u25800')">
                                    <a-tag>{{ useEnumsFormat('market.order.direction', form.data?.direction) }}</a-tag>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u25cg0')">
                                    <a-tag>{{ useEnumsFormat('market.order.price_type', form.data?.price_type) }}</a-tag>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u25ho0')">
                                    <div>{{ form.data?.trade_price }} {{ form.data?.trade_currency }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u25og0')">
                                    <div>{{ form.data?.trade_num }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u25sw0')">
                                    {{ dayjs.unix(form.data.trade_time).format('YYYY-MM-DD HH:mm:ss') }}
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u25xg0')">
                                    <a-tag>{{ useEnumsFormat('market.order.expire_type', form.data?.expire_type) }}</a-tag>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.expire_type == 3">
                                <a-form-item :label="$t('order.detail.5umc45u26280')">
                                    {{ form.data?.expire_time ? dayjs.unix(form.data?.expire_time).format('YYYY-MM-DD HH:mm:ss') : '-' }}
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u266c0')">
                                    <div>{{ form.data?.deal_price }} {{ form.data?.trade_currency }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u26aw0')">
                                    <div>{{ form.data?.deal_num }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u26f80')">
                                    {{ form.data?.deal_time ? dayjs.unix(form.data?.deal_time).format('YYYY-MM-DD HH:mm:ss')
                                        : '-' }}
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u26jk0')">
                                    <!-- <div v-if="[0,1,3].includes(form.data.status)">{{form.data?.deal_fare || '0.0000'}}</div> -->
                                    <div>{{ (Number(form.data?.deal_num)*Number(form.data?.deal_price)).toFixed(4) }} {{ form.data?.trade_currency }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u26ns0')">
                                    <a-tag>{{ useEnumsFormat('market.order.status', form.data?.status) }}</a-tag>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u26s00')">
                                    <div v-if="[0,1,3,5].includes(form.data.status)">{{ form.data.trade_fare }} {{ form.data?.trade_currency }}</div>
                                    <div v-else>{{ form.data.deal_fare }} {{ form.data?.trade_currency }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u26yg0')">
                                    <a-tag>{{ useEnumsFormat('market.order.create_type', form.data?.create_type) }}</a-tag>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.reason">
                                <a-form-item :label="$t('order.detail.5umc45u27300')">
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
                                {{$t('order.detail.5umc45u277g0')}}
                            </a-space>
                        </div>
                    </template>
                    <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="`TRS${ $t('order.detail.5umc45u27bw0') }`">
                                    {{ form.data?.trs_account_info?.account }}
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u27ho0')">
                                    <div>{{ form.data?.asset_account_info?.account }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u27lw0')">
                                    <div>{{ form.data?.asset_account_info?.real_name }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u27q40')">
                                    <div>{{ form.data?.asset_account_info?.english_name }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u27to0')">
                                    <div>{{ form.data?.trs_account_info?.currency }}</div>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-card>
                <a-card :loading="loading" style="margin-top: 20px;" v-if="form.data?.settlement_status != 2">
                    <template #title>
                        <div style="display: flex;justify-content: space-between;">
                            <a-space :size="18">
                                {{$t('order.detail.5umc45u27yw0')}}
                            </a-space>
                        </div>
                    </template>
                    <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u282c0')">
                                    <div style="display: flex;align-items: center;">
                                        <a-tag>{{ form.data?.trade_currency }}</a-tag>
                                        <icon-arrow-right />
                                        <a-tag style="margin-right: 10px;">{{ form.data?.settlement_currency }}</a-tag> {{ form.data?.trade_exchange_rate }}
                                    </div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.direction == 2">
                                <a-form-item :label="$t('order.detail.5umc45u285s0')">
                                    <div v-if="[0,1,3,5].includes(form.data?.status)">{{ (((Number(form.data?.trade_num || 0)*Number(form.data?.trade_price || 0))-Number(form.data?.trade_fare || 0))*Number(form.data?.trade_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                    <div v-else>{{ (((Number(form.data?.deal_num || 0)*Number(form.data?.deal_price || 0))-Number(form.data?.deal_fare || 0))*Number(form.data?.trade_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-else>
                                <a-form-item :label="$t('order.detail.5umc45u289c0')">
                                    <div v-if="[0,1,3,5].includes(form.data?.status)">{{ ((Number(form.data?.trade_num || 0)*Number(form.data?.trade_price || 0)+Number(form.data?.trade_fare || 0))*Number(form.data?.trade_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                    <div v-else>{{ ((Number(form.data?.deal_num || 0)*Number(form.data?.deal_price || 0)+Number(form.data?.deal_fare || 0))*Number(form.data?.trade_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <a-form-item :label="$t('order.detail.5umc45u28ck0')">
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
                                <a-form-item :label="$t('order.detail.5umc45u28fw0')">
                                    <div v-if="form.data?.settlement_status == 1">
                                        <div v-if="[0,1,3,5].includes(form.data?.status)">{{ ((Number(form.data?.trade_num || 0)*Number(form.data?.trade_price || 0)-Number(form.data?.trade_fare || 0))*Number(form.data?.settlement_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                        <div v-else>{{ ((Number(form.data?.deal_num || 0)*Number(form.data?.deal_price || 0)-Number(form.data?.deal_fare || 0))*Number(form.data?.settlement_exchange_rate || 0)).toFixed(4) }} {{ form.data?.settlement_currency }}</div>
                                    </div>
                                    <div v-else>--</div>
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6" v-else>
                                <a-form-item :label="$t('order.detail.5umc45u28j40')">
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
                <a-card :loading="loading" style="margin-top: 20px;" v-permission="['trsOrderChargeList']">
                    <template #title>
                        <div style="display: flex;justify-content: space-between;">
                            <a-space :size="18">
                                {{$t('order.detail.5umc45u28og0')}}
                            </a-space>
                        </div>
                    </template>
                    <a-space :size="18" style="margin-bottom: 10px;">
                        <a-radio-group @change="getOrderChargeList" type="button" v-model="form.type">
                            <a-radio value="">{{$t('order.detail.5umc45u28s80')}}</a-radio>
                            <a-radio v-for="item in useEnums('trs.order.order_charge.type')" :value="item.value">{{ item.trans[local.lang] }}</a-radio>
                        </a-radio-group>
                    </a-space>
                    <a-table :bordered="false" column-resizable :pagination="false" :loading="form.loading"
                        :scroll="{ x: '100%', y: '100%' }" size="small"
                        :data="form.orderChargeList" class="table">
                        <template #columns>
                            <a-table-column title="#" :width="50">
                                <template #cell="{ rowIndex }">
                                    {{ rowIndex + 1 }}
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('order.detail.5umc45u28vc0')">
                                <template #cell="{ record }">
                                    <div>{{ record.name }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('order.detail.5umc45u28ys0')">
                                <template #cell="{ record }">
                                    <div>{{ record.charge_num }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('order.detail.5umc45u292o0')">
                                <template #cell="{ record }">
                                    <div>{{ useEnumsFormat('market.order.calculate_type',record.calculate_type) }}</div>
                                    <div>{{ Number(record.calculate_value) }}{{ record.calculate_type == 1 ? `% ${ $t('order.detail.5unuj3o1w6k0') }`: record.calculate_type == 2 ? $t('order.detail.5unuj3o1x5c0') : $t('order.detail.5unuj3o1xd00')}}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('order.detail.5umc45u29640')">
                                <template #cell="{ record }">
                                    <div>{{$t('order.detail.5unuj3o1xg00')}}:{{ Number(record.max) }}</div>
                                    <div>{{$t('order.detail.5unuj3o1xiw0')}}:{{ Number(record.min) }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('order.detail.5umc45u299c0')">
                                <template #cell="{ record }">
                                    <a-tag>
                                        {{ useEnumsFormat('trs.order.round_type', record.round_type) }}
                                    </a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('order.detail.5umc45u29e80')">
                                <template #cell="{ record }">
                                    <div>{{ record.round_precision }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('order.detail.5umc45u29i00')">
                                <template #cell="{ record }">
                                    <a-tag>{{ useEnumsFormat('trs.order.order_charge.type', record.type) }}</a-tag>
                                </template>
                            </a-table-column>
                        </template>
                    </a-table>
                    <a-space style="margin-top: 10px;">
                        <a-tag>{{$t('order.detail.5unuj3o1xlg0')}}：{{ computedCharge(1) }} {{ form.data?.trade_currency }}</a-tag>
                        <a-tag>{{$t('order.detail.5unuj3o1xok0')}}：{{ computedCharge(2) }} {{ form.data?.trade_currency }}</a-tag>
                        <a-tag>{{$t('order.detail.5unuj3o1xrk0')}}：{{ computedCharge(3) }} {{ form.data?.trade_currency }}</a-tag>
                    </a-space>
                </a-card>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
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
    const { code, data } = await apiTrs.orderInfo({
        id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
    usePermission(['trsOrderChargeList']) && getOrderChargeList()
}
const getOrderChargeList = async () => {
    form.loading = true
    const { code, data } = await apiTrs.orderChargeList(useFilter({
        order_id: route.params?.id,
        type:form.type,
        record_type:[0,1,3,5].includes(form.data.status)?1:2
    }))
    form.loading = false
    if (code != 1) return;
    form.orderChargeList = data.list
}
const computedCharge = (type:number) => {
    if(type == 1){
        let a = 0
        form.orderChargeList.forEach((item:any)=>{
            a += Number(item.charge_num)
        })
        return a
    }
    if(type == 2){
        let a = 0
        form.orderChargeList.filter((item:any)=>item.type == 1).forEach((item:any)=>{
            a += Number(item.charge_num)
        })
        return a
    }
    if(type == 3){
        let a = 0
        form.orderChargeList.filter((item:any)=>item.type == 2).forEach((item:any)=>{
            a += Number(item.charge_num)
        })
        return a
    }
}
{
    getData()
}

</script>

<style lang="less" scoped>:deep(.arco-form-item-label-col > .arco-form-item-label) {
    color: var(--color-text-3);
}</style>