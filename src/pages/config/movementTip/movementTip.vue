<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-tabs v-model:active-key="key" justify>
                <a-tab-pane v-if="viteName == 'cmsPro'" style="overflow: auto;" key="tip_movement_in" :title="$t('movementTip.movementTip.5um2zwie7po0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="tipMovementIn" :model="form.tipMovementIn" layout="vertical"
                            :rules="(form.rules as any)" :style="{ width: '800px', margin: 'auto' }"
                            @submit="submit('tipMovementIn')">
                            <a-form-item field="tipMovementIn.zh-CN" :label="$t('movementTip.movementTip.5um2zwie8y40')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipMovementIn['zh-CN']" :placeholder="$t('movementTip.movementTip.5um2zwie95g0')" />
                            </a-form-item>
                            <a-form-item field="tipMovementIn.en" :label="$t('movementTip.movementTip.5um2zwie9ac0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipMovementIn['en']" :placeholder="$t('movementTip.movementTip.5um2zwie9e80')" />
                            </a-form-item>
                            <a-form-item field="tipMovementIn.tc" :label="$t('movementTip.movementTip.5um2zwie9lg0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipMovementIn['tc']" :placeholder="$t('movementTip.movementTip.5um2zwie9po0')" />
                            </a-form-item>
                            <a-form-item v-if="$permission(['configMovementTipUpdate'])">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="resetBtn('tipMovementIn')">{{$t('movementTip.movementTip.5um2zwie9tg0')}}</a-button>
                                        <a-button type="primary" html-type="submit">
                                            {{$t('movementTip.movementTip.5um2zwie9ww0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane v-if="viteName == 'cmsPro'" style="overflow: auto;" key="tip_movement_out" :title="$t('movementTip.movementTip.5um2zwiea080')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="tipMovementOut" :model="form.tipMovementOut" layout="vertical"
                            :rules="(form.rules as any)" :style="{ width: '800px', margin: 'auto' }"
                            @submit="submit('tipMovementOut')">
                            <a-form-item field="tipMovementOut.zh-CN" :label="$t('movementTip.movementTip.5um2zwie8y40')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipMovementOut['zh-CN']" :placeholder="$t('movementTip.movementTip.5um2zwie95g0')" />
                            </a-form-item>
                            <a-form-item field="tipMovementOut.en" :label="$t('movementTip.movementTip.5um2zwie9ac0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipMovementOut['en']" :placeholder="$t('movementTip.movementTip.5um2zwie9e80')" />
                            </a-form-item>
                            <a-form-item field="tipMovementOut.tc" :label="$t('movementTip.movementTip.5um2zwie9lg0')">
                                <a-textarea style="flex:1;" :auto-size="{ minRows: 8, maxRows: 8 }"
                                    v-model="form.tipMovementOut['tc']" :placeholder="$t('movementTip.movementTip.5um2zwie9po0')" />
                            </a-form-item>
                            <a-form-item v-if="$permission(['configMovementTipUpdate'])">
                                <div style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="resetBtn('tipMovementOut')">{{$t('movementTip.movementTip.5um2zwie9tg0')}}</a-button>
                                        <a-button type="primary" html-type="submit">
                                            {{$t('movementTip.movementTip.5um2zwie9ww0')}}
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
const key = ref('tip_movement_in')
const viteName = import.meta.env.VITE_NAME
const tipMovementIn = ref()
const tipMovementOut = ref()
const form: any = reactive({
    show: false,
    loading: false,
   
    tipMovementOut: {
        en: '',
        tc: '',
        'zh-CN': '',
    },
    tipMovementIn: {
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
const submit = async (name: any) => {
    let parsm = {
        tipList: [{
            key: key.value,
            content: form[name]
        }]
    }
    const { code, msg } = await apiTrs.systemTipListSave(parsm)
    if (code != 1) return;
    Message.success({ content: msg })
}
const getData = async () => {
    const { code, data } = await apiTrs.systemTipList()
    if (code != 1) return;
    data.forEach((item: any) => {
        if (item.key == 'tip_movement_in') {
            form.tipMovementIn = item.content
        }
        if (item.key == 'tip_movement_out') {
            form.tipMovementOut = item.content
        }
    });

}
const resetBtn = (name: any) => {
    form[name] = {
        en: '',
        tc: '',
        'zh-CN': '',
    }
}
{
    getData()
}
</script>