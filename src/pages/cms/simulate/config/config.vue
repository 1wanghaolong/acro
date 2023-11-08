<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard" style="padding-top:20px">
            <a-form ref="formRef" :model="form.data" :rules="form.rules" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="HKD.min" :label="$t('config.config.5ukfuf2z3fg0')">
                    <a-input-number v-model="form.data.HKD.min" hide-button :style="{ width: '290px' }" :placeholder="$t('config.config.5ukfuf2z4e80')" allow-clear>
                        <template #prefix>
                           {{ $t('config.config.5ukfuf2z4js0') }}
                        </template>
                        <template #suffix>
                            {{ 'HKD' }}
                        </template>
                    </a-input-number>
                    <a-input-number v-model="form.data.HKD.max"  hide-button :style="{ width: '290px','margin-left':'20px' }" :placeholder="$t('config.config.5ukfuf2z4e80')" allow-clear>
                        <template #prefix>
                           {{ $t('config.config.5ukfuf2z4qo0') }}
                        </template>
                        <template #suffix>
                            {{ 'HKD' }}
                        </template>
                    </a-input-number>
                </a-form-item>
                <a-form-item field="USD.min" :label="$t('config.config.5ukfuf2z4u00')">
                    <a-input-number v-model="form.data.USD.min" hide-button :style="{ width: '290px' }" :placeholder="$t('config.config.5ukfuf2z4e80')" allow-clear>
                        <template #prefix>
                           {{ $t('config.config.5ukfuf2z4js0') }}
                        </template>
                        <template #suffix>
                            {{ 'USD' }}
                        </template>
                    </a-input-number>
                    <a-input-number v-model="form.data.USD.max"  hide-button :style="{ width: '290px','margin-left':'20px' }" :placeholder="$t('config.config.5ukfuf2z4e80')" allow-clear>
                        <template #prefix>
                           {{ $t('config.config.5ukfuf2z4qo0') }}
                        </template>
                        <template #suffix>
                            {{ 'USD' }}
                        </template>
                    </a-input-number>
                </a-form-item>
                <a-form-item field="CNY.min" :label="$t('config.config.5ukfuf2z4yw0')">
                    <a-input-number v-model="form.data.CNY.min" hide-button :style="{ width: '290px' }" :placeholder="$t('config.config.5ukfuf2z4e80')" allow-clear>
                        <template #prefix>
                           {{ $t('config.config.5ukfuf2z4js0') }}
                        </template>
                        <template #suffix>
                            {{ 'CNY' }}
                        </template>
                    </a-input-number>
                    <a-input-number v-model="form.data.CNY.max"  hide-button :style="{ width: '290px','margin-left':'20px' }" :placeholder="$t('config.config.5ukfuf2z4e80')" allow-clear>
                        <template #prefix>
                           {{ $t('config.config.5ukfuf2z4qo0') }}
                        </template>
                        <template #suffix>
                            {{ 'CNY' }}
                        </template>
                    </a-input-number>
                </a-form-item>
                <a-form-item v-if="$permission(['cmsSimulateConfigUpdate'])">
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="getData()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('config.config.5ukfuf2z51s0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('config.config.5ukfuf2zjxc0')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-form>

        </a-card>
    </div>
</template>

<script lang="ts" setup>
// const local = useLocal()
// import { useEnums } from '@/hooks/enums'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const formRef = ref()
const form: any = reactive({
    loading: false,
    detail: {},
    data: {
        HKD:{
            min:'',
            max:''
        },
        USD:{
            min:'',
            max:''
        },
        CNY:{
            min:'',
            max:''
        },
    },
    rules: {
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    let bool = true
    for (let key in form.data) {
        if (typeof form.data[key].min === 'number'&&typeof form.data[key].max === 'number'){
            if(form.data[key].max<=form.data[key].min){
                bool =false
            }
        }
    }
    if(!bool) return Message.info(t('config.config.5ukfuf2zkn00'))
    form.loading = true
    const { code, msg } = await apiAdmin.configUpdate({
        group: 'simulate',
        data: {
            simulate_charge:form.data
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    form.loading = true
    const { code, data } = await apiAdmin.configList({
        group: 'simulate'
    })
    form.loading = false
    if (code != 1) return;
    form.detail = data
    for (let key in form.data) {
        form.data[key].min = data.simulate_charge[key].min?Number(data.simulate_charge[key].min):data.simulate_charge[key].min===0?0:''
        form.data[key].max = data.simulate_charge[key].max?Number(data.simulate_charge[key].max):data.simulate_charge[key].max===0?0:''
    }
}
{
    getData()
}
</script>
<style lang="less" scoped>
.steps {
    width: 800px;
    margin: 20px auto 0;
}
</style>