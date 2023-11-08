<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-tabs default-active-key="1" justify>
                <a-tab-pane :style="local.lang == 'en' && !viteItemName ?'width:950px':local.lang == 'en' && viteItemName == 'hx' ? 'width:1320px':'width:600px'" style=";margin: auto;height: 100%;" key="1" :title="$t('withdraw.withdraw.5umzdqhadao0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="form.rules" layout="vertical" @submit="submit">
                            <a-tag style="margin-bottom: 20px;" v-if='viteItemName == "hx"'>{{$t('withdraw.withdraw.5umzdqhadp80')}}</a-tag>
                            <a-tag style="margin-bottom: 20px;" v-else>{{$t('withdraw.withdraw.5umzdqhads80')}} = {{$t('withdraw.withdraw.5umzdqhadu80')}} - {{$t('withdraw.withdraw.5umzdqhadw00')}} - {{$t('withdraw.withdraw.5umzdqhadxs0')}} * {{$t('withdraw.withdraw.5umzdqhadzk0')}}</a-tag>
                            <a-form-item field="withdraw_rate" :label="$t('withdraw.withdraw.5umzdqhadzk0')">
                                <div style="width: 100%;">
                                    <div v-if="!$permission(['configWithDrawUpdate'])">
                                        {{ form.data.withdraw_rate }}
                                    </div>
                                    <a-input-number v-else hide-button style="width: 100%;" v-model="form.data.withdraw_rate"
                                        :placeholder="$t('withdraw.withdraw.5ukmqklvseg0')">
                                    </a-input-number>
                                </div>
                            </a-form-item>
                        <a-form-item v-permission="['configWithDrawUpdate']">
                            <div style="display: flex;justify-content: flex-end;width: 100%;">
                                <a-space :size="18">
                                    <a-button @click="getData()">
                                        <template #icon>
                                            <icon-refresh />
                                        </template>
                                        {{$t('withdraw.withdraw.5ukmqklvt9c0')}}
                                    </a-button>
                                    <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                        <template #icon>
                                            <icon-save />
                                        </template>
                                        {{$t('withdraw.withdraw.5umzdqhae1g0')}}
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
const formRef = ref()
const { t } = useI18n();
const local = useLocal()
const viteItemName = import.meta.env.VITE_ITEM_NAME || ""
const form:any = reactive({
    loading: false,
    detail:{},
    data: {
        withdraw_rate: 0,
    },
    rules:{
        withdraw_rate: [{ required: true, message: t('withdraw.withdraw.5umzdqhae3c0') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiAdmin.configUpdate({
        group:'trs',
        data: {
            ...form.detail,
            ...form.data
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
        group:'trs'
    })
    form.loading = false
    if (code != 1) return;
    form.detail = data
    form.data.withdraw_rate = Number(data.withdraw_rate)
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