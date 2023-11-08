<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="report_date" :label="$t('platform.update.5umx16tuqhs0')">
                    <a-date-picker style="width: 100%;" v-model="form.data.report_date" />
                </a-form-item>
                <a-form-item field="exchange_rate_list[0].exchange_rate" label="HKD->CNY">
                    <a-input-number v-model="form.data.exchange_rate_list[0].exchange_rate" :placeholder="$t('platform.update.5umx16tuqx80')" />
                </a-form-item>
                <a-form-item field="exchange_rate_list[1].exchange_rate" label="CNY->HKD">
                    <a-input-number v-model="form.data.exchange_rate_list[1].exchange_rate" :placeholder="$t('platform.update.5umx16tuqx80')" />
                </a-form-item>
                <a-form-item field="exchange_rate_list[2].exchange_rate" label="USD->CNY">
                    <a-input-number v-model="form.data.exchange_rate_list[2].exchange_rate" :placeholder="$t('platform.update.5umx16tuqx80')" />
                </a-form-item>
                <a-form-item field="exchange_rate_list[3].exchange_rate" label="CNY->USD">
                    <a-input-number v-model="form.data.exchange_rate_list[3].exchange_rate" :placeholder="$t('platform.update.5umx16tuqx80')" />
                </a-form-item>
                <a-form-item field="exchange_rate_list[4].exchange_rate" label="USD->HKD">
                    <a-input-number v-model="form.data.exchange_rate_list[4].exchange_rate" :placeholder="$t('platform.update.5umx16tuqx80')" />
                </a-form-item>
                <a-form-item field="exchange_rate_list[5].exchange_rate" label="HKD->USD">
                    <a-input-number v-model="form.data.exchange_rate_list[5].exchange_rate" :placeholder="$t('platform.update.5umx16tuqx80')" />
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="getData()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('platform.update.5umx16tur0w0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('platform.update.5umx16tur3k0')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n();
const form = reactive({
    show: false,
    loading: false,
    data: {
        report_date: '',
        exchange_rate_list: [
            {
                from_currency: "HKD",
                to_currency: "CNY",
                exchange_rate: 0,
            },
            {
                from_currency: "CNY",
                to_currency: "HKD",
                exchange_rate: 0,
            },
            {
                from_currency: "USD",
                to_currency: "CNY",
                exchange_rate: 0,
            },
            {
                from_currency: "CNY",
                to_currency: "USD",
                exchange_rate: 0,
            },
            {
                from_currency: "USD",
                to_currency: "HKD",
                exchange_rate: 0,
            },
            {
                from_currency: "HKD",
                to_currency: "USD",
                exchange_rate: 0,
            }
        ]
    },
    rules: {
        counter_channel_id: [{ required: true, message: t('platform.update.5umx16tur5s0') }],
        report_date: [{ required: true, message: t('platform.update.5umx16turbg0') }],
        'exchange_rate_list[0].exchange_rate': [{ required: true, message: t('platform.update.5umx16tuqx80') }, {type: 'number', message: t('platform.update.5umx16turdw0') }],
        'exchange_rate_list[1].exchange_rate': [{ required: true, message: t('platform.update.5umx16tuqx80') }, {type: 'number', message: t('platform.update.5umx16turdw0') }],
        'exchange_rate_list[2].exchange_rate': [{ required: true, message: t('platform.update.5umx16tuqx80') }, {type: 'number', message: t('platform.update.5umx16turdw0') }],
        'exchange_rate_list[3].exchange_rate': [{ required: true, message: t('platform.update.5umx16tuqx80') }, {type: 'number', message: t('platform.update.5umx16turdw0') }],
        'exchange_rate_list[4].exchange_rate': [{ required: true, message: t('platform.update.5umx16tuqx80') }, {type: 'number', message: t('platform.update.5umx16turdw0') }],
        'exchange_rate_list[5].exchange_rate': [{ required: true, message: t('platform.update.5umx16tuqx80') }, {type: 'number', message: t('platform.update.5umx16turdw0') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiOtc.exchangeRateUpdate({
        counter_channel_id:route.params?.id,
        report_date:route.params?.date,
        data: {
            counter_channel_id:route.params?.id,
            report_date:form.data.report_date,
            exchange_rate_list:form.data.exchange_rate_list,
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const getData = async () => {
    const { code, data } = await apiOtc.exchangeRateInfo({
        counter_channel_id:route.params?.id,
        report_date:route.params?.date,
    })
    if (code != 1) return;
    form.data.report_date = dayjs.unix(data?.report_time).format('YYYY-MM-DD')
    data?.exchange_rate_list?.forEach((item:any)=>{
        let index = form.data.exchange_rate_list?.findIndex(i=>i.from_currency == item.from_currency && i.to_currency == item.to_currency)
        index != -1 && (form.data.exchange_rate_list[index].exchange_rate = Number(item.exchange_rate))
    })
}

{
    getData()
}
</script>