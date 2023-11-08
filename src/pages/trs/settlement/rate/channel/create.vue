<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item allow-search field="counter_channel_id" :label="$t('channel.create.5umwz1308bc0')">
                    <a-select allow-clear v-model="form.data.counter_channel_id" :placeholder="$t('channel.create.5umwz1308vk0')">
                        <a-option v-for="item in (form.counterChannelList as any)" :value="item.id">{{
                            item.name }}</a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="report_date" :label="$t('channel.create.5umwz1308z80')">
                    <a-date-picker style="width: 100%;" v-model="form.data.report_date" />
                </a-form-item>
                <a-form-item field="exchange_rate_list[0].exchange_rate" label="HKD->CNY">
                    <a-input-number v-model="form.data.exchange_rate_list[0].exchange_rate" :placeholder="$t('channel.create.5umwz13091s0')" />
                </a-form-item>
                <a-form-item field="exchange_rate_list[1].exchange_rate" label="CNY->HKD">
                    <a-input-number v-model="form.data.exchange_rate_list[1].exchange_rate" :placeholder="$t('channel.create.5umwz13091s0')" />
                </a-form-item>
                <a-form-item field="exchange_rate_list[2].exchange_rate" label="USD->CNY">
                    <a-input-number v-model="form.data.exchange_rate_list[2].exchange_rate" :placeholder="$t('channel.create.5umwz13091s0')" />
                </a-form-item>
                <a-form-item field="exchange_rate_list[3].exchange_rate" label="CNY->USD">
                    <a-input-number v-model="form.data.exchange_rate_list[3].exchange_rate" :placeholder="$t('channel.create.5umwz13091s0')" />
                </a-form-item>
                <a-form-item field="exchange_rate_list[4].exchange_rate" label="USD->HKD">
                    <a-input-number v-model="form.data.exchange_rate_list[4].exchange_rate" :placeholder="$t('channel.create.5umwz13091s0')" />
                </a-form-item>
                <a-form-item field="exchange_rate_list[5].exchange_rate" label="HKD->USD">
                    <a-input-number v-model="form.data.exchange_rate_list[5].exchange_rate" :placeholder="$t('channel.create.5umwz13091s0')" />
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="formRef?.resetFields()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('channel.create.5umwz1309440')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('channel.create.5umwz13096k0')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n();
const form = reactive({
    show: false,
    loading: false,
    counterChannelList: [],
    data: {
        counter_channel_id: '',
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
        counter_channel_id: [{ required: true, message: t('channel.create.5umwz1309900') }],
        report_date: [{ required: true, message: t('channel.create.5umwz1309b80') }],
        'exchange_rate_list[0].exchange_rate': [{ required: true, message: t('channel.create.5umwz13091s0') }, {type: 'number', message: t('channel.create.5umwz1309dc0') }],
        'exchange_rate_list[1].exchange_rate': [{ required: true, message: t('channel.create.5umwz13091s0') }, {type: 'number', message: t('channel.create.5umwz1309dc0') }],
        'exchange_rate_list[2].exchange_rate': [{ required: true, message: t('channel.create.5umwz13091s0') }, {type: 'number', message: t('channel.create.5umwz1309dc0') }],
        'exchange_rate_list[3].exchange_rate': [{ required: true, message: t('channel.create.5umwz13091s0') }, {type: 'number', message: t('channel.create.5umwz1309dc0') }],
        'exchange_rate_list[4].exchange_rate': [{ required: true, message: t('channel.create.5umwz13091s0') }, {type: 'number', message: t('channel.create.5umwz1309dc0') }],
        'exchange_rate_list[5].exchange_rate': [{ required: true, message: t('channel.create.5umwz13091s0') }, {type: 'number', message: t('channel.create.5umwz1309dc0') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiTrs.counterChannelExchangeRateCreate({
        data: {
            ...form.data
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const getCounterChannelList = async () => {
    const { code, data } = await apiTrs.counterChannelList()
    if (code != 1) return;
    form.counterChannelList = data?.list
}

{
    getCounterChannelList()
}
</script>