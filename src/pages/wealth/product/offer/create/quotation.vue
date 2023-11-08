<template>
    <a-card style="margin-top: 20px;" :loading="loading">
        <template #title>
            <div style="display: flex;justify-content: space-between;">
                <a-space :size="18">
                    {{$t('offer.parameters.5umx1gweiss0')}}: {{ form.data.product_name }}
                </a-space>
            </div>
        </template>
        <div style="width:800px;margin:0 auto">
            <p style="font-weight: bold;padding-bottom: 20px;">{{$t('offer.quotation.5umx8a0wyxc0')}}</p>
            <div>
                <a-form-item v-for="item in form.data.framework_params">
                    <template #label>
                        <div style="width: 100px;text-align: right;">
                            <strong v-if="item.config.required" class="arco-form-item-label-required-symbol"><svg
                                    fill="currentColor" viewBox="0 0 1024 1024" width="1em" height="1em">
                                    <path
                                        d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                                    </path>
                                </svg>
                            </strong>
                            {{ item.params_name[local.lang] }}
                        </div>
                    </template>
                    <a-select v-model="item.config.value"
                        v-if="(item.params_type == 'gear_percent' && item.config.step) || (item.params_type == 'gear_number' && item.config.step)">
                        <a-option :value="item3" v-for="item3 in item.can_select">{{ item3 }}{{ item.params_type ==
                            'gear_number' ? '' : '%' }}</a-option>
                    </a-select>
                    <div v-else-if="item.params_type == 'checkbox'" style="width: 100%;">
                        <a-select v-model="item.config.value" multiple :limit="item.config.max">
                            <a-option :value="item2.key" v-for="item2 in item.config.options">{{ item2.text[local.lang]
                            }}</a-option>
                        </a-select>
                        <div style="padding-top: 10px;">
                            <span>{{$t('offer.parameters.5umx2vd0oy80')}}:{{ item.config.max }}个</span>
                        </div>
                    </div>
                    <div v-else-if="item.params_type == 'radio'" style="width: 100%;">
                        <a-select v-model="item.config.value">
                            <a-option :value="item2.key" v-for="item2 in item.config.options">{{ item2.text[local.lang]
                            }}</a-option>
                        </a-select>
                    </div>
                    <div v-else style="width: 100%;">
                        <a-input @change="inputChange($event, item)" v-model="item.config.value"
                            :placeholder="`${$t('offer.parameters.5umx2vd0q880')}${item.params_name[local.lang]}`">
                            <template #prepend>
                                <div v-if="item.params_type == 'percent'">%</div>
                            </template>
                        </a-input>
                        <div style="padding-top: 10px;">
                            <span>{{$t('offer.parameters.5umx2vd0pw80')}}：{{ item.config.max }}{{ item.params_type == 'percent' ? '%' : '' }}</span>
                            <span style="padding-left: 10px;">{{$t('offer.parameters.5umx2vd0q340')}}：{{ item.config.min }}{{ item.params_type ==
                                'percent' ? '%' : '' }}</span>
                        </div>
                    </div>
                </a-form-item>
            </div>
        </div>
        <div style="width:800px;margin:0 auto">
            <p style="font-weight: bold;padding-bottom: 20px;">{{$t('offer.quotation.5umx8a0x4eo0')}}</p>
            <div>
                <a-form-item v-for="item in form.data.quote_params">
                    <template #label>
                        <div style="width: 100px;text-align: right;">
                            <strong v-if="item.config.required" class="arco-form-item-label-required-symbol"><svg
                                    fill="currentColor" viewBox="0 0 1024 1024" width="1em" height="1em">
                                    <path
                                        d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                                    </path>
                                </svg>
                            </strong>
                            {{ item.params_name[local.lang] }}
                        </div>
                    </template>
                    <a-select v-model="item.config.value"
                        v-if="(item.params_type == 'gear_percent' && item.config.step) || (item.params_type == 'gear_number' && item.config.step)">
                        <a-option :value="item3" v-for="item3 in item.can_select">{{ item3 + '%' }}</a-option>
                    </a-select>
                    <div v-else-if="item.params_type == 'checkbox'" style="width: 100%;">
                        <a-select v-model="item.config.value" multiple :limit="item.config.max">
                            <a-option :value="item2.key" v-for="item2 in item.config.options">{{ item2.text[local.lang]
                            }}</a-option>
                        </a-select>
                        <div style="padding-top: 10px;">
                            <span>{{$t('offer.parameters.5umx2vd0oy80')}}:{{ item.config.max }}个</span>
                        </div>
                    </div>
                    <div v-else-if="item.params_type == 'radio'" style="width: 100%;">
                        <a-select v-model="item.config.value">
                            <a-option :value="item2.key" v-for="item2 in item.config.options">{{ item2.text[local.lang]
                            }}</a-option>
                        </a-select>
                    </div>
                    <div v-else style="width: 100%;">
                        <a-input @change="inputChange($event, item)" v-model="item.config.value"
                            :placeholder="`${$t('offer.parameters.5umx2vd0q880')}${item.params_name[local.lang]}`">
                            <template #prepend>
                                <div v-if="item.params_type == 'percent'">%</div>
                            </template>
                        </a-input>
                        <div style="padding-top: 10px;">
                            <span>{{$t('offer.parameters.5umx2vd0pw80')}}：{{ item.config.max }}{{ item.params_type == 'percent' ? '%' : '' }}</span>
                            <span style="padding-left: 10px;">{{$t('offer.parameters.5umx2vd0q340')}}：{{ item.config.min }}{{ item.params_type ==
                                'percent' ? '%' : '' }}</span>
                        </div>
                    </div>
                </a-form-item>
            </div>
        </div>
    </a-card>
    <a-form-item style="width: 100%;padding-top: 20px;">
        <div style="display: flex;justify-content: flex-end;width: 100%;">
            <a-space :size="18">
                <a-button @click="step(-1)">
                    {{$t('offer.quotation.5umx8a0x55w0')}}
                </a-button>
                <a-button type="primary" html-type="submit" @click="submit">
                    {{$t('offer.quotation.5umx8a0x5jg0')}}
                </a-button>
            </a-space>
        </div>
    </a-form-item>
</template>
<script lang="ts" setup>
// import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs';
const { t } = useI18n();
const local = useLocal()
const props = defineProps({
    data: Object,
    data2: Object,
    current: Number
})
const emit = defineEmits(['update:current', 'update:data', 'update:data2']);
const loading = ref(false)
const form = ref({
    data: <any>{
        framework_params: [],
        quote_params: []
    },
})
const inputChange = (value: any, list: any) => {
    const chineseRegex = /[\u4e00-\u9fa5]/;
    const zmchineseRegex = /[a-zA-Z]/;
    if (chineseRegex.test(value)) {
        Message.info({ content: t('offer.quotation.5umx8a0x5qk0') })
        list.config.value = ""
        return
    }
    if (zmchineseRegex.test(value)) {
        Message.info({ content: t('offer.quotation.5umx8a0x5w00') })
        list.config.value = ""
        return
    }
    if (Number(value) < 0) {
        Message.info({ content: t('offer.quotation.5umx8a0x6000') })
        list.config.value = ""
        return
    }

    if (((Number(value) < Number(list.config.min)) || (Number(value) > Number(list.config.max)))) {
        Message.info({ content: t('offer.quotation.5umx8a0x66c0') })
        list.config.value = ""
        return
    }
    list.config.value = Number(value)
}
const step = (type: number) => {
    if (type == -1) return emit('update:current', Number(props.current) - 1)
    emit('update:current', Number(props.current) + 1)
}
const submit = async () => {
    let i = 0 //是否有空值
    form.value.data.framework_params.forEach((item: any) => {
        if (!item.config.value && item.config.required && item.config.value != '0') {
            i++;
        }
    })
    form.value.data.quote_params.forEach((item: any) => {
        if (!item.config.value && item.config.required && item.config.value != '0') {
            i++;
        }
    })
    if (i) {
        Message.info({ content: t('offer.quotation.5umx8a0x6dw0') })
        return
    }
    let { options_product_id, currency, period, market, security_type, symbol, nominal_principal, status, start_time, end_time } = form.value.data
    let params_list: any = [], arrList: any = []
    if (form.value.data.quote_params.length || form.value.data.framework_params.length) {
        arrList = form.value.data.quote_params.length
            ? [...form.value.data.quote_params]
            : [...form.value.data.framework_params];

        if (form.value.data.quote_params.length && form.value.data.framework_params.length) {
            arrList = [...form.value.data.framework_params, ...form.value.data.quote_params];
        }
    }
    if (arrList.length) {
        arrList.forEach((item: any) => {
            if (item.params_type == "checkbox") {
                let selected: any = []
                if (item.config.value && item.config.value.length) {
                    item.config.value.forEach((item: any) => {
                        selected.push({
                            key: item
                        })
                    })
                }
                params_list.push({
                    params_id: item.id,
                    content: {
                        selected
                    }
                })
            } else if (item.params_type == "radio") {
                if (item.config.value) {
                    params_list.push({
                        params_id: item.id,
                        content: {
                            selected: [{
                                key: item.config.value
                            }]
                        }
                    })
                }

            } else {
                params_list.push({
                    params_id: item.id,
                    content: {
                        value: !item.config.value ? '0' : item.config.value
                    }
                })
            }
        })
    }
    let parsm: any
    const formattedEndTime = end_time && typeof end_time === 'number' ? dayjs.unix(end_time).format('YYYY-MM-DD HH:mm:ss') : end_time && typeof end_time === 'string' ? end_time : null;

    parsm = {
        options_product_id,
        currency,
        period: '' + period,
        market,
        security_type,
        symbol,
        nominal_principal,
        status,
        params_list
    };
    if (start_time == '0' && end_time != '0') {
        parsm.end_time = formattedEndTime;
    }
    if (start_time != '0' && end_time != '0') {
        parsm.start_time = start_time;
        parsm.end_time = formattedEndTime;
    }
    const { code } = await apiWealth.apiWealthOptionsProductQuoteCreate({
        data: {
            ...parsm
        }
    })
    if (code != 1) return;
    emit('update:current', Number(props.current) + 1)
}
const watchData = watch(() => form.value.data, (data) => {
    emit('update:data', { ...props.data, ...data })
}, {
    deep: true
})
onBeforeUnmount(() => {
    watchData && watchData()
})
onMounted(() => {
    form.value.data = { ...form.value.data, ...props.data }
})
</script>