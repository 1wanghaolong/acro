<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-tabs v-model:active-key="key" justify>
                <a-tab-pane style="overflow: auto;" key="tip_otc_exchange" :title="$t('tip.tip.5um2ykfq73c0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="tipOtcExchange" :model="form.tipOtcExchange" layout="vertical"
                            :rules="(form.rules as any)" :style="{ width: '800px', margin: 'auto' }"
                            @submit="submit('tipOtcExchange')">
                            <a-form-item field="tipOtcExchange.zh-CN" :label="$t('tip.tip.5um2ykfq97g0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipOtcExchange['zh-CN']" :placeholder="$t('tip.tip.5um2ykfq9hg0')" />
                            </a-form-item>
                            <a-form-item field="tipOtcExchange.en" :label="$t('tip.tip.5um2ykfqazo0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipOtcExchange['en']" :placeholder="$t('tip.tip.5um2ykfqcho0')" />
                            </a-form-item>
                            <a-form-item field="tipOtcExchange.tc" :label="$t('tip.tip.5um2ykfqcv40')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipOtcExchange['tc']" :placeholder="$t('tip.tip.5um2ykfqd200')" />
                            </a-form-item>
                            <a-form-item v-if="$permission(['configTipUpdate'])">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="resetBtn('tipOtcExchange')">{{$t('tip.tip.5um2ykfqdjo0')}}</a-button>
                                        <a-button type="primary" html-type="submit">
                                            {{$t('tip.tip.5um2ykfqee40')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="tip_otc_payment" :title="$t('tip.tip.5um2ykfqer40')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="tipOtcPayment" :model="form.tipOtcPayment" layout="vertical"
                            :rules="(form.rules as any)" :style="{ width: '800px', margin: 'auto' }"
                            @submit="submit('tipOtcPayment')">
                            <a-form-item field="tipOtcPayment.zh-CN" :label="$t('tip.tip.5um2ykfq97g0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipOtcPayment['zh-CN']" :placeholder="$t('tip.tip.5um2ykfq9hg0')" />
                            </a-form-item>
                            <a-form-item field="tipOtcPayment.en" :label="$t('tip.tip.5um2ykfqazo0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipOtcPayment['en']" :placeholder="$t('tip.tip.5um2ykfqcho0')" />
                            </a-form-item>
                            <a-form-item field="tipOtcPayment.tc" :label="$t('tip.tip.5um2ykfqcv40')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipOtcPayment['tc']" :placeholder="$t('tip.tip.5um2ykfqd200')" />
                            </a-form-item>
                            <a-form-item v-if="$permission(['configTipUpdate'])">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="resetBtn('tipOtcPayment')">{{$t('tip.tip.5um2ykfqdjo0')}}</a-button>
                                        <a-button type="primary" html-type="submit">
                                            {{$t('tip.tip.5um2ykfqee40')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="tip_otc_withdraw" :title="$t('tip.tip.5um2ykfqey40')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="tipOtcWithdraw" :model="form.tipOtcWithdraw" layout="vertical"
                            :rules="(form.rules as any)" :style="{ width: '800px', margin: 'auto' }"
                            @submit="submit('tipOtcWithdraw')">
                            <a-form-item field="tipOtcWithdraw.zh-CN" :label="$t('tip.tip.5um2ykfq97g0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipOtcWithdraw['zh-CN']" :placeholder="$t('tip.tip.5um2ykfq9hg0')" />
                            </a-form-item>
                            <a-form-item field="tipOtcWithdraw.en" :label="$t('tip.tip.5um2ykfqazo0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipOtcWithdraw['en']" :placeholder="$t('tip.tip.5um2ykfqcho0')" />
                            </a-form-item>
                            <a-form-item field="tipOtcWithdraw.tc" :label="$t('tip.tip.5um2ykfqcv40')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipOtcWithdraw['tc']" :placeholder="$t('tip.tip.5um2ykfqd200')" />
                            </a-form-item>
                            <a-form-item field="tipWithdrawFare.zh-CN" :label="$t('tip.tip.5um2ykfqf3c0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipWithdrawFare['zh-CN']" :placeholder="$t('tip.tip.5um2ykfqf800')" />
                            </a-form-item>
                            <a-form-item field="tipWithdrawFare.en" :label="$t('tip.tip.5um2ykfqffg0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipWithdrawFare['en']" :placeholder="$t('tip.tip.5um2ykfqfoc0')" />
                            </a-form-item>
                            <a-form-item field="tipWithdrawFare.tc" :label="$t('tip.tip.5um2ykfqfu80')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipWithdrawFare['tc']" :placeholder="$t('tip.tip.5um2ykfqgag0')" />
                            </a-form-item>
                            <a-form-item v-if="$permission(['configTipUpdate'])">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="resetBtn('tipOtcWithdraw')">{{$t('tip.tip.5um2ykfqdjo0')}}</a-button>
                                        <a-button type="primary" html-type="submit">
                                            {{$t('tip.tip.5um2ykfqee40')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="customerConfig" :title="$t('tip.tip.5uo3n5spfb40')"  v-if="$permission(['configWithDrawDetail'])">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="customerConfig" :model="withdrawFrom.customerConfig" layout="vertical"
                            :rules="(form.rules as any)" :style="{ width: '800px', margin: 'auto' }"
                            @submit="withdrawSubmit()">
                            <a-form-item field="customerConfig.phone1" :label="$t('tip.tip.5uo3n5spga00')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 2, maxRows: 2 }"
                                    v-model="withdrawFrom.customerConfig['phone1']" :placeholder="$t('tip.tip.5uo3n5spga00')" />
                            </a-form-item>
                            <a-form-item field="customerConfig.service1" :label="$t('tip.tip.5uo3n5spge00')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 2, maxRows: 2 }"
                                    v-model="withdrawFrom.customerConfig['service1']" :placeholder="$t('tip.tip.5uo3n5spge00')" />
                            </a-form-item>
                            <a-form-item field="customerConfig.phone2" :label="$t('tip.tip.5uo3n5spgl40')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 2, maxRows: 2 }"
                                    v-model="withdrawFrom.customerConfig['phone2']" :placeholder="$t('tip.tip.5uo3n5spgl40')" />
                            </a-form-item>
                            <a-form-item field="customerConfig.service2" :label="$t('tip.tip.5uo3n5spgpw0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 2, maxRows: 2 }"
                                    v-model="withdrawFrom.customerConfig['service2']" :placeholder="$t('tip.tip.5uo3n5spgpw0')" />
                            </a-form-item>
                            <a-form-item v-if="$permission(['configWithDrawUpdate'])">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="resetBtn('customerConfig')">{{$t('tip.tip.5um2ykfqdjo0')}}</a-button>
                                        <a-button type="primary" html-type="submit">
                                            {{$t('tip.tip.5um2ykfqee40')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane v-if="viteName == 'trsPro'" style="overflow: auto;" key="tip_trs_apply" :title="`TRS${$t('tip.tip.5umzglkeeqo0')}`">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="tipTrsApply" :model="form.tipTrsApply" layout="vertical" :rules="(form.rules as any)"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit('tipTrsApply')">
                            <a-form-item field="tipTrsApply.zh-CN" :label="$t('tip.tip.5um2ykfq97g0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipTrsApply['zh-CN']" :placeholder="$t('tip.tip.5um2ykfq9hg0')" />
                            </a-form-item>
                            <a-form-item field="tipTrsApply.en" :label="$t('tip.tip.5um2ykfqazo0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipTrsApply['en']" :placeholder="$t('tip.tip.5um2ykfqcho0')" />
                            </a-form-item>
                            <a-form-item field="tipTrsApply.tc" :label="$t('tip.tip.5um2ykfqcv40')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipTrsApply['tc']" :placeholder="$t('tip.tip.5um2ykfqd200')" />
                            </a-form-item>
                            <a-form-item v-if="$permission(['configTipUpdate'])">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="resetBtn('configTipUpdate')">{{$t('tip.tip.5um2ykfqdjo0')}}</a-button>
                                        <a-button type="primary" html-type="submit">
                                            {{$t('tip.tip.5um2ykfqee40')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <!-- 仅pro保留 -->
                <a-tab-pane v-if="$permission(['cmsProOnlyTip'])" style="overflow: auto;" key="tip_ipo" :title="$t('tip.tip.5um2ykfqgjw0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="tipIpo" :model="form.tipIpo" layout="vertical" :rules="(form.rules as any)"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit('tipIpo')">
                            <a-form-item field="tipIpo.zh-CN" :label="$t('tip.tip.5um2ykfq97g0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipIpo['zh-CN']" :placeholder="$t('tip.tip.5um2ykfq9hg0')" />
                            </a-form-item>
                            <a-form-item field="tipIpo.en" :label="$t('tip.tip.5um2ykfqazo0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipIpo['en']" :placeholder="$t('tip.tip.5um2ykfqcho0')" />
                            </a-form-item>
                            <a-form-item field="tipIpo.tc" :label="$t('tip.tip.5um2ykfqcv40')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipIpo['tc']" :placeholder="$t('tip.tip.5um2ykfqd200')" />
                            </a-form-item>
                            <a-form-item v-if="$permission(['configTipUpdate'])">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="resetBtn('tipIpo')">{{$t('tip.tip.5um2ykfqdjo0')}}</a-button>
                                        <a-button type="primary" html-type="submit">
                                            {{$t('tip.tip.5um2ykfqee40')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane v-if="$permission(['cmsProOnlyTip'])" style="overflow: auto;" key="tip_strategy_risk" :title="$t('tip.tip.5um2ykfqgr00')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="tipStrategyRisk" :model="form.tipStrategyRisk" layout="vertical"
                            :rules="(form.rules as any)" :style="{ width: '800px', margin: 'auto' }"
                            @submit="submit('tipStrategyRisk')">
                            <a-form-item field="tipStrategyRisk.zh-CN" :label="$t('tip.tip.5um2ykfqgvs0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipStrategyRisk['zh-CN']" :placeholder="$t('tip.tip.5um2ykfqhdo0')" />
                            </a-form-item>
                            <a-form-item field="tipStrategyRisk.en" :label="$t('tip.tip.5um2ykfqhiw0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipStrategyRisk['en']" :placeholder="$t('tip.tip.5um2ykfqhpw0')" />
                            </a-form-item>
                            <a-form-item field="tipStrategyRisk.tc" :label="$t('tip.tip.5um2ykfqhw00')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipStrategyRisk['tc']" :placeholder="$t('tip.tip.5um2ykfqids0')" />
                            </a-form-item>
                            <a-form-item v-if="$permission(['configTipUpdate'])">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="resetBtn('tipStrategyRisk')">{{$t('tip.tip.5um2ykfqdjo0')}}</a-button>
                                        <a-button type="primary" html-type="submit">
                                            {{$t('tip.tip.5um2ykfqee40')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane v-if="$permission(['cmsProOnlyTip'])" style="overflow: auto;" key="tip_grey_trade" :title="$t('tip.tip.5um2ykfqikc0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="tipGreyTrade" :model="form.tipGreyTrade" layout="vertical" :rules="(form.rules as any)"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit('tipGreyTrade')">
                            <a-form-item field="tipGreyTrade.zh-CN" :label="$t('tip.tip.5um2ykfqipc0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipGreyTrade['zh-CN']" :placeholder="$t('tip.tip.5um2ykfqiu80')" />
                            </a-form-item>
                            <a-form-item field="tipGreyTrade.en" :label="$t('tip.tip.5um2ykfqiyg0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipGreyTrade['en']" :placeholder="$t('tip.tip.5um2ykfqj2c0')" />
                            </a-form-item>
                            <a-form-item field="tipGreyTrade.tc" :label="$t('tip.tip.5um2ykfqj680')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipGreyTrade['tc']" :placeholder="$t('tip.tip.5um2ykfqja80')" />
                            </a-form-item>
                            <a-form-item v-if="$permission(['configTipUpdate'])">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="resetBtn('tipGreyTrade')">{{$t('tip.tip.5um2ykfqdjo0')}}</a-button>
                                        <a-button type="primary" html-type="submit">
                                            {{$t('tip.tip.5um2ykfqee40')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <!-- 仅pro保留 -->
                <a-tab-pane v-if="viteName == 'cmsPro'" style="overflow: auto;" key="tip_destroy_account" :title="$t('tip.tip.5um2ykfqjec0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="tipDestroyAccount" :model="form.tipDestroyAccount" layout="vertical"
                            :rules="(form.rules as any)" :style="{ width: '800px', margin: 'auto' }"
                            @submit="submit('tipDestroyAccount')">
                            <a-form-item field="tipDestroyAccount.zh-CN" :label="$t('tip.tip.5um2ykfqjic0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipDestroyAccount['zh-CN']" :placeholder="$t('tip.tip.5um2ykfqjlo0')" />
                            </a-form-item>
                            <a-form-item field="tipDestroyAccount.en" :label="$t('tip.tip.5um2ykfqjpw0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipDestroyAccount['en']" :placeholder="$t('tip.tip.5um2ykfqju80')" />
                            </a-form-item>
                            <a-form-item field="tipDestroyAccount.tc" :label="$t('tip.tip.5um2ykfqjyg0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipDestroyAccount['tc']" :placeholder="$t('tip.tip.5um2ykfqk280')" />
                            </a-form-item>
                            <a-form-item v-if="$permission(['configTipUpdate'])">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="resetBtn('tipDestroyAccount')">{{$t('tip.tip.5um2ykfqdjo0')}}</a-button>
                                        <a-button type="primary" html-type="submit">
                                            {{$t('tip.tip.5um2ykfqee40')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
const key = ref('tip_otc_exchange')
const viteName = import.meta.env.VITE_NAME
const tipTrsApply = ref()
const tipOtcExchange = ref()
const tipOtcPayment = ref()
const tipOtcWithdraw = ref()
const tipGreyTrade = ref()
const tipIpo = ref()
const tipStrategyRisk = ref()
const tipDestroyAccount = ref()
const withdrawFrom:any = reactive({
    detail:{},
    customerConfig: {
        phone1:"",
        service1:"",
        phone2:"",
        service2:"",
    },
})
const form: any = reactive({
    show: false,
    loading: false,
    tipTrsApply: {
        en: '',
        tc: '',
        'zh-CN': '',
    },
    tipOtcExchange: {
        en: '',
        tc: '',
        'zh-CN': '',
    },
    tipOtcPayment: {
        en: '',
        tc: '',
        'zh-CN': '',
    },
    tipOtcWithdraw: {
        en: '',
        tc: '',
        'zh-CN': '',
    },
    tipGreyTrade: {
        en: '',
        tc: '',
        'zh-CN': '',
    },
    tipIpo: {
        en: '',
        tc: '',
        'zh-CN': '',
    },
    tipStrategyRisk: {
        en: '',
        tc: '',
        'zh-CN': '',
    },
    tipDestroyAccount: {
        en: '',
        tc: '',
        'zh-CN': '',
    },
    tipWithdrawFare: {
        en: '',
        tc: '',
        'zh-CN': '',
    },
    rules: {
        // 'tipTrsApply.zh-CN':[{ required: true, message: '请输入温馨提示(中)' }],
        // 'tipTrsApply.tc':[{ required: true, message: '请输入温馨提示(繁)' }],
        // 'tipTrsApply.en':[{ required: true, message: '请输入温馨提示(英)' }],
    }
})
const withdrawSubmit = async () => {
    const { code, msg } = await apiAdmin.configUpdate({
        group:'trs',
        data: {
            ...withdrawFrom.detail,
            customer_config:withdrawFrom.customerConfig
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    configGetData()
}
const configGetData = async () => {
    form.loading = true
    const { code, data } = await apiAdmin.configList({
        group:'trs'
    })
    form.loading = false
    if (code != 1) return;
    withdrawFrom.detail = data
    withdrawFrom.customerConfig = data.customer_config || {}
}
{
    configGetData()
}
const submit = async (name: any) => {
    let parsm = {
        tipList: [{
            key: key.value,
            content: form[name]
        }]
    }
    if (name = 'tipOtcWithdraw') {
        parsm.tipList.push({
            key: 'tip_withdraw_fare',
            content: form['tipWithdrawFare']
        })
    }
    const { code, msg } = await apiTrs.systemTipListSave(parsm)
    if (code != 1) return;
    Message.success({ content: msg })
}
const getData = async () => {
    const { code, data } = await apiTrs.systemTipList()
    if (code != 1) return;
    data.forEach((item: any) => {
        if (item.key == 'tip_trs_apply') {
            form.tipTrsApply = item.content
        }
        if (item.key == 'tip_otc_exchange') {
            form.tipOtcExchange = item.content
        }
        if (item.key == 'tip_otc_payment') {
            form.tipOtcPayment = item.content
        }
        if (item.key == 'tip_otc_withdraw') {
            form.tipOtcWithdraw = item.content
        }
        if (item.key == 'tip_grey_trade') {
            form.tipGreyTrade = item.content
        }
        if (item.key == 'tip_ipo') {
            form.tipIpo = item.content
        }
        if (item.key == 'tip_strategy_risk') {
            form.tipStrategyRisk = item.content
        }
        if (item.key == 'tip_destroy_account') {
            form.tipDestroyAccount = item.content
        }
        if (item.key == 'tip_withdraw_fare') {
            form.tipWithdrawFare = item.content
        }
    });

}
const resetBtn = (name: any) => {
    console.log(name);

    // form[name] = {
    //     en: '',
    //     tc: '',
    //     'zh-CN': '',
    // }
    getData()
    usePermission(["configWithDrawDetail"]) && configGetData()
}
{
    getData()
}
</script>