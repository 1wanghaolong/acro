<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-tabs v-model:active-key="active" justify>
                <a-tab-pane style="overflow: auto;" key="license_number0" :title="$t('trade.trade.5um2bq7f2ds0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: local.lang=='en'?'1000px':'800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="hk_fare_finance.us" :label="$t('trade.trade.5um2bq7f9wc0')">
                                <div>
                                    <a-input v-model="form.data.hk_fare_finance.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.hk_fare_finance.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            HKD
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.hk_fare_finance.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            HKD
                                        </template>
                                    </a-input>
                                </div>
                            </a-form-item>
                            <a-form-item field="hk_fare_system.us" :label="$t('trade.trade.5um2bq7fcws0')">
                                <div>
                                    <a-input v-model="form.data.hk_fare_system.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                        <template #suffix>
                                            HKD/{{$t('trade.trade.5um2fzzgfn40')}}
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9e6hc0')}}】</span>
                                </div>
                            </a-form-item>
                            <a-form-item field="hk_fare_commission.us" :label="$t('trade.trade.5um2bq7fdf40')">
                                <div>
                                    <a-input v-model="form.data.hk_fare_commission.us" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.hk_fare_commission.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            HKD
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.hk_fare_commission.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            HKD
                                        </template>
                                    </a-input>
                                </div>
                            </a-form-item>
                            <a-form-item field="hk_fare_transaction.us" :label="$t('trade.trade.5um2bq7fdxs0')">
                                <div>
                                    <a-input v-model="form.data.hk_fare_transaction.us" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.hk_fare_transaction.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            HKD
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.hk_fare_transaction.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            HKD
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9e6hc0')}}】</span>
                                </div>
                            </a-form-item>
                            <a-form-item field="hk_fare_settlement.us" :label="$t('trade.trade.5um2bq7feh80')">
                                <div>
                                    <a-input v-model="form.data.hk_fare_settlement.us" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.hk_fare_settlement.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            HKD
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.hk_fare_settlement.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            HKD
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9ebe80')}}】</span>
                                </div>
                            </a-form-item>
                            <a-form-item field="hk_fare_levy.us" :label="$t('trade.trade.5um2bq7few80')">
                                <div>
                                    <a-input v-model="form.data.hk_fare_levy.us" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.hk_fare_levy.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            HKD
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.hk_fare_levy.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            HKD
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9e6hc0')}}】</span>
                                </div>
                            </a-form-item>
                            <a-form-item field="hk_fare_stamp.us" :label="$t('trade.trade.5um2bq7ff640')">
                                <div>
                                    <a-input v-model="form.data.hk_fare_stamp.us" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.hk_fare_stamp.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            HKD
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.hk_fare_stamp.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            HKD
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9ec680')}}】</span>
                                </div>
                            </a-form-item>
                            <a-form-item field="hk_fare_platform.us" :label="$t('trade.trade.5um2bq7ffbw0')">
                                <div>
                                    <a-input v-model="form.data.hk_fare_platform.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                        <template #suffix>
                                            HKD/{{$t('trade.trade.5um2fzzgfn40')}}
                                        </template>
                                    </a-input>
                                </div>
                            </a-form-item>
                            <a-form-item>
                                <div v-if="$permission(['configTradeUpdate'])" style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('trade.trade.5um2bq7ffl40')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('trade.trade.5um2bq7fftc0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="license_number1" :title="$t('trade.trade.5um2bq7fg2c0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: local.lang=='en'?'1000px':'800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="us_fare_finance.us" :label="$t('trade.trade.5um2bq7f9wc0')">
                                <div>
                                    <a-input v-model="form.data.us_fare_finance.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.us_fare_finance.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            USD
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.us_fare_finance.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            USD
                                        </template>
                                    </a-input>
                                </div>
                            </a-form-item>
                            <a-form-item field="us_fare_commission.us" :label="$t('trade.trade.5um2bq7fdf40')">
                                <div>
                                    <a-input v-model="form.data.us_fare_commission.us" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                        <template #suffix>
                                            USD/{{$t('trade.trade.5um2lqk3xow0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.us_fare_commission.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            USD
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.us_fare_commission.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            USD
                                        </template>
                                    </a-input>
                                </div>
                            </a-form-item>
                            <a-form-item field="us_fare_transaction.us" :label="$t('trade.trade.5um2bq7fg7c0')">
                                <div>
                                    <a-input v-model="form.data.us_fare_transaction.us" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                        <template #suffix>
                                            USD/{{$t('trade.trade.5um2lqk3xow0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.us_fare_transaction.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            USD
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.us_fare_transaction.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            USD
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9ecps0')}}】</span>
                                </div>
                            </a-form-item>
                            <a-form-item field="us_fare_platform.us" :label="$t('trade.trade.5um2bq7ffbw0')">
                                <div>
                                    <a-input v-model="form.data.us_fare_platform.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                        <template #suffix>
                                            USD/{{$t('trade.trade.5um2lqk3xow0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.us_fare_platform.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            USD
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.us_fare_platform.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            USD
                                        </template>
                                    </a-input>
                                </div>
                            </a-form-item>
                            <a-form-item field="us_fare_csrc.us" :label="$t('trade.trade.5um2bq7fgos0')">
                                <div>
                                    <a-input v-model="form.data.us_fare_csrc.us" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.us_fare_csrc.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            USD
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.us_fare_csrc.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            USD
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9eczc0')}}】</span>
                                </div>
                            </a-form-item>
                            <a-form-item field="us_fare_active.us" :label="$t('trade.trade.5um2bq7fgyg0')">
                                <div>
                                    <a-input v-model="form.data.us_fare_active.us" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                        <template #suffix>
                                            USD/{{$t('trade.trade.5um2lqk3xow0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.us_fare_active.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            USD
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.us_fare_active.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            USD
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9ed900')}}】</span>
                                </div>
                            </a-form-item>
                            <p style="margin-bottom: 10px">1、{{$t('trade.trade.5um2fzzgrng0')}}</p>
                            <p style="margin-bottom: 10px">2、{{$t('trade.trade.5um2fzzgs340')}}</p>
                            <p style="margin-bottom: 10px">3、{{$t('trade.trade.5um2fzzgs7g0')}}</p>
                            <p style="margin-bottom: 10px">4、{{$t('trade.trade.5um2fzzgsb00')}}</p>
                            <a-form-item>
                                <div v-if="$permission(['configTradeUpdate'])" style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('trade.trade.5um2bq7ffl40')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('trade.trade.5um2bq7fftc0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="license_number2" :title="$t('trade.trade.5um2bq7fh980')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: local.lang=='en'?'1000px':'800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="cn_fare_platform.us" :label="$t('trade.trade.5um2bq7ffbw0')">
                                <div>
                                    <a-input v-model="form.data.cn_fare_platform.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                        <template #suffix>
                                           CNY
                                        </template>
                                    </a-input>
                                </div>
                            </a-form-item>
                            <a-form-item field="cn_fare_finance.us" :label="$t('trade.trade.5um2bq7f9wc0')">
                                <div>
                                    <a-input v-model="form.data.cn_fare_finance.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_finance.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_finance.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                </div>
                            </a-form-item>
                            <a-form-item field="cn_fare_register.us" :label="$t('trade.trade.5um2bq7fhio0')">
                                <div>
                                    <a-input v-model="form.data.cn_fare_register.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_register.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_register.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9ebe80')}}】</span>
                                </div>
                            </a-form-item>
                            <a-form-item field="cn_fare_portfolios.us" :label="$t('trade.trade.5um2bq7fi280')">
                                <div>
                                    <a-input v-model="form.data.cn_fare_portfolios.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_portfolios.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_portfolios.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9ebe80')}}】</span>
                                </div>
                            </a-form-item>
                            <a-form-item field="cn_fare_dividend_year.us" :label="$t('trade.trade.5um2bq7fiaw0')">
                                <div>
                                    <a-input v-model="form.data.cn_fare_dividend_year.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_dividend_year.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_dividend_year.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <p :style="{ 'margin-top': '10px' }">{{$t('trade.trade.5um2gb9edio0')}}</p>
                                </div>
                            </a-form-item>
                            <a-form-item field="cn_fare_dividend_month.us" :label="$t('trade.trade.5um2bq7fiaw0')">
                                <div>
                                    <a-input v-model="form.data.cn_fare_dividend_month.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_dividend_month.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_dividend_month.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <p :style="{ 'margin-top': '10px' }">{{$t('trade.trade.5um2gb9edrs0')}}</p>
                                </div>
                            </a-form-item>
                            <a-form-item field="cn_fare_commission.us" :label="$t('trade.trade.5um2bq7fdf40')">
                                <div>
                                    <a-input v-model="form.data.cn_fare_commission.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_commission.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_commission.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                </div>
                            </a-form-item>
                            <a-form-item field="cn_fare_certification.us" :label="$t('trade.trade.5um2bq7fij80')">
                                <div>
                                    <a-input v-model="form.data.cn_fare_certification.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_certification.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_certification.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9ee1g0')}}】</span>
                                </div>
                            </a-form-item>
                            <a-form-item field="cn_fare_handling.us" :label="$t('trade.trade.5um2bq7firo0')">
                                <div>
                                    <a-input v-model="form.data.cn_fare_handling.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_handling.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_handling.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9eedg0')}}】</span>
                                </div>
                            </a-form-item>
                            <a-form-item field="cn_fare_stamp.us" :label="$t('trade.trade.5um2bq7ff640')">
                                <div>
                                    <a-input v-model="form.data.cn_fare_stamp.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_stamp.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_stamp.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9eeko0')}}】</span>
                                </div>
                            </a-form-item>
                            <a-form-item field="cn_fare_transfer.us" :label="$t('trade.trade.5um2bq7fiwc0')">
                                <div>
                                    <a-input v-model="form.data.cn_fare_transfer.us" :style="{ width: local.lang=='en'?'250px':'200px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fb3w0')}}
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_transfer.max"
                                        :style="{ width: local.lang=='en'?'250px':'200px', 'margin': '0 15px' }" allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fbps0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <a-input v-model="form.data.cn_fare_transfer.min" :style="{ width: local.lang=='en'?'250px':'200px' }"
                                        allow-clear>
                                        <template #prefix>
                                            {{$t('trade.trade.5um2bq7fcdc0')}}
                                        </template>
                                        <template #suffix>
                                            CNY
                                        </template>
                                    </a-input>
                                    <span :style="{ 'margin-left': '10px' }">【{{$t('trade.trade.5um2gb9eeqs0')}}】</span>
                                </div>
                            </a-form-item>
                            <p style="margin-bottom: 10px">1、{{$t('trade.trade.5um2fzzgsek0')}}</p>
                            <p style="margin-bottom: 10px">2、{{$t('trade.trade.5um2fzzgshk0')}}</p>
                            <p style="margin-bottom: 10px">3、{{$t('trade.trade.5um2fzzgsko0')}}</p>
                            <p style="margin-bottom: 10px">4、{{$t('trade.trade.5um2fzzgsoo0')}}</p>
                            <a-form-item>
                                <div v-if="$permission(['configTradeUpdate'])" style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('trade.trade.5um2bq7ffl40')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('trade.trade.5um2bq7fftc0')}}
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
// import { useEnums } from '@/hooks/enums'
const local = useLocal()
const active = ref('license_number0')
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        hk_fare_finance: {
            min: '',
            max: '',
            us: '',
        },
        hk_fare_system: {
            us: '',
        },
        hk_fare_platform: {
            us: '',
        },
        hk_fare_commission: {
            min: '',
            max: '',
            us: '',
        },
        hk_fare_transaction: {
            min: '',
            max: '',
            us: '',
        },
        hk_fare_settlement: {
            min: '',
            max: '',
            us: '',
        },
        hk_fare_levy: {
            min: '',
            max: '',
            us: '',
        },
        hk_fare_stamp: {
            min: '',
            max: '',
            us: '',
        },

        us_fare_finance: {
            min: '',
            max: '',
            us: '',
        },
        us_fare_platform: {
            us: '',
            min: '',
            max: '',
        },
        us_fare_commission: {
            min: '',
            max: '',
            us: '',
        },
        us_fare_transaction: {
            min: '',
            max: '',
            us: '',
        },
        us_fare_csrc: {
            min: '',
            max: '',
            us: '',
        },
        us_fare_active: {
            min: '',
            max: '',
            us: '',
        },
        cn_fare_platform: {
            us: '',
        },
        cn_fare_finance: {
            min: '',
            max: '',
            us: '',
        },
        cn_fare_register: {
            min: '',
            max: '',
            us: '',
        },
        cn_fare_portfolios: {
            min: '',
            max: '',
            us: '',
        },
        cn_fare_dividend_year: {
            min: '',
            max: '',
            us: '',
        },
        cn_fare_dividend_month: {
            min: '',
            max: '',
            us: '',
        },
        cn_fare_commission: {
            min: '',
            max: '',
            us: '',
        },
        cn_fare_certification: {
            min: '',
            max: '',
            us: '',
        },
        cn_fare_handling: {
            min: '',
            max: '',
            us: '',
        },
        cn_fare_stamp: {
            min: '',
            max: '',
            us: '',
        },
        cn_fare_transfer: {
            min: '',
            max: '',
            us: '',
        },
    },
    rules: {
        // 'app_name.zh-CN': [{ required: true, message: '请输入应用简体名称' }],

    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return
    let param = { ...form.data }
    const { code, msg } = await apiAdmin.configUpdate({
        group: 'trade',
        data: param
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()


}
const reset = () => {
    getData()
    formRef.value.resetFields()
    // form.data = cloneDeep(form.detail)
}
const getData = async () => {
    form.loading = true
    const { code, data } = await apiAdmin.configList({
        group: 'trade'
    })
    form.loading = false
    if (code != 1) return;
    for (let key in form.data) {
        form.data[key] = data[key]
    }
    // form.data = data

    console.log(data);

}

getData()
</script>
<style scoped lang="less"> .appLogo {
     :deep(.arco-upload-list-picture) {
         width: 200px;
     }
 }

 .downloadBackground {
     :deep(.arco-upload-list-picture) {
         height: 120px;
     }
 }
</style>