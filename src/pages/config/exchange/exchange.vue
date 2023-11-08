<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div style="height: 100%;display: flex;align-items: center;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                    <a-form-item field="exchange_hkd_to_usd.us">
                        <div>
                            <span :style="{ 'margin-right': '15px' }">HKD => USD</span>
                            <a-input v-model="form.data.exchange_hkd_to_usd.us" :style="{ width: '200px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahvro0')}}
                                </template>
                            </a-input>
                            <a-input v-model="form.data.exchange_hkd_to_usd.max"
                                :style="{ width: '200px', 'margin': '0 15px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahwvc0')}}
                                </template>
                                <template #suffix>
                                    USD
                                </template>
                            </a-input>
                            <a-input v-model="form.data.exchange_hkd_to_usd.min" :style="{ width: '200px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahwzc0')}}
                                </template>
                                <template #suffix>
                                    USD
                                </template>
                            </a-input>
                        </div>
                    </a-form-item>
                    <a-form-item field="exchange_hkd_to_cny.us">
                        <div>
                            <span :style="{ 'margin-right': '15px' }">HKD => CNY</span>
                            <a-input v-model="form.data.exchange_hkd_to_cny.us" :style="{ width: '200px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahvro0')}}
                                </template>
                            </a-input>
                            <a-input v-model="form.data.exchange_hkd_to_cny.max"
                                :style="{ width: '200px', 'margin': '0 15px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahwvc0')}}
                                </template>
                                <template #suffix>
                                    CNY
                                </template>
                            </a-input>
                            <a-input v-model="form.data.exchange_hkd_to_cny.min" :style="{ width: '200px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahwzc0')}}
                                </template>
                                <template #suffix>
                                    CNY
                                </template>
                            </a-input>
                        </div>
                    </a-form-item>
                    <a-form-item field="exchange_usd_to_hkd.us">
                        <div>
                            <span :style="{ 'margin-right': '15px' }">USD => HKD</span>
                            <a-input v-model="form.data.exchange_usd_to_hkd.us" :style="{ width: '200px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahvro0')}}
                                </template>
                            </a-input>
                            <a-input v-model="form.data.exchange_usd_to_hkd.max"
                                :style="{ width: '200px', 'margin': '0 15px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahwvc0')}}
                                </template>
                                <template #suffix>
                                    HKD
                                </template>
                            </a-input>
                            <a-input v-model="form.data.exchange_usd_to_hkd.min" :style="{ width: '200px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahwzc0')}}
                                </template>
                                <template #suffix>
                                    HKD
                                </template>
                            </a-input>
                        </div>
                    </a-form-item>
                    <a-form-item field="exchange_usd_to_cny.us">
                        <div>
                            <span :style="{ 'margin-right': '15px' }">USD => CNY</span>
                            <a-input v-model="form.data.exchange_usd_to_cny.us" :style="{ width: '200px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahvro0')}}
                                </template>
                            </a-input>
                            <a-input v-model="form.data.exchange_usd_to_cny.max"
                                :style="{ width: '200px', 'margin': '0 15px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahwvc0')}}
                                </template>
                                <template #suffix>
                                    CNY
                                </template>
                            </a-input>
                            <a-input v-model="form.data.exchange_usd_to_cny.min" :style="{ width: '200px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahwzc0')}}
                                </template>
                                <template #suffix>
                                    CNY
                                </template>
                            </a-input>
                        </div>
                    </a-form-item>
                    <a-form-item field="exchange_cny_to_hkd.us">
                        <div>
                            <span :style="{ 'margin-right': '15px' }">CNY => HKD</span>
                            <a-input v-model="form.data.exchange_cny_to_hkd.us" :style="{ width: '200px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahvro0')}}
                                </template>
                            </a-input>
                            <a-input v-model="form.data.exchange_cny_to_hkd.max"
                                :style="{ width: '200px', 'margin': '0 15px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahwvc0')}}
                                </template>
                                <template #suffix>
                                    HKD
                                </template>
                            </a-input>
                            <a-input v-model="form.data.exchange_cny_to_hkd.min" :style="{ width: '200px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahwzc0')}}
                                </template>
                                <template #suffix>
                                    HKD
                                </template>
                            </a-input>
                        </div>
                    </a-form-item>
                    <a-form-item field="exchange_cny_to_usd.us">
                        <div>
                            <span :style="{ 'margin-right': '15px' }">CNY => USD</span>
                            <a-input v-model="form.data.exchange_cny_to_usd.us" :style="{ width: '200px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahvro0')}}
                                </template>
                            </a-input>
                            <a-input v-model="form.data.exchange_cny_to_usd.max"
                                :style="{ width: '200px', 'margin': '0 15px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahwvc0')}}
                                </template>
                                <template #suffix>
                                    USD
                                </template>
                            </a-input>
                            <a-input v-model="form.data.exchange_cny_to_usd.min" :style="{ width: '200px' }" allow-clear>
                                <template #prefix>
                                    {{$t('exchange.exchange.5um2x6ahwzc0')}}
                                </template>
                                <template #suffix>
                                    USD
                                </template>
                            </a-input>
                        </div>
                    </a-form-item>
                    <a-form-item>
                        <div v-if="$permission(['configExchangeUpdate'])" style="display: flex;justify-content: flex-end;width: 100%;">
                            <a-space :size="18">
                                <a-button @click="reset">
                                    <template #icon>
                                        <icon-refresh />
                                    </template>
                                    {{$t('exchange.exchange.5um2x6ahx240')}}
                                </a-button>
                                <a-button type="primary" html-type="submit">
                                    <template #icon>
                                        <icon-save />
                                    </template>
                                    {{$t('exchange.exchange.5um2x6ahx4c0')}}
                                </a-button>
                            </a-space>
                        </div>
                    </a-form-item>
                </a-form>
            </div>
        </a-card>
    </div>
</template>
<script lang="ts" setup>
// import { useEnums } from '@/hooks/enums'
// const local = useLocal()
const active = ref('license_number0')
console.log(active);

const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        exchange_hkd_to_usd: {
            max: '',
            min: '',
            us: '',
        },
        exchange_hkd_to_cny: {
            max: '',
            min: '',
            us: '',
        },
        exchange_cny_to_hkd: {
            max: '',
            min: '',
            us: '',
        },
        exchange_cny_to_usd: {
            max: '',
            min: '',
            us: '',
        },
        exchange_usd_to_cny: {
            max: '',
            min: '',
            us: '',
        },
        exchange_usd_to_hkd: {
            max: '',
            min: '',
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
        group: 'exchange',
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
        group: 'exchange'
    })
    form.loading = false
    if (code != 1) return;
    // for (let key in form.data) {
    //     form.data[key] = data[key]
    // }
    form.data = data

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