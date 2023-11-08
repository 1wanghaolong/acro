<template>
    <div>
        <a-card :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('detail.index.5umytoi1n2c0')}}
                    </a-space>
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical"
                @submit="submit">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="country_code" :label="$t('detail.index.5umytoi1ptc0')">
                            {{ form.data.country_code ? form.data.country_code : '--' }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="mobile" :label="$t('detail.index.5umytoi1q4o0')">
                            <a-input v-if="form.setup" v-model="form.data.mobile" :placeholder="$t('detail.index.5umytoi1qd00')" />
                            <div v-else>{{ form.data.mobile ? form.data.mobile : '--' }}</div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="nickname" :label="$t('detail.index.5umytoi1qhg0')">
                            <a-input v-if="form.setup" v-model="form.data.nickname" :placeholder="$t('detail.index.5umytoi1qmc0')" />
                            <div v-else>{{ form.data.nickname ? form.data.nickname : '--' }}</div>
                        </a-form-item>
                    </a-col>
                    <!-- <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="name" :label="$t('detail.index.5umytoi1qv00')">
                            <a-input v-if="form.setup" v-model="form.data.name" :placeholder="$t('detail.index.5umytoi1r2w0')" />
                            <div v-else>{{ form.data.name ? form.data.name : '--' }}</div>
                        </a-form-item>
                    </a-col> -->
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="sex" :label="$t('detail.index.5umytoi1r7c0')">
                            {{ form.data.sex == 0 ? $t('detail.index.5umytoi1rc40') : form.data.sex == 1 ? $t('detail.index.5umytoi1rgw0') : $t('detail.index.5umytoi1rlc0') }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="is_open" :label="$t('detail.index.5umytoi1rsg0')">
                            {{ form.data.is_open ? $t('detail.index.5umytoi1rx40') : $t('detail.index.5umytoi1s200') }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="status" :label="$t('detail.index.5umytoi1s740')">
                            {{ form.data.status == '1' ? $t('detail.index.5umytoi1sbw0') : form.data.status == '0' ? $t('detail.index.5umytoi1sgs0') : '--' }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('detail.index.5umytoi1slo0')">
                            {{ form.data.create_time ? dayjs.unix(form.data.create_time).format('YYYY-MM-DD HH:mm:ss') :
                                "--" }}
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
        <div style="margin-top:20px;">
            <a-card :loading="loading" class="general-card">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('detail.index.5umytoi1n2c0')}}
                        </a-space>
                        <a-space :size="18">
                            <a-button v-if="!loading"
                                v-permission="['otcustomerManagerAll','otcCustomerBindManager']"
                                @click="visible = true, customerManagerId = form.data.customer_manager_info.id || ''"
                                type="primary">
                                <template #icon>
                                    <icon-edit />
                                </template>
                                {{$t('detail.index.5umytoi1ssc0')}}
                            </a-button>
                        </a-space>
                    </div>
                </template>
                <div style="width: 100%;">
                    <div v-if="form.data.customer_manager_info">
                        <a-row :gutter="16" style="padding-bottom: 15px;">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6" style="display: flex; align-items: center">
                                <a-avatar :size="40" shape="square" v-if="form.data.customer_manager_info.avatar">
                                    <a-image alt="avatar" :src="form.data.customer_manager_info.avatar" />
                                </a-avatar>
                                <div v-else>{{ '--' }}</div>
                                <span style="padding-left: 12px">{{ form.data.customer_manager_info.real_name }}</span>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16" style="padding-bottom: 15px;">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <div>{{ $t('detail.index.5umytoi1t0c0') }}</div>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <div>{{ $t('detail.index.5umytoi1t4g0') }}</div>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <div>{{ $t('detail.index.5umytoi1t8o0') }}</div>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16" style="padding-bottom: 15px;">
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">
                                <div>{{ form.data.customer_manager_info?.mobile ? form.data.customer_manager_info.mobile
                                    : '--' }}</div>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">

                                <div>{{ form.data.customer_manager_info?.email ? form.data.customer_manager_info.email
                                    : '--' }}</div>
                            </a-col>
                            <a-col :xs="24" :sm="12" :md="8" :xl="6">

                                <div>{{ form.data.customer_manager_info?.wechat_number ?
                                    form.data.customer_manager_info.wechat_number
                                    : '--' }}</div>
                            </a-col>
                        </a-row>
                    </div>
                    <div v-else>
                        {{ '--' }}
                    </div>
                </div>
            </a-card>
        </div>
        <a-card style="margin: 20px 0;" :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('detail.index.5umytoi1te80')}}
                    </a-space>
                </div>
            </template>
            <a-row :gutter="[16, 16]" v-if="$permission(['otcAccountCreate','otcustomerManagerPassword','otcustomerManagerState'])">
                <a-col :xs="24">
                    <div class="title">{{$t('detail.index.5umytoi1tkk0')}}</div>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="$permission(['otcAccountCreate'])">
                    <a-card hoverable class="button"
                        @click="router.push({ name: 'otcAccountCreate', query: { mobile: route.query?.mobile } })">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            {{$t('detail.index.5umytoi1tog0')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="$permission(['otcustomerManagerPassword'])">
                    <a-card hoverable class="button"
                    @click="passwordVisible = true">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            {{$t('detail.index.5umytoi1ts40')}}
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data.status && $permission(['otcustomerManagerState'])">
                    <a-card hoverable class="button">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            <a-popconfirm :content="$t('detail.index.5umytoi1tw00')" @ok="okStatus('1')">
                                <a-typography-text>
                                    {{$t('detail.index.5umytoi1tzo0')}}
                                </a-typography-text>        
                            </a-popconfirm>
                        </a-space>
                    </a-card>
                </a-col>
                <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="!form.data.status && $permission(['otcustomerManagerState'])">
                    <a-card hoverable class="button">
                        <a-space size="medium">
                            <img alt="avatar" src="@/assets/svg/kjtb.svg" />
                            <a-popconfirm :content="$t('detail.index.5umytoi1u7w0')" @ok="okStatus('2')">
                                <a-typography-text>
                                    {{$t('detail.index.5umytoi1ucw0')}}
                                </a-typography-text>        
                            </a-popconfirm>
                        </a-space>
                    </a-card>
                </a-col>
            </a-row>
        </a-card>
        <a-modal :titleAlign="'start'" :visible="visible" @ok="OkClick" @cancel="CancelClick">
            <template #title>{{ $t('detail.index.5umytoi1uh40') }}</template>
            <div style="display: flex; align-items: center;flex-wrap: wrap;">
                <div style="padding-bottom: 10px;">{{ $t('detail.index.5umytoi1uoo0') }}</div>
                <a-select v-model="customerManagerId" :placeholder="$t('detail.index.5umytoi1uso0')">
                    <a-option v-for="item of statusOptions" :value="item.id" :label="item.real_name" />
                </a-select>
            </div>
        </a-modal>
        <a-modal :titleAlign="'start'" :visible="passwordVisible" @ok="passwordOkClick" @cancel="passwordCancelClick">
            <template #title>{{ $t('detail.index.5umytoi1ts40') }}</template>
            <div style="display: flex; align-items: center;;flex-wrap: wrap">
                <div style="padding-bottom: 10px;">{{ $t('detail.index.5umytoi1xgw0') }}</div>
                <div style="width: 100%;">
                    <a-input-password :max-length="16" v-model="password" :placeholder="$t('detail.index.5umytoi1xo80')" allow-clear />
                    <div style="padding-top: 10px;">
                        <div v-if="password.length<8" style="color: rgb(var(--red-6));">{{$t('detail.index.5umytoi1xx00')}} {{$t('detail.index.5umytoi1y280')}}</div>
                    </div>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
const { t } = useI18n();
const route = useRoute()
const formRef = ref()
const router = useRouter()
const loading = ref(false)
const visible = ref(false) //分配客户经理
const passwordVisible = ref(false) // 重置密码
const password:any = ref("")  //密码
const customerManagerId: any = ref("")  //选中id
const statusOptions = ref<any>([]); // 基金经理列表
const form: any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {
        id: '',
        nickname: "",
        name: "",
        real_name: '',
        country_code: '',
        mobile: '',
        create_time: 0,
        status: 1,
        is_open: false,
        sex: 2,
        customer_manager_info: {} as any,
    },
    rules: {
        // real_name: [{ required: true, message: '请输入中文姓名' }],
        // english_name: [{ required: true, message: '请输入英文姓名' }],
        // email: [{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱' }]
    },
    managerData: {
        real_name: "",
        status: "1",
        ignore_id_list: ""
    },
    kjList: []
})
const submit = async () => {

}
const okStatus = async (type:any) => {
    let status
    if (type == '1') {
        status = 0
    }
    if (type == '2') {
        status = 1
    }
    const { code, msg } = await apiAdmin.adminuserUpdate({
        userId: form.data.id,
        data: {
            status
        }
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
    getData()
}
const managerData = async () => {
    const { code, data } = await apiOtc.getcustomerManagerAll({
        ...useFilter(form.managerData)
    })
    if (code != 1) return;
    statusOptions.value = data;
}
const OkClick = async () => {
    if (!customerManagerId.value) {
        Message.info({ content:t('detail.index.5umytoi1uso0') })
        return
    }
    const { code, msg } = await apiOtc.getcustomerBindManager({
        id: route.params?.customid || route.query.customid,
        customer_manager_id: customerManagerId.value
    })
    if (code != 1) return getData(), visible.value = false, customerManagerId.value = "";
    Message.success({ content: msg })
    visible.value = false
    customerManagerId.value = ""
    getData()
};
const CancelClick = () => {
    visible.value = false;
};
const passwordOkClick = async () => {
    if (!password.value) {
        Message.info({ content:t('detail.index.5umytoi1xo80') })
        return
    }
    let zc = /^(?!(?:[0-9]+|[a-zA-Z]+|[\\\`~!@#\$%^&*()+=|{}\':;,\[\].<>\/?！￥…（）—【】‘；：”“’。，、？]+)$)[0-9a-zA-Z\\\`~!@#\$%^&*()+=|{}\':;,\[\].<>\/?！￥…（）—【】‘；：”“’。，、？]{8,16}$/g
    if (!zc.test(password.value)) {
        Message.info({ content: '请输入8-16 位密码' })
        return
    }
    const { code, msg } = await apiAdmin.adminuserUpdate({
        userId: form.data.id,
        password: password.value
    })
    if (code != 1) return getData(), passwordVisible.value = false, password.value = "";
    Message.success({ content: msg })
    passwordVisible.value = false
    password.value = ""
    getData()
};

const passwordCancelClick = () => {
    passwordVisible.value = false;
};
const getData = async () => {
    loading.value = true
    const { code, data } = await apiOtc.getcustomerInfo({
        id: route.params?.customid || route.query.customid
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
}
{
    getData()
    managerData()
}
</script>
<style lang="less" scoped>
.title {
    line-height: 26px;
    position: relative;
    padding-left: 10px;

    &::before {
        position: absolute;
        content: '';
        width: 3px;
        height: 100%;
        left: 0;
        background-color: rgb(var(--arcoblue-6));
    }
}

.arco-row {
    margin-top: 10px !important;

    +.arco-row {
        margin-top: 25px !important;
    }
}

.button {
    cursor: pointer;

    :hover {
        color: rgb(var(--arcoblue-6)) !important;
    }
}</style>