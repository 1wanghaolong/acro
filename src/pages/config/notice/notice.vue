<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-tabs v-model:active-key="active" justify>
                <a-tab-pane style="overflow: auto;" key="license_number0" :title="$t('notice.notice.5um27io397s0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="email_host" :label="$t('notice.notice.5um27io39pw0')">
                                <a-input v-model="form.data.email_host" :placeholder="$t('notice.notice.5um27io39ts0')" />
                            </a-form-item>
                            <a-form-item field="email_port" :label="$t('notice.notice.5um27io39wk0')">
                                <a-input v-model="form.data.email_port" :placeholder="$t('notice.notice.5um27io3a0w0')" />
                            </a-form-item>
                            <a-form-item field="email_secure" :label="$t('notice.notice.5um27io3a3s0')">
                                <a-input v-model="form.data.email_secure" :placeholder="$t('notice.notice.5um27io3a8c0')" />
                            </a-form-item>
                            <a-form-item field="email_name" :label="$t('notice.notice.5um27io3aaw0')">
                                <a-input v-model="form.data.email_name" :placeholder="$t('notice.notice.5um27io3ad80')" />
                            </a-form-item>
                            <a-form-item field="email_sender" :label="$t('notice.notice.5um27io3afg0')">
                                <a-input v-model="form.data.email_sender" :placeholder="$t('notice.notice.5um27io3ahw0')" />
                            </a-form-item>
                            <a-form-item field="email_pass" :label="$t('notice.notice.5um27io3ak80')">
                                <a-input type="password" v-model="form.data.email_pass" :placeholder="$t('notice.notice.5um27io3amo0')" />
                            </a-form-item>
                            <a-form-item>
                                <div v-if="$permission(['configNoticeUpdate'])" style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('notice.notice.5um27io3aos0')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('notice.notice.5um27io3arc0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="license_number1" :title="$t('notice.notice.5um27io3avc0')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="sms_china_channel" :label="$t('notice.notice.5um27io3axo0')">
                                <a-select allow-clear v-model="form.data.sms_china_channel" :placeholder="$t('notice.notice.5um27io3b0c0')">
                                    <a-option v-for="item in useEnums('config.notice.sms_china_channel')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                            <template v-if="form.data.sms_china_channel == 'link-china'">
                                <a-form-item field="sms_china_channel_param.link_sms_code" :label="$t('notice.notice.5um27io3b2o0')">
                                    <a-input v-model="form.data.sms_china_channel_param.link_sms_code"
                                        :placeholder="$t('notice.notice.5um27io3b4w0')" />
                                </a-form-item>
                                <a-form-item field="sms_china_channel_param.link_sms_sign" :label="$t('notice.notice.5um27io3b800')">
                                    <a-input v-model="form.data.sms_china_channel_param.link_sms_sign"
                                        :placeholder="$t('notice.notice.5um27io3ba40')" />
                                </a-form-item>
                                <a-form-item field="sms_china_channel_param.link_sms_user" :label="$t('notice.notice.5um27io3bdg0')">
                                    <a-input v-model="form.data.sms_china_channel_param.link_sms_user"
                                        :placeholder="$t('notice.notice.5um27io3bfg0')" />
                                </a-form-item>
                                <a-form-item field="sms_china_channel_param.link_sms_pass" :label="$t('notice.notice.5um27io3bhg0')">
                                    <a-input type="password" v-model="form.data.sms_china_channel_param.link_sms_pass"
                                        :placeholder="$t('notice.notice.5um27io3bj80')" />
                                </a-form-item>
                            </template>
                            <template v-if="form.data.sms_china_channel == 'access-china'">
                                <a-form-item field="sms_china_channel_param.access_sms_api" :label="$t('notice.notice.5um27io3bl00')">
                                    <a-input v-model="form.data.sms_china_channel_param.access_sms_api"
                                        :placeholder="$t('notice.notice.5um27io3bmo0')" />
                                </a-form-item>
                                <a-form-item field="sms_china_channel_param.access_sms_user" :label="$t('notice.notice.5um27io3bo80')">
                                    <a-input v-model="form.data.sms_china_channel_param.access_sms_user"
                                        :placeholder="$t('notice.notice.5um27io3bq40')" />
                                </a-form-item>
                                <a-form-item field="sms_china_channel_param.access_sms_pass" :label="$t('notice.notice.5um27io3bhg0')">
                                    <a-input type="password" v-model="form.data.sms_china_channel_param.access_sms_pass"
                                        :placeholder="$t('notice.notice.5um27io3bj80')" />
                                </a-form-item>
                                <a-form-item field="sms_china_channel_param.access_sms_sign" :label="$t('notice.notice.5um27io3brw0')">
                                    <a-input v-model="form.data.sms_china_channel_param.access_sms_sign"
                                        :placeholder="$t('notice.notice.5um27io3btg0')" />
                                </a-form-item>

                            </template>
                            <template v-if="form.data.sms_china_channel == 'dd-china'">
                                <a-form-item field="sms_china_channel_param.dd_sms_api" :label="$t('notice.notice.5um27io3bl00')">
                                    <a-input v-model="form.data.sms_china_channel_param.dd_sms_api"
                                        :placeholder="$t('notice.notice.5um27io3bmo0')" />
                                </a-form-item>
                            </template>

                            <a-form-item field="sms_abroad_channel" :label="$t('notice.notice.5um27io3bvc0')">
                                <a-select allow-clear v-model="form.data.sms_abroad_channel" :placeholder="$t('notice.notice.5um27io3b0c0')">
                                    <a-option v-for="item in useEnums('config.notice.sms_abroad_channel')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                            <template v-if="form.data.sms_abroad_channel == 'cl-abroad'">
                                <a-form-item field="sms_abroad_channel_param.cl_sms_sign" :label="$t('notice.notice.5um27io3brw0')">
                                    <a-input v-model="form.data.sms_abroad_channel_param.cl_sms_sign"
                                        :placeholder="$t('notice.notice.5um27io3btg0')" />
                                </a-form-item>
                                <a-form-item field="sms_abroad_channel_param.cl_sms_user" :label="$t('notice.notice.5um27io3bdg0')">
                                    <a-input v-model="form.data.sms_abroad_channel_param.cl_sms_user"
                                        :placeholder="$t('notice.notice.5um27io3bfg0')" />
                                </a-form-item>
                                <a-form-item field="sms_abroad_channel_param.cl_sms_pass" :label="$t('notice.notice.5um27io3bhg0')">
                                    <a-input type="password" v-model="form.data.sms_abroad_channel_param.cl_sms_pass"
                                        :placeholder="$t('notice.notice.5um27io3bj80')" />
                                </a-form-item>
                            </template>
                            <template v-if="form.data.sms_abroad_channel == 'access-abroad'">
                                <a-form-item field="sms_abroad_channel_param.access_sms_api" :label="$t('notice.notice.5um27io3bl00')">
                                    <a-input v-model="form.data.sms_abroad_channel_param.access_sms_api"
                                        :placeholder="$t('notice.notice.5um27io3bmo0')" />
                                </a-form-item>
                                <a-form-item field="sms_abroad_channel_param.access_sms_user" :label="$t('notice.notice.5um27io3bdg0')">
                                    <a-input v-model="form.data.sms_abroad_channel_param.access_sms_user"
                                        :placeholder="$t('notice.notice.5um27io3bfg0')" />
                                </a-form-item>
                                <a-form-item field="sms_abroad_channel_param.access_sms_pass" :label="$t('notice.notice.5um27io3bhg0')">
                                    <a-input type="password" v-model="form.data.sms_abroad_channel_param.access_sms_pass"
                                        :placeholder="$t('notice.notice.5um27io3bj80')" />
                                </a-form-item>
                                <a-form-item field="sms_abroad_channel_param.access_sms_sign" :label="$t('notice.notice.5um27io3brw0')">
                                    <a-input v-model="form.data.sms_abroad_channel_param.access_sms_sign"
                                        :placeholder="$t('notice.notice.5um27io3btg0')" />
                                </a-form-item>
                            </template>
                            <template v-if="form.data.sms_abroad_channel == 'dd-abroad'">
                                <a-form-item field="sms_abroad_channel_param.dd_sms_api" :label="$t('notice.notice.5um27io3bl00')">
                                    <a-input v-model="form.data.sms_abroad_channel_param.dd_sms_api"
                                        :placeholder="$t('notice.notice.5um27io3bmo0')" />
                                </a-form-item>
                            </template>

                            <a-form-item>
                                <div v-if="$permission(['configNoticeUpdate'])" style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('notice.notice.5um27io3aos0')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('notice.notice.5um27io3arc0')}}
                                        </a-button>
                                    </a-space>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </a-tab-pane>
                <a-tab-pane style="overflow: auto;" key="license_number2" :title="$t('notice.notice.5um27io3bx40')">
                    <div style="height: 100%;display: flex;align-items: center;">
                        <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                            :style="{ width: '800px', margin: 'auto' }" @submit="submit">
                            <a-form-item field="push_channel" :label="$t('notice.notice.5um27io3bz00')">
                                <a-select allow-clear v-model="form.data.push_channel" :placeholder="$t('notice.notice.5um27io3b0c0')">
                                    <a-option v-for="item in useEnums('config.notice.push_channel')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item v-if="form.data.push_channel" field="push_channel_param.umeng_and_key" :label="$t('notice.notice.5um290u2tuc0')">
                                <a-input v-model="form.data.push_channel_param.umeng_and_key" :placeholder="$t('notice.notice.5um290u2uq40')" />
                            </a-form-item>
                            <a-form-item v-if="form.data.push_channel" field="push_channel_param.umeng_and_secret" :label="$t('notice.notice.5um29hxlyw40')">
                                <a-input v-model="form.data.push_channel_param.umeng_and_secret"
                                    :placeholder="$t('notice.notice.5um29hxlzhs0')" />
                            </a-form-item>
                            <a-form-item v-if="form.data.push_channel" field="push_channel_param.umeng_ios_key" :label="$t('notice.notice.5um29hxlzpg0')">
                                <a-input v-model="form.data.push_channel_param.umeng_ios_key" :placeholder="$t('notice.notice.5um29hxlzw00')" />
                            </a-form-item>
                            <a-form-item v-if="form.data.push_channel" field="push_channel_param.umeng_ios_secret" :label="$t('notice.notice.5um29hxm01c0')">
                                <a-input v-model="form.data.push_channel_param.umeng_ios_secret"
                                    :placeholder="$t('notice.notice.5um29hxm06w0')" />
                            </a-form-item>
                            <a-form-item>
                                <div v-if="$permission(['configNoticeUpdate'])" style="display: flex;justify-content: flex-end;width: 100%;">
                                    <a-space :size="18">
                                        <a-button @click="reset">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            {{$t('notice.notice.5um27io3aos0')}}
                                        </a-button>
                                        <a-button type="primary" html-type="submit">
                                            <template #icon>
                                                <icon-save />
                                            </template>
                                            {{$t('notice.notice.5um27io3arc0')}}
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
import { useEnums } from '@/hooks/enums'
const local = useLocal()
const active = ref('license_number0')
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        email_host: '',
        email_port: '',
        email_secure: '',
        email_name: '',
        email_sender: '',
        email_pass: '',
        push_channel_param: {
            umeng_and_key: '',
            umeng_and_secret: '',
            umeng_ios_key: '',
            umeng_ios_secret: ''
        },
        sms_china_channel_param: {
            link_sms_code: '',
            link_sms_pass: '',
            link_sms_user: '',
            link_sms_sign: '',
            access_sms_user: '',
            access_sms_sign: '',
            access_sms_pass: '',
            access_sms_api: '',
            dd_sms_api: ''

        },
        sms_abroad_channel_param: {
            cl_sms_sign: '',
            cl_sms_pass: '',
            cl_sms_user: '',
            access_sms_user: '',
            access_sms_sign: '',
            access_sms_pass: '',
            access_sms_api: '',
            dd_sms_api: ''
        },
        push_channel: '',
        sms_abroad_channel: '',
        sms_china_channel: '',
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
        group: 'notice',
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
        group: 'notice'
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