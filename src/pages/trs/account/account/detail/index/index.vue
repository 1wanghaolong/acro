<template>
    <div>
        <a-card :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('index.index.5um82mcbowo0')}}
                    </a-space>
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="`TRS${ $t('index.index.5um82mcbpfs0') }`">
                            {{ form.data?.account }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbpk00')">
                            {{ form.data?.asset_account_info?.account }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbpm80')">
                            <a-tag>
                                {{ form.data?.currency }}
                            </a-tag>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbpok0')">
                            <a-tag>
                                {{ useEnumsFormat('market.market_type', form.data?.market_type) }}
                            </a-tag>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbpqs0')">
                            <a-tag size="small" :color="form.data?.risk_control_status == 1?'#00b42a':form.data?.risk_control_status == 2?'#ff7d00':'#f53f3f'">
                                {{ useEnumsFormat('trs.account.risk_control_status', form.data?.risk_control_status) }}
                            </a-tag>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbpsw0')">
                            <a-tag size="small" :color="form.data?.trade_status == 1?'#00b42a':form.data?.trade_status == 3?'#ff7d00':'#f53f3f'">
                                {{ useEnumsFormat('trs.account.trade_status', form.data?.trade_status) }}
                            </a-tag>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbpv00')">
                            <a-tag>
                                {{useEnumsFormat('trs.account.risk_control_calculate_type',form.data?.risk_control_calculate_type)}}
                            </a-tag>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbpx40')">
                            <a-tag>
                                {{ useEnumsFormat('trs.account.interest_accrual_type', form.data?.interest_accrual_type) }}
                            </a-tag>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbpzk0')">
                            <a-tag>
                                {{ useEnumsFormat('trs.account.interest_deduct_account', form.data?.interest_deduct_account) }}
                            </a-tag>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbq1o0')">
                            {{ form.data?.annual_interest_rate }}%
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbq440')">
                            {{ form.data?.investment_scope_temp_info?.name }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbq6c0')">
                            <a-tag size="small" :color="form.data?.use_status == 1?'#00b42a':'#f53f3f'">
                                {{ useEnumsFormat('trs.account.use_status', form.data?.use_status) }}
                            </a-tag>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbq8c0')">
                            {{ form.data?.charge_package_info?.name }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbqa40')">
                            {{ form.data?.counter_channel_account_scene_temp_info?.name }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbqc80')">
                            {{ dayjs.unix(form.data.open_time).format('YYYY-MM-DD HH:mm:ss') }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbqe00')">
                            {{ dayjs.unix(form.data.expire_time).format('YYYY-MM-DD HH:mm:ss') }}
                        </a-form-item>
                    </a-col>
                </a-row>

            </a-form>
        </a-card>
        <a-card :loading="loading" style="margin-top: 20px;">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('index.index.5um82mcbqgk0')}}
                    </a-space>
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbqio0')">
                            <div>{{ form.data?.summary_cash }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbqko0')">
                            <div>{{ form.data?.total_assure_cash }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbqng0')">
                            <div>{{ form.data?.total_finance }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbqpg0')">
                            <div>{{ form.data?.total_asset }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbqrs0')">
                            <div>{{ form.data?.market_value }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbqtg0')">
                            <div>{{ form.data?.usable_power }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbqus0')">
                            <div>{{ form.data?.freeze_power }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbqwc0')">
                            <div>{{ Number(form.data?.interest_accrual_amount) }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbqxs0')">
                            <div>{{ Number(form.data?.receivable_interest) }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if='viteItemName =="hx"'>
                        <a-form-item :label="$t('index.index.5um82mcbqzk0')">
                            <div>{{ Number(form.data?.wait_deduct_interest) || 0 }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbr100')">
                            <div>{{ form.data?.max_withdraw_amount }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbr2o0')">
                            <div>{{ Number(form.data?.total_profit) > 0 ?`+${form.data?.total_profit}` : form.data?.total_profit }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('index.index.5um82mcbr440')">
                            <div>{{ (form.data?.loss_amount_rate * 100).toFixed(2) }}%</div>
                        </a-form-item>
                    </a-col>
                </a-row>

            </a-form>
        </a-card>
        <a-card :loading="loading" style="margin: 20px 0;">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('index.index.5um82mcbr5w0')}}
                    </a-space>
                </div>
            </template>
            <a-row :gutter="[16,16]" v-permission="['trsAccountDetailRiskControlUpdate','trsAccountDetailInterestUpdate']">
                <a-col :xs="24">
                    <div class="title">{{$t('index.index.5um82mcbr7c0')}}</div>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['trsAccountDetailRiskControlUpdate']">
                    <a-card hoverable class="button" @click="router.push({name:'trsAccountDetailCharge',query:{setup:1}})">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbr8o0')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['trsAccountDetailInterestUpdate']">
                    <a-card hoverable class="button" @click="router.push({name:'trsAccountDetailInterest',query:{setup:1}})">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbra80')}}
                        </a-space>
                    </a-card>
                </a-col>
            </a-row>
            <a-row :gutter="[16,16]" v-permission="['trsAccountDetailTransferCreate','trsAccountDetailWithdrawCreate','trsAccountDetailFinanceUpdate','trsAccountDetailAssureCreate']">
                <a-col :xs="24">
                    <div class="title">{{$t('index.index.5um82mcbrbk0')}}</div>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['trsAccountDetailTransferCreate']">
                    <a-card hoverable class="button" @click="router.push({name:'trsAccountDetailTransfer',query:{create:1}})">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbrd40')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['trsAccountDetailWithdrawCreate']">
                    <a-card hoverable class="button" @click="router.push({name:'trsAccountDetailWithdraw',query:{create:1}})">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbreg0')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['trsAccountDetailFinanceUpdate']">
                    <a-card hoverable class="button" @click="router.push({name:'trsAccountDetailFinance',query:{create:1}})">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbrgc0')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['trsAccountDetailAssureCreate']">
                    <a-card hoverable class="button" @click="router.push({name:'trsAccountDetailAssure',query:{create:1}})">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbrhs0')}}
                        </a-space>
                    </a-card>
                </a-col>
            </a-row>
            <a-row :gutter="[16,16]" v-permission="['configOrderSortUpdate']">
                <a-col :xs="24">
                    <div class="title">{{$t('index.index.5um82mcbrj80')}}</div>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['configOrderSortUpdate']">
                    <a-card hoverable class="button" @click="form.sceneTempShow = true">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbrl40')}}
                        </a-space>
                    </a-card>
                </a-col>
            </a-row>
            <a-row :gutter="[16,16]" v-permission="['trsAccountDetailRiskControlUpdate','configOrderSortUpdate','trsAccountTradeStatusUpdate']">
                <a-col :xs="24">
                    <div class="title">{{$t('index.index.5um82mcbrmk0')}}</div>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['trsAccountDetailRiskControlUpdate']">
                    <a-card hoverable class="button" @click="router.push({name:'trsAccountDetailRiskControl',query:{setup:1}})">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbro80')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['configOrderSortUpdate']">
                    <a-card hoverable class="button" @click="router.push({name:'trsAccountDetailRiskControl'})">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbrqs0')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['trsAccountTradeStatusUpdate']">
                    <a-card hoverable class="button" @click="form.tradeStatusShow = true">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbrsk0')}}
                        </a-space>
                    </a-card>
                </a-col>
            </a-row>
            <a-row :gutter="[16,16]" v-permission="['trsAccountRenewal','trsAccountCancel','trsAccountDetailAgreementUpload']">
                <a-col :xs="24">
                    <div class="title">{{$t('index.index.5um82mcbru80')}}</div>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['trsAccountRenewal']">
                    <a-card hoverable class="button" @click="renewalShow">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbru80')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['trsAccountCancel']">
                    <a-card hoverable class="button" @click="accountCancelShow">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbrvw0')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-permission="['trsAccountDetailAgreementUpload']">
                    <a-card hoverable class="button" @click="router.push({name:'trsAccountDetailAgreement',query:{create:1}})">
                        <a-space size="medium">
                            <img src="@/assets/svg/kjtb.svg" />
                            {{$t('index.index.5um82mcbrxk0')}}
                        </a-space>
                    </a-card>
                </a-col>
            </a-row>
        </a-card>
        <!-- 修改通道排序 -->
        <sceneTemp v-if="form.sceneTempShow" @refresh="getData" v-model:show="form.sceneTempShow" :detail="form.data" />
        <tradeStatus v-if="form.tradeStatusShow" @refresh="getData" v-model:show="form.tradeStatusShow" :detail="form.data" />
        <renewal v-if="form.renewalShow" @refresh="getData" v-model:show="form.renewalShow" :detail="form.data" />
        <accountCancel v-if="form.accountCancelShow" @refresh="getData" v-model:show="form.accountCancelShow" :detail="form.data" />
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
import sceneTemp from './sceneTemp.vue'
import tradeStatus from './tradeStatus.vue'
import renewal from './renewal.vue'
import accountCancel from './accountCancel.vue'
const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n();
const loading = ref(false)
const viteItemName = import.meta.env.VITE_ITEM_NAME || ""
const form: any = reactive({
    show: true,
    loading: false,
    sceneTempShow:false,
    tradeStatusShow:false,
    renewalShow:false,
    accountCancelShow:false,
    data: {},
})
const getData = async () => {
    loading.value = true
    const { code, data } = await apiTrs.accountInfo({
        id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
}
const renewalShow = () => {
    if(form.data.use_status == 2) return Message.error(t('index.index.5um82mcbryw0'))
    form.renewalShow = true
}
const accountCancelShow = () => {
    if(form.data.use_status == 2) return Message.error(t('index.index.5um82mcbs0o0'))
    form.accountCancelShow = true
}
{
    getData()
}
</script>
<style lang="less" scoped>
.title{
    line-height: 26px;
    position: relative;
    padding-left: 10px;
    &::before{
        position: absolute;
        content: '';
        width: 3px;
        height: 100%;
        left: 0;
        background-color: rgb(var(--arcoblue-6));
    }
}
.arco-row{
    margin-top: 10px !important;
    +.arco-row{
        margin-top: 25px !important;
    }
}
.button{
    cursor: pointer;
    :hover{
        color: rgb(var(--arcoblue-6)) !important;
    }
}
</style>