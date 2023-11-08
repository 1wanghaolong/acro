<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane style="width:600px;margin: auto;height: 100%;" key="1" :title="$t('margin.margin.5umzcu88blo0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            @submit="submit">
                            <a-row :gutter="16">
                                <!-- <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('margin.margin.5umzcu88c8c0')">
                                    <a-checkbox disabled v-model="form.status">{{$t('margin.margin.5umzcu88cg80')}}</a-checkbox>
                                </a-form-item>
                            </a-col> -->
                                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                    <a-form-item field="HKD.min" :label="$t('margin.margin.5umzcu88cog0')">
                                        <a-input-number hide-button style="width: 100%;" v-model="form.data.HKD.min"
                                            :placeholder="$t('margin.margin.5umzcu88cvo0')">
                                            <template #append>HKD</template>
                                        </a-input-number>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                    <a-form-item field="HKD.increment" :label="$t('margin.margin.5umzcu88d0w0')">
                                        <a-input-number hide-button style="width: 100%;" v-model="form.data.HKD.increment"
                                            :placeholder="$t('margin.margin.5umzcu88cvo0')">
                                            <template #append>HKD</template>
                                        </a-input-number>
                                    </a-form-item>
                                </a-col>
                                <!-- <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('margin.margin.5umzcu88d5s0')">
                                    <a-checkbox disabled @change="changeBtn" v-model="form.status">{{$t('margin.margin.5umzcu88cg80')}}</a-checkbox>
                                </a-form-item>
                            </a-col> -->
                                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                    <a-form-item field="USD.min" :label="$t('margin.margin.5umzcu88cog0')">
                                        <a-input-number hide-button style="width: 100%;" v-model="form.data.USD.min"
                                            :placeholder="$t('margin.margin.5umzcu88cvo0')">
                                            <template #append>USD</template>
                                        </a-input-number>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                    <a-form-item field="USD.increment" :label="$t('margin.margin.5umzcu88d0w0')">
                                        <a-input-number hide-button style="width: 100%;" v-model="form.data.USD.increment"
                                            :placeholder="$t('margin.margin.5umzcu88cvo0')">
                                            <template #append>USD</template>
                                        </a-input-number>
                                    </a-form-item>
                                </a-col>
                                <!-- <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('margin.margin.5umzcu88das0')">
                                    <a-checkbox disabled v-model="form.status">{{$t('margin.margin.5umzcu88cg80')}}</a-checkbox>
                                </a-form-item>
                            </a-col> -->
                                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                    <a-form-item field="CNY.min" :label="$t('margin.margin.5umzcu88cog0')">
                                        <a-input-number hide-button style="width: 100%;" v-model="form.data.CNY.min"
                                            :placeholder="$t('margin.margin.5umzcu88cvo0')">
                                            <template #append>CNY</template>
                                        </a-input-number>
                                    </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="12" :md="8" :xl="12">
                                    <a-form-item field="CNY.increment" :label="$t('margin.margin.5umzcu88d0w0')">
                                        <a-input-number hide-button style="width: 100%;" v-model="form.data.CNY.increment"
                                            :placeholder="$t('margin.margin.5umzcu88cvo0')">
                                            <template #append>CNY</template>
                                        </a-input-number>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-form-item>
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="resetField">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('margin.margin.5umzcu88dg00')}}</a-button>
                                        <a-button v-permission="['configMarginUpdate']" type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('margin.margin.5umzcu88dl00')}}
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
const { t } = useI18n();
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        CNY: {
            min: 0,
            increment: 0,
        },
        HKD: {
            min: 0,
            increment: 0,
        },
        USD: {
            min: 0,
            increment: 0,
        },
    },
    status: true,
    rules: {
        'HKD.min': [{ required: true, message: t('margin.margin.5umzcu88dps0') }],
        'HKD.increment': [{ required: true, message: t('margin.margin.5umzcu88duw0') }],
        'CNY.min': [{ required: true, message: t('margin.margin.5umzcu88dps0') }],
        'CNY.increment': [{ required: true, message: t('margin.margin.5umzcu88duw0') }],
        'USD.min': [{ required: true, message: t('margin.margin.5umzcu88dps0') }],
        'USD.increment': [{ required: true, message: t('margin.margin.5umzcu88duw0') }],

    }
})
const getData = async () => {
    form.loading = true
    const { code, data } = await apiAdmin.configList({
        group: 'trs'
    })
    form.loading = false
    if (code != 1) return;
    Object.keys(data.account_apply_cash).forEach((item: any) => {
        form.data[item].min = Number(data.account_apply_cash[item].min)
        form.data[item].increment = Number(data.account_apply_cash[item].increment)
    })
}
getData()
const formRef = ref()
const resetField = () => {
    getData()
    formRef.value.resetFields()
}

const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiAdmin.configUpdate({
        group: 'trs',
        data: {
            account_apply_cash: { ...form.data }

        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}

</script>