<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="account" :label="$t('account.account.5um39l9uv3w0')">
                                <a-input v-model="searchInfo.data.account" :placeholder="$t('account.account.5ukfohnhcvs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item allow-search field="counter_channel_id" :label="$t('account.account.5umxvfu8b280')">
                                <a-select allow-clear v-model="searchInfo.data.counter_channel_id" :placeholder="$t('account.account.5umxvfu8bmg0')">
                                    <a-option v-for="item in (tableData.counterChannelList as any)" :value="item.id">{{
                                        item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('account.account.5umxvfu8bqo0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('account.account.5umxvfu8btk0')">
                                    <a-option v-for="item in useEnums('trs.channel.account.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div class="buttonBox">
                <a-space :size="18">
                    <a-button @click="searchInfo.show = !searchInfo.show">
                        <template #icon>
                            <icon-filter />
                        </template>
                        {{ searchInfo.show ? $t('account.account.5ukfohnhdbk0') : $t('account.account.5ukfohnhdfs0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('account.account.5ukfohnhdjs0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('account.account.5ukfohnhdo40')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['trsChannelUpstreamAccountCreate']">
                    <a-button @click="router.push({ name: 'trsChannelUpstreamAccountCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('account.account.5um39l9uwf80')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table" row-key="id">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5um39l9uv3w0')" data-index="account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('account.account.5umxvfu8bw40')" data-index="name"></a-table-column>
                        <a-table-column :title="$t('account.account.5umxvfu8b280')">
                            <template #cell="{ record }">
                                <div>{{ record?.counter_channel_info?.name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5umxvfu8bz40')">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-tag v-for="item in record?.scene_list" size="small">
                                        {{ useEnumsFormat('market.order.counter_channel_scene', item.counter_channel_scene)
                                        }}
                                    </a-tag>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('account.account.5umxvfu8bqo0')" :width="100">
                            <template #cell="{ record }">
                                <a-badge :status="record.status == 1 ? 'success' : 'warning'"
                                    :text="useEnumsFormat('trs.channel.account.status', record.status)" />
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('account.account.5ukfohnhf4o0')" :width="120">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['trsChannelUpstreamAccountUpdate']"
                                        @click="router.push({ name: 'trsChannelUpstreamAccountUpdate', params: { id: record.id } })">{{$t('account.account.5umxvfu8c1g0')}}</a-link>
                                    <a-popconfirm v-if="record.status == 1" position="left" @ok="logout(record)"
                                        :content="`${$t('account.account.5umxw7sf4pg0')}?` ">
                                        <a-link v-permission="['trsChannelUpstreamAccountLogout']">{{$t('account.account.5umxvfu8c3w0')}}</a-link>
                                    </a-popconfirm>
                                    <a-link v-permission="['trsChannelUpstreamAccountLogin']" v-if="record.status == 0"
                                        @click="loginInfo.data.id = record.id; loginInfo.channel = record.counter_channel_info.channel; loginInfo.isNeed2Fa = false; loginInfo.show = true;">{{$t('account.account.5umxvfu8c640')}}</a-link>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </div>
            <div class="pagination">
                <a-pagination size="small" @change="getData" @page-size-change="getData"
                    v-model:current="searchInfo.data.page" v-model:page-size="searchInfo.data.per_page"
                    :total="tableData.count" show-total show-jumper show-page-size />
            </div>
        </a-card>
        <!-- 上线 -->
        <a-modal draggable v-model:visible="loginInfo.show" :title="$t('account.account.5umxvfu8c640')" @cancel="loginInfo.show = false" @before-ok="login">
            <a-form ref="loginFormRef" :model="loginInfo.data" layout="vertical">
                <div v-if="loginInfo.channel == 'fix'">
                    {{$t('account.account.5umxvfu8c8c0')}}
                </div>
                <a-form-item v-if="loginInfo.channel != 'fix'" field="password" :label="$t('account.account.5umxvfu8cak0')"
                    :rules="[{ required: true, message: $t('account.account.5umxvfu8cd80') }]">
                    <a-input-password v-model="loginInfo.data.password" :placeholder="$t('account.account.5umxvfu8cd80')" />
                </a-form-item>
                <a-form-item v-if="loginInfo.isNeed2Fa" field="token" :label="`2FA${$t('account.account.5umxwgs3dnk0')}`"
                    :rules="[{ required: true, message: $t('account.account.5umxvfu8cfo0') }]">
                    <a-input v-model="loginInfo.data.token" :placeholder="$t('account.account.5umxvfu8cfo0')" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnums, useEnumsFormat } from '@/hooks/enums'
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const loginFormRef = ref()
const { t } = useI18n();
const searchInfo = reactive({
    show: false,
    data: {
        account: '',
        counter_channel_id: '',
        status: '',
        page: 1,
        per_page: 20
    }
})
const loginInfo = reactive({
    show: false,
    loading: false,
    isNeed2Fa: false,
    channel: 'ayers',
    data: {
        id: '',
        password: '',
        auth2FaMethod: '',
        token: ''
    }
})
const tableData = reactive({
    list: [],
    counterChannelList: [],
    count: 0,
    message: [],
    loading: false
})
const login = async () => {
    const validate = await loginFormRef.value?.validate()
    if (validate) return false;
    if (!loginInfo.isNeed2Fa) {
        const { code, msg, data } = await apiTrs.channelAccountLogin({
            data: {
                id: loginInfo.data.id,
                password: loginInfo.data.password,
            }
        })
        if (code != 1) return false;
        if (data.isNeed2Fa) {
            loginInfo.isNeed2Fa = true
            loginInfo.data.auth2FaMethod = data.auth2FaMethod
            send2Fa()
            return false
        }
        Message.success({ content: msg })
    } else {
        const { code, msg } = await apiTrs.channelAccountLogin2Fa({
            data: {
                ...loginInfo.data
            }
        })
        if (code != 1) return false;
        Message.success({ content: msg })
    }
    getData()
}
const send2Fa = async () => {
    const { code } = await apiTrs.channelAccountLogin2Fa({
        data: {
            id: loginInfo.data.id,
            auth2FaMethod: loginInfo.data.auth2FaMethod
        }
    })
    if (code != 1) return;
    Message.success({ content: '2FA'+t('account.account.5umxw7sf5mk0') })
}
const logout = async (record: any) => {
    const { code, msg } = await apiTrs.channelAccountLogout({
        data: {
            id: record.id
        }
    })
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    tableData.loading = true
    const formData = cloneDeep(searchInfo.data)
    !formData.status && delete formData.status
    const { code, data } = await apiTrs.channelAccountList({
        ...useFilter(formData)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const getCounterChannelList = async () => {
    const { code, data } = await apiTrs.counterChannelList()
    if (code != 1) return;
    tableData.counterChannelList = data?.list
}
{
    getData()
    getCounterChannelList()
}
</script>
<style>
.arco-badge .arco-badge-status-text {
    font-size: 14px;
}
</style>