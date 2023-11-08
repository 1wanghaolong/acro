<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="agentName" :label="$t('invite.invite.5uklshgaxu80')">
                                <a-input v-model="searchInfo.data.agentName" :placeholder="$t('invite.invite.5uklshgayos0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="userName" :label="$t('invite.invite.5uklshgaz000')">
                                <a-input v-model="searchInfo.data.userName" :placeholder="$t('invite.invite.5uklshgayos0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="topAgentName" :label="$t('invite.invite.5uklshgaz4w0')">
                                <a-input v-model="searchInfo.data.topAgentName" :placeholder="$t('invite.invite.5uklshgayos0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="topUserName" :label="$t('invite.invite.5uklshgaz9s0')">
                                <a-input v-model="searchInfo.data.topUserName" :placeholder="$t('invite.invite.5uklshgayos0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="isOpen" :label="$t('invite.invite.5uklshgaze40')">
                                <a-select allow-clear v-model="searchInfo.data.isOpen" :placeholder="$t('invite.invite.5uklshgazjg0')">
                                    <a-option v-for="item in useEnums('cms.agent.invite.is_open')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="isPayment" :label="$t('invite.invite.5uklshgazno0')">
                                <a-select allow-clear v-model="searchInfo.data.isPayment" :placeholder="$t('invite.invite.5uklshgazjg0')">
                                    <a-option v-for="item in useEnums('cms.agent.invite.is_payment')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="inviteType" :label="$t('invite.invite.5uklshgazrk0')">
                                <a-select allow-clear v-model="searchInfo.data.inviteType" :placeholder="$t('invite.invite.5uklshgazjg0')">
                                    <a-option v-for="item in useEnums('cms.agent.invite.inviteType')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="time" :label="$t('invite.invite.5uklshgb0000')">
                                <a-range-picker v-model="searchInfo.data.time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('invite.invite.5uklshgb05c0') : $t('invite.invite.5uklshgb09g0') }}
                    </a-button>
                    <a-button @click="resetBtn">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('invite.invite.5uklshgb0eg0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('invite.invite.5uklshgb0j00')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['cmsAgentPopularizeCreate']" @click="showVisibleCreate = true" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('invite.invite.5uklshgb0nc0')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column title="ID" data-index="id" :width="60"></a-table-column>
                        <a-table-column :title="$t('invite.invite.5uklshgb0rk0')" data-index="user_name" :width="local.lang=='en'?180:160">
                            <template #cell="{ record }">
                                {{ record.country_code }} {{ record.user_name }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('invite.invite.5uklshgb0vo0')" data-index="agent_name" :ellipsis="true" :tooltip="true" :width="160">
                            <template #cell="{ record }">
                                <span v-if="record.agent_user_name">
                                    {{ record.agent_name }}({{ record.agent_user_name }})
                                </span>
                                <span v-else>
                                    -
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('invite.invite.5uklshgb1080')" data-index="top_agent_user_name" :ellipsis="true" :tooltip="true"
                            :width="160">
                            <template #cell="{ record }">
                                <span v-if="record.top_agent_user_name">
                                    {{ record.top_agent_name }}({{ record.top_agent_user_name }})
                                </span>
                                <span v-else>
                                    -
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('invite.invite.5uklshgaze40')" data-index="is_open" :width="local.lang=='en'?240:100">
                            <template #cell="{ record }">
                                {{ record.is_open ? $t('invite.invite.5uklshgb14g0') : $t('invite.invite.5uklshgb1880') }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('invite.invite.5uklshgazno0')" data-index="is_payment" :width="local.lang=='en'?140:100">
                            <template #cell="{ record }">
                                {{ record.is_payment ? $t('invite.invite.5uklshgb14g0') : $t('invite.invite.5uklshgb1880') }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('invite.invite.5uklshgazrk0')" data-index="invite_type" :width="local.lang=='en'?160:100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.agent.invite.inviteType', record.invite_type) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('invite.invite.5uklshgb0000')" :width="local.lang=='en'?160:120">
                            <template #cell="{ record }">
                                <div>{{ record.register_time ? dayjs.unix(record.register_time).format('YYYY-MM-DD') : '--'
                                }}
                                </div>
                                <div>{{ record.register_time ? dayjs.unix(record.register_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column
                            v-if="$permission(['cmsAgentSettlementDetail', 'cmsCustomDetail', 'cmsAgentPopularizeChangeAgent'])"
                            fixed="right" :title="$t('invite.invite.5uklshgb1d80')" :width="local.lang=='en'?410:220">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsCustomDetail'])"
                                        @click="router.push({ name: 'cmsCustomDetail', params: { id: record.user_id } })">{{$t('invite.invite.5uklshgb1gw0')}}</a-link>
                                    <a-link v-if="$permission(['cmsAgentSettlementDetail'])"
                                        @click="router.push({ name: 'cmsAgentSettlementDetail', query: { userId: record.user_id } })">{{$t('invite.invite.5uklshgb1kk0')}}</a-link>
                                    <a-link v-if="$permission(['cmsAgentPopularizeChangeAgent'])"
                                        @click="changeAgentBtn(record)">{{$t('invite.invite.5uklshgb1o00')}}</a-link>
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
        <a-modal :mask-closable=false v-model:visible="showVisibleCreate" :on-before-ok="handleCreateSubmit"
            @close="onClose">
            <template #title>
                {{ form.data.user_id ? $t('invite.invite.5uklshgb1o00') : $t('invite.invite.5uklshgb0nc0') }}
            </template>
            <div v-if="!form.data.user_id">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-form-item field="country_code" :label="$t('invite.invite.5uklshgb1ro0')">
                        <a-select allow-search allow-clear v-model="form.data.country_code" :placeholder="$t('invite.invite.5uklshgb1us0')">
                            <a-option v-for="item in countryCodeList" :value="item.country_code">
                                {{ item.country_code }} {{ item.name }} {{ item.country_label }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="mobile" :label="$t('invite.invite.5uklshgb1xs0')">
                        <a-input-number hide-button v-model="form.data.mobile" :placeholder="$t('invite.invite.5uklshgb21s0')">
                        </a-input-number>
                    </a-form-item>

                    <a-form-item field="agent_id" :label="$t('invite.invite.5uklshgb0vo0')">
                        <a-select style="width: 100%" v-model="form.data.agent_id" allow-search :placeholder="$t('invite.invite.5uklshgb28g0')"
                            @search="getAgentList">
                            <a-option @click="agentBtn(item)" v-for="item in (agentList as any)" :value="item.agent_id">
                                {{ item.title }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                </a-form>
            </div>
            <div v-else>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
                    <a-form-item field="agentName" :label="$t('invite.invite.5uklshgb2fk0')">
                        <a-input disabled v-model="form.data.agentName" :placeholder="$t('invite.invite.5uklshgb2fk0')">
                        </a-input>
                    </a-form-item>
                    <a-form-item field="new_agent_id" :label="$t('invite.invite.5uklshgb2j00')">
                        <a-select style="width: 100%" v-model="form.data.new_agent_id" allow-search :placeholder="$t('invite.invite.5uklshgb28g0')"
                            @search="getAgentList">
                            <a-option @click="agentBtn(item)" v-for="item in (agentList as any)" :value="item.agent_id">
                                {{ item.title }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const searchFormRef = ref()
const searchInfo: any = reactive({
    show: false,
    data: {
        agentName: '',
        userName: '',
        topAgentName: '',
        topUserName: '',
        isOpen: '',
        isPayment: '',
        inviteType: '',
        agentId: route.query?.id || '',
        time: [],
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
const getData = async () => {
    tableData.loading = true
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    const { code, data } = await apiCms.cmsAgentPopularizeList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const resetBtn = () => {
    searchFormRef.value?.resetFields()
    searchInfo.data.market = ''
    searchInfo.data.mobile = ''
    if (route.query?.mobile || route.query?.market) {
        router.push({ name: 'cmsSimulatePosition' })
    }
    getData()
}
const formRef = ref()
const form: any = reactive({
    dataScore: {
        score: 0
    },
    data: {
        mobile: '',
        country_code: '',
        agent_id: '',
        old_agent_id: '',
        new_agent_id: '',
        user_id: '',
    },
    rules: {
        mobile: [{ required: true, message: t('invite.invite.5uklshgb21s0') }],
        country_code: [{ required: true, message: t('invite.invite.5uklshgb1us0') }],
        agent_id: [{ required: true, message: t('invite.invite.5uklshgb2l40') }],
        new_agent_id: [{ required: true, message: t('invite.invite.5uklshgb2l40') }],
    }
})
const onClose = async () => {
    form.data = {
        mobile: '',
        country_code: '',
        agent_id: '',
        old_agent_id: '',
        new_agent_id: '',
        user_id: '',
    },
        formRef.value.resetFields()
}
// 新增
const showVisibleCreate = ref(false)
const handleCreateSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    if (form.data.user_id) {
        const { code, msg } = await apiCms.cmsAgentPopularizeChangeAgent({
            data: {
                old_agent_id: form.data.old_agent_id,
                new_agent_id: form.data.new_agent_id,
                user_id: form.data.user_id,
            }
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    } else {
        const { code, msg } = await apiCms.cmsAgentPopularizeCreate({
            data: {
                mobile: form.data.mobile + '',
                country_code: form.data.country_code,
                agent_id: form.data.agent_id,
            }
        })
        if (code != 1) return false;
        Message.success({ content: msg })
        getData();
        return true
    }

}
const changeAgentBtn = (val: any) => {
    console.log(val);
    form.data.user_id = val.user_id
    form.data.old_agent_id = val.agent_id
    form.data.agentName = val.agent_name + '(' + val.agent_user_name + ')'
    showVisibleCreate.value = true
}
const countryCodeList = ref()
const getCountryCode = async () => {
    const { code, data } = await apiSystem.countryCodeList()
    if (code != 1) return;
    countryCodeList.value = data.map((item: any) => {
        item.country_code = `+${item.country_code}`
        return item
    })
}
const agentList = ref([])
const getAgentList = async (value: string) => {
    const { code, data } = await apiCms.cmsAgentUserList({ 'filter[agentName]': value })
    if (code != 1) return;
    agentList.value = data.data.map((item: any) => {
        item.title = item.agent_name + '(' + item.user_name + ')'
        item.agent_id = item.id
        return item
    })
}
const symbolData = ref()
const agentBtn = (val: any) => {
    symbolData.value = val
}


{
    getCountryCode()
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}

:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>